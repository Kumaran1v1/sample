import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { DesignTemplate, Presentation } from "@/components/presentation/types";

// Types
interface RecentDesign {
  id: number;
  name: string;
  type: string;
}

interface DesignMenuProps {
  currentSlide: number;
  presentation: Presentation;
  setPresentation: React.Dispatch<React.SetStateAction<Presentation>>;
  applyTemplate: (templateId: string) => void;
}

export default function DesignMenu({ 
  currentSlide, 
  presentation, 
  setPresentation, 
  applyTemplate 
}: DesignMenuProps) {
  const recentDesigns: RecentDesign[] = [
    { id: 1, name: "Untitled Design", type: "Presentation" },
    { id: 2, name: "Untitled Design", type: "Presentation" },
    { id: 3, name: "Untitled Design", type: "Presentation" },
  ];

  const designTemplates: DesignTemplate[] = [
    { id: 0, name: "None", color: "bg-white", isCustom: false },
    { id: 1, name: "Modern Blue", color: "bg-gradient-to-br from-blue-400 to-blue-600", isCustom: false },
    { id: 2, name: "Purple Gradient", color: "bg-gradient-to-br from-purple-400 to-pink-500", isCustom: false },
    { id: 3, name: "Green Nature", color: "bg-gradient-to-br from-green-400 to-teal-500", isCustom: false },
    { id: 4, name: "Orange Sunset", color: "bg-gradient-to-br from-orange-400 to-red-500", isCustom: false },
    { id: 5, name: "Dark Professional", color: "bg-gradient-to-br from-gray-700 to-gray-900", isCustom: false },
    { id: 6, name: "Minimal White", color: "bg-gradient-to-br from-gray-100 to-gray-300", isCustom: false },
    { id: 7, name: "Ocean Wave", color: "bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600", isCustom: false },
    { id: 8, name: "Sunset Glow", color: "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600", isCustom: false },
    { id: 9, name: "Forest Fresh", color: "bg-gradient-to-br from-green-300 via-emerald-500 to-teal-700", isCustom: false },
    { id: 10, name: "Royal Purple", color: "bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-700", isCustom: false },
    { id: 11, name: "Midnight Sky", color: "bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900", isCustom: false },
    { id: 12, name: "Rose Gold", color: "bg-gradient-to-br from-pink-300 via-rose-400 to-orange-400", isCustom: false },
    { id: 13, name: "Arctic Ice", color: "bg-gradient-to-br from-blue-100 via-cyan-200 to-teal-300", isCustom: false },
    { id: 14, name: "Warm Earth", color: "bg-gradient-to-br from-amber-400 via-orange-500 to-red-500", isCustom: false },
    { id: 15, name: "Deep Space", color: "bg-gradient-to-br from-purple-900 via-indigo-900 to-black", isCustom: false },
    { id: 16, name: "Spring Bloom", color: "bg-gradient-to-br from-pink-200 via-purple-300 to-indigo-400", isCustom: false },
    { id: 17, name: "Custom", color: "bg-white", isCustom: true },
  ];

  const handleTemplateClick = (template: DesignTemplate) => {
    if (template.isCustom) {
      const customColor = prompt('Enter custom background (CSS format):', 'linear-gradient(45deg, #ff6b6b, #4ecdc4)');
      if (customColor) {
        setPresentation(prev => ({
          ...prev,
          slides: prev.slides.map((slide, index) =>
            index === currentSlide - 1
              ? { ...slide, background: customColor }
              : slide
          )
        }));
      }
    } else {
      applyTemplate(template.id.toString());
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Recent designs</h3>
        <div className="space-y-2">
          {recentDesigns.map((design) => (
            <div key={design.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="w-10 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded"></div>
              <div>
                <div className="font-medium text-sm">{design.name}</div>
                <div className="text-xs text-gray-500">{design.type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Templates</h3>
        <div className="grid grid-cols-2 gap-2">
          {designTemplates.map((template) => (
            <div
              key={template.id}
              className="cursor-pointer group"
              onClick={() => handleTemplateClick(template)}
            >
              <div className={cn(
                "aspect-video rounded-lg mb-1 transition-transform group-hover:scale-105 border-2 border-gray-200",
                template.color,
                template.isCustom && "border-dashed border-gray-400 flex items-center justify-center"
              )}>
                {template.isCustom && (
                  <div className="text-gray-500 text-xs text-center">
                    <Plus className="h-4 w-4 mx-auto mb-1" />
                    Custom
                  </div>
                )}
              </div>
              <div className="text-xs text-gray-600 text-center">{template.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}