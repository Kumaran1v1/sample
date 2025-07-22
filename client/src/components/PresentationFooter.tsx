import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  FileText,
  Clock,
  Plus,
  ChevronDown,
  Copy,
  Trash2,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Presentation } from "@/components/presentation/types";

interface PresentationFooterProps {
  currentSlide: number;
  totalSlides: number;
  zoomLevel: number;
  presentation: Presentation;
  setPresentation: React.Dispatch<React.SetStateAction<Presentation>>;
  addNewSlide: () => void;
  duplicateSlide: (slideIndex: number) => void;
  deleteSlide: (slideIndex: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  navigateToSlide: (slideNumber: number) => void;
}

export default function PresentationFooter({
  currentSlide,
  totalSlides,
  zoomLevel,
  presentation,
  setPresentation,
  addNewSlide,
  duplicateSlide,
  deleteSlide,
  zoomIn,
  zoomOut,
  navigateToSlide
}: PresentationFooterProps) {
  return (
    <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Notes
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Slide Notes</DialogTitle>
                <DialogDescription>
                  Add speaker notes for slide {currentSlide}
                </DialogDescription>
              </DialogHeader>
              <Textarea
                placeholder="Enter your speaker notes here..."
                value={presentation.slides[currentSlide - 1]?.notes || ''}
                onChange={(e) => {
                  setPresentation(prev => ({
                    ...prev,
                    slides: prev.slides.map((slide, index) =>
                      index === currentSlide - 1
                        ? { ...slide, notes: e.target.value }
                        : slide
                    )
                  }));
                }}
                className="min-h-[100px]"
              />
            </DialogContent>
          </Dialog>

          <Button variant="ghost" size="sm">
            <Clock className="h-4 w-4 mr-2" />
            Duration
          </Button>
          <Button variant="ghost" size="sm">
            <Clock className="h-4 w-4 mr-2" />
            Timer
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" onClick={addNewSlide}>
                <Plus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add New Slide</TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => duplicateSlide(currentSlide - 1)}>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate Slide
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => deleteSlide(currentSlide - 1)}
                disabled={totalSlides <= 1}
                className="text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Slide
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={zoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <div className="text-sm text-gray-600 min-w-[3rem] text-center">
            {zoomLevel}%
          </div>
          <Button variant="outline" size="sm" onClick={zoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateToSlide(currentSlide - 1)}
            disabled={currentSlide <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-2">
            <Input
              type="number"
              min="1"
              max={totalSlides}
              value={currentSlide}
              onChange={(e) => {
                const slideNum = parseInt(e.target.value);
                if (slideNum >= 1 && slideNum <= totalSlides) {
                  navigateToSlide(slideNum);
                }
              }}
              className="w-16 h-8 text-center text-sm"
            />
            <span className="text-sm text-gray-600">/ {totalSlides}</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateToSlide(currentSlide + 1)}
            disabled={currentSlide >= totalSlides}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
