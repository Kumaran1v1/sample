import { cn } from "@/lib/utils";
import { Presentation } from "@/components/presentation/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MoreVertical, Copy, Trash2, Plus } from "lucide-react";

interface SlideNavigatorProps {
  presentation: Presentation;
  currentSlide: number;
  navigateToSlide: (slideNumber: number) => void;
  addNewSlide: () => void;
  duplicateSlide: (index: number) => void;
  deleteSlide: (index: number) => void;
  totalSlides: number;
}

export default function SlideNavigator({
  presentation,
  currentSlide,
  navigateToSlide,
  addNewSlide,
  duplicateSlide,
  deleteSlide,
  totalSlides
}: SlideNavigatorProps) {
  return (
    <div className="w-48 bg-gray-50 border-r border-gray-200 flex flex-col flex-shrink-0">
      <div className="p-3 border-b border-gray-200">
        <h3 className="font-medium text-gray-900 text-sm">Slides</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {presentation.slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "relative group cursor-pointer rounded-lg border-2 transition-all",
              currentSlide === index + 1
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            )}
            onClick={() => navigateToSlide(index + 1)}
          >
            {/* Slide Preview */}
            <div className="aspect-video bg-white rounded-md m-1 relative overflow-hidden">
              <div
                className={cn("w-full h-full", slide.background)}
                style={{
                  border: slide.border || 'none',
                  borderRadius: slide.borderRadius || '0px',
                  boxShadow: slide.style?.boxShadow || 'none'
                }}
              >
                {/* Mini preview of slide elements */}
                {slide.elements.map((element) => (
                  <div
                    key={element.id}
                    className="absolute"
                    style={{
                      left: `${(element.x / 800) * 100}%`,
                      top: `${(element.y / 450) * 100}%`,
                      width: `${(element.width / 800) * 100}%`,
                      height: `${(element.height / 450) * 100}%`,
                      fontSize: '6px',
                      backgroundColor: element.type === 'shape' ? element.style.backgroundColor : 'transparent',
                      color: element.style.color,
                      borderRadius: element.style.borderRadius ? `${element.style.borderRadius}px` : '0',
                    }}
                  >
                    {element.type === 'text' && (
                      <div className="text-xs truncate">{element.content}</div>
                    )}
                    {element.type === 'shape' && (
                      <div className="w-full h-full bg-current opacity-70"></div>
                    )}
                    {element.type === 'image' && (
                      <img src={element.content} alt="" className="w-full h-full object-cover" />
                    )}
                  </div>
                ))}

                {/* Empty slide indicator */}
                {slide.elements.length === 0 && (
                  <div className="absolute inset-2 border border-dashed border-gray-300 rounded flex items-center justify-center">
                    <div className="text-gray-400 text-xs">Empty</div>
                  </div>
                )}
              </div>
            </div>

            {/* Slide Number */}
            <div className="absolute top-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
              {index + 1}
            </div>

            {/* Hover Actions */}
            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 bg-white bg-opacity-90 hover:bg-opacity-100 rounded"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    duplicateSlide(index);
                  }}>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate Slide
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      if (totalSlides > 1) {
                        deleteSlide(index);
                      }
                    }}
                    className="text-red-600 focus:text-red-600"
                    disabled={totalSlides <= 1}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Slide
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Active Indicator */}
            {currentSlide === index + 1 && (
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r"></div>
            )}
          </div>
        ))}

        {/* Add New Slide Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg aspect-video flex items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors"
              onClick={addNewSlide}
            >
              <div className="text-center text-gray-400 hover:text-gray-600">
                <Plus className="h-6 w-6 mx-auto mb-1" />
                <div className="text-xs">Add Slide</div>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add a new slide</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
