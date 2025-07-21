import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { usePresentationContext } from '../PresentationContext';
import { TextColor } from '../types';

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

export const ColorTab: React.FC = () => {
  const { 
    selectedElement, 
    updateElement, 
    presentation, 
    currentSlide 
  } = usePresentationContext();

  const handleTextColorChange = (color: string) => {
    if (selectedElement) {
      updateElement(selectedElement, {
        style: { color }
      });
    }
  };

  const handleBackgroundColorChange = (backgroundColor: string) => {
    if (selectedElement) {
      updateElement(selectedElement, {
        style: { backgroundColor }
      });
    }
  };

  const clearBackground = () => {
    if (selectedElement) {
      updateElement(selectedElement, {
        style: { backgroundColor: 'transparent' }
      });
    }
  };

  const selectedElementData = selectedElement 
    ? presentation.slides[currentSlide - 1]?.elements.find(el => el.id === selectedElement)
    : null;

  return (
    <div className="space-y-4 max-h-full overflow-y-auto">
      {/* Text Color */}
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
                    selectedElementData?.style.color === color.value
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-gray-200"
                  )}
                  onClick={() => handleTextColorChange(color.value)}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{color.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        
        {/* Custom Text Color Picker */}
        <div className="flex items-center gap-2">
          <Label htmlFor="custom-text-color" className="text-sm">Custom:</Label>
          <input
            id="custom-text-color"
            type="color"
            className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
            onChange={(e) => handleTextColorChange(e.target.value)}
          />
        </div>
      </div>

      <Separator />

      {/* Background Color */}
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
                    selectedElementData?.style.backgroundColor === color.value
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-gray-200"
                  )}
                  onClick={() => handleBackgroundColorChange(color.value)}
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
            onChange={(e) => handleBackgroundColorChange(e.target.value)}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={clearBackground}
          >
            Clear
          </Button>
        </div>
      </div>

      <Separator />

      {/* Gradient Colors */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Gradient Colors</h3>
        <div className="grid grid-cols-3 gap-2">
          {[
            { name: "Blue Purple", value: "linear-gradient(45deg, #3b82f6, #8b5cf6)" },
            { name: "Green Blue", value: "linear-gradient(45deg, #10b981, #3b82f6)" },
            { name: "Purple Pink", value: "linear-gradient(45deg, #8b5cf6, #ec4899)" },
            { name: "Orange Red", value: "linear-gradient(45deg, #f97316, #ef4444)" },
            { name: "Yellow Orange", value: "linear-gradient(45deg, #eab308, #f97316)" },
            { name: "Teal Cyan", value: "linear-gradient(45deg, #14b8a6, #06b6d4)" },
          ].map((gradient, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className="aspect-square rounded cursor-pointer border-2 border-gray-200 hover:border-gray-400 transition-colors"
                  style={{ background: gradient.value }}
                  onClick={() => {
                    if (selectedElement) {
                      updateElement(selectedElement, {
                        style: { 
                          background: gradient.value,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }
                      });
                    }
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{gradient.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      <Separator />

      {/* Color Palettes */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Color Palettes</h3>
        <div className="space-y-3">
          {[
            { name: "Professional", colors: ["#1f2937", "#374151", "#6b7280", "#9ca3af", "#d1d5db"] },
            { name: "Vibrant", colors: ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6"] },
            { name: "Pastel", colors: ["#fecaca", "#fed7aa", "#fef3c7", "#bbf7d0", "#bfdbfe"] },
            { name: "Ocean", colors: ["#0c4a6e", "#0369a1", "#0284c7", "#0ea5e9", "#38bdf8"] },
          ].map((palette, paletteIndex) => (
            <div key={paletteIndex}>
              <div className="text-sm font-medium text-gray-700 mb-2">{palette.name}</div>
              <div className="flex gap-1">
                {palette.colors.map((color, colorIndex) => (
                  <div
                    key={colorIndex}
                    className="w-6 h-6 rounded cursor-pointer border border-gray-200 hover:border-gray-400 transition-colors"
                    style={{ backgroundColor: color }}
                    onClick={() => handleTextColorChange(color)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {!selectedElement && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">Select an element to change its colors</p>
        </div>
      )}
    </div>
  );
};
