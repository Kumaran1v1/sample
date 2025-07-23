import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Home,
  Grid3X3,
  Shapes,
  Type,
  Hexagon,
  Palette,
  Upload,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import DesignMenu from "@/components/DesignMenu";
import ElementsMenu from "@/components/ElementsMenu";
import TextMenu from "@/components/TextMenu";
import SlideBorderMenu from "@/components/SlideBorderMenu";
import BorderMenu from "@/components/BorderMenu";
import BrandMenu from "@/components/BrandMenu";
import UploadsMenu from "@/components/UploadsMenu";
import ToolsMenu from "@/components/ToolsMenu";
import SlideTemplatesMenu from "@/components/SlideTemplatesMenu";
import HomeMenuTemplates from "@/components/HomeMenuTemplates";
import { SlideElement, Presentation } from "@/components/presentation/types";

interface SidebarTabsProps {
  activeTab: 'home' | 'templates' | 'design' | 'elements' | 'text' | 'borders' | 'brand' | 'uploads' | 'tools';
  setActiveTab: (tab: 'home' | 'templates' | 'design' | 'elements' | 'text' | 'borders' | 'brand' | 'uploads' | 'tools') => void;
  currentSlide: number;
  presentation: Presentation;
  setPresentation: React.Dispatch<React.SetStateAction<Presentation>>;
  selectedElement: string | null;
  setSelectedElement: React.Dispatch<React.SetStateAction<string | null>>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  updateElement: (elementId: string, updates: Partial<SlideElement>) => void;
  addShapeElement: (shapeType: string) => void;
  addEmojiElement: (emoji: string) => void;
  applyTemplate: (templateId: string) => void;
  applySlideTemplate: (templateId: string) => void;
  addSlide: (templateId: string) => void;
  zoomLevel: number;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  addNewSlide: () => void;
  duplicateSlide: (slideIndex: number) => void;
  deleteSlide: (slideIndex: number) => void;
  totalSlides: number;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export default function SidebarTabs({
  activeTab,
  setActiveTab,
  currentSlide,
  presentation,
  setPresentation,
  selectedElement,
  setSelectedElement,
  searchQuery,
  setSearchQuery,
  updateElement,
  addShapeElement,
  addEmojiElement,
  applyTemplate,
  applySlideTemplate,
  addSlide,
  zoomLevel,
  zoomIn,
  zoomOut,
  resetZoom,
  addNewSlide,
  duplicateSlide,
  deleteSlide,
  totalSlides,
  fileInputRef
}: SidebarTabsProps) {
  const sidebarTabs = [
    { id: 'design', icon: Grid3X3, label: 'Design', color: 'text-blue-600' },
    { id: 'elements', icon: Shapes, label: 'Elements', color: 'text-green-600' },
    { id: 'text', icon: Type, label: 'Text', color: 'text-purple-600' },
    { id: 'borders', icon: Hexagon, label: 'Borders', color: 'text-indigo-600' },
    { id: 'brand', icon: Palette, label: 'Brand', color: 'text-orange-600' },
    { id: 'uploads', icon: Upload, label: 'Uploads', color: 'text-pink-600' },
    { id: 'tools', icon: Settings, label: 'Tools', color: 'text-gray-600' },
  ];

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-shrink-0 h-full">
      {/* Tab Icons */}
      <div className="w-16 bg-gray-50 border-r border-gray-200 flex flex-col items-center py-4 gap-2 flex-shrink-0">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
              <Home className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Home</TooltipContent>
        </Tooltip>

        {sidebarTabs.map((tab) => (
          <Tooltip key={tab.id}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "w-10 h-10 p-0",
                  activeTab === tab.id ? `${tab.color} bg-blue-50` : "text-gray-600"
                )}
                onClick={() => setActiveTab(tab.id as any)}
              >
                <tab.icon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">{tab.label}</TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* Tab Content - Scrollable Container */}
      <div className="flex-1 h-full flex flex-col">
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          {activeTab === 'home' && (
            <HomeMenuTemplates
              onApplyTemplate={applySlideTemplate}
              onAddSlide={addSlide}
            />
          )}

          {activeTab === 'templates' && (
            <SlideTemplatesMenu
              onApplyTemplate={applySlideTemplate}
              onAddSlide={addSlide}
            />
          )}

          {activeTab === 'design' && (
            <DesignMenu
              currentSlide={currentSlide}
              presentation={presentation}
              setPresentation={setPresentation}
              applyTemplate={applyTemplate}
            />
          )}

          {activeTab === 'elements' && (
            <ElementsMenu
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              addShapeElement={addShapeElement}
              addEmojiElement={addEmojiElement}
            />
          )}

          {activeTab === 'text' && (
            <TextMenu
              selectedElement={selectedElement}
              currentSlide={currentSlide}
              presentation={presentation}
              setPresentation={setPresentation}
              setSelectedElement={setSelectedElement}
              updateElement={updateElement}
            />
          )}

          {activeTab === 'borders' && (
            <div className="space-y-6">
              <SlideBorderMenu
                currentSlide={currentSlide}
                presentation={presentation}
                setPresentation={setPresentation}
              />
              <BorderMenu
                selectedElement={selectedElement}
                currentSlide={currentSlide}
                presentation={presentation}
                updateElement={updateElement}
              />
            </div>
          )}

          {activeTab === 'brand' && (
            <BrandMenu
              selectedElement={selectedElement}
              currentSlide={currentSlide}
              presentation={presentation}
              updateElement={updateElement}
            />
          )}

          {activeTab === 'uploads' && (
            <UploadsMenu
              selectedElement={selectedElement}
              currentSlide={currentSlide}
              presentation={presentation}
              setPresentation={setPresentation}
              setSelectedElement={setSelectedElement}
              updateElement={updateElement}
              fileInputRef={fileInputRef}
            />
          )}

          {activeTab === 'tools' && (
            <ToolsMenu
              zoomLevel={zoomLevel}
              zoomIn={zoomIn}
              zoomOut={zoomOut}
              resetZoom={resetZoom}
              addNewSlide={addNewSlide}
              duplicateSlide={duplicateSlide}
              deleteSlide={deleteSlide}
              currentSlide={currentSlide}
              totalSlides={totalSlides}
            />
          )}
        </div>
      </div>
    </div>
  );
}
