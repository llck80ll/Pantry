import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Increase request size limit to handle base64 image uploads
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

let aiInstance: GoogleGenAI | null = null;

function getGemini(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined. Please add it to your Secrets.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

import fs from "fs";
import { BASE_RECIPES } from "./src/recipesData";

const RECIPES_DB_PATH = path.join(process.cwd(), "src", "recipes_db.json");

function getLocalRecipes() {
  try {
    if (fs.existsSync(RECIPES_DB_PATH)) {
      const data = fs.readFileSync(RECIPES_DB_PATH, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Failed to read recipes_db.json, using BASE_RECIPES memory fallback instead", err);
  }
  return BASE_RECIPES;
}

function saveLocalRecipe(newRecipe: any) {
  try {
    const list = getLocalRecipes();
    // Ensure unique ID
    const customId = `custom_${Date.now()}`;
    const recipeWithId = { ...newRecipe, id: customId };
    list.push(recipeWithId);
    fs.writeFileSync(RECIPES_DB_PATH, JSON.stringify(list, null, 2), "utf-8");
    return recipeWithId;
  } catch (err) {
    console.error("Failed to write to recipes_db.json", err);
    throw new Error("Local database write failed");
  }
}

// Get all database recipes
app.get("/api/recipes", (req, res) => {
  try {
    const recipes = getLocalRecipes();
    res.json(recipes);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to load database recipes." });
  }
});

// Create custom recipe in local database
app.post("/api/recipes", (req, res) => {
  try {
    const newRecipe = req.body;
    if (!newRecipe || !newRecipe.name || !newRecipe.allIngredients || !newRecipe.instructions) {
      return res.status(400).json({ error: "Missing required recipe parameters (name, ingredients, instructions)" });
    }
    const saved = saveLocalRecipe(newRecipe);
    res.status(201).json(saved);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to add to database." });
  }
});

// Helper function to scale ingredient amounts of the local recipes
function scaleAmount(amountStr: string, factor: number): string {
  const fractionMap: Record<string, number> = {
    "1/2": 0.5, "1/3": 0.33, "1/4": 0.25, "3/4": 0.75, "1/8": 0.125
  };

  let num = 0;
  let rest = amountStr;

  const fracRegex = /^(\d+\s+)?(\d+\/\d+)\s*(.*)$/;
  const decRegex = /^(\d*\.?\d+)\s*(.*)$/;

  const fracMatch = amountStr.match(fracRegex);
  if (fracMatch) {
    const whole = fracMatch[1] ? parseFloat(fracMatch[1].trim()) : 0;
    const fracStr = fracMatch[2];
    const fracVal = fractionMap[fracStr] || 0.5;
    num = whole + fracVal;
    rest = fracMatch[3];
  } else {
    const decMatch = amountStr.match(decRegex);
    if (decMatch) {
      num = parseFloat(decMatch[1]);
      rest = decMatch[2];
    }
  }

  if (num > 0 && !isNaN(num)) {
    const scaledNum = Math.round(num * factor * 100) / 100;
    let formattedNum = scaledNum.toString();
    if (scaledNum === 0.5) formattedNum = "1/2";
    else if (scaledNum === 0.25) formattedNum = "1/4";
    else if (scaledNum === 0.75) formattedNum = "3/4";
    else if (scaledNum === 1.5) formattedNum = "1 1/2";
    else if (scaledNum === 2.5) formattedNum = "2 1/2";
    
    return `${formattedNum} ${rest}`.trim();
  }

  return amountStr;
}

// Recipe Recommendation API (Offline Local Matching Engine)
app.post("/api/recipe/recommend", async (req, res) => {
  try {
    const { image, imageType, ingredients, cuisine, servings } = req.body;

    const pantryList: string[] = Array.isArray(ingredients) 
      ? ingredients 
      : (typeof ingredients === "string" ? ingredients.split(",").map(i => i.trim()).filter(Boolean) : []);

    const normalizedPantry = pantryList.map(item => item.toLowerCase().trim());

    const currentRecipes = getLocalRecipes();

    // Score and rank all baseline recipes
    const scoredRecipes = currentRecipes.map(base => {
      // Create copy of all ingredients
      const allIngredients = base.allIngredients.map(ing => ({ ...ing }));
      const matchingIngredients: string[] = [];
      const additionalIngredientsNeeded: string[] = [];

      allIngredients.forEach(ing => {
        const ingNameNorm = ing.name.toLowerCase().trim();
        
        const hasMatch = normalizedPantry.some(pantryItem => {
          const itemSing = pantryItem.endsWith("s") && pantryItem.length > 3 ? pantryItem.slice(0, -1) : pantryItem;
          const ingSing = ingNameNorm.endsWith("s") && ingNameNorm.length > 3 ? ingNameNorm.slice(0, -1) : ingNameNorm;
          
          return ingNameNorm.includes(pantryItem) || 
                 pantryItem.includes(ingNameNorm) || 
                 ingSing.includes(itemSing) || 
                 itemSing.includes(ingSing);
        });

        if (hasMatch) {
          matchingIngredients.push(ing.name);
        } else {
          additionalIngredientsNeeded.push(ing.name);
        }
      });

      const totalIng = allIngredients.length;
      const matches = matchingIngredients.length;
      const matchScore = totalIng > 0 ? matches / totalIng : 0;

      // Filter/Prioritize custom cuisine choice
      let cuisineMatch = false;
      if (cuisine && cuisine !== "All" && cuisine.trim() !== "") {
        const cuisineNorm = cuisine.toLowerCase().trim();
        cuisineMatch = base.tags.some(tag => tag.toLowerCase() === cuisineNorm);
      } else {
        cuisineMatch = true;
      }

      return {
        recipe: {
          ...base,
          allIngredients,
          matchingIngredients,
          additionalIngredientsNeeded,
          detectedIngredients: []
        },
        matchScore,
        matches,
        cuisineMatch
      };
    });

    // Sort by cuisine match first, then by matchScore percentage descending, then absolute match count, then fewer missing ingredients
    const sortedRecipes = scoredRecipes.sort((a, b) => {
      if (a.cuisineMatch && !b.cuisineMatch) return -1;
      if (!a.cuisineMatch && b.cuisineMatch) return 1;

      if (b.matchScore !== a.matchScore) {
        return b.matchScore - a.matchScore;
      }
      if (b.matches !== a.matches) {
        return b.matches - a.matches;
      }
      return a.recipe.additionalIngredientsNeeded.length - b.recipe.additionalIngredientsNeeded.length;
    });

    // Take exactly the top 6 suggestions
    const selected = sortedRecipes.slice(0, 6).map(item => item.recipe);

    // Apply portion scaling factors dynamically if servings is specified
    const servingsCount = typeof servings === "number" && servings > 0 ? servings : 2;

    const scaledSelected = selected.map(recipe => {
      const defaultServings = recipe.servings;
      if (servingsCount === defaultServings) {
        return recipe;
      }

      const factor = servingsCount / defaultServings;

      const scaledIngredients = recipe.allIngredients.map(ing => ({
        ...ing,
        amount: scaleAmount(ing.amount, factor)
      }));

      const baseNut = recipe.nutritionalInfo;
      const scaledNut = {
        calories: Math.round(baseNut.calories * factor),
        protein: scaleAmount(baseNut.protein, factor),
        carbs: scaleAmount(baseNut.carbs, factor),
        fat: scaleAmount(baseNut.fat, factor)
      };

      return {
        ...recipe,
        servings: servingsCount,
        allIngredients: scaledIngredients,
        nutritionalInfo: scaledNut
      };
    });

    res.json({
      recipes: scaledSelected,
      detectedIngredients: []
    });
  } catch (error: any) {
    console.error("Local Recipe Recommendation Error:", error);
    res.status(500).json({
      error: error.message || "An unexpected error occurred while recommending recipes locally.",
    });
  }
});

// Setup Vite Dev Server / Static Asset Serving
async function mountAssets() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware mounted.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static assets from:", distPath);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Pantry server listening on http://localhost:${PORT}`);
  });
}

mountAssets().catch((err) => {
  console.error("Failed to start full-stack server:", err);
});
