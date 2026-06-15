export interface IngredientItem {
  name: string;
  amount: string;
  category?: string;
}

export interface NutritionalInfo {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
}

export interface Recipe {
  id: string; // unique ID
  name: string;
  description: string;
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  detectedIngredients: string[]; // ingredients identified in the photo (if uploaded)
  allIngredients: IngredientItem[]; // complete list of ingredients
  matchingIngredients: string[]; // ingredients user already has (from photo or manual list)
  additionalIngredientsNeeded: string[]; // ingredients user needs to get
  instructions: string[]; // step-by-step cooking steps
  nutritionalInfo: NutritionalInfo;
  imageUrl?: string;
}

export interface RecommendationResponse {
  recipes: Recipe[];
  detectedIngredients: string[]; // overall detected ingredients from the photo
}
