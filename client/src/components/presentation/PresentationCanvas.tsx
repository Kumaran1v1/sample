import React, { useRef, useCallback, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Textarea } from '@/components/ui/textarea';
import { Copy, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePresentationContext } from './PresentationContext';
import { SlideElement } from './types';

export const PresentationCanvas: React.FC = () => {
  const {
    presentation,
    setPresentation,
    currentSlide,
    zoomLevel,
    selectedElement,
    setSelectedElement,
    isTextEditing,
    setIsTextEditing,
    editMode,
    isDragging,
    setIsDragging,
    isResizing,
    setIsResizing,
    updateElement,
    deleteElement,
    addTextElement,
  } = usePresentationContext();

  const canvasRef = useRef<HTMLDivElement>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);

  // Drag and drop functionality
  const handleMouseDown = useCallback((e: React.MouseEvent, elementId: string) => {
    e.stopPropagation();
    setSelectedElement(elementId);
    setIsDragging(true);
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setDragStart({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  }, [setSelectedElement, setIsDragging]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !selectedElement || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    const deltaX = (currentX - dragStart.x) / (zoomLevel / 100);
    const deltaY = (currentY - dragStart.y) / (zoomLevel / 100);

    const currentElement = presentation.slides[currentSlide - 1]?.elements
      .find(el => el.id === selectedElement);
    
    if (currentElement) {
      const newX = Math.max(0, Math.min(800 - currentElement.width, currentElement.x + deltaX));
      const newY = Math.max(0, Math.min(450 - currentElement.height, currentElement.y + deltaY));
      
      updateElement(selectedElement, { x: newX, y: newY });
      setDragStart({ x: currentX, y: currentY });
    }
  }, [isDragging, selectedElement, dragStart, zoomLevel, currentSlide, presentation.slides, updateElement]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeHandle(null);
  }, [setIsDragging, setIsResizing]);

  // Resize functionality
  const handleResizeStart = useCallback((e: React.MouseEvent, handle: string) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeHandle(handle);
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setDragStart({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  }, [setIsResizing]);

  const handleResize = useCallback((e: React.MouseEvent) => {
    if (!isResizing || !selectedElement || !resizeHandle || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    const deltaX = (currentX - dragStart.x) / (zoomLevel / 100);
    const deltaY = (currentY - dragStart.y) / (zoomLevel / 100);

    const currentElement = presentation.slides[currentSlide - 1]?.elements
      .find(el => el.id === selectedElement);
    
    if (currentElement) {
      let updates: Partial<SlideElement> = {};
      
      switch (resizeHandle) {
        case 'se': // Southeast
          updates = {
            width: Math.max(20, currentElement.width + deltaX),
            height: Math.max(20, currentElement.height + deltaY)
          };
          break;
        case 'sw': // Southwest
          updates = {
            x: currentElement.x + deltaX,
            width: Math.max(20, currentElement.width - deltaX),
            height: Math.max(20, currentElement.height + deltaY)
          };
          break;
        case 'ne': // Northeast
          updates = {
            y: currentElement.y + deltaY,
            width: Math.max(20, currentElement.width + deltaX),
            height: Math.max(20, currentElement.height - deltaY)
          };
          break;
        case 'nw': // Northwest
          updates = {
            x: currentElement.x + deltaX,
            y: currentElement.y + deltaY,
            width: Math.max(20, currentElement.width - deltaX),
            height: Math.max(20, currentElement.height - deltaY)
          };
          break;
      }
      
      updateElement(selectedElement, updates);
      setDragStart({ x: currentX, y: currentY });
    }
  }, [isResizing, selectedElement, resizeHandle, dragStart, zoomLevel, currentSlide, presentation.slides, updateElement]);

  const currentSlideData = presentation.slides[currentSlide - 1];

  return (
    <div className="flex-1 flex flex-col bg-gray-100 overflow-hidden">
      {/* Canvas Container */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
        <Card 
          className="shadow-lg"
          style={{ 
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'center center'
          }}
        >
          <CardContent
            ref={canvasRef}
            className={cn(
              "p-0 h-[450px] w-[800px] relative overflow-hidden cursor-pointer",
              currentSlideData?.background || "bg-white"
            )}
            style={{
              border: currentSlideData?.style?.border || 'none',
              borderRadius: currentSlideData?.style?.borderRadius || '8px',
              padding: currentSlideData?.style?.padding || '0px',
            }}
            onMouseMove={(e) => {
              if (isDragging) {
                handleMouseMove(e);
              } else if (isResizing) {
                handleResize(e);
              }
            }}
            onMouseUp={handleMouseUp}
            onClick={(e) => {
              if (editMode === 'edit' && e.target === e.currentTarget) {
                // Clicked on empty canvas - add text element
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / (zoomLevel / 100)) - 100;
                const y = ((e.clientY - rect.top) / (zoomLevel / 100)) - 25;

                addTextElement('Click to edit text');
              }
            }}
          >
            {/* Render Elements */}
            {currentSlideData?.elements.map((element) => (
              <div
                key={element.id}
                className={cn(
                  "absolute border-2 select-none",
                  selectedElement === element.id 
                    ? "border-blue-500 border-dashed" 
                    : "border-transparent hover:border-gray-300",
                  isDragging && selectedElement === element.id ? "cursor-grabbing" : "cursor-grab"
                )}
                style={{
                  left: element.x,
                  top: element.y,
                  width: element.width,
                  height: element.height,
                  fontSize: element.style.fontSize,
                  fontWeight: element.style.fontWeight,
                  fontFamily: element.style.fontFamily,
                  fontStyle: element.style.fontStyle,
                  textDecoration: element.style.textDecoration,
                  textAlign: element.style.textAlign,
                  textTransform: element.style.textTransform,
                  textShadow: element.style.textShadow,
                  lineHeight: element.style.lineHeight,
                  letterSpacing: element.style.letterSpacing,
                  color: element.style.color,
                  backgroundColor: element.style.backgroundColor,
                  background: element.style.background,
                  borderRadius: element.style.borderRadius,
                  border: element.style.border,
                  padding: element.style.padding,
                  filter: element.style.filter,
                  animation: element.style.animation,
                  transform: element.style.transform,
                  opacity: element.style.opacity,
                  WebkitBackgroundClip: element.style.WebkitBackgroundClip,
                  WebkitTextFillColor: element.style.WebkitTextFillColor,
                  backgroundClip: element.style.backgroundClip,
                } as React.CSSProperties}
                onMouseDown={(e) => handleMouseDown(e, element.id)}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedElement(element.id);
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  if (element.type === 'text') {
                    setIsTextEditing(true);
                  }
                }}
              >
                {/* Element Content */}
                {element.type === 'text' && (
                  isTextEditing && selectedElement === element.id ? (
                    <Textarea
                      value={element.content}
                      onChange={(e) => updateElement(element.id, { content: e.target.value })}
                      onBlur={() => setIsTextEditing(false)}
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                          setIsTextEditing(false);
                        }
                      }}
                      className="w-full h-full border-none bg-transparent resize-none"
                      autoFocus
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {element.content}
                    </div>
                  )
                )}

                {element.type === 'shape' && (
                  <div className="w-full h-full" />
                )}

                {element.type === 'image' && (
                  <img 
                    src={element.content} 
                    alt="Slide element" 
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                )}

                {/* Selection handles */}
                {selectedElement === element.id && (
                  <>
                    <div 
                      className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-full cursor-nw-resize border-2 border-white shadow-sm"
                      onMouseDown={(e) => handleResizeStart(e, 'nw')}
                    ></div>
                    <div 
                      className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full cursor-ne-resize border-2 border-white shadow-sm"
                      onMouseDown={(e) => handleResizeStart(e, 'ne')}
                    ></div>
                    <div 
                      className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 rounded-full cursor-sw-resize border-2 border-white shadow-sm"
                      onMouseDown={(e) => handleResizeStart(e, 'sw')}
                    ></div>
                    <div 
                      className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full cursor-se-resize border-2 border-white shadow-sm"
                      onMouseDown={(e) => handleResizeStart(e, 'se')}
                    ></div>
                    
                    {/* Element toolbar */}
                    <div className="absolute -top-10 left-0 flex gap-1 bg-white rounded shadow-lg border p-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-6 h-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Duplicate element
                          const newElement = {
                            ...element,
                            id: Date.now().toString(),
                            x: element.x + 20,
                            y: element.y + 20
                          };
                          setPresentation(prev => ({
                            ...prev,
                            slides: prev.slides.map((slide, index) => 
                              index === currentSlide - 1 
                                ? { ...slide, elements: [...slide.elements, newElement] }
                                : slide
                            )
                          }));
                          setSelectedElement(newElement.id);
                        }}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-6 h-6 p-0 text-red-600 hover:text-red-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteElement(element.id);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
