import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Type, 
  Image, 
  Square, 
  Circle, 
  Triangle, 
  Download, 
  Save, 
  Undo, 
  Redo, 
  ZoomIn, 
  ZoomOut, 
  Grid,
  Layers,
  Palette,
  Upload,
  X,
  Home,
  Share2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DesignEditorProps {
  templateId: number;
  templateData?: any;
  onClose: () => void;
  onSave: (designData: any) => void;
}

interface CanvasElement {
  id: string;
  type: 'text' | 'image' | 'shape';
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  style?: any;
  rotation?: number;
}

export function DesignEditor({ templateId, templateData, onClose, onSave }: DesignEditorProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [selectedTool, setSelectedTool] = useState<string>('select');
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [zoom, setZoom] = useState(100);
  const [canvasSize, setCanvasSize] = useState({ width: 1920, height: 1080 });

  // Initialize with template data
  useEffect(() => {
    if (templateData) {
      setElements(templateData.elements || []);
    } else {
      // Default template elements
      setElements([
        {
          id: '1',
          type: 'text',
          x: 100,
          y: 100,
          width: 300,
          height: 60,
          content: 'Click to edit title',
          style: {
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#333333',
            fontFamily: 'Arial, sans-serif'
          }
        },
        {
          id: '2',
          type: 'text',
          x: 100,
          y: 200,
          width: 400,
          height: 40,
          content: 'Add your subtitle here',
          style: {
            fontSize: '18px',
            color: '#666666',
            fontFamily: 'Arial, sans-serif'
          }
        }
      ]);
    }
  }, [templateData]);

  const tools = [
    { id: 'select', icon: null, label: 'Select' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'image', icon: Image, label: 'Image' },
    { id: 'rectangle', icon: Square, label: 'Rectangle' },
    { id: 'circle', icon: Circle, label: 'Circle' },
    { id: 'triangle', icon: Triangle, label: 'Triangle' },
  ];

  const addElement = (type: string) => {
    const newElement: CanvasElement = {
      id: Date.now().toString(),
      type: type as any,
      x: 200,
      y: 200,
      width: type === 'text' ? 200 : 100,
      height: type === 'text' ? 40 : 100,
      content: type === 'text' ? 'New text' : undefined,
      style: type === 'text' ? {
        fontSize: '16px',
        color: '#333333',
        fontFamily: 'Arial, sans-serif'
      } : {
        backgroundColor: '#3b82f6',
        border: '2px solid #1d4ed8'
      }
    };

    setElements(prev => [...prev, newElement]);
    setSelectedElement(newElement.id);
  };

  const updateElement = (id: string, updates: Partial<CanvasElement>) => {
    setElements(prev => prev.map(el => 
      el.id === id ? { ...el, ...updates } : el
    ));
  };

  const deleteElement = (id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
    setSelectedElement(null);
  };

  const handleSave = () => {
    const designData = {
      templateId,
      elements,
      canvasSize,
      lastModified: new Date().toISOString()
    };
    onSave(designData);
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Exporting design...');
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Home className="h-4 w-4 mr-2" />
            Back to Templates
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <h1 className="text-lg font-semibold">Presentation Editor</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Undo className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Redo className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Left Sidebar - Tools */}
        <div className="w-16 bg-gray-50 border-r border-gray-200 flex flex-col items-center py-4 gap-2">
          {tools.map((tool) => (
            <Button
              key={tool.id}
              variant={selectedTool === tool.id ? "default" : "ghost"}
              size="sm"
              className="w-10 h-10 p-0"
              onClick={() => {
                setSelectedTool(tool.id);
                if (tool.id !== 'select') {
                  addElement(tool.id);
                }
              }}
              title={tool.label}
            >
              {tool.icon && <tool.icon className="h-4 w-4" />}
              {tool.id === 'select' && <div className="w-3 h-3 border border-current"></div>}
            </Button>
          ))}
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 bg-gray-100 relative overflow-hidden">
          {/* Canvas Controls */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-white rounded-lg shadow-sm border p-2">
            <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(25, zoom - 25))}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[60px] text-center">{zoom}%</span>
            <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(200, zoom + 25))}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-4" />
            <Button variant="outline" size="sm">
              <Grid className="h-4 w-4" />
            </Button>
          </div>

          {/* Canvas */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div 
              ref={canvasRef}
              className="bg-white shadow-lg relative border"
              style={{
                width: `${(canvasSize.width * zoom) / 100}px`,
                height: `${(canvasSize.height * zoom) / 100}px`,
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'center center'
              }}
            >
              {elements.map((element) => (
                <div
                  key={element.id}
                  className={cn(
                    "absolute cursor-pointer border-2 border-transparent hover:border-blue-400",
                    selectedElement === element.id && "border-blue-500"
                  )}
                  style={{
                    left: `${element.x}px`,
                    top: `${element.y}px`,
                    width: `${element.width}px`,
                    height: `${element.height}px`,
                    transform: element.rotation ? `rotate(${element.rotation}deg)` : undefined,
                    ...element.style
                  }}
                  onClick={() => setSelectedElement(element.id)}
                >
                  {element.type === 'text' && (
                    <div
                      contentEditable
                      suppressContentEditableWarning
                      className="w-full h-full outline-none"
                      style={element.style}
                      onBlur={(e) => updateElement(element.id, { content: e.target.textContent || '' })}
                    >
                      {element.content}
                    </div>
                  )}
                  {element.type === 'shape' && (
                    <div className="w-full h-full" style={element.style}></div>
                  )}
                  {element.type === 'image' && (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                      <Image className="h-8 w-8" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-80 bg-white border-l border-gray-200">
          <div className="p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Layers className="h-4 w-4" />
              Properties
            </h3>
            
            {selectedElement && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Position</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="X"
                      value={elements.find(el => el.id === selectedElement)?.x || 0}
                      onChange={(e) => updateElement(selectedElement, { x: parseInt(e.target.value) || 0 })}
                    />
                    <Input
                      placeholder="Y"
                      value={elements.find(el => el.id === selectedElement)?.y || 0}
                      onChange={(e) => updateElement(selectedElement, { y: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Size</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Width"
                      value={elements.find(el => el.id === selectedElement)?.width || 0}
                      onChange={(e) => updateElement(selectedElement, { width: parseInt(e.target.value) || 0 })}
                    />
                    <Input
                      placeholder="Height"
                      value={elements.find(el => el.id === selectedElement)?.height || 0}
                      onChange={(e) => updateElement(selectedElement, { height: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => deleteElement(selectedElement)}
                  className="w-full"
                >
                  <X className="h-4 w-4 mr-2" />
                  Delete Element
                </Button>
              </div>
            )}

            {!selectedElement && (
              <div className="text-center text-gray-500 py-8">
                <Layers className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select an element to edit its properties</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
