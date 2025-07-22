import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { HelpCircle } from "lucide-react";

interface KeyboardShortcut {
  action: string;
  shortcut: string;
  category: string;
}

export default function KeyboardShortcuts() {
  const shortcuts: KeyboardShortcut[] = [
    // File Operations
    { action: "Save presentation", shortcut: "Ctrl + S", category: "File" },
    { action: "Open presentation", shortcut: "Ctrl + O", category: "File" },
    { action: "New presentation", shortcut: "Ctrl + N", category: "File" },
    { action: "Export as PDF", shortcut: "Ctrl + E", category: "File" },
    { action: "Print", shortcut: "Ctrl + P", category: "File" },

    // Slide Operations
    { action: "Add new slide", shortcut: "Ctrl + M", category: "Slides" },
    { action: "Duplicate slide", shortcut: "Ctrl + D", category: "Slides" },
    { action: "Delete slide", shortcut: "Delete", category: "Slides" },
    { action: "Next slide", shortcut: "Page Down", category: "Slides" },
    { action: "Previous slide", shortcut: "Page Up", category: "Slides" },
    { action: "Go to first slide", shortcut: "Home", category: "Slides" },
    { action: "Go to last slide", shortcut: "End", category: "Slides" },

    // Presentation
    { action: "Start presentation", shortcut: "F5", category: "Presentation" },
    { action: "Start from current slide", shortcut: "Shift + F5", category: "Presentation" },
    { action: "Exit presentation", shortcut: "Esc", category: "Presentation" },

    // Editing
    { action: "Copy", shortcut: "Ctrl + C", category: "Edit" },
    { action: "Cut", shortcut: "Ctrl + X", category: "Edit" },
    { action: "Paste", shortcut: "Ctrl + V", category: "Edit" },
    { action: "Undo", shortcut: "Ctrl + Z", category: "Edit" },
    { action: "Redo", shortcut: "Ctrl + Y", category: "Edit" },
    { action: "Select all", shortcut: "Ctrl + A", category: "Edit" },
    { action: "Delete selected", shortcut: "Delete", category: "Edit" },

    // View
    { action: "Zoom in", shortcut: "Ctrl + +", category: "View" },
    { action: "Zoom out", shortcut: "Ctrl + -", category: "View" },
    { action: "Reset zoom", shortcut: "Ctrl + 0", category: "View" },
    { action: "Fit to window", shortcut: "Ctrl + 1", category: "View" },
    { action: "Toggle grid", shortcut: "Ctrl + G", category: "View" },
    { action: "Toggle rulers", shortcut: "Ctrl + R", category: "View" },

    // Text Formatting
    { action: "Bold", shortcut: "Ctrl + B", category: "Format" },
    { action: "Italic", shortcut: "Ctrl + I", category: "Format" },
    { action: "Underline", shortcut: "Ctrl + U", category: "Format" },
    { action: "Increase font size", shortcut: "Ctrl + ]", category: "Format" },
    { action: "Decrease font size", shortcut: "Ctrl + [", category: "Format" },

    // Alignment
    { action: "Align left", shortcut: "Ctrl + L", category: "Align" },
    { action: "Align center", shortcut: "Ctrl + E", category: "Align" },
    { action: "Align right", shortcut: "Ctrl + R", category: "Align" },
    { action: "Justify", shortcut: "Ctrl + J", category: "Align" },

    // Navigation
    { action: "Focus sidebar", shortcut: "Ctrl + 1", category: "Navigation" },
    { action: "Focus canvas", shortcut: "Ctrl + 2", category: "Navigation" },
    { action: "Focus slide panel", shortcut: "Ctrl + 3", category: "Navigation" },
    { action: "Search", shortcut: "Ctrl + F", category: "Navigation" },
  ];

  const categories = Array.from(new Set(shortcuts.map(s => s.category)));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="fixed bottom-4 right-4 bg-white shadow-lg border rounded-full w-10 h-10 p-0"
        >
          <HelpCircle className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Keyboard Shortcuts
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="font-semibold text-lg mb-3 text-blue-600">{category}</h3>
              <div className="space-y-2">
                {shortcuts
                  .filter(shortcut => shortcut.category === category)
                  .map((shortcut, index) => (
                    <div key={index} className="flex justify-between items-center py-1">
                      <span className="text-sm">{shortcut.action}</span>
                      <Badge variant="outline" className="font-mono text-xs">
                        {shortcut.shortcut}
                      </Badge>
                    </div>
                  ))}
              </div>
              {category !== categories[categories.length - 1] && (
                <Separator className="mt-4" />
              )}
            </div>
          ))}

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Tips</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Use Ctrl (Cmd on Mac) + key combinations for most actions</li>
              <li>• Function keys (F1-F12) provide quick access to common features</li>
              <li>• Arrow keys can be used to navigate between slides</li>
              <li>• Hold Shift while using shortcuts for additional options</li>
              <li>• Press Esc to cancel most operations</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Presentation Mode</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Next slide</span>
                <Badge variant="outline" className="font-mono text-xs">Space / →</Badge>
              </div>
              <div className="flex justify-between">
                <span>Previous slide</span>
                <Badge variant="outline" className="font-mono text-xs">Backspace / ←</Badge>
              </div>
              <div className="flex justify-between">
                <span>Go to slide</span>
                <Badge variant="outline" className="font-mono text-xs">Number + Enter</Badge>
              </div>
              <div className="flex justify-between">
                <span>Black screen</span>
                <Badge variant="outline" className="font-mono text-xs">B</Badge>
              </div>
              <div className="flex justify-between">
                <span>White screen</span>
                <Badge variant="outline" className="font-mono text-xs">W</Badge>
              </div>
              <div className="flex justify-between">
                <span>Exit presentation</span>
                <Badge variant="outline" className="font-mono text-xs">Esc</Badge>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
