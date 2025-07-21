import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Type,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePresentationContext } from '../PresentationContext';
import { TextStyle, FontFamily, FontSize } from '../types';

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

export const TextTab: React.FC = () => {
  const { 
    addTextElement, 
    selectedElement, 
    updateElement, 
    presentation, 
    currentSlide 
  } = usePresentationContext();

  const handleAddTextStyle = (style: TextStyle) => {
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
    
    addTextElement(style.example);
  };

  const handleFontFamilyChange = (fontFamily: string) => {
    if (selectedElement) {
      updateElement(selectedElement, {
        style: { fontFamily }
      });
    }
  };

  const handleFontSizeChange = (fontSize: number) => {
    if (selectedElement) {
      updateElement(selectedElement, {
        style: { fontSize }
      });
    }
  };

  const handleFormatting = (property: string, value: any) => {
    if (selectedElement) {
      updateElement(selectedElement, {
        style: { [property]: value }
      });
    }
  };

  const toggleBold = () => {
    if (selectedElement) {
      const currentElement = presentation.slides[currentSlide - 1]?.elements
        .find(el => el.id === selectedElement);
      const isBold = currentElement?.style.fontWeight === 'bold';
      handleFormatting('fontWeight', isBold ? 'normal' : 'bold');
    }
  };

  const toggleItalic = () => {
    if (selectedElement) {
      handleFormatting('fontStyle', 'italic');
    }
  };

  const toggleUnderline = () => {
    if (selectedElement) {
      handleFormatting('textDecoration', 'underline');
    }
  };

  return (
    <div className="space-y-4 max-h-full overflow-y-auto">
      {/* Text Styles */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Text Styles</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {textStyles.map((style, index) => (
            <Button
              key={index}
              className="w-full justify-start h-auto p-3"
              variant="outline"
              onClick={() => handleAddTextStyle(style)}
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

      {/* Font Family */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Font Family</h3>
        <div className="space-y-1 max-h-40 overflow-y-auto">
          {fontFamilies.map((font, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start h-auto p-2"
              style={{ fontFamily: font.value }}
              onClick={() => handleFontFamilyChange(font.value)}
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

      {/* Font Size */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Font Size</h3>
        <div className="grid grid-cols-3 gap-1 max-h-32 overflow-y-auto">
          {fontSizes.map((size, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => handleFontSizeChange(size.value)}
            >
              {size.display}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Text Formatting */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Text Formatting</h3>
        <div className="flex gap-2 mb-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleBold}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleItalic}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleUnderline}
          >
            <Underline className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleFormatting('textAlign', 'left')}
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleFormatting('textAlign', 'center')}
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleFormatting('textAlign', 'right')}
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Separator />

      {/* Line Height & Spacing */}
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
                  onClick={() => handleFormatting('lineHeight', height.toString())}
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
                  onClick={() => handleFormatting('letterSpacing', spacing)}
                >
                  {spacing}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Text Transform */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Text Transform</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFormatting('textTransform', 'uppercase')}
          >
            UPPERCASE
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFormatting('textTransform', 'lowercase')}
          >
            lowercase
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFormatting('textTransform', 'capitalize')}
          >
            Capitalize
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFormatting('textTransform', 'none')}
          >
            Normal
          </Button>
        </div>
      </div>
    </div>
  );
};
