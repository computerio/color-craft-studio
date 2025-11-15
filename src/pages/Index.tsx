import { useState } from "react";
import { Sparkles, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColorCard } from "@/components/ColorCard";

const Index = () => {
  const [colors, setColors] = useState<string[]>([]);

  const generateRandomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
  };

  const generatePalette = () => {
    const newColors = Array.from({ length: 5 }, () => generateRandomColor());
    setColors(newColors);
  };

  const generateHarmoniousPalette = () => {
    const baseHue = Math.floor(Math.random() * 360);
    const newColors = [
      `hsl(${baseHue}, ${70 + Math.random() * 30}%, ${50 + Math.random() * 20}%)`,
      `hsl(${(baseHue + 30) % 360}, ${70 + Math.random() * 30}%, ${50 + Math.random() * 20}%)`,
      `hsl(${(baseHue + 60) % 360}, ${70 + Math.random() * 30}%, ${50 + Math.random() * 20}%)`,
      `hsl(${(baseHue + 120) % 360}, ${70 + Math.random() * 30}%, ${50 + Math.random() * 20}%)`,
      `hsl(${(baseHue + 180) % 360}, ${70 + Math.random() * 30}%, ${50 + Math.random() * 20}%)`,
    ].map((hsl) => {
      const temp = document.createElement("div");
      temp.style.color = hsl;
      document.body.appendChild(temp);
      const rgb = window.getComputedStyle(temp).color;
      document.body.removeChild(temp);
      const match = rgb.match(/\d+/g);
      if (match) {
        return (
          "#" +
          match
            .slice(0, 3)
            .map((x) => parseInt(x).toString(16).padStart(2, "0"))
            .join("")
        );
      }
      return generateRandomColor();
    });
    setColors(newColors);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <div className="mb-6 inline-block">
            <div
              className="relative inline-block"
              style={{
                animation: "float 3s ease-in-out infinite",
              }}
            >
              <h1 className="mb-2 bg-gradient-primary bg-clip-text text-6xl font-bold text-transparent md:text-7xl">
                موقع الألوان
              </h1>
              <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-2xl" />
            </div>
          </div>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
            اكتشف وأنشئ لوحات ألوان جميلة ومتناسقة لمشاريعك
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              onClick={generateHarmoniousPalette}
              size="lg"
              className="group bg-gradient-primary text-lg shadow-glow transition-all hover:scale-105 hover:shadow-color"
            >
              <Sparkles className="ml-2 h-5 w-5 transition-transform group-hover:rotate-12" />
              إنشاء لوحة متناسقة
            </Button>
            <Button
              onClick={generatePalette}
              variant="outline"
              size="lg"
              className="border-primary/20 text-lg backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-card"
            >
              <RefreshCw className="ml-2 h-5 w-5" />
              إنشاء لوحة عشوائية
            </Button>
          </div>
        </div>

        {colors.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {colors.map((color, index) => (
              <ColorCard key={`${color}-${index}`} color={color} index={index} />
            ))}
          </div>
        )}

        {colors.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-6 h-32 w-32 rounded-full bg-gradient-vibrant opacity-20 blur-3xl" />
            <p className="text-center text-lg text-muted-foreground">
              اضغط على أحد الأزرار أعلاه لإنشاء لوحة ألوان رائعة
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default Index;
