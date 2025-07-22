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
import { Presentation } from "@/components/presentation/types";

// Types
interface BorderStyle {
  name: string;
  value: string;
  preview: string;
}

interface BorderColor {
  name: string;
  value: string;
  class: string;
}

interface SlideBorderMenuProps {
  currentSlide: number;
  presentation: Presentation;
  setPresentation: React.Dispatch<React.SetStateAction<Presentation>>;
}

export default function SlideBorderMenu({ 
  currentSlide, 
  presentation, 
  setPresentation 
}: SlideBorderMenuProps) {
  const borderStyles: BorderStyle[] = [
    { name: "None", value: "none", preview: "border-0" },
    { name: "Solid Thin", value: "1px solid #000000", preview: "border border-black" },
    { name: "Solid Medium", value: "2px solid #000000", preview: "border-2 border-black" },
    { name: "Solid Thick", value: "3px solid #000000", preview: "border-4 border-black" },
    { name: "Extra Thick", value: "4px solid #000000", preview: "border-4 border-black" },
    { name: "Very Thick", value: "6px solid #000000", preview: "border-8 border-black" },
    { name: "Ultra Thick", value: "8px solid #000000", preview: "border-8 border-black" },
    { name: "Dashed Thin", value: "2px dashed #000000", preview: "border-2 border-dashed border-black" },
    { name: "Dashed Medium", value: "3px dashed #000000", preview: "border-4 border-dashed border-black" },
    { name: "Dashed Thick", value: "4px dashed #000000", preview: "border-4 border-dashed border-black" },
    { name: "Dotted Thin", value: "2px dotted #000000", preview: "border-2 border-dotted border-black" },
    { name: "Dotted Medium", value: "3px dotted #000000", preview: "border-4 border-dotted border-black" },
    { name: "Dotted Thick", value: "4px dotted #000000", preview: "border-4 border-dotted border-black" },
    { name: "Double", value: "3px double #000000", preview: "border-4 border-double border-black" },
    { name: "Double Thick", value: "5px double #000000", preview: "border-8 border-double border-black" },
    { name: "Groove", value: "3px groove #000000", preview: "border-4 border-black" },
    { name: "Ridge", value: "3px ridge #000000", preview: "border-4 border-black" },
    { name: "Inset", value: "3px inset #000000", preview: "border-4 border-black" },
    { name: "Outset", value: "3px outset #000000", preview: "border-4 border-black" },
  ];

  const borderColors: BorderColor[] = [
    { name: "Black", value: "#000000", class: "bg-black" },
    { name: "White", value: "#ffffff", class: "bg-white border border-gray-300" },
    { name: "Gray", value: "#6b7280", class: "bg-gray-500" },
    { name: "Light Gray", value: "#d1d5db", class: "bg-gray-300" },
    { name: "Dark Gray", value: "#374151", class: "bg-gray-700" },
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

  const shadowStyles = [
    { name: "No Shadow", value: "none" },
    { name: "Light Shadow", value: "0 1px 3px rgba(0, 0, 0, 0.1)" },
    { name: "Medium Shadow", value: "0 4px 6px rgba(0, 0, 0, 0.1)" },
    { name: "Heavy Shadow", value: "0 10px 15px rgba(0, 0, 0, 0.1)" },
    { name: "Colored Shadow", value: "0 4px 14px rgba(59, 130, 246, 0.3)" },
  ];

  const updateSlideBorder = (borderValue: string) => {
    setPresentation(prev => ({
      ...prev,
      slides: prev.slides.map((slide, index) =>
        index === currentSlide - 1
          ? { ...slide, border: borderValue }
          : slide
      )
    }));
  };

  const updateSlideBorderColor = (color: string) => {
    const currentSlideData = presentation.slides[currentSlide - 1];
    const currentBorder = currentSlideData?.border || "2px solid #000000";

    // Extract width and style from current border, replace color
    const borderParts = currentBorder.split(' ');
    if (borderParts.length >= 3) {
      const newBorder = `${borderParts[0]} ${borderParts[1]} ${color}`;
      updateSlideBorder(newBorder);
    } else {
      updateSlideBorder(`2px solid ${color}`);
    }
  };

  const updateSlideShadow = (shadowValue: string) => {
    setPresentation(prev => ({
      ...prev,
      slides: prev.slides.map((slide, index) =>
        index === currentSlide - 1
          ? {
              ...slide,
              style: {
                ...slide.style,
                boxShadow: shadowValue === 'none' ? undefined : shadowValue
              }
            }
          : slide
      )
    }));
  };

  const currentSlideData = presentation.slides[currentSlide - 1];
  const currentBorder = currentSlideData?.border || "none";

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Slide Border Styles</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
          {borderStyles.map((border, index) => (
            <Button
              key={index}
              variant={currentBorder === border.value ? "default" : "outline"}
              className="w-full justify-start h-auto p-3"
              onClick={() => updateSlideBorder(border.value)}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-8 bg-gray-50 rounded flex-shrink-0"
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

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Border Colors</h3>
        <div className="grid grid-cols-6 gap-2">
          {borderColors.map((color, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "w-8 h-8 rounded cursor-pointer border-2 hover:border-gray-400 transition-colors",
                    color.class,
                    currentBorder.includes(color.value) 
                      ? "ring-2 ring-blue-500 border-blue-500" 
                      : "border-gray-200"
                  )}
                  onClick={() => updateSlideBorderColor(color.value)}
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
        <h3 className="font-medium text-gray-900 mb-3">Border Width</h3>
        <div className="space-y-3">
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4, 6, 8, 10, 12].map((width) => (
              <Button
                key={width}
                variant="outline"
                size="sm"
                onClick={() => {
                  const currentColor = currentBorder.includes('#')
                    ? currentBorder.split(' ')[2] || '#000000'
                    : '#000000';
                  updateSlideBorder(`${width}px solid ${currentColor}`);
                }}
              >
                {width}px
              </Button>
            ))}
          </div>

          <div>
            <Label className="text-xs text-gray-600 mb-2">Custom Width (1-20px)</Label>
            <Slider
              value={[currentBorder !== 'none' && currentBorder.includes('px')
                ? parseInt(currentBorder.split('px')[0])
                : 2]}
              onValueChange={(value) => {
                const currentColor = currentBorder.includes('#')
                  ? currentBorder.split(' ')[2] || '#000000'
                  : '#000000';
                updateSlideBorder(`${value[0]}px solid ${currentColor}`);
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
        <h3 className="font-medium text-gray-900 mb-3">Border Radius</h3>
        <div className="space-y-3">
          <div className="grid grid-cols-4 gap-2">
            {[0, 4, 8, 12, 16, 20, 24, 32].map((radius) => (
              <Button
                key={radius}
                variant="outline"
                size="sm"
                onClick={() => {
                  setPresentation(prev => ({
                    ...prev,
                    slides: prev.slides.map((slide, index) =>
                      index === currentSlide - 1
                        ? { ...slide, borderRadius: `${radius}px` }
                        : slide
                    )
                  }));
                }}
              >
                {radius}px
              </Button>
            ))}
          </div>

          <div>
            <Label className="text-xs text-gray-600 mb-2">Custom Radius (0-50px)</Label>
            <Slider
              value={[currentSlideData?.borderRadius
                ? parseInt(currentSlideData.borderRadius.toString())
                : 0]}
              onValueChange={(value) => {
                setPresentation(prev => ({
                  ...prev,
                  slides: prev.slides.map((slide, index) =>
                    index === currentSlide - 1
                      ? { ...slide, borderRadius: `${value[0]}px` }
                      : slide
                  )
                }));
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
        <h3 className="font-medium text-gray-900 mb-3">Slide Shadow</h3>
        <div className="space-y-2">
          {shadowStyles.map((shadow, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start h-auto p-3"
              onClick={() => updateSlideShadow(shadow.value)}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-6 bg-white rounded border border-gray-200 flex-shrink-0"
                  style={{
                    boxShadow: shadow.value === 'none' ? 'none' : shadow.value
                  }}
                />
                <span className="text-sm">{shadow.name}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Custom Border Color</h3>
        <div className="flex items-center gap-2">
          <Label htmlFor="custom-border-color" className="text-sm">Custom:</Label>
          <input
            id="custom-border-color"
            type="color"
            className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
            onChange={(e) => updateSlideBorderColor(e.target.value)}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateSlideBorder("none")}
          >
            Remove Border
          </Button>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Border Preview</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div
            className="w-full h-20 bg-white rounded flex items-center justify-center text-sm text-gray-600"
            style={{
              border: currentBorder,
              borderRadius: currentSlideData?.borderRadius || '0px',
              boxShadow: currentSlideData?.style?.boxShadow || 'none'
            }}
          >
            Slide Border Preview
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => {
            updateSlideBorder("none");
            setPresentation(prev => ({
              ...prev,
              slides: prev.slides.map((slide, index) =>
                index === currentSlide - 1
                  ? {
                      ...slide,
                      borderRadius: '0px',
                      style: { ...slide.style, boxShadow: undefined }
                    }
                  : slide
              )
            }));
          }}
        >
          Reset All
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => {
            updateSlideBorder("2px solid #3b82f6");
            setPresentation(prev => ({
              ...prev,
              slides: prev.slides.map((slide, index) =>
                index === currentSlide - 1
                  ? {
                      ...slide,
                      borderRadius: '8px',
                      style: { ...slide.style, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }
                    }
                  : slide
              )
            }));
          }}
        >
          Apply Default Style
        </Button>
      </div>
    </div>
  );
}