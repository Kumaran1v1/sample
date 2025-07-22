import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { SlideElement, Presentation, TextColor, FontFamily, TextStyle } from "@/components/presentation/types";

interface BrandMenuProps {
  selectedElement: string | null;
  currentSlide: number;
  presentation: Presentation;
  updateElement: (elementId: string, updates: Partial<SlideElement>) => void;
}

export default function BrandMenu({ 
  selectedElement, 
  currentSlide, 
  presentation, 
  updateElement 
}: BrandMenuProps) {
  const textColors: TextColor[] = [
    { name: "Black", value: "#000000", class: "bg-black" },
    { name: "White", value: "#ffffff", class: "bg-white border" },
    { name: "Gray", value: "#6b7280", class: "bg-gray-500" },
    { name: "Red", value: "#ef4444", class: "bg-red-500" },
    { name: "Orange", value: "#f97316", class: "bg-orange-500" },
    { name: "Amber", value: "#f59e0b", class: "bg-amber-500" },
    { name: "Yellow", value: "#eab308", class: "bg-yellow-500" },
    { name: "Lime", value: "#84cc16", class: "bg-lime-500" },
    { name: "Green", value: "#22c55e", class: "bg-green-500" },
    { name: "Emerald", value: "#10b981", class: "bg-emerald-500" },
    { name: "Teal", value: "#14b8a6", class: "bg-teal-500" },
    { name: "Cyan", value: "#06b6d4", class: "bg-cyan-500" },
    { name: "Sky", value: "#0ea5e9", class: "bg-sky-500" },
    { name: "Blue", value: "#3b82f6", class: "bg-blue-500" },
    { name: "Indigo", value: "#6366f1", class: "bg-indigo-500" },
    { name: "Violet", value: "#8b5cf6", class: "bg-violet-500" },
    { name: "Purple", value: "#a855f7", class: "bg-purple-500" },
    { name: "Fuchsia", value: "#d946ef", class: "bg-fuchsia-500" },
    { name: "Pink", value: "#ec4899", class: "bg-pink-500" },
    { name: "Rose", value: "#f43f5e", class: "bg-rose-500" },
  ];

  const backgroundColors: TextColor[] = [
    { name: "Transparent", value: "transparent", class: "bg-transparent border-2 border-dashed border-gray-300" },
    { name: "White", value: "#ffffff", class: "bg-white border" },
    { name: "Light Gray", value: "#f3f4f6", class: "bg-gray-100" },
    { name: "Gray", value: "#e5e7eb", class: "bg-gray-200" },
    { name: "Dark Gray", value: "#374151", class: "bg-gray-700" },
    { name: "Black", value: "#000000", class: "bg-black" },
    { name: "Red", value: "#fef2f2", class: "bg-red-50" },
    { name: "Orange", value: "#fff7ed", class: "bg-orange-50" },
    { name: "Yellow", value: "#fefce8", class: "bg-yellow-50" },
    { name: "Green", value: "#f0fdf4", class: "bg-green-50" },
    { name: "Blue", value: "#eff6ff", class: "bg-blue-50" },
    { name: "Purple", value: "#faf5ff", class: "bg-purple-50" },
    { name: "Pink", value: "#fdf2f8", class: "bg-pink-50" },
  ];

  const fontFamilies: FontFamily[] = [
    { name: "Inter", value: "Inter, sans-serif", category: "Sans Serif" },
    { name: "Helvetica", value: "Helvetica, Arial, sans-serif", category: "Sans Serif" },
    { name: "Arial", value: "Arial, sans-serif", category: "Sans Serif" },
    { name: "Roboto", value: "Roboto, sans-serif", category: "Sans Serif" },
    { name: "Open Sans", value: "Open Sans, sans-serif", category: "Sans Serif" },
    { name: "Lato", value: "Lato, sans-serif", category: "Sans Serif" },
    { name: "Times New Roman", value: "Times New Roman, serif", category: "Serif" },
    { name: "Georgia", value: "Georgia, serif", category: "Serif" },
    { name: "Playfair Display", value: "Playfair Display, serif", category: "Serif" },
    { name: "Merriweather", value: "Merriweather, serif", category: "Serif" },
    { name: "Courier New", value: "Courier New, monospace", category: "Monospace" },
    { name: "Monaco", value: "Monaco, monospace", category: "Monospace" },
    { name: "Fira Code", value: "Fira Code, monospace", category: "Monospace" },
  ];

  const textStyles: TextStyle[] = [
    { name: "Heading 1", fontSize: 48, fontWeight: "bold", example: "Main Title" },
    { name: "Heading 2", fontSize: 36, fontWeight: "bold", example: "Section Title" },
    { name: "Heading 3", fontSize: 24, fontWeight: "semibold", example: "Subsection" },
    { name: "Heading 4", fontSize: 20, fontWeight: "semibold", example: "Small Heading" },
    { name: "Body Large", fontSize: 18, fontWeight: "normal", example: "Large body text" },
    { name: "Body", fontSize: 16, fontWeight: "normal", example: "Regular body text" },
    { name: "Body Small", fontSize: 14, fontWeight: "normal", example: "Small body text" },
    { name: "Caption", fontSize: 12, fontWeight: "normal", example: "Caption text" },
    { name: "Quote", fontSize: 20, fontWeight: "normal", example: "Quote text", italic: true },
    { name: "Code", fontSize: 14, fontWeight: "normal", example: "Code text", fontFamily: "monospace" },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Primary Colors</h3>
        <div className="grid grid-cols-5 gap-2">
          {textColors.slice(0, 10).map((color, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "aspect-square rounded-lg cursor-pointer border-2 hover:border-gray-400 transition-colors",
                    color.class
                  )}
                  onClick={() => {
                    if (selectedElement) {
                      updateElement(selectedElement, {
                        style: { color: color.value }
                      });
                    }
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{color.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Secondary Colors</h3>
        <div className="grid grid-cols-5 gap-2">
          {textColors.slice(10).map((color, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "aspect-square rounded-lg cursor-pointer border-2 hover:border-gray-400 transition-colors",
                    color.class
                  )}
                  onClick={() => {
                    if (selectedElement) {
                      updateElement(selectedElement, {
                        style: { color: color.value }
                      });
                    }
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{color.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Background Colors</h3>
        <div className="grid grid-cols-4 gap-2">
          {backgroundColors.slice(0, 8).map((color, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "aspect-square rounded-lg cursor-pointer border-2 hover:border-gray-400 transition-colors",
                    color.class
                  )}
                  onClick={() => {
                    if (selectedElement) {
                      updateElement(selectedElement, {
                        style: { backgroundColor: color.value }
                      });
                    }
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{color.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Brand Fonts</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {fontFamilies.filter(font => font.category === 'Sans Serif').map((font, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start h-auto p-3"
              style={{ fontFamily: font.value }}
              onClick={() => {
                if (selectedElement) {
                  updateElement(selectedElement, {
                    style: { fontFamily: font.value }
                  });
                }
              }}
            >
              <div className="text-left">
                <div className="font-medium">{font.name}</div>
                <div className="text-sm text-gray-500">The quick brown fox</div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Text Presets</h3>
        <div className="space-y-2">
          {textStyles.slice(0, 5).map((style, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start h-auto p-3"
              onClick={() => {
                if (selectedElement) {
                  updateElement(selectedElement, {
                    style: {
                      fontSize: style.fontSize,
                      fontWeight: style.fontWeight,
                      fontFamily: style.fontFamily || 'Inter, sans-serif'
                    }
                  });
                }
              }}
            >
              <div className="text-left">
                <div className="font-medium text-sm">{style.name}</div>
                <div
                  className="text-gray-600 mt-1"
                  style={{
                    fontSize: Math.min(style.fontSize * 0.4, 12),
                    fontWeight: style.fontWeight
                  }}
                >
                  {style.example}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
