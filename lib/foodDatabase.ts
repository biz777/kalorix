// lib/foodDatabase.ts
// Kalorix — Bibliothèque Cuisines du Monde
// ~61 plats · calories pour portion standard · trilingue FR/EN/ES

export interface LocalFood {
  id: string;
  cuisine: "us" | "ca" | "ma" | "fr" | "it" | "mx" | "jp";
  name: { fr: string; en: string; es: string };
  calories: number;       // kcal pour la portion indiquée
  portion: { fr: string; en: string; es: string }; // ex: "1 burger", "300g"
  portionGrams: number;   // poids de référence en grammes
}

export const foodDatabase: LocalFood[] = [

  // ────────────────────────────────────────────
  // 🇺🇸 AMÉRICAINE (~15 plats)
  // ────────────────────────────────────────────
  {
    id: "us-01",
    cuisine: "us",
    name: { fr: "Cheeseburger classique", en: "Classic Cheeseburger", es: "Hamburguesa con queso" },
    calories: 540,
    portion: { fr: "1 burger", en: "1 burger", es: "1 hamburguesa" },
    portionGrams: 200,
  },
  {
    id: "us-02",
    cuisine: "us",
    name: { fr: "Hot-dog avec pain", en: "Hot Dog with Bun", es: "Hot Dog con pan" },
    calories: 290,
    portion: { fr: "1 hot-dog", en: "1 hot dog", es: "1 hot dog" },
    portionGrams: 130,
  },
  {
    id: "us-03",
    cuisine: "us",
    name: { fr: "Mac & Cheese", en: "Mac & Cheese", es: "Mac & Cheese" },
    calories: 420,
    portion: { fr: "1 portion (250g)", en: "1 serving (250g)", es: "1 porción (250g)" },
    portionGrams: 250,
  },
  {
    id: "us-04",
    cuisine: "us",
    name: { fr: "Pancakes (x3) avec sirop", en: "Pancakes (x3) with Syrup", es: "Panqueques (x3) con jarabe" },
    calories: 520,
    portion: { fr: "3 pancakes", en: "3 pancakes", es: "3 panqueques" },
    portionGrams: 220,
  },
  {
    id: "us-05",
    cuisine: "us",
    name: { fr: "Caesar Salad", en: "Caesar Salad", es: "Ensalada César" },
    calories: 310,
    portion: { fr: "1 bol (300g)", en: "1 bowl (300g)", es: "1 tazón (300g)" },
    portionGrams: 300,
  },
  {
    id: "us-06",
    cuisine: "us",
    name: { fr: "Buffalo Wings (6 pièces)", en: "Buffalo Wings (6 pieces)", es: "Alitas Buffalo (6 piezas)" },
    calories: 480,
    portion: { fr: "6 ailes", en: "6 wings", es: "6 alitas" },
    portionGrams: 240,
  },
  {
    id: "us-07",
    cuisine: "us",
    name: { fr: "Grilled Cheese Sandwich", en: "Grilled Cheese Sandwich", es: "Sándwich de queso fundido" },
    calories: 390,
    portion: { fr: "1 sandwich", en: "1 sandwich", es: "1 sándwich" },
    portionGrams: 170,
  },
  {
    id: "us-08",
    cuisine: "us",
    name: { fr: "BBQ Ribs", en: "BBQ Ribs", es: "Costillas BBQ" },
    calories: 620,
    portion: { fr: "1 portion (300g)", en: "1 serving (300g)", es: "1 porción (300g)" },
    portionGrams: 300,
  },
  {
    id: "us-09",
    cuisine: "us",
    name: { fr: "Club Sandwich", en: "Club Sandwich", es: "Club Sándwich" },
    calories: 560,
    portion: { fr: "1 sandwich", en: "1 sandwich", es: "1 sándwich" },
    portionGrams: 280,
  },
  {
    id: "us-10",
    cuisine: "us",
    name: { fr: "Cheesecake", en: "Cheesecake", es: "Cheesecake" },
    calories: 400,
    portion: { fr: "1 part (125g)", en: "1 slice (125g)", es: "1 rebanada (125g)" },
    portionGrams: 125,
  },
  {
    id: "us-11",
    cuisine: "us",
    name: { fr: "Omelette 3 œufs", en: "3-Egg Omelette", es: "Tortilla de 3 huevos" },
    calories: 310,
    portion: { fr: "1 omelette", en: "1 omelette", es: "1 tortilla" },
    portionGrams: 200,
  },
  {
    id: "us-12",
    cuisine: "us",
    name: { fr: "Soupe de tomates", en: "Tomato Soup", es: "Sopa de tomate" },
    calories: 180,
    portion: { fr: "1 bol (300ml)", en: "1 bowl (300ml)", es: "1 tazón (300ml)" },
    portionGrams: 300,
  },
  {
    id: "us-13",
    cuisine: "us",
    name: { fr: "BLT Sandwich", en: "BLT Sandwich", es: "Sándwich BLT" },
    calories: 440,
    portion: { fr: "1 sandwich", en: "1 sandwich", es: "1 sándwich" },
    portionGrams: 220,
  },
  {
    id: "us-14",
    cuisine: "us",
    name: { fr: "Cookies aux pépites de chocolat (x2)", en: "Chocolate Chip Cookies (x2)", es: "Galletas con chispas de chocolate (x2)" },
    calories: 280,
    portion: { fr: "2 cookies", en: "2 cookies", es: "2 galletas" },
    portionGrams: 80,
  },
  {
    id: "us-15",
    cuisine: "us",
    name: { fr: "French Fries (portion moyenne)", en: "French Fries (medium)", es: "Papas fritas (mediana)" },
    calories: 365,
    portion: { fr: "1 portion moyenne", en: "1 medium serving", es: "1 porción mediana" },
    portionGrams: 170,
  },

  // ────────────────────────────────────────────
  // 🇨🇦 CANADIENNE (~8 plats)
  // ────────────────────────────────────────────
  {
    id: "ca-01",
    cuisine: "ca",
    name: { fr: "Poutine classique", en: "Classic Poutine", es: "Poutine clásica" },
    calories: 740,
    portion: { fr: "1 portion (400g)", en: "1 serving (400g)", es: "1 porción (400g)" },
    portionGrams: 400,
  },
  {
    id: "ca-02",
    cuisine: "ca",
    name: { fr: "Tourtière (part)", en: "Tourtière (slice)", es: "Tourtière (porción)" },
    calories: 430,
    portion: { fr: "1 part", en: "1 slice", es: "1 porción" },
    portionGrams: 200,
  },
  {
    id: "ca-03",
    cuisine: "ca",
    name: { fr: "Sirop d'érable sur crêpes (x2)", en: "Maple Syrup Crêpes (x2)", es: "Crêpes con sirope de arce (x2)" },
    calories: 460,
    portion: { fr: "2 crêpes", en: "2 crêpes", es: "2 crêpes" },
    portionGrams: 200,
  },
  {
    id: "ca-04",
    cuisine: "ca",
    name: { fr: "Soupe aux pois canadienne", en: "Canadian Pea Soup", es: "Sopa de guisantes canadiense" },
    calories: 220,
    portion: { fr: "1 bol (300ml)", en: "1 bowl (300ml)", es: "1 tazón (300ml)" },
    portionGrams: 300,
  },
  {
    id: "ca-05",
    cuisine: "ca",
    name: { fr: "Butter Tart", en: "Butter Tart", es: "Tarta de mantequilla" },
    calories: 250,
    portion: { fr: "1 tarte", en: "1 tart", es: "1 tarta" },
    portionGrams: 75,
  },
  {
    id: "ca-06",
    cuisine: "ca",
    name: { fr: "Bannique (pain autochtone)", en: "Bannock (Indigenous Bread)", es: "Bannock (pan indígena)" },
    calories: 310,
    portion: { fr: "1 part (100g)", en: "1 piece (100g)", es: "1 trozo (100g)" },
    portionGrams: 100,
  },
  {
    id: "ca-07",
    cuisine: "ca",
    name: { fr: "Saumon de l'Atlantique grillé", en: "Grilled Atlantic Salmon", es: "Salmón atlántico a la plancha" },
    calories: 350,
    portion: { fr: "1 filet (200g)", en: "1 fillet (200g)", es: "1 filete (200g)" },
    portionGrams: 200,
  },
  {
    id: "ca-08",
    cuisine: "ca",
    name: { fr: "Nanaimo Bar", en: "Nanaimo Bar", es: "Barra Nanaimo" },
    calories: 330,
    portion: { fr: "1 barre", en: "1 bar", es: "1 barra" },
    portionGrams: 90,
  },

  // ────────────────────────────────────────────
  // 🇲🇦 MAROCAINE (~8 plats)
  // ────────────────────────────────────────────
  {
    id: "ma-01",
    cuisine: "ma",
    name: { fr: "Tajine poulet-olives", en: "Chicken & Olive Tagine", es: "Tajín de pollo con aceitunas" },
    calories: 480,
    portion: { fr: "1 portion (350g)", en: "1 serving (350g)", es: "1 porción (350g)" },
    portionGrams: 350,
  },
  {
    id: "ma-02",
    cuisine: "ma",
    name: { fr: "Couscous royal (agneau + légumes)", en: "Royal Couscous (lamb + veg)", es: "Cuscús real (cordero + verduras)" },
    calories: 620,
    portion: { fr: "1 assiette (400g)", en: "1 plate (400g)", es: "1 plato (400g)" },
    portionGrams: 400,
  },
  {
    id: "ma-03",
    cuisine: "ma",
    name: { fr: "Harira (soupe)", en: "Harira Soup", es: "Sopa Harira" },
    calories: 210,
    portion: { fr: "1 bol (350ml)", en: "1 bowl (350ml)", es: "1 tazón (350ml)" },
    portionGrams: 350,
  },
  {
    id: "ma-04",
    cuisine: "ma",
    name: { fr: "Briouates au fromage (x4)", en: "Cheese Briouats (x4)", es: "Briouats de queso (x4)" },
    calories: 320,
    portion: { fr: "4 pièces", en: "4 pieces", es: "4 piezas" },
    portionGrams: 160,
  },
  {
    id: "ma-05",
    cuisine: "ma",
    name: { fr: "Pastilla au poulet (part)", en: "Chicken Pastilla (slice)", es: "Pastilla de pollo (porción)" },
    calories: 510,
    portion: { fr: "1 part", en: "1 slice", es: "1 porción" },
    portionGrams: 220,
  },
  {
    id: "ma-06",
    cuisine: "ma",
    name: { fr: "Msemen (crêpe feuilletée, x2)", en: "Msemen (layered pancake, x2)", es: "Msemen (crepe hojaldrada, x2)" },
    calories: 380,
    portion: { fr: "2 pièces", en: "2 pieces", es: "2 piezas" },
    portionGrams: 160,
  },
  {
    id: "ma-07",
    cuisine: "ma",
    name: { fr: "Mechoui (agneau rôti)", en: "Mechoui (roasted lamb)", es: "Mechoui (cordero asado)" },
    calories: 540,
    portion: { fr: "1 portion (250g)", en: "1 serving (250g)", es: "1 porción (250g)" },
    portionGrams: 250,
  },
  {
    id: "ma-08",
    cuisine: "ma",
    name: { fr: "Chebakia (gâteau miel-sésame)", en: "Chebakia (honey-sesame cookie)", es: "Chebakia (galleta de miel y sésamo)" },
    calories: 180,
    portion: { fr: "1 pièce", en: "1 piece", es: "1 pieza" },
    portionGrams: 50,
  },

  // ────────────────────────────────────────────
  // 🇫🇷 FRANÇAISE (~8 plats)
  // ────────────────────────────────────────────
  {
    id: "fr-01",
    cuisine: "fr",
    name: { fr: "Quiche Lorraine (part)", en: "Quiche Lorraine (slice)", es: "Quiche Lorraine (porción)" },
    calories: 420,
    portion: { fr: "1 part", en: "1 slice", es: "1 porción" },
    portionGrams: 180,
  },
  {
    id: "fr-02",
    cuisine: "fr",
    name: { fr: "Croque-monsieur", en: "Croque-Monsieur", es: "Croque-monsieur" },
    calories: 430,
    portion: { fr: "1 sandwich", en: "1 sandwich", es: "1 sándwich" },
    portionGrams: 200,
  },
  {
    id: "fr-03",
    cuisine: "fr",
    name: { fr: "Soupe à l'oignon", en: "French Onion Soup", es: "Sopa de cebolla francesa" },
    calories: 280,
    portion: { fr: "1 bol (350ml)", en: "1 bowl (350ml)", es: "1 tazón (350ml)" },
    portionGrams: 350,
  },
  {
    id: "fr-04",
    cuisine: "fr",
    name: { fr: "Bœuf Bourguignon", en: "Beef Bourguignon", es: "Buey Borgoña" },
    calories: 490,
    portion: { fr: "1 assiette (300g)", en: "1 plate (300g)", es: "1 plato (300g)" },
    portionGrams: 300,
  },
  {
    id: "fr-05",
    cuisine: "fr",
    name: { fr: "Ratatouille", en: "Ratatouille", es: "Ratatouille" },
    calories: 180,
    portion: { fr: "1 assiette (300g)", en: "1 plate (300g)", es: "1 plato (300g)" },
    portionGrams: 300,
  },
  {
    id: "fr-06",
    cuisine: "fr",
    name: { fr: "Croissant beurre", en: "Butter Croissant", es: "Croissant de mantequilla" },
    calories: 270,
    portion: { fr: "1 croissant", en: "1 croissant", es: "1 croissant" },
    portionGrams: 80,
  },
  {
    id: "fr-07",
    cuisine: "fr",
    name: { fr: "Tarte Tatin (part)", en: "Tarte Tatin (slice)", es: "Tarta Tatin (porción)" },
    calories: 350,
    portion: { fr: "1 part", en: "1 slice", es: "1 porción" },
    portionGrams: 150,
  },
  {
    id: "fr-08",
    cuisine: "fr",
    name: { fr: "Crêpe Suzette", en: "Crêpe Suzette", es: "Crêpe Suzette" },
    calories: 290,
    portion: { fr: "2 crêpes", en: "2 crêpes", es: "2 crêpes" },
    portionGrams: 150,
  },

  // ────────────────────────────────────────────
  // 🇮🇹 ITALIENNE (~8 plats)
  // ────────────────────────────────────────────
  {
    id: "it-01",
    cuisine: "it",
    name: { fr: "Spaghetti Bolognaise", en: "Spaghetti Bolognese", es: "Espaguetis a la boloñesa" },
    calories: 550,
    portion: { fr: "1 assiette (350g)", en: "1 plate (350g)", es: "1 plato (350g)" },
    portionGrams: 350,
  },
  {
    id: "it-02",
    cuisine: "it",
    name: { fr: "Pizza Margherita (2 parts)", en: "Margherita Pizza (2 slices)", es: "Pizza Margarita (2 porciones)" },
    calories: 500,
    portion: { fr: "2 parts", en: "2 slices", es: "2 porciones" },
    portionGrams: 260,
  },
  {
    id: "it-03",
    cuisine: "it",
    name: { fr: "Risotto aux champignons", en: "Mushroom Risotto", es: "Risotto de champiñones" },
    calories: 430,
    portion: { fr: "1 assiette (300g)", en: "1 plate (300g)", es: "1 plato (300g)" },
    portionGrams: 300,
  },
  {
    id: "it-04",
    cuisine: "it",
    name: { fr: "Lasagnes (part)", en: "Lasagna (serving)", es: "Lasaña (porción)" },
    calories: 490,
    portion: { fr: "1 part", en: "1 serving", es: "1 porción" },
    portionGrams: 280,
  },
  {
    id: "it-05",
    cuisine: "it",
    name: { fr: "Tiramisu", en: "Tiramisu", es: "Tiramisú" },
    calories: 370,
    portion: { fr: "1 part (150g)", en: "1 serving (150g)", es: "1 porción (150g)" },
    portionGrams: 150,
  },
  {
    id: "it-06",
    cuisine: "it",
    name: { fr: "Bruschetta (x2)", en: "Bruschetta (x2)", es: "Bruschetta (x2)" },
    calories: 220,
    portion: { fr: "2 pièces", en: "2 pieces", es: "2 piezas" },
    portionGrams: 120,
  },
  {
    id: "it-07",
    cuisine: "it",
    name: { fr: "Osso Buco", en: "Osso Buco", es: "Osobuco" },
    calories: 520,
    portion: { fr: "1 portion (300g)", en: "1 serving (300g)", es: "1 porción (300g)" },
    portionGrams: 300,
  },
  {
    id: "it-08",
    cuisine: "it",
    name: { fr: "Panna Cotta", en: "Panna Cotta", es: "Panna Cotta" },
    calories: 280,
    portion: { fr: "1 verrine (150g)", en: "1 serving (150g)", es: "1 porción (150g)" },
    portionGrams: 150,
  },

  // ────────────────────────────────────────────
  // 🇲🇽 MEXICAINE (~8 plats)
  // ────────────────────────────────────────────
  {
    id: "mx-01",
    cuisine: "mx",
    name: { fr: "Tacos al Pastor (x3)", en: "Tacos al Pastor (x3)", es: "Tacos al Pastor (x3)" },
    calories: 480,
    portion: { fr: "3 tacos", en: "3 tacos", es: "3 tacos" },
    portionGrams: 270,
  },
  {
    id: "mx-02",
    cuisine: "mx",
    name: { fr: "Burrito au poulet", en: "Chicken Burrito", es: "Burrito de pollo" },
    calories: 550,
    portion: { fr: "1 burrito", en: "1 burrito", es: "1 burrito" },
    portionGrams: 300,
  },
  {
    id: "mx-03",
    cuisine: "mx",
    name: { fr: "Guacamole + tortillas chips", en: "Guacamole + Tortilla Chips", es: "Guacamole + totopos" },
    calories: 340,
    portion: { fr: "1 portion (200g)", en: "1 serving (200g)", es: "1 porción (200g)" },
    portionGrams: 200,
  },
  {
    id: "mx-04",
    cuisine: "mx",
    name: { fr: "Enchiladas au poulet (x2)", en: "Chicken Enchiladas (x2)", es: "Enchiladas de pollo (x2)" },
    calories: 490,
    portion: { fr: "2 enchiladas", en: "2 enchiladas", es: "2 enchiladas" },
    portionGrams: 280,
  },
  {
    id: "mx-05",
    cuisine: "mx",
    name: { fr: "Quesadilla fromage", en: "Cheese Quesadilla", es: "Quesadilla de queso" },
    calories: 400,
    portion: { fr: "1 quesadilla", en: "1 quesadilla", es: "1 quesadilla" },
    portionGrams: 200,
  },
  {
    id: "mx-06",
    cuisine: "mx",
    name: { fr: "Tamales (x2)", en: "Tamales (x2)", es: "Tamales (x2)" },
    calories: 420,
    portion: { fr: "2 tamales", en: "2 tamales", es: "2 tamales" },
    portionGrams: 220,
  },
  {
    id: "mx-07",
    cuisine: "mx",
    name: { fr: "Pozole (soupe)", en: "Pozole Soup", es: "Pozole" },
    calories: 300,
    portion: { fr: "1 bol (400ml)", en: "1 bowl (400ml)", es: "1 tazón (400ml)" },
    portionGrams: 400,
  },
  {
    id: "mx-08",
    cuisine: "mx",
    name: { fr: "Churros (x3)", en: "Churros (x3)", es: "Churros (x3)" },
    calories: 310,
    portion: { fr: "3 churros", en: "3 churros", es: "3 churros" },
    portionGrams: 120,
  },

  // ────────────────────────────────────────────
  // 🇯🇵 JAPONAISE (~6 plats)
  // ────────────────────────────────────────────
  {
    id: "jp-01",
    cuisine: "jp",
    name: { fr: "Sushi assortis (8 pièces)", en: "Assorted Sushi (8 pieces)", es: "Sushi variado (8 piezas)" },
    calories: 340,
    portion: { fr: "8 pièces", en: "8 pieces", es: "8 piezas" },
    portionGrams: 240,
  },
  {
    id: "jp-02",
    cuisine: "jp",
    name: { fr: "Ramen au poulet", en: "Chicken Ramen", es: "Ramen de pollo" },
    calories: 490,
    portion: { fr: "1 bol (400ml)", en: "1 bowl (400ml)", es: "1 tazón (400ml)" },
    portionGrams: 400,
  },
  {
    id: "jp-03",
    cuisine: "jp",
    name: { fr: "Gyozas frits (x6)", en: "Pan-Fried Gyoza (x6)", es: "Gyoza fritos (x6)" },
    calories: 330,
    portion: { fr: "6 pièces", en: "6 pieces", es: "6 piezas" },
    portionGrams: 180,
  },
  {
    id: "jp-04",
    cuisine: "jp",
    name: { fr: "Tempura de crevettes (x5)", en: "Shrimp Tempura (x5)", es: "Tempura de gambas (x5)" },
    calories: 380,
    portion: { fr: "5 pièces", en: "5 pieces", es: "5 piezas" },
    portionGrams: 200,
  },
  {
    id: "jp-05",
    cuisine: "jp",
    name: { fr: "Onigiri (x2)", en: "Onigiri (x2)", es: "Onigiri (x2)" },
    calories: 280,
    portion: { fr: "2 onigiri", en: "2 onigiri", es: "2 onigiri" },
    portionGrams: 200,
  },
  {
    id: "jp-06",
    cuisine: "jp",
    name: { fr: "Miso Soupe + riz blanc", en: "Miso Soup + Steamed Rice", es: "Sopa miso + arroz blanco" },
    calories: 290,
    portion: { fr: "1 bol soupe + 150g riz", en: "1 bowl soup + 150g rice", es: "1 tazón sopa + 150g arroz" },
    portionGrams: 350,
  },
];

// ────────────────────────────────────────────
// HELPERS
// ────────────────────────────────────────────

export type Lang = "fr" | "en" | "es";

/** Recherche dans la bibliothèque locale (insensible à la casse, accents). */
export function searchLocalFoods(query: string, lang: Lang): LocalFood[] {
  if (!query || query.trim().length < 2) return [];

  const normalize = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const q = normalize(query.trim());

  return foodDatabase.filter((food) => normalize(food.name[lang]).includes(q));
}

/** Retourne tous les plats d'une cuisine donnée. */
export function getFoodsByCuisine(cuisine: LocalFood["cuisine"]): LocalFood[] {
  return foodDatabase.filter((f) => f.cuisine === cuisine);
}

/** Map emoji drapeaux */
export const cuisineFlags: Record<LocalFood["cuisine"], string> = {
  us: "🇺🇸",
  ca: "🇨🇦",
  ma: "🇲🇦",
  fr: "🇫🇷",
  it: "🇮🇹",
  mx: "🇲🇽",
  jp: "🇯🇵",
};

/** Labels traduits pour les filtres par cuisine */
export const cuisineLabels: Record<LocalFood["cuisine"], Record<Lang, string>> = {
  us: { fr: "Américaine", en: "American", es: "Americana" },
  ca: { fr: "Canadienne", en: "Canadian", es: "Canadiense" },
  ma: { fr: "Marocaine", en: "Moroccan", es: "Marroquí" },
  fr: { fr: "Française", en: "French", es: "Francesa" },
  it: { fr: "Italienne", en: "Italian", es: "Italiana" },
  mx: { fr: "Mexicaine", en: "Mexican", es: "Mexicana" },
  jp: { fr: "Japonaise", en: "Japanese", es: "Japonesa" },
};
