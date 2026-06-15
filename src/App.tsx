import React, { useState, useEffect, useMemo, useRef } from "react";
import { Recipe } from "./types";
import RecipeCard from "./components/RecipeCard";
import RecipeDetail from "./components/RecipeDetail";
import { 
  getTranslatedRecipe, 
  translateIngredientName, 
  translateAmount, 
  CATEGORY_TRANSLATIONS, 
  CUISINE_TRANSLATIONS 
} from "./recipesTranslation";
import { 
  ChefHat, 
  Plus, 
  X, 
  Sparkles, 
  Heart, 
  Trash2, 
  AlertCircle, 
  RotateCw, 
  Check, 
  Calendar,
  Utensils,
  BookOpen,
  PlusCircle,
  Sun,
  Moon,
  Users,
  ChevronDown
} from "lucide-react";

// Categorized most common/popular ingredients for 1-tap select accessibility
interface IngredientCategory {
  id: string;
  name: string;
  icon: string;
  shortName?: string;
  items: string[];
}

const CUISINE_OPTIONS = [
  { id: "Any", name: "Any Cuisine", icon: "🍽️" },
  { id: "Asian", name: "Asian", icon: "🥢" },
  { id: "American", name: "American", icon: "🍔" },
  { id: "Japanese", name: "Japanese", icon: "🍣" },
  { id: "Spanish", name: "Spanish", icon: "🥘" },
  { id: "Italian", name: "Italian", icon: "🍝" },
  { id: "Mexican", name: "Mexican", icon: "🌮" },
  { id: "French", name: "French", icon: "🥐" },
  { id: "Mediterranean", name: "Mediterranean", icon: "🥙" }
];

const COMMON_CATEGORIES: IngredientCategory[] = [
  {
    id: "meats",
    name: "Meats & Seafood",
    icon: "🥩",
    shortName: "Meats",
    items: [
      "Chicken Breast",
      "Ground Beef",
      "Bacon",
      "Salmon Fillet",
      "Shrimp",
      "Crab",
      "Lobster",
      "Mussels",
      "Clams",
      "Squid",
      "Scallops",
      "Pork Chops",
      "Turkey Breast",
      "Sirloin Steak",
      "Canned Tuna",
      "Cod Fillet"
    ]
  },
  {
    id: "dairy",
    name: "Dairy & Eggs",
    icon: "🥛",
    shortName: "Dairy",
    items: [
      "Eggs",
      "Milk",
      "Cheddar Cheese",
      "Butter",
      "Greek Yogurt",
      "Heavy Cream",
      "Parmesan Cheese",
      "Cream Cheese",
      "Mozzarella Cheese",
      "Sour Cream"
    ]
  },
  {
    id: "produce",
    name: "Vegetables & Greens",
    icon: "🥦",
    shortName: "Veggies",
    items: [
      "Garlic",
      "Onions",
      "Spinach",
      "Tomatoes",
      "Bell Peppers",
      "Mushrooms",
      "Broccoli",
      "Potatoes",
      "Avocado",
      "Carrots"
    ]
  },
  {
    id: "fruits",
    name: "Fruits",
    icon: "🍎",
    shortName: "Fruits",
    items: [
      "Lemon",
      "Lime",
      "Apples",
      "Bananas",
      "Strawberries",
      "Blueberries",
      "Oranges",
      "Pineapple",
      "Mango",
      "Peaches"
    ]
  },
  {
    id: "grains",
    name: "Grains & Pantry",
    icon: "🌾",
    shortName: "Grains",
    items: [
      "Pasta",
      "Rice",
      "Flour",
      "Bread",
      "Tortillas",
      "Oats",
      "Canned Tomatoes",
      "Black Beans",
      "White Sugar",
      "Quinoa"
    ]
  },
  {
    id: "dry_seasonings",
    name: "Spices & Seasonings",
    icon: "🧂",
    shortName: "Spices",
    items: [
      "Salt & Pepper",
      "Garlic Powder",
      "Onion Powder",
      "Paprika",
      "Cumin",
      "Oregano",
      "Chili Flakes",
      "Cinnamon",
      "Thyme",
      "Cayenne Pepper"
    ]
  },
  {
    id: "wet_seasonings",
    name: "Sauces & Oils",
    icon: "🍯",
    shortName: "Sauces",
    items: [
      "Olive Oil",
      "Soy Sauce",
      "Honey",
      "Dijon Mustard",
      "Mayonnaise",
      "Ketchup",
      "Sesame Oil",
      "Sriracha",
      "Balsamic Vinegar",
      "Lemon Juice"
    ]
  }
];

const ALL_SUGGESTABLE_INGREDIENTS = Array.from(new Set([
  ...COMMON_CATEGORIES.flatMap(cat => cat.items),
  "Spinach", "Pork Belly", "Soy Sauce", "Basil", "Ginger", "Coriander", "Cilantro", "Parsley", 
  "Beef", "Pork", "Lamb", "Cod", "Tuna", "Beef Sirloin", "Pork Chops", "Chicken Thighs", 
  "Heavy Whipping Cream", "Sour Cream", "Cheddar Cheese", "Mozzarella Cheese", "Feta Cheese", 
  "Blue Cheese", "Balsamic Vinegar", "Red Wine Vinegar", "Rice Vinegar", "Worcestershire Sauce", 
  "Oyster Sauce", "Clam Juice", "Tomato Paste", "Canned Tomatoes", "Coconut Milk", "Curry Paste", 
  "Peanut Butter", "Almond Butter", "Maple Syrup", "Vanilla Extract", "Baking Soda", "Yeast", 
  "Cornstarch", "Almond Flour", "Green Onions", "Scallions", "Shallots", "Leeks", "Celery", 
  "Cucumber", "Eggplant", "Cabbage", "Kale", "Cauliflower", "Asparagus", "Green Beans", "Peas", 
  "Corn", "Pumpkin", "Sweet Potatoes", "Mushrooms", "Shiitake Mushrooms", "Apples", "Bananas", 
  "Strawberries", "Blueberries", "Raspberries", "Oranges", "Lime", "Pineapple", "Mango", "Peaches", 
  "Plums", "Cherries", "Grapes", "Watermelon", "Mint", "Dill", "Sage", "Chives", "Cayenne Pepper", 
  "Turmeric", "Coriander Powder", "Garam Masala", "Cardamom", "Nutmeg", "Cloves", "Allspice", 
  "Mustard Seeds", "Fennel Seeds", "Sesame Seeds", "Safflower Oil", "Canola Oil", "Vegetable Oil", 
  "Coconut Oil", "Ghee"
]));

// Initial pre-loaded matched recipes that serve as high-quality starting templates
const SAMPLE_RECIPES: Recipe[] = [
  {
    id: "demo_1",
    name: "Tuscan Garlic Sweet Onion Frittata",
    description: "A fluffy, golden baked skillet frittata accented with minced garlic, caramelised sweet onions, and chopped rosemary leaves.",
    prepTime: 5,
    cookTime: 12,
    servings: 2,
    difficulty: "Easy",
    tags: ["Vegetarian", "Gluten-Free", "High-Protein"],
    detectedIngredients: ["Garlic", "Onions"],
    allIngredients: [
      { name: "Fresh Eggs", amount: "4 large", category: "Dairy" },
      { name: "Garlic Cloves", amount: "3 cloves, minced", category: "Produce" },
      { name: "Rosemary", amount: "1 sprig", category: "Produce" },
      { name: "Yellow Onion", amount: "1/2 medium", category: "Produce" },
      { name: "Olive Oil", amount: "1.5 tbsp", category: "Pantry" },
      { name: "Grated Parmesan", amount: "3 tbsp", category: "Dairy" },
      { name: "Sea Salt", amount: "To taste", category: "Pantry" }
    ],
    matchingIngredients: ["Garlic", "Onions", "Olive Oil"],
    additionalIngredientsNeeded: ["Fresh Eggs", "Rosemary", "Grated Parmesan"],
    instructions: [
      "In a medium bowl, whisk eggs with salt, pepper, and grated parmesan until light and frothy.",
      "Heat olive oil in a non-stick oven-safe skillet over medium-low heat. Sauté sliced onions until tender.",
      "Add minced garlic and chopped rosemary sprig. Sauté for 1 minute until highly fragrant.",
      "Pour whisked eggs into the pan, swirling to evenly distribute the aromatics.",
      "Cook on low heat for 5 minutes until the base sets, then broil briefly until fluffy and golden."
    ],
    nutritionalInfo: {
      calories: 270,
      protein: "15g",
      carbs: "4g",
      fat: "21g"
    },
    imageUrl: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "demo_2",
    name: "Classic Italian Aglio e Olio Pasta",
    description: "Al dente spaghetti tossed with gently sizzled garlic chips, premium olive oil, and optional crushed chilli flakes.",
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    difficulty: "Medium",
    tags: ["Vegan", "Pasta", "Quick"],
    detectedIngredients: ["Garlic", "Pasta"],
    allIngredients: [
      { name: "Spaghetti Pasta", amount: "180g", category: "Pantry" },
      { name: "Garlic Cloves", amount: "5 cloves, sliced", category: "Produce" },
      { name: "Olive Oil", amount: "4 tbsp", category: "Pantry" },
      { name: "Red Pepper Flakes", amount: "1/2 tsp", category: "Pantry" },
      { name: "Fresh Parsley", amount: "1 tbsp, chopped", category: "Produce" }
    ],
    matchingIngredients: ["Garlic", "Pasta", "Olive Oil"],
    additionalIngredientsNeeded: ["Fresh Parsley"],
    instructions: [
      "Bring a large pot of salted water to a rolling boil. Cook spaghetti according to details.",
      "Gently toast sliced garlic cloves in cold olive oil in a skillet over low-medium heat.",
      "Once garlic turns golden-white, scatter red pepper flakes and remove pan from direct heat.",
      "Add a splash of pasta cooking water to emulsify the sauce into a smooth glaze.",
      "Drain spaghetti, toss continuously into the garlic oil glaze, and serve immediately."
    ],
    nutritionalInfo: {
      calories: 440,
      protein: "8g",
      carbs: "56g",
      fat: "19g"
    },
    imageUrl: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "demo_3",
    name: "Honey Mustard Glazed Salmon",
    description: "Moist, oven-baked salmon fillets coated in a rich glaze made of dark honey, Dijon mustard, and cracked black pepper.",
    prepTime: 5,
    cookTime: 12,
    servings: 2,
    difficulty: "Easy",
    tags: ["High-Protein", "Seafood", "Keto"],
    detectedIngredients: ["Salmon Fillet", "Garlic"],
    allIngredients: [
      { name: "Salmon Fillet", amount: "2 fillets", category: "Meat" },
      { name: "Honey", amount: "2 tbsp", category: "Pantry" },
      { name: "Dijon Mustard", amount: "1 tbsp", category: "Pantry" },
      { name: "Soy Sauce", amount: "1 tsp", category: "Pantry" },
      { name: "Garlic Cloves", amount: "2 cloves, minced", category: "Produce" },
      { name: "Olive Oil", amount: "1 tbsp", category: "Pantry" },
      { name: "Lemon", amount: "1/2 fruit", category: "Produce" }
    ],
    matchingIngredients: ["Garlic", "Olive Oil"],
    additionalIngredientsNeeded: ["Salmon Fillet", "Honey", "Dijon Mustard", "Soy Sauce", "Lemon"],
    instructions: [
      "In a small glass bowl, whisk together the honey, Dijon mustard, soy sauce, and minced garlic with a pinch of salt.",
      "Brush the sweet honey glaze generously over both salmon fillets until fully coated on all sides.",
      "Heat olive oil in a skillet over medium heat. Place salmon skin-side down and cook for 4 minutes.",
      "Flip the fillets gently and cook for an additional 3 minutes until caramelized on top.",
      "Garnish with fresh lemon slices and black pepper before serving."
    ],
    nutritionalInfo: {
      calories: 390,
      protein: "34g",
      carbs: "14g",
      fat: "16g"
    },
    imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "demo_4",
    name: "Creamy Garlic Parmesan Bacon Chicken",
    description: "Succulent chicken breasts pan-seared with smoked bacon strips, simmered in heavy cream, melted parmesan, and fresh baby spinach.",
    prepTime: 10,
    cookTime: 18,
    servings: 2,
    difficulty: "Hard",
    tags: ["High-Protein", "Comfort Food", "Low-Carb"],
    detectedIngredients: ["Chicken Breast", "Bacon"],
    allIngredients: [
      { name: "Chicken Breast", amount: "2 portions", category: "Meat" },
      { name: "Bacon", amount: "4 strips", category: "Meat" },
      { name: "Garlic Cloves", amount: "4 cloves, minced", category: "Produce" },
      { name: "Spinaches", amount: "1 cup, fresh", category: "Produce" },
      { name: "Heavy Cream", amount: "1/2 cup", category: "Dairy" },
      { name: "Parmesan Cheese", amount: "1/4 cup", category: "Dairy" },
      { name: "Butter", amount: "1 tbsp", category: "Dairy" },
      { name: "Olive Oil", amount: "1 tbsp", category: "Pantry" }
    ],
    matchingIngredients: ["Chicken Breast", "Garlic", "Olive Oil"],
    additionalIngredientsNeeded: ["Bacon", "Spinaches", "Heavy Cream", "Parmesan Cheese", "Butter"],
    instructions: [
      "In a cold skillet, render bacon strips over medium heat for 6 minutes until perfectly crispy, then remove and chop.",
      "Season chicken breasts with garlic powder. Brown chicken in the rendered bacon fat for 5 minutes per side.",
      "In the same pan, melt butter and sauté minced garlic for 1 minute until soft and aromatic.",
      "Stir in heavy cream and shredded parmesan, then simmer on low heat for 3 minutes to thicken the sauce.",
      "Toss in fresh spinach leaves, stir until wilted, slide chicken back in, and sprinkle bacon pieces over top."
    ],
    nutritionalInfo: {
      calories: 580,
      protein: "45g",
      carbs: "5g",
      fat: "42g"
    },
    imageUrl: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "demo_5",
    name: "Sizzling Sesame Mushroom & Broccoli Stir-Fry",
    description: "Crisp broccoli florets and tender mushrooms tossed in a dark soy sesame garlic dressing, served piping hot on steam white rice.",
    prepTime: 10,
    cookTime: 10,
    servings: 2,
    difficulty: "Easy",
    tags: ["Vegetarian", "Vegan", "Healthy"],
    detectedIngredients: ["Mushrooms", "Broccoli"],
    allIngredients: [
      { name: "Fresh Mushrooms", amount: "150g, sliced", category: "Produce" },
      { name: "Broccoli Florets", amount: "1 head, chopped", category: "Produce" },
      { name: "Soy Sauce", amount: "2 tbsp", category: "Pantry" },
      { name: "Sesame Oil", amount: "1.5 tbsp", category: "Pantry" },
      { name: "Garlic Cloves", amount: "3 cloves, minced", category: "Produce" },
      { name: "Rice", amount: "1 cup", category: "Pantry" },
      { name: "Chili Flakes", amount: "1/2 tsp", category: "Pantry" }
    ],
    matchingIngredients: ["Garlic"],
    additionalIngredientsNeeded: ["Fresh Mushrooms", "Broccoli Florets", "Soy Sauce", "Sesame Oil", "Rice", "Chili Flakes"],
    instructions: [
      "Rinse rice thoroughly, boil in water for 15 minutes, drain, and fluff with a fork.",
      "Whisk soy sauce, sesame oil, and red chili flakes in a separate mixing cup until integrated.",
      "Heat a wok or large frying pan with olive oil. Sauté garlic and mushroom slices for 4 minutes until browned.",
      "Toss in broccoli florets and steam-fry on medium-high heat for 3 minutes until tender-crisp.",
      "Pour in the soy-sesame seasoning mixture, glaze everything evenly, and serve over steam rice hot."
    ],
    nutritionalInfo: {
      calories: 320,
      protein: "9g",
      carbs: "62g",
      fat: "6g"
    },
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "demo_6",
    name: "Gourmet Cheddar Garlic Cheeseburger",
    description: "Premium pan-seared juicy beef patties infused with minced garlic and cracked peppercorns, finished with rich melted cheddar slices.",
    prepTime: 10,
    cookTime: 8,
    servings: 2,
    difficulty: "Medium",
    tags: ["High-Protein", "Gourmet", "Comfort Food"],
    detectedIngredients: ["Beef Patty", "Cheese"],
    allIngredients: [
      { name: "Beef Patty", amount: "2 patties", category: "Meat" },
      { name: "Cheddar Cheese", amount: "2 slices", category: "Dairy" },
      { name: "Garlic Cloves", amount: "2 cloves, grated", category: "Produce" },
      { name: "Hamburger Buns", amount: "2 pieces", category: "Pantry" },
      { name: "Yellow Onion", amount: "1/2 medium", category: "Produce" },
      { name: "Sliced Tomato", amount: "1 fruit", category: "Produce" },
      { name: "Butter", amount: "1 tbsp", category: "Dairy" }
    ],
    matchingIngredients: ["Garlic", "Onions"],
    additionalIngredientsNeeded: ["Beef Patty", "Cheddar Cheese", "Hamburger Buns", "Sliced Tomato", "Butter"],
    instructions: [
      "Knead grated garlic and salt into the beef patties directly to infuse gourmet moisture.",
      "Heat a grill pan on medium-high heat with butter. Toast hamburger buns for 1 minute until crisp.",
      "Grill beef patties on high heat for 3 minutes, then flip them over to sear the other side.",
      "Place a cheddar cheese slice on each patty, cover the pan, and melt for 1 minute.",
      "Assemble with burger buns, cooked beef patties, sliced onions, tomatoes, and desired condiments."
    ],
    nutritionalInfo: {
      calories: 510,
      protein: "32g",
      carbs: "28g",
      fat: "30g"
    },
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "demo_7",
    name: "Sheet Pan Lemon Garlic Shrimp & Asparagus",
    description: "Crisp, oven-roasted asparagus spears and tender shrimp tossed in wild lemon-butter garlic sauce on a single sheet pan.",
    prepTime: 10,
    cookTime: 12,
    servings: 2,
    difficulty: "Easy",
    tags: ["High-Protein", "Seafood", "Keto", "Quick"],
    detectedIngredients: ["Shrimp", "Garlic"],
    allIngredients: [
      { name: "Raw Shrimp", amount: "250g, peeled", category: "Meat" },
      { name: "Asparagus spears", amount: "1 bunch", category: "Produce" },
      { name: "Garlic Cloves", amount: "3 cloves, minced", category: "Produce" },
      { name: "Lemon", amount: "1 fruit, juiced & sliced", category: "Produce" },
      { name: "Olive Oil", amount: "2 tbsp", category: "Pantry" },
      { name: "Butter", amount: "1 tbsp, melted", category: "Dairy" },
      { name: "Red Pepper Flakes", amount: "1/4 tsp", category: "Pantry" }
    ],
    matchingIngredients: ["Garlic", "Olive Oil"],
    additionalIngredientsNeeded: ["Raw Shrimp", "Asparagus spears", "Lemon", "Butter", "Red Pepper Flakes"],
    instructions: [
      "Preheat your oven to 400°F (200°C) and grease a large rimmed sheet pan with olive oil.",
      "Trim the tough woody ends off the asparagus spears and place them on one side of the pan.",
      "Toss asparagus with olive oil, minced garlic, a splash of lemon juice, salt, and pepper.",
      "Place shrimp on the other side of the sheet pan and drizzle with melted butter, remaining garlic, and lemon juice.",
      "Roast for 10-12 minutes until the shrimp are beautifully pink and opaque, and asparagus is tender-crisp."
    ],
    nutritionalInfo: {
      calories: 290,
      protein: "26g",
      carbs: "8g",
      fat: "18g"
    },
    imageUrl: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "demo_8",
    name: "Sun-Dried Tomato & Spinach Pasta Cream",
    description: "Al dente penne pasta coated in a creamy sun-dried tomato and heavy cream reduction infused with baby spinach and grated parmesan.",
    prepTime: 5,
    cookTime: 15,
    servings: 2,
    difficulty: "Medium",
    tags: ["Vegetarian", "Pasta", "Comfort Food"],
    detectedIngredients: ["Pasta", "Garlic", "Spinach"],
    allIngredients: [
      { name: "Penne Pasta", amount: "180g", category: "Pantry" },
      { name: "Sun-Dried Tomatoes", amount: "1/3 cup, sliced", category: "Produce" },
      { name: "Fresh Spinaches", amount: "1 cup", category: "Produce" },
      { name: "Garlic Cloves", amount: "3 cloves, minced", category: "Produce" },
      { name: "Heavy Cream", amount: "1/2 cup", category: "Dairy" },
      { name: "Parmesan Cheese", amount: "1/4 cup", category: "Dairy" },
      { name: "Olive Oil", amount: "1 tbsp", category: "Pantry" }
    ],
    matchingIngredients: ["Garlic", "Pasta", "Olive Oil"],
    additionalIngredientsNeeded: ["Sun-Dried Tomatoes", "Fresh Spinaches", "Heavy Cream", "Parmesan Cheese"],
    instructions: [
      "Bring a large pot of salted water to boil. Cook penne pasta according to package details.",
      "Heat olive oil in a skillet over medium heat. Sauté minced garlic and sliced sun-dried tomatoes for 2 minutes.",
      "Pour in the heavy cream and let simmer gently on low heat for 3-4 minutes to reduce and thicken.",
      "Stir in the fresh spinach leaves and grated parmesan cheese until spinach is completely wilted.",
      "Drain pasta and toss it into the skillet, coating it evenly in the sun-dried tomato sauce."
    ],
    nutritionalInfo: {
      calories: 490,
      protein: "12g",
      carbs: "64g",
      fat: "22g"
    },
    imageUrl: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=600&q=80"
  }
];

export const HEALTHY_INSIGHTS = [
  "Replacing refined grains with whole grains like brown rice, quinoa, or whole-wheat pasta doubles your fiber intake and helps stabilize day-long energy levels.",
  "Drinking a glass of water 15 minutes before high-fiber meals aids in smooth digestion and naturally supports healthy portion control.",
  "Aim to eat three different colored veggies in a single meal. Different colors reflect distinct phytonutrients that support robust cellular immunity.",
  "Keep cilantro, parsley, and asparagus fresh for up to two weeks by storing them upright inside a small glass of water in your fridge, just like fresh flowers.",
  "To reduce sodium without sacrificing flavor, squeeze fresh lemon or lime juice onto your dish at the end of cooking to highlight and amplify natural taste.",
  "Drizzling extra virgin olive oil over cooked veggies after removing them from heat preserves heat-sensitive antioxidants and healthy monounsaturated fats.",
  "Pairing complex carbohydrates with a clean protein source (like tofu, eggs, or poultry) lowers the glycemic index of your meal, preventing post-meal fatigue.",
  "If a soup or sauce is slightly too salty, simmer a peeled, halved potato inside. It acts like a sponge, drawing out excess salt while preserving rich aromatics.",
  "Save vegetable scraps like onion skins, carrot tops, and celery ends in your freezer. Boil them with water for an hour to yield a rich, sodium-free culinary broth.",
  "To ripen rock-hard avocados within 24 hours, place them in a paper bag with an apple or banana. The natural ethylene gas speeds up ripening beautifully.",
  "Never wash seasoned cast iron pans with abrasive soap or scrubbers! Rinse with warm water, wipe immediately, and buff with a drop of oil to maintain their seal.",
  "Crush or chop garlic and let it sit for 10 minutes before heating. This activates allicin, a compound with powerful heart-healthy and antioxidant properties.",
  "Substitute half the butter or oil with unsweetened applesauce in sweet baking recipes. This slashes calories while keeping your baked goods incredibly moist.",
  "Chewing your food slowly and mindfully triggers natural satiety cues in your brain before overeating can occur, supporting overall digestive comfort.",
  "Toss ground spices like cumin, turmeric, or coriander in hot oil for 30 seconds before adding other wet ingredients to fully bloom their essential aromatic oils.",
  "Rinsing dry rice in cold water 2-3 times removes excess surface starch. This guarantees fluffy, beautifully separate grains instead of a sticky or clumpy texture.",
  "Chopping broccoli, kale, or cabbage 40 minutes before cooking triggers the formation of sulforaphane—a highly potent, natural cancer-fighting compound.",
  "Pair fat-soluble vitamins (Vitamins A, D, E, K in carrots, spinach, tomatoes, pumpkins) with healthy fats like avocado or healthy oils to triple absorption.",
  "Use the edge of a teaspoon to peel fresh ginger root. It slides easily over bumps and curves, minimizing culinary waste while reaching the aromatic core.",
  "Always let cooked proteins rest for 5–10 minutes before slicing. This allows muscle fibers to relax, redistributing cooking juices so the meat stays tender."
];

// Helper function to calculate matching and missing ingredients dynamically
export function getRecipeMatchStats(recipe: Recipe, selectedIngredients: string[]) {
  if (!recipe.allIngredients || recipe.allIngredients.length === 0) {
    return { matching: [], missing: [], percentage: 100 };
  }

  const selectedNormList = selectedIngredients.map(item => item.toLowerCase().trim());
  const matching: string[] = [];
  const missing: string[] = [];

  recipe.allIngredients.forEach(ing => {
    const ingNameLower = ing.name.toLowerCase();
    
    // Check if any selected item is found in ingNameLower, or vice versa
    const isMatched = selectedNormList.some(sel => {
      // Stripping plural 's' at the end of the item if any
      const selSingular = sel.endsWith("s") && sel.length > 3 ? sel.slice(0, -1) : sel;
      const ingSingular = ingNameLower.endsWith("s") && ingNameLower.length > 3 ? ingNameLower.slice(0, -1) : ingNameLower;
      
      return ingNameLower.includes(sel) || 
             sel.includes(ingNameLower) || 
             ingSingular.includes(selSingular) ||
             selSingular.includes(ingSingular);
    });

    if (isMatched) {
      if (!matching.includes(ing.name)) {
        matching.push(ing.name);
      }
    } else {
      if (!missing.includes(ing.name)) {
        missing.push(ing.name);
      }
    }
  });

  const totalIngredients = recipe.allIngredients.length;
  const percentage = totalIngredients > 0 ? Math.round((matching.length / totalIngredients) * 100) : 0;

  return {
    matching,
    missing,
    percentage
  };
}

export default function App() {
  const [insight, setInsight] = useState<string>(() => {
    const randomIndex = Math.floor(Math.random() * HEALTHY_INSIGHTS.length);
    return HEALTHY_INSIGHTS[randomIndex];
  });

  const rotateInsight = () => {
    setInsight((current) => {
      let next = current;
      while (next === current && HEALTHY_INSIGHTS.length > 1) {
        next = HEALTHY_INSIGHTS[Math.floor(Math.random() * HEALTHY_INSIGHTS.length)];
      }
      return next;
    });
  };

  // Initialized with local database persistence
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(() => {
    const stored = localStorage.getItem("snapcook_selected_ingredients_v3");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        // Fallback to defaults
      }
    }
    return [
      "Chicken Breast",
      "Eggs",
      "Garlic",
      "Olive Oil",
      "Onions",
      "Pasta",
      "Salt & Pepper"
    ];
  });

  useEffect(() => {
    localStorage.setItem("snapcook_selected_ingredients_v3", JSON.stringify(selectedIngredients));
  }, [selectedIngredients]);

  const ALL_PREDEFINED_ITEMS = useMemo(() => {
    return new Set(
      COMMON_CATEGORIES.flatMap(cat => cat.items.map(item => item.toLowerCase().trim()))
    );
  }, []);

  const additionalIngredients = useMemo(() => {
    return selectedIngredients.filter(
      item => !ALL_PREDEFINED_ITEMS.has(item.toLowerCase().trim())
    );
  }, [selectedIngredients, ALL_PREDEFINED_ITEMS]);

  const [customInput, setCustomInput] = useState("");
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    const cleanQuery = customInput.trim();
    if (!cleanQuery) return [];
    
    const queryLower = cleanQuery.toLowerCase();
    
    const matches = ALL_SUGGESTABLE_INGREDIENTS.filter(item => {
      const itemLower = item.toLowerCase();
      const isAlreadySelected = selectedIngredients.some(sel => sel.toLowerCase() === itemLower);
      return !isAlreadySelected && itemLower.includes(queryLower);
    }).sort((a, b) => {
      const aStarts = a.toLowerCase().startsWith(queryLower);
      const bStarts = b.toLowerCase().startsWith(queryLower);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return a.localeCompare(b);
    }).slice(0, 8);

    const exactMatchExists = matches.some(m => m.toLowerCase() === queryLower) || 
                             selectedIngredients.some(sel => sel.toLowerCase() === queryLower);

    if (!exactMatchExists && cleanQuery.length > 0) {
      const capitalized = cleanQuery.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
      return [capitalized, ...matches];
    }

    return matches;
  }, [customInput, selectedIngredients]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectSuggestion = (item: string) => {
    if (!selectedIngredients.some((i) => i.toLowerCase() === item.toLowerCase())) {
      setSelectedIngredients((prev) => [...prev, item].sort((a, b) => a.localeCompare(b)));
    }
    setCustomInput("");
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestionIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestionIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      if (activeSuggestionIndex >= 0 && activeSuggestionIndex < suggestions.length) {
        e.preventDefault();
        const selectedValue = suggestions[activeSuggestionIndex];
        handleSelectSuggestion(selectedValue);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };
  const [activeCategory, setActiveCategory] = useState<string>(COMMON_CATEGORIES[0].id);
  
  // Strict mode: requires >= 90% matches
  const [isStrictMode, setIsStrictMode] = useState(true);
  const [selectedCuisine, setSelectedCuisine] = useState<string>("Any");
  const [lang] = useState<"en" | "ko">("en");
  const [servings, setServings] = useState<number>(4);
  const [showEmptyWarning, setShowEmptyWarning] = useState(false);

  // Persistent user comments system
  const [recipeComments, setRecipeComments] = useState<Record<string, { id: string; text: string; createdAt: string }[]>>(() => {
    try {
      const stored = localStorage.getItem("snapcook_recipe_comments_v3");
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("snapcook_recipe_comments_v3", JSON.stringify(recipeComments));
    } catch (e) {
      console.error(e);
    }
  }, [recipeComments]);

  const handleAddComment = (recipeId: string, text: string) => {
    if (!text.trim()) return;
    const newComment = {
      id: `comment_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      text: text.substring(0, 140),
      createdAt: new Date().toISOString(),
    };
    setRecipeComments((prev) => ({
      ...prev,
      [recipeId]: [newComment, ...(prev[recipeId] || [])],
    }));
  };

  const handleDeleteComment = (recipeId: string, commentId: string) => {
    setRecipeComments((prev) => ({
      ...prev,
      [recipeId]: (prev[recipeId] || []).filter((c) => c.id !== commentId),
    }));
  };

  // Meal Planner States
  const [mealPlan, setMealPlan] = useState<any[]>(() => {
    try {
      const stored = localStorage.getItem("snapcook_meal_plan_v3");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  const [boughtItems, setBoughtItems] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem("snapcook_bought_items_v3");
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      return {};
    }
  });

  const [recipeToPlan, setRecipeToPlan] = useState<Recipe | null>(null);
  const [slotAddingTo, setSlotAddingTo] = useState<{ day: string; meal: "Breakfast" | "Lunch" | "Dinner" } | null>(null);
  const [selectedPlanDay, setSelectedPlanDay] = useState<string>("Monday");
  const [selectedPlanMeal, setSelectedPlanMeal] = useState<"Breakfast" | "Lunch" | "Dinner">("Breakfast");

  useEffect(() => {
    try {
      localStorage.setItem("snapcook_meal_plan_v3", JSON.stringify(mealPlan));
    } catch (e) {
      console.error(e);
    }
  }, [mealPlan]);

  useEffect(() => {
    try {
      localStorage.setItem("snapcook_bought_items_v3", JSON.stringify(boughtItems));
    } catch (e) {
      console.error(e);
    }
  }, [boughtItems]);

  // Custom generated recipes list state
  const [recommendations, setRecommendations] = useState<Recipe[]>(SAMPLE_RECIPES);
  const [analyzing, setAnalyzing] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // Reset show-more count when recommendations or filtering keys change
  useEffect(() => {
    setVisibleCount(6);
  }, [selectedIngredients, selectedCuisine, isStrictMode, recommendations]);

  // Scroll to new items when visibleCount increases
  useEffect(() => {
    if (visibleCount > 6) {
      const targetIndex = visibleCount - 2;
      setTimeout(() => {
        const el = document.getElementById(`recipe-card-idx-${targetIndex}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [visibleCount]);

  // User handpicked favorites setup
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [activeTab, setActiveTab] = useState<"recommend" | "favorites" | "planner">("recommend");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // Dark Mode State and integration
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("snapcook_dark_mode");
      if (saved !== null) {
        return saved === "true";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("snapcook_dark_mode", String(darkMode));
  }, [darkMode]);

  // Load favorites on startup
  useEffect(() => {
    try {
      const stored = localStorage.getItem("snapcook_favorites_v2_sleek");
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Local storage read failure:", e);
    }
  }, []);

  const updateFavoritesList = (newList: Recipe[]) => {
    setFavorites(newList);
    try {
      localStorage.setItem("snapcook_favorites_v2_sleek", JSON.stringify(newList));
    } catch (e) {
      console.error("Local storage write failure:", e);
    }
  };

  const handleToggleFavorite = (recipe: Recipe, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const isAlreadyFav = favorites.some((f) => f.id === recipe.id);
    if (isAlreadyFav) {
      updateFavoritesList(favorites.filter((f) => f.id !== recipe.id));
    } else {
      updateFavoritesList([...favorites, recipe]);
    }
  };

  const handleClearAllIngredients = () => {
    setSelectedIngredients([]);
  };

  const handleAddCustomIngredient = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = customInput.trim();
    if (!clean) return;

    if (!selectedIngredients.some((i) => i.toLowerCase() === clean.toLowerCase())) {
      setSelectedIngredients((prev) => [...prev, clean].sort((a, b) => a.localeCompare(b)));
    }
    setCustomInput("");
  };

  const handleToggleIngredientSelect = (item: string) => {
    const isSelected = selectedIngredients.some(
      (i) => i.toLowerCase() === item.toLowerCase()
    );
    if (isSelected) {
      setSelectedIngredients((prev) =>
        prev.filter((i) => i.toLowerCase() !== item.toLowerCase())
      );
    } else {
      setSelectedIngredients((prev) => [...prev, item].sort((a, b) => a.localeCompare(b)));
    }
  };

  const handleRemoveIngredientChip = (item: string) => {
    setSelectedIngredients((prev) =>
      prev.filter((i) => i.toLowerCase() !== item.toLowerCase())
    );
  };

  const playCookingSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      // Sizzling fat/pan crackle (synthesized via Highpassed White Noise)
      const bufferSize = ctx.sampleRate * 2.5; // 2.5 seconds of culinary sounds
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noiseNode = ctx.createBufferSource();
      noiseNode.buffer = buffer;
      noiseNode.loop = true;
      
      const filterNode = ctx.createBiquadFilter();
      filterNode.type = "highpass";
      filterNode.frequency.value = 1800;
      
      const bandpassNode = ctx.createBiquadFilter();
      bandpassNode.type = "bandpass";
      bandpassNode.frequency.value = 4500;
      bandpassNode.Q.value = 1.0;
      
      const sizzleGain = ctx.createGain();
      sizzleGain.gain.setValueAtTime(0.04, ctx.currentTime);
      
      // Simulating low boiling/rumbling soup bubbles
      const bubbleOsc = ctx.createOscillator();
      bubbleOsc.type = "sine";
      bubbleOsc.frequency.value = 55; // low pitch hum
      
      const bubbleGain = ctx.createGain();
      bubbleGain.gain.setValueAtTime(0.07, ctx.currentTime);
      
      // Use low frequency oscillator to modulate bubble pitch to give distinct gurgling texture
      const lfo = ctx.createOscillator();
      lfo.type = "sawtooth";
      lfo.frequency.value = 5.5; // 5.5 bubbles/gurgles per second
      
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(14, ctx.currentTime);
      
      lfo.connect(lfoGain);
      lfoGain.connect(bubbleOsc.frequency);
      
      // Main out volume fader
      const mainGain = ctx.createGain();
      mainGain.gain.setValueAtTime(0.12, ctx.currentTime);
      // Fade out slowly to preserve pristine noise hygiene
      mainGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.4);
      
      // Hook up physical audio graph
      noiseNode.connect(filterNode);
      filterNode.connect(bandpassNode);
      bandpassNode.connect(sizzleGain);
      sizzleGain.connect(mainGain);
      
      bubbleOsc.connect(bubbleGain);
      bubbleGain.connect(mainGain);
      
      mainGain.connect(ctx.destination);
      
      // Ignite stovetop soundtrack
      noiseNode.start();
      bubbleOsc.start();
      lfo.start();
      
      // Cleanup nodes gracefully
      setTimeout(() => {
        try {
          noiseNode.stop();
          bubbleOsc.stop();
          lfo.stop();
          ctx.close();
        } catch (e) {}
      }, 2500);
    } catch (err) {
      console.warn("Audio Context sizzle generator output bypassed:", err);
    }
  };

  const handleGenerateRecipes = async () => {
    if (selectedIngredients.length === 0) {
      setShowEmptyWarning(true);
      setTimeout(() => setShowEmptyWarning(false), 2500);
      return;
    }

    // Play the cozy stylized baking sizzle & bubbling pot audio effect
    playCookingSound();

    setAnalyzing(true);
    setApiError(null);

    try {
      const response = await fetch("/api/recipe/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: null,
          imageType: "image/jpeg",
          ingredients: selectedIngredients,
          cuisine: selectedCuisine === "Any" ? null : selectedCuisine,
          servings: servings,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to plan recipes. Please try again.");
      }

      const rawData = await response.json();

      if (rawData && rawData.recipes) {
        setRecommendations(rawData.recipes);
        setActiveTab("recommend");
        // Scroll to the first match smoothly
        setTimeout(() => {
          const el = document.getElementById("recipe-card-idx-0");
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 350);
      } else {
        throw new Error("Pantry AI model returned an unexpected format.");
      }
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || "Unable to fetch matches. Check your network context.");
    } finally {
      setAnalyzing(false);
    }
  };

  const getCategoryStyles = (id: string, isActive: boolean) => {
    if (!isActive) {
      return "bg-zinc-50/60 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800/80";
    }
    return "bg-indigo-600 dark:bg-indigo-600 text-white border-indigo-600 dark:border-indigo-600 font-bold shadow-xs";
  };

  const getPantryTier = (count: number) => {
    if (count === 0) {
      return {
        title: "Pantry Eater 🍽️",
        desc: "Tap ingredients to unlock Chef matched guides!",
        color: "from-zinc-400 to-zinc-500 border-zinc-250 bg-zinc-50 text-zinc-600",
        progress: 10,
      };
    }
    if (count <= 3) {
      return {
        title: "Sizzling Cadet 🍳",
        desc: "Nice basics! Get a few more items to unlock Michelin levels!",
        color: "from-indigo-500 via-purple-500 to-indigo-600 border-indigo-200 bg-indigo-50/50 text-indigo-900",
        progress: 35,
      };
    }
    if (count <= 7) {
      return {
        title: "Kitchen Inventor 🥗✨",
        desc: "Fabulous variety! Unlocking high matched recipes!",
        color: "from-purple-450 via-indigo-555 to-purple-500 border-purple-250 bg-purple-50/50 text-purple-900",
        progress: 65,
      };
    }
    return {
      title: "Michelin Grandmaster 👑🧑‍🍳",
      desc: "Instant magical match rates! Culinary mastery unlocked!",
      color: "from-indigo-600 via-purple-600 to-indigo-700 border-indigo-200 bg-indigo-50/50 text-indigo-950 dark:text-indigo-900",
      progress: 100,
    };
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0c0b11] flex flex-col font-sans selection:bg-indigo-600 selection:text-white relative overflow-hidden" id="snapcook-app">
      
      {/* Live Organic Ambient Background Blobs to look popping/alive */}
      <div className="absolute top-12 left-12 w-80 h-80 rounded-full bg-indigo-100/10 dark:bg-indigo-900/5 blur-3xl pointer-events-none -z-10 animate-pulse duration-1000" />
      <div className="absolute top-1/3 right-12 w-96 h-96 rounded-full bg-violet-100/15 dark:bg-violet-900/5 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-16 left-1/4 w-80 h-80 rounded-full bg-zinc-100/30 dark:bg-zinc-900/5 blur-3xl pointer-events-none -z-10" />
      
      {/* Sleek Modern Header Navigation with Language Toggle */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-zinc-950/95 backdrop-blur-md px-6 py-4 flex flex-col md:flex-row items-center justify-between border-b border-zinc-100 dark:border-zinc-900 shadow-3xs gap-4 transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-405 rounded-xl flex items-center justify-center cursor-pointer hover:bg-indigo-100 transition-colors">
            <ChefHat className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="flex flex-col gap-0.5 items-start">
            <h1 className="text-zinc-900 dark:text-white font-sans font-black text-lg tracking-tight leading-none">
              <span>{lang === "ko" ? "마이클린 팬트리" : "Pantry"}</span>
            </h1>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold tracking-wider uppercase font-sans leading-none mt-1">
              {lang === "ko" ? "★ 신선한 식재료 요리 비서 ★" : "★ Smart Kitchen Companions ★"}
            </p>
          </div>
        </div>
 
        {/* Workspace Tab Switcher & Multi-Language / Dark Mode Toggle Group */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="flex bg-zinc-100 dark:bg-zinc-900/80 p-1 items-center text-[11px] rounded-full gap-1 border border-zinc-200/50 dark:border-zinc-800/80 font-sans shadow-4xs">
            <button
              onClick={() => setActiveTab("recommend")}
              className={`px-3.5 py-1.5 cursor-pointer font-bold rounded-full transition-all duration-200 ${
                activeTab === "recommend"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-3xs"
                  : "text-zinc-650 dark:text-zinc-405 hover:bg-zinc-205 dark:hover:bg-zinc-800/45"
              }`}
            >
              {lang === "ko" ? "식재료 매칭" : "Match Maker"}
            </button>
            <button
              onClick={() => setActiveTab("favorites")}
              className={`px-3.5 py-1.5 cursor-pointer font-bold rounded-full transition-all duration-200 flex items-center gap-1 ${
                activeTab === "favorites"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-3xs"
                  : "text-zinc-650 dark:text-zinc-405 hover:bg-zinc-205 dark:hover:bg-zinc-800/45"
              }`}
              id="nav-tab-favorites"
            >
              ❤️ {lang === "ko" ? "북마크" : "Saved"} ({favorites.length})
            </button>
            <button
              onClick={() => setActiveTab("planner")}
              className={`px-3.5 py-1.5 cursor-pointer font-bold rounded-full transition-all duration-200 flex items-center gap-1 ${
                activeTab === "planner"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-3xs"
                  : "text-zinc-650 dark:text-zinc-405 hover:bg-zinc-205 dark:hover:bg-zinc-800/45"
              }`}
              id="nav-tab-planner"
            >
              📅 {lang === "ko" ? "주간 식단" : "Planner"} ({mealPlan.length})
            </button>
          </div>



          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-750 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all cursor-pointer active:scale-95 shadow-4xs flex items-center justify-center gap-1 rounded-xl"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            id="theme-toggle-btn"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-indigo-400 stroke-[2.5]" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-700 stroke-[2.5]" />
            )}
          </button>
        </div>
      </header>

      {/* Primary Grid Layout */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-8">
        
        {/* Status Error Banner */}
        {apiError && (
          <div className="mb-6 p-4 rounded-xl bg-zinc-900 text-white flex gap-3.5 items-start">
            <AlertCircle className="w-5 h-5 text-zinc-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold text-sm block mb-0.5 font-mono">Recommendation error</span>
              <p className="text-xs text-zinc-300 leading-relaxed">{apiError}</p>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={handleGenerateRecipes}
                  className="px-3 py-1 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-950 dark:text-white rounded text-xs font-bold transition-all cursor-pointer"
                >
                  Retry
                </button>
                <button
                  type="button"
                  onClick={() => setApiError(null)}
                  className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-750 text-white rounded text-xs font-semibold cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-10">
          
          {activeTab === "recommend" && (
            /* Pantry Setup - with 8-bit retro makeover styling */
            <section className="w-full max-w-3xl mx-auto space-y-6 bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-xl shadow-zinc-200/20 dark:shadow-none">
            
            <div className="pb-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 flex items-center gap-2 font-sans">
                <span className="p-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 rounded-lg text-sm">✨</span>
                {lang === "ko" ? "오늘 어떤 요리를 할까요?" : "What can you cook today?"}
              </h2>
              
              <div className="mt-3.5 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/20 border border-zinc-150 dark:border-zinc-850 flex gap-4 items-start">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0 font-bold select-none">
                  🚀
                </div>
                <div>
                  <h3 className="text-zinc-900 dark:text-white font-extrabold text-sm tracking-tight leading-snug">
                    {lang === "ko" ? "마이클린 팬트리에 오신 것을 환영합니다!" : "Welcome to Pantry!"}
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-0.5 leading-relaxed font-normal">
                    {lang === "ko" 
                      ? "냉장고 속 재료들을 활용하여 셰프 수준의 명품 레시피를 만들어 보세요! 음식 낭비 없이 간편하게, 필요한 재료를 선택하고 원하는 인분수를 지정해 딱 맞춤형 요리 가이드를 생성합니다." 
                      : "Turn your ingredients into custom chef-quality recipes with the power of our matching database! No food waste, no hassle. Simply select your ingredients below, specify your diet styles, and let our engine draft your perfect meal guides."}
                  </p>
                </div>
              </div>
            </div>

            {/* STEP 1 CONTAINER: STOCK YOUR PANTRY */}
            <div className="p-5 md:p-6 bg-zinc-50/50 dark:bg-zinc-950/20 border border-zinc-200/60 dark:border-zinc-800 rounded-2xl space-y-6 shadow-3xs">
              <div className="flex items-start gap-3 pb-3">
                <span className="w-7 h-7 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-xs font-mono font-black flex-shrink-0">1</span>
                <div>
                  <h3 className="text-sm font-extrabold text-zinc-900 dark:text-white leading-tight">
                    {lang === "ko" ? "나의 보관 마이 팬트리" : "Your Kitchen Pantry"}
                  </h3>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-snug">
                    {lang === "ko" 
                      ? "현재 집이나 냉장고에 보유하고 계신 메인 식재료를 아래 패널에서 간단하게 클릭하여 선택해 주세요." 
                      : "Select ingredients you have on hand to unlock customized recipe matching."}
                  </p>
                </div>
              </div>

              {/* Categorized Ingredients Selection Block */}
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-indigo-850 dark:text-indigo-400 font-mono flex items-center gap-1.5">
                    {lang === "ko" ? "나의 보관소 목록" : "Your Pantry"}
                  </label>
                  {selectedIngredients.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClearAllIngredients}
                      className="text-[10px] font-mono font-bold uppercase text-rose-600 hover:text-rose-700 transition-colors flex items-center gap-1 cursor-pointer tracking-wider"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      {lang === "ko" ? "보관함 초기화" : "Reset Pantry"}
                    </button>
                  )}
                </div>
                
                {/* Clean Segmented Tab Controls */}
                <div className="flex gap-1.5 overflow-x-auto pb-2 pt-1 scrollbar-none font-sans">
                  {COMMON_CATEGORIES.map((cat) => {
                    const isActive = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all duration-205 cursor-pointer border shadow-4xs ${getCategoryStyles(
                          cat.id,
                          isActive
                        )}`}
                      >
                        <span className="text-sm select-none">{cat.icon}</span>
                        <span>{lang === "ko" ? (CATEGORY_TRANSLATIONS[cat.id] || CATEGORY_TRANSLATIONS[cat.name] || cat.shortName || cat.name) : (cat.shortName || cat.name)}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Items Pill Grid inside active category */}
                <div className="bg-white dark:bg-zinc-900 p-4.5 rounded-2xl border border-zinc-150 dark:border-zinc-800/80 shadow-3xs flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {COMMON_CATEGORIES.find((c) => c.id === activeCategory)?.items.map((item) => {
                      const isSelected = selectedIngredients.some(
                        (i) => i.toLowerCase() === item.toLowerCase()
                      );
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => handleToggleIngredientSelect(item)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-250 flex items-center gap-1.5 cursor-pointer active:scale-95 border ${
                            isSelected
                              ? "bg-indigo-600 dark:bg-indigo-500 text-white border-indigo-600 dark:border-indigo-500 shadow-4xs"
                              : "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-750"
                          }`}
                        >
                          {isSelected ? (
                            <Check className="w-3.5 h-3.5 text-white stroke-[3.5]" />
                          ) : (
                            <PlusCircle className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                          )}
                          <span>{lang === "ko" ? translateIngredientName(item) : item}</span>
                        </button>
                      );
                    })}
                  </div>

                  {(() => {
                    const currentCat = COMMON_CATEGORIES.find((c) => c.id === activeCategory);
                    if (!currentCat) return null;
                    const allItems = currentCat.items;
                    const unselectedItems = allItems.filter(
                      (item) => !selectedIngredients.some((i) => i.toLowerCase() === item.toLowerCase())
                    );
                    const isAllAdded = unselectedItems.length === 0;

                    return (
                      <div className="flex justify-end items-center pt-3">
                        {isAllAdded ? (
                          <div className="text-[10px] sm:text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 w-full justify-end select-none">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-550 animate-pulse" />
                            <span>{lang === "ko" ? `${CATEGORY_TRANSLATIONS[currentCat.id] || currentCat.name} 재료 모두 추가됨!` : `All ${currentCat.shortName || currentCat.name} Added!`}</span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedIngredients((prev) => {
                                const newItems = [...prev];
                                unselectedItems.forEach((item) => {
                                  if (!newItems.some((i) => i.toLowerCase() === item.toLowerCase())) {
                                    newItems.push(item);
                                  }
                                });
                                return newItems.sort((a, b) => a.localeCompare(b));
                              });
                            }}
                            className="px-3 py-1.5 bg-indigo-50/20 dark:bg-zinc-900/60 text-indigo-800 dark:text-indigo-400 font-extrabold uppercase tracking-wider font-mono rounded-lg border border-indigo-100/40 dark:border-zinc-800 text-[10px] hover:bg-indigo-50 dark:hover:bg-zinc-800 hover:text-indigo-900 dark:hover:text-indigo-300 transition-all flex items-center gap-1.5 cursor-pointer shadow-3xs hover:scale-102 active:scale-95"
                          >
                            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>{lang === "ko" ? `${CATEGORY_TRANSLATIONS[currentCat.id] || currentCat.name} 전체 추가` : `Add All ${currentCat.shortName || currentCat.name}`}</span>
                          </button>
                        )}
                      </div>
                    );
                  })()}

                  {/* List of Additional manually entered Pantry Items */}
                  {additionalIngredients.length > 0 && (
                    <div className="border-t border-zinc-150/60 dark:border-zinc-800/80 pt-4 mt-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 font-mono mb-2.5">
                        ➕ Additional Custom Items ({additionalIngredients.length})
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {additionalIngredients.map((item, idx) => (
                          <div 
                            key={`custom-pantry-item-${idx}`}
                            className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-850 rounded-xl shadow-4xs select-none"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 tracking-tight">
                              {item}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveIngredientChip(item)}
                              className="text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors cursor-pointer p-0.5 ml-1"
                              title={`Remove ${item}`}
                            >
                              <X className="w-3.5 h-3.5 stroke-[2.5]" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div ref={containerRef} className="space-y-2 pt-4 relative">
                <label className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-sans flex items-center gap-1.5">
                  {lang === "ko" ? "직접 추가 식재료" : "Additional Pantry Items"}
                </label>
                <form onSubmit={handleAddCustomIngredient} className="flex gap-2" id="manual-item-form">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder={lang === "ko" ? "예: 시금치, 삼겹살, 간장, 바질 등" : "E.g., Spinach, Pork Belly, Soy Sauce, Basil"}
                      value={customInput}
                      onChange={(e) => {
                        setCustomInput(e.target.value);
                        setShowSuggestions(true);
                        setActiveSuggestionIndex(-1);
                      }}
                      onFocus={() => setShowSuggestions(true)}
                      onKeyDown={handleKeyDown}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 outline-none tracking-tight text-xs bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white transition-all focus:border-indigo-500/80 shadow-4xs"
                      id="ingredient-text-input"
                      autoComplete="off"
                    />

                    {/* Autocomplete Suggestions Menu */}
                    {showSuggestions && suggestions.length > 0 && (
                      <div className="absolute left-0 right-0 mt-1.5 max-h-48 overflow-y-auto bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-800 rounded-xl shadow-lg z-50 py-1 divide-y divide-zinc-50 dark:divide-zinc-900 scrollbar-thin">
                        {suggestions.map((item, index) => (
                          <div
                            key={item}
                            onClick={() => handleSelectSuggestion(item)}
                            className={`px-3.5 py-2 text-xs font-semibold cursor-pointer transition-colors flex justify-between items-center rounded-lg ${
                              index === activeSuggestionIndex
                                ? "bg-indigo-600 text-white font-bold"
                                : "text-zinc-700 dark:text-zinc-350 hover:bg-zinc-100 hover:text-zinc-950"
                            }`}
                          >
                            <span>{lang === "ko" ? translateIngredientName(item) : item}</span>
                            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-sans">{lang === "ko" ? "선택" : "Select"}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="px-4.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center gap-1 transition-all cursor-pointer shadow-4xs active:scale-95"
                    id="add-ingredient-btn"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>{lang === "ko" ? "추가" : "Add"}</span>
                  </button>
                </form>
              </div>

              {/* Categorized Display of Selected Pantry Items */}
              {selectedIngredients.length > 0 && (
                <div className="border-t border-zinc-200/60 dark:border-zinc-800/85 pt-5 space-y-3.5">
                  <div>
                    <h4 className="text-[11px] font-black uppercase tracking-wider text-indigo-650 dark:text-indigo-400 font-sans flex items-center gap-1.5">
                      <span>🗂️</span>
                      <span>{lang === "ko" ? "선택된 재료 (카테고리별)" : "Pantry Inventory by Category"}</span>
                      <span className="ml-1 px-1.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-[9px] font-extrabold font-mono border border-indigo-100/50 dark:border-indigo-900/40">
                        {selectedIngredients.length} {selectedIngredients.length === 1 ? "item" : "items"}
                      </span>
                    </h4>
                    <p className="text-[9.5px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-tight">
                      {lang === "ko" 
                        ? "선택된 요리 재료들이 보관소 카테고리별로 정렬되어 있습니다. 간단히 탭하거나 클릭하여 삭제가 가능합니다." 
                        : "Your active kitchen ingredients sorted by pantry category. Click any item chip to quickly remove it."}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {/* Predefined Categories */}
                    {COMMON_CATEGORIES.map((cat) => {
                      const matchingItems = selectedIngredients.filter(item => 
                        cat.items.some(catItem => catItem.toLowerCase().trim() === item.toLowerCase().trim())
                      );
                      if (matchingItems.length === 0) return null;

                      return (
                        <div 
                          key={`categorized-pantry-${cat.id}`}
                          className="bg-indigo-50/50 dark:bg-indigo-950/25 border border-indigo-100/80 dark:border-indigo-900/45 rounded-xl p-3 shadow-4xs flex flex-col justify-start"
                        >
                          <div className="flex items-center justify-between border-b border-indigo-100/50 dark:border-indigo-900/30 pb-1.5 mb-2">
                            <span className="text-[10px] font-extrabold uppercase tracking-wide text-indigo-950/80 dark:text-indigo-200 font-sans flex items-center gap-1.5">
                              <span className="text-xs select-none">{cat.icon}</span>
                              <span>{lang === "ko" ? (CATEGORY_TRANSLATIONS[cat.id] || cat.shortName || cat.name) : (cat.shortName || cat.name)}</span>
                            </span>
                            <span className="text-[8.5px] font-black font-mono text-indigo-700 dark:text-indigo-300 bg-indigo-100/60 dark:bg-indigo-900/40 px-1.5 py-0.5 rounded-md">
                              {matchingItems.length}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            {matchingItems.map((item) => (
                              <button
                                key={`selected-chip-${item}`}
                                type="button"
                                onClick={() => handleRemoveIngredientChip(item)}
                                className="px-2 py-1 bg-white hover:bg-rose-50/50 dark:bg-indigo-900/30 dark:hover:bg-rose-950/20 border border-indigo-100/80 hover:border-rose-200 dark:border-indigo-900/35 dark:hover:border-rose-900/60 text-zinc-800 hover:text-rose-650 dark:text-indigo-200 dark:hover:text-rose-455 text-[10px] font-semibold rounded-lg flex items-center gap-1 cursor-pointer transition-all active:scale-95 group"
                                title={lang === "ko" ? `${translateIngredientName(item)} 제거` : `Remove ${item}`}
                              >
                                <span className="truncate max-w-[12ch] sm:max-w-none">{lang === "ko" ? translateIngredientName(item) : item}</span>
                                <X className="w-2.5 h-2.5 text-zinc-400 group-hover:text-rose-500 transition-colors ml-0.5 stroke-[3.0]" />
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}

                    {/* Custom & Remaining Ingredients */}
                    {(() => {
                      const customItems = selectedIngredients.filter(item => 
                        !COMMON_CATEGORIES.some(cat => 
                          cat.items.some(catItem => catItem.toLowerCase().trim() === item.toLowerCase().trim())
                        )
                      );
                      if (customItems.length === 0) return null;

                      return (
                        <div 
                          key="categorized-pantry-custom"
                          className="bg-indigo-50/50 dark:bg-indigo-950/25 border border-indigo-100/80 dark:border-indigo-900/45 rounded-xl p-3 shadow-4xs flex flex-col justify-start"
                        >
                          <div className="flex items-center justify-between border-b border-indigo-100/50 dark:border-indigo-900/30 pb-1.5 mb-2">
                            <span className="text-[10px] font-extrabold uppercase tracking-wide text-indigo-950/80 dark:text-indigo-200 font-sans flex items-center gap-1.5">
                              <span className="text-xs select-none">✨</span>
                              <span>{lang === "ko" ? "기타 추가 식재료" : "Extras & Custom"}</span>
                            </span>
                            <span className="text-[8.5px] font-black font-mono text-indigo-700 dark:text-indigo-300 bg-indigo-100/60 dark:bg-indigo-900/40 px-1.5 py-0.5 rounded-md">
                              {customItems.length}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            {customItems.map((item) => (
                              <button
                                key={`selected-chip-custom-${item}`}
                                type="button"
                                onClick={() => handleRemoveIngredientChip(item)}
                                className="px-2 py-1 bg-white hover:bg-rose-50/50 dark:bg-indigo-900/30 dark:hover:bg-rose-950/20 border border-indigo-100/80 hover:border-rose-200 dark:border-indigo-900/35 dark:hover:border-rose-900/60 text-zinc-800 hover:text-rose-650 dark:text-indigo-205 dark:hover:text-rose-455 text-[10px] font-semibold rounded-lg flex items-center gap-1 cursor-pointer transition-all active:scale-95 group"
                                title={lang === "ko" ? `${translateIngredientName(item)} 제거` : `Remove ${item}`}
                              >
                                <span className="truncate max-w-[12ch] sm:max-w-none">{item}</span>
                                <X className="w-2.5 h-2.5 text-zinc-400 group-hover:text-rose-500 transition-colors ml-0.5 stroke-[3.0]" />
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              )}
            </div>

            {/* STEP 2 CONTAINER: PREFERENCES */}
            <div className="p-5 md:p-6 bg-zinc-50/50 dark:bg-zinc-950/20 border border-zinc-200/60 dark:border-zinc-800 rounded-2xl space-y-6 shadow-3xs">
              <div className="flex items-start gap-3 pb-3">
                <span className="w-7 h-7 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-xs font-mono font-black flex-shrink-0">2</span>
                <div>
                  <h3 className="text-sm font-extrabold text-zinc-900 dark:text-white leading-tight">
                    {lang === "ko" ? "선호도 스타일 & 요리 분량 지정" : "Customize Cuisine & Portion Sizes"}
                  </h3>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-snug">
                    {lang === "ko" 
                      ? "추천받으실 요리 카테고리의 주요 스타일과 한 번에 만드실 요리의 적정 섭취 제공량을 설정해 주세요." 
                      : "Personalize the styling flavor and portion sizes for custom recipe guides."}
                  </p>
                </div>
              </div>

              {/* Cuisine Style Selection (Step 2A) */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-sans flex items-center gap-1.5">
                  {lang === "ko" ? "선호요리 종류 선택" : "Choose Cuisine Preference"}
                </label>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-white dark:bg-zinc-900 p-3 rounded-2xl border border-zinc-150 dark:border-zinc-800 shadow-4xs">
                  {CUISINE_OPTIONS.map((c) => {
                    const isSelected = selectedCuisine === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedCuisine(c.id)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all duration-200 cursor-pointer border ${
                          isSelected
                            ? "bg-indigo-600 dark:bg-indigo-505 text-white border-indigo-600 dark:border-indigo-550 shadow-4xs"
                            : "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-750"
                        }`}
                      >
                        <span className="text-sm select-none">{c.icon}</span>
                        <span>{lang === "ko" ? (CUISINE_TRANSLATIONS[c.name] || CUISINE_TRANSLATIONS[c.id] || c.name) : c.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Number of Servings Selection (Step 2C) */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-sans flex items-center gap-1.5">
                  {lang === "ko" ? "완성 요리 가이드 인분수" : "Select Number of Servings"}
                </label>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white dark:bg-zinc-900 p-3 rounded-2xl border border-zinc-150 dark:border-zinc-800 shadow-4xs">
                  {/* Decrement / Increment counter controls */}
                  <div className="flex items-center justify-between sm:justify-start bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-1.5 gap-3.5 shadow-4xs min-w-[140px]">
                    <button
                      type="button"
                      onClick={() => setServings(Math.max(1, servings - 1))}
                      disabled={servings <= 1}
                      className="w-8 h-8 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-350 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer font-bold text-base transition-all"
                    >
                      -
                    </button>
                    <div className="flex items-center gap-1.5 px-1 font-sans">
                      <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400 stroke-[2.2]" />
                      <span className="text-sm font-extrabold text-zinc-905 dark:text-zinc-100 font-mono min-w-[1ch] text-center">
                        {servings}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setServings(Math.min(12, servings + 1))}
                      disabled={servings >= 12}
                      className="w-8 h-8 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-350 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer font-bold text-base transition-all"
                    >
                      +
                    </button>
                  </div>

                  {/* Fast-tap serving presets */}
                  <div className="grid grid-cols-4 gap-1.5 flex-1">
                    {[
                      { count: 1, label: lang === "ko" ? "1인 가구" : "Single" },
                      { count: 2, label: lang === "ko" ? "2인 추천" : "Couple" },
                      { count: 4, label: lang === "ko" ? "4인 집밥" : "Family" },
                      { count: 6, label: lang === "ko" ? "단체 모임" : "Group" }
                    ].map((p) => {
                      const isSelected = servings === p.count;
                      return (
                        <button
                          key={p.count}
                          type="button"
                          onClick={() => setServings(p.count)}
                          className={`py-1.5 px-1.5 rounded-xl border transition-all duration-200 cursor-pointer text-center active:scale-95 flex flex-col items-center justify-center shadow-4xs ${
                            isSelected
                              ? "bg-indigo-600 text-white border-indigo-600 font-bold"
                              : "bg-white dark:bg-zinc-850 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-750 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                          }`}
                        >
                          <span className="text-[10px] font-black tracking-tight block leading-tight">{p.count} {p.count === 1 ? "Serv" : "Servs"}</span>
                          <span className={`text-[8px] font-medium block mt-0.5 opacity-80 ${isSelected ? "text-white" : "text-zinc-500"}`}>{p.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 md:p-6 bg-zinc-50/50 dark:bg-zinc-950/20 border border-zinc-200/60 dark:border-zinc-800 rounded-2xl space-y-4 shadow-3xs">
              <div className="flex items-start gap-3 pb-2">
                <span className="w-7 h-7 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-xs font-mono font-black flex-shrink-0">3</span>
                <div>
                  <h3 className="text-sm font-extrabold text-zinc-900 dark:text-white leading-tight">
                    {lang === "ko" ? "스마트 요리 비서 가동!" : "Fire Up the Stove!"}
                  </h3>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-snug">
                    {lang === "ko" 
                      ? "준비 끝! 아래 가이드를 작동해 선택하신 식재료에 딱 맞는 명품 지도를 확인해 보세요." 
                      : "Let's simmer, fry, and bake! Find delicious guides tailored perfectly to whatever ingredients you have."}
                  </p>
                </div>
              </div>

              {/* Refined Combination Status Dashboard */}
              <div className="py-4 px-3 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-150 dark:border-zinc-850 flex flex-col gap-3 shadow-4xs">
                <div className="flex items-center justify-between text-[10px] font-sans font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                  <span>{lang === "ko" ? "엔진 작동 상태" : "Engine Status"}</span>
                  <span className={`flex items-center gap-1 ${
                    selectedIngredients.length > 0 ? "text-indigo-600" : "text-zinc-400"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      selectedIngredients.length > 0 ? "bg-indigo-550 animate-pulse" : "bg-zinc-400"
                    }`} />
                    {selectedIngredients.length > 0 ? (lang === "ko" ? "스마트 매칭 중" : "Active") : (lang === "ko" ? "대기 중" : "Standby")}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-xl">
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-sans uppercase tracking-wide block">{lang === "ko" ? "선택된 재료" : "Loaded Items"}</span>
                    <span className="font-extrabold text-zinc-900 dark:text-white mt-0.5 block truncate">
                      {selectedIngredients.length} {lang === "ko" ? "개 품목" : "Ingredients"}
                    </span>
                  </div>
                  <div className="p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-xl">
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-sans uppercase tracking-wide block">{lang === "ko" ? "요리 제공량" : "Portion Sizes"}</span>
                    <span className="font-extrabold text-zinc-900 dark:text-white mt-0.5 block truncate">
                      {servings} {lang === "ko" ? "인분" : (servings === 1 ? "Serving" : "Servings")}
                    </span>
                  </div>
                  <div className="p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-xl">
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-sans uppercase tracking-wide block">{lang === "ko" ? "선택 요리" : "Chosen Cuisine"}</span>
                    <span className="font-extrabold text-zinc-900 dark:text-white mt-0.5 block truncate">
                      {(() => {
                        const activeCuisineObj = CUISINE_OPTIONS.find(c => c.id === selectedCuisine) || CUISINE_OPTIONS[0];
                        return `${activeCuisineObj.icon} ${lang === "ko" ? (CUISINE_TRANSLATIONS[selectedCuisine] || CUISINE_TRANSLATIONS[activeCuisineObj.name] || activeCuisineObj.name) : activeCuisineObj.name}`;
                      })()}
                    </span>
                  </div>
                </div>

                {selectedIngredients.length === 0 ? (
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-normal text-center py-2 italic font-medium">
                    {lang === "ko" ? "재료를 위에 등록해 주시면 스마트 검색이 즉시 시작됩니다." : "Add ingredients on the active shelf to begin combination matches."}
                  </p>
                ) : (
                  <div className="p-2.5 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-xs">🥘</span>
                      <span className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 truncate">
                        {lang === "ko" ? (
                          <>조합식: <strong className="font-bold text-indigo-900 dark:text-indigo-400">{translateIngredientName(selectedIngredients[0])}</strong> {selectedIngredients.length > 1 ? `외 ${selectedIngredients.length - 1}건` : ""}</>
                        ) : (
                          <>Combinations: <strong className="font-bold text-zinc-900 dark:text-zinc-100">{selectedIngredients[0]}</strong> {selectedIngredients.length > 1 ? `+ ${selectedIngredients.length - 1} more` : ""}</>
                        )}
                      </span>
                    </div>
                    <span className="text-[9px] font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-widest flex-shrink-0 animate-pulse font-sans">Ready</span>
                  </div>
                )}
              </div>

              {/* Recipe Matching CTA Action */}
              <div className="pt-1" id="recommendation-trigger-block">
                <button
                  type="button"
                  onClick={handleGenerateRecipes}
                  disabled={analyzing}
                  className={`w-full py-4 text-[11px] font-bold tracking-widest uppercase flex items-center justify-center gap-2 border border-transparent shadow-xs hover:scale-101 active:scale-98 transition-all cursor-pointer rounded-2xl font-sans ${
                    analyzing ? "opacity-60 bg-indigo-700 text-white" : ""
                  } ${
                    showEmptyWarning 
                      ? "bg-rose-500 hover:bg-rose-600 animate-bounce text-white font-bold" 
                      : selectedIngredients.length === 0
                        ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-bold"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
                  id="generate-recipes-btn"
                >
                  {analyzing ? (
                    <>
                      <RotateCw className="w-4 h-4 animate-spin fill-none" />
                      <span>{lang === "ko" ? "조합 및 매칭 레시피 계산 중..." : "Matching combinations..."}</span>
                    </>
                  ) : showEmptyWarning ? (
                    <>
                      <AlertCircle className="w-4 h-4 animate-pulse" />
                      <span>{lang === "ko" ? "재료를 먼저 선택하세요!" : "Select ingredients first!"}</span>
                    </>
                  ) : (
                    <>
                      <Utensils className="w-4 h-4 text-white fill-none" />
                      <span>{lang === "ko" ? "매칭 레시피 추천받기!" : "Let's Start Cooking!"}</span>
                    </>
                  )}
                </button>
                {selectedIngredients.length === 0 && (
                  <span className="block text-center text-[10px] text-zinc-500 dark:text-zinc-400 mt-2 font-sans font-bold animate-pulse">
                    {showEmptyWarning 
                      ? (lang === "ko" ? "⚠️ 등록된 재료가 없어요!" : "⚠️ No ingredients select list yet!") 
                      : (lang === "ko" ? "식재료를 선택하시면 조합 알고리즘이 가동됩니다." : "Select items to unlock delicious guidelines")}
                  </span>
                )}
              </div>
            </div>

          </section>
        )}

          {/* Recipes lists / results - full width below the pantry setup */}
          <section className="w-full max-w-7xl mx-auto space-y-6">
            
            {activeTab === "recommend" && (
              <div>
                {selectedIngredients.length === 0 ? null : (
                  // Active ingredients present -> Render recommendation grid!
                  <div>
                    {/* Modern strict mode control cards info */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/45 rounded-2xl mb-5.5 gap-4 shadow-3xs">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-lg select-none">
                          🍳
                        </div>
                        <div>
                          <span className="text-[11px] font-bold text-zinc-900 dark:text-zinc-150 block font-mono">STRICT PANTRY MATCH (90%+)</span>
                          <span className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-tight block">
                            Only showing formulas where you own at least 90% of ingredients.
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 self-end sm:self-center">
                        <span className="text-[10px] font-bold font-mono text-indigo-800 dark:text-indigo-400">
                          {isStrictMode ? "ON (Strict)" : "OFF (Show All)"}
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsStrictMode(!isStrictMode)}
                          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out focus:outline-hidden ${
                            isStrictMode ? "bg-indigo-600" : "bg-zinc-250 dark:bg-zinc-800"
                          }`}
                          id="strict-match-toggle"
                          title="Toggle Strict Match Filtering"
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-250 ease-in-out ${
                              isStrictMode ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Header line for recipes list */}
                    <div className="flex justify-between items-center mb-4.5">
                      <div>
                        <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-805 dark:text-zinc-250 font-mono flex items-center gap-1.5 font-sans">
                          <BookOpen className="w-3.5 h-3.5" />
                          {lang === "ko" ? "스마트 맞춤형 추천 레시피" : "Gourmet Recipes"}
                        </h2>
                        <p className="text-[11px] text-zinc-500 mt-0.5 font-sans">
                          {lang === "ko" ? "선택된 식재료들을 기반으로 즉석 제조 가능한 요리 목록입니다." : "A custom culinary selection built around your pantry."}
                        </p>
                      </div>
                      <span className="text-[10px] uppercase font-mono font-bold bg-zinc-900 text-white px-2.5 py-1 rounded">
                        {recommendations.length} {lang === "ko" ? "개 발견됨" : "total"}
                      </span>
                    </div>

                    {analyzing ? (
                      // Smooth skeleton layout loader
                      <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-xl p-12 flex flex-col items-center justify-center text-center shadow-3xs min-h-[380px] space-y-4">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full border-2 border-dashed border-zinc-950 animate-spin" />
                          <ChefHat className="w-4 h-4 text-zinc-950 absolute inset-0 m-auto animate-pulse" />
                        </div>
                        <div>
                          <h3 className="text-zinc-900 font-bold text-xs tracking-tight uppercase font-mono">{lang === "ko" ? "최적의 맞춤 조합 빌드 중..." : "Formulating kitchen recipes..."}</h3>
                          <p className="text-zinc-500 text-xs max-w-xs mt-1.5 text-center leading-normal">
                            {lang === "ko" ? "식재료 결합, 단백질 영양분 분석, 단계별 상세 설명 및 타이머 보정을 수행하고 있습니다..." : "Consulting protein profiles, designing detailed instructions, and configuring kitchen prep timers..."}
                          </p>
                        </div>
                      </div>
                    ) : (() => {
                      // Dynamically compute matches for all items
                      const withStats = recommendations.map(r => ({
                        recipe: r,
                        stats: getRecipeMatchStats(r, selectedIngredients)
                      }));

                      const filtered = withStats.filter(item => {
                        const matchesCuisine = selectedCuisine === "Any" || item.recipe.tags.some(tag => tag.toLowerCase() === selectedCuisine.toLowerCase());
                        const matchesStrict = !isStrictMode || item.stats.percentage >= 90;
                        return matchesCuisine && matchesStrict;
                      });

                      if (filtered.length === 0) {
                        return (
                          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-10 py-14 text-center flex flex-col items-center justify-center shadow-3xs animate-in fade-in zoom-in-95">
                            <div className="p-3 bg-rose-50 text-rose-500 border border-rose-100 rounded-full mb-3.5">
                              <AlertCircle className="w-5 h-5" />
                            </div>
                            <h3 className="text-zinc-900 font-bold text-sm uppercase tracking-tight font-mono mb-1.5">{lang === "ko" ? "매칭되는 레시피 없음" : "No Matches Found"}</h3>
                            <p className="text-zinc-500 text-xs max-w-xs leading-relaxed mb-6 font-sans">
                              {lang === "ko" 
                                ? `선택한 요리 필터(${selectedCuisine !== "Any" ? `종류: ${selectedCuisine}` : "전체"}) 조건을 만족하는 레시피가 없습니다. 선호 요리 필터를 완화하거나 더 많은 식재료를 추가하여 활성화해 주세요!` 
                                : `No recipes fit your selected filters (${selectedCuisine !== "Any" ? `Cuisine: ${selectedCuisine}` : ""}). Try relaxing your filters or selecting more ingredients!`}
                            </p>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedCuisine("Any");
                                setIsStrictMode(false);
                              }}
                              className="px-4.5 py-2 hover:bg-zinc-800 text-xs font-bold text-white bg-zinc-950 shadow-xs rounded-xl active:scale-95 transition-all cursor-pointer font-sans"
                            >
                              {lang === "ko" ? "모든 필터 보정 초기화" : "Reset All Filters"}
                            </button>
                          </div>
                        );
                      }

                      const sliced = filtered.slice(0, visibleCount);
                      const hasMore = filtered.length > visibleCount;

                      return (
                        <div className="space-y-8">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sliced.map(({ recipe, stats }, index) => {
                              const isFav = favorites.some((f) => f.id === recipe.id);
                              const translatedRec = getTranslatedRecipe(recipe, lang);
                              return (
                                <div key={recipe.id} id={`recipe-card-idx-${index}`} className="scroll-mt-24 animate-fade-in">
                                  <RecipeCard
                                    recipe={translatedRec}
                                    matchStats={stats}
                                    isFavorite={isFav}
                                    onToggleFavorite={handleToggleFavorite}
                                    onViewDetails={(r) => setSelectedRecipe(r)}
                                    onAddToMealPlan={setRecipeToPlan}
                                    lang={lang}
                                    comments={recipeComments[recipe.id] || []}
                                    onAddComment={handleAddComment}
                                    onDeleteComment={handleDeleteComment}
                                  />
                                </div>
                              );
                            })}
                          </div>

                          {hasMore && (
                            <div className="flex justify-center pt-2">
                              <button
                                type="button"
                                onClick={() => setVisibleCount((prev) => prev + 2)}
                                className="inline-flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 hover:border-zinc-300 dark:hover:border-zinc-700 text-xs font-bold text-zinc-800 dark:text-zinc-200 rounded-xl shadow-2xs hover:shadow-xs active:scale-95 transition-all cursor-pointer group"
                              >
                                <span>{lang === "ko" ? "레시피 더 보기" : "Show More Options"}</span>
                                <ChevronDown className="w-3.5 h-3.5 text-zinc-500 group-hover:translate-y-0.5 transition-transform" />
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            )}

            {activeTab === "favorites" && (
              // Saved Favorites Tab
              <div>
                <div className="flex justify-between items-center mb-4.5">
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 font-mono flex items-center gap-1.5 font-sans">
                      <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                      {lang === "ko" ? "즐겨찾기 보관함" : "Bookmarks Favorites"}
                    </h2>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                      {lang === "ko" ? "즐겨찾는 보관 처리가 완료된 고효율 영양 레시피들입니다." : "Your saved, easy-to-use favorite recipe guides."}
                    </p>
                  </div>
                  <span className="text-[10px] uppercase font-mono font-bold bg-zinc-900 text-white px-2.5 py-1 rounded">
                    {favorites.length} {lang === "ko" ? "개 저장됨" : "Saved"}
                  </span>
                </div>

                {favorites.length === 0 ? (
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-xl p-10 text-center py-16 flex flex-col items-center justify-center shadow-3xs animate-fade-in">
                    <div className="p-3 bg-zinc-50 text-zinc-400 border border-zinc-150 rounded-full mb-3">
                      <Heart className="w-5 h-5" />
                    </div>
                    <h3 className="text-zinc-900 font-bold text-xs uppercase tracking-tight font-mono mb-1">{lang === "ko" ? "즐겨찾기 보관함이 비어 있습니다" : "Your bookmarks bar is empty"}</h3>
                    <p className="text-zinc-500 text-xs max-w-[280px] leading-relaxed font-sans">
                      {lang === "ko" 
                        ? "원하는 레시피 카드의 하트 아이콘을 탭해두시면 언제든지 간편하게 이곳에 실시간 요리 동반자가 등록됩니다." 
                        : "Toggle the Heart button inside any recipe card to save recipes here for instant cookout guides."}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((recipe) => {
                      const stats = getRecipeMatchStats(recipe, selectedIngredients);
                      const translatedRec = getTranslatedRecipe(recipe, lang);
                      return (
                        <RecipeCard
                          key={recipe.id}
                          recipe={translatedRec}
                          matchStats={stats}
                          isFavorite={true}
                          onToggleFavorite={handleToggleFavorite}
                          onViewDetails={(r) => setSelectedRecipe(r)}
                          onAddToMealPlan={setRecipeToPlan}
                          lang={lang}
                          comments={recipeComments[recipe.id] || []}
                          onAddComment={handleAddComment}
                          onDeleteComment={handleDeleteComment}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === "planner" && (
              <div className="space-y-6 animate-fade-in w-full">
                {/* Header line for planner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/60 dark:border-zinc-800 pb-4">
                  <div className="text-left">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 font-mono flex items-center gap-1.5 font-sans">
                      <Calendar className="w-4 h-4 text-indigo-500" />
                      {lang === "ko" ? "주간 스마트 요리 계획표" : "Weekly Meal Planner"}
                    </h2>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 font-sans">
                      {lang === "ko" 
                        ? "아침, 점심, 저녁 먹고 싶은 메뉴를 계획하고 실시간 장보기 리스트를 자동 컴파일해 보세요." 
                        : "Map out your breakfast, lunch, and dinner recipes and build checklist-ready grocery lists instantly."}
                    </p>
                  </div>
                  {mealPlan.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        const confirmMsg = lang === "ko" ? "정말로 주간 식단표 전체를 비우시겠습니까?" : "Are you sure you want to clear your entire weekly meal plan?";
                        if (confirm(confirmMsg)) {
                          setMealPlan([]);
                          setBoughtItems({});
                        }
                      }}
                      className="px-3 py-1.5 border border-rose-250 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-600 dark:text-rose-400 hover:text-rose-700 rounded-xl text-xs font-extrabold transition-all cursor-pointer active:scale-95 self-start font-sans"
                    >
                      {lang === "ko" ? "주간 식단 초기화" : "Clear Weekly Agenda"}
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
                  
                  {/* Widescreen meal plan bento agenda list */}
                  <div className="xl:col-span-3 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-3 text-center">
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => {
                        const dayMeals = mealPlan.filter(p => p.day === day);
                        const dayLabelsKo: Record<string, string> = {
                          "Monday": "월요일",
                          "Tuesday": "화요일",
                          "Wednesday": "수요일",
                          "Thursday": "목요일",
                          "Friday": "금요일",
                          "Saturday": "토요일",
                          "Sunday": "일요일"
                        };
                        return (
                          <div 
                            key={day} 
                            className="bg-white dark:bg-[#121118] border border-zinc-200/80 dark:border-zinc-850 rounded-2xl p-3 flex flex-col min-h-[320px] shadow-3xs"
                          >
                            <span className="text-[11px] font-extrabold uppercase tracking-widest text-indigo-900 dark:text-indigo-400 font-mono border-b border-zinc-100 dark:border-zinc-800/80 pb-1.5 mb-2.5 text-center">
                              {lang === "ko" ? dayLabelsKo[day] : day.substr(0,3) + "day"}
                            </span>
                            
                            <div className="space-y-3 flex-1 flex flex-col justify-between">
                              {/* Breakfast, Lunch, Dinner lists */}
                              {(["Breakfast", "Lunch", "Dinner"] as const).map((mealType) => {
                                const mealItem = dayMeals.find(p => p.meal === mealType);
                                return (
                                  <div key={mealType} className="space-y-1">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[8.5px] font-extrabold font-mono tracking-wider uppercase text-zinc-400">
                                        {mealType === "Breakfast" 
                                          ? (lang === "ko" ? "🥞 아침 식단" : "🥞 Breakfast") 
                                          : mealType === "Lunch" 
                                            ? (lang === "ko" ? "🍛 점심 식단" : "🍛 Lunch") 
                                            : (lang === "ko" ? "🍽️ 저녁 식단" : "🍽️ Dinner")}
                                      </span>
                                      {mealItem && (
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setMealPlan(prev => prev.filter(p => p.id !== mealItem.id));
                                          }}
                                          className="text-zinc-400 hover:text-rose-500 transition-colors p-0.5 cursor-pointer"
                                          title={lang === "ko" ? "식단에서 제외" : "Remove meal"}
                                        >
                                          <X className="w-3 h-3" />
                                        </button>
                                      )}
                                    </div>
                                    
                                    {mealItem ? (() => {
                                      const translatedRec = getTranslatedRecipe(mealItem.recipe, lang);
                                      return (
                                        <div 
                                          onClick={() => setSelectedRecipe(mealItem.recipe)}
                                          className="p-1.5 bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100/60 dark:border-indigo-900/40 hover:border-indigo-400 dark:hover:border-indigo-500 rounded-xl transition-all cursor-pointer text-left shadow-4xs group"
                                        >
                                          <div className="aspect-video w-full rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 mb-1.5 relative">
                                            <img 
                                              src={translatedRec.imageUrl} 
                                              alt={translatedRec.name} 
                                              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                                              referrerPolicy="no-referrer"
                                            />
                                          </div>
                                          <span className="text-[10px] font-extrabold text-zinc-900 dark:text-zinc-100 leading-tight block truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 font-sans">
                                            {translatedRec.name}
                                          </span>
                                          <div className="flex items-center gap-1 mt-0.5 text-[8.5px] text-zinc-550 dark:text-zinc-400 font-mono">
                                            <span>{translatedRec.prepTime + translatedRec.cookTime}{lang === "ko" ? "분" : "m"}</span>
                                            <span>•</span>
                                            <span className="capitalize">
                                              {lang === "ko" 
                                                ? (translatedRec.difficulty === "Easy" ? "쉬움" : translatedRec.difficulty === "Medium" ? "보통" : "어려움") 
                                                : translatedRec.difficulty}
                                            </span>
                                          </div>
                                        </div>
                                      );
                                    })() : (
                                      <button
                                        type="button"
                                        onClick={() => setSlotAddingTo({ day, meal: mealType })}
                                        className="w-full h-11 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-indigo-400 hover:bg-indigo-50/10 dark:hover:bg-indigo-950/20 flex items-center justify-center text-zinc-400 hover:text-indigo-500 transition-all text-[9.5px] font-bold cursor-pointer"
                                      >
                                        {lang === "ko" ? "+ 추가" : "+ Add"}
                                      </button>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Grocery list component sidebar panel */}
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-2xl p-4.5 shadow-3xs space-y-4 text-left">
                    <div className="border-b border-zinc-50 dark:border-zinc-800 pb-3">
                      <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-900 dark:text-white font-sans flex items-center gap-1.5">
                        🛒 {lang === "ko" ? "식재료 쇼핑 체크리스트" : "Grocery Checklist"}
                      </h3>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-450 mt-0.5 font-sans">
                        {lang === "ko" ? `식사 계획표의 ${mealPlan.length}개 메뉴 기반 자동 산출` : `Consolidated from ${mealPlan.length} active slots`}
                      </p>
                    </div>

                    {mealPlan.length === 0 ? (
                      <div className="text-center py-10 text-zinc-400 text-xs font-medium font-sans">
                        <p className="leading-spaced">
                          {lang === "ko" 
                            ? "식사 계획 캘린더에 메뉴를 담으시면 필요한 쇼핑 재료가 여기에 실시간으로 계산됩니다." 
                            : "Schedule kitchen formulas on your bento calendar to auto-compile your grocery shopping list."}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {(() => {
                          const map: Record<string, { name: string; category: string; items: { rName: string; amt: string }[] }> = {};
                          mealPlan.forEach(planItem => {
                            const translatedRec = getTranslatedRecipe(planItem.recipe, lang);
                            translatedRec.allIngredients.forEach((ing: any) => {
                              const key = ing.name.toLowerCase().trim();
                              const cat = ing.category || "Pantry";
                              if (!map[key]) {
                                map[key] = {
                                  name: ing.name,
                                  category: cat,
                                  items: []
                                };
                              }
                              map[key].items.push({
                                rName: translatedRec.name,
                                amt: ing.amount
                              });
                            });
                          });

                          const consolidated = Object.values(map);
                          const categories = Array.from(new Set(consolidated.map(c => c.category)));

                          return (
                            <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
                              {categories.map(cat => {
                                const catIngs = consolidated.filter(c => c.category === cat);
                                return (
                                  <div key={cat} className="space-y-2">
                                    <span className="text-[9px] font-mono font-extrabold uppercase tracking-widest text-[#15141d] dark:text-[#a5b4fc] bg-indigo-50/50 dark:bg-indigo-950/30 px-2 py-0.5 rounded border border-indigo-100/35 dark:border-indigo-900/20">
                                      {cat}
                                    </span>
                                    <div className="space-y-1.5 pl-1">
                                      {catIngs.map(ing => {
                                        const isChecked = !!boughtItems[ing.name.toLowerCase()];
                                        return (
                                          <div 
                                            key={ing.name} 
                                            onClick={() => {
                                              const key = ing.name.toLowerCase();
                                              setBoughtItems(prev => ({
                                                ...prev,
                                                [key]: !prev[key]
                                              }));
                                            }}
                                            className="flex items-start gap-2.5 group cursor-pointer py-1.5 select-none"
                                          >
                                            <input 
                                              type="checkbox" 
                                              checked={isChecked}
                                              onChange={() => {}} 
                                              className="h-3.5 w-3.5 mt-0.5 rounded-sm border-zinc-350 text-indigo-600 focus:ring-indigo-500 cursor-pointer pointer-events-none"
                                            />
                                            <div className="leading-none flex-1 min-w-0">
                                              <span className={`text-[11px] font-bold text-zinc-800 dark:text-zinc-200 block truncate ${isChecked ? "line-through opacity-45" : ""}`}>
                                                {ing.name}
                                              </span>
                                              <span className="text-[9px] text-zinc-450 dark:text-zinc-500 font-mono block mt-0.5 truncate">
                                                {ing.items.map(it => `${it.amt}`).join(" + ")}
                                              </span>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Informational culinary helper banner (Kitchen Chef Tips - Pop Out Design) */}
            {activeTab === "recommend" && (
              <div className="p-5 bg-amber-50/50 dark:bg-zinc-900 border border-amber-200 dark:border-zinc-800 rounded-2xl flex gap-4 text-xs leading-relaxed relative overflow-hidden shadow-3xs">
                <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-[0.05] select-none pointer-events-none text-orange-950 dark:text-orange-50">
                  <ChefHat className="w-28 h-28" />
                </div>
                
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0 border border-indigo-100/10">
                  <ChefHat className="w-5.5 h-5.5 stroke-[2.2]" />
                </div>

                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between gap-3 flex-wrap text-left">
                    <span className="font-extrabold text-orange-950 dark:text-amber-200 block text-xs sm:text-sm tracking-tight font-sans">
                      🧑‍🍳 {lang === "ko" ? "스마트 셰프의 프리미엄 요리 꿀팁" : "Kitchen Chef's Intelligence Hub"}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        rotateInsight();
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-wider bg-amber-100 hover:bg-amber-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-amber-955 dark:text-amber-200 rounded-lg transition-all cursor-pointer active:scale-95 text-left"
                    >
                      <RotateCw className="w-2.5 h-2.5 text-orange-850 dark:text-amber-300" />
                      {lang === "ko" ? "다음 팁 보기" : "Next Tip"}
                    </button>
                  </div>
                  <p className="text-zinc-750 dark:text-zinc-250 font-medium leading-relaxed pr-2 text-left">
                    {insight}
                  </p>
                  <div className="inline-flex items-center gap-1.5 mt-1 text-[9px] text-amber-850 dark:text-amber-300 font-extrabold uppercase tracking-widest font-sans bg-amber-100/50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md text-left">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse" />
                    {lang === "ko" ? "스마트 조언 활동 중" : "Smart Chef Advice Active"}
                  </div>
                </div>
              </div>
            )}

          </section>

        </div>

      </main>

      {/* Expanded Recipe Detail Drawer Overlay component */}
      {selectedRecipe && (
        <RecipeDetail
          recipe={getTranslatedRecipe(selectedRecipe, lang)}
          isFavorite={favorites.some((f) => f.id === selectedRecipe.id)}
          onToggleFavorite={handleToggleFavorite}
          onClose={() => setSelectedRecipe(null)}
          selectedIngredients={selectedIngredients}
          onAddToMealPlan={(r) => {
            setRecipeToPlan(r);
            setSelectedRecipe(null);
          }}
          lang={lang}
        />
      )}

      {/* Recipe Selection Drawer when clicking blank slot */}
      {slotAddingTo && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121118] border border-zinc-200 dark:border-zinc-805 rounded-3xl max-w-lg w-full max-h-[80vh] flex flex-col p-6 shadow-2xl animate-fade-in relative text-left">
            <button
              onClick={() => setSlotAddingTo(null)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-650 dark:hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#15141d] dark:text-white font-mono mb-1">
              {lang === "ko" 
                ? `${({
                    "Monday": "월요일", "Tuesday": "화요일", "Wednesday": "수요일", "Thursday": "목요일", "Friday": "금요일", "Saturday": "토요일", "Sunday": "일요일"
                  } as Record<string, string>)[slotAddingTo.day]} 요리 추가하기` 
                : `Select Recipe for ${slotAddingTo.day}`}
            </h3>
            <p className="text-zinc-550 text-[11px] mb-4 font-sans">
              {lang === "ko" ? (
                <span>아래 추천 중 <strong className="font-extrabold text-[#15141d] dark:text-zinc-300">{slotAddingTo.meal === "Breakfast" ? "아침 식단" : slotAddingTo.meal === "Lunch" ? "점심 식단" : "저녁 식단"}</strong>으로 추가할 메뉴를 선택해 주세요.</span>
              ) : (
                <span>Choose an option below to plan for <strong className="font-extrabold text-[#15141d] dark:text-zinc-305">{slotAddingTo.meal}</strong>.</span>
              )}
            </p>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {recommendations.map((recipe) => (
                <div 
                  key={recipe.id}
                  onClick={() => {
                    const newItem = {
                      id: `plan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                      recipe,
                      day: slotAddingTo.day,
                      meal: slotAddingTo.meal
                    };
                    setMealPlan(prev => [...prev, newItem]);
                    setSlotAddingTo(null);
                  }}
                  className="p-3 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-205 dark:border-zinc-800 hover:border-indigo-400 dark:hover:border-indigo-500 rounded-2xl cursor-pointer hover:bg-indigo-50/5 transition-all flex items-center gap-3.5 group"
                >
                  <img 
                    src={recipe.imageUrl} 
                    alt={recipe.name} 
                    className="w-12 h-12 rounded-xl object-cover bg-zinc-150 flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {recipe.name}
                    </h4>
                    <p className="text-[10px] text-zinc-500 truncate mt-0.5">{recipe.description}</p>
                    <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                      <div className="flex items-center gap-2 mt-1 text-[8.5px] text-zinc-500 font-mono">
                        <span>⏱️ {recipe.prepTime + recipe.cookTime} {lang === "ko" ? "분" : "mins"}</span>
                        <span>•</span>
                        <span className="capitalize">🧠 {lang === "ko" ? (recipe.difficulty === "Easy" ? "쉬움" : recipe.difficulty === "Medium" ? "보통" : "어려움") : recipe.difficulty}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Day / Meal Selector Modal when assigning recipe from a card button */}
      {recipeToPlan && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121118] border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl animate-fade-in relative text-left">
            <button
              onClick={() => setRecipeToPlan(null)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-650 dark:hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-850 pb-3.5 mb-4.5">
              <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-950/45 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="leading-snug min-w-0 flex-1">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#15141d] dark:text-white font-mono">
                  Assign to Planner
                </h3>
                <p className="text-zinc-550 dark:text-zinc-400 text-[10.5px] truncate mt-0.5">
                  {recipeToPlan.name}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-zinc-400 font-mono block mb-2">
                  1. Choose Day of Week
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((d) => {
                    const isSelected = selectedPlanDay === d;
                    return (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setSelectedPlanDay(d)}
                        className={`py-1.5 px-0.5 rounded-lg text-[10px] font-bold text-center border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-indigo-600 border-indigo-700 text-white font-extrabold"
                            : "bg-zinc-50 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-indigo-400"
                        }`}
                      >
                        {d.substr(0, 3)}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-zinc-400 font-mono block mb-2">
                  2. Choose Meal Slot
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["Breakfast", "Lunch", "Dinner"] as const).map((m) => {
                    const isSelected = selectedPlanMeal === m;
                    return (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setSelectedPlanMeal(m)}
                        className={`py-2 px-1 rounded-xl text-[10.5px] font-black text-center border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-indigo-600 border-indigo-700 text-white font-bold"
                            : "bg-zinc-50 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-850 hover:border-indigo-400"
                        }`}
                      >
                        {m === "Breakfast" ? "🥞 Breakf" : m === "Lunch" ? "🍛 Lunch" : "🍽️ Dinner"}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  const newItem = {
                    id: `plan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                    recipe: recipeToPlan,
                    day: selectedPlanDay,
                    meal: selectedPlanMeal
                  };
                  setMealPlan(prev => [...prev, newItem]);
                  setRecipeToPlan(null);
                }}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-650 hover:from-indigo-700 hover:to-purple-750 active:scale-98 text-white rounded-xl text-xs font-mono font-black shadow-md mt-2 transition-all cursor-pointer text-center"
              >
                Confirm Meal Slot
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modern footer details */}
      <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200/80 dark:border-zinc-850 py-5 text-center text-zinc-400 text-[10px] font-mono leading-none flex-shrink-0 mt-12">
        Pantry &copy; {new Date().getFullYear()} • Powered by local offline database matching engine
      </footer>

    </div>
  );
}
