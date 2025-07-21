import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Copy,
  Trash2,
  RotateCcw,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  Lock,
  Unlock,
  Eye,
  EyeOff,
} from 'lucide-react';
import { usePresentationContext } from '../PresentationContext';

export const ToolsTab: React.FC = () => {
  const { 
    selectedElement, 
    updateElement, 
    deleteElement,
    presentation,
    currentSlide 
  } = usePresentationContext();

  const selectedElementData = selectedElement 
    ? presentation.slides[currentSlide - 1]?.elements.find(el => el.id === selectedElement)
    : null;

  const handleAlignment = (alignment: string) => {
    if (!selectedElement) return;
    
    const alignmentMap = {
      'align-left': { textAlign: 'left' as const },
      'align-center': { textAlign: 'center' as const },
      'align-right': { textAlign: 'right' as const },
      'align-justify': { textAlign: 'justify' as const },
    };

    updateElement(selectedElement, {
      style: alignmentMap[alignment as keyof typeof alignmentMap]
    });
  };

  const handleTransform = (transform: string) => {
    if (!selectedElement) return;

    const transforms = {
      'rotate-left': 'rotate(-90deg)',
      'rotate-right': 'rotate(90deg)',
      'flip-horizontal': 'scaleX(-1)',
      'flip-vertical': 'scaleY(-1)',
      'reset': 'none'
    };

    updateElement(selectedElement, {
      style: { transform: transforms[transform as keyof typeof transforms] }
    });
  };

  const handleOpacity = (opacity: number[]) => {
    if (!selectedElement) return;
    
    updateElement(selectedElement, {
      style: { opacity: (opacity[0] / 100).toString() }
    });
  };

  const duplicateElement = () => {
    if (!selectedElement || !selectedElementData) return;

    const newElement = {
      ...selectedElementData,
      id: Date.now().toString(),
      x: selectedElementData.x + 20,
      y: selectedElementData.y + 20
    };

    console.log('Duplicate element:', newElement);
  };

  const currentOpacity = selectedElementData?.style.opacity 
    ? Math.round(parseFloat(selectedElementData.style.opacity) * 100)
    : 100;

  return (
    <div className="space-y-4 max-h-full overflow-y-auto">
      {/* Alignment */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Alignment</h3>
        <div className="grid grid-cols-4 gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAlignment('align-left')}
            disabled={!selectedElement}
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAlignment('align-center')}
            disabled={!selectedElement}
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAlignment('align-right')}
            disabled={!selectedElement}
          >
            <AlignRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAlignment('align-justify')}
            disabled={!selectedElement}
          >
            <AlignJustify className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Separator />

      {/* Transform */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Transform</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleTransform('rotate-left')}
            disabled={!selectedElement}
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Rotate Left
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleTransform('rotate-right')}
            disabled={!selectedElement}
          >
            <RotateCw className="h-4 w-4 mr-1" />
            Rotate Right
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleTransform('flip-horizontal')}
            disabled={!selectedElement}
          >
            <FlipHorizontal className="h-4 w-4 mr-1" />
            Flip H
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleTransform('flip-vertical')}
            disabled={!selectedElement}
          >
            <FlipVertical className="h-4 w-4 mr-1" />
            Flip V
          </Button>
        </div>
        <Button
          variant="outline"
          className="w-full mt-2"
          onClick={() => handleTransform('reset')}
          disabled={!selectedElement}
        >
          Reset Transform
        </Button>
      </div>

      <Separator />

      {/* Opacity */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Opacity</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm">Transparency</Label>
            <span className="text-sm text-gray-500">{currentOpacity}%</span>
          </div>
          <Slider
            value={[currentOpacity]}
            onValueChange={handleOpacity}
            max={100}
            min={0}
            step={5}
            disabled={!selectedElement}
            className="w-full"
          />
        </div>
      </div>

      <Separator />

      {/* Element Actions */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Element Actions</h3>
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={duplicateElement}
            disabled={!selectedElement}
          >
            <Copy className="h-4 w-4 mr-2" />
            Duplicate
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 hover:text-red-700"
            onClick={() => selectedElement && deleteElement(selectedElement)}
            disabled={!selectedElement}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <Separator />

      {/* Layer Controls */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Layer Controls</h3>
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            disabled={!selectedElement}
          >
            <Lock className="h-4 w-4 mr-2" />
            Lock Element
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start"
            disabled={!selectedElement}
          >
            <Eye className="h-4 w-4 mr-2" />
            Hide Element
          </Button>
        </div>
      </div>

      <Separator />

      {/* Position & Size */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Position & Size</h3>
        {selectedElementData ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">X Position</Label>
                <div className="text-sm font-mono bg-gray-50 p-1 rounded">
                  {Math.round(selectedElementData.x)}px
                </div>
              </div>
              <div>
                <Label className="text-xs">Y Position</Label>
                <div className="text-sm font-mono bg-gray-50 p-1 rounded">
                  {Math.round(selectedElementData.y)}px
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Width</Label>
                <div className="text-sm font-mono bg-gray-50 p-1 rounded">
                  {Math.round(selectedElementData.width)}px
                </div>
              </div>
              <div>
                <Label className="text-xs">Height</Label>
                <div className="text-sm font-mono bg-gray-50 p-1 rounded">
                  {Math.round(selectedElementData.height)}px
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-500">
            Select an element to view position and size
          </div>
        )}
      </div>

      {!selectedElement && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">Select an element to use tools</p>
        </div>
      )}
    </div>
  );
};
