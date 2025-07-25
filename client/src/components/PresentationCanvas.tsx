import { useRef, useCallback, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SlideElement, Presentation } from "@/components/presentation/types";
import { Trash2, Copy, Edit3 } from "lucide-react";

interface PresentationCanvasProps {
  presentation: Presentation;
  setPresentation: React.Dispatch<React.SetStateAction<Presentation>>;
  currentSlide: number;
  zoomLevel: number;
  selectedElement: string | null;
  setSelectedElement: React.Dispatch<React.SetStateAction<string | null>>;
  isTextEditing: boolean;
  setIsTextEditing: React.Dispatch<React.SetStateAction<boolean>>;
  editMode: 'edit' | 'view' | 'comment';
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  isResizing: boolean;
  setIsResizing: React.Dispatch<React.SetStateAction<boolean>>;
  dragStart: { x: number; y: number };
  setDragStart: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  resizeHandle: string | null;
  setResizeHandle: React.Dispatch<React.SetStateAction<string | null>>;
  updateElement: (elementId: string, updates: Partial<SlideElement>) => void;
  handleMouseDown: (e: React.MouseEvent, elementId: string) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseUp: () => void;
  handleResizeStart: (e: React.MouseEvent, handle: string) => void;
  handleResize: (e: React.MouseEvent) => void;
  handleRotationStart: (e: React.MouseEvent) => void;
  handleRotation: (e: React.MouseEvent) => void;
  rotateElement: (degrees: number) => void;
  deleteElement: (elementId: string) => void;
}

export default function PresentationCanvas({
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
  isResizing,
  updateElement,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleResizeStart,
  handleResize,
  handleRotationStart,
  handleRotation,
  rotateElement,
  deleteElement,
}: PresentationCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [contextMenu, setContextMenu] = useState<{
    show: boolean;
    x: number;
    y: number;
    elementId: string | null;
  }>({ show: false, x: 0, y: 0, elementId: null });

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (editMode === 'edit' && e.target === e.currentTarget) {
      // Clicked on empty canvas - add text element
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / (zoomLevel / 100)) - 100;
      const y = ((e.clientY - rect.top) / (zoomLevel / 100)) - 25;

      const newElement: SlideElement = {
        id: Date.now().toString(),
        type: 'text',
        content: 'Click to edit text',
        x: Math.max(0, x),
        y: Math.max(0, y),
        width: 200,
        height: 50,
        style: {
          fontSize: 16,
          fontWeight: 'normal',
          color: '#000000'
        }
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
    }
  }, [editMode, zoomLevel, currentSlide, setPresentation, setSelectedElement]);

  const handleContextMenu = useCallback((e: React.MouseEvent, elementId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY,
      elementId: elementId
    });
    setSelectedElement(elementId);
  }, [setSelectedElement]);

  const renderResizeHandles = (element: SlideElement) => {
    if (selectedElement !== element.id || editMode !== 'edit') return null;

    const handles = ['nw', 'ne', 'sw', 'se'];
    return (
      <>
        {/* Resize handles */}
        {handles.map(handle => (
          <div
            key={handle}
            className={cn(
              "absolute w-2 h-2 bg-blue-500 border border-white cursor-pointer z-20",
              handle === 'nw' && "-top-1 -left-1 cursor-nw-resize",
              handle === 'ne' && "-top-1 -right-1 cursor-ne-resize",
              handle === 'sw' && "-bottom-1 -left-1 cursor-sw-resize",
              handle === 'se' && "-bottom-1 -right-1 cursor-se-resize"
            )}
            onMouseDown={(e) => {
              e.stopPropagation();
              handleResizeStart(e, handle);
            }}
          />
        ))}

        {/* Rotation handle */}
        <div
          className="absolute w-3 h-3 bg-green-500 border border-white rounded-full cursor-pointer z-20"
          style={{
            top: '-20px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            handleRotationStart(e);
          }}
          title="Drag to rotate"
        />

        {/* Rotation buttons */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex gap-1 bg-white rounded shadow-lg p-1 z-20">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              rotateElement(-15);
            }}
            title="Rotate left 15°"
          >
            ↺
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              rotateElement(15);
            }}
            title="Rotate right 15°"
          >
            ↻
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              rotateElement(-90);
            }}
            title="Rotate left 90°"
          >
            ⟲
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              rotateElement(90);
            }}
            title="Rotate right 90°"
          >
            ⟳
          </Button>
        </div>
      </>
    );
  };

  return (
    <div className="flex-1 bg-gray-100 p-8 flex items-center justify-center overflow-auto">
      <Card
        className="w-full max-w-4xl aspect-video shadow-2xl border-2 border-purple-200"
        style={{ transform: `scale(${zoomLevel / 100})` }}
      >
        <CardContent
          ref={canvasRef}
          data-canvas="true"
          className={cn(
            "p-0 h-full rounded-lg relative overflow-hidden cursor-pointer",
            presentation.slides[currentSlide - 1]?.background || "bg-white"
          )}
          style={{
            border: presentation.slides[currentSlide - 1]?.border || 'none',
            borderRadius: presentation.slides[currentSlide - 1]?.borderRadius || '8px',
            boxShadow: presentation.slides[currentSlide - 1]?.style?.boxShadow || 'none'
          }}
          onMouseMove={(e) => {
            if (isDragging) {
              handleMouseMove(e);
            } else if (isResizing) {
              handleResize(e);
            }
          }}
          onMouseUp={handleMouseUp}
          onClick={handleCanvasClick}
        >
          {/* Render slide elements */}
          {presentation.slides[currentSlide - 1]?.elements.map((element) => (
            <div
              key={element.id}
              className={cn(
                "absolute border-2 select-none group transition-all",
                selectedElement === element.id
                  ? "border-blue-500 border-dashed shadow-lg z-10"
                  : "border-transparent hover:border-gray-300",
                isDragging && selectedElement === element.id
                  ? "cursor-grabbing opacity-80 scale-105"
                  : "cursor-grab hover:shadow-md"
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
                backgroundColor: element.type !== 'shape' ? element.style.backgroundColor : 'transparent',
                background: element.type !== 'shape' ? element.style.background : undefined,
                borderRadius: element.type !== 'shape' ? element.style.borderRadius : undefined,
                border: element.type !== 'shape' ? element.style.border : 'none',
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
              onContextMenu={(e) => handleContextMenu(e, element.id)}
              onDoubleClick={(e) => {
                e.stopPropagation();
                if (element.type === 'text') {
                  setIsTextEditing(true);
                }
              }}
            >
              {element.type === 'text' && (
                <div className="w-full h-full flex items-center justify-center p-2">
                  {isTextEditing && selectedElement === element.id ? (
                    <Textarea
                      value={element.content}
                      onChange={(e) => updateElement(element.id, { content: e.target.value })}
                      onBlur={() => setIsTextEditing(false)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          setIsTextEditing(false);
                        }
                      }}
                      className="w-full h-full resize-none border-none bg-transparent"
                      autoFocus
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {element.content}
                    </div>
                  )}
                </div>
              )}

              {element.type === 'shape' && (
                <div className="w-full h-full relative">

                  {/* Rectangle */}
                  {element.content === 'rectangle' && (
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundColor: element.style.backgroundColor || 'transparent',
                        borderRadius: element.style.borderRadius || '0px',
                        border: element.style.border || '2px solid #000000',
                        borderColor: element.style.borderColor || '#000000'
                      }}
                    />
                  )}

                  {/* Circle */}
                  {element.content === 'circle' && (
                    <div
                      className="w-full h-full rounded-full"
                      style={{
                        backgroundColor: element.style.backgroundColor || 'transparent',
                        border: element.style.border || '2px solid #000000',
                        borderColor: element.style.borderColor || '#000000'
                      }}
                    />
                  )}

                  {/* Triangle */}
                  {element.content === 'triangle' && (
                    <div className="w-full h-full relative">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 100 100"
                        className="absolute inset-0"
                      >
                        <path
                          d="M50 10 L85 80 L15 80 Z"
                          fill={element.style.backgroundColor || 'transparent'}
                          stroke={element.style.borderColor || '#000000'}
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Arrow Right */}
                  {(element.content === 'arrow' || element.content === 'arrow right') && (
                    <div className="w-full h-full relative">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 100 100"
                        className="absolute inset-0"
                      >
                        <path
                          d="M10 50 L70 50 L60 35 L85 50 L60 65 L70 50"
                          fill={element.style.backgroundColor || 'transparent'}
                          stroke={element.style.borderColor || '#000000'}
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Arrow Left */}
                  {element.content === 'arrow left' && (
                    <div className="w-full h-full relative">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 100 100"
                        className="absolute inset-0"
                      >
                        <path
                          d="M90 50 L30 50 L40 35 L15 50 L40 65 L30 50"
                          fill={element.style.backgroundColor || 'transparent'}
                          stroke={element.style.borderColor || '#000000'}
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Arrow Up */}
                  {element.content === 'arrow up' && (
                    <div className="w-full h-full relative">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 100 100"
                        className="absolute inset-0"
                      >
                        <path
                          d="M50 90 L50 30 L35 40 L50 15 L65 40 L50 30"
                          fill={element.style.backgroundColor || 'transparent'}
                          stroke={element.style.borderColor || '#000000'}
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Arrow Down */}
                  {element.content === 'arrow down' && (
                    <div className="w-full h-full relative">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 100 100"
                        className="absolute inset-0"
                      >
                        <path
                          d="M50 10 L50 70 L35 60 L50 85 L65 60 L50 70"
                          fill={element.style.backgroundColor || 'transparent'}
                          stroke={element.style.borderColor || '#000000'}
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Double Arrow */}
                  {element.content === 'double arrow' && (
                    <div className="w-full h-full relative">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 100 100"
                        className="absolute inset-0"
                      >
                        <path
                          d="M10 50 L25 35 L25 45 L75 45 L75 35 L90 50 L75 65 L75 55 L25 55 L25 65 Z"
                          fill={element.style.backgroundColor || 'transparent'}
                          stroke={element.style.borderColor || '#000000'}
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Block Arrow */}
                  {element.content === 'block arrow' && (
                    <div className="w-full h-full relative">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 100 100"
                        className="absolute inset-0"
                      >
                        <path
                          d="M10 35 L60 35 L60 25 L85 50 L60 75 L60 65 L10 65 Z"
                          fill={element.style.backgroundColor || 'transparent'}
                          stroke={element.style.borderColor || '#000000'}
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Star */}
                  {element.content === 'star' && (
                    <div className="w-full h-full relative">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 100 100"
                        className="absolute inset-0"
                      >
                        <path
                          d="M50 10 L60 35 L85 35 L67 52 L75 77 L50 65 L25 77 L33 52 L15 35 L40 35 Z"
                          fill={element.style.backgroundColor || 'transparent'}
                          stroke={element.style.borderColor || '#000000'}
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Diamond */}
                  {element.content === 'diamond' && (
                    <div className="w-full h-full relative">
                      <div
                        className="absolute"
                        style={{
                          width: `${element.width * 0.7}px`,
                          height: `${element.height * 0.7}px`,
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%) rotate(45deg)',
                          backgroundColor: element.style.backgroundColor || 'transparent',
                          border: element.style.border || '2px solid #000000',
                          borderColor: element.style.borderColor || '#000000',
                          borderRadius: element.style.borderRadius || '0px'
                        }}
                      />
                    </div>
                  )}

                  {/* Hexagon */}
                  {element.content === 'hexagon' && (
                    <div className="w-full h-full relative">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 100 100"
                        className="absolute inset-0"
                      >
                        <path
                          d="M25 25 L75 25 L90 50 L75 75 L25 75 L10 50 Z"
                          fill={element.style.backgroundColor || 'transparent'}
                          stroke={element.style.borderColor || '#000000'}
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Heart */}
                  {element.content === 'heart' && (
                    <div className="w-full h-full relative">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 100 100"
                        className="absolute inset-0"
                      >
                        <path
                          d="M50 85 C50 85 20 60 20 40 C20 25 30 15 45 20 C50 22 50 22 55 20 C70 15 80 25 80 40 C80 60 50 85 50 85 Z"
                          fill={element.style.backgroundColor || 'transparent'}
                          stroke={element.style.borderColor || '#000000'}
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Octagon */}
                  {element.content === 'octagon' && (
                    <div className="w-full h-full relative">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 100 100"
                        className="absolute inset-0"
                      >
                        <path
                          d="M30 10 L70 10 L90 30 L90 70 L70 90 L30 90 L10 70 L10 30 Z"
                          fill={element.style.backgroundColor || 'transparent'}
                          stroke={element.style.borderColor || '#000000'}
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Pentagon */}
                  {element.content === 'pentagon' && (
                    <div className="w-full h-full relative">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 100 100"
                        className="absolute inset-0"
                      >
                        <path
                          d="M50 10 L85 35 L70 80 L30 80 L15 35 Z"
                          fill={element.style.backgroundColor || 'transparent'}
                          stroke={element.style.borderColor || '#000000'}
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Heptagon */}
                  {element.content === 'heptagon' && (
                    <div className="w-full h-full relative">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 100 100"
                        className="absolute inset-0"
                      >
                        <path
                          d="M50 10 L75 25 L85 50 L75 75 L50 90 L25 75 L15 50 L25 25 Z"
                          fill={element.style.backgroundColor || 'transparent'}
                          stroke={element.style.borderColor || '#000000'}
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Nonagon */}
                  {element.content === 'nonagon' && (
                    <div className="w-full h-full relative">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 100 100"
                        className="absolute inset-0"
                      >
                        <path
                          d="M50 10 L70 15 L85 30 L90 50 L85 70 L70 85 L50 90 L30 85 L15 70 L10 50 L15 30 L30 15 Z"
                          fill={element.style.backgroundColor || 'transparent'}
                          stroke={element.style.borderColor || '#000000'}
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Decagon */}
                  {element.content === 'decagon' && (
                    <div className="w-full h-full relative">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 100 100"
                        className="absolute inset-0"
                      >
                        <path
                          d="M50 10 L65 12 L78 20 L88 32 L92 47 L92 53 L88 68 L78 80 L65 88 L50 90 L35 88 L22 80 L12 68 L8 53 L8 47 L12 32 L22 20 L35 12 Z"
                          fill={element.style.backgroundColor || 'transparent'}
                          stroke={element.style.borderColor || '#000000'}
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Parallelogram */}
                  {element.content === 'parallelogram' && (
                    <div className="w-full h-full relative">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 100 100"
                        className="absolute inset-0"
                      >
                        <path
                          d="M20 25 L80 25 L90 75 L30 75 Z"
                          fill={element.style.backgroundColor || 'transparent'}
                          stroke={element.style.borderColor || '#000000'}
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Trapezoid */}
                  {element.content === 'trapezoid' && (
                    <div className="w-full h-full relative">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 100 100"
                        className="absolute inset-0"
                      >
                        <path
                          d="M30 25 L70 25 L85 75 L15 75 Z"
                          fill={element.style.backgroundColor || 'transparent'}
                          stroke={element.style.borderColor || '#000000'}
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Rhombus */}
                  {element.content === 'rhombus' && (
                    <div className="w-full h-full relative">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 100 100"
                        className="absolute inset-0"
                      >
                        <path
                          d="M50 10 L85 50 L50 90 L15 50 Z"
                          fill={element.style.backgroundColor || 'transparent'}
                          stroke={element.style.borderColor || '#000000'}
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Kite */}
                  {element.content === 'kite' && (
                    <div className="w-full h-full relative">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 100 100"
                        className="absolute inset-0"
                      >
                        <path
                          d="M50 10 L75 40 L50 55 L25 40 Z"
                          fill={element.style.backgroundColor || 'transparent'}
                          stroke={element.style.borderColor || '#000000'}
                          strokeWidth="2"
                        />
                        <path
                          d="M50 55 L65 90 L50 80 L35 90 Z"
                          fill={element.style.backgroundColor || 'transparent'}
                          stroke={element.style.borderColor || '#000000'}
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Process (Flowchart) */}
                  {element.content === 'process' && (
                    <div className="w-full h-full relative">
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundColor: element.style.backgroundColor || 'transparent',
                          border: element.style.border || '2px solid #000000',
                          borderColor: element.style.borderColor || '#000000',
                          borderRadius: '8px'
                        }}
                      />
                    </div>
                  )}

                  {/* Decision (Flowchart) */}
                  {element.content === 'decision' && (
                    <div className="w-full h-full relative">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 100 100"
                        className="absolute inset-0"
                      >
                        <path
                          d="M50 10 L90 50 L50 90 L10 50 Z"
                          fill={element.style.backgroundColor || 'transparent'}
                          stroke={element.style.borderColor || '#000000'}
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Start/End (Flowchart) */}
                  {(element.content === 'start/end' || element.content === 'start' || element.content === 'end') && (
                    <div className="w-full h-full relative">
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundColor: element.style.backgroundColor || 'transparent',
                          border: element.style.border || '2px solid #000000',
                          borderColor: element.style.borderColor || '#000000',
                          borderRadius: '50px'
                        }}
                      />
                    </div>
                  )}

                  {/* Document (Flowchart) */}
                  {element.content === 'document' && (
                    <div className="w-full h-full relative">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 100 100"
                        className="absolute inset-0"
                      >
                        <path
                          d="M10 10 L90 10 L90 75 C90 80 85 85 80 85 L70 85 C65 80 55 80 50 85 C45 80 35 80 30 85 L20 85 C15 85 10 80 10 75 Z"
                          fill={element.style.backgroundColor || 'transparent'}
                          stroke={element.style.borderColor || '#000000'}
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Database (Flowchart) */}
                  {element.content === 'database' && (
                    <div className="w-full h-full relative">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 100 100"
                        className="absolute inset-0"
                      >
                        <ellipse
                          cx="50"
                          cy="20"
                          rx="40"
                          ry="10"
                          fill={element.style.backgroundColor || 'transparent'}
                          stroke={element.style.borderColor || '#000000'}
                          strokeWidth="2"
                        />
                        <path
                          d="M10 20 L10 70 C10 75 25 80 50 80 C75 80 90 75 90 70 L90 20"
                          fill={element.style.backgroundColor || 'transparent'}
                          stroke={element.style.borderColor || '#000000'}
                          strokeWidth="2"
                        />
                        <ellipse
                          cx="50"
                          cy="50"
                          rx="40"
                          ry="10"
                          fill="none"
                          stroke={element.style.borderColor || '#000000'}
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Connector (Flowchart) */}
                  {element.content === 'connector' && (
                    <div className="w-full h-full relative">
                      <div
                        className="w-full h-full rounded-full"
                        style={{
                          backgroundColor: element.style.backgroundColor || 'transparent',
                          border: element.style.border || '2px solid #000000',
                          borderColor: element.style.borderColor || '#000000'
                        }}
                      />
                    </div>
                  )}

                  {/* Default fallback for any unrecognized shape */}
                  {!['rectangle', 'circle', 'triangle', 'arrow', 'arrow right', 'arrow left', 'arrow up', 'arrow down', 'double arrow', 'block arrow', 'star', 'diamond', 'hexagon', 'heart', 'octagon', 'pentagon', 'heptagon', 'nonagon', 'decagon', 'parallelogram', 'trapezoid', 'rhombus', 'kite', 'process', 'decision', 'start/end', 'start', 'end', 'document', 'database', 'connector'].includes(element.content) && (
                    <div
                        className="w-full h-full"
                        style={{
                          backgroundColor: element.style.backgroundColor || 'transparent',
                          border: element.style.border || '2px solid #000000',
                          borderColor: element.style.borderColor || '#000000',
                          borderRadius: element.style.borderRadius || '0px'
                        }}
                    />
                  )}
                </div>
              )}

              {element.type === 'image' && (
                <img
                  src={element.content}
                  alt="Slide element"
                  className="w-full h-full object-cover"
                  style={{
                    borderRadius: element.style.borderRadius || '0px'
                  }}
                />
              )}

              {/* Resize handles */}
              {renderResizeHandles(element)}

              {/* Delete button for selected element */}
              {selectedElement === element.id && editMode === 'edit' && (
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteElement(element.id);
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}

          {/* Grid overlay (optional) */}
          {editMode === 'edit' && (
            <div className="absolute inset-0 pointer-events-none opacity-10">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#000" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Context Menu */}
      {contextMenu.show && (
        <div
          className="fixed bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50"
          style={{
            left: contextMenu.x,
            top: contextMenu.y,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start px-3 py-2 text-sm hover:bg-gray-100"
            onClick={() => {
              if (contextMenu.elementId) {
                // Duplicate element logic here
                const currentSlideData = presentation.slides[currentSlide - 1];
                const elementToDuplicate = currentSlideData.elements.find(el => el.id === contextMenu.elementId);
                if (elementToDuplicate) {
                  const newElement = {
                    ...elementToDuplicate,
                    id: Date.now().toString(),
                    x: elementToDuplicate.x + 20,
                    y: elementToDuplicate.y + 20,
                  };
                  setPresentation(prev => ({
                    ...prev,
                    slides: prev.slides.map((slide, index) =>
                      index === currentSlide - 1
                        ? { ...slide, elements: [...slide.elements, newElement] }
                        : slide
                    )
                  }));
                }
              }
              setContextMenu({ show: false, x: 0, y: 0, elementId: null });
            }}
          >
            <Copy className="h-4 w-4 mr-2" />
            Duplicate
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start px-3 py-2 text-sm hover:bg-gray-100"
            onClick={() => {
              if (contextMenu.elementId) {
                setSelectedElement(contextMenu.elementId);
                if (presentation.slides[currentSlide - 1].elements.find(el => el.id === contextMenu.elementId)?.type === 'text') {
                  setIsTextEditing(true);
                }
              }
              setContextMenu({ show: false, x: 0, y: 0, elementId: null });
            }}
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Edit
          </Button>

          <div className="border-t border-gray-200 my-1"></div>

          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start px-3 py-2 text-sm hover:bg-red-50 text-red-600 hover:text-red-700"
            onClick={() => {
              if (contextMenu.elementId) {
                deleteElement(contextMenu.elementId);
              }
              setContextMenu({ show: false, x: 0, y: 0, elementId: null });
            }}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      )}

      {/* Click outside to close context menu */}
      {contextMenu.show && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setContextMenu({ show: false, x: 0, y: 0, elementId: null })}
        />
      )}
    </div>
  );
}
