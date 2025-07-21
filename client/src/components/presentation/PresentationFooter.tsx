import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import {
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Copy,
  Trash2,
} from 'lucide-react';
import { usePresentationContext } from './PresentationContext';

export const PresentationFooter: React.FC = () => {
  const {
    presentation,
    currentSlide,
    setCurrentSlide,
    totalSlides,
    zoomLevel,
    setZoomLevel,
    addNewSlide,
    deleteSlide,
    duplicateSlide,
    zoomIn,
    zoomOut,
    resetZoom,
  } = usePresentationContext();

  const handleSlideNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentSlide > 1) {
      setCurrentSlide(currentSlide - 1);
    } else if (direction === 'next' && currentSlide < totalSlides) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleSlideInput = (value: string) => {
    const slideNumber = parseInt(value);
    if (slideNumber >= 1 && slideNumber <= totalSlides) {
      setCurrentSlide(slideNumber);
    }
  };

  const handleZoomChange = (value: number[]) => {
    setZoomLevel(value[0]);
  };

  return (
    <footer className="bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between flex-shrink-0">
      {/* Left Section - Slide Navigation */}
      <div className="flex items-center gap-4">
        {/* Slide Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSlideNavigation('prev')}
            disabled={currentSlide <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={currentSlide}
              onChange={(e) => handleSlideInput(e.target.value)}
              className="w-16 text-center"
              min={1}
              max={totalSlides}
            />
            <span className="text-sm text-gray-500">of {totalSlides}</span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSlideNavigation('next')}
            disabled={currentSlide >= totalSlides}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Slide Actions */}
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={addNewSlide}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Slide
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => duplicateSlide(currentSlide - 1)}
          >
            <Copy className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => deleteSlide(currentSlide - 1)}
            disabled={totalSlides <= 1}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Center Section - Slide Thumbnails */}
      <div className="flex-1 flex items-center justify-center max-w-md mx-8">
        <div className="flex gap-2 overflow-x-auto py-2">
          {presentation.slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`
                relative flex-shrink-0 w-16 h-9 rounded border-2 cursor-pointer transition-all
                ${currentSlide === index + 1 
                  ? 'border-blue-500 ring-2 ring-blue-200' 
                  : 'border-gray-200 hover:border-gray-400'
                }
              `}
              onClick={() => setCurrentSlide(index + 1)}
            >
              <div 
                className={`w-full h-full rounded ${slide.background || 'bg-white'}`}
              >
                {/* Mini preview of slide elements */}
                {slide.elements.slice(0, 3).map((element, elemIndex) => (
                  <div
                    key={element.id}
                    className="absolute bg-gray-400 rounded-sm"
                    style={{
                      left: `${(element.x / 800) * 100}%`,
                      top: `${(element.y / 450) * 100}%`,
                      width: `${Math.max(2, (element.width / 800) * 100)}%`,
                      height: `${Math.max(1, (element.height / 450) * 100)}%`,
                    }}
                  />
                ))}
              </div>
              
              {/* Slide number */}
              <div className="absolute -bottom-1 -right-1 bg-white border border-gray-300 rounded text-xs px-1 leading-none">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section - Zoom Controls */}
      <div className="flex items-center gap-4">
        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={zoomOut}
            disabled={zoomLevel <= 25}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-2 min-w-32">
            <Slider
              value={[zoomLevel]}
              onValueChange={handleZoomChange}
              min={25}
              max={200}
              step={25}
              className="flex-1"
            />
            <span className="text-sm text-gray-600 min-w-12 text-center">
              {zoomLevel}%
            </span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={zoomIn}
            disabled={zoomLevel >= 200}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={resetZoom}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* View Options */}
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoomLevel(50)}
          >
            Fit
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoomLevel(100)}
          >
            100%
          </Button>
        </div>
      </div>
    </footer>
  );
};
