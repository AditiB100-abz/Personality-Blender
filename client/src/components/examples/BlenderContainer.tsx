import { useState } from "react";
import BlenderContainer from "../BlenderContainer";
import { personalityTraits } from "@/lib/personalityData";

export default function BlenderContainerExample() {
  const [selected, setSelected] = useState([personalityTraits[0], personalityTraits[1]]);
  const [isBlending, setIsBlending] = useState(false);

  const handleRemove = (trait: typeof personalityTraits[0]) => {
    setSelected(prev => prev.filter(t => t.id !== trait.id));
  };

  const handleDrop = (traitId: string) => {
    const trait = personalityTraits.find(t => t.id === traitId);
    if (trait && !selected.find(t => t.id === traitId)) {
      setSelected(prev => [...prev, trait]);
    }
  };

  const handleBlend = () => {
    setIsBlending(true);
    setTimeout(() => setIsBlending(false), 1500);
  };

  return (
    <div className="p-6 bg-background">
      <BlenderContainer
        selectedTraits={selected}
        onRemoveTrait={handleRemove}
        onDrop={handleDrop}
        onBlend={handleBlend}
        isBlending={isBlending}
      />
    </div>
  );
}
