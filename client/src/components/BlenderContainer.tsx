import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import TraitCard from "./TraitCard";
import type { PersonalityTrait } from "@/lib/personalityData";
import { Blend, Coffee } from "lucide-react";
import { startBlenderSound, stopBlenderSound } from "@/lib/blenderSound";

interface BlenderContainerProps {
  selectedTraits: PersonalityTrait[];
  onRemoveTrait: (trait: PersonalityTrait) => void;
  onDrop: (traitId: string) => void;
  onBlend: () => void;
  isBlending: boolean;
}

export default function BlenderContainer({
  selectedTraits,
  onRemoveTrait,
  onDrop,
  onBlend,
  isBlending,
}: BlenderContainerProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const canBlend = selectedTraits.length >= 4 && selectedTraits.length <= 5;

  useEffect(() => {
    if (isBlending) {
      startBlenderSound();
    } else {
      stopBlenderSound();
    }
    
    return () => {
      stopBlenderSound();
    };
  }, [isBlending]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (selectedTraits.length < 5) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const traitId = e.dataTransfer.getData("traitId");
    if (traitId && selectedTraits.length < 5) {
      onDrop(traitId);
    }
  };

  const getValidationColor = () => {
    if (selectedTraits.length < 4) return "text-destructive";
    if (selectedTraits.length <= 5) return "text-primary";
    return "text-destructive";
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative w-full max-w-sm mx-auto
          ${isBlending ? "animate-blender-shake animate-pulse-glow" : ""}
        `}
      >
        <div className="relative">
          <svg
            viewBox="0 0 200 280"
            className="w-full h-auto"
            style={{ filter: isBlending ? "brightness(1.1)" : "none" }}
          >
            <defs>
              <linearGradient id="blenderBody" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00704A" />
                <stop offset="100%" stopColor="#005a3c" />
              </linearGradient>
              <linearGradient id="blenderGlass" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F7F3E9" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#E8E4DA" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                {selectedTraits.length > 0 ? (
                  selectedTraits.slice(0, 3).map((trait, i) => (
                    <stop
                      key={trait.id}
                      offset={`${(i / Math.min(selectedTraits.length, 3)) * 100}%`}
                      stopColor={trait.color}
                      stopOpacity={isBlending ? "0.9" : "0.7"}
                    />
                  ))
                ) : (
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
                )}
              </linearGradient>
            </defs>

            <rect x="60" y="220" width="80" height="50" rx="8" fill="url(#blenderBody)" />
            <circle cx="100" cy="245" r="12" fill="#1E3932" />
            <circle cx="100" cy="245" r="6" fill="#D4AF37" />
            <rect x="85" y="260" width="30" height="8" rx="4" fill="#8B4513" />

            <path
              d="M55 220 L65 60 C65 50, 75 40, 100 40 C125 40, 135 50, 135 60 L145 220 Z"
              fill="url(#blenderGlass)"
              stroke="#00704A"
              strokeWidth="3"
            />

            {selectedTraits.length > 0 && (
              <path
                d={`M60 ${220 - selectedTraits.length * 25} 
                   L${68 - selectedTraits.length * 1.5} ${220 - selectedTraits.length * 25} 
                   L140 220 L60 220 Z`}
                fill="url(#liquidGradient)"
                className={isBlending ? "animate-pulse" : ""}
              />
            )}

            <ellipse cx="100" cy="45" rx="30" ry="8" fill="#00704A" />
            <rect x="95" y="15" width="10" height="25" fill="#1E3932" rx="2" />
            <circle cx="100" cy="12" r="8" fill="#00704A" />
          </svg>

          <div
            className={`
              absolute top-1/3 left-1/2 -translate-x-1/2 w-3/4
              flex flex-col gap-2 p-3
              transition-all duration-300
              ${isDragOver ? "scale-105" : ""}
            `}
          >
            {selectedTraits.length === 0 ? (
              <div className={`
                text-center py-8 border-2 border-dashed rounded-lg
                transition-colors duration-200
                ${isDragOver ? "border-primary bg-primary/10" : "border-muted-foreground/30"}
              `}>
                <Coffee className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground font-['Montserrat']">
                  {isDragOver ? "Drop here!" : "Drag traits here"}
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {selectedTraits.map((trait) => (
                  <TraitCard
                    key={trait.id}
                    trait={trait}
                    inBlender
                    onRemove={onRemoveTrait}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <p className={`text-sm font-['Montserrat'] font-medium ${getValidationColor()}`}>
        {selectedTraits.length} of 4-5 traits selected
      </p>

      <Button
        size="lg"
        disabled={!canBlend || isBlending}
        onClick={onBlend}
        className="px-8 font-['Montserrat'] font-semibold"
        data-testid="button-blend"
      >
        {isBlending ? (
          <>
            <Blend className="w-5 h-5 mr-2 animate-spin" />
            Blending...
          </>
        ) : (
          <>
            <Blend className="w-5 h-5 mr-2" />
            Blend My Personality
          </>
        )}
      </Button>
    </div>
  );
}
