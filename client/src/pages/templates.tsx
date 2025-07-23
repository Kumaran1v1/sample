import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Layout,
  FileText,
  Heading1,
  Columns2,
  FileImage,
  Hash,
  ArrowLeft,
  Plus
} from "lucide-react";

// Slide Template Types
interface SlideTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  icon: any;
  elements: any[];
}

// Predefined Slide Templates
const slideTemplates: SlideTemplate[] = [
  {
    id: 'blank',
    name: 'Blank',
    description: 'Empty slide for custom content',
    thumbnail: '⬜',
    icon: FileText,
    elements: []
  },
  {
    id: 'title',
    name: 'Title Slide',
    description: 'Perfect for presentation covers with title and subtitle',
    thumbnail: '📄',
    icon: Heading1,
    elements: []
  },
  {
    id: 'title-content',
    name: 'Title & Content',
    description: 'Standard slide layout with title and content area',
    thumbnail: '📝',
    icon: Layout,
    elements: []
  },
  {
    id: 'two-column',
    name: 'Two Column',
    description: 'Side-by-side layout perfect for comparisons',
    thumbnail: '📊',
    icon: Columns2,
    elements: []
  },
  {
    id: 'title-footer',
    name: 'Title & Footer',
    description: 'Content with footer for citations or disclaimers',
    thumbnail: '📋',
    icon: FileImage,
    elements: []
  },
  {
    id: 'section-header',
    name: 'Section Header',
    description: 'Large section title for dividing presentation parts',
    thumbnail: '🏷️',
    icon: Hash,
    elements: []
  }
];

export default function Templates() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  // Redirect to landing page if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "Please sign in to access templates",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const handleCreateWithTemplate = (templateId: string) => {
    // Navigate to presentation editor with template
    setLocation(`/presentation?template=${templateId}`);
  };

  const handleBackToDashboard = () => {
    setLocation("/dashboard");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <div className="flex-1 overflow-y-auto animated-scrollbar">
            <div className="p-6">
              {/* Header Section */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBackToDashboard}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                  </Button>
                </div>

                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Slide Templates
                  </h1>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Choose from professionally designed slide layouts to create stunning presentations quickly and efficiently.
                  </p>
                </div>
              </div>

              {/* Templates Grid */}
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {slideTemplates.map((template) => (
                    <Tooltip key={template.id}>
                      <TooltipTrigger asChild>
                        <div
                          className="group relative bg-white border-2 border-gray-200 rounded-xl p-6 cursor-pointer hover:border-blue-500 hover:shadow-lg transition-all duration-200"
                          onClick={() => handleCreateWithTemplate(template.id)}
                        >
                          {/* Template Preview */}
                          <div className="aspect-[4/3] bg-gray-50 rounded-lg border mb-4 flex items-center justify-center relative overflow-hidden">
                            {/* Template Icon */}
                            <template.icon className="h-12 w-12 text-gray-400" />

                            {/* Template Preview Layout */}
                            <div className="absolute inset-4">
                              {template.id === 'title' && (
                                <div className="h-full flex flex-col justify-center items-center">
                                  <div className="w-3/4 h-3 bg-gray-300 rounded mb-2"></div>
                                  <div className="w-1/2 h-2 bg-gray-200 rounded"></div>
                                </div>
                              )}
                              {template.id === 'title-content' && (
                                <div className="h-full flex flex-col">
                                  <div className="w-3/4 h-2 bg-gray-300 rounded mb-2"></div>
                                  <div className="flex-1 bg-gray-100 rounded"></div>
                                </div>
                              )}
                              {template.id === 'two-column' && (
                                <div className="h-full flex flex-col">
                                  <div className="w-3/4 h-2 bg-gray-300 rounded mb-2"></div>
                                  <div className="flex-1 flex gap-2">
                                    <div className="flex-1 bg-gray-100 rounded"></div>
                                    <div className="flex-1 bg-gray-100 rounded"></div>
                                  </div>
                                </div>
                              )}
                              {template.id === 'title-footer' && (
                                <div className="h-full flex flex-col">
                                  <div className="w-3/4 h-2 bg-gray-300 rounded mb-2"></div>
                                  <div className="flex-1 bg-gray-100 rounded mb-2"></div>
                                  <div className="w-full h-1 bg-gray-200 rounded"></div>
                                </div>
                              )}
                              {template.id === 'section-header' && (
                                <div className="h-full flex flex-col justify-center items-center">
                                  <div className="w-4/5 h-4 bg-gray-300 rounded mb-2"></div>
                                  <div className="w-2/3 h-2 bg-gray-200 rounded"></div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Template Info */}
                          <div className="text-center">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {template.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                              {template.description}
                            </p>

                            {/* Create Button */}
                            <Button
                              className="w-full group-hover:bg-blue-600 transition-colors"
                              size="sm"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Create Presentation
                            </Button>
                          </div>

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-blue-500 bg-opacity-0 group-hover:bg-opacity-5 rounded-xl transition-all duration-200"></div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{template.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>

              {/* Additional Info Section */}
              <div className="max-w-4xl mx-auto mt-12 text-center">
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Professional Slide Templates
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Our slide templates are designed by professionals to help you create stunning presentations quickly.
                    Each template includes pre-positioned text elements that you can easily customize with your content.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                    <div className="flex flex-col items-center">
                      <Layout className="h-8 w-8 text-blue-500 mb-2" />
                      <h3 className="font-semibold mb-1">Professional Layouts</h3>
                      <p className="text-gray-600">Carefully designed layouts for maximum impact</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <FileText className="h-8 w-8 text-green-500 mb-2" />
                      <h3 className="font-semibold mb-1">Easy Customization</h3>
                      <p className="text-gray-600">Click any text element to edit and customize</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <Plus className="h-8 w-8 text-purple-500 mb-2" />
                      <h3 className="font-semibold mb-1">Quick Start</h3>
                      <p className="text-gray-600">Get started immediately with pre-built layouts</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
