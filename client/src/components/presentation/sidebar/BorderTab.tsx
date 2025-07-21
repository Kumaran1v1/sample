import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { usePresentationContext } from '../PresentationContext';
import { BorderStyle, TextColor } from '../types';

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

const borderColors: TextColor[] = [
  { name: "Black", value: "#000000", class: "bg-black" },
  { name: "White", value: "#ffffff", class: "bg-white border" },
  { name: "Gray", value: "#6b7280", class: "bg-gray-500" },
  { name: "Red", value: "#ef4444", class: "bg-red-500" },
  { name: "Orange", value: "#f97316", class: "bg-orange-500" },
  { name: "Yellow", value: "#eab308", class: "bg-yellow-500" },
  { name: "Green", value: "#22c55e", class: "bg-green-500" },
  { name: "Blue", value: "#3b82f6", class: "bg-blue-500" },
  { name: "Purple", value: "#a855f7", class: "bg-purple-500" },
  { name: "Pink", value: "#ec4899", class: "bg-pink-500" },
  { name: "Teal", value: "#14b8a6", class: "bg-teal-500" },
  { name: "Indigo", value: "#6366f1", class: "bg-indigo-500" },
];

export const BorderTab: React.FC = () => {
  const {
    presentation,
    setPresentation,
    currentSlide
  } = usePresentationContext();

  const currentSlideData = presentation.slides[currentSlide - 1];

  const applySlideBorder = (borderStyle: string, borderColor: string = '#000000', borderWidth: number = 2) => {
    const borderValue = borderStyle === 'none' ? 'none' : `${borderWidth}px ${borderStyle} ${borderColor}`;

    setPresentation(prev => ({
      ...prev,
      slides: prev.slides.map((slide, index) =>
        index === currentSlide - 1
          ? {
              ...slide,
              style: {
                ...slide.style,
                border: borderValue,
                borderRadius: slide.style?.borderRadius || '0px'
              }
            }
          : slide
      )
    }));
  };

  const applySlideCornerRadius = (radius: number) => {
    setPresentation(prev => ({
      ...prev,
      slides: prev.slides.map((slide, index) =>
        index === currentSlide - 1
          ? {
              ...slide,
              style: {
                ...slide.style,
                borderRadius: `${radius}px`
              }
            }
          : slide
      )
    }));
  };

  return (
    <div className="space-y-4 max-h-full overflow-y-auto">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
        <p className="text-sm text-blue-800">
          <strong>Slide Borders:</strong> Apply borders to the entire slide canvas
        </p>
      </div>

      {/* Border Styles */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Slide Border Styles</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {borderStyles.map((border, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start h-auto p-3"
              onClick={() => {
                if (border.value === 'none') {
                  applySlideBorder('none');
                } else {
                  const parts = border.value.split(' ');
                  const width = parseInt(parts[0]);
                  const style = parts[1];
                  const color = parts[2] || '#000000';
                  applySlideBorder(style, color, width);
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

      {/* Border Colors */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Border Colors</h3>
        <div className="grid grid-cols-6 gap-1">
          {borderColors.map((color, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "w-6 h-6 rounded cursor-pointer border-2 hover:border-gray-400 transition-colors",
                    color.class
                  )}
                  onClick={() => applySlideBorder('solid', color.value, 2)}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{color.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Custom Border Color */}
        <div className="flex items-center gap-2 mt-3">
          <Label htmlFor="custom-border-color" className="text-sm">Custom:</Label>
          <input
            id="custom-border-color"
            type="color"
            className="w-6 h-6 rounded border border-gray-300 cursor-pointer"
            onChange={(e) => applySlideBorder('solid', e.target.value, 2)}
          />
        </div>
      </div>

      <Separator />

      {/* Border Width */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Border Width</h3>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 6, 8].map((width) => (
            <Button
              key={width}
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => applySlideBorder('solid', '#000000', width)}
            >
              {width}px
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Corner Radius */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Corner Radius</h3>
        <div className="flex gap-1">
          {[0, 4, 8, 12, 16, 24].map((radius) => (
            <Button
              key={radius}
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => applySlideCornerRadius(radius)}
            >
              {radius}px
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Slide Border Presets */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Slide Border Presets</h3>
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => {
              applySlideBorder('solid', '#3b82f6', 2);
              applySlideCornerRadius(8);
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-4 border-2 border-blue-500 rounded bg-blue-50" />
              <span className="text-sm">Professional Blue</span>
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => {
              applySlideBorder('solid', '#e5e7eb', 1);
              applySlideCornerRadius(4);
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-4 border border-gray-300 rounded bg-gray-50" />
              <span className="text-sm">Subtle Frame</span>
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => {
              applySlideBorder('solid', '#000000', 3);
              applySlideCornerRadius(0);
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-4 border-2 border-black bg-white" />
              <span className="text-sm">Bold Frame</span>
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => {
              applySlideBorder('dashed', '#6b7280', 2);
              applySlideCornerRadius(8);
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-4 border-2 border-dashed border-gray-500 rounded bg-gray-50" />
              <span className="text-sm">Dashed Border</span>
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => {
              applySlideBorder('double', '#8b5cf6', 3);
              applySlideCornerRadius(12);
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-4 border-4 border-double border-purple-500 rounded bg-purple-50" />
              <span className="text-sm">Elegant Double</span>
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => {
              applySlideBorder('none');
              applySlideCornerRadius(0);
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-4 bg-gray-100" />
              <span className="text-sm">No Border</span>
            </div>
          </Button>
        </div>
      </div>

      <Separator />

      {/* Current Slide Info */}
      <div className="bg-gray-50 rounded-lg p-3">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Current Slide</h4>
        <div className="text-xs text-gray-600">
          <p>Slide {currentSlide}</p>
          <p>Border: {currentSlideData?.style?.border || 'None'}</p>
          <p>Radius: {currentSlideData?.style?.borderRadius || '0px'}</p>
        </div>
      </div>
    </div>
  );
};
