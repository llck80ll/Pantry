import React, { useState, useEffect, useRef } from "react";
import { Recipe, IngredientItem } from "../types";
import { X, Clock, Users, Heart, CheckSquare, Square, Utensils, Award, Flame, Play, Pause, RotateCcw, Volume2, ChefHat, Sparkles, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getRecipePhoto } from "./RecipeCard";

const CELEBRATION_ITEMS = [
  "🍳", "🧑‍🍳", "✨", "🍕", "🍝", "🍰", "🌟", "🎉", "🍔", "🧁", "🍓", "🍗", "🌮", "🔥"
];

interface RecipeDetailProps {
  recipe: Recipe;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (recipe: Recipe) => void;
  selectedIngredients?: string[];
  onAddToMealPlan?: (recipe: Recipe) => void;
  lang?: "en" | "ko";
}

export default function RecipeDetail({
  recipe,
  onClose,
  isFavorite,
  onToggleFavorite,
  selectedIngredients,
  onAddToMealPlan,
  lang = "en",
}: RecipeDetailProps) {
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [initialTimerSeconds, setInitialTimerSeconds] = useState(300);
  const [timerActive, setTimerActive] = useState(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Step-specific timers
  const [stepTimers, setStepTimers] = useState<Record<number, { seconds: number; running: boolean; initial: number }>>({});

  const [showCelebration, setShowCelebration] = useState(false);

  const getPercentCompleted = () => {
    const totalSteps = recipe.instructions.length;
    if (totalSteps === 0) return 0;
    const completedCount = Object.values(completedSteps).filter(Boolean).length;
    return Math.round((completedCount / totalSteps) * 100);
  };

  const is100Percent = getPercentCompleted() === 100;

  useEffect(() => {
    if (is100Percent) {
      setShowCelebration(true);
    } else {
      setShowCelebration(false);
    }
  }, [is100Percent]);

  const celebrationParticles = React.useMemo(() => {
    if (!showCelebration) return [];
    return Array.from({ length: 32 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = 60 + Math.random() * 140;
      // burst outwards and gently drift upwards elegantly
      const tx = Math.cos(angle) * velocity * 1.2;
      const ty = Math.sin(angle) * velocity - 160;
      const rot = Math.random() * 120 - 60;
      const scale = 0.4 + Math.random() * 0.8;
      
      const colors = [
        "rgba(251, 191, 36, 0.95)", // amber-400
        "rgba(245, 158, 11, 0.9)",  // amber-500
        "rgba(253, 224, 71, 0.95)", // yellow-300
        "rgba(139, 92, 246, 0.85)",  // violet-500
        "rgba(99, 102, 241, 0.9)",  // indigo-500
        "rgba(168, 85, 247, 0.85)"  // purple-500
      ];
      const color = colors[i % colors.length];

      return {
        id: i,
        tx,
        ty,
        rot,
        scale,
        color,
        delay: Math.random() * 0.35,
        duration: 1.8 + Math.random() * 1.6,
      };
    });
  }, [showCelebration]);

  // Helper to parse relevant ingredients from step text
  const getIngredientsForStep = (stepText: string): IngredientItem[] => {
    const stepLower = stepText.toLowerCase();
    return recipe.allIngredients.filter((ing) => {
      const nameLower = ing.name.toLowerCase();
      // 1. Direct substring match
      if (stepLower.includes(nameLower)) return true;
      
      // Handle plurals/singulars (e.g. eggs vs egg, onions vs onion)
      const nameSingular = nameLower.endsWith("s") && nameLower.length > 3 ? nameLower.slice(0, -1) : nameLower;
      if (stepLower.includes(nameSingular)) return true;
      
      // 2. Token based matching for compound names
      const tokens = nameLower.split(/[\s,\-\(\)\.\/]+/).filter((t) => t.length > 2);
      const stopwords = ["and", "the", "for", "with", "but", "any", "some", "all", "your", "into", "optional"];
      for (const token of tokens) {
        if (stopwords.includes(token)) continue;
        if (stepLower.includes(token)) {
          return true;
        }
      }
      return false;
    });
  };

  // Parse minutes from recipe instructions, strictly validating that it is a cooking step
  const parseTimeFromStep = (stepText: string): number | null => {
    const textLower = stepText.toLowerCase();

    // 1. Core heating/cooking keywords that warrant a timer
    const cookingKeywords = [
      "cook", "bake", "boil", "simmer", "sauté", "saute", "fry", "roast", "grill", 
      "heat", "sear", "steam", "brown", "pan-fry", "broil", "sizzle", "toast"
    ];
    
    const hasCookingVerb = cookingKeywords.some(keyword => textLower.includes(keyword));
    if (!hasCookingVerb) {
      return null;
    }

    // 2. Seasoning, dressing, resting, or plating keywords that should be excluded
    const seasoningKeywords = [
      "season", "marinate", "marinade", "garnish", "sprinkle", "toss", 
      "whisk", "mix", "stir", "salt", "pepper", "dressing", "sauce", "plating", 
      "plate", "serve", "rest", "let stand", "standing text"
    ];
    
    // If it is seasoning/resting and doesn't explicitly involve active heat/cook terms, exclude it
    const isSeasoningOrResting = seasoningKeywords.some(keyword => textLower.includes(keyword));
    const heatWords = ["cook", "simmer", "bake", "fry", "boil", "sauté", "saute", "sear", "roast", "grill", "broil"];
    const hasActiveHeat = heatWords.some(hw => textLower.includes(hw));

    if (isSeasoningOrResting && !hasActiveHeat) {
      return null;
    }

    // Capture duration minutes
    const regex = /(\d+)\s*(?:minute|min)s?/i;
    const match = stepText.match(regex);
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }
    return null;
  };

  useEffect(() => {
    // Reset inputs when displaying a new recipe
    setCheckedIngredients({});
    setCompletedSteps({});
    setTimerSeconds(0);
    setTimerActive(false);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    // Scan steps to find cooking periods and pre-load step timers
    const initialTimers: Record<number, { seconds: number; running: boolean; initial: number }> = {};
    recipe.instructions.forEach((step, idx) => {
      const minutes = parseTimeFromStep(step);
      if (minutes) {
        initialTimers[idx] = {
          seconds: minutes * 60,
          running: false,
          initial: minutes * 60,
        };
      }
    });
    setStepTimers(initialTimers);
  }, [recipe]);

  // Driven ticking interval for all active step timers
  useEffect(() => {
    const activeKeys = Object.keys(stepTimers).filter((k) => stepTimers[parseInt(k, 10)]?.running);
    if (activeKeys.length === 0) return;

    const interval = setInterval(() => {
      setStepTimers((prev) => {
        const next = { ...prev };
        let changed = false;

        activeKeys.forEach((key) => {
          const idx = parseInt(key, 10);
          const st = next[idx];
          if (st && st.running) {
            changed = true;
            if (st.seconds <= 1) {
              next[idx] = { ...st, seconds: 0, running: false };
              playCompletionBeep();
            } else {
              next[idx] = { ...st, seconds: st.seconds - 1 };
            }
          }
        });

        return changed ? next : prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [stepTimers]);

  useEffect(() => {
    if (timerActive && timerSeconds > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setTimerActive(false);
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            playCompletionBeep();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [timerActive, timerSeconds]);

  const playCompletionBeep = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      const playBeep = (timeOffset: number, frequency: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = frequency;
        osc.type = "sine";
        gain.gain.setValueAtTime(0.2, ctx.currentTime + timeOffset);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + timeOffset + duration);
        osc.start(ctx.currentTime + timeOffset);
        osc.stop(ctx.currentTime + timeOffset + duration);
      };

      playBeep(0, 800, 0.3);
      playBeep(0.4, 800, 0.3);
      playBeep(0.8, 1000, 0.5);
    } catch (e) {
      console.warn("Audio Context is blocked or not supported on this platform.", e);
    }
  };

  const setTimerPreset = (minutes: number) => {
    const totalSecs = minutes * 60;
    setInitialTimerSeconds(totalSecs);
    setTimerSeconds(totalSecs);
    setTimerActive(true);
  };

  const toggleTimerActive = () => {
    if (timerSeconds === 0) {
      setTimerSeconds(initialTimerSeconds);
    }
    setTimerActive(!timerActive);
  };

  const resetTimer = () => {
    setTimerSeconds(0);
    setTimerActive(false);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const toggleIngredientChecked = (ingName: string) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [ingName]: !prev[ingName],
    }));
  };

  const toggleStepCompleted = (index: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      id="recipe-detail-overlay"
    >
      <div className="relative bg-white dark:bg-zinc-900 w-full max-w-4xl rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-205">
        
        {/* Floating Celebration Particles */}
        <AnimatePresence>
          {showCelebration && (
            <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center">
              {celebrationParticles.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 100, rotate: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    scale: [0, p.scale * 1.3, p.scale, 0],
                    x: p.tx,
                    y: p.ty,
                    rotate: p.rot,
                  }}
                  transition={{
                    duration: p.duration,
                    delay: p.delay,
                    ease: "easeOut",
                  }}
                  className="absolute pointer-events-none select-none"
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    style={{ width: 14 + p.scale * 12, height: 14 + p.scale * 12, color: p.color }}
                    className="drop-shadow-[0_2px_5px_rgba(251,191,36,0.25)]"
                  >
                    <path d="M12 0c0 6.627 5.373 12 12 12-6.627 0-12 5.373-12 12 0-6.627-5.373-12-12-12C6.627 12 12 6.627 12 0z" />
                  </svg>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Scrollable Container covering Header, Progress Tracker, and Content */}
        <div className="flex-1 overflow-y-auto scroll-smooth scrollbar-thin" id="recipe-detail-scroll-container">
          
          {/* Sleek minimalist header banner */}
          <div className="relative h-44 sm:h-52 bg-zinc-900 overflow-hidden flex-shrink-0">
            <img
              src={getRecipePhoto(recipe)}
              alt={recipe.name}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-black/60" />
            
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/20 transition-all duration-200 cursor-pointer backdrop-blur-xs"
                id="recipe-close-btn"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
              
              <button
                onClick={() => onToggleFavorite(recipe)}
                className={`p-2 rounded-full border transition-all duration-200 cursor-pointer backdrop-blur-xs ${
                  isFavorite
                    ? "bg-rose-500 border-rose-500 text-white"
                    : "bg-black/40 border-white/10 text-white hover:bg-black/60"
                }`}
                id="recipe-fav-btn"
              >
                <Heart className={`w-4.5 h-4.5 ${isFavorite ? "fill-white text-white" : ""}`} />
              </button>
            </div>

            <div className="absolute bottom-5 left-5 right-5 text-white z-10">
              <div className="flex flex-wrap gap-1 mb-2">
                {recipe.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-zinc-805/85 backdrop-blur-xs border border-white/10 px-2 py-0.5 rounded text-[8px] font-semibold tracking-wider uppercase font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="font-sans text-lg sm:text-xl md:text-2xl font-bold leading-tight tracking-tight">
                {recipe.name}
              </h2>
            </div>
          </div>

          {/* Persistent High-Fidelity Cooking Progress Tracker (Sticky) */}
          <div className="sticky top-0 z-20 bg-orange-50/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-orange-100/50 dark:border-zinc-800/80 px-5 sm:px-7 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 select-none shadow-sm transition-all duration-250">
            <div className="flex items-center gap-3">
              {is100Percent ? (
                <motion.div 
                  animate={{ scale: [1, 1.06, 1], rotate: [0, 3, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center relative shadow-3xs"
                >
                  <ChefHat className="w-5 h-5 stroke-[2.5]" />
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                  </span>
                </motion.div>
              ) : (
                <div className="w-11 h-11 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-3xs animate-pulse">
                  <ChefHat className="w-5 h-5 stroke-[2.5]" />
                </div>
              )}
              <div className="text-left">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-950 dark:text-orange-400 block font-sans">
                  {lang === "ko" ? "요리 진행 상황" : "Cooking Journey Status"}
                </span>
                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                  {lang === "ko" 
                    ? `${recipe.instructions.filter((_, i) => completedSteps[i]).length} / ${recipe.instructions.length} 단계 완료됨` 
                    : `${recipe.instructions.filter((_, i) => completedSteps[i]).length} of ${recipe.instructions.length} steps completed`}
                </span>
              </div>
            </div>
            
            <div className="w-full sm:flex-1 max-w-lg flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[10px] font-sans font-extrabold uppercase tracking-widest text-[#cf771d] dark:text-orange-400">
                <span>{lang === "ko" ? "레시피 요리 단계" : "Recipe Journey Steps"}</span>
                <span className="text-zinc-800 dark:text-zinc-200">{getPercentCompleted()}% {lang === "ko" ? "조리됨" : "COOKED"}</span>
              </div>
              
              <div className="flex items-center gap-1.5 w-full font-sans">
                <div className="flex-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-0.5 rounded-full relative overflow-hidden">
                  <div className="flex items-center relative overflow-hidden" style={{ minHeight: "28px" }}>
                    {recipe.instructions.map((step, idx) => {
                      const isDone = completedSteps[idx];
                      const isActive = idx === recipe.instructions.findIndex((_, i) => !completedSteps[i]);
                      const stepNum = idx + 1;
                      const total = recipe.instructions.length;
                      const isFirst = idx === 0;
                      const isLast = idx === total - 1;
                      const isTimerRunning = stepTimers[idx]?.running;
                      
                      // Generate polygon clipPath for interconnected chevron look
                      let clipPath = "";
                      if (total === 1) {
                        clipPath = "none";
                      } else if (isFirst) {
                        clipPath = "polygon(0% 0%, calc(100% - 8px) 0%, 100% 50%, calc(100% - 8px) 100%, 0% 100%)";
                      } else if (isLast) {
                        clipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 8px 50%)";
                      } else {
                        clipPath = "polygon(0% 0%, calc(100% - 8px) 0%, 100% 50%, calc(100% - 8px) 100%, 0% 100%, 8px 50%)";
                      }
                      
                      return (
                        <div 
                          key={idx}
                          onClick={() => toggleStepCompleted(idx)}
                          style={{ 
                            clipPath,
                            marginLeft: isFirst ? 0 : "-8px",
                            zIndex: total - idx,
                          }}
                          className={`flex-1 h-7 relative transition-all duration-300 cursor-pointer flex items-center justify-center group ${
                            isDone 
                              ? "bg-amber-500 text-white shadow-none" 
                              : isActive
                                ? "bg-orange-100 dark:bg-zinc-800 text-orange-600 dark:text-orange-450"
                                : "bg-zinc-200 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 hover:bg-zinc-300 dark:hover:bg-zinc-800"
                          }`}
                          title={`Step ${stepNum}: ${isDone ? "Completed" : isActive ? "Active Now" : "Pending"}`}
                        >
                          {/* Active breathing pulse behind element */}
                          {isActive && (
                            <div className="absolute inset-0 bg-orange-400/10 animate-pulse pointer-events-none" />
                          )}
                          
                          {/* Inner content wrapper */}
                          <div className="flex items-center gap-1.5 px-3 select-none">
                            <span className={`text-[10px] font-mono font-extrabold transition-colors duration-200 ${
                              isDone 
                                ? "text-white" 
                                : isActive
                                  ? "text-orange-600 dark:text-orange-400 font-extrabold"
                                  : "text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-650 dark:group-hover:text-zinc-350"
                            }`}>
                              S{stepNum}
                            </span>
                            
                            {/* Moving spinning mechanical clock hand animation */}
                            {isTimerRunning && (
                              <div className="relative w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center bg-transparent flex-shrink-0">
                                <motion.div 
                                  className="w-0.5 h-1.5 bg-current rounded-full origin-bottom"
                                  style={{ y: -0.75 }}
                                  animate={{ rotate: 360 }}
                                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                />
                                <div className="absolute w-0.5 h-0.5 bg-current rounded-full" />
                              </div>
                            )}
                          </div>
                          
                          {/* Precision hover tooltip containing the first 40 chars of the step text */}
                          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-zinc-950 text-white text-[10px] py-1.5 px-3 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 shadow-xl whitespace-nowrap z-50 border border-zinc-800 scale-90 group-hover:scale-100">
                            <span className="font-semibold text-orange-400 mr-1 font-mono">Step {stepNum}:</span>
                            {step.length > 40 ? `${step.substring(0, 40)}...` : step}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="text-right hidden xs:block pl-2 flex-shrink-0 min-w-[70px]">
                  <span className="text-[9px] font-sans font-extrabold uppercase tracking-widest text-zinc-400 block text-right">
                    {lang === "ko" ? "총 소요 시간" : "SPEED PREP"}
                  </span>
                  <span className="text-xs font-bold font-mono text-zinc-750 dark:text-zinc-300 block text-right mt-0.5">
                    {recipe.prepTime + recipe.cookTime}{lang === "ko" ? "분" : " m"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Content */}
          <div className="p-5 md:p-7 bg-[#fafafc] dark:bg-zinc-900/40">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6.5 text-left">
            
            {/* LHS */}
            <div className="lg:col-span-1 flex flex-col gap-5">
              
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-1 text-center bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 p-3 rounded-2xl shadow-3xs">
                <div className="flex flex-col items-center justify-center">
                  <Clock className="w-4 h-4 text-zinc-650 dark:text-zinc-350 mb-1" />
                  <span className="text-[8px] uppercase tracking-wider text-zinc-450 dark:text-zinc-400 font-bold font-sans">{lang === "ko" ? "조리시간" : "Time"}</span>
                  <span className="text-[10px] font-extrabold text-zinc-900 dark:text-white mt-0.5 whitespace-nowrap">{recipe.prepTime + recipe.cookTime}{lang === "ko" ? "분" : " MINS"}</span>
                </div>
                <div className="flex flex-col items-center justify-center border-l border-zinc-200 dark:border-zinc-800">
                  <Users className="w-4 h-4 text-zinc-650 dark:text-zinc-350 mb-1" />
                  <span className="text-[8px] uppercase tracking-wider text-zinc-450 dark:text-zinc-400 font-bold font-sans">{lang === "ko" ? "분량" : "Servings"}</span>
                  <span className="text-[10px] font-extrabold text-zinc-900 dark:text-white mt-0.5 whitespace-nowrap">{recipe.servings}{lang === "ko" ? "인분" : " SERV"}</span>
                </div>
                <div className="flex flex-col items-center justify-center border-l border-zinc-200 dark:border-zinc-800">
                  <Award className="w-4 h-4 text-zinc-650 dark:text-zinc-350 mb-1" />
                  <span className="text-[8px] uppercase tracking-wider text-zinc-450 dark:text-zinc-400 font-bold font-sans">{lang === "ko" ? "난이도" : "Level"}</span>
                  <span className="text-[10px] font-extrabold text-zinc-900 dark:text-white mt-0.5 whitespace-nowrap">
                    {lang === "ko" 
                      ? (recipe.difficulty === "Easy" ? "쉬움" : recipe.difficulty === "Medium" ? "보통" : "어려움")
                      : recipe.difficulty.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Add to Weekly Meal Plan button */}
              {onAddToMealPlan && (
                <button
                  type="button"
                  onClick={() => onAddToMealPlan(recipe)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white rounded-xl text-xs font-bold shadow-3xs transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{lang === "ko" ? "식단표에 추가" : "Add to Weekly Meal Plan"}</span>
                </button>
              )}

              {/* Nutrition */}
              <div>
                <h4 className="text-[9px] font-extrabold uppercase tracking-wider text-zinc-400 dark:text-zinc-450 mb-2.5 flex items-center gap-1.5 font-sans">
                  <Flame className="w-3.5 h-3.5 text-orange-550" />
                  {lang === "ko" ? "영양 정보" : "Nutrition Info"}
                </h4>
                <div className="grid grid-cols-4 gap-1.5 text-[9px]">
                  <div className="bg-zinc-50/50 dark:bg-zinc-850 border border-zinc-150 dark:border-zinc-800 px-1 py-1.5 flex flex-col items-center justify-center text-zinc-800 dark:text-zinc-300 rounded-xl shadow-4xs">
                    <span className="text-[7.5px] uppercase font-bold text-zinc-400 dark:text-zinc-500">{lang === "ko" ? "칼로리" : "Cal"}</span>
                    <span className="font-bold text-zinc-950 dark:text-white mt-0.5">{recipe.nutritionalInfo.calories}</span>
                  </div>
                  <div className="bg-zinc-50/50 dark:bg-zinc-850 border border-zinc-150 dark:border-zinc-800 px-1 py-1.5 flex flex-col items-center justify-center text-zinc-850 dark:text-zinc-300 rounded-xl shadow-4xs">
                    <span className="text-[7.5px] uppercase font-bold text-zinc-400 dark:text-zinc-500">{lang === "ko" ? "단백질" : "Prot"}</span>
                    <span className="font-bold text-zinc-900 dark:text-white mt-0.5">{recipe.nutritionalInfo.protein}</span>
                  </div>
                  <div className="bg-zinc-50/50 dark:bg-zinc-850 border border-zinc-150 dark:border-zinc-800 px-1 py-1.5 flex flex-col items-center justify-center text-zinc-850 dark:text-zinc-300 rounded-xl shadow-4xs">
                    <span className="text-[7.5px] uppercase font-bold text-zinc-400 dark:text-zinc-500">{lang === "ko" ? "탄수화물" : "Carb"}</span>
                    <span className="font-bold text-zinc-905 dark:text-white mt-0.5">{recipe.nutritionalInfo.carbs}</span>
                  </div>
                  <div className="bg-zinc-50/50 dark:bg-zinc-850 border border-zinc-150 dark:border-zinc-800 px-1 py-1.5 flex flex-col items-center justify-center text-zinc-850 dark:text-zinc-300 rounded-xl shadow-4xs">
                    <span className="text-[7.5px] uppercase font-bold text-zinc-400 dark:text-zinc-500">{lang === "ko" ? "지방" : "Fat"}</span>
                    <span className="font-bold text-zinc-905 dark:text-white mt-0.5">{recipe.nutritionalInfo.fat}</span>
                  </div>
                </div>
              </div>

              {/* Ingredients Checklist */}
              <div className="bg-zinc-50/45 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-805 rounded-2xl p-4.5 shadow-3xs flex flex-col gap-3">
                <div className="flex justify-between items-center pb-2.5 border-b border-dashed border-zinc-200 dark:border-zinc-800">
                  <h4 className="text-[9px] font-extrabold uppercase tracking-wider text-zinc-500 dark:text-zinc-450 flex items-center gap-1.5 font-sans">
                    <CheckSquare className="w-3.5 h-3.5 text-indigo-505" />
                    {lang === "ko" ? "식재료 체크리스트" : "INVENTORY CHECKLIST"}
                  </h4>
                  <span className="text-[9px] uppercase font-semibold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 px-2 py-0.5 rounded-md border border-indigo-200/50 dark:border-indigo-900/30">
                    {recipe.allIngredients.length} {lang === "ko" ? "개 품목" : "ITEMS"}
                  </span>
                </div>

                <p className="text-[9.5px] text-zinc-500 dark:text-zinc-400 leading-normal font-sans">
                  {lang === "ko" 
                    ? "요리를 시작하기 전에 재료를 체계적으로 체크해 보세요. 파란색 라벨은 보유 중인 재료입니다."
                    : "Gather and check off ingredients before starting. Indigo labels match your active pantry."}
                </p>

                <div className="space-y-1.5">
                  {recipe.allIngredients.map((ing, k) => {
                    const isChecked = !!checkedIngredients[ing.name];
                    const isOwned = selectedIngredients?.some(sel => {
                      const selNorm = sel.toLowerCase().trim();
                      const itemNameNorm = ing.name.toLowerCase().trim();
                      const selSing = selNorm.endsWith("s") && selNorm.length > 3 ? selNorm.slice(0, -1) : selNorm;
                      const itemSing = itemNameNorm.endsWith("s") && itemNameNorm.length > 3 ? itemNameNorm.slice(0, -1) : itemNameNorm;
                      return itemNameNorm.includes(selNorm) || selNorm.includes(itemNameNorm) || itemSing.includes(selSing) || selSing.includes(itemSing);
                    }) ?? recipe.matchingIngredients.some(
                      (m) => m.toLowerCase().includes(ing.name.toLowerCase()) || 
                             ing.name.toLowerCase().includes(m.toLowerCase())
                    );

                    return (
                      <div
                        key={k}
                        onClick={() => toggleIngredientChecked(ing.name)}
                        className={`flex items-center justify-between p-2 rounded-xl border text-xs cursor-pointer select-none transition-all duration-200 ${
                          isChecked
                            ? "bg-zinc-100 dark:bg-zinc-950/40 border-zinc-200/50 dark:border-zinc-850 opacity-55 text-zinc-400"
                            : isOwned
                              ? "bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-200/40 dark:border-indigo-900/30 text-indigo-900 dark:text-zinc-100 hover:bg-indigo-100/40"
                              : "bg-white dark:bg-zinc-850 border-zinc-150 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-850 dark:text-zinc-200"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 flex-1 min-w-0">
                          <span className="text-zinc-500 dark:text-zinc-400 flex-shrink-0">
                            {isChecked ? (
                              <CheckSquare className="w-4 h-4 text-indigo-600" />
                            ) : (
                              <Square className="w-4 h-4 text-zinc-400 dark:text-zinc-650" />
                            )}
                          </span>
                          <div className="truncate flex-1 min-w-0 text-left">
                            <span className={`font-semibold text-[11px] transition-all ${isChecked ? "line-through text-zinc-405 font-medium" : "text-zinc-800 dark:text-zinc-100"}`}>
                              {ing.name}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 flex-shrink-0 pl-1.5">
                          <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-800 px-1.5 py-0.5 rounded-lg">
                            {ing.amount}
                          </span>
                          {isOwned && !isChecked && (
                            <span className="text-[8.5px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 px-1.5 py-0.5 rounded-md font-sans">
                              {lang === "ko" ? "보유" : "OWNED"}
                            </span>
                          )}
                          {!isOwned && !isChecked && (
                            <span className="text-[8.5px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400 px-1.5 py-0.5 rounded-md font-sans">
                              {lang === "ko" ? "필요" : "NEED"}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* RHS Cooking steps */}
            <div className="lg:col-span-2 flex flex-col">
              <div className="pb-3 mb-4.5 flex justify-between items-center text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800">
                <h3 className="font-sans text-sm font-extrabold uppercase tracking-wider flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-orange-500 animate-pulse" />
                  <span>{lang === "ko" ? "단계별 요리 안내서" : "Interactive Cooking Steps"}</span>
                </h3>
                
                <span className="text-[10px] font-extrabold font-sans text-orange-700 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/20 px-2.5 py-0.5 rounded-lg border border-orange-100 dark:border-orange-900/30 shadow-4xs uppercase">
                  {lang === "ko" ? "활성 단계" : "Active Steps"}
                </span>
              </div>

              <div className="space-y-3">
                {recipe.instructions.map((step, idx) => {
                  const isDone = completedSteps[idx];
                  const stepTimer = stepTimers[idx];
                  const hasTimer = !!stepTimer;
                  const stepIngredients = getIngredientsForStep(step);

                  return (
                    <div
                      key={idx}
                      onClick={() => toggleStepCompleted(idx)}
                      className={`relative flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 transition-all duration-300 cursor-pointer select-none shadow-3xs ${
                        isDone
                          ? "bg-zinc-100 dark:bg-zinc-950/40 border-zinc-150 dark:border-zinc-900 opacity-55 text-zinc-400"
                          : stepTimer?.running
                            ? "bg-amber-50/50 dark:bg-amber-955/20 border-amber-400"
                            : "bg-white dark:bg-zinc-900 border-zinc-150 dark:border-zinc-800 text-zinc-850 dark:text-zinc-250 hover:bg-[#FAF8F5]/30 hover:border-zinc-350 dark:hover:border-zinc-700"
                      }`}
                    >
                      <div className="flex gap-3.5 items-start flex-1 text-left">
                        {/* Round step identifier badge */}
                        <div className="flex-shrink-0">
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center font-sans font-bold text-xs border transition-all duration-300 ${
                              isDone
                                ? "bg-zinc-100 border-zinc-300 text-zinc-400"
                                : stepTimer?.running
                                  ? "bg-amber-500 border-amber-500 text-white animate-pulse"
                                  : "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950 dark:border-indigo-900"
                            }`}
                            style={stepTimer?.running ? { animationDuration: '6s' } : undefined}
                          >
                            {idx + 1}
                          </div>
                        </div>

                        {/* Instruction details */}
                        <div className="flex-1">
                          <p className={`text-xs sm:text-sm leading-relaxed font-bold transition-all ${isDone ? "line-through text-zinc-400 font-normal" : "text-zinc-850 dark:text-zinc-100"}`}>
                            {step}
                          </p>

                          {/* Specific ingredients needed for this step */}
                          {stepIngredients.length > 0 && (
                            <div className="mt-2.5 flex flex-wrap gap-1.5 items-center">
                              <span className="text-[9px] font-extrabold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-sans select-none">
                                {lang === "ko" ? "필요한 재료:" : "Required:"}
                              </span>
                              {stepIngredients.map((item, key) => {
                                const hasIngredient = selectedIngredients
                                  ? selectedIngredients.some((sel) => {
                                      const selNorm = sel.toLowerCase().trim();
                                      const itemNameNorm = item.name.toLowerCase().trim();
                                      const selSing = selNorm.endsWith("s") && selNorm.length > 3 ? selNorm.slice(0, -1) : selNorm;
                                      const itemSing = itemNameNorm.endsWith("s") && itemNameNorm.length > 3 ? itemNameNorm.slice(0, -1) : itemNameNorm;
                                      return itemNameNorm.includes(selNorm) || selNorm.includes(itemNameNorm) || itemSing.includes(selSing) || selSing.includes(itemSing);
                                    })
                                  : recipe.matchingIngredients.some(
                                      (m) => m.toLowerCase().includes(item.name.toLowerCase()) || 
                                             item.name.toLowerCase().includes(m.toLowerCase())
                                    );
                                 return (
                                  <span
                                    key={key}
                                    className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold border tracking-tight flex items-center gap-1.5 ${
                                      hasIngredient
                                        ? "bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-150 dark:border-indigo-905 text-indigo-700 dark:text-indigo-350"
                                        : "bg-rose-50/50 dark:bg-rose-950/30 border-rose-150 dark:border-rose-905 text-rose-700 dark:text-rose-350"
                                    }`}
                                  >
                                    <span>🥣 {item.name.toUpperCase()}</span>
                                    <span className="opacity-70 font-mono text-[9px] font-normal">({item.amount})</span>
                                    {!hasIngredient && (
                                      <span className="text-[8px] uppercase tracking-wide font-extrabold bg-rose-500 text-white rounded-md px-1 scale-90">
                                        {lang === "ko" ? "필요" : "NEED"}
                                      </span>
                                    )}
                                  </span>
                                );
                              })}
                            </div>
                          )}
                          
                          {/* Rich completion feedback */}
                          {stepTimer && stepTimer.seconds === 0 && !isDone && (
                            <div className="mt-2 text-[10px] font-extrabold text-white bg-indigo-600 rounded-xl px-2.5 py-1.5 inline-flex items-center gap-1.5 shadow-sm animate-bounce font-sans">
                              🔔 {lang === "ko" ? "[타이머 만료] 알람음! 다음 조리 세부 단계로 진행해주세요." : "CHIME DING! Timer finished, proceed to next!"}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Embedded active timer controllers inside step */}
                      {hasTimer && (
                        <div 
                          className="flex flex-shrink-0 items-center justify-end pt-3 md:pt-0" 
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div 
                            className={`flex items-center gap-2 p-1.5 px-3 rounded-full border transition-all duration-350 shadow-3xs ${
                              stepTimer.running 
                                ? "bg-amber-50 dark:bg-amber-955/40 text-amber-700 border-amber-300" 
                                : stepTimer.seconds === 0 
                                  ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                                  : "bg-zinc-50 dark:bg-zinc-950 text-zinc-700 border-zinc-200 dark:border-zinc-800"
                            }`}
                          >
                            <Clock className={`w-3.5 h-3.5 ${stepTimer.running ? "animate-pulse font-bold" : ""}`} />
                            
                            <span className="font-mono text-xs font-black tracking-normal">
                              {formatTime(stepTimer.seconds)}
                            </span>

                            {/* Control button row */}
                            <div className="flex items-center gap-1.5 border-l border-zinc-200 dark:border-zinc-800 pl-2 ml-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  setStepTimers(prev => ({
                                    ...prev,
                                    [idx]: { ...prev[idx], running: !prev[idx].running }
                                  }));
                                }}
                                className="p-1 hover:bg-black/10 rounded-full transition-all cursor-pointer"
                                title={stepTimer.running ? (lang === "ko" ? "타이머 정지" : "Pause step clock") : (lang === "ko" ? "타이머 시작" : "Start step clock")}
                              >
                                {stepTimer.running ? (
                                  <Pause className="w-3.5 h-3.5 stroke-[2.5]" />
                                ) : (
                                  <Play className="w-3.5 h-3.5 fill-current stroke-[2.5]" />
                                )}
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setStepTimers(prev => ({
                                    ...prev,
                                    [idx]: { ...prev[idx], seconds: prev[idx].initial, running: false }
                                  }));
                                }}
                                className="p-1 hover:bg-black/10 rounded-full transition-all active:scale-90 cursor-pointer"
                                title={lang === "ko" ? "재시작" : "Reset step clock"}
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                              </button>

                              {/* Chef extension button */}
                              <button
                                type="button"
                                onClick={() => {
                                  setStepTimers(prev => ({
                                    ...prev,
                                    [idx]: { 
                                      ...prev[idx], 
                                      seconds: prev[idx].seconds + 60,
                                      initial: prev[idx].initial + 60
                                    }
                                  }));
                                }}
                                className="px-1.5 py-0.5 hover:bg-black/10 rounded-full text-[9px] font-extrabold font-mono transition-all active:scale-90 cursor-pointer"
                                title={lang === "ko" ? "1분 추가" : "Add 1 minute extension"}
                              >
                                +1m
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {is100Percent && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="mt-8 bg-amber-50/45 dark:bg-zinc-900/30 border border-amber-200/50 dark:border-amber-400/15 backdrop-blur-md p-7 rounded-2xl flex flex-col items-center text-center shadow-xs relative overflow-hidden group"
                >
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="mb-3 relative flex items-center justify-center text-amber-500"
                  >
                    <div className="absolute w-12 h-12 bg-amber-500/10 dark:bg-amber-400/5 rounded-full blur-lg animate-pulse" />
                    <Award className="w-10 h-10 text-amber-500 dark:text-amber-400 drop-shadow-[0_2px_4px_rgba(245,158,11,0.2)]" />
                  </motion.div>
                  
                  <h4 className="font-sans font-bold text-base sm:text-lg tracking-tight text-amber-900 dark:text-amber-400 flex items-center gap-1.5 justify-center">
                    {lang === "ko" ? "✨ 완벽한 한 끼 요리 완성 ✨" : "✨ Perfect Feast Accomplished ✨"}
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 max-w-md font-medium leading-relaxed">
                    {lang === "ko" 
                      ? "정말 대단합니다! 모든 요리 체크포인트를 완벽하게 달성해 주셨습니다. 정성스럽게 서빙하시어 마법같은 맛을 즐겨 보세요! 🧑‍🍳🍰" 
                      : "Sensational effort! Every single cooking checkpoint has been masterfully cleared. Serve up your creation and savor this moment of culinary wizardry! 🧑‍🍳🍰"}
                  </p>
                  
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Trigger another burst!
                      setShowCelebration(false);
                      setTimeout(() => setShowCelebration(true), 60);
                    }}
                    className="mt-4 px-4 py-1.5 bg-amber-500 hover:bg-amber-600 dark:bg-amber-500/20 dark:hover:bg-amber-500/30 active:scale-95 border border-amber-600/10 dark:border-amber-400/25 text-white dark:text-amber-300 rounded-xl text-[10px] font-extrabold uppercase font-mono tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
                    {lang === "ko" ? "성과 축하하기" : "Savor Accomplishment"}
                  </button>
                </motion.div>
              )}

            </div>

          </div>
        </div>
        </div>

        <div className="p-4.5 bg-zinc-50 dark:bg-zinc-950 flex-shrink-0 flex justify-end border-t border-zinc-150 dark:border-zinc-800 animate-in slide-in-from-bottom duration-300">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-zinc-900 dark:bg-zinc-800 text-white rounded-xl text-xs font-semibold hover:bg-black dark:hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            {lang === "ko" ? "레시피 닫기" : "Close Recipe"}
          </button>
        </div>

      </div>
    </div>
  );
}
