import React from "react";
import { Recipe } from "../types";
import { Clock, Users, Heart, Star, ChevronRight, AlertCircle, Sparkles, Calendar } from "lucide-react";
import { translateIngredientName } from "../recipesTranslation";

export const getRecipePhoto = (recipe: Recipe) => {
  if (recipe.imageUrl && recipe.imageUrl.trim().startsWith("http")) {
    return recipe.imageUrl;
  }
  const nameLower = recipe.name.toLowerCase();
  const descLower = recipe.description ? recipe.description.toLowerCase() : "";
  const combined = `${nameLower} ${descLower}`;

  if (combined.includes("pasta") || combined.includes("spaghetti") || combined.includes("noodle") || combined.includes("aglio") || combined.includes("macaroni") || combined.includes("lasagna") || combined.includes("penne")) {
    return "https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=600&q=80";
  }
  if (combined.includes("pizza") || combined.includes("flatbread") || combined.includes("focaccia") || combined.includes("bruschetta")) {
    return "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80";
  }
  if (combined.includes("frittata") || combined.includes("egg") || combined.includes("omelet") || combined.includes("scramble") || combined.includes("quiche")) {
    return "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600&q=80";
  }
  if (combined.includes("salmon") || combined.includes("trout") || combined.includes("cod") || combined.includes("tuna")) {
    return "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80";
  }
  if (combined.includes("shrimp") || combined.includes("prawn") || combined.includes("crab") || combined.includes("lobster") || combined.includes("seafood") || combined.includes("scallop")) {
    return "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80";
  }
  if (combined.includes("chicken") || combined.includes("turkey") || combined.includes("poultry") || combined.includes("wings")) {
    return "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80";
  }
  if (combined.includes("burger") || combined.includes("beef") || combined.includes("steak") || combined.includes("ribeye") || combined.includes("meatball")) {
    return "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80";
  }
  if (combined.includes("pork") || combined.includes("bacon") || combined.includes("ham") || combined.includes("ribs") || combined.includes("chop")) {
    return "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80";
  }
  if (combined.includes("soup") || combined.includes("stew") || combined.includes("chowder") || combined.includes("broth") || combined.includes("pho") || combined.includes("ramen")) {
    return "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80";
  }
  if (combined.includes("taco") || combined.includes("burrito") || combined.includes("fajita") || combined.includes("quesadilla") || combined.includes("nachos") || combined.includes("enchilada")) {
    return "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80";
  }
  if (combined.includes("pancake") || combined.includes("waffle") || combined.includes("crepe") || combined.includes("french toast")) {
    return "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=600&q=80";
  }
  if (combined.includes("rice") || combined.includes("risotto") || combined.includes("pilaf") || combined.includes("quinoa") || combined.includes("grain") || combined.includes("paella")) {
    return "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80";
  }
  if (combined.includes("bread") || combined.includes("toast") || combined.includes("sandwich") || combined.includes("panini") || combined.includes("wrap") || combined.includes("bagel")) {
    return "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80";
  }
  if (combined.includes("dessert") || combined.includes("cake") || combined.includes("cookie") || combined.includes("cupcake") || combined.includes("chocolate") || combined.includes("pie") || combined.includes("tart")) {
    return "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80";
  }
  if (combined.includes("mushroom") || combined.includes("broccoli") || combined.includes("salad") || combined.includes("veg") || combined.includes("curry") || combined.includes("tofu") || combined.includes("greens")) {
    return "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80";
  }
  return "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80";
};

interface RecipeCardProps {
  key?: string;
  recipe: Recipe;
  onViewDetails: (recipe: Recipe) => void;
  isFavorite: boolean;
  onToggleFavorite: (recipe: Recipe, e?: React.MouseEvent) => void;
  matchStats: {
    matching: string[];
    missing: string[];
    percentage: number;
  };
  onAddToMealPlan?: (recipe: Recipe) => void;
  lang?: "en" | "ko";
  comments?: { id: string; text: string; createdAt: string }[];
  onAddComment?: (recipeId: string, text: string) => void;
  onDeleteComment?: (recipeId: string, commentId: string) => void;
}

export default function RecipeCard({
  recipe,
  onViewDetails,
  isFavorite,
  onToggleFavorite,
  matchStats,
  onAddToMealPlan,
  lang = "en",
  comments = [],
  onAddComment,
  onDeleteComment,
}: RecipeCardProps) {
  const totalMinutes = recipe.prepTime + recipe.cookTime;
  const isHighMatch = matchStats.percentage >= 90;
  const isKo = lang === "ko";
  const [commentsExpanded, setCommentsExpanded] = React.useState(false);
  const [commentInput, setCommentInput] = React.useState("");

  const getDifficultyStyles = (diff: "Easy" | "Medium" | "Hard" | string) => {
    switch (diff) {
      case "Easy":
        return "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-455 border-indigo-200/50 dark:border-indigo-900/40 font-bold";
      case "Medium":
        return "bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-455 border-amber-200/50 dark:border-amber-900/40 font-bold";
      case "Hard":
      default:
        return "bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-455 border-rose-200/50 dark:border-rose-900/40 font-bold";
    }
  };

  const getDifficultyEmoji = (diff: string) => {
    switch (diff) {
      case "Easy": return "🥗";
      case "Medium": return "🍳";
      case "Hard": return "🔥";
      default: return "🧑‍🍳";
    }
  };

  const getDifficultyLabel = (diff: string) => {
    if (isKo) {
      if (diff === "Easy") return "쉬움";
      if (diff === "Medium") return "보통";
      if (diff === "Hard") return "어려움";
    }
    return diff;
  };

  return (
    <div
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (
          target.closest("button") || 
          target.closest("textarea") || 
          target.closest("input") || 
          target.closest("[data-no-click]")
        ) {
          return;
        }
        onViewDetails(recipe);
      }}
      className={`group relative flex flex-col justify-between rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-850 hover:scale-[1.01] transition-all duration-300 cursor-pointer select-none overflow-hidden m-1.5 ${
        isHighMatch
          ? "ring-4 ring-indigo-500/10"
          : ""
      }`}
      id={`recipe-card-${recipe.id}`}
    >
      {/* Top Meal Photograph Header Block with wood board highlight */}
      <div className="relative w-full h-44 overflow-hidden bg-zinc-100 flex-shrink-0 border-b border-zinc-100 dark:border-zinc-800">
        <img
          src={getRecipePhoto(recipe)}
          alt={recipe.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Floating elements overlaying top of the picture */}
        <div className="absolute top-3 right-3 left-3 flex justify-between items-start gap-2">
          <div className="flex flex-wrap gap-1.5">
            <span
              className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border border-zinc-200/50 dark:border-zinc-800 flex items-center gap-1.5 bg-white/95 dark:bg-zinc-950/95 shadow-xs whitespace-nowrap ${getDifficultyStyles(
                recipe.difficulty
              )}`}
            >
              <span>{getDifficultyEmoji(recipe.difficulty)}</span>
              <span>{getDifficultyLabel(recipe.difficulty)}</span>
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/95 dark:bg-zinc-950/95 text-amber-800 dark:text-amber-400 border border-zinc-200/55 dark:border-zinc-800 shadow-xs backdrop-blur-xs flex items-center gap-1 font-mono">
              ⏰ {totalMinutes} {isKo ? "분" : "MINS"}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(recipe, e);
            }}
            className={`p-2 rounded-full border border-zinc-200/50 dark:border-zinc-800 transition-all duration-300 hover:scale-108 active:scale-95 cursor-pointer shadow-xs backdrop-blur-xs ${
              isFavorite
                ? "bg-rose-500 border-rose-500 text-white"
                : "bg-white/95 dark:bg-zinc-950/95 text-zinc-500 hover:text-rose-500 hover:bg-rose-50/50"
            }`}
            id={`fav-toggle-${recipe.id}`}
            title={isFavorite ? "Remove from favorites" : "Save recipe"}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? "fill-white text-white animate-pulse" : ""}`} />
          </button>
        </div>
      </div>

      {/* Main card body with padding and light warm background tint */}
      <div className="p-4.5 flex-1 flex flex-col justify-between text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900">
        <div>
          <h3 className="text-zinc-900 dark:text-zinc-100 font-sans text-sm sm:text-base font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all leading-snug line-clamp-1 tracking-tight">
            {recipe.name}
          </h3>
          <p className="mt-1.5 text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed line-clamp-2">
            {recipe.description}
          </p>
        </div>

        {/* Calories and macros line with sleek layout */}
        <div className="mt-3.5 grid grid-cols-3 gap-1.5 items-center text-[9px] text-zinc-500 font-medium text-center select-none">
          <span className="bg-amber-500/10 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300 py-1 rounded-lg border border-amber-500/5 font-bold block truncate" title={`${recipe.nutritionalInfo.calories} KCAL`}>🔥 {recipe.nutritionalInfo.calories} {isKo ? "칼로리" : "CAL"}</span>
          <span className="bg-indigo-500/10 dark:bg-indigo-950/20 text-indigo-800 dark:text-indigo-300 py-1 rounded-lg border border-indigo-500/5 font-bold block truncate" title={`${recipe.nutritionalInfo.protein} PROTEIN`}>💪 {recipe.nutritionalInfo.protein} {isKo ? "단백질" : "PROT"}</span>
          <span className="bg-sky-500/10 dark:bg-sky-950/20 text-sky-800 dark:text-sky-305 py-1 rounded-lg border border-sky-500/5 font-bold block truncate" title={`${recipe.nutritionalInfo.carbs} CARBS`}>🥖 {recipe.nutritionalInfo.carbs} {isKo ? "탄수화물" : "CARB"}</span>
        </div>

        {/* Dynamic Circular Matching Indicator Block */}
        <div className="mt-4 p-3 rounded-xl bg-zinc-50/50 dark:bg-zinc-950/30 border border-zinc-150 dark:border-zinc-800 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            {/* Visual Circular Match Ring */}
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="16"
                    cy="16"
                    r="13"
                    className="stroke-zinc-100 dark:stroke-zinc-800"
                    strokeWidth="3"
                    fill="transparent"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="13"
                    className={`transition-all duration-700 ${
                      isHighMatch ? "stroke-indigo-550" : "stroke-amber-500"
                    }`}
                    strokeWidth="3"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 13}
                    strokeDashoffset={2 * Math.PI * 13 * (1 - matchStats.percentage / 100)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-mono text-[9px] font-bold text-zinc-900 dark:text-white">
                  {matchStats.percentage}%
                </div>
              </div>

              <div>
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#cf771d] dark:text-amber-400 block font-sans">
                  {isKo ? "식재료 일치율" : "Match Rate"}
                </span>
                <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-350">
                  {matchStats.matching.length}/{recipe.allIngredients.length} {isKo ? "보유함" : "OWNED"}
                </span>
              </div>
            </div>

            {isHighMatch ? (
              <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded-full text-[9px] font-bold flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5 fill-current text-indigo-500" />
                {isKo ? "요리 가능" : "MATCH"}
              </span>
            ) : null}
          </div>

          {/* Display Missing Ingredients with high-fidelity soft red pills */}
          {matchStats.missing.length > 0 ? (
            <div className="pt-2 border-t border-dashed border-zinc-150 dark:border-zinc-800/80">
              <span className="text-[9px] font-bold uppercase tracking-wider text-rose-500 dark:text-rose-400 block mb-1">
                {isKo ? "부족한 식재료:" : "Missing ingredients:"}
              </span>
              <div className="flex flex-wrap gap-1">
                {matchStats.missing.slice(0, 3).map((item, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-rose-50 dark:bg-rose-950/20 border border-rose-100/40 dark:border-rose-900/30 rounded-full text-[9px] font-medium text-rose-600 dark:text-rose-405"
                  >
                    {isKo ? translateIngredientName(item) : item}
                  </span>
                ))}
                {matchStats.missing.length > 3 && (
                  <span className="text-[9px] text-zinc-500 dark:text-zinc-400 font-medium self-center bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded-full">
                    +{matchStats.missing.length - 3}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 pt-1 font-sans uppercase">
              <Star className="w-3 h-3 fill-indigo-500/10 text-indigo-600 dark:text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} />
              {isKo ? "식재료 완벽 준비!" : "Chef Ready!"}
            </div>
          )}
        </div>

        {/* Footer Info Row - structured with vertical layout of the buttons */}
        <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col gap-2.5">
          {/* Line 1: Time to make and number of servings on one line */}
          <div className="flex items-center justify-between text-zinc-650 dark:text-zinc-300 text-[10px] font-bold">
            <span className="flex items-center gap-1 bg-zinc-50 dark:bg-zinc-950 px-2.5 py-1 rounded-lg border border-zinc-150/40 dark:border-zinc-800 w-[48%] justify-center">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              {totalMinutes} {isKo ? "분" : "MINS"}
            </span>
            <span className="flex items-center gap-1 bg-zinc-50 dark:bg-zinc-950 px-2.5 py-1 rounded-lg border border-zinc-150/40 dark:border-zinc-800 w-[48%] justify-center">
              <Users className="w-3.5 h-3.5 text-rose-450" />
              {recipe.servings}{isKo ? "인분" : " SERVS"}
            </span>
          </div>

          {/* Line 2 & 3: Meal Plan & Chef Guide Buttons styled beautifully */}
          <div className="flex flex-col gap-2 w-full pt-1">
            {onAddToMealPlan && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToMealPlan(recipe);
                }}
                className="w-full py-2.5 px-3 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold rounded-xl text-xs tracking-tight transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                title={isKo ? "주간 식단 추가" : "Add to Weekly Meal Planner"}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{isKo ? "식단표에 추가" : "Add to Meal Planning"}</span>
              </button>
            )}
            
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(recipe);
              }}
              className={`w-full py-2.5 px-3 font-bold text-xs tracking-tight flex items-center justify-center gap-1 rounded-xl transition-all active:scale-98 cursor-pointer ${
                isHighMatch
                  ? "bg-purple-600 text-white hover:bg-purple-750 shadow-xs"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-200 hover:bg-[#eaeaea] dark:hover:bg-zinc-750"
              }`}
              title={isKo ? "요리 순서 보기" : "See detailed recipe guide"}
            >
              <span>{isKo ? "요리 안내서 ➔" : "Chef Guide"}</span>
              {!isKo && <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />}
            </button>
          </div>

          {/* Comments Section */}
          <div className="flex items-center justify-between mt-3 text-xs border-t border-zinc-100 dark:border-zinc-805/40 pt-3 flex-shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCommentsExpanded(!commentsExpanded);
              }}
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-zinc-500 hover:text-indigo-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
            >
              💬 {isKo ? `댓글 (${comments.length})` : `Comments (${comments.length})`}
            </button>
            {comments.length > 0 && !commentsExpanded && (
              <span className="text-[10px] text-zinc-400 truncate max-w-[150px] italic">
                "{comments[0].text}"
              </span>
            )}
          </div>

          {commentsExpanded && (
            <div 
              data-no-click="true"
              className="mt-2.5 p-3 bg-zinc-50 dark:bg-zinc-950/80 rounded-xl border border-zinc-150 dark:border-zinc-800 text-left flex flex-col gap-2 relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Comment Input block */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-[10px] font-sans text-zinc-500 dark:text-zinc-400 font-medium">
                  <span>{isKo ? "한줄평 작성" : "Add Culinary Note"}</span>
                  <span className="font-mono text-zinc-400 dark:text-zinc-500 font-bold">
                    {140 - commentInput.length}
                  </span>
                </div>
                <div className="relative">
                  <textarea
                    rows={2}
                    maxLength={140}
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    onKeyDown={(e) => {
                      e.stopPropagation();
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        if (onAddComment && commentInput.trim()) {
                          onAddComment(recipe.id, commentInput.trim());
                          setCommentInput("");
                        }
                      }
                    }}
                    placeholder={isKo ? "맛평 및 소검을 작성해 주세요" : "Write your thoughts here..."}
                    className="w-full text-[11px] p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-hidden bg-white dark:bg-zinc-900 text-zinc-850 dark:text-zinc-200 resize-none font-sans"
                  />
                </div>
                
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onAddComment && commentInput.trim()) {
                      onAddComment(recipe.id, commentInput.trim());
                      setCommentInput("");
                    }
                  }}
                  className="self-end px-3 py-1 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-lg text-[10px] font-bold transition-all cursor-pointer select-none"
                >
                  {isKo ? "등록 완료" : "Post"}
                </button>
              </div>

              {/* Comments list block */}
              {comments.length === 0 ? (
                <p className="text-[10px] text-zinc-405 italic text-center py-1">
                  {isKo ? "등록된 한줄평이 없습니다. 가장 먼저 남겨보세요!" : "Be the first to critique this feast!"}
                </p>
              ) : (
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {comments.map((comment) => (
                    <div 
                      key={comment.id}
                      className="text-[10.5px] p-2 bg-white dark:bg-zinc-900 border border-zinc-150/40 dark:border-zinc-800 rounded-lg relative group/comment flex justify-between items-start gap-1"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-zinc-850 dark:text-zinc-200 break-words leading-tight">
                          {comment.text}
                        </p>
                        <span className="text-[7.5px] font-mono text-zinc-400 block mt-1">
                          {new Date(comment.createdAt).toLocaleDateString(isKo ? 'ko-KR' : 'en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      
                      {onDeleteComment && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteComment(recipe.id, comment.id);
                          }}
                          className="opacity-0 group-hover/comment:opacity-100 hover:text-rose-500 transition-all text-[9px] px-1 cursor-pointer text-zinc-400"
                          title={isKo ? "댓글 삭제" : "Delete comment"}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
