import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { usePresentationContext } from '../PresentationContext';

const brandColors = [
  { name: "Primary Blue", value: "#3b82f6", class: "bg-blue-500" },
  { name: "Secondary Purple", value: "#8b5cf6", class: "bg-violet-500" },
  { name: "Accent Green", value: "#10b981", class: "bg-emerald-500" },
  { name: "Warning Orange", value: "#f59e0b", class: "bg-amber-500" },
  { name: "Error Red", value: "#ef4444", class: "bg-red-500" },
  { name: "Success Green", value: "#22c55e", class: "bg-green-500" },
  { name: "Dark Gray", value: "#374151", class: "bg-gray-700" },
  { name: "Light Gray", value: "#9ca3af", class: "bg-gray-400" },
];

const brandFonts = [
  { name: "Inter", value: "Inter, sans-serif", category: "Primary" },
  { name: "Roboto", value: "Roboto, sans-serif", category: "Secondary" },
  { name: "Open Sans", value: "Open Sans, sans-serif", category: "Body" },
  { name: "Playfair Display", value: "Playfair Display, serif", category: "Accent" },
];

const textPresets = [
  { name: "Brand Heading", fontSize: 48, fontWeight: "bold", color: "#3b82f6" },
  { name: "Section Title", fontSize: 32, fontWeight: "semibold", color: "#374151" },
  { name: "Body Text", fontSize: 16, fontWeight: "normal", color: "#6b7280" },
  { name: "Caption", fontSize: 14, fontWeight: "normal", color: "#9ca3af" },
  { name: "Accent Text", fontSize: 18, fontWeight: "medium", color: "#8b5cf6" },
];

export const BrandTab: React.FC = () => {
  const { selectedElement, updateElement } = usePresentationContext();

  const handleColorChange = (color: string) => {
    if (selectedElement) {
      updateElement(selectedElement, {
        style: { color }
      });
    }
  };

  const handleFontChange = (fontFamily: string) => {
    if (selectedElement) {
      updateElement(selectedElement, {
        style: { fontFamily }
      });
    }
  };

  const handlePresetChange = (preset: typeof textPresets[0]) => {
    if (selectedElement) {
      updateElement(selectedElement, {
        style: {
          fontSize: preset.fontSize,
          fontWeight: preset.fontWeight,
          color: preset.color,
          fontFamily: 'Inter, sans-serif'
        }
      });
    }
  };

  return (
    <div className="space-y-4 max-h-full overflow-y-auto">
      {/* Brand Colors */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Brand Colors</h3>
        <div className="grid grid-cols-4 gap-2">
          {brandColors.map((color, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "aspect-square rounded-lg cursor-pointer border-2 hover:border-gray-400 transition-colors",
                    color.class
                  )}
                  onClick={() => handleColorChange(color.value)}
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

      {/* Brand Fonts */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Brand Fonts</h3>
        <div className="space-y-2">
          {brandFonts.map((font, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start h-auto p-3"
              style={{ fontFamily: font.value }}
              onClick={() => handleFontChange(font.value)}
            >
              <div className="text-left">
                <div className="font-medium">{font.name}</div>
                <div className="text-sm text-gray-500">{font.category}</div>
                <div className="text-sm text-gray-600 mt-1">The quick brown fox</div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Text Presets */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Text Presets</h3>
        <div className="space-y-2">
          {textPresets.map((preset, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start h-auto p-3"
              onClick={() => handlePresetChange(preset)}
            >
              <div className="text-left">
                <div className="font-medium text-sm">{preset.name}</div>
                <div 
                  className="mt-1"
                  style={{ 
                    fontSize: Math.min(preset.fontSize * 0.4, 14),
                    fontWeight: preset.fontWeight,
                    color: preset.color
                  }}
                >
                  Sample text
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Logo & Assets */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Brand Assets</h3>
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => console.log('Upload logo')}
          >
            📷 Upload Logo
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => console.log('Brand guidelines')}
          >
            📋 Brand Guidelines
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => console.log('Color palette')}
          >
            🎨 Color Palette
          </Button>
        </div>
      </div>

      <Separator />

      {/* Brand Templates */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Brand Templates</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: "Corporate", gradient: "bg-gradient-to-br from-blue-600 to-blue-800" },
            { name: "Creative", gradient: "bg-gradient-to-br from-purple-500 to-pink-500" },
            { name: "Minimal", gradient: "bg-gradient-to-br from-gray-100 to-gray-300" },
            { name: "Bold", gradient: "bg-gradient-to-br from-red-500 to-orange-500" },
          ].map((template, index) => (
            <div
              key={index}
              className={cn(
                "aspect-video rounded-lg cursor-pointer border-2 border-gray-200 hover:border-gray-400 transition-colors flex items-center justify-center",
                template.gradient
              )}
              onClick={() => console.log('Apply template:', template.name)}
            >
              <span className="text-white text-xs font-medium">{template.name}</span>
            </div>
          ))}
        </div>
      </div>

      {!selectedElement && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">Select an element to apply brand styles</p>
        </div>
      )}
    </div>
  );
};
