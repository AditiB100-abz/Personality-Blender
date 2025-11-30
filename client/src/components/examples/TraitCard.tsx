import TraitCard from "../TraitCard";
import { personalityTraits } from "@/lib/personalityData";

export default function TraitCardExample() {
  return (
    <div className="p-6 bg-background">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
        <TraitCard trait={personalityTraits[0]} onSelect={() => console.log("Selected creative")} />
        <TraitCard trait={personalityTraits[1]} isSelected onSelect={() => console.log("Toggle empathetic")} />
        <TraitCard trait={personalityTraits[2]} onSelect={() => console.log("Selected energetic")} />
        <TraitCard trait={personalityTraits[3]} isDisabled />
      </div>
    </div>
  );
}
