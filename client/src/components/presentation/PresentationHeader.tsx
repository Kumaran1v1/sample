import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Home,
  ChevronDown,
  Play,
  Share,
  Download,
  Settings,
  Crown,
  Save,
  FolderOpen,
  Edit3,
  Eye,
  MessageSquare,
} from 'lucide-react';
import { usePresentationContext } from './PresentationContext';

export const PresentationHeader: React.FC = () => {
  const {
    presentation,
    setPresentation,
    editMode,
    setEditMode,
    isSaving,
    savePresentation,
    startPresentation,
    exportPresentation,
    sharePresentation,
  } = usePresentationContext();

  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);

  const handleTitleChange = (newTitle: string) => {
    setPresentation(prev => ({ ...prev, title: newTitle }));
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between flex-shrink-0 z-10">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">DS</span>
          </div>
          <Button variant="ghost" size="sm">
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                File <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={savePresentation}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FolderOpen className="h-4 w-4 mr-2" />
                Open
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => exportPresentation('pdf')}>
                <Download className="h-4 w-4 mr-2" />
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportPresentation('pptx')}>
                <Download className="h-4 w-4 mr-2" />
                Export as PowerPoint
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportPresentation('png')}>
                <Download className="h-4 w-4 mr-2" />
                Export as Images
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                Resize <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>16:9 (Widescreen)</DropdownMenuItem>
              <DropdownMenuItem>4:3 (Standard)</DropdownMenuItem>
              <DropdownMenuItem>1:1 (Square)</DropdownMenuItem>
              <DropdownMenuItem>Custom Size</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Center Section */}
      <div className="flex-1 max-w-md mx-4">
        <Input
          value={presentation.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="text-center border-none bg-transparent hover:bg-gray-50 focus:bg-white focus:border-gray-300"
          placeholder="Untitled design"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 mr-4">
          <Button
            variant={editMode === 'edit' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setEditMode('edit')}
          >
            <Edit3 className="h-4 w-4 mr-1" />
            Editing
          </Button>
          <Button
            variant={editMode === 'view' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setEditMode('view')}
          >
            <Eye className="h-4 w-4 mr-1" />
            Viewing
          </Button>
          <Button
            variant={editMode === 'comment' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setEditMode('comment')}
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            Commenting
          </Button>
        </div>

        <Button onClick={startPresentation} className="bg-purple-600 hover:bg-purple-700">
          <Play className="h-4 w-4 mr-2" />
          Present
        </Button>

        <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share Presentation</DialogTitle>
              <DialogDescription>
                Choose how you'd like to share your presentation
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => sharePresentation('link')}
              >
                Share Link
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => sharePresentation('email')}
              >
                Send via Email
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => sharePresentation('embed')}
              >
                Embed Code
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => exportPresentation('pdf')}>
              Export as PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => exportPresentation('pptx')}>
              Export as PowerPoint
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => exportPresentation('png')}>
              Export as Images
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Presentation Settings</DialogTitle>
              <DialogDescription>
                Configure your presentation settings
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Slide Size</label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between mt-1">
                      16:9 (Widescreen) <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    <DropdownMenuItem>16:9 (Widescreen)</DropdownMenuItem>
                    <DropdownMenuItem>4:3 (Standard)</DropdownMenuItem>
                    <DropdownMenuItem>1:1 (Square)</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <div>
                <label className="text-sm font-medium">Auto-save</label>
                <div className="flex items-center space-x-2 mt-2">
                  <input type="checkbox" id="auto-save" defaultChecked />
                  <label htmlFor="auto-save" className="text-sm">
                    Automatically save changes
                  </label>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button variant="ghost" size="sm">
          <Crown className="h-4 w-4 mr-2" />
          Upgrade
        </Button>

        {isSaving && (
          <Badge variant="secondary" className="ml-2">
            Saving...
          </Badge>
        )}
      </div>
    </header>
  );
};
