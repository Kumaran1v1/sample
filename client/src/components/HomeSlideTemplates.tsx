import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus, Layout } from "lucide-react";
import { slideTemplates, SlideTemplate } from "@/components/SlideTemplatesData";

interface HomeSlideTemplatesProps {
  onApplyTemplate: (templateId: string) => void;
  onAddSlide: (templateId: string) => void;
  onCreatePresentation?: (templateId: string) => void;
  showCreateOption?: boolean;
}

export default function HomeSlideTemplates({ 
  onApplyTemplate, 
  onAddSlide, 
  onCreatePresentation,
  showCreateOption = false 
}: HomeSlideTemplatesProps) {
  const [selectedAction, setSelectedAction] = useState<'apply' | 'add' | 'create'>('add');

  const handleTemplateClick = (templateId: string) => {
    switch (selectedAction) {
      case 'add':
        onAddSlide(templateId);
        break;
      case 'apply':
        onApplyTemplate(templateId);
        break;
      case 'create':
        if (onCreatePresentation) {
          onCreatePresentation(templateId);
        }
        break;
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold mb-3">Slide Templates</h3>
        
        {/* Action Toggle */}
        <div className="flex gap-2 mb-3">
          <Button
            variant={selectedAction === 'add' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedAction('add')}
            className="flex-1"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Slide
          </Button>
          <Button
            variant={selectedAction === 'apply' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedAction('apply')}
            className="flex-1"
          >
            <Layout className="h-4 w-4 mr-1" />
            Apply Layout
          </Button>
          {showCreateOption && (
            <Button
              variant={selectedAction === 'create' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedAction('create')}
              className="flex-1"
            >
              <Plus className="h-4 w-4 mr-1" />
              Create New
            </Button>
          )}
        </div>
        
        <p className="text-sm text-gray-600">
          {selectedAction === 'add' && 'Choose a template to add a new slide'}
          {selectedAction === 'apply' && 'Choose a template to apply to current slide'}
          {selectedAction === 'create' && 'Choose a template to create a new presentation'}
        </p>
      </div>

      {/* Templates Grid */}
      <ScrollArea className="flex-1 p-4">
        <div className="grid grid-cols-2 gap-3">
          {slideTemplates.map((template) => (
            <Tooltip key={template.id}>
              <TooltipTrigger asChild>
                <div
                  className="group relative bg-white border-2 border-gray-200 rounded-lg p-3 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all duration-200"
                  onClick={() => handleTemplateClick(template.id)}
                >
                  {/* Template Preview */}
                  <div className="aspect-[4/3] bg-gray-50 rounded border mb-2 flex items-center justify-center relative overflow-hidden">
                    {/* Template Icon */}
                    <template.icon className="h-8 w-8 text-gray-400" />
                    
                    {/* Template Preview Layout */}
                    <div className="absolute inset-2">
                      {template.id === 'title' && (
                        <div className="h-full flex flex-col justify-center items-center">
                          <div className="w-3/4 h-2 bg-gray-300 rounded mb-1"></div>
                          <div className="w-1/2 h-1 bg-gray-200 rounded"></div>
                        </div>
                      )}
                      {template.id === 'title-content' && (
                        <div className="h-full flex flex-col">
                          <div className="w-3/4 h-1.5 bg-gray-300 rounded mb-1"></div>
                          <div className="flex-1 bg-gray-100 rounded"></div>
                        </div>
                      )}
                      {template.id === 'two-column' && (
                        <div className="h-full flex flex-col">
                          <div className="w-3/4 h-1.5 bg-gray-300 rounded mb-1"></div>
                          <div className="flex-1 flex gap-1">
                            <div className="flex-1 bg-gray-100 rounded"></div>
                            <div className="flex-1 bg-gray-100 rounded"></div>
                          </div>
                        </div>
                      )}
                      {template.id === 'title-footer' && (
                        <div className="h-full flex flex-col">
                          <div className="w-3/4 h-1.5 bg-gray-300 rounded mb-1"></div>
                          <div className="flex-1 bg-gray-100 rounded mb-1"></div>
                          <div className="w-full h-1 bg-gray-200 rounded"></div>
                        </div>
                      )}
                      {template.id === 'section-header' && (
                        <div className="h-full flex flex-col justify-center items-center">
                          <div className="w-4/5 h-3 bg-gray-300 rounded mb-1"></div>
                          <div className="w-2/3 h-1 bg-gray-200 rounded"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Template Info */}
                  <div className="text-center">
                    <h4 className="text-sm font-medium text-gray-900 mb-1">
                      {template.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {template.description}
                    </p>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-blue-500 bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-200 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {selectedAction === 'add' && <Plus className="h-6 w-6 text-blue-600" />}
                      {selectedAction === 'apply' && <Layout className="h-6 w-6 text-blue-600" />}
                      {selectedAction === 'create' && <Plus className="h-6 w-6 text-blue-600" />}
                    </div>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{template.description}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
