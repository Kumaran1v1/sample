import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Home,
  FileText,
  Image,
  Type,
  Palette,
  Upload,
  Settings,
  Share,
  Download,
  Play,
  Plus,
  ChevronDown,
  Search,
  Grid3X3,
  Square,
  Circle,
  Triangle,
  Star,
  Heart,
  Zap,
  Clock,
  Users,
  MoreHorizontal,
  Crown,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function PresentationEditor() {
  const [activeTab, setActiveTab] = useState<'design' | 'elements' | 'text' | 'brand' | 'uploads' | 'tools'>('design');
  const [currentSlide, setCurrentSlide] = useState(1);
  const [totalSlides] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(30);

  const sidebarTabs = [
    { id: 'design', icon: Grid3X3, label: 'Design', color: 'text-blue-600' },
    { id: 'elements', icon: Square, label: 'Elements', color: 'text-green-600' },
    { id: 'text', icon: Type, label: 'Text', color: 'text-purple-600' },
    { id: 'brand', icon: Palette, label: 'Brand', color: 'text-orange-600' },
    { id: 'uploads', icon: Upload, label: 'Uploads', color: 'text-pink-600' },
    { id: 'tools', icon: Settings, label: 'Tools', color: 'text-gray-600' },
  ];

  const recentDesigns = [
    { id: 1, name: "Untitled Design", type: "Presentation" },
    { id: 2, name: "Untitled Design", type: "Presentation" },
    { id: 3, name: "Untitled Design", type: "Presentation" },
  ];

  const designTemplates = [
    { id: 1, name: "Modern Blue", color: "bg-gradient-to-br from-blue-400 to-blue-600" },
    { id: 2, name: "Purple Gradient", color: "bg-gradient-to-br from-purple-400 to-pink-500" },
    { id: 3, name: "Green Nature", color: "bg-gradient-to-br from-green-400 to-teal-500" },
    { id: 4, name: "Orange Sunset", color: "bg-gradient-to-br from-orange-400 to-red-500" },
    { id: 5, name: "Dark Professional", color: "bg-gradient-to-br from-gray-700 to-gray-900" },
    { id: 6, name: "Minimal White", color: "bg-gradient-to-br from-gray-100 to-gray-300" },
  ];

  const elements = [
    { icon: Square, name: "Rectangle", category: "Shapes" },
    { icon: Circle, name: "Circle", category: "Shapes" },
    { icon: Triangle, name: "Triangle", category: "Shapes" },
    { icon: Star, name: "Star", category: "Shapes" },
    { icon: Heart, name: "Heart", category: "Shapes" },
    { icon: Zap, name: "Lightning", category: "Icons" },
  ];

  return (
    <TooltipProvider>
      <div className="h-screen bg-gray-50 flex flex-col">
        {/* Top Header - Canva Style */}
        <header className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-xl text-cyan-500">Canva</span>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="text-cyan-600 font-medium">
                File
              </Button>
              <Button variant="ghost" size="sm" className="text-cyan-600 font-medium">
                Resize
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-gray-700 font-medium">
                    Editing <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Edit Mode</DropdownMenuItem>
                  <DropdownMenuItem>View Mode</DropdownMenuItem>
                  <DropdownMenuItem>Comment Mode</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>

          {/* Center - Presentation Title */}
          <div className="flex-1 max-w-md mx-4">
            <Input
              defaultValue="Untitled design - Presentation"
              className="text-center border-none shadow-none text-lg font-medium bg-transparent"
              placeholder="Untitled Presentation"
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-cyan-600 font-medium">
              <Crown className="h-4 w-4 mr-2" />
              Upgrade to Canva Pro
            </Button>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
              <Play className="h-4 w-4 mr-2" />
              Present
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="flex-1 flex">
          {/* Left Sidebar */}
          <div className="w-80 bg-white border-r border-gray-200 flex">
            {/* Tab Icons */}
            <div className="w-16 bg-gray-50 border-r border-gray-200 flex flex-col items-center py-4 gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
                    <Home className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Home</TooltipContent>
              </Tooltip>

              {sidebarTabs.map((tab) => (
                <Tooltip key={tab.id}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-10 h-10 p-0",
                        activeTab === tab.id ? `${tab.color} bg-blue-50` : "text-gray-600"
                      )}
                      onClick={() => setActiveTab(tab.id as any)}
                    >
                      <tab.icon className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">{tab.label}</TooltipContent>
                </Tooltip>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 p-4">
              {activeTab === 'design' && (
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
                        <div key={template.id} className="cursor-pointer group">
                          <div className={cn("aspect-video rounded-lg mb-1", template.color)}></div>
                          <div className="text-xs text-gray-600 text-center">{template.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'elements' && (
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search elements" className="pl-10" />
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Shapes</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {elements.map((element, index) => (
                        <div key={index} className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100">
                          <element.icon className="h-6 w-6 text-gray-600" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'text' && (
                <div className="space-y-4">
                  <Button className="w-full justify-start" variant="outline">
                    <Type className="h-4 w-4 mr-2" />
                    Add a heading
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Type className="h-4 w-4 mr-2" />
                    Add a subheading
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Type className="h-4 w-4 mr-2" />
                    Add body text
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Main Canvas Area */}
          <div className="flex-1 flex flex-col">
            {/* Canvas */}
            <div className="flex-1 bg-gray-100 p-8 flex items-center justify-center">
              <Card className="w-full max-w-4xl aspect-video shadow-2xl border-2 border-purple-200">
                <CardContent className="p-0 h-full bg-white rounded-lg flex items-center justify-center relative">
                  <div className="absolute inset-4 border-2 border-dashed border-purple-300 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <Sparkles className="h-16 w-16 mx-auto mb-4" />
                      <h2 className="text-2xl font-bold mb-2">Click to add content</h2>
                      <p className="text-gray-500">Start designing your presentation</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bottom Controls */}
            <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Notes
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Clock className="h-4 w-4 mr-2" />
                    Duration
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Clock className="h-4 w-4 mr-2" />
                    Timer
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="text-sm text-gray-600">
                  {zoomLevel}%
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    Pages
                  </Button>
                  <span className="text-sm text-gray-600">
                    {currentSlide} / {totalSlides}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
