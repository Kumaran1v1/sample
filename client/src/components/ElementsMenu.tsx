import { Search, Square, Circle, Triangle, Star, Heart, Zap, Minus, Hexagon, Diamond, Octagon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Types
interface Element {
  icon: any;
  name: string;
  category: string;
}

interface ElementsMenuProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addShapeElement: (shapeType: string) => void;
  addEmojiElement: (emoji: string) => void;
}

export default function ElementsMenu({ 
  searchQuery, 
  setSearchQuery, 
  addShapeElement, 
  addEmojiElement 
}: ElementsMenuProps) {
  const basicShapes: Element[] = [
    { icon: Square, name: "Rectangle", category: "Basic" },
    { icon: Circle, name: "Circle", category: "Basic" },
    { icon: Triangle, name: "Triangle", category: "Basic" },
    { icon: Star, name: "Star", category: "Basic" },
    { icon: Heart, name: "Heart", category: "Basic" },
    { icon: Diamond, name: "Diamond", category: "Basic" },
    { icon: Hexagon, name: "Hexagon", category: "Basic" },
    { icon: Octagon, name: "Octagon", category: "Basic" },
  ];

  const polygonShapes: Element[] = [
    { name: "Pentagon", category: "Polygons", icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l7.5 5.5-2.9 8.9H7.4L4.5 7.5L12 2z"/>
      </svg>
    )},
    { name: "Heptagon", category: "Polygons", icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1l8.5 3.5 2.5 8.5-2.5 8.5L12 23l-8.5-2.5L1 12l2.5-8.5L12 1z"/>
      </svg>
    )},
    { name: "Nonagon", category: "Polygons", icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1l7 2.5 5.5 6-1.5 7.5-5.5 6L12 23l-7-2.5L0 14.5l1.5-7.5L7 1L12 1z"/>
      </svg>
    )},
    { name: "Decagon", category: "Polygons", icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1l6.5 2 4.5 4.5 2 6.5-2 6.5-4.5 4.5L12 23l-6.5-2L1 16.5l-2-6.5 2-6.5L5.5 3L12 1z"/>
      </svg>
    )},
    { name: "Parallelogram", category: "Polygons", icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 6h12l4 12H10L6 6z"/>
      </svg>
    )},
    { name: "Trapezoid", category: "Polygons", icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 6h8l6 12H2L8 6z"/>
      </svg>
    )},
    { name: "Rhombus", category: "Polygons", icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l8 10-8 10L4 12L12 2z"/>
      </svg>
    )},
    { name: "Kite", category: "Polygons", icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l6 8-6 4-6-4L12 2z M12 14l4 8-4-2-4 2L12 14z"/>
      </svg>
    )},
  ];

  const arrowShapes: Element[] = [
    { name: "Arrow Right", category: "Arrows", icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 4l8 8-8 8V4z"/>
      </svg>
    )},
    { name: "Arrow Left", category: "Arrows", icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 4l-8 8 8 8V4z"/>
      </svg>
    )},
    { name: "Arrow Up", category: "Arrows", icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 16l8-8 8 8H4z"/>
      </svg>
    )},
    { name: "Arrow Down", category: "Arrows", icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 8l8 8 8-8H4z"/>
      </svg>
    )},
    { name: "Double Arrow", category: "Arrows", icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M2 12l6-6v4h8V6l6 6-6 6v-4H8v4L2 12z"/>
      </svg>
    )},
    { name: "Curved Arrow", category: "Arrows", icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.19 0 2.34-.21 3.41-.6l-1.85-1.85C12.78 19.74 12.4 19.8 12 19.8c-4.3 0-7.8-3.5-7.8-7.8S7.7 4.2 12 4.2s7.8 3.5 7.8 7.8c0 1.85-.64 3.55-1.71 4.9l-2.09-2.09 4.24 4.24C21.36 17.64 22 14.93 22 12c0-5.52-4.48-10-10-10z"/>
      </svg>
    )},
    { name: "Circular Arrow", category: "Arrows", icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"/>
      </svg>
    )},
    { name: "Block Arrow", category: "Arrows", icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M2 8h6V6l6 6-6 6v-2H2V8z M16 8h6v8h-6v-2l-2-2 2-2V8z"/>
      </svg>
    )},
  ];

  const flowchartShapes: Element[] = [
    { name: "Process", category: "Flowchart", icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <rect x="2" y="8" width="20" height="8" rx="2"/>
      </svg>
    )},
    { name: "Decision", category: "Flowchart", icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l10 10-10 10L2 12L12 2z"/>
      </svg>
    )},
    { name: "Start/End", category: "Flowchart", icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <rect x="2" y="8" width="20" height="8" rx="8"/>
      </svg>
    )},
    { name: "Document", category: "Flowchart", icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 4h16v14c0 1-1 2-2 2H6c-1 0-2-1-2-2V4z M4 18c2 2 6 2 8 0s6-2 8 0"/>
      </svg>
    )},
    { name: "Database", category: "Flowchart", icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <ellipse cx="12" cy="6" rx="8" ry="2"/>
        <path d="M4 6v12c0 1.1 3.6 2 8 2s8-.9 8-2V6"/>
        <path d="M4 12c0 1.1 3.6 2 8 2s8-.9 8-2"/>
      </svg>
    )},
    { name: "Connector", category: "Flowchart", icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="4"/>
      </svg>
    )},
  ];

  const lineShapes: Element[] = [
    { name: "Straight Line", category: "Lines", icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="2" y1="12" x2="22" y2="12"/>
      </svg>
    )},
    { name: "Curved Line", category: "Lines", icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 12c0-8 8-8 8 0s8 8 8 0"/>
      </svg>
    )},
    { name: "Zigzag Line", category: "Lines", icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 12l4-4 4 4 4-4 4 4 4-4"/>
      </svg>
    )},
    { name: "Dashed Line", category: "Lines", icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2">
        <line x1="2" y1="12" x2="22" y2="12"/>
      </svg>
    )},
  ];

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search elements"
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Basic Shapes</h3>
        <div className="grid grid-cols-4 gap-2">
          {basicShapes
            .filter(element =>
              searchQuery === '' ||
              element.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((element, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => addShapeElement(element.name.toLowerCase())}
                >
                  <element.icon className="h-6 w-6 text-gray-600" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add {element.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Polygon Shapes</h3>
        <div className="grid grid-cols-4 gap-2">
          {polygonShapes
            .filter(shape =>
              searchQuery === '' ||
              shape.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((shape, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => addShapeElement(shape.name.toLowerCase())}
                >
                  <shape.icon className="h-6 w-6 text-gray-600" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add {shape.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Arrow Shapes</h3>
        <div className="grid grid-cols-4 gap-2">
          {arrowShapes
            .filter(shape =>
              searchQuery === '' ||
              shape.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((shape, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => addShapeElement(shape.name.toLowerCase())}
                >
                  <shape.icon className="h-6 w-6 text-gray-600" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add {shape.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Flowchart Shapes</h3>
        <div className="grid grid-cols-4 gap-2">
          {flowchartShapes
            .filter(shape =>
              searchQuery === '' ||
              shape.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((shape, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => addShapeElement(shape.name.toLowerCase())}
                >
                  <shape.icon className="h-6 w-6 text-gray-600" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add {shape.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Lines & Connectors</h3>
        <div className="grid grid-cols-4 gap-2">
          {lineShapes
            .filter(shape =>
              searchQuery === '' ||
              shape.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((shape, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => addShapeElement(shape.name.toLowerCase())}
                >
                  <shape.icon className="h-6 w-6 text-gray-600" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add {shape.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  );
}