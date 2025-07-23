import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  FileText,
  Share,
  Download,
  Play,
  ChevronDown,
  Crown,
  Save,
  FolderOpen,
  Settings,
  Users,
  MoreHorizontal,
  Square,
  Image,
  Copy,
  Trash2,
  Edit3,
  Eye,
  MessageSquare,
  Undo2,
  Redo2,
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Presentation } from "@/components/presentation/types";

interface PresentationHeaderProps {
  presentation: Presentation;
  setPresentation: React.Dispatch<React.SetStateAction<Presentation>>;
  savePresentation: () => void;
  exportPresentation: (format: "pdf" | "pptx" | "png") => Promise<void>;
  sharePresentation: (shareType: "link" | "email" | "embed") => Promise<void>;
  startPresentation: () => void;
  stopPresentation: () => void;
  isPlaying: boolean;
  isSaving: boolean;
  editMode: string;
  setEditMode: React.Dispatch<React.SetStateAction<"edit" | "view" | "comment">>;
  setShowSettingsDialog: (show: boolean) => void;
  setShowShareDialog: (show: boolean) => void;
  showShareDialog: boolean;
  duplicateSlide: (index: number) => void;
  deleteSlide: (index: number) => void;
  currentSlide: number;
  totalSlides: number;
  uploadFile: (file: File) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  setActiveTab: (tab: 'home' | 'templates' | 'design' | 'elements' | 'text' | 'borders' | 'brand' | 'uploads' | 'tools') => void;
}

export default function PresentationHeader({
  presentation,
  setPresentation,
  savePresentation,
  exportPresentation,
  sharePresentation,
  startPresentation,
  stopPresentation,
  isPlaying,
  isSaving,
  editMode,
  setEditMode,
  setShowSettingsDialog,
  setShowShareDialog,
  showShareDialog,
  duplicateSlide,
  deleteSlide,
  currentSlide,
  totalSlides,
  uploadFile,
  fileInputRef,
  undo,
  redo,
  canUndo,
  canRedo,
  setActiveTab
}: PresentationHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between flex-shrink-0 z-10">
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
            <FileText className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-xl text-cyan-500">DS</span>
        </div>

        {/* Home Button */}
        {setActiveTab && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab('home')}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Home className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            {/* <TooltipContent>
              <p>Home - Slide Templates</p>
            </TooltipContent> */}
          </Tooltip>
        )}

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-cyan-600 font-medium">
                File <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => savePresentation()}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
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
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="sm"
            className="text-cyan-600 font-medium"
            onClick={() => setShowSettingsDialog(true)}
          >
            Resize
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-gray-700 font-medium">
                {editMode === 'edit' ? 'Editing' : editMode === 'view' ? 'Viewing' : 'Commenting'}
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setEditMode('edit')}>
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Mode
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setEditMode('view')}>
                <Eye className="h-4 w-4 mr-2" />
                View Mode
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setEditMode('comment')}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Comment Mode
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>

      {/* Center - Presentation Title */}
      <div className="flex-1 max-w-md mx-4">
        <Input
          value={presentation.title}
          onChange={(e) => setPresentation(prev => ({ ...prev, title: e.target.value }))}
          className="text-center border-none shadow-none text-lg font-medium bg-transparent"
          placeholder="Untitled Presentation"
          onBlur={savePresentation}
        />
        {isSaving && (
          <div className="text-xs text-gray-500 text-center mt-1">Saving...</div>
        )}
      </div>

      {/* Undo/Redo Controls */}
      <div className="flex items-center gap-1 mr-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={undo}
              disabled={!canUndo}
              className={cn(
                "h-8 w-8 p-0",
                canUndo ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100" : "text-gray-300"
              )}
            >
              <Undo2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Undo {canUndo ? '' : '(No actions to undo)'}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={redo}
              disabled={!canRedo}
              className={cn(
                "h-8 w-8 p-0",
                canRedo ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100" : "text-gray-300"
              )}
            >
              <Redo2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Redo {canRedo ? '' : '(No actions to redo)'}</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="text-cyan-600 font-medium">
          <Crown className="h-4 w-4 mr-2" />
          Upgrade to Pro
        </Button>

        <DropdownMenu open={showShareDialog} onOpenChange={setShowShareDialog}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => sharePresentation('link')}>
              <Share className="h-4 w-4 mr-2" />
              Share Link
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => sharePresentation('email')}>
              <Share className="h-4 w-4 mr-2" />
              Share via Email
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => sharePresentation('embed')}>
              <Share className="h-4 w-4 mr-2" />
              Embed Code
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          size="sm"
          className={
            isPlaying ? "bg-red-600 hover:bg-red-700 text-white" : "bg-purple-600 hover:bg-purple-700 text-white"
          }
          onClick={isPlaying ? stopPresentation : startPresentation}
        >
          {isPlaying ? (
            <>
              <Square className="h-4 w-4 mr-2" />
              Stop
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Present
            </>
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => exportPresentation('pdf')}>
              <Download className="h-4 w-4 mr-2" />
              Download as PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => exportPresentation('pptx')}>
              <Download className="h-4 w-4 mr-2" />
              Download as PowerPoint
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => exportPresentation('png')}>
              <Image className="h-4 w-4 mr-2" />
              Download as Images
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setShowSettingsDialog(true)}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => duplicateSlide(currentSlide - 1)}>
              <Copy className="h-4 w-4 mr-2" />
              Duplicate Slide
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => deleteSlide(currentSlide - 1)}
              disabled={totalSlides <= 1}
              className="text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Slide
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Hidden file input for uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pptx,.pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) uploadFile(file);
        }}
      />
    </header>
  );
}
