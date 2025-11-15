import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface ColorCardProps {
  color: string;
  index: number;
}

export const ColorCard = ({ color, index }: ColorCardProps) => {
  const [copied, setCopied] = useState(false);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : null;
  };

  const hexToHsl = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return null;

    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return `${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`;
  };

  const copyToClipboard = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`${format} منسوخ!`);
    setTimeout(() => setCopied(false), 2000);
  };

  const rgb = hexToRgb(color);
  const hsl = hexToHsl(color);

  return (
    <Card
      className="group relative overflow-hidden border-border/50 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-color"
      style={{
        animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
      }}
    >
      <div
        className="h-48 w-full transition-all duration-300 group-hover:h-52"
        style={{ backgroundColor: color }}
      />
      <div className="space-y-3 p-4">
        <div className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-between text-xs font-mono hover:bg-muted"
            onClick={() => copyToClipboard(color, "HEX")}
          >
            <span className="text-muted-foreground">HEX</span>
            <span className="flex items-center gap-2">
              {color}
              {copied ? (
                <Check className="h-3 w-3 text-primary" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-between text-xs font-mono hover:bg-muted"
            onClick={() => copyToClipboard(`rgb(${rgb})`, "RGB")}
          >
            <span className="text-muted-foreground">RGB</span>
            <span className="flex items-center gap-2">
              {rgb}
              {copied ? (
                <Check className="h-3 w-3 text-primary" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-between text-xs font-mono hover:bg-muted"
            onClick={() => copyToClipboard(`hsl(${hsl})`, "HSL")}
          >
            <span className="text-muted-foreground">HSL</span>
            <span className="flex items-center gap-2">
              {hsl}
              {copied ? (
                <Check className="h-3 w-3 text-primary" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </span>
          </Button>
        </div>
      </div>
    </Card>
  );
};
