import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Grid3X3,
  Type,
  Palette,
  Upload,
  Crown,
  Settings,
  Search,
  Sparkles,
  Square,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DesignTab } from './DesignTab';
import { TextTab } from './TextTab';
import { ColorTab } from './ColorTab';
import { BorderTab } from './BorderTab';
import { EffectsTab } from './EffectsTab';
import { ElementsTab } from './ElementsTab';
import { UploadsTab } from './UploadsTab';
import { BrandTab } from './BrandTab';
import { ToolsTab } from './ToolsTab';

type SidebarTab = 
  | 'design' 
  | 'elements' 
  | 'text' 
  | 'colors'
  | 'borders'
  | 'effects'
  | 'brand' 
  | 'uploads' 
  | 'tools';

const sidebarTabs = [
  { id: 'design', icon: Grid3X3, label: 'Design' },
  { id: 'elements', icon: Square, label: 'Elements' },
  { id: 'text', icon: Type, label: 'Text' },
  { id: 'colors', icon: Palette, label: 'Colors' },
  { id: 'borders', icon: Square, label: 'Borders' },
  { id: 'effects', icon: Sparkles, label: 'Effects' },
  { id: 'brand', icon: Crown, label: 'Brand' },
  { id: 'uploads', icon: Upload, label: 'Uploads' },
  { id: 'tools', icon: Settings, label: 'Tools' },
] as const;

export const PresentationSidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SidebarTab>('design');
  const [searchQuery, setSearchQuery] = useState('');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'design':
        return <DesignTab searchQuery={searchQuery} setSearchQuery={setSearchQuery} />;
      case 'elements':
        return <ElementsTab />;
      case 'text':
        return <TextTab />;
      case 'colors':
        return <ColorTab />;
      case 'borders':
        return <BorderTab />;
      case 'effects':
        return <EffectsTab />;
      case 'brand':
        return <BrandTab />;
      case 'uploads':
        return <UploadsTab />;
      case 'tools':
        return <ToolsTab />;
      default:
        return <DesignTab searchQuery={searchQuery} setSearchQuery={setSearchQuery} />;
    }
  };

  const showSearch = activeTab === 'design' || activeTab === 'elements' || activeTab === 'uploads';

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-shrink-0 max-h-full">
      {/* Tab Icons */}
      <div className="w-16 bg-gray-50 border-r border-gray-200 flex flex-col items-center py-4 gap-2 flex-shrink-0 overflow-y-auto">
        {sidebarTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Tooltip key={tab.id}>
              <TooltipTrigger asChild>
                <Button
                  variant={activeTab === tab.id ? 'default' : 'ghost'}
                  size="sm"
                  className={cn(
                    "w-10 h-10 p-0",
                    activeTab === tab.id 
                      ? "bg-purple-600 hover:bg-purple-700 text-white" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  )}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{tab.label}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="flex-1 p-4 overflow-y-auto max-h-full">
        {/* Tab Header */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 capitalize">
            {activeTab}
          </h2>
          
          {/* Search for applicable tabs */}
          {showSearch && (
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          )}
        </div>

        <Separator className="mb-4" />

        {/* Tab Content */}
        <div className="space-y-4">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};
