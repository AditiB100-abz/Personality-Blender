import ResultCard from "../ResultCard";
import type { DrinkResult } from "@/lib/drinkGenerator";
import starlightMochaImg from "@assets/generated_images/iced_starlight_mocha_drink.png";

const mockResult: DrinkResult = {
  drinkName: "Starlight Mocha",
  description: "An iced masterpiece crafted for souls who embody creative and empathetic. This bold blend offers a balanced experience that evolves with every sip.",
  flavorProfile: {
    temperature: "Iced",
    sweetness: "Balanced",
    intensity: "Bold",
    notes: ["dark chocolate", "espresso", "vanilla bean", "artistic swirl", "heart-warming essence"],
  },
  whyMatch: "Your unique blend of Creative, Empathetic, Energetic, and Mysterious creates a harmonious fusion of sparks of inspiration and artistic flair, warmth and emotional depth, vibrant bursts of vitality, intriguing layers of complexity. This drink captures your essence perfectly - each sip reveals another layer of your multifaceted personality.",
  gradientColors: ["#2C1810", "#8B4513", "#D4AF37"],
  image: starlightMochaImg,
};

export default function ResultCardExample() {
  return (
    <div className="p-6 bg-background">
      <ResultCard result={mockResult} onBlendAgain={() => console.log("Blend again clicked")} />
    </div>
  );
}
