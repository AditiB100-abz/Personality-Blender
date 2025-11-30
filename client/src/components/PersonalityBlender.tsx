import { useState } from "react";
import { Button } from "@/components/ui/button";
import HomeScreen from "./HomeScreen";
import TraitCard from "./TraitCard";
import BlenderContainer from "./BlenderContainer";
import ResultCard from "./ResultCard";
import { personalityTraits, type PersonalityTrait } from "@/lib/personalityData";
import { generateDrink, type DrinkResult } from "@/lib/drinkGenerator";
import { ArrowLeft, Coffee } from "lucide-react";

type AppScreen = "home" | "blend" | "result";

export default function PersonalityBlender() {
  const [screen, setScreen] = useState<AppScreen>("home");
  const [selectedTraits, setSelectedTraits] = useState<PersonalityTrait[]>([]);
  const [isBlending, setIsBlending] = useState(false);
  const [drinkResult, setDrinkResult] = useState<DrinkResult | null>(null);

  const handleStart = () => {
    setScreen("blend");
    setSelectedTraits([]);
    setDrinkResult(null);
  };

  const handleSelectTrait = (trait: PersonalityTrait) => {
    if (selectedTraits.find((t) => t.id === trait.id)) {
      setSelectedTraits((prev) => prev.filter((t) => t.id !== trait.id));
    } else if (selectedTraits.length < 5) {
      setSelectedTraits((prev) => [...prev, trait]);
    }
  };

  const handleRemoveTrait = (trait: PersonalityTrait) => {
    setSelectedTraits((prev) => prev.filter((t) => t.id !== trait.id));
  };

  const handleDrop = (traitId: string) => {
    const trait = personalityTraits.find((t) => t.id === traitId);
    if (trait && !selectedTraits.find((t) => t.id === traitId) && selectedTraits.length < 5) {
      setSelectedTraits((prev) => [...prev, trait]);
    }
  };

  const handleBlend = () => {
    setIsBlending(true);
    setTimeout(() => {
      const result = generateDrink(selectedTraits);
      setDrinkResult(result);
      setIsBlending(false);
      setScreen("result");
    }, 1500);
  };

  const handleBlendAgain = () => {
    setScreen("blend");
    setSelectedTraits([]);
    setDrinkResult(null);
  };

  const handleBackToHome = () => {
    setScreen("home");
    setSelectedTraits([]);
    setDrinkResult(null);
  };

  if (screen === "home") {
    return <HomeScreen onStart={handleStart} />;
  }

  if (screen === "result" && drinkResult) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              onClick={handleBackToHome}
              className="font-['Montserrat']"
              data-testid="button-home"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Home
            </Button>
            <div className="flex items-center gap-2">
              <Coffee className="w-5 h-5 text-primary" />
              <span className="font-['Montserrat'] font-semibold text-foreground">
                Your Drink
              </span>
            </div>
          </div>
          <ResultCard result={drinkResult} onBlendAgain={handleBlendAgain} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={handleBackToHome}
            className="font-['Montserrat']"
            data-testid="button-back-home"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Home
          </Button>
          <div className="flex items-center gap-2">
            <Coffee className="w-5 h-5 text-primary" />
            <span className="font-['Montserrat'] font-semibold text-foreground">
              Personality Blender
            </span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-['Montserrat'] text-foreground mb-2">
            Select Your Traits
          </h2>
          <p className="text-muted-foreground font-['Open_Sans']">
            Choose 4-5 personality traits that best describe you, then drag them to the blender
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr,auto] gap-8 items-start">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {personalityTraits.map((trait) => (
              <TraitCard
                key={trait.id}
                trait={trait}
                isSelected={selectedTraits.some((t) => t.id === trait.id)}
                isDisabled={selectedTraits.length >= 5 && !selectedTraits.some((t) => t.id === trait.id)}
                onSelect={handleSelectTrait}
              />
            ))}
          </div>

          <div className="lg:sticky lg:top-8 lg:w-80">
            <BlenderContainer
              selectedTraits={selectedTraits}
              onRemoveTrait={handleRemoveTrait}
              onDrop={handleDrop}
              onBlend={handleBlend}
              isBlending={isBlending}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
