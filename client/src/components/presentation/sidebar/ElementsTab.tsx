import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Square,
  Circle,
  Triangle,
  Star,
  Heart,
  Zap,
  Minus,
  Hexagon,
  Diamond,
  Pentagon,
} from 'lucide-react';
import { usePresentationContext } from '../PresentationContext';

export const ElementsTab: React.FC = () => {
  const { addShapeElement } = usePresentationContext();

  return (
    <div className="space-y-4 max-h-full overflow-y-auto">
      {/* Basic Shapes */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Basic Shapes</h3>
        <div className="grid grid-cols-4 gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <div 
                className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => addShapeElement('rectangle')}
              >
                <Square className="h-6 w-6 text-gray-600" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Rectangle</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div 
                className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => addShapeElement('circle')}
              >
                <Circle className="h-6 w-6 text-gray-600" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Circle</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div 
                className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => addShapeElement('triangle')}
              >
                <Triangle className="h-6 w-6 text-gray-600" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Triangle</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div 
                className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => addShapeElement('line')}
              >
                <Minus className="h-6 w-6 text-gray-600" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Line</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <Separator />

      {/* More Shapes */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">More Shapes</h3>
        <div className="grid grid-cols-4 gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <div 
                className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => addShapeElement('star')}
              >
                <Star className="h-6 w-6 text-gray-600" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Star</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div 
                className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => addShapeElement('heart')}
              >
                <Heart className="h-6 w-6 text-gray-600" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Heart</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => addShapeElement('lightning')}
              >
                <Zap className="h-6 w-6 text-gray-600" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Lightning</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => addShapeElement('hexagon')}
              >
                <Hexagon className="h-6 w-6 text-gray-600" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Hexagon</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => addShapeElement('diamond')}
              >
                <Diamond className="h-6 w-6 text-gray-600" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Diamond</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => addShapeElement('pentagon')}
              >
                <Pentagon className="h-6 w-6 text-gray-600" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Pentagon</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <Separator />

      {/* Lines & Arrows */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Lines & Arrows</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="h-12 justify-start"
            onClick={() => addShapeElement('arrow-right')}
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 bg-gray-600"></div>
              <span className="text-sm">→</span>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-12 justify-start"
            onClick={() => addShapeElement('arrow-left')}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">←</span>
              <div className="w-6 h-0.5 bg-gray-600"></div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-12 justify-start"
            onClick={() => addShapeElement('arrow-up')}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm">↑</span>
              <div className="w-0.5 h-4 bg-gray-600"></div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-12 justify-start"
            onClick={() => addShapeElement('arrow-down')}
          >
            <div className="flex flex-col items-center gap-1">
              <div className="w-0.5 h-4 bg-gray-600"></div>
              <span className="text-sm">↓</span>
            </div>
          </Button>
        </div>
      </div>

      <Separator />

      {/* Frames */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Frames</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="h-16 justify-center"
            onClick={() => addShapeElement('frame-square')}
          >
            <div className="border-2 border-gray-400 w-8 h-8 rounded"></div>
          </Button>

          <Button
            variant="outline"
            className="h-16 justify-center"
            onClick={() => addShapeElement('frame-circle')}
          >
            <div className="border-2 border-gray-400 w-8 h-8 rounded-full"></div>
          </Button>

          <Button
            variant="outline"
            className="h-16 justify-center"
            onClick={() => addShapeElement('frame-rounded')}
          >
            <div className="border-2 border-gray-400 w-8 h-6 rounded-lg"></div>
          </Button>

          <Button
            variant="outline"
            className="h-16 justify-center"
            onClick={() => addShapeElement('frame-oval')}
          >
            <div className="border-2 border-gray-400 w-8 h-5 rounded-full"></div>
          </Button>
        </div>
      </div>
    </div>
  );
};
