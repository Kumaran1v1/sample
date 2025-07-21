import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { SlideElement, Presentation } from "@/components/presentation/types";

// Types
interface BorderStyle {
  name: string;
  value: string;
  preview: string;
}

interface TextColor {
  name: string;
  value: string;
  class: string;
}

interface BorderMenuProps {
  selectedElement: string | null;
  currentSlide: number;
  presentation: Presentation;
  updateElement: (elementId: string, updates: Partial<SlideElement>) => void;
}

export default function BorderMenu({
  selectedElement,
  currentSlide,
  presentation,
  updateElement
}: BorderMenuProps) {
  const borderStyles: BorderStyle[] = [
    { name: "None", value: "none", preview: "border-0" },
    { name: "Solid Thin", value: "1px solid #000000", preview: "border border-black" },
    { name: "Solid Medium", value: "2px solid #000000", preview: "border-2 border-black" },
    { name: "Solid Thick", value: "3px solid #000000", preview: "border-4 border-black" },
    { name: "Dashed", value: "2px dashed #000000", preview: "border-2 border-dashed border-black" },
    { name: "Dotted", value: "2px dotted #000000", preview: "border-2 border-dotted border-black" },
    { name: "Double", value: "3px double #000000", preview: "border-4 border-double border-black" },
    { name: "Groove", value: "3px groove #000000", preview: "border-4 border-black" },
    { name: "Ridge", value: "3px ridge #000000", preview: "border-4 border-black" },
    { name: "Inset", value: "3px inset #000000", preview: "border-4 border-black" },
    { name: "Outset", value: "3px outset #000000", preview: "border-4 border-black" },
  ];

  const borderPositions = [
    { name: "All Sides", value: "border", icon: "⬜" },
    { name: "Top Only", value: "border-top", icon: "⬆️" },
    { name: "Right Only", value: "border-right", icon: "➡️" },
    { name: "Bottom Only", value: "border-bottom", icon: "⬇️" },
    { name: "Left Only", value: "border-left", icon: "⬅️" },
    { name: "Top & Bottom", value: "border-top border-bottom", icon: "↕️" },
    { name: "Left & Right", value: "border-left border-right", icon: "↔️" },
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

  const gradientBorders = [
    { name: "Blue Gradient", value: "linear-gradient(45deg, #3b82f6, #8b5cf6)", class: "bg-gradient-to-r from-blue-500 to-violet-500" },
    { name: "Purple Gradient", value: "linear-gradient(45deg, #8b5cf6, #ec4899)", class: "bg-gradient-to-r from-violet-500 to-pink-500" },
    { name: "Green Gradient", value: "linear-gradient(45deg, #22c55e, #06b6d4)", class: "bg-gradient-to-r from-green-500 to-cyan-500" },
    { name: "Orange Gradient", value: "linear-gradient(45deg, #f97316, #eab308)", class: "bg-gradient-to-r from-orange-500 to-yellow-500" },
    { name: "Rainbow", value: "linear-gradient(45deg, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #8b5cf6)", class: "bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500" },
  ];

  const currentElement = selectedElement
    ? presentation.slides[currentSlide - 1]?.elements.find(el => el.id === selectedElement)
    : null;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Border Styles</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {borderStyles.map((border, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start h-auto p-3"
              onClick={() => {
                if (selectedElement) {
                  updateElement(selectedElement, {
                    style: {
                      border: border.value,
                      padding: border.value !== 'none' ? '8px' : undefined
                    }
                  });
                }
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-6 bg-gray-100 rounded flex-shrink-0"
                  style={{
                    border: border.value,
                    borderColor: border.value.includes('#') ? undefined : '#000000'
                  }}
                />
                <span className="text-sm">{border.name}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Border Position</h3>
        <div className="grid grid-cols-2 gap-2">
          {borderPositions.map((position, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="justify-start"
              onClick={() => {
                if (selectedElement && currentElement) {
                  const borderColor = currentElement.style.borderColor || '#000000';
                  const borderWidth = currentElement.style.borderWidth || '2px';
                  const borderStyle = 'solid';

                  let borderValue = '';
                  if (position.value === 'border') {
                    borderValue = `${borderWidth} ${borderStyle} ${borderColor}`;
                  } else if (position.value.includes(' ')) {
                    // Multiple sides
                    const sides = position.value.split(' ');
                    const updates: any = {};
                    sides.forEach(side => {
                      const property = side.replace('border-', '');
                      updates[`border${property.charAt(0).toUpperCase() + property.slice(1)}`] = `${borderWidth} ${borderStyle} ${borderColor}`;
                    });
                    updateElement(selectedElement, { style: updates });
                    return;
                  } else {
                    // Single side
                    const side = position.value.replace('border-', '');
                    const property = `border${side.charAt(0).toUpperCase() + side.slice(1)}`;
                    updateElement(selectedElement, {
                      style: { [property]: `${borderWidth} ${borderStyle} ${borderColor}` }
                    });
                    return;
                  }

                  updateElement(selectedElement, {
                    style: { border: borderValue }
                  });
                }
              }}
            >
              <span className="mr-2">{position.icon}</span>
              {position.name}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <Label className="text-sm font-medium text-gray-900 mb-3">Border Color</Label>
        <div className="grid grid-cols-6 gap-2 mt-2">
          {textColors.slice(0, 18).map((color, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "w-8 h-8 rounded cursor-pointer border-2 hover:border-gray-400 transition-colors",
                    color.class
                  )}
                  onClick={() => {
                    if (selectedElement) {
                      updateElement(selectedElement, {
                        style: {
                          borderColor: color.value,
                          border: `2px solid ${color.value}`
                        }
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

        <div className="flex items-center gap-2 mt-3">
          <Label htmlFor="custom-border-color" className="text-sm">Custom:</Label>
          <input
            id="custom-border-color"
            type="color"
            className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
            onChange={(e) => {
              if (selectedElement) {
                updateElement(selectedElement, {
                  style: {
                    borderColor: e.target.value,
                    border: `2px solid ${e.target.value}`
                  }
                });
              }
            }}
          />
        </div>
      </div>

      <Separator />

      <div>
        <Label className="text-sm font-medium text-gray-900 mb-3">Border Width</Label>
        <div className="space-y-3">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 6, 8].map((width) => (
              <Button
                key={width}
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => {
                  if (selectedElement && currentElement) {
                    const borderColor = currentElement.style.borderColor || '#000000';
                    updateElement(selectedElement, {
                      style: {
                        border: `${width}px solid ${borderColor}`,
                        borderWidth: `${width}px`
                      }
                    });
                  }
                }}
              >
                {width}px
              </Button>
            ))}
          </div>

          <div>
            <Label className="text-xs text-gray-600 mb-2">Custom Width (1-20px)</Label>
            <Slider
              value={[currentElement?.style.borderWidth ? parseInt(currentElement.style.borderWidth) : 2]}
              onValueChange={(value) => {
                if (selectedElement && currentElement) {
                  const borderColor = currentElement.style.borderColor || '#000000';
                  updateElement(selectedElement, {
                    style: {
                      border: `${value[0]}px solid ${borderColor}`,
                      borderWidth: `${value[0]}px`
                    }
                  });
                }
              }}
              max={20}
              min={1}
              step={1}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <Label className="text-sm font-medium text-gray-900 mb-3">Border Radius</Label>
        <div className="space-y-3">
          <div className="flex gap-2">
            {[0, 4, 8, 12, 16, 24].map((radius) => (
              <Button
                key={radius}
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => {
                  if (selectedElement) {
                    updateElement(selectedElement, {
                      style: { borderRadius: `${radius}px` }
                    });
                  }
                }}
              >
                {radius}px
              </Button>
            ))}
          </div>

          <div>
            <Label className="text-xs text-gray-600 mb-2">Custom Radius (0-50px)</Label>
            <Slider
              value={[currentElement?.style.borderRadius ? parseInt(currentElement.style.borderRadius.toString()) : 0]}
              onValueChange={(value) => {
                if (selectedElement) {
                  updateElement(selectedElement, {
                    style: { borderRadius: `${value[0]}px` }
                  });
                }
              }}
              max={50}
              min={0}
              step={1}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Gradient Borders</h3>
        <div className="space-y-2">
          {gradientBorders.map((gradient, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start h-auto p-3"
              onClick={() => {
                if (selectedElement) {
                  updateElement(selectedElement, {
                    style: {
                      border: '3px solid transparent',
                      background: `${gradient.value} border-box`,
                      backgroundClip: 'padding-box, border-box',
                      backgroundOrigin: 'padding-box, border-box'
                    }
                  });
                }
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-8 h-6 rounded flex-shrink-0 border-2",
                    gradient.class
                  )}
                />
                <span className="text-sm">{gradient.name}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Border Preview</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div
            className="w-full h-16 bg-white rounded flex items-center justify-center text-sm text-gray-600"
            style={{
              border: currentElement?.style.border || 'none',
              borderRadius: currentElement?.style.borderRadius || '0px',
              borderColor: currentElement?.style.borderColor,
              borderWidth: currentElement?.style.borderWidth,
              borderStyle: currentElement?.style.borderStyle
            }}
          >
            Element Border Preview
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => {
            if (selectedElement) {
              updateElement(selectedElement, {
                style: { border: 'none' }
              });
            }
          }}
        >
          Remove Border
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => {
            if (selectedElement) {
              updateElement(selectedElement, {
                style: {
                  border: '2px solid #3b82f6',
                  borderRadius: '8px'
                }
              });
            }
          }}
        >
          Reset to Default
        </Button>
      </div>
    </div>
  );
}