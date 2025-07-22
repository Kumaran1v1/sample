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
                <div
                  className="w-full h-full"
                  style={{
                    backgroundColor: element.style.backgroundColor || 'transparent',
                    borderRadius: element.style.borderRadius || '0px'
                  }}
                />
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
