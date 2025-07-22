import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Grid3X3, 
  Maximize, 
  ZoomOut, 
  ZoomIn, 
  Plus, 
  Copy, 
  Trash2,
  RotateCcw,
  RotateCw,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Move,
  Layers
} from "lucide-react";

interface ToolsMenuProps {
  zoomLevel: number;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  addNewSlide: () => void;
  duplicateSlide: (slideIndex: number) => void;
  deleteSlide: (slideIndex: number) => void;
  currentSlide: number;
  totalSlides: number;
}

export default function ToolsMenu({ 
  zoomLevel,
  zoomIn,
  zoomOut,
  resetZoom,
  addNewSlide,
  duplicateSlide,
  deleteSlide,
  currentSlide,
  totalSlides
}: ToolsMenuProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium text-gray-900 mb-3">View Options</h3>
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <Grid3X3 className="h-4 w-4 mr-2" />
            Slide Sorter View
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Maximize className="h-4 w-4 mr-2" />
            Full Screen
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Layers className="h-4 w-4 mr-2" />
            Layer Panel
          </Button>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Zoom Controls</h3>
        <div className="flex items-center gap-2 mb-2">
          <Button variant="outline" size="sm" onClick={zoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium min-w-[3rem] text-center">
            {zoomLevel}%
          </span>
          <Button variant="outline" size="sm" onClick={zoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" size="sm" onClick={resetZoom} className="w-full">
          Reset Zoom
        </Button>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Slide Actions</h3>
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start" onClick={addNewSlide}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Slide
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => duplicateSlide(currentSlide - 1)}
          >
            <Copy className="h-4 w-4 mr-2" />
            Duplicate Slide
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 hover:text-red-700"
            onClick={() => deleteSlide(currentSlide - 1)}
            disabled={totalSlides <= 1}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Slide
          </Button>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Alignment Tools</h3>
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" size="sm">
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <Button variant="outline" size="sm" className="justify-start">
            <Move className="h-4 w-4 mr-1" />
            Distribute
          </Button>
          <Button variant="outline" size="sm" className="justify-start">
            <Layers className="h-4 w-4 mr-1" />
            Group
          </Button>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Transform Tools</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2 mt-2">
          <Button variant="outline" size="sm" className="w-full justify-start">
            Flip Horizontal
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            Flip Vertical
          </Button>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Grid & Guides</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="show-grid-sidebar" />
            <Label htmlFor="show-grid-sidebar" className="text-sm">Show grid</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="snap-to-grid-sidebar" />
            <Label htmlFor="snap-to-grid-sidebar" className="text-sm">Snap to grid</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="show-rulers-sidebar" />
            <Label htmlFor="show-rulers-sidebar" className="text-sm">Show rulers</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="show-guides-sidebar" />
            <Label htmlFor="show-guides-sidebar" className="text-sm">Show guides</Label>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Keyboard Shortcuts</h3>
        <div className="text-xs text-gray-600 space-y-1">
          <div className="flex justify-between">
            <span>New Slide:</span>
            <span className="font-mono">Ctrl+M</span>
          </div>
          <div className="flex justify-between">
            <span>Duplicate:</span>
            <span className="font-mono">Ctrl+D</span>
          </div>
          <div className="flex justify-between">
            <span>Save:</span>
            <span className="font-mono">Ctrl+S</span>
          </div>
          <div className="flex justify-between">
            <span>Zoom In:</span>
            <span className="font-mono">Ctrl++</span>
          </div>
          <div className="flex justify-between">
            <span>Zoom Out:</span>
            <span className="font-mono">Ctrl+-</span>
          </div>
          <div className="flex justify-between">
            <span>Present:</span>
            <span className="font-mono">F5</span>
          </div>
        </div>
      </div>
    </div>
  );
}
