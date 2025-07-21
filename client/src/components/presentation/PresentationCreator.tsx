import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Plus, 
  Presentation, 
  Palette, 
  Layout, 
  FileText,
  Sparkles,
  ArrowRight,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNotificationActions } from "@/hooks/useNotifications";

interface PresentationCreatorProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PresentationTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
  slides: number;
  color: string;
}

const presentationTemplates: PresentationTemplate[] = [
  {
    id: "business-pitch",
    name: "Business Pitch",
    description: "Professional presentation for business proposals",
    thumbnail: "from-blue-500 to-purple-600",
    category: "Business",
    slides: 12,
    color: "bg-gradient-to-br from-blue-500 to-purple-600"
  },
  {
    id: "startup-deck",
    name: "Startup Deck",
    description: "Modern design for startup presentations",
    thumbnail: "from-green-500 to-teal-600",
    category: "Startup",
    slides: 15,
    color: "bg-gradient-to-br from-green-500 to-teal-600"
  },
  {
    id: "creative-portfolio",
    name: "Creative Portfolio",
    description: "Showcase your creative work beautifully",
    thumbnail: "from-pink-500 to-rose-600",
    category: "Creative",
    slides: 10,
    color: "bg-gradient-to-br from-pink-500 to-rose-600"
  },
  {
    id: "minimal-clean",
    name: "Minimal Clean",
    description: "Clean and minimal design for any topic",
    thumbnail: "from-gray-600 to-gray-800",
    category: "Minimal",
    slides: 8,
    color: "bg-gradient-to-br from-gray-600 to-gray-800"
  },
  {
    id: "educational",
    name: "Educational",
    description: "Perfect for educational content and training",
    thumbnail: "from-orange-500 to-red-600",
    category: "Education",
    slides: 20,
    color: "bg-gradient-to-br from-orange-500 to-red-600"
  },
  {
    id: "marketing-report",
    name: "Marketing Report",
    description: "Data-driven presentation for marketing insights",
    thumbnail: "from-indigo-500 to-blue-600",
    category: "Marketing",
    slides: 14,
    color: "bg-gradient-to-br from-indigo-500 to-blue-600"
  }
];

export function PresentationCreator({ isOpen, onClose }: PresentationCreatorProps) {
  const [step, setStep] = useState<'template' | 'details' | 'creating'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<PresentationTemplate | null>(null);
  const [presentationData, setPresentationData] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [isCreating, setIsCreating] = useState(false);
  const { notifyProjectCreated } = useNotificationActions();

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setStep('template');
      setSelectedTemplate(null);
      setPresentationData({ title: "", description: "", category: "" });
      setIsCreating(false);
    }
  }, [isOpen]);

  const handleTemplateSelect = (template: PresentationTemplate) => {
    setSelectedTemplate(template);
    setPresentationData(prev => ({
      ...prev,
      category: template.category,
      title: template.name
    }));
    setStep('details');
  };

  const handleCreatePresentation = async () => {
    if (!selectedTemplate || !presentationData.title) return;

    setIsCreating(true);
    setStep('creating');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create notification
      notifyProjectCreated(presentationData.title, "Presentation");
      
      // Simulate opening editor (you would navigate to actual editor)
      setTimeout(() => {
        window.open('https://canva.com/design/DAGtcCPCaJk/_ZqMg4tYQnCWSvn_RMQa/edit', '_blank');
        onClose();
      }, 1000);
      
    } catch (error) {
      console.error("Failed to create presentation:", error);
      setIsCreating(false);
      setStep('details');
    }
  };

  const handleBack = () => {
    if (step === 'details') {
      setStep('template');
      setSelectedTemplate(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Presentation className="h-5 w-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold">
                  {step === 'template' && "Choose a Template"}
                  {step === 'details' && "Presentation Details"}
                  {step === 'creating' && "Creating Presentation"}
                </DialogTitle>
                <DialogDescription>
                  {step === 'template' && "Select a template to get started with your presentation"}
                  {step === 'details' && "Add details to customize your presentation"}
                  {step === 'creating' && "Setting up your presentation workspace"}
                </DialogDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {step === 'template' && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {presentationTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 group"
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <CardContent className="p-4">
                      <div className={cn(
                        "aspect-video rounded-lg mb-3 flex items-center justify-center relative overflow-hidden",
                        template.color
                      )}>
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                        <Presentation className="h-8 w-8 text-white relative z-10" />
                        <div className="absolute bottom-2 right-2 bg-white/20 backdrop-blur-sm rounded px-2 py-1">
                          <span className="text-xs text-white font-medium">{template.slides} slides</span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                      <Badge variant="secondary" className="text-xs">
                        {template.category}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {step === 'details' && selectedTemplate && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Form */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Presentation Title</Label>
                    <Input
                      id="title"
                      value={presentationData.title}
                      onChange={(e) => setPresentationData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter presentation title"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      value={presentationData.description}
                      onChange={(e) => setPresentationData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe your presentation"
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={presentationData.category}
                      onValueChange={(value) => setPresentationData(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Creative">Creative</SelectItem>
                        <SelectItem value="Startup">Startup</SelectItem>
                        <SelectItem value="Personal">Personal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Preview */}
                <div>
                  <Label>Template Preview</Label>
                  <Card className="mt-1">
                    <CardContent className="p-4">
                      <div className={cn(
                        "aspect-video rounded-lg mb-3 flex items-center justify-center",
                        selectedTemplate.color
                      )}>
                        <Presentation className="h-12 w-12 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{selectedTemplate.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{selectedTemplate.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{selectedTemplate.category}</Badge>
                        <Badge variant="outline">{selectedTemplate.slides} slides</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {step === 'creating' && (
            <div className="p-6 flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-white animate-pulse" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Creating Your Presentation</h3>
                <p className="text-gray-600 mb-4">Setting up your workspace with the selected template...</p>
                <div className="w-48 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" style={{ width: '75%' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {(step === 'template' || step === 'details') && (
          <DialogFooter className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                {step === 'details' && (
                  <Button variant="outline" onClick={handleBack}>
                    Back to Templates
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                {step === 'details' && (
                  <Button 
                    onClick={handleCreatePresentation}
                    disabled={!presentationData.title || isCreating}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Create Presentation
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
