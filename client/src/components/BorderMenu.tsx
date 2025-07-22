import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { SlideElement, Presentation } from "@/components/presentation/types";

// Types
interface BorderStyle {
  name: string;
  value: string;
  preview: string;
}

interface TextColor {
  name: string;
  value: string;
  class: string;
}

interface BorderMenuProps {
  selectedElement: string | null;
  currentSlide: number;
  presentation: Presentation;
  updateElement: (elementId: string, updates: Partial<SlideElement>) => void;
}

export default function BorderMenu({
  selectedElement,
  currentSlide,
  presentation,
  updateElement
}: BorderMenuProps) {
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

  const borderPositions = [
    { name: "All Sides", value: "all", icon: "⬜", property: "border" },
    { name: "Top", value: "top", icon: "⬆️", property: "borderTop" },
    { name: "Right", value: "right", icon: "➡️", property: "borderRight" },
    { name: "Bottom", value: "bottom", icon: "⬇️", property: "borderBottom" },
    { name: "Left", value: "left", icon: "⬅️", property: "borderLeft" },
  ];

  const borderRadiusPositions = [
    { name: "All Corners", value: "all", icon: "⬜", property: "borderRadius" },
    { name: "Top Left", value: "topLeft", icon: "↖️", property: "borderTopLeftRadius" },
    { name: "Top Right", value: "topRight", icon: "↗️", property: "borderTopRightRadius" },
    { name: "Bottom Left", value: "bottomLeft", icon: "↙️", property: "borderBottomLeftRadius" },
    { name: "Bottom Right", value: "bottomRight", icon: "↘️", property: "borderBottomRightRadius" },
  ];

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

  const gradientBorders = [
    { name: "Blue Gradient", value: "linear-gradient(45deg, #3b82f6, #8b5cf6)", class: "bg-gradient-to-r from-blue-500 to-violet-500" },
    { name: "Purple Gradient", value: "linear-gradient(45deg, #8b5cf6, #ec4899)", class: "bg-gradient-to-r from-violet-500 to-pink-500" },
    { name: "Green Gradient", value: "linear-gradient(45deg, #22c55e, #06b6d4)", class: "bg-gradient-to-r from-green-500 to-cyan-500" },
    { name: "Orange Gradient", value: "linear-gradient(45deg, #f97316, #eab308)", class: "bg-gradient-to-r from-orange-500 to-yellow-500" },
    { name: "Rainbow", value: "linear-gradient(45deg, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #8b5cf6)", class: "bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500" },
  ];

  const currentElement = selectedElement
    ? presentation.slides[currentSlide - 1]?.elements.find(el => el.id === selectedElement)
    : null;

  // Helper functions for safe parsing
  const parseBorderWidth = (borderWidth: string | number | undefined): number => {
    if (typeof borderWidth === 'number') return borderWidth;
    if (typeof borderWidth === 'string') {
      const parsed = parseInt(borderWidth.replace('px', ''));
      return isNaN(parsed) ? 2 : Math.max(1, Math.min(20, parsed));
    }
    return 2;
  };

  const parseBorderRadius = (borderRadius: string | number | undefined): number => {
    if (typeof borderRadius === 'number') return borderRadius;
    if (typeof borderRadius === 'string') {
      const parsed = parseInt(borderRadius.replace('px', ''));
      return isNaN(parsed) ? 0 : Math.max(0, Math.min(50, parsed));
    }
    return 0;
  };

  const getCurrentBorderWidth = (): number => {
    return parseBorderWidth(currentElement?.style?.borderWidth);
  };

  const getCurrentBorderRadius = (): number => {
    return parseBorderRadius(currentElement?.style?.borderRadius);
  };

  const getCurrentBorderColor = (): string => {
    return currentElement?.style?.borderColor || '#000000';
  };

  const getIndividualBorderWidth = (side: string): number => {
    if (!currentElement?.style) return 0;
    const property = side === 'all' ? 'borderWidth' : `border${side.charAt(0).toUpperCase() + side.slice(1)}Width`;
    const value = (currentElement.style as any)[property];
    return parseBorderWidth(value);
  };

  const getIndividualBorderRadius = (corner: string): number => {
    if (!currentElement?.style) return 0;
    const property = corner === 'all' ? 'borderRadius' : `border${corner.charAt(0).toUpperCase() + corner.slice(1)}Radius`;
    const value = (currentElement.style as any)[property];
    return parseBorderRadius(value);
  };

  const hasIndividualBorder = (side: string): boolean => {
    if (!currentElement?.style) return false;
    if (side === 'all') {
      return !!(currentElement.style.border || currentElement.style.borderWidth);
    }
    const property = `border${side.charAt(0).toUpperCase() + side.slice(1)}`;
    return !!(currentElement.style as any)[property];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-gray-200">
        <h3 className="font-medium text-gray-900 mb-2">Element Borders</h3>
        <p className="text-sm text-gray-600">
          {selectedElement ? 'Customize the border of the selected element' : 'Select an element to customize its border'}
        </p>
        {!selectedElement && (
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-700">
              💡 Click on any element in the canvas to start customizing its border
            </p>
          </div>
        )}
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        {/* Border Styles */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Border Styles</h4>
          <div className="space-y-2">
            {borderStyles.map((border, index) => (
              <Button
                key={index}
                variant="outline"
                className={cn(
                  "w-full justify-start h-auto p-3 transition-all hover:bg-blue-50",
                  currentElement?.style?.border === border.value && "bg-blue-100 border-blue-300"
                )}
                onClick={() => {
                  if (selectedElement) {
                    const updates: any = {
                      border: border.value
                    };

                    // Add padding for visible borders
                    if (border.value !== 'none') {
                      updates.padding = '8px';
                    } else {
                      // Remove border-related properties when setting to none
                      updates.borderWidth = undefined;
                      updates.borderColor = undefined;
                      updates.borderStyle = undefined;
                      updates.padding = undefined;
                    }

                    updateElement(selectedElement, { style: updates });
                  }
                }}
              >
                <div className="flex items-center gap-3 w-full">
                  <div
                    className="w-8 h-6 bg-gray-100 rounded flex-shrink-0 border-gray-200"
                    style={{
                      border: border.value === 'none' ? '1px solid #e5e7eb' : border.value,
                      borderColor: border.value.includes('#') ? undefined : getCurrentBorderColor()
                    }}
                  />
                  <span className="text-sm font-medium">{border.name}</span>
                  {currentElement?.style?.border === border.value && (
                    <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Individual Border Controls */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Individual Border Controls</h4>
          <div className="space-y-4">
            {borderPositions.map((position, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{position.icon}</span>
                    <span className="text-sm font-medium">{position.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={hasIndividualBorder(position.value) ? "default" : "outline"}
                      size="sm"
                      className="h-6 px-2 text-xs"
                      onClick={() => {
                        if (selectedElement) {
                          const borderColor = getCurrentBorderColor();
                          const borderWidth = 2;
                          const borderValue = `${borderWidth}px solid ${borderColor}`;

                          if (position.value === 'all') {
                            updateElement(selectedElement, {
                              style: { border: hasIndividualBorder('all') ? 'none' : borderValue }
                            });
                          } else {
                            const updates: any = {};
                            updates[position.property] = hasIndividualBorder(position.value) ? 'none' : borderValue;
                            updateElement(selectedElement, { style: updates });
                          }
                        }
                      }}
                    >
                      {hasIndividualBorder(position.value) ? 'ON' : 'OFF'}
                    </Button>
                  </div>
                </div>

                {hasIndividualBorder(position.value) && (
                  <div className="space-y-3">
                    {/* Border Style */}
                    <div>
                      <Label className="text-xs text-gray-600 mb-2 block">Style</Label>
                      <div className="flex gap-1">
                        {['solid', 'dashed', 'dotted'].map((style) => (
                          <Button
                            key={style}
                            variant="outline"
                            size="sm"
                            className="flex-1 h-6 px-2 text-xs"
                            onClick={() => {
                              if (selectedElement) {
                                const borderColor = getCurrentBorderColor();
                                const borderWidth = getIndividualBorderWidth(position.value);
                                const borderValue = `${borderWidth}px ${style} ${borderColor}`;

                                if (position.value === 'all') {
                                  updateElement(selectedElement, {
                                    style: { border: borderValue }
                                  });
                                } else {
                                  const updates: any = {};
                                  updates[position.property] = borderValue;
                                  updateElement(selectedElement, { style: updates });
                                }
                              }
                            }}
                          >
                            {style}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Width Control */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-xs text-gray-600">Width</Label>
                        <span className="text-xs text-gray-500 font-mono">
                          {getIndividualBorderWidth(position.value)}px
                        </span>
                      </div>
                      <Slider
                        value={[getIndividualBorderWidth(position.value)]}
                        onValueChange={(value) => {
                          if (selectedElement) {
                            const borderColor = getCurrentBorderColor();
                            const newWidth = Math.max(1, Math.min(20, value[0]));
                            const borderValue = `${newWidth}px solid ${borderColor}`;

                            if (position.value === 'all') {
                              updateElement(selectedElement, {
                                style: { border: borderValue, borderWidth: `${newWidth}px` }
                              });
                            } else {
                              const updates: any = {};
                              updates[position.property] = borderValue;
                              updates[`${position.property}Width`] = `${newWidth}px`;
                              updateElement(selectedElement, { style: updates });
                            }
                          }
                        }}
                        max={20}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    {/* Color Control */}
                    <div>
                      <Label className="text-xs text-gray-600 mb-2 block">Color</Label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={getCurrentBorderColor()}
                          className="w-8 h-6 rounded border border-gray-300 cursor-pointer"
                          onChange={(e) => {
                            if (selectedElement) {
                              const borderWidth = getIndividualBorderWidth(position.value);
                              const borderValue = `${borderWidth}px solid ${e.target.value}`;

                              if (position.value === 'all') {
                                updateElement(selectedElement, {
                                  style: { border: borderValue, borderColor: e.target.value }
                                });
                              } else {
                                const updates: any = {};
                                updates[position.property] = borderValue;
                                updateElement(selectedElement, { style: updates });
                              }
                            }
                          }}
                        />
                        <span className="text-xs text-gray-500 font-mono flex-1">
                          {getCurrentBorderColor()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Border Color */}
        <div>
          <Label className="text-sm font-medium text-gray-900 mb-3">Border Color</Label>
          <div className="grid grid-cols-6 gap-2 mt-2">
            {textColors.slice(0, 18).map((color, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      "w-8 h-8 rounded cursor-pointer border-2 hover:border-gray-400 transition-all hover:scale-110",
                      color.class,
                      getCurrentBorderColor() === color.value && "ring-2 ring-blue-500 ring-offset-1"
                    )}
                    onClick={() => {
                      if (selectedElement) {
                        const currentWidth = getCurrentBorderWidth();
                        updateElement(selectedElement, {
                          style: {
                            borderColor: color.value,
                            border: `${currentWidth}px solid ${color.value}`
                          }
                        });
                      }
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{color.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-3">
            <Label htmlFor="custom-border-color" className="text-sm">Custom:</Label>
            <input
              id="custom-border-color"
              type="color"
              value={getCurrentBorderColor()}
              className="w-10 h-10 rounded border border-gray-300 cursor-pointer hover:border-gray-400 transition-colors"
              onChange={(e) => {
                if (selectedElement) {
                  const currentWidth = getCurrentBorderWidth();
                  updateElement(selectedElement, {
                    style: {
                      borderColor: e.target.value,
                      border: `${currentWidth}px solid ${e.target.value}`
                    }
                  });
                }
              }}
            />
            <span className="text-xs text-gray-500 ml-2">{getCurrentBorderColor()}</span>
          </div>
        </div>

        {/* Border Width */}
        <div>
          <Label className="text-sm font-medium text-gray-900 mb-3">Border Width</Label>
          <div className="space-y-3">
            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3, 4, 6, 8].map((width) => (
                <Button
                  key={width}
                  variant="outline"
                  size="sm"
                  className={cn(
                    "flex-1 min-w-0",
                    getCurrentBorderWidth() === width && "bg-blue-100 border-blue-300"
                  )}
                  onClick={() => {
                    if (selectedElement) {
                      const borderColor = getCurrentBorderColor();
                      updateElement(selectedElement, {
                        style: {
                          border: `${width}px solid ${borderColor}`,
                          borderWidth: `${width}px`
                        }
                      });
                    }
                  }}
                >
                  {width}px
                </Button>
              ))}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-xs text-gray-600">Custom Width (1-20px)</Label>
                <span className="text-xs text-gray-500 font-mono">{getCurrentBorderWidth()}px</span>
              </div>
              <Slider
                value={[getCurrentBorderWidth()]}
                onValueChange={(value) => {
                  if (selectedElement) {
                    const borderColor = getCurrentBorderColor();
                    const newWidth = Math.max(1, Math.min(20, value[0]));
                    updateElement(selectedElement, {
                      style: {
                        border: `${newWidth}px solid ${borderColor}`,
                        borderWidth: `${newWidth}px`
                      }
                    });
                  }
                }}
                max={20}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Individual Border Radius Controls */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Border Radius Controls</h4>

          {/* Quick Radius Presets */}
          <div className="mb-4">
            <Label className="text-xs text-gray-600 mb-2 block">Quick Presets</Label>
            <div className="flex gap-2 flex-wrap">
              {[0, 4, 8, 12, 16, 24].map((radius) => (
                <Button
                  key={radius}
                  variant="outline"
                  size="sm"
                  className={cn(
                    "flex-1 min-w-0",
                    getCurrentBorderRadius() === radius && "bg-blue-100 border-blue-300"
                  )}
                  onClick={() => {
                    if (selectedElement) {
                      updateElement(selectedElement, {
                        style: { borderRadius: `${radius}px` }
                      });
                    }
                  }}
                >
                  {radius === 0 ? 'None' : `${radius}px`}
                </Button>
              ))}
            </div>
          </div>

          {/* Individual Corner Controls */}
          <div className="space-y-3">
            {borderRadiusPositions.map((corner, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{corner.icon}</span>
                    <span className="text-sm font-medium">{corner.name}</span>
                  </div>
                  <span className="text-xs text-gray-500 font-mono">
                    {getIndividualBorderRadius(corner.value)}px
                  </span>
                </div>

                <Slider
                  value={[getIndividualBorderRadius(corner.value)]}
                  onValueChange={(value) => {
                    if (selectedElement) {
                      const newRadius = Math.max(0, Math.min(50, value[0]));

                      if (corner.value === 'all') {
                        updateElement(selectedElement, {
                          style: { borderRadius: `${newRadius}px` }
                        });
                      } else {
                        const updates: any = {};
                        updates[corner.property] = `${newRadius}px`;
                        updateElement(selectedElement, { style: updates });
                      }
                    }
                  }}
                  max={50}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Reset Borders */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Reset Borders</h4>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => {
                if (selectedElement) {
                  updateElement(selectedElement, {
                    style: {
                      border: 'none',
                      borderWidth: undefined,
                      borderColor: undefined,
                      borderStyle: undefined,
                      borderRadius: undefined,
                      borderTop: undefined,
                      borderRight: undefined,
                      borderBottom: undefined,
                      borderLeft: undefined,
                      borderTopLeftRadius: undefined,
                      borderTopRightRadius: undefined,
                      borderBottomLeftRadius: undefined,
                      borderBottomRightRadius: undefined,
                      background: currentElement?.style?.backgroundColor || 'transparent',
                      backgroundClip: undefined,
                      backgroundOrigin: undefined
                    }
                  });
                }
              }}
            >
              Remove All Borders
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => {
                if (selectedElement) {
                  updateElement(selectedElement, {
                    style: {
                      border: '2px solid #000000',
                      borderRadius: '0px'
                    }
                  });
                }
              }}
            >
              Reset to Default
            </Button>
          </div>
        </div>

        {/* Gradient Borders */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Gradient Borders</h4>
          <div className="space-y-2">
            {gradientBorders.map((gradient, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start h-auto p-3 hover:bg-blue-50"
                onClick={() => {
                  if (selectedElement) {
                    updateElement(selectedElement, {
                      style: {
                        border: '3px solid transparent',
                        background: `${gradient.value} border-box`,
                        backgroundClip: 'padding-box, border-box',
                        backgroundOrigin: 'padding-box, border-box'
                      }
                    });
                  }
                }}
              >
                <div className="flex items-center gap-3 w-full">
                  <div
                    className="w-8 h-6 rounded flex-shrink-0 border-2"
                    style={{
                      background: gradient.value,
                      border: '2px solid transparent',
                      backgroundClip: 'padding-box, border-box',
                      backgroundOrigin: 'padding-box, border-box'
                    }}
                  />
                  <span className="text-sm font-medium">{gradient.name}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Border Preview */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Border Preview</h4>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div
              className="w-full h-20 bg-white rounded flex items-center justify-center text-sm text-gray-600 relative"
              style={{
                border: currentElement?.style.border || 'none',
                borderTop: currentElement?.style.borderTop || currentElement?.style.border || 'none',
                borderRight: currentElement?.style.borderRight || currentElement?.style.border || 'none',
                borderBottom: currentElement?.style.borderBottom || currentElement?.style.border || 'none',
                borderLeft: currentElement?.style.borderLeft || currentElement?.style.border || 'none',
                borderRadius: currentElement?.style.borderRadius || '0px',
                borderTopLeftRadius: currentElement?.style.borderTopLeftRadius || currentElement?.style.borderRadius || '0px',
                borderTopRightRadius: currentElement?.style.borderTopRightRadius || currentElement?.style.borderRadius || '0px',
                borderBottomLeftRadius: currentElement?.style.borderBottomLeftRadius || currentElement?.style.borderRadius || '0px',
                borderBottomRightRadius: currentElement?.style.borderBottomRightRadius || currentElement?.style.borderRadius || '0px',
              }}
            >
              <div className="text-center">
                <div className="font-medium">Element Preview</div>
                <div className="text-xs text-gray-500 mt-1">
                  {selectedElement ? 'Live border preview' : 'Select an element'}
                </div>
              </div>

              {/* Corner indicators */}
              {selectedElement && (
                <>
                  <div className="absolute top-1 left-1 w-2 h-2 bg-blue-500 rounded-full opacity-50"></div>
                  <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full opacity-50"></div>
                  <div className="absolute bottom-1 left-1 w-2 h-2 bg-blue-500 rounded-full opacity-50"></div>
                  <div className="absolute bottom-1 right-1 w-2 h-2 bg-blue-500 rounded-full opacity-50"></div>
                </>
              )}
            </div>

            {/* Border Status Indicators */}
            {selectedElement && (
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    hasIndividualBorder('top') ? "bg-green-500" : "bg-gray-300"
                  )}></div>
                  <span>Top: {hasIndividualBorder('top') ? 'ON' : 'OFF'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    hasIndividualBorder('right') ? "bg-green-500" : "bg-gray-300"
                  )}></div>
                  <span>Right: {hasIndividualBorder('right') ? 'ON' : 'OFF'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    hasIndividualBorder('bottom') ? "bg-green-500" : "bg-gray-300"
                  )}></div>
                  <span>Bottom: {hasIndividualBorder('bottom') ? 'ON' : 'OFF'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    hasIndividualBorder('left') ? "bg-green-500" : "bg-gray-300"
                  )}></div>
                  <span>Left: {hasIndividualBorder('left') ? 'ON' : 'OFF'}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

        {/* Quick Actions */}
        <div className="pt-4 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
          <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => {
              if (selectedElement) {
                updateElement(selectedElement, {
                  style: { border: 'none' }
                });
              }
            }}
          >
            Remove Border
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => {
              if (selectedElement) {
                updateElement(selectedElement, {
                  style: {
                    border: '2px solid #3b82f6',
                    borderRadius: '8px'
                  }
                });
              }
            }}
          >
            Reset to Default
          </Button>
        </div>
      </div>
    </div>
  );
}