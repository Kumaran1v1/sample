import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Plus, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePresentationContext } from '../PresentationContext';
import { DesignTemplate } from '../types';

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

interface DesignTabProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const DesignTab: React.FC<DesignTabProps> = ({ searchQuery, setSearchQuery }) => {
  const { applyTemplate } = usePresentationContext();

  const filteredTemplates = designTemplates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTemplateClick = (template: DesignTemplate) => {
    if (template.isCustom) {
      const customColor = prompt('Enter custom background (CSS format):', 'linear-gradient(45deg, #ff6b6b, #4ecdc4)');
      if (customColor) {
        // Handle custom template application
        console.log('Custom template:', customColor);
      }
    } else {
      applyTemplate(template.id.toString());
    }
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Templates */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Templates</h3>
        <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
          {filteredTemplates.map((template) => (
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

      <Separator />

      {/* Recent designs */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Recent designs</h3>
        <div className="grid grid-cols-2 gap-2">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
              <div className="text-center text-gray-400">
                <Plus className="h-6 w-6 mx-auto mb-1" />
                <div className="text-xs">Recent {item}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Background Colors */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Background Colors</h3>
        <div className="grid grid-cols-6 gap-2">
          {[
            { name: "White", color: "bg-white", value: "bg-white" },
            { name: "Light Gray", color: "bg-gray-100", value: "bg-gray-100" },
            { name: "Gray", color: "bg-gray-300", value: "bg-gray-300" },
            { name: "Dark Gray", color: "bg-gray-700", value: "bg-gray-700" },
            { name: "Black", color: "bg-black", value: "bg-black" },
            { name: "Blue", color: "bg-blue-500", value: "bg-blue-500" },
            { name: "Purple", color: "bg-purple-500", value: "bg-purple-500" },
            { name: "Pink", color: "bg-pink-500", value: "bg-pink-500" },
            { name: "Red", color: "bg-red-500", value: "bg-red-500" },
            { name: "Orange", color: "bg-orange-500", value: "bg-orange-500" },
            { name: "Yellow", color: "bg-yellow-500", value: "bg-yellow-500" },
            { name: "Green", color: "bg-green-500", value: "bg-green-500" },
          ].map((color, index) => (
            <div
              key={index}
              className={cn(
                "aspect-square rounded cursor-pointer border-2 border-gray-200 hover:border-gray-400 transition-colors",
                color.color
              )}
              onClick={() => {
                // Apply solid color background
                console.log('Apply background:', color.value);
              }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      <Separator />

      {/* Gradient Backgrounds */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Gradient Backgrounds</h3>
        <div className="grid grid-cols-3 gap-2">
          {[
            "bg-gradient-to-r from-blue-400 to-purple-500",
            "bg-gradient-to-r from-green-400 to-blue-500",
            "bg-gradient-to-r from-purple-400 to-pink-500",
            "bg-gradient-to-r from-yellow-400 to-red-500",
            "bg-gradient-to-r from-pink-400 to-red-500",
            "bg-gradient-to-r from-indigo-400 to-cyan-500",
          ].map((gradient, index) => (
            <div
              key={index}
              className={cn(
                "aspect-video rounded cursor-pointer border-2 border-gray-200 hover:border-gray-400 transition-colors",
                gradient
              )}
              onClick={() => {
                // Apply gradient background
                console.log('Apply gradient:', gradient);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
