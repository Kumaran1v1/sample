import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: {
    slideSize: '16:9' | '4:3' | '1:1';
    autoSave: boolean;
    showGrid: boolean;
    snapToGrid: boolean;
    showRulers: boolean;
    showGuides: boolean;
    gridSize: number;
    autoBackup: boolean;
    theme: 'light' | 'dark' | 'auto';
  };
  updateSettings: (settings: Partial<SettingsDialogProps['settings']>) => void;
}

export default function SettingsDialog({
  open,
  onOpenChange,
  settings,
  updateSettings
}: SettingsDialogProps) {
  const slideSizeOptions = [
    { value: '16:9', label: '16:9 (Widescreen)', description: 'Standard presentation format' },
    { value: '4:3', label: '4:3 (Standard)', description: 'Classic presentation format' },
    { value: '1:1', label: '1:1 (Square)', description: 'Social media format' },
  ];

  const themeOptions = [
    { value: 'light', label: 'Light', description: 'Light theme' },
    { value: 'dark', label: 'Dark', description: 'Dark theme' },
    { value: 'auto', label: 'Auto', description: 'Follow system preference' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Presentation Settings</DialogTitle>
          <DialogDescription>
            Configure your presentation editor preferences
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Slide Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Slide Settings</h3>
            
            <div>
              <Label htmlFor="slide-size">Slide Size</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between mt-2">
                    {slideSizeOptions.find(opt => opt.value === settings.slideSize)?.label}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  {slideSizeOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => updateSettings({ slideSize: option.value as any })}
                    >
                      <div>
                        <div className="font-medium">{option.label}</div>
                        <div className="text-sm text-gray-500">{option.description}</div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Editor Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Editor Settings</h3>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-save">Auto-save</Label>
                <p className="text-sm text-gray-500">Automatically save changes</p>
              </div>
              <Switch
                id="auto-save"
                checked={settings.autoSave}
                onCheckedChange={(checked) => updateSettings({ autoSave: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-backup">Auto-backup</Label>
                <p className="text-sm text-gray-500">Create automatic backups</p>
              </div>
              <Switch
                id="auto-backup"
                checked={settings.autoBackup}
                onCheckedChange={(checked) => updateSettings({ autoBackup: checked })}
              />
            </div>

            <div>
              <Label>Theme</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between mt-2">
                    {themeOptions.find(opt => opt.value === settings.theme)?.label}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  {themeOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => updateSettings({ theme: option.value as any })}
                    >
                      <div>
                        <div className="font-medium">{option.label}</div>
                        <div className="text-sm text-gray-500">{option.description}</div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Grid & Guides */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Grid & Guides</h3>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="show-grid">Show grid</Label>
                <p className="text-sm text-gray-500">Display grid overlay</p>
              </div>
              <Switch
                id="show-grid"
                checked={settings.showGrid}
                onCheckedChange={(checked) => updateSettings({ showGrid: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="snap-to-grid">Snap to grid</Label>
                <p className="text-sm text-gray-500">Snap elements to grid</p>
              </div>
              <Switch
                id="snap-to-grid"
                checked={settings.snapToGrid}
                onCheckedChange={(checked) => updateSettings({ snapToGrid: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="show-rulers">Show rulers</Label>
                <p className="text-sm text-gray-500">Display rulers</p>
              </div>
              <Switch
                id="show-rulers"
                checked={settings.showRulers}
                onCheckedChange={(checked) => updateSettings({ showRulers: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="show-guides">Show guides</Label>
                <p className="text-sm text-gray-500">Display alignment guides</p>
              </div>
              <Switch
                id="show-guides"
                checked={settings.showGuides}
                onCheckedChange={(checked) => updateSettings({ showGuides: checked })}
              />
            </div>

            <div>
              <Label>Grid Size: {settings.gridSize}px</Label>
              <Slider
                value={[settings.gridSize]}
                onValueChange={(value) => updateSettings({ gridSize: value[0] })}
                max={50}
                min={10}
                step={5}
                className="mt-2"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => {
                // Reset to defaults
                updateSettings({
                  slideSize: '16:9',
                  autoSave: true,
                  showGrid: false,
                  snapToGrid: false,
                  showRulers: false,
                  showGuides: true,
                  gridSize: 20,
                  autoBackup: true,
                  theme: 'auto'
                });
              }}
              className="flex-1"
            >
              Reset to Defaults
            </Button>
            <Button onClick={() => onOpenChange(false)} className="flex-1">
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
