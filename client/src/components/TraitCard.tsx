import { useState } from "react";
import { Card } from "@/components/ui/card";
import type { PersonalityTrait } from "@/lib/personalityData";
import { X } from "lucide-react";

interface TraitCardProps {
  trait: PersonalityTrait;
  isSelected?: boolean;
  isDisabled?: boolean;
  inBlender?: boolean;
  onSelect?: (trait: PersonalityTrait) => void;
  onRemove?: (trait: PersonalityTrait) => void;
}

export default function TraitCard({
  trait,
  isSelected = false,
  isDisabled = false,
  inBlender = false,
  onSelect,
  onRemove,
}: TraitCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const Icon = trait.icon;

  const handleDragStart = (e: React.DragEvent) => {
    if (isDisabled && !isSelected) return;
    setIsDragging(true);
    e.dataTransfer.setData("traitId", trait.id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    if (inBlender && onRemove) {
      onRemove(trait);
    } else if (!isDisabled && onSelect) {
      onSelect(trait);
    }
  };

  if (inBlender) {
    return (
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-md bg-secondary dark:bg-card/90 shadow-sm animate-fade-in group border border-primary/20"
        style={{ borderLeft: `3px solid ${trait.color}` }}
      >
        <Icon className="w-4 h-4" style={{ color: trait.color }} />
        <span className="text-sm font-medium font-['Montserrat'] text-foreground">{trait.name}</span>
        <button
          onClick={handleClick}
          className="ml-auto p-1 rounded-full opacity-60 hover:opacity-100 hover:bg-muted transition-opacity"
          data-testid={`button-remove-trait-${trait.id}`}
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    );
  }

  return (
    <Card
      draggable={!isDisabled || isSelected}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      className={`
        p-4 cursor-grab active:cursor-grabbing transition-all duration-200
        flex flex-col items-center gap-2 text-center
        hover-elevate active-elevate-2 bg-secondary border-primary/15
        ${isDragging ? "opacity-50 scale-95" : ""}
        ${isSelected ? "ring-2 ring-primary ring-offset-2" : ""}
        ${isDisabled && !isSelected ? "opacity-40 cursor-not-allowed" : ""}
      `}
      data-testid={`card-trait-${trait.id}`}
    >
      <div 
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{ backgroundColor: `${trait.color}20` }}
      >
        <Icon className="w-6 h-6" style={{ color: trait.color }} />
      </div>
      <span className="text-sm font-semibold font-['Montserrat'] text-foreground">
        {trait.name}
      </span>
    </Card>
  );
}
