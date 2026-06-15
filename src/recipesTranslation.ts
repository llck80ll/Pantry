import { Recipe, IngredientItem } from "./types";

// Translation dictionaries for ingredient categories
export const CATEGORY_TRANSLATIONS: Record<string, string> = {
  "meats": "육류 및 해산물",
  "dairy": "유제품 및 계란",
  "produce": "야채 및 채소",
  "fruits": "과일",
  "grains": "곡류 및 식료품",
  "dry_seasonings": "향신료 및 조미료",
  "wet_seasonings": "소스 및 오일",
  "Meats & Seafood": "육류 및 해산물",
  "Dairy & Eggs": "유제품 및 계란",
  "Vegetables & Greens": "야채 및 채소",
  "Fruits": "과일",
  "Grains & Pantry": "곡류 및 식료품",
  "Spices & Seasonings": "향신료 및 조미료",
  "Sauces & Oils": "소스 및 오일",
  "Meats": "육류 및 해산물",
  "Dairy": "유제품 및 계란",
  "Veggies": "야채 및 채소",
  "Spices": "향신료",
  "Sauces": "소스"
};

// Ingredient name English-to-Korean mapping dictionary
export const INGREDIENT_TRANSLATIONS: Record<string, string> = {
  // Meats & Seafood
  "Chicken Breast": "닭가슴살",
  "Ground Beef": "다진 소고기",
  "Bacon": "베이컨",
  "Salmon Fillet": "연어 필레",
  "Shrimp": "새우",
  "Crab": "게",
  "Lobster": "바닷가재",
  "Mussels": "홍합",
  "Clams": "조개",
  "Squid": "오징어",
  "Scallops": "관자",
  "Pork Chops": "돼지 갈비",
  "Turkey Breast": "칠면조 가슴살",
  "Sirloin Steak": "소고기 등심",
  "Canned Tuna": "참치캔",
  "Cod Fillet": "대구살 필레",
  "Pork Belly": "삼겹살",
  "Beef": "소고기",
  "Pork": "돼지고기",
  "Lamb": "양고기",
  "Cod": "대구",
  "Tuna": "참치",
  "Beef Sirloin": "소고기 등심",
  "Chicken Thighs": "닭다리살",
  "Raw Shrimp": "생새우",
  "Beef Patty": "소고기 패티",

  // Dairy & Eggs
  "Eggs": "계란",
  "Fresh Eggs": "신선한 계란",
  "Milk": "우유",
  "Cheddar Cheese": "체다 치즈",
  "Butter": "버터",
  "Greek Yogurt": "그리스 요거트",
  "Heavy Cream": "생크림",
  "Parmesan Cheese": "파마산 치즈",
  "Cream Cheese": "크림 치즈",
  "Mozzarella Cheese": "모짜렐라 치즈",
  "Sour Cream": "사워크림",
  "Heavy Whipping Cream": "휘핑 크림",
  "Feta Cheese": "페타 치즈",
  "Blue Cheese": "블루 치즈",
  "Grated Parmesan": "파마산 치즈 가루",

  // Vegetables & Greens
  "Garlic": "마늘",
  "Garlic Cloves": "마늘쪽",
  "Onions": "양파",
  "Yellow Onion": "황양파",
  "Spinach": "시금치",
  "Fresh Spinaches": "신선한 시금치",
  "Spinaches": "시금치",
  "Tomatoes": "토마토",
  "Canned Tomatoes": "토마토캔",
  "Sliced Tomato": "토마토 슬라이스",
  "Bell Peppers": "파프리카",
  "Mushrooms": "버섯",
  "Fresh Mushrooms": "신선한 양송이 버섯",
  "Shiitake Mushrooms": "표고버섯",
  "Broccoli": "브로콜리",
  "Broccoli Florets": "브로콜리 송이",
  "Potatoes": "감자",
  "Avocado": "아보카도",
  "Carrots": "당근",
  "Ginger": "생강",
  "Coriander": "고수",
  "Cilantro": "실란트로",
  "Parsley": "파슬리",
  "Fresh Parsley": "신선한 파슬리",
  "Green Onions": "쪽파",
  "Scallions": "대파",
  "Shallots": "샬롯",
  "Leeks": "리크",
  "Celery": "셀러리",
  "Cucumber": "오이",
  "Eggplant": "가지",
  "Cabbage": "양배추",
  "Kale": "케일",
  "Cauliflower": "콜리플라워",
  "Asparagus": "아스파라거스",
  "Asparagus spears": "아스파라거스 대",
  "Green Beans": "그린빈",
  "Peas": "완두콩",
  "Corn": "옥수수",
  "Pumpkin": "단호박",
  "Sweet Potatoes": "고구마",
  "Rosemary": "로즈마리",

  // Fruits
  "Lemon": "레몬",
  "Lime": "라임",
  "Apples": "사과",
  "Bananas": "바나나",
  "Strawberries": "딸기",
  "Blueberries": "블루베리",
  "Oranges": "오렌지",
  "Pineapple": "파인애플",
  "Mango": "망고",
  "Peaches": "복숭아",
  "Plums": "자두",
  "Cherries": "체리",
  "Grapes": "포도",
  "Watermelon": "수박",

  // Grains & Pantry
  "Pasta": "파스타",
  "Spaghetti Pasta": "스파게티 면",
  "Penne Pasta": "펜네 파스타 면",
  "Rice": "쌀/밥",
  "Flour": "밀가루",
  "Bread": "식빵/빵",
  "Tortillas": "토르티야",
  "Oats": "오트밀",
  "Black Beans": "검은콩",
  "White Sugar": "설탕",
  "Quinoa": "퀴노아",
  "Almond Flour": "아몬드 가루",
  "Cornstarch": "전분가루",
  "Yeast": "이스트",
  "Baking Soda": "베이킹소다",
  "Hamburger Buns": "햄버거번",

  // Spices & Seasonings
  "Salt & Pepper": "소금 & 후추",
  "Garlic Powder": "마늘가루",
  "Onion Powder": "양파가루",
  "Paprika": "파프리카 가루",
  "Cumin": "큐민",
  "Oregano": "오레가노",
  "Chili Flakes": "고춧가루/크러쉬드 페퍼",
  "Red Pepper Flakes": "크러쉬드 레드페퍼",
  "Cinnamon": "계피가루",
  "Thyme": "타임",
  "Cayenne Pepper": "카옌페퍼",
  "Sea Salt": "천일염",
  "Vanilla Extract": "바닐라 익스트랙",
  "Turmeric": "강황",
  "Coriander Powder": "고수가루",
  "Garam Masala": "가람 마살라",
  "Cardamom": "카다멈",
  "Nutmeg": "넛멕",
  "Cloves": "정향",
  "Allspice": "올스파이스",
  "Mustard Seeds": "겨자씨",
  "Fennel Seeds": "펜넬씨",
  "Sesame Seeds": "참깨",

  // Sauces & Oils
  "Olive Oil": "올리브 오일",
  "Soy Sauce": "간장",
  "Honey": "꿀",
  "Dijon Mustard": "디종 머스타드",
  "Mayonnaise": "마요네즈",
  "Ketchup": "케첩",
  "Sesame Oil": "참기름",
  "Sriracha": "스리라차 소스",
  "Balsamic Vinegar": "발사믹 식초",
  "Lemon Juice": "레몬즙",
  "Safflower Oil": "사플라워 오일",
  "Canola Oil": "카놀라유",
  "Vegetable Oil": "식용유",
  "Coconut Oil": "코코넛 오일",
  "Ghee": "기",
  "Balsamic Vinegar ": "발사믹 식초",
  "Red Wine Vinegar": "적포도주 식초",
  "Rice Vinegar": "쌀식초",
  "Worcestershire Sauce": "우스터소스",
  "Oyster Sauce": "굴소스",
  "Clam Juice": "조개즙",
  "Coconut Milk": "코코넛 밀크",
  "Curry Paste": "카레 페이스트",
  "Peanut Butter": "땅콩버터",
  "Almond Butter": "아몬드 버터",
  "Maple Syrup": "메이플 시럽",
  "Tomato Paste": "토마토 페이스트",
  "Mint": "민트",
  "Dill": "딜",
  "Sage": "세이지",
  "Chives": "영양부추/차이브",
  "Mustard": "머스타드"
};

// Cuisine English-to-Korean Translations
export const CUISINE_TRANSLATIONS: Record<string, string> = {
  "Any": "전체 요리 종류",
  "Any Cuisine": "전체 요리 종류",
  "Asian": "아시안 요리",
  "American": "아메리칸 요리",
  "Japanese": "일식 요리",
  "Spanish": "스페인 요리",
  "Italian": "이탈리안 요리",
  "Mexican": "멕시칸 요리",
  "French": "프렌치 요리",
  "Mediterranean": "지중해식 요리"
};

// Function to translate ingredient names elegantly
export function translateIngredientName(enName: string): string {
  const norm = enName.trim();
  if (INGREDIENT_TRANSLATIONS[norm]) {
    return INGREDIENT_TRANSLATIONS[norm];
  }
  
  // Try singular version
  if (norm.endsWith("s") && norm.length > 3) {
    const sing = norm.slice(0, -1);
    if (INGREDIENT_TRANSLATIONS[sing]) {
      return INGREDIENT_TRANSLATIONS[sing];
    }
  }

  // Substring translation helpers
  for (const [en, id] of Object.entries(INGREDIENT_TRANSLATIONS)) {
    if (norm.toLowerCase() === en.toLowerCase()) {
      return id;
    }
  }
  return enName;
}

// Translate amount phrases
export function translateAmount(enAmount: string): string {
  let amt = enAmount.trim();
  amt = amt.replace(/cloves, minced/gi, "쪽 (다진 것)");
  amt = amt.replace(/cloves, sliced/gi, "쪽 (슬라이스)");
  amt = amt.replace(/cloves/gi, "쪽");
  amt = amt.replace(/whole/gi, "개");
  amt = amt.replace(/portions/gi, "인분");
  amt = amt.replace(/patties/gi, "개 (패티)");
  amt = amt.replace(/pieces/gi, "조각/개");
  amt = amt.replace(/slices/gi, "슬라이스/개");
  amt = amt.replace(/fillets/gi, "조각");
  amt = amt.replace(/sprig/gi, "줄기");
  amt = amt.replace(/tbsp/gi, "큰술");
  amt = amt.replace(/tsp/gi, "작은술");
  amt = amt.replace(/pinch/gi, "한 꼬집");
  amt = amt.replace(/fruit/gi, "개");
  amt = amt.replace(/bunch/gi, "단");
  amt = amt.replace(/can/gi, "캔");
  amt = amt.replace(/cup, fresh/gi, "컵 (신선한 것)");
  amt = amt.replace(/cup/gi, "컵");
  amt = amt.replace(/To taste/gi, "적당량");
  return amt;
}

// Comprehensive Recipe translations database for English fallback
export const RECIPE_TRANSLATIONS_DB: Record<string, Partial<Recipe>> = {
  // Demo Recipes
  "demo_1": {
    name: "투스칸 마늘 햇양파 프리타타",
    description: "다진 마늘, 캐러멜라이징한 햇양파, 로즈마리를 넣어 폭신하고 노릇노릇하게 구운 이탈리아식 계란찜 요리.",
    tags: ["채식", "글루텐프리", "고단백"],
    instructions: [
      "중간 크기 볼에 계란을 풀고 소금, 후추, 갈아둔 파마산 치즈를 넣고 부드러운 거품이 일 때까지 섞어줍니다.",
      "오븐 사용이 가능한 달라붙지 않는 프라이팬에 올리브 오일을 중약불로 달군 뒤, 채 썬 양파를 부드러워질 때까지 볶습니다.",
      "다진 마늘과 잘게 자른 로즈마리를 넣고 마늘 향이 풍부하게 올라올 때까지 1분간 더 볶아 줍니다.",
      "풀어둔 계란물을 부어 팬 가장자리를 가볍게 저어가며 향긋한 재료들이 골고루 퍼지도록 돕습니다.",
      "약불에서 약 5분간 익혀 아래가 어느 정도 굳으면, 오븐 브로일러에 가볍게 구워 윗면을 황금빛으로 통통하게 부풀려 완성합니다."
    ]
  },
  "demo_2": {
    name: "클래식 이탈리안 알리오 올리오 파스타",
    description: "부드럽게 튀기듯 익힌 노릇한 마늘 편, 고급 올리브 오일, 매콤한 페페론치노를 알덴테 스파게티면에 버무린 심플함의 극치.",
    tags: ["비건", "파스타", "스피드요리"],
    instructions: [
      "냄비에 소금을 넣은 물을 끓여 스파게티 면을 알덴테 상태(심이 씹히는 정도)가 될 때까지 삶아줍니다.",
      "팬에 얇게 편으로 썬 마늘과 차가운 올리브 오일을 함께 넣은 후 약중불에서 아주 천천히 가열하며 마늘 기름을 내줍니다.",
      "마늘 편이 노릇노릇하고 바삭해지면 불을 끄기 직전에 레드페퍼 플레익스를 솔솔 뿌려 가볍게 볶아줍니다.",
      "소스를 에멀젼화(오일과 수분이 섞여 크림처럼 됨)하기 위해 면수 한 국자를 넣어 소스 농도를 윤기 나게 맞춰줍니다.",
      "삶아낸 스파게티 면을 마늘 오일에 즉시 넣고 에멀젼 즙이 면에 골고루 달아붙도록 계속 버무리며 파슬리를 얹어 즉시 냅니다."
    ]
  },
  "demo_3": {
    name: "허니 머스타드 연어 스테이크",
    description: "달콤한 꿀, 톡 쏘는 디종 머스타드와 굵게 다진 흑후추 소스를 발라 육즙이 가득하고 달콤 짭조름하게 조리한 오븐 연어구이.",
    tags: ["고단백", "해산물", "지중해식"],
    instructions: [
      "작은 유리그릇에 분량의 꿀, 디종 머스타드, 간장, 다진 마늘과 소금 한 꼬집을 넣고 잘 섞어 머스타드 소스를 완성합니다.",
      "준비한 소스를 연어 필레의 모든 면에 빈틈없이 넉넉하고 두툼하게 발라줍니다.",
      "프라이팬에 올리브 오일을 두르고 중불로 달군 뒤, 연어의 껍질 부분을 아래로 가게 올려 4분간 먼저 굽습니다.",
      "연어를 조심스럽게 뒤집어 꿀이 눌어 고소하게 구워지도록 추가로 3분간 촉촉하게 구워냅니다.",
      "마무리에 신선한 레몬 슬라이스와 통후추를 부수어 뿌려 서빙 플레이트에 예쁘게 올립니다."
    ]
  },
  "demo_4": {
    name: "크리미 갈릭 파마산 베이컨 치킨",
    description: "바삭 바삭 크리스피한 베이컨 칩, 다진 마늘, 그리고 진하고 노란 파마산 치즈 크림소스에 졸인 환상적인 닭가슴살 요리.",
    tags: ["고단백", "저탄고지", "이탈리안"],
    instructions: [
      "팬에 베이컨을 넣고 바삭 바삭 기름이 빠져 베어나올 때까지 앞뒤로 노릇하게 구운 뒤 키친타월에 건져둡니다.",
      "닭가슴살을 소금, 후추로 밑간을 하고 베이컨 기름이 남은 프라이팬에 올린 뒤 구워 노릇해지면 따로 꺼내 둡니다.",
      "남아 있는 팬의 잔물에 약간의 버터와 마늘을 추가하여 1분 동안 구워 마늘의 달콤 고소한 향을 극대화합니다.",
      "생크림과 곱게 갈은 파마산 치즈를 부어 따뜻하게 농도가 끓어 오르도록 천천히 저어 줍니다.",
      "신선한 시금치는 마지막에 넣어 가볍게 저어 숨을 죽이고, 구워둔 촉촉한 닭가슴살과 바삭 베이컨을 함께 넣어 소스를 끼얹어가며 2분간 더 뭉근하게 졸여 완성합니다."
    ]
  },
  "demo_5": {
    name: "참기름 향 가득 버섯 브로콜리 볶음",
    description: "슬라이스한 신선한 양송이 버섯과 아삭 브로콜리를 진한 진간장, 감칠맛 참기름과 함께 화력 좋은 중불에서 볶아 밥 위에 얹어 내는 아시안 덮밥.",
    tags: ["아시안", "채식주의", "초간단식사"],
    instructions: [
      "양송이 버섯은 정갈하게 슬라이스하고 브로콜리는 한입 크기로 보기 좋게 떼어 물에 깨끗이 헹궈 둡니다.",
      "달구어지지 않은 웍이나 프라이팬에 편 마늘과 프레쉬 오일을 함께 올려 약한 불에서 은은향을 만들어 냅니다.",
      "다음에 화력을 중상불로 한껏 올린 후 썰어둔 버섯, 양파, 브로콜리를 투하하고 3분간 빠르게 볶아냅니다.",
      "재료의 테두리가 서서히 투명함을 띠면 분량의 진간장을 팬 외곽 테두리를 따라 흘려 태우듯 감칠맛 향을 가두어냅니다.",
      "따뜻하고 참기름 향 가득 담아 지은 밥에 볶아낸 윤기 야채를 가지런히 올린 뒤 취향껏 매콤 고춧가루를 한 꼬집 얹어 냅니다."
    ]
  },
  "demo_6": {
    name: "고메 체다 치즈 수제 갈릭 버거",
    description: "육즙이 가득한 두툼한 패티 위에 사르르 완전히 녹은 고소한 체다 슬라이스 치즈와 특제 갈릭 버터를 바른 수제 버거.",
    tags: ["패밀리푸드", "고단백", "아메리칸"],
    instructions: [
      "뜨겁게 달군 그릴팬에 소고기 패티를 올리고 겉면이 바삭하게 캐러멜라이징 되도록 한 면당 4분간 강하게 가열합니다.",
      "패티의 두 번째 면을 구울 때 윗면에 체다 슬라이스 치즈를 올려 뚜껑을 덮어 치즈를 부드럽게 완전 멜팅시킵니다.",
      "갈릭 버터를 햄버거 번 단면에 고르게 펴 바릅니다.",
      "팬에 햄버거 번 안쪽 단면을 대고 황금빛으로 아삭하게 토스트해 줍니다.",
      "따뜻하게 토스트 된 버거 번 위에 양파 채, 토마토 슬라이스, 촉촉하게 사르르 녹은 수제 고메 패티를 얹어 합체합니다."
    ]
  },
  "demo_7": {
    name: "원팬 레몬 갈릭 아스파라거스 새우구이",
    description: "탱글탱글한 생새우와 아삭한 아스파라거스를 상큼한 레몬즙, 다진 마늘, 버터와 함께 가볍게 구워 완성하는 원팬 요리.",
    tags: ["글루텐프리", "지중해식", "퀵저녁"],
    instructions: [
      "오븐이나 프라이팬을 중불로 달구고 아스파라거스는 아래 단단하고 거친 밑동을 썰어내 정리합니다.",
      "손질한 새우는 키친타올로 물기를 완전히 닦아내고 소금, 후추, 약간의 머스타드나 올리브오일을 뿌려 둡니다.",
      "오븐용 팬이나 프라이팬에 올리브 오일을 살짝 뿌리고 아스파라거스와 새우를 놓은 뒤 다진 마늘을 골고루 흩뿌립니다.",
      "레몬 반 개를 즙을 내 소스에 흘려주고 버터 한 꼬집을 곳곳에 올립니다.",
      "새우가 선명한 분홍색을 띠고 아스파라거스가 아주 부드러워 지도록 8~10분간 구워냅니다.",
      "완성된 새우구이를 레몬 슬라이스 및 레드페퍼 플레익스와 곁들여 매콤하고 상큼하게 마감합니다."
    ]
  },
  "demo_8": {
    name: "선드라이 토마토 시금치 크림 파스타",
    description: "진하고 고급스러운 파마산 치즈 생크림 베이스에 산뜻한 말린 선드라이 토마토와 신선한 시금치가 찰지게 버무려진 파스타 요리.",
    tags: ["채식주의", "이탈리안", "파스타"],
    instructions: [
      "끓는 식염수에 펜네 파스타면을 넣고 포장에 표기된 알덴테 권장 조리 시간을 준수하여 쫄깃하게 익혀줍니다.",
      "프라이팬에 항긋한 오일을 넉넉하게 둘러 다진 마늘 조각을 넣고 투명해질 때까지 은근하게 볶아냅니다.",
      "선드라이 토마토 채를 다진 갈릭 팬에 넣어 오일과 토마토 감칠맛이 잘 섞이도록 볶습니다.",
      "우유 생크림을 부어 전체 소스가 보글보글 거품을 낼 때까지 2분간 끓이다 신선한 시금치 잎을 넣습니다.",
      "단숨에 파스타면을 조심스레 넣고 파마산 치즈를 넉넉하게 뿌려 소스 농도가 꾸덕하고 따뜻해지면 완성합니다."
    ]
  },

  // Base Data Recipes 1-18
  "rec_carbonara": {
    name: "클래식 스파게티 카르보나라",
    description: "바삭한 베이컨, 계란, 그리고 풍부한 치즈로 만든 실크처럼 부드럽고 풍미 가득한 로마 전통 파스타 클래식.",
    tags: ["이탈리안", "파스타", "클래식", "소울푸드"],
    instructions: [
      "소금을 넣은 끓는 물에 파스타를 넣고 알덴테 상태가 될 때까지 포장지 지침대로 조리합니다.",
      "파스타가 삶아지는 동안 베이컨을 잘게 썰어 중불 프라이팬에서 버터와 다진 마늘과 함께 바삭하게 볶습니다.",
      "볼에 계란과 곱게 간 파마산 치즈를 넣고 잘 저어 섞은 후 후추를 넉넉히 뿌려 간을 합니다.",
      "면수 1/2컵을 따로 남겨둔 뒤 파스타 면을 체에 밭쳐 물기를 뺍니다.",
      "불을 끄고 즉시 뜨거운 파스타 면을 베이컨과 마늘이 있는 팬에 넣고 가볍게 섞습니다.",
      "식기 전에 계란과 치즈 혼합물을 부어 남은 잔열로 계란이 익어 부드럽고 크리미한 소스가 되도록 격렬하게 저어줍니다. 소스가 너무 꾸덕하면 남겨둔 면수를 조금씩 섞어줍니다."
    ]
  },
  "rec_garlic_chicken": {
    name: "갈릭 버터 닭가슴살 구이",
    description: "상큼한 레몬 갈릭 버터 소스에 푹 적셔 조리한 육즙 가득하고 촉촉한 팬 시어링 닭가슴살 스테이크.",
    tags: ["이탈리안", "고단백", "간편요리", "글루텐프리"],
    instructions: [
      "닭가슴살의 물기를 키친타월로 닦아내고 양면에 소금과 후추로 밑간을 골고루 해줍니다.",
      "큰 프라이팬에 올리브 오일과 버터 1큰술을 두르고 중강불에서 달군 후, 닭가슴살을 올려 양면이 노릇해지고 속까지 다 익을 때까지 한 면당 6~7분씩 구워냅니다.",
      "구운 닭가슴살을 접시에 옮겨 잠시 휴지(레스팅)시킵니다. 팬의 불은 중불로 줄입니다.",
      "남은 버터 2큰술과 다진 마늘을 팬에 넣고 향이 올라올 때까지 1분 동안 계속 저어가며 볶습니다.",
      "레몬을 반으로 잘라 즙을 짜넣고, 팬 바닥에 눌어붙은 맛있는 갈색 닭고기 육즙을 긁어내며 섞어줍니다.",
      "닭가슴살과 접시에 고인 육즙을 팬에 다시 넣고, 완성된 레몬 갈릭 버터 소스를 숟가락으로 닭가슴살 위에 끼얹어가며 살짝 졸여 완성합니다."
    ]
  },
  "rec_beef_broccoli": {
    name: "가정식 소고기 브로콜리 볶음",
    description: "부드러운 소고기 안심 채와 아삭한 브로콜리를 생강 마늘 소스에 빠르게 볶아낸 감칠맛 가득한 Stir-Fry 요리.",
    tags: ["아시안", "고단백", "빠른요리", "저녁식사"],
    instructions: [
      "쌀을 씻어 물 2컵과 함께 안쳐서 고슬고슬하게 밥을 짓고 뚜껑을 덮어 둡니다.",
      "소고기를 결 반대 방향으로 얇고 한 입 크기 채로 썬 뒤 소금과 후추로 밑간을 합니다.",
      "브로콜리는 한 입 크기로 송이를 떼고 양파는 얇게 채 썹니다.",
      "큰 팬이나 웍을 강불로 달구고 올리브 오일 1큰술을 두른 뒤 밑간한 소고기를 2~3분간 빠르게 볶아 갈색으로 익으면 접시에 따로 덜어둡니다.",
      "남은 올리브 오일을 두르고 채 썬 양파와 브로콜리, 다진 마늘을 넣어 브로콜리가 선명한 초록색을 띠고 아삭함이 살아있을 때까지 3~4분간 볶습니다.",
      "따로 덜어둔 소고기를 팬에 다시 넣고 함께 재 빠르게 섞어 가볍게 볶은 뒤, 고슬고슬한 밥 위에 얹어 따뜻하게 냅니다."
    ]
  },
  "rec_garlic_salmon": {
    name: "크리미 갈릭 버터 연어 스테이크",
    description: "겉바속촉으로 팬에 구운 연어 필레를 신선한 시금치가 듬뿍 들어간 부드럽고 진한 생크림 소스에 졸여낸 최고급 플레이트.",
    tags: ["지중해식", "해산물", "키토", "고단백"],
    instructions: [
      "연어 필레의 물기를 제거하고 양면에 소금과 후추로 골고루 밑간을 합니다.",
      "큰 프라이팬에 올리브 오일과 버터 1큰술을 두르고 중강불에서 달군 후, 연어를 올려 껍질 쪽이 위로 가게 4분간 굽고, 뒤집어서 껍질 쪽으로 3분간 더 구운 뒤 접시에 따로 꺼내 둡니다.",
      "불을 중불로 줄이고 남은 버터와 다진 마늘을 넣어 마늘이 타지 않고 노릇해지며 향이 향긋하게 날 때까지 1분 정도 볶습니다.",
      "생크림을 붓고 레몬즙을 짜 넣은 후 약하게 끓기 시작하면 가볍게 저어주며 불을 줄이고 은근히 조립니다.",
      "신선한 시금치를 팬에 넣어 소스 안에서 숨이 완전히 죽을 때까지 살짝 저어줍니다.",
      "구워둔 연어를 팬에 다시 넣고 부드러운 화이트 크림 소스를 연어 위에 골고루 끼얹으며 약 2분간 더 따뜻하게 조려 완성합니다."
    ]
  },
  "rec_breakfast_omelette": {
    name: "부드러운 시금치 베이컨 오믈렛",
    description: "베이컨, 고소한 체다 치즈, 볶은 양송이 버섯과 귀여운 시금치를 넣어 폭신폭신하게 접어 올린 정통 양식 오믈렛.",
    tags: ["프렌치", "아침식사", "글루텐프리", "간편요리"],
    instructions: [
      "그릇에 계란 3개를 깨뜨려 넣고 소금, 후추와 함께 곱게 풀어줍니다.",
      "프라이팬을 중불로 달구어 잘게 썬 베이컨과 슬라이스한 양송이 버섯을 넣어 바삭하고 노릇하게 볶아낸 후, 시금치를 더해 숨이 죽도록 30초만 가볍게 볶아 따로 접시에 덜어냅니다.",
      "팬을 키친타월로 닦아내고 버터 1큰술을 녹여 흐르듯이 고르게 두른 뒤 계란물을 부어줍니다.",
      "바닥이 살짝 익으면 주록으로 중앙으로 부드럽게 밀어 가며 몽글몽글하게 익혀 줍니다.",
      "계란 표면이 아직 촉촉할 때 따로 덜어둔 베이컨, 버섯, 시금치 볶음과 체다 치즈를 한쪽에 얹어줍니다.",
      "주걱을 아래로 조심스럽게 넣어 반으로 접어 모양을 잡고 치즈가 녹아내릴 때까지 1분간 기다린 뒤 가볍게 서빙 플레이트에 올립니다."
    ]
  },
  "rec_potato_hash": {
    name: "소박한 감자 버섯 범벅 해쉬",
    description: "황금색 감자 큐브를 고소한 버섯, 양파, 마늘과 함께 볶아 계란 반숙 노른자를 톡 터뜨려 비벼 먹는 컨트리풍 볶음.",
    tags: ["아메리칸", "채식", "소울푸드", "간편요리"],
    instructions: [
      "감자는 깨끗이 씻어 사방 1.5cm 크기의 주사위 모양으로 깍둑썰기하고, 양파도 감자와 비슷한 크기로 썹니다. 버섯과 마늘은 얇게 조각 썰어 줍니다.",
      "무쇠 프라이팬에 버터를 녹이고 중간 불에서 감자와 양파를 먼저 볶아 감자 표면이 바삭하고 갈색이 될 때까지 약 8-10분 익힙니다.",
      "마늘과 버섯 슬라이스를 더하고 소금, 검은 후추로 밑간을 정렬해 5분간 숨을 고르며 볶습니다.",
      "감자들 사이에 깊은 틈새 2곳을 만들어 생계란을 각각 깨뜨려 조심스레 자리를 잡습니다.",
      "프라이팬 뚜껑을 닫고 가장 약한 불로 조절해 계란 흰자는 보얗게 다 익고 노른자는 촉촉하게 반숙 상태가 될 때까지 4-5분간 익혀 한 팬 그대로 뜨겁게 완성합니다."
    ]
  },
  "rec_fajita": {
    name: "클래식 지글지글 치킨 화이타",
    description: "멕시칸 특유의 매콤 짭조름하게 숙성한 닭가슴살 스트립을 알록달록한 파프리카, 양파 조각과 센불에 볶아낸 타코 친구 화이타.",
    tags: ["멕시칸", "간편요리", "저녁식사", "매콤함"],
    instructions: [
      "닭가슴살, 파프리카, 양파를 일정한 굵기의 얇은 세로 가닥 스트립 형태로 정교하게 썰어줍니다.",
      "넓은 그릇에 올리브유 일부와 다한 마늘, 소금, 수확한 새콤한 라임즙을 부어 닭가슴살이 향을 가득 머금도록 주물러 둡니다.",
      "열 전도율이 높은 무쇠 팬을 연기가 살짝 날 정도로 아주 뜨겁게 달군 후 야채들을 약 4-5분간 불에 그슬어가며 아삭하게 볶아 접시에 치웁니다.",
      "같은 팬에 재워둔 매콤한 닭고기를 올리고 단단하고 속까지 촉촉하게 익도록 5-6분간 완전히 조리합니다.",
      "아삭하게 구운 야채들을 팬에 합쳐 라임즙을 더 끼얹고 살짝 졸여 화력 향기를 머금게 마감합니다.",
      "토르티야 빵을 건조한 팬에 노릇하게 구워 준비하고 체다 치즈 소스와 함께 푸짐하게 완성합니다."
    ]
  },
  "rec_tuscan_pasta": {
    name: "투스칸 백토마토 시금치 파스타",
    description: "깊고 깔끔한 마늘 향 올리브 오일에 잘 익은 캔 토마토 육즙, 연한 시금치가 조화롭게 녹아든 이탈리아 가성비 펜네 파스타.",
    tags: ["이탈리안", "채식", "파스타", "건강식"],
    instructions: [
      "소금을 탄 물을 펄펄 끓여 파스타를 넣고 제품 매뉴얼대로 쫄깃한 식감이 남도록 알덴테 단계까지 삶아 면수 반 컵과 남겨 둡니다.",
      "잘게 자른 양파와 으깬 마늘 조각을 프라이팬에 올리브 오일과 함께 약 3분간 전반적으로 투명 노란빛을 돌 때까지 볶습니다.",
      "캔 토마토 다이스 조각들과 소금, 후추를 밀어 넣고 8-10분간 보골보골 뭉근하게 소스를 졸이며 토마토 풍미를 농축해 줍니다.",
      "풍선처럼 연한 베이비 시금치를 더해 뜨거운 소스 속에 서서히 숨이 차분하게 완전히 가라앉도록 1-2분간 저어냅니다.",
      "물기를 제거한 파스타면과 분량의 면수 소량을 부어 크리미하게 소스가 잘 베이도록 면을 힘있게 흔들어 마감합니다.",
      "파마산 치즈 파우더를 넉넉하게 뿌려 소스가 리치하고 부드럽도록 접시에 담아 바로 제공합니다."
    ]
  },
  "rec_lemon_shrimp": {
    name: "레몬 갈릭 버터 새우 파스타",
    description: "뜨거운 팬에 시어링한 통통하고 탱탱한 알새우에 신선한 레몬 버터 소스 광택을 입혀 고소하게 버무린 지중해풍 파스타.",
    tags: ["지중해식", "해산물", "이탈리안", "고급요리"],
    instructions: [
      "국수를 넉넉한 소금물에 쫄깃촉촉하게 삶아내 체에 가볍게 전개해 둡니다.",
      "단단하고 미끄러운 새우의 물기를 제거하고 소금과 후추, 약간의 허브 조각을 흩뜨려 밑간합니다.",
      "달군 프라이팬에 올리브유와 버터를 함께 얹고 향이 뿜어지면 새우를 넣고 중간 화력으로 각 측면을 1-2분씩 탱탱하게 뒤집어 구워 건져둡니다.",
      "남아있는 고소한 마늘기름 소스에 남은 버터와 올리브유를 다진 마늘과 부어 풍미를 채웁니다.",
      "프레쉬한 레몬을 스퀴즈하여 산뜻한 레몬 주스와 시금치 잎을 풍부하게 가미합니다.",
      "삶은 파스타 면과 구운 새우를 한곳으로 밀어넣고 잔 수분을 소화해가며 윤기롭게 소스를 비벼 완성합니다."
    ]
  },
  "rec_beef_tacos": {
    name: "고소한 가정식 소고기 타코",
    description: "풍부한 향신료와 타코 시즈닝으로 볶은 다진 소고기 소를 따끈한 토르티야 빵 위에 푸짐히 얹고 아보카도, 사워크림을 뿌려 먹는 패밀리 요리.",
    tags: ["멕시칸", "가족식사", "스피드요리", "소울푸드"],
    instructions: [
      "프라이팬에 다진 소고기를 소금, 후추와 볶아낸 뒤 고인 고소한 여분의 고기 기름을 적절히 짜내 조리 정체성을 잡습니다.",
      "고기가 볶아지는 사이 토마토, 자색 양파, 아보카도를 잘 익은 것들로 사방 0.5cm 보석형 입자로 썰어냅니다.",
      "썰어낸 아보카도와 토마토에 상큼한 라임 즙을 사르르 부어 변색을 방지하고 산뜻한 향기를 가둬 줍니다.",
      "토르티야 장들을 물기 없는 마른 프라이팬에 얹어 따끈하게 연한 구움 무드만 입힙니다.",
      "토르티야를 들고 정성스레 양념 소고기 볶음을 가득 채우고 노란 체다 치즈 파우더와 보석형 토핑을 풍요롭게 보냅니다.",
      "부드러운 사워크림을 숟가락 끝으로 모양을 가두어 내고 라임을 꽉 짜 즉석 타코 무드를 완성합니다."
    ]
  },
  "rec_cod_fillet": {
    name: "프렌치 갈릭 크림 버터 대구 요리",
    description: "사르르 영양이 채워진 보드라운 순백의 대구 필레를 고소하고 진한 버터와 마블 형태의 하얀 갈릭 생크림에 저온 Poach 공법으로 졸인 정밀 프렌치 요리.",
    tags: ["프렌치", "지중해식", "해산물", "저탄수화물"],
    instructions: [
      "당근은 장난간처럼 가벼운 성냥개비 스틱 두께로 얄팍하게 썰고, 브로콜리는 미니어처 소형 알송이로 준비합니다.",
      "밑간 대구 필레에 잔잔한 수분을 치우고 팬의 우수한 밀폐 뚜껑을 세팅하며 버터를 녹여 채소들과 3-4 분 시어링합니다.",
      "채소들을 프라이팬 테두리로 얌전하게 옮겨 공간을 형성한 후 중앙에 다진 달콤 마늘 향을 입혀 줍니다.",
      "대구 필레 생선을 중심축에 세팅하고 레몬즙, 다진 마늘의 풍부한 버터 소스를 대구 비늘 부위 위로 여러 번 끼얹어 소통시킵니다.",
      "고소한 순백의 부드러운 우유 생크림을 외곽 주위에 흐르듯 붓고 라임 즙을 섞은 지 프라이팬의 뚜껑을 깊이 차단하여 최적의 부드러운 찜 Poach 처리를 7-8분 행합니다.",
      "껍데기를 열고 오븐이나 소스 조리 수분을 대구 생선살 사이사이에 수축하듯 가두어 완성 플레이트에 보냅니다."
    ]
  },
  "rec_greek_yogurt": {
    name: "항산화 그리스 요거트 가득 과일 보울",
    description: "꾸덕함의 진수 고단백 정통 그리스 요거트 위에 제철 생딸기, 블루베리, 바나나, 바삭한 오트밀과 달콤한 눈꽃 설탕을 한 숟가락 뿌린 건강한 간식.",
    tags: ["지중해식", "아침식사", "건강식", "지식채식", "아이간식"],
    instructions: [
      "넓은 보울 접시를 골라 꾸덕꾸덕한 요거트를 깔고 주걱 뒷면으로 기포를 완화하여 반듯하게 세팅합니다.",
      "식용 생과일들을 흐르는 청수에 깔끔하게 헹군 후 딸기는 반 자르고 바나나는 얇은 보름달 동전으로 제단합니다.",
      "프라이팬에 오트밀 고습 입자를 중간 불로 2분 동안 향긋하게 고소한 누룽지 냄새가 날 때까지 정성스레 구워냅니다.",
      "하얀 무색무취의 수제 요거트 바탕 위에 정연하게 딸기 단면, 상록 블루베리, 사과 조각을 세련되게 배열합니다.",
      "열기를 가라앉힌 바삭 촉촉 오트밀 알 입자들을 거친 사막의 모래처럼 군데군데 고운 질감을 불어넣습니다.",
      "설탕이나 꿀 감미 소스를 기호에 알맞게 한 단 뿌려 정성을 다해 드시기 좋은 최상의 디저트를 바로 섭취합니다."
    ]
  },
  "rec_tuna_salad": {
    name: "아보카도 참치 영양 파워 샐러드",
    description: "운동 마니아들을 위한 풍부한 불포화지방 연초록 아보카도를 짜지 않은 통참치와 라임즙, 시금치 잎과 보울 채 버무린 고영양 레저식.",
    tags: ["지중해식", "키토", "고단백", "불없는요리"],
    instructions: [
      "참치 캔의 체질 유분 기름기를 체에 완전히 정리하여 가슬 가슬 깔끔하게 보울에 투입합니다.",
      "부드럽고 달콤한 아보카도를 커팅하여 내부 씨앗을 분리한 후 일부분은 주스를 혼합해 포크로 부드럽게 무스로 으깨고 남은 부분은 큐브 입자로 반듯하게 보존합니다.",
      "자색 양파 가닥과 사근사근 토마토를 앙증맞게 입자로 커트해 둡니다.",
      "참치 살과 잘게 커트한 슬러시 입자 야채, 무스 형태와 보석 큐브형 아보카도를 고루 조합합니다.",
      "새콤 달콤한 라임과 오렌지 귤 즙을 숟가락에 가두어 올리브유와 함께 비비듯 조화롭게 시즈닝을 설계합니다.",
      "넓은 보울 바탕에 신선한 상록 시금치 잎 베이스를 평화롭게 정렬하고, 그 위에 푸짐한 영양 아보카도 참치 살들을 얹어 꿀이나 후추를 레이어링합니다."
    ]
  },
  "rec_steak_frites": {
    name: "비스토르 비프스테이크 & 바삭 프라이",
    description: "완벽하게 겉바속촉 시어링한 부드러운 안심 등심 스테이크에 고소한 갈릭 무수 허브 버터와 길쭉한 감자 칩을 매칭한 시그니처 정통 프렌치 스테이크.",
    tags: ["프렌치", "고단백", "소울푸드", "클래식"],
    instructions: [
      "오븐 레인지를 가볍게 살핀 후 온도를 가급적 200도로 준수 정렬하고, 감자 바들은 오일을 두른 채 바삭하게 베이킹해 둡니다.",
      "핏물을 청결하게 세정한 소고기 등심 고기 양면에 거친 고급 소금 무드를 충분히 뿌려 시즈닝 균형을 형성합니다.",
      "구울 무쇠 팬에 백연이 모락모락 나도록 최대 전력으로 온도를 극대화하여 고기를 올린 후 한 단면에 3분씩 전혀 만지지 않고 고밀도 껍질을 만듭니다.",
      "고기 뒤집개로 부드럽게 넘겨 마주하는 반대편을 시어링하며 버터와 향긋한 통으깬 마늘 조각들을 대량 투입합니다.",
      "무쇠 팬을 무릎 편 축으로 살짝 기울이고 스푼으로 끓는 갈릭 기 유분 버터 소스를 고기 표면에 폭포수처럼 끼얹어 촉촉하게 아로제(Arose) 작업을 2-3분 행한 뒤 접시에 안착해 레스팅합니다.",
      "고기 결의 대칭 역방향으로 1cm 도톰하게 썰어 팬에 남은 오갈릭 유분을 위에 코팅하듯 부어 감자 칩과 클래식하게 서빙합니다."
    ]
  },
  "rec_french_crepes": {
    name: "정통 파리지앵 얇은 딸기 크레이프",
    description: "비칠 정도로 얇고 부드럽게 구워진 우아한 레이스 패턴 버터 크레이프에 부드러운 생딸기와 하얀 설탕을 흩뿌려 접은 가벼운 프랑스식 브런치.",
    tags: ["프렌치", "아침식사", "디저트", "채식선호"],
    instructions: [
      "고운 박력분 밀가루 그릇에 계란과 우유, 녹인 버섯 골드빛 정제 버터를 한 꼬집 소금과 크리미하고 기포가 전혀 보이지 않는 비단 소스로 블렌딩합니다.",
      "반죽 액상의 균형 있는 입자를 위해 고운 실크 망에 5분 한 번 대기(레스팅)해 줍니다.",
      "달라붙지 않는 고성능 크레페 전용 프라잉 팬에 아주 소량의 고소한 가공 버터 조각을 흔들어 투명하게 입힙니다.",
      "잘 풀린 혼합 소스 3분의 1 컵을 부어 팬 손잡이를 들고 동서남북 기울여 0.5mm 두께로 한결같이 극도로 얇게 펼쳐 냅니다.",
      "전두 테두리가 레이스처럼 우븐 구움 색을 띠고 말려 올라가면 포크로 부드럽게 반전시켜 나머지 뒷면은 단 30초만 건조합니다.",
      "황홀한 골드빛 크레페 디저트 시트를 모서리가 딱 맞게 정삼각형 봉투 형태로 접고, 주위에 썰어낸 신선한 붉은 생딸기와 크림 혹은 설탕을 얹어 이국적으로 제공합니다."
    ]
  },
  "rec_shrimp_tacos": {
    name: "바하 마늘 라임 새우 타코",
    description: "레몬과 라임 마늘 버터에 아열대 분위기로 구운 매콤한 알새우에 깍둑 아보카도를 올린 산뜻한 지중해 해변풍 타코.",
    tags: ["멕시칸", "해산물", "스피드요리", "저녁식사"],
    instructions: [
      "손질 새우의 물기를 잡고 라임즙 원액과 소금 후추, 약간의 고춧가루 파우더를 넣어 오일에 살짝 마사지해 재워 둡니다.",
      "통 아보카도를 반 잘라 중앙 씨를 돌려 빼내어 사방 1cm 미만의 깔끔하고 정돈된 큐브 보석형 단위로 커트해 둡니다.",
      "중가마 불로 팬을 가열해 대량의 가공 버터를 녹이고 새우가 꼬이면서 영롱한 핑크빛을 올릴 때까지 단 2-3분간 정확하게 조리합니다.",
      "토르티야 번을 마른 팬에 가볍게 소독하듯 노릇하게 구워 보존합니다.",
      "도톰한 밀가루 또는 옥수수 토르티야 빵 위에 잘 구워진 분홍 바하 새우를 올리고 촉촉한 아보카도 알갱이, 체다 슬라이스 치즈를 푸짐하게 깔아 줍니다.",
      "라임 가루를 버무린 사워크림 감칠맛 혼합액을 예쁜 드리즐 선형 라인으로 지그재그 치장한 후 한 손에 맛있게 드십니다."
    ]
  },
  "rec_quinoa_salad_bowl": {
    name: "건강한 아보카도 퀴노아 샐러드 보울",
    description: "잘 삶아 오독오독 씹히는 고단백 수퍼푸드 퀴노아에 토마토, 신선한 아기 시금치, 아보카도를 라임 레몬즙 소스에 비벼 즐기는 비건 영양식.",
    tags: ["지중해식", "채식주의", "글루텐프리", "건강식"],
    instructions: [
      "퀴노아 잡곡을 깨끗한 청수로 가볍게 헹군 후 냄비에 소금 한 꼬집과 물 2컵으로 약 15분간 가열하고 포크로 가슬가슬하게 보풀을 일궈 냅니다.",
      "완숙 빨간 토마토를 깨끗이 씻어 아보카도와 동일한 사방 1.5cm 큐브 입자로 정성스레 각을 세워 제단합니다.",
      "소스용 대형 보울에 정밀하고 신선한 올리브 오일 원액과 프레쉬 레몬 필에서 착즙한 원액을 섞어 소금 한 꼬집과 소스를 만듭니다.",
      "새파란 유아용 베이비 시금치 잎과 썰어둔 보석형 토마토를 퀴노아와 따뜻할 때 합쳐 잎 무드가 따끈하게 반쯤 자글자글 유화되도록 고루 버무립니다.",
      "깍둑이처럼 균일하게 썬 연록빛 아보카도 큐브를 제일 말단 영역에 넣어 아보카도 외형이 주무르듯 뭉개지지 않게 나무 포크로 얌전하게 섞습니다.",
      "가볍게 소금 후추를 한 판 날려 영양 균형 무드를 마주하며 포크로 깊이 시식합니다."
    ]
  },
  "rec_french_toast": {
    name: "시나몬 바닐라 프렌치 토스트",
    description: "바법처럼 촉촉한 식빵을 향긋한 시나몬 바닐라 계란물에 폭 잠기게 재웠다가, 고소한 고메 버터를 두른 팬에 노릇 장식으로 구워 낸 달콤한 브런치의 바이블.",
    tags: ["프렌치", "아침식사", "소울푸드", "아이간식"],
    instructions: [
      "약간 넓고 낮은 평면 도자기에 생계란 노른자와 우유, 백설탕과 바닐라 한 꼬집, 시나몬 가루를 고운 거품기로 찰지게 섞어 줍니다.",
      "평판 널찍한 사각 팬이나 전기 그리들을 중약불 가열선 상에 지정하고 풍부한 향취의 버터 한 조각을 흔들어 녹입니다.",
      "도톰하고 부드러운 하얀 식빵 세그먼트를 넉넉하게 소스에 담가, 양면이 소스를 골고루 5초 이상 가두어 중심부까지 폭신한 우유가 침투하게 축축이 숙성합니다.",
      "계란 우유 혼합물에 퉁퉁 불은 빵을 재빠르게 건져 버터가 끓는 넓은 프라이팬 철판 위에 전개합니다.",
      "단 3-4분간 전형적인 골드 브라운 누룽지 질감과 통통한 계란 기포 오븐 팽창이 목격될 때까지 양면을 순차적으로 얌전하게 뒵집어 구워 냅니다.",
      "식탁에 바로 올려 고운 오트나 설탕 가루를 눈송이처럼 분무하고 따뜻할 때 꿀이나 연유 소스를 한껏 흘려 즉각 음미합니다."
    ]
  }
};

// Translate full recipe dynamically on the fly
export function getTranslatedRecipe(recipe: Recipe, lang: "en" | "ko"): Recipe {
  if (lang !== "ko") {
    return recipe;
  }

  const recipeId = recipe.id;
  const translation = RECIPE_TRANSLATIONS_DB[recipeId];

  // Map and translate all ingredients array
  const translatedIngredients: IngredientItem[] = recipe.allIngredients.map(ing => ({
    ...ing,
    name: translateIngredientName(ing.name),
    amount: translateAmount(ing.amount),
    category: ing.category ? (CATEGORY_TRANSLATIONS[ing.category] || ing.category) : undefined
  }));

  const translatedMatching = recipe.matchingIngredients.map(name => translateIngredientName(name));
  const translatedNeeded = recipe.additionalIngredientsNeeded.map(name => translateIngredientName(name));

  if (translation) {
    return {
      ...recipe,
      name: translation.name || recipe.name,
      description: translation.description || recipe.description,
      tags: translation.tags || recipe.tags,
      instructions: translation.instructions || recipe.instructions,
      allIngredients: translatedIngredients,
      matchingIngredients: translatedMatching,
      additionalIngredientsNeeded: translatedNeeded,
      difficulty: recipe.difficulty // Keep original state but standard labels mapped at render
    };
  }

  // Fallback if not inside hardcoded db: translate properties organically
  const fallbackInstructions = recipe.instructions.map(inst => {
    // Basic automatic word replacements for newly generated recipes
    let parsed = inst;
    Object.entries(INGREDIENT_TRANSLATIONS).forEach(([en, ko]) => {
      const reg = new RegExp(`\\b${en}\\b`, "gi");
      parsed = parsed.replace(reg, ko);
    });
    return parsed;
  });

  return {
    ...recipe,
    name: recipe.name, // Keep as returned or do clean translations
    description: recipe.description,
    allIngredients: translatedIngredients,
    matchingIngredients: translatedMatching,
    additionalIngredientsNeeded: translatedNeeded,
    instructions: fallbackInstructions
  };
}
