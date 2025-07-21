import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Plus, 
  Presentation, 
  Sparkles, 
  ArrowRight,
  Zap,
  Palette,
  Layout,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PresentationCreator } from "./PresentationCreator";

interface CreatePresentationToggleProps {
  className?: string;
}

export function CreatePresentationToggle({ className }: CreatePresentationToggleProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCreator, setShowCreator] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCreateClick = () => {
    setShowCreator(true);
    setIsExpanded(false);
  };

  const features = [
    {
      icon: Palette,
      title: "Beautiful Templates",
      description: "Choose from professionally designed templates"
    },
    {
      icon: Layout,
      title: "Smart Layouts",
      description: "Auto-adjusting layouts for perfect presentations"
    },
    {
      icon: Zap,
      title: "Quick Creation",
      description: "Create stunning presentations in minutes"
    },
    {
      icon: FileText,
      title: "Rich Content",
      description: "Add text, images, charts, and more"
    }
  ];

  return (
    <>
      <div className={cn("relative", className)}>
        {/* Main Toggle Button */}
        <Card className={cn(
          "transition-all duration-500 ease-in-out cursor-pointer group hover:shadow-xl",
          isExpanded 
            ? "shadow-2xl scale-105 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200" 
            : "shadow-lg hover:shadow-xl hover:scale-105 bg-white border-gray-200"
        )}>
          <CardContent className="p-6">
            <div 
              className="flex items-center justify-between"
              onClick={handleToggle}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                  isExpanded 
                    ? "bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg scale-110" 
                    : "bg-gradient-to-br from-purple-400 to-pink-400 group-hover:scale-110"
                )}>
                  <Presentation className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className={cn(
                    "font-semibold transition-colors duration-300",
                    isExpanded ? "text-purple-900" : "text-gray-900"
                  )}>
                    Create Presentation
                  </h3>
                  <p className={cn(
                    "text-sm transition-colors duration-300",
                    isExpanded ? "text-purple-600" : "text-gray-600"
                  )}>
                    Design beautiful presentations with AI assistance
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  className={cn(
                    "transition-all duration-300",
                    isExpanded 
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg scale-110" 
                      : "bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCreateClick();
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Create
                </Button>
                
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                  isExpanded 
                    ? "bg-purple-100 text-purple-600 rotate-45" 
                    : "bg-gray-100 text-gray-600 group-hover:bg-purple-100 group-hover:text-purple-600"
                )}>
                  <Plus className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            <div className={cn(
              "overflow-hidden transition-all duration-500 ease-in-out",
              isExpanded ? "max-h-96 opacity-100 mt-6" : "max-h-0 opacity-0"
            )}>
              <div className="space-y-4">
                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className={cn(
                        "p-3 rounded-lg border transition-all duration-300 hover:shadow-md",
                        "bg-white/50 border-purple-200 hover:border-purple-300"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center flex-shrink-0">
                          <feature.icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-medium text-purple-900 text-sm">{feature.title}</h4>
                          <p className="text-xs text-purple-600 mt-1">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <Button
                    onClick={handleCreateClick}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Start Creating
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => setIsExpanded(false)}
                    className="border-purple-200 text-purple-600 hover:bg-purple-50"
                  >
                    Collapse
                  </Button>
                </div>

                {/* Quick Stats */}
                <div className="flex items-center justify-center gap-6 pt-2 border-t border-purple-200">
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-900">50+</div>
                    <div className="text-xs text-purple-600">Templates</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-900">AI</div>
                    <div className="text-xs text-purple-600">Powered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-900">5min</div>
                    <div className="text-xs text-purple-600">Quick Setup</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Floating Action Hint */}
        {!isExpanded && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <Sparkles className="h-3 w-3 text-white" />
          </div>
        )}
      </div>

      {/* Presentation Creator Modal */}
      <PresentationCreator
        isOpen={showCreator}
        onClose={() => setShowCreator(false)}
      />
    </>
  );
}
