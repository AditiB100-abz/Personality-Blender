import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Coffee, Sparkles, ArrowRight } from "lucide-react";

interface HomeScreenProps {
  onStart: () => void;
}

export default function HomeScreen({ onStart }: HomeScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="max-w-md w-full p-8 md:p-10 text-center overflow-visible">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <Coffee className="w-12 h-12 text-primary" />
            </div>
            <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-chart-2 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-foreground mb-3">
              Personality Blender
            </h1>
            <p className="text-muted-foreground font-['Open_Sans'] text-base md:text-lg leading-relaxed">
              Discover your signature drink based on your unique personality traits. 
              Select 4-5 traits, blend them together, and reveal your perfect beverage match.
            </p>
          </div>

          <div className="w-full space-y-3 pt-2">
            <Button
              size="lg"
              onClick={onStart}
              className="w-full font-['Montserrat'] font-semibold text-lg py-6"
              data-testid="button-start"
            >
              Start Blending
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground font-['Montserrat']">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>20 Traits</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-chart-2" />
              <span>Unique Drinks</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-chart-3" />
              <span>Shareable</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
