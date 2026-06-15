import { Recipe } from "./types";

export const BASE_RECIPES: Omit<Recipe, "matchingIngredients" | "additionalIngredientsNeeded" | "detectedIngredients">[] = [
  {
    id: "rec_carbonara",
    name: "Classic Spaghetti Carbonara",
    description: "A silky, rich Roman classic made with crispy bacon, eggs, and plenty of sharp cheese.",
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    difficulty: "Easy",
    tags: ["Italian", "Pasta", "Classic", "Comfort Food"],
    allIngredients: [
      { name: "Pasta", amount: "200g", category: "Grains" },
      { name: "Bacon", amount: "100g", category: "Meat" },
      { name: "Eggs", amount: "2 whole", category: "Dairy" },
      { name: "Parmesan Cheese", amount: "50g", category: "Dairy" },
      { name: "Garlic", amount: "2 cloves", category: "Produce" },
      { name: "Butter", amount: "1 tbsp", category: "Dairy" },
      { name: "Salt & Pepper", amount: "1 tsp", category: "Dry Seasonings" }
    ],
    instructions: [
      "Bring a large pot of salted water to a boil and cook the Pasta according to package directions until al dente.",
      "While pasta cooks, chop the Bacon into small pieces and crisp in a pan over medium heat with the Butter and minced Garlic.",
      "In a bowl, whisk together the Eggs and finely grated Parmesan Cheese. Season generously with black pepper.",
      "Reserve 1/2 cup of pasta water, then drain the Pasta.",
      "Immediately toss the hot pasta in the pan with bacon and garlic off the heat.",
      "Quickly pour in the egg and cheese mixture, stirring vigorously so the residual heat cooks the eggs into a smooth, creamy sauce. Add pasta water if too thick."
    ],
    nutritionalInfo: {
      calories: 680,
      protein: "24g",
      carbs: "75g",
      fat: "30g"
    }
  },
  {
    id: "rec_garlic_chicken",
    name: "Garlic Butter Chicken Breast",
    description: "Juicy pan-seared chicken breasts bathed in a rich lemon-garlic butter reduction.",
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    difficulty: "Easy",
    tags: ["Italian", "High-Protein", "Easy", "Gluten-Free"],
    allIngredients: [
      { name: "Chicken Breast", amount: "2 pieces", category: "Meat" },
      { name: "Butter", amount: "3 tbsp", category: "Dairy" },
      { name: "Garlic", amount: "4 cloves", category: "Produce" },
      { name: "Lemon", amount: "1 whole", category: "Fruits" },
      { name: "Olive Oil", amount: "1 tbsp", category: "Pantry" },
      { name: "Salt & Pepper", amount: "1/2 tsp", category: "Dry Seasonings" }
    ],
    instructions: [
      "Pat the Chicken Breasts dry with paper towels and season both sides thoroughly with Salt & Pepper.",
      "Heat Olive Oil and 1 tbsp of Butter in a large skillet over medium-high heat. Sear chicken for 6-7 minutes per side until golden and cooked through.",
      "Remove chicken to a plate to rest. Reduce heat to medium.",
      "Add remaining 2 tbsp of Butter and minced Garlic to the skillet, stirring constantly for 1 minute until fragrant.",
      "Squeeze the juice of the Lemon into the pan, scraping up any browned bits from the chicken.",
      "Return the chicken and any resting juices back to the skillet, spooning the lemon garlic butter sauce over the top before serving."
    ],
    nutritionalInfo: {
      calories: 420,
      protein: "38g",
      carbs: "4g",
      fat: "28g"
    }
  },
  {
    id: "rec_beef_broccoli",
    name: "Homestyle Beef & Broccoli Stir-Fry",
    description: "Savory sirloin strips or ground beef tossed with crisp broccoli florets in a seasoned ginger-garlic sauce.",
    prepTime: 15,
    cookTime: 10,
    servings: 2,
    difficulty: "Medium",
    tags: ["Asian", "High-Protein", "Quick", "Dinner"],
    allIngredients: [
      { name: "Sirloin Steak", amount: "300g", category: "Meat" },
      { name: "Broccoli", amount: "1 head", category: "Produce" },
      { name: "Garlic", amount: "3 cloves", category: "Produce" },
      { name: "Onions", amount: "1/2 medium", category: "Produce" },
      { name: "Rice", amount: "1 cup", category: "Grains" },
      { name: "Olive Oil", amount: "2 tbsp", category: "Pantry" },
      { name: "Salt & Pepper", amount: "1/2 tsp", category: "Dry Seasonings" }
    ],
    instructions: [
      "Rinse and cook the Rice in 2 cups of water until fluffy, then keep covered.",
      "Cut the Sirloin Steak against the grain into thin, bite-sized strips. Season with Salt & Pepper.",
      "Chop the Broccoli into bite-sized florets and julienne the Onion.",
      "Heat 1 tbsp Olive Oil in a large pan or wok over high heat. Sear beef strips quickly for 2-3 minutes until browned. Remove from pan.",
      "Heat the remaining Olive Oil. Sauté Onions, Broccoli, and minced Garlic for 3-4 minutes until broccoli is bright green but still tender-crisp.",
      "Toss the beef back into the pan, mix well, and serve hot over the freshly steamed bed of Rice."
    ],
    nutritionalInfo: {
      calories: 590,
      protein: "34g",
      carbs: "52g",
      fat: "22g"
    }
  },
  {
    id: "rec_garlic_salmon",
    name: "Creamy Garlic Butter Salmon",
    description: "Flaky salmon fillets pan-seared and simmered in a luscious heavy cream sauce loaded with fresh spinach.",
    prepTime: 10,
    cookTime: 20,
    servings: 2,
    difficulty: "Medium",
    tags: ["Mediterranean", "Seafood", "Keto", "High-Protein"],
    allIngredients: [
      { name: "Salmon Fillet", amount: "2 pieces", category: "Meat" },
      { name: "Butter", amount: "2 tbsp", category: "Dairy" },
      { name: "Garlic", amount: "4 cloves", category: "Produce" },
      { name: "Heavy Cream", amount: "1/2 cup", category: "Dairy" },
      { name: "Spinach", amount: "2 cups", category: "Produce" },
      { name: "Lemon", amount: "1/2 whole", category: "Fruits" },
      { name: "Olive Oil", amount: "1 tbsp", category: "Pantry" },
      { name: "Salt & Pepper", amount: "1/2 tsp", category: "Dry Seasonings" }
    ],
    instructions: [
      "Season Salmon Fillets on both sides with Salt & Pepper.",
      "Heat Olive Oil and 1 tbsp Butter in a large skillet over medium-high heat. Sear salmon for 4 minutes of skin-side up, flip and sear 3 minutes skin-side down. Transfer to plate.",
      "Reduce heat to medium. Add remaining Butter and minced Garlic, cooking for 1 minute until soft and aromatic.",
      "Pour in the Heavy Cream and squeeze the Lemon juice. Bring to a gentle boil, then turn down heat to a low simmer.",
      "Stir in the fresh Spinach and let it wilt completely into the sauce.",
      "Return salmon to the skillet, spooning the velvety white cream sauce over each fillet, and simmer for another 2 minutes until fully heated."
    ],
    nutritionalInfo: {
      calories: 560,
      protein: "32g",
      carbs: "5g",
      fat: "42g"
    }
  },
  {
    id: "rec_breakfast_omelette",
    name: "Loaded Breakfast Omelette",
    description: "Fluffy wholesome eggs folded around savory bacon, cheddar, sauteed mushrooms, and baby spinach.",
    prepTime: 5,
    cookTime: 10,
    servings: 1,
    difficulty: "Easy",
    tags: ["French", "Breakfast", "Gluten-Free", "Easy"],
    allIngredients: [
      { name: "Eggs", amount: "3 whole", category: "Dairy" },
      { name: "Bacon", amount: "2 slices", category: "Meat" },
      { name: "Cheddar Cheese", amount: "1/4 cup", category: "Dairy" },
      { name: "Mushrooms", amount: "3 pieces", category: "Produce" },
      { name: "Spinach", amount: "1/2 cup", category: "Produce" },
      { name: "Onions", amount: "2 tbsp", category: "Produce" },
      { name: "Butter", amount: "1 tbsp", category: "Dairy" },
      { name: "Milk", amount: "2 tbsp", category: "Dairy" },
      { name: "Salt & Pepper", amount: "1 pinch", category: "Dry Seasonings" }
    ],
    instructions: [
      "In a medium bowl, whisk together the Eggs, Milk, and a pinch of Salt & Pepper until nice and frothy.",
      "Chop Bacon, Mushrooms, and Onions. Cook bacon in a skillet until crisp. Sauté mushrooms and onions in the rendering bacon fat for 2 minutes, then stir in Spinach until wilted. Remove and set aside.",
      "Clean pan, melt 1 tbsp Butter on medium-low heat.",
      "Pour in egg mixture, letting it spread evenly. Lift edges with a spatula to let uncooked egg run underneath.",
      "When the omelette is mostly set but slightly wet on top, sprinkle the cooked bacon-veggie mix and Cheddar Cheese on one half.",
      "Fold the other egg half over the filling, cook for another minute until cheese is melted, and slide onto a plate."
    ],
    nutritionalInfo: {
      calories: 480,
      protein: "26g",
      carbs: "4g",
      fat: "38g"
    }
  },
  {
    id: "rec_potato_hash",
    name: "Rustic Potato & Mushroom Hash",
    description: "Golden cubed potatoes pan-fried with onions, garlic, and mushrooms, complete with soft yolks on top.",
    prepTime: 10,
    cookTime: 20,
    servings: 2,
    difficulty: "Easy",
    tags: ["American", "Vegetarian", "Comfort Food", "Easy"],
    allIngredients: [
      { name: "Potatoes", amount: "2 large", category: "Produce" },
      { name: "Mushrooms", amount: "150g", category: "Produce" },
      { name: "Onions", amount: "1 medium", category: "Produce" },
      { name: "Garlic", amount: "2 cloves", category: "Produce" },
      { name: "Butter", amount: "2 tbsp", category: "Dairy" },
      { name: "Eggs", amount: "2 whole", category: "Dairy" },
      { name: "Salt & Pepper", amount: "1/2 tsp", category: "Dry Seasonings" }
    ],
    instructions: [
      "Peel potatoes and cut them into 1/2-inch uniform cubes. Dice Onions, mince Garlic, and slice fresh Mushrooms.",
      "Melt 2 tbsp Butter in a heavy skillet over medium-high heat. Add potatoes and onions, sautéing for 8-10 minutes until potatoes show crispy golden skins.",
      "Add mushrooms and Garlic into the pan, season everything with Salt & Pepper, and cook for 5 more minutes until tender.",
      "Create two small wells in the potato mixture and crack the Eggs directly into them.",
      "Cover the pan with a lid, reduce heat to low, and cook for 4-5 minutes until the egg whites are fully set but yolks remain soft and runny.",
      "Serve warm, slicing into yolks so they coat the crispy potatoes."
    ],
    nutritionalInfo: {
      calories: 360,
      protein: "10g",
      carbs: "42g",
      fat: "18g"
    }
  },
  {
    id: "rec_fajita",
    name: "Classic Sizzling Chicken Fajitas",
    description: "Boldly seasoned pan-fried chicken strips tossed with colorful sweet peppers and sweet sliced onions.",
    prepTime: 15,
    cookTime: 15,
    servings: 2,
    difficulty: "Easy",
    tags: ["Mexican", "Easy", "Dinner", "Spicy"],
    allIngredients: [
      { name: "Chicken Breast", amount: "300g", category: "Meat" },
      { name: "Bell Peppers", amount: "2 medium", category: "Produce" },
      { name: "Onions", amount: "1 large", category: "Produce" },
      { name: "Garlic", amount: "2 cloves", category: "Produce" },
      { name: "Lime", amount: "1 whole", category: "Fruits" },
      { name: "Olive Oil", amount: "2 tbsp", category: "Pantry" },
      { name: "Tortillas", amount: "4 pieces", category: "Grains" },
      { name: "Cheddar Cheese", amount: "1/2 cup", category: "Dairy" },
      { name: "Salt & Pepper", amount: "1 tsp", category: "Dry Seasonings" }
    ],
    instructions: [
      "Slice Chicken Breast, Bell Peppers, and Onions into uniform thin strips.",
      "In a bowl, toss the chicken with 1 tbsp Olive Oil, minced Garlic, Salt & Pepper, and a generous squeeze of fresh Lime juice.",
      "Heat 1 tbsp Olive Oil in a large cast-iron skillet over high heat. Sauté peppers and onions for 4-5 minutes until charred and slightly tender. Remove from pan.",
      "Add chicken strips to the hot skillet, cooking for 5-6 minutes until golden and fully cooked.",
      "Return the sauteed peppers and onions to the skillet, squeezing more lime juice over the top to deglaze.",
      "Warm the Tortillas in a dry pan, then load them up with sizzling chicken, veggies, and shredded Cheddar Cheese."
    ],
    nutritionalInfo: {
      calories: 540,
      protein: "36g",
      carbs: "38g",
      fat: "24g"
    }
  },
  {
    id: "rec_tuscan_pasta",
    name: "Tuscan Tomato & Spinach Pasta",
    description: "An elegant, healthy penne pasta tossed with canned tomatoes, fresh garlic, sweet onions, and baby spinach.",
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    difficulty: "Easy",
    tags: ["Italian", "Vegetarian", "Pasta", "Healthy"],
    allIngredients: [
      { name: "Pasta", amount: "200g", category: "Grains" },
      { name: "Canned Tomatoes", amount: "1 can", category: "Grains" },
      { name: "Garlic", amount: "3 cloves", category: "Produce" },
      { name: "Onions", amount: "1/2 medium", category: "Produce" },
      { name: "Spinach", amount: "2 cups", category: "Produce" },
      { name: "Parmesan Cheese", amount: "1/4 cup", category: "Dairy" },
      { name: "Olive Oil", amount: "2 tbsp", category: "Pantry" },
      { name: "Salt & Pepper", amount: "1 tsp", category: "Dry Seasonings" }
    ],
    instructions: [
      "Cook Pasta in boiling salted water according to the box directions until al dente. Reserve 1/2 cup of pasta water.",
      "Finely chop Onions and mince Garlic. Sauté in a skillet with 2 tbsp Olive Oil on medium heat for 3 minutes until translucent.",
      "Add Canned Tomatoes, Salt & Pepper, and simmer gently for 8-10 minutes to form a rustic sauce.",
      "Stir in fresh baby Spinach, letting it wilt completely inside the warm tomato sauce (about 1-2 minutes).",
      "Stir the drained hot Pasta and reserved pasta water into the skillet, tossing well to coat the noodles evenly.",
      "Grate fresh Parmesan Cheese directly over the top and serve immediately."
    ],
    nutritionalInfo: {
      calories: 440,
      protein: "14g",
      carbs: "72g",
      fat: "11g"
    }
  },
  {
    id: "rec_lemon_shrimp",
    name: "Lemon Garlic Butter Shrimp Pasta",
    description: "Thick spaghetti noodles tossed with juicy prawns in a luscious, bright lemon garlic white-wine sauce reduction.",
    prepTime: 10,
    cookTime: 12,
    servings: 2,
    difficulty: "Medium",
    tags: ["Mediterranean", "Seafood", "Italian", "Elegant"],
    allIngredients: [
      { name: "Shrimp", amount: "250g", category: "Meat" },
      { name: "Pasta", amount: "200g", category: "Grains" },
      { name: "Garlic", amount: "4 cloves", category: "Produce" },
      { name: "Butter", amount: "3 tbsp", category: "Dairy" },
      { name: "Lemon", amount: "1 whole", category: "Fruits" },
      { name: "Olive Oil", amount: "1 tbsp", category: "Pantry" },
      { name: "Spinach", amount: "1 cup", category: "Produce" },
      { name: "Salt & Pepper", amount: "1/2 tsp", category: "Dry Seasonings" }
    ],
    instructions: [
      "Boil Pasta in salted water until al dente. Drain, keeping 1/4 cup pasta water.",
      "Peel, de-vein, and pat dry the Shrimp. Season lightly with Salt & Pepper.",
      "Melt 1 tbsp Butter and 1 tbsp Olive Oil in a large pan on medium-high heat. Sear Shrimp for 1.5 - 2 minutes each side until opaque and pink. Set aside.",
      "Add remaining 2 tbsp Butter and minced Garlic, cooking for 1 minute until fragrant.",
      "Pour in fresh Lemon Juice, cooking for another minute to reduce slightly. Add baby Spinach and stir until wilted.",
      "Toss the pasta and Shrimp back into the garlic butter sauce, adding a splash of pasta water. Toss thoroughly and serve with lemon zest."
    ],
    nutritionalInfo: {
      calories: 590,
      protein: "28g",
      carbs: "68g",
      fat: "22g"
    }
  },
  {
    id: "rec_beef_tacos",
    name: "Savory Ground Beef Tacos",
    description: "Classic Tex-Mex style seasoned ground beef layered inside warm corn or flour tortillas with fresh toppings.",
    prepTime: 10,
    cookTime: 12,
    servings: 2,
    difficulty: "Easy",
    tags: ["Mexican", "Family", "Quick", "Comfort Food"],
    allIngredients: [
      { name: "Ground Beef", amount: "300g", category: "Meat" },
      { name: "Tortillas", amount: "6 pieces", category: "Grains" },
      { name: "Cheddar Cheese", amount: "1/2 cup", category: "Dairy" },
      { name: "Tomatoes", amount: "1 medium", category: "Produce" },
      { name: "Avocado", amount: "1 whole", category: "Produce" },
      { name: "Onions", amount: "1/4 medium", category: "Produce" },
      { name: "Lime", amount: "1 whole", category: "Fruits" },
      { name: "Sour Cream", amount: "1/4 cup", category: "Dairy" },
      { name: "Salt & Pepper", amount: "1 tsp", category: "Dry Seasonings" }
    ],
    instructions: [
      "Brown the Ground Beef in a skillet over medium heat, drain excess fat. Season beef with Salt & Pepper and taco spices if available.",
      "While beef is cooking, fine-dice the Tomatoes, Onions, and Avocado.",
      "Squeeze fresh Lime juice over the diced avocado and tomatoes to keep them vibrant.",
      "Warm Tortillas on a dry pan until soft and pliable.",
      "Assemble tacos by placing a generous spoonful of warm ground beef into each tortilla, adding grated Cheddar Cheese, and scattering diced toppings on top.",
      "Dollop flat spoonfuls of rich Sour Cream over the tacos and serve warm with additional lime wedges."
    ],
    nutritionalInfo: {
      calories: 610,
      protein: "32g",
      carbs: "34g",
      fat: "35g"
    }
  },
  {
    id: "rec_cod_fillet",
    name: "French Butter-Poached Cod",
    description: "Meltingly-tender cod fillets slow-braised in a premium garlic-cream reduction with soft glazed carrots.",
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    difficulty: "Medium",
    tags: ["French", "Mediterranean", "Seafood", "Low-Carb"],
    allIngredients: [
      { name: "Cod Fillet", amount: "2 pieces", category: "Meat" },
      { name: "Butter", amount: "3 tbsp", category: "Dairy" },
      { name: "Heavy Cream", amount: "1/3 cup", category: "Dairy" },
      { name: "Garlic", amount: "3 cloves", category: "Produce" },
      { name: "Lemon", amount: "1/2 whole", category: "Fruits" },
      { name: "Carrots", amount: "1 large", category: "Produce" },
      { name: "Broccoli", amount: "1/2 head", category: "Produce" },
      { name: "Salt & Pepper", amount: "1/2 tsp", category: "Dry Seasonings" }
    ],
    instructions: [
      "Cut the Carrot into matchsticks and cook Broccoli into tiny florets. Season Cod Fillets with Salt & Pepper.",
      "Melt 2 tbsp Butter in a skillet with a tight-fitting lid on medium heat. Sauté Carrots and Broccoli for 3-4 minutes.",
      "Push vegetables to the sides, reduce heat to low, and melt the remaining 1 tbsp Butter in the center. Stir in minced Garlic.",
      "Place Cod Fillets into the center, spooning warm garlic butter over the tops.",
      "Pour in Heavy Cream and squeeze the Lemon juice around the cod. Cover the pan with the lid and poach on low heat for 7-8 minutes.",
      "Remove lid, spoon the luxurious reduction sauce over the flaky white fish and tender glazed veggies, and serve up."
    ],
    nutritionalInfo: {
      calories: 450,
      protein: "28g",
      carbs: "8g",
      fat: "34g"
    }
  },
  {
    id: "rec_greek_yogurt",
    name: "Antioxidant Greek Yogurt Fruit Bowl",
    description: "A thick, protein-packed Greek yogurt base piled high with fresh sliced fruits, crunchy oats, and honey.",
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    difficulty: "Easy",
    tags: ["Mediterranean", "Breakfast", "Healthy", "Vegetarian", "Kids"],
    allIngredients: [
      { name: "Greek Yogurt", amount: "200g", category: "Dairy" },
      { name: "Strawberries", amount: "4 large", category: "Fruits" },
      { name: "Blueberries", amount: "1/4 cup", category: "Fruits" },
      { name: "Bananas", amount: "1/2 whole", category: "Fruits" },
      { name: "Apples", amount: "1/2 whole", category: "Fruits" },
      { name: "Oats", amount: "3 tbsp", category: "Grains" },
      { name: "White Sugar", amount: "1 tsp", category: "Grains" }
    ],
    instructions: [
      "Spoon Greek Yogurt into a wide breakfast bowl, smoothing the top surfaces cleanly.",
      "Wash fruits thoroughly. Slice Strawberries, dice Apples, and cut the Banana into coins.",
      "Toast Oats in a dry saucepan on low heat for 2 minutes to bring out a warm, nutty aroma (optional).",
      "Arrange themed lines of Strawberries, Blueberries, banana coins, and apples neatly over the yogurt base.",
      "Scatter toasted Oats on top for a rustic texture.",
      "Dust lightly with White Sugar (or use honey/maple syrup if available) and enjoy immediately."
    ],
    nutritionalInfo: {
      calories: 290,
      protein: "18g",
      carbs: "44g",
      fat: "4g"
    }
  },
  {
    id: "rec_tuna_salad",
    name: "Pre-Workout Avocado Tuna Salad",
    description: "A nutrient-rich power salad of light flaked tuna tossed with creamy avocado, lime, and crisp diced tomatoes.",
    prepTime: 10,
    cookTime: 0,
    servings: 1,
    difficulty: "Easy",
    tags: ["Mediterranean", "Keto", "High-Protein", "No-Cook"],
    allIngredients: [
      { name: "Canned Tuna", amount: "1 can", category: "Meat" },
      { name: "Avocado", amount: "1 whole", category: "Produce" },
      { name: "Onions", amount: "1/4 medium", category: "Produce" },
      { name: "Tomatoes", amount: "1 medium", category: "Produce" },
      { name: "Spinach", amount: "1 cup", category: "Produce" },
      { name: "Lemon", amount: "1/2 whole", category: "Fruits" },
      { name: "Lime", amount: "1/2 whole", category: "Fruits" },
      { name: "Olive Oil", amount: "1 tbsp", category: "Pantry" },
      { name: "Salt & Pepper", amount: "1/2 tsp", category: "Dry Seasonings" }
    ],
    instructions: [
      "Drain Canned Tuna completely and place in a mixing bowl.",
      "Slice Avocado in half, pit, and scoop out the pulp, mashing half of it into a cream using a fork, and dicing the other half.",
      "Chop Onions and Tomatoes into tiny, neat pieces.",
      "Combine flaked tuna, minced onion, tomatoes, and both creamy and cubed avocado in the bowl.",
      "Squeeze fresh Lemon and Lime juices, add a premium drizzle of Olive Oil, and season with Salt & Pepper to taste.",
      "Lay out a bed of fresh Spinach in a serving bowl, pile the loaded avocado-tuna mixture on top, and crack fresh pepper before serving."
    ],
    nutritionalInfo: {
      calories: 380,
      protein: "24g",
      carbs: "12g",
      fat: "26g"
    }
  },
  {
    id: "rec_steak_frites",
    name: "Steak Frites with Garlic Butter",
    description: "Premium pan-seared sirloin steak, sliced and served alongside crispy seasoned potato wedges and garlic butter.",
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    difficulty: "Hard",
    tags: ["French", "High-Protein", "Comfort Food", "Classic"],
    allIngredients: [
      { name: "Sirloin Steak", amount: "400g", category: "Meat" },
      { name: "Potatoes", amount: "2 large", category: "Produce" },
      { name: "Garlic", amount: "3 cloves", category: "Produce" },
      { name: "Butter", amount: "2 tbsp", category: "Dairy" },
      { name: "Olive Oil", amount: "2 tbsp", category: "Pantry" },
      { name: "Salt & Pepper", amount: "1 tsp", category: "Dry Seasonings" }
    ],
    instructions: [
      "Preheat oven (or air fryer) to 400°F (200°C). Slice Potatoes into wedges, toss with 1 tbsp Olive Oil and Salt & Pepper, and bake for 20 minutes until crisp.",
      "Pat Sirloin Steak dry, brushing with 1 tbsp Olive Oil. Generously season both sides of steak with coarse Salt & Pepper.",
      "Heat a heavy skillet or grill pan on high heat until smoking. Sear steak for 3 minutes on the first side without moving to build a deep crust.",
      "Flip steak and add Butter and slightly crushed Garlic cloves directly into the pan.",
      "Tilt pan and continuously spoon melted garlic butter over the steak for another 2-3 minutes (for medium-rare). Transfer steak to a board to rest.",
      "Slice steak against the grain, spooning pan juices back over, and serve with crispy potato wedges."
    ],
    nutritionalInfo: {
      calories: 680,
      protein: "42g",
      carbs: "32g",
      fat: "40g"
    }
  },
  {
    id: "rec_french_crepes",
    name: "Classic French Crepes",
    description: "Delicate, lace-thin golden crepes dusted with fine sugar and topped with sweet sliced strawberries.",
    prepTime: 10,
    cookTime: 10,
    servings: 2,
    difficulty: "Medium",
    tags: ["French", "Breakfast", "Dessert", "Vegetarian"],
    allIngredients: [
      { name: "Flour", amount: "1 cup", category: "Grains" },
      { name: "Milk", amount: "1 cup", category: "Dairy" },
      { name: "Eggs", amount: "2 whole", category: "Dairy" },
      { name: "Butter", amount: "2 tbsp", category: "Dairy" },
      { name: "White Sugar", amount: "2 tbsp", category: "Grains" },
      { name: "Strawberries", amount: "6 pieces", category: "Fruits" },
      { name: "Salt & Pepper", amount: "1 pinch", category: "Dry Seasonings" }
    ],
    instructions: [
      "In a blender or mixing bowl, whisk together Flour, Eggs, Milk, White Sugar, a pinch of Salt, and 1 tbsp melted Butter until completely smooth and lump-free.",
      "Let the crepe batter rest for 5 minutes.",
      "Melt a thin slice of remaining Butter in a non-stick skillet on medium heat.",
      "Pour 1/4 cup of batter into the pan, immediately swirling it around so it covers the entire bottom in a thin, sheer sheet.",
      "Cook for 1-2 minutes until edges curl slightly and bottom is gold. Flip carefully, cooking the other side for 30 seconds only.",
      "Fold the warm crepes into triangles, and serve topped with sliced Strawberries and a sprinkle of sugar."
    ],
    nutritionalInfo: {
      calories: 340,
      protein: "10g",
      carbs: "45g",
      fat: "14g"
    }
  },
  {
    id: "rec_shrimp_tacos",
    name: "Baja Lime Shrimp Tacos",
    description: "Tender seasoned shrimp seared in lime butter, wrapped in warm tortillas with creamy avocado chunks.",
    prepTime: 10,
    cookTime: 10,
    servings: 2,
    difficulty: "Easy",
    tags: ["Mexican", "Seafood", "Quick", "Dinner"],
    allIngredients: [
      { name: "Shrimp", amount: "250g", category: "Meat" },
      { name: "Tortillas", amount: "4 pieces", category: "Grains" },
      { name: "Lime", amount: "1 whole", category: "Fruits" },
      { name: "Cheddar Cheese", amount: "1/2 cup", category: "Dairy" },
      { name: "Avocado", amount: "1 whole", category: "Produce" },
      { name: "Canned Tomatoes", amount: "1/2 can", category: "Grains" },
      { name: "Sour Cream", amount: "3 tbsp", category: "Dairy" },
      { name: "Olive Oil", amount: "1 tbsp", category: "Pantry" },
      { name: "Salt & Pepper", amount: "1/2 tsp", category: "Dry Seasonings" }
    ],
    instructions: [
      "Pat Shrimp dry. Mix with Olive Oil, Salt & Pepper, and a generous squeeze of fresh Lime juice.",
      "Cube Avocado and warm up the Canned Tomatoes in a small pan, drained of excess liquids.",
      "Melt 1 tbsp Butter in a skillet on medium-high heat. Sauté Shrimp for 2-3 minutes until pink and cooked through.",
      "Warm the Tortillas in a dry pan until soft.",
      "Assemble by placing Shrimp inside tortillas, topped with avocado cubes, shredded Cheddar Cheese, and a spoonful of warm stewed tomatoes.",
      "Drizzle with a custom Lime Sour Cream mix and serve with fresh Lime wedges."
    ],
    nutritionalInfo: {
      calories: 490,
      protein: "26g",
      carbs: "32g",
      fat: "25g"
    }
  },
  {
    id: "rec_quinoa_salad_bowl",
    name: "Healthy Quinoa Avocado Bowl",
    description: "A superfood salad of hearty boiled quinoa tossed with sweet tomatoes, spinach, avocado, and lime.",
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    difficulty: "Easy",
    tags: ["Mediterranean", "Vegetarian", "Gluten-Free", "Healthy"],
    allIngredients: [
      { name: "Quinoa", amount: "1 cup", category: "Grains" },
      { name: "Spinach", amount: "2 cups", category: "Produce" },
      { name: "Tomatoes", amount: "2 medium", category: "Produce" },
      { name: "Avocado", amount: "1 whole", category: "Produce" },
      { name: "Lemon", amount: "1 whole", category: "Fruits" },
      { name: "Olive Oil", amount: "2 tbsp", category: "Pantry" },
      { name: "Salt & Pepper", amount: "1/2 tsp", category: "Dry Seasonings" }
    ],
    instructions: [
      "Rinse Quinoa. Boil in 2 cups of water with a pinch of salt. Cook on medium-low for 15 minutes, then let rest for 5 minutes off the heat, fluffing with a fork.",
      "Dice Tomatoes and chunk the sweet Avocado.",
      "In a large bowl, whisk together the Olive Oil, fresh Lemon juice, and Salt & Pepper.",
      "Add fresh baby Spinach and tomatoes, tossing with the warm quinoa to gently wilt the greens.",
      "Fold in the avocado chunks carefully so they don't mash entirely.",
      "Serve warm or chilled, customized with visual olive oil drizzles."
    ],
    nutritionalInfo: {
      calories: 420,
      protein: "11g",
      carbs: "48g",
      fat: "22g"
    }
  },
  {
    id: "rec_french_toast",
    name: "Golden Bread French Toast",
    description: "Slices of soft bread dipped in a sweet egg batter and griddled till crispy and golden brown.",
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    difficulty: "Easy",
    tags: ["French", "Breakfast", "Comfort Food", "Kids"],
    allIngredients: [
      { name: "Bread", amount: "4 slices", category: "Grains" },
      { name: "Eggs", amount: "2 whole", category: "Dairy" },
      { name: "Milk", amount: "1/2 cup", category: "Dairy" },
      { name: "Butter", amount: "2 tbsp", category: "Dairy" },
      { name: "White Sugar", amount: "1 tbsp", category: "Grains" },
      { name: "Salt & Pepper", amount: "1 pinch", category: "Dry Seasonings" }
    ],
    instructions: [
      "In a shallow wide bowl, whisk together the Eggs, Milk, White Sugar, and a tiny pinch of salt.",
      "Melt 1 tbsp Butter in a flat griddle or skillet over medium heat.",
      "Dip each slice of Bread into the egg mixture, allowing it to soak for 5-10 seconds per side so the center absorbs flavor.",
      "Place soaked bread slices immediately onto the hot griddle.",
      "Sauté for 3-4 minutes per side until beautifully golden brown and slightly puffed.",
      "Serve hot with a dust of honey or sugar, accompanied by fresh fruit slices."
    ],
    nutritionalInfo: {
      calories: 360,
      protein: "12g",
      carbs: "46g",
      fat: "14g"
    }
  }
];
