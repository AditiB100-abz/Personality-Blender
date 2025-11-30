import type { PersonalityTrait } from "./personalityData";

import starlightMochaImg from "@assets/generated_images/starlight_mocha_coffee_drink.png";
import velvetSunriseImg from "@assets/generated_images/velvet_sunrise_tea_drink.png";
import midnightBloomImg from "@assets/generated_images/midnight_bloom_berry_drink.png";
import goldenHourImg from "@assets/generated_images/golden_hour_turmeric_latte.png";
import forestWhisperImg from "@assets/generated_images/forest_whisper_matcha_drink.png";
import oceanBreezeImg from "@assets/generated_images/ocean_breeze_blue_refresher.png";
import emberChaiImg from "@assets/generated_images/ember_chai_spiced_latte.png";
import cloudNineImg from "@assets/generated_images/cloud_nine_vanilla_frappe.png";
import sageSerenityImg from "@assets/generated_images/sage_serenity_herbal_tea.png";
import royalVelvetImg from "@assets/generated_images/royal_velvet_red_drink.png";

export interface FlavorProfile {
  temperature: "Iced" | "Warm" | "Hot" | "Frozen";
  sweetness: "Unsweetened" | "Lightly Sweet" | "Balanced" | "Sweet" | "Decadent";
  intensity: "Delicate" | "Mild" | "Medium" | "Bold" | "Intense";
  notes: string[];
}

export interface DrinkResult {
  drinkName: string;
  description: string;
  flavorProfile: FlavorProfile;
  whyMatch: string;
  gradientColors: string[];
  image: string;
}

const drinkTemplates = [
  {
    name: "Starlight Mocha",
    temperatures: ["Iced", "Hot"] as const,
    sweetness: ["Balanced", "Sweet"] as const,
    intensity: ["Medium", "Bold"] as const,
    baseNotes: ["dark chocolate", "espresso", "vanilla bean"],
    gradients: ["#2C1810", "#8B4513", "#D4AF37"],
    image: starlightMochaImg,
  },
  {
    name: "Velvet Sunrise",
    temperatures: ["Warm", "Hot"] as const,
    sweetness: ["Lightly Sweet", "Balanced"] as const,
    intensity: ["Mild", "Medium"] as const,
    baseNotes: ["honey", "chamomile", "citrus zest"],
    gradients: ["#FFB347", "#FF7F50", "#FF6B6B"],
    image: velvetSunriseImg,
  },
  {
    name: "Midnight Bloom",
    temperatures: ["Iced", "Frozen"] as const,
    sweetness: ["Balanced", "Decadent"] as const,
    intensity: ["Bold", "Intense"] as const,
    baseNotes: ["lavender", "blueberry", "dark berry"],
    gradients: ["#4A148C", "#7B1FA2", "#9C27B0"],
    image: midnightBloomImg,
  },
  {
    name: "Golden Hour Latte",
    temperatures: ["Warm", "Iced"] as const,
    sweetness: ["Sweet", "Balanced"] as const,
    intensity: ["Medium", "Mild"] as const,
    baseNotes: ["turmeric", "oat milk", "cinnamon"],
    gradients: ["#D4AF37", "#F5DEB3", "#FFE4B5"],
    image: goldenHourImg,
  },
  {
    name: "Forest Whisper",
    temperatures: ["Hot", "Warm"] as const,
    sweetness: ["Unsweetened", "Lightly Sweet"] as const,
    intensity: ["Delicate", "Mild"] as const,
    baseNotes: ["matcha", "pine", "eucalyptus"],
    gradients: ["#1B5E20", "#2E7D32", "#4CAF50"],
    image: forestWhisperImg,
  },
  {
    name: "Ocean Breeze Refresher",
    temperatures: ["Iced", "Frozen"] as const,
    sweetness: ["Lightly Sweet", "Balanced"] as const,
    intensity: ["Delicate", "Medium"] as const,
    baseNotes: ["coconut", "blue spirulina", "lime"],
    gradients: ["#00BCD4", "#4DD0E1", "#80DEEA"],
    image: oceanBreezeImg,
  },
  {
    name: "Ember Chai",
    temperatures: ["Hot", "Warm"] as const,
    sweetness: ["Sweet", "Balanced"] as const,
    intensity: ["Bold", "Intense"] as const,
    baseNotes: ["cardamom", "ginger", "black pepper"],
    gradients: ["#BF360C", "#E64A19", "#FF5722"],
    image: emberChaiImg,
  },
  {
    name: "Cloud Nine Frappe",
    temperatures: ["Frozen", "Iced"] as const,
    sweetness: ["Decadent", "Sweet"] as const,
    intensity: ["Mild", "Medium"] as const,
    baseNotes: ["marshmallow", "vanilla cloud", "whipped cream"],
    gradients: ["#ECEFF1", "#B0BEC5", "#90A4AE"],
    image: cloudNineImg,
  },
  {
    name: "Sage Serenity",
    temperatures: ["Warm", "Hot"] as const,
    sweetness: ["Unsweetened", "Lightly Sweet"] as const,
    intensity: ["Delicate", "Mild"] as const,
    baseNotes: ["sage", "honey", "white tea"],
    gradients: ["#AED581", "#8BC34A", "#689F38"],
    image: sageSerenityImg,
  },
  {
    name: "Royal Velvet",
    temperatures: ["Hot", "Iced"] as const,
    sweetness: ["Balanced", "Sweet"] as const,
    intensity: ["Medium", "Bold"] as const,
    baseNotes: ["red velvet", "cream cheese", "cocoa"],
    gradients: ["#C62828", "#D32F2F", "#E53935"],
    image: royalVelvetImg,
  },
];

const traitDescriptions: Record<string, string> = {
  creative: "sparks of inspiration and artistic flair",
  empathetic: "warmth and emotional depth",
  energetic: "vibrant bursts of vitality",
  mysterious: "intriguing layers of complexity",
  optimistic: "bright notes of hope and positivity",
  passionate: "intense flames of dedication",
  grounded: "earthy stability and balance",
  ambitious: "bold aspirations and drive",
  dreamy: "ethereal softness and imagination",
  resilient: "unwavering strength and determination",
  adaptable: "fluid versatility and grace",
  "free-spirited": "refreshing winds of freedom",
  sophisticated: "refined elegance and depth",
  expressive: "colorful bursts of emotion",
  adventurous: "exciting notes of exploration",
  innovative: "sparks of creative genius",
  loyal: "steadfast layers of trust",
  gentle: "delicate whispers of tenderness",
  confident: "bold strokes of self-assurance",
  authentic: "genuine notes of truth",
};

export function generateDrink(selectedTraits: PersonalityTrait[]): DrinkResult {
  const templateIndex = selectedTraits.reduce((acc, trait) => acc + trait.id.charCodeAt(0), 0) % drinkTemplates.length;
  const template = drinkTemplates[templateIndex];

  const additionalNotes = selectedTraits
    .slice(0, 2)
    .map(t => t.name.toLowerCase())
    .map(name => {
      const noteMap: Record<string, string> = {
        creative: "artistic swirl",
        empathetic: "heart-warming essence",
        energetic: "citrus spark",
        mysterious: "midnight spice",
        optimistic: "sunny honey",
        passionate: "fiery kick",
        grounded: "roasted earth",
        ambitious: "golden shimmer",
        dreamy: "cloud foam",
        resilient: "iron brew",
        adaptable: "chameleon blend",
        "free-spirited": "wild mint",
        sophisticated: "aged oak",
        expressive: "rainbow drizzle",
        adventurous: "exotic spice",
        innovative: "effervescent pop",
        loyal: "trusted vanilla",
        gentle: "soft petal",
        confident: "bold espresso",
        authentic: "pure essence",
      };
      return noteMap[name] || name;
    });

  const traitExplanations = selectedTraits
    .map(t => traitDescriptions[t.id] || t.name.toLowerCase())
    .join(", ");

  const whyMatch = `Your unique blend of ${selectedTraits.map(t => t.name).join(", ")} creates a harmonious fusion of ${traitExplanations}. This drink captures your essence perfectly - each sip reveals another layer of your multifaceted personality, from the first aromatic notes to the lingering finish.`;

  return {
    drinkName: template.name,
    description: `A ${template.temperatures[0].toLowerCase()} masterpiece crafted for souls who embody ${selectedTraits.slice(0, 2).map(t => t.name.toLowerCase()).join(" and ")}. This ${template.intensity[0].toLowerCase()} blend offers a ${template.sweetness[0].toLowerCase()} experience that evolves with every sip.`,
    flavorProfile: {
      temperature: template.temperatures[Math.floor(Math.random() * template.temperatures.length)],
      sweetness: template.sweetness[Math.floor(Math.random() * template.sweetness.length)],
      intensity: template.intensity[Math.floor(Math.random() * template.intensity.length)],
      notes: [...template.baseNotes, ...additionalNotes],
    },
    whyMatch,
    gradientColors: template.gradients,
    image: template.image,
  };
}
