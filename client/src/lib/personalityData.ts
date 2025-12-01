import { 
  Sparkles, 
  Heart, 
  Zap, 
  Moon, 
  Sun, 
  Flame, 
  Leaf, 
  Star, 
  Cloud, 
  Mountain,
  Waves,
  Wind,
  Coffee,
  Music,
  Compass,
  Lightbulb,
  Shield,
  Feather,
  Crown,
  Gem
} from "lucide-react";

export interface PersonalityTrait {
  id: string;
  name: string;
  icon: typeof Sparkles;
  color: string;
}

export const personalityTraits: PersonalityTrait[] = [
  { id: "creative", name: "Creative", icon: Sparkles, color: "#D4AF37" },
  { id: "empathetic", name: "Empathetic", icon: Heart, color: "#E57373" },
  { id: "energetic", name: "Energetic", icon: Zap, color: "#FFB74D" },
  { id: "mysterious", name: "Mysterious", icon: Moon, color: "#7E57C2" },
  { id: "optimistic", name: "Optimistic", icon: Sun, color: "#FDD835" },
  { id: "passionate", name: "Passionate", icon: Flame, color: "#FF7043" },
  { id: "grounded", name: "Grounded", icon: Leaf, color: "#66BB6A" },
  { id: "ambitious", name: "Ambitious", icon: Star, color: "#D4AF37" },
  { id: "dreamy", name: "Dreamy", icon: Cloud, color: "#90CAF9" },
  { id: "resilient", name: "Resilient", icon: Mountain, color: "#8D6E63" },
  { id: "adaptable", name: "Adaptable", icon: Waves, color: "#4FC3F7" },
  { id: "free-spirited", name: "Free-Spirited", icon: Wind, color: "#81D4FA" },
  { id: "sophisticated", name: "Sophisticated", icon: Coffee, color: "#8B4513" },
  { id: "expressive", name: "Expressive", icon: Music, color: "#BA68C8" },
  { id: "adventurous", name: "Adventurous", icon: Compass, color: "#26A69A" },
  { id: "innovative", name: "Innovative", icon: Lightbulb, color: "#FFEE58" },
  { id: "loyal", name: "Loyal", icon: Shield, color: "#5C6BC0" },
  { id: "gentle", name: "Gentle", icon: Feather, color: "#F8BBD9" },
  { id: "confident", name: "Confident", icon: Crown, color: "#D4AF37" },
  { id: "authentic", name: "Authentic", icon: Gem, color: "#4DD0E1" },
];
