import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus, Layout, Home } from "lucide-react";
import { slideTemplates } from "@/components/SlideTemplatesData";

interface HomeMenuTemplatesProps {
  onApplyTemplate: (templateId: string) => void;
  onAddSlide: (templateId: string) => void;
  onCreatePresentation?: (templateId: string) => void;
}

export default function HomeMenuTemplates({ 
  onApplyTemplate, 
  onAddSlide, 
  onCreatePresentation 
}: HomeMenuTemplatesProps) {

  const handleTemplateClick = (templateId: string, action: 'add' | 'apply' | 'create') => {
    switch (action) {
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
        <div className="flex items-center gap-2 mb-3">
          <Home className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Home - Slide Templates</h3>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          Choose from professional slide templates to get started quickly
        </p>

        {/* Quick Actions */}
        <div className="flex gap-2 mb-3">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
          >
            <Plus className="h-3 w-3 mr-1" />
            Quick Add
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
          >
            <Layout className="h-3 w-3 mr-1" />
            Apply Layout
          </Button>
        </div>
      </div>

      {/* Templates Grid */}
      <ScrollArea className="flex-1 p-4">
        <div className="grid grid-cols-2 gap-3">
          {slideTemplates.map((template) => (
            <div key={template.id} className="space-y-2">
              {/* Template Card */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="group relative bg-white border-2 border-gray-200 rounded-lg p-3 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all duration-200">
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
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{template.description}</p>
                </TooltipContent>
              </Tooltip>

              {/* Action Buttons */}
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs h-7"
                  onClick={() => handleTemplateClick(template.id, 'add')}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs h-7"
                  onClick={() => handleTemplateClick(template.id, 'apply')}
                >
                  <Layout className="h-3 w-3 mr-1" />
                  Apply
                </Button>
                {onCreatePresentation && (
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1 text-xs h-7"
                    onClick={() => handleTemplateClick(template.id, 'create')}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    New
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
