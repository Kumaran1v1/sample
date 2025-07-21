import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SlideElement, Presentation } from "@/components/presentation/types";

// Types
interface TextStyle {
  name: string;
  fontSize: number;
  fontWeight: string;
  example: string;
  italic?: boolean;
  fontFamily?: string;
}

interface FontFamily {
  name: string;
  value: string;
  category: string;
}

interface FontSize {
  name: string;
  value: number;
  display: string;
}

interface TextColor {
  name: string;
  value: string;
  class: string;
}

interface BackgroundColor {
  name: string;
  value: string;
  class: string;
}

interface TextMenuProps {
  selectedElement: string | null;
  currentSlide: number;
  presentation: Presentation;
  setPresentation: React.Dispatch<React.SetStateAction<Presentation>>;
  setSelectedElement: React.Dispatch<React.SetStateAction<string | null>>;
  updateElement: (elementId: string, updates: Partial<SlideElement>) => void;
}

export default function TextMenu({ 
  selectedElement, 
  currentSlide, 
  presentation, 
  setPresentation, 
  setSelectedElement, 
  updateElement 
}: TextMenuProps) {
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

  const fontSizes: FontSize[] = [
    { name: "Extra Small", value: 12, display: "12px" },
    { name: "Small", value: 14, display: "14px" },
    { name: "Base", value: 16, display: "16px" },
    { name: "Large", value: 18, display: "18px" },
    { name: "Extra Large", value: 20, display: "20px" },
    { name: "2XL", value: 24, display: "24px" },
    { name: "3XL", value: 30, display: "30px" },
    { name: "4XL", value: 36, display: "36px" },
    { name: "5XL", value: 48, display: "48px" },
    { name: "6XL", value: 60, display: "60px" },
    { name: "7XL", value: 72, display: "72px" },
    { name: "8XL", value: 96, display: "96px" },
  ];

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

  const backgroundColors: BackgroundColor[] = [
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

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Text Styles</h3>
        <div className="space-y-2">
          {textStyles.map((style, index) => (
            <Button
              key={index}
              className="w-full justify-start h-auto p-3"
              variant="outline"
              onClick={() => {
                const newElement = {
                  id: Date.now().toString(),
                  type: 'text' as const,
                  content: style.example,
                  x: 100,
                  y: 100,
                  width: 300,
                  height: style.fontSize + 20,
                  style: {
                    fontSize: style.fontSize,
                    fontWeight: style.fontWeight,
                    fontFamily: style.fontFamily || 'Inter, sans-serif',
                    color: '#000000'
                  }
                };

                setPresentation(prev => ({
                  ...prev,
                  slides: prev.slides.map((slide, slideIndex) =>
                    slideIndex === currentSlide - 1
                      ? { ...slide, elements: [...slide.elements, newElement] }
                      : slide
                  )
                }));
                setSelectedElement(newElement.id);
              }}
            >
              <div className="text-left">
                <div className="font-medium text-sm">{style.name}</div>
                <div
                  className="text-gray-600 mt-1"
                  style={{
                    fontSize: Math.min(style.fontSize * 0.5, 14),
                    fontWeight: style.fontWeight,
                    fontStyle: style.italic ? 'italic' : 'normal',
                    fontFamily: style.fontFamily || 'inherit'
                  }}
                >
                  {style.example}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Font Family</h3>
        <div className="space-y-1 max-h-40 overflow-y-auto">
          {fontFamilies.map((font, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start h-auto p-2"
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
                <div className="text-sm font-medium">{font.name}</div>
                <div className="text-xs text-gray-500">{font.category}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Font Size</h3>
        <div className="grid grid-cols-3 gap-1">
          {fontSizes.map((size, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => {
                if (selectedElement) {
                  updateElement(selectedElement, {
                    style: { fontSize: size.value }
                  });
                }
              }}
            >
              {size.display}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Text Color</h3>
        <div className="grid grid-cols-5 gap-2 mb-3">
          {textColors.map((color, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "w-8 h-8 rounded cursor-pointer border-2 hover:border-gray-400 transition-colors",
                    color.class,
                    selectedElement && presentation.slides[currentSlide - 1]?.elements
                      .find(el => el.id === selectedElement)?.style.color === color.value
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-gray-200"
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

        {/* Custom Color Picker */}
        <div className="flex items-center gap-2">
          <Label htmlFor="custom-text-color" className="text-sm">Custom:</Label>
          <input
            id="custom-text-color"
            type="color"
            className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
            onChange={(e) => {
              if (selectedElement) {
                updateElement(selectedElement, {
                  style: { color: e.target.value }
                });
              }
            }}
          />
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Background Color</h3>
        <div className="grid grid-cols-4 gap-2 mb-3">
          {backgroundColors.map((color, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "w-8 h-8 rounded cursor-pointer border-2 hover:border-gray-400 transition-colors",
                    color.class,
                    selectedElement && presentation.slides[currentSlide - 1]?.elements
                      .find(el => el.id === selectedElement)?.style.backgroundColor === color.value
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-gray-200"
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

        {/* Custom Background Color Picker */}
        <div className="flex items-center gap-2">
          <Label htmlFor="custom-bg-color" className="text-sm">Custom:</Label>
          <input
            id="custom-bg-color"
            type="color"
            className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
            onChange={(e) => {
              if (selectedElement) {
                updateElement(selectedElement, {
                  style: { backgroundColor: e.target.value }
                });
              }
            }}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (selectedElement) {
                updateElement(selectedElement, {
                  style: { backgroundColor: 'transparent' }
                });
              }
            }}
          >
            Clear
          </Button>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Text Formatting</h3>
        <div className="flex gap-2 mb-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (selectedElement) {
                const currentElement = presentation.slides[currentSlide - 1]?.elements
                  .find(el => el.id === selectedElement);
                const isBold = currentElement?.style.fontWeight === 'bold';
                updateElement(selectedElement, {
                  style: { fontWeight: isBold ? 'normal' : 'bold' }
                });
              }
            }}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (selectedElement) {
                updateElement(selectedElement, {
                  style: { fontStyle: 'italic' }
                });
              }
            }}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (selectedElement) {
                updateElement(selectedElement, {
                  style: { textDecoration: 'underline' }
                });
              }
            }}
          >
            <Underline className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (selectedElement) {
                updateElement(selectedElement, {
                  style: { textAlign: 'left' }
                });
              }
            }}
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (selectedElement) {
                updateElement(selectedElement, {
                  style: { textAlign: 'center' }
                });
              }
            }}
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (selectedElement) {
                updateElement(selectedElement, {
                  style: { textAlign: 'right' }
                });
              }
            }}
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Text Effects</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => {
              if (selectedElement) {
                updateElement(selectedElement, {
                  style: {
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    color: '#ffffff'
                  }
                });
              }
            }}
          >
            <span className="mr-2">✨</span>
            Drop Shadow
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => {
              if (selectedElement) {
                updateElement(selectedElement, {
                  style: {
                    background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }
                });
              }
            }}
          >
            <span className="mr-2">🌈</span>
            Gradient Text
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => {
              if (selectedElement) {
                updateElement(selectedElement, {
                  style: {
                    border: '2px solid #3b82f6',
                    padding: '8px 16px',
                    borderRadius: '8px'
                  }
                });
              }
            }}
          >
            <span className="mr-2">📦</span>
            Text Box
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => {
              if (selectedElement) {
                updateElement(selectedElement, {
                  style: {
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontWeight: 'bold'
                  }
                });
              }
            }}
          >
            <span className="mr-2">🔤</span>
            Uppercase
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => {
              if (selectedElement) {
                updateElement(selectedElement, {
                  style: {
                    animation: 'bounce 1s infinite',
                    transform: 'translateY(0)'
                  }
                });
              }
            }}
          >
            <span className="mr-2">🦋</span>
            Bounce Effect
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => {
              if (selectedElement) {
                updateElement(selectedElement, {
                  style: {
                    animation: 'pulse 2s infinite',
                    transform: 'scale(1)'
                  }
                });
              }
            }}
          >
            <span className="mr-2">💫</span>
            Pulse Effect
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => {
              if (selectedElement) {
                updateElement(selectedElement, {
                  style: {
                    animation: 'fadeIn 2s ease-in-out',
                    opacity: '1'
                  }
                });
              }
            }}
          >
            <span className="mr-2">✨</span>
            Fade In
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => {
              if (selectedElement) {
                updateElement(selectedElement, {
                  style: {
                    animation: 'slideInLeft 1s ease-out',
                    transform: 'translateX(0)'
                  }
                });
              }
            }}
          >
            <span className="mr-2">🚀</span>
            Slide In
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => {
              if (selectedElement) {
                updateElement(selectedElement, {
                  style: {
                    animation: 'none',
                    transform: 'none',
                    textShadow: 'none',
                    background: 'none',
                    WebkitBackgroundClip: 'unset',
                    WebkitTextFillColor: 'unset',
                    backgroundClip: 'unset'
                  }
                });
              }
            }}
          >
            <span className="mr-2">🔄</span>
            Reset Effects
          </Button>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Line Height & Spacing</h3>
        <div className="space-y-3">
          <div>
            <Label className="text-sm">Line Height</Label>
            <div className="flex gap-1 mt-1">
              {[1, 1.2, 1.5, 2].map((height) => (
                <Button
                  key={height}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    if (selectedElement) {
                      updateElement(selectedElement, {
                        style: { lineHeight: height.toString() }
                      });
                    }
                  }}
                >
                  {height}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm">Letter Spacing</Label>
            <div className="flex gap-1 mt-1">
              {['0px', '1px', '2px', '3px'].map((spacing) => (
                <Button
                  key={spacing}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    if (selectedElement) {
                      updateElement(selectedElement, {
                        style: { letterSpacing: spacing }
                      });
                    }
                  }}
                >
                  {spacing}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}