import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Image, 
  Palette, 
  Plus, 
  Clock, 
  Star, 
  MoreVertical,
  Edit3,
  Trash2,
  Share2,
  Download,
  Layers
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DesignsProps {
  searchQuery: string;
}

// Mock data for designs
const mockDesigns = [
  {
    id: 1,
    title: "Social Media Post - Summer Sale",
    type: "Social Media",
    lastModified: "2 hours ago",
    size: "2.1 MB",
    isStarred: true,
    dimensions: "1080x1080",
    thumbnail: "/api/placeholder/300/300",
  },
  {
    id: 2,
    title: "Company Logo Design",
    type: "Logo",
    lastModified: "1 day ago",
    size: "1.5 MB",
    isStarred: false,
    dimensions: "500x500",
    thumbnail: "/api/placeholder/300/300",
  },
  {
    id: 3,
    title: "Event Poster - Tech Conference",
    type: "Poster",
    lastModified: "3 days ago",
    size: "4.2 MB",
    isStarred: true,
    dimensions: "1200x1600",
    thumbnail: "/api/placeholder/300/400",
  },
  {
    id: 4,
    title: "Business Card Design",
    type: "Business Card",
    lastModified: "1 week ago",
    size: "0.8 MB",
    isStarred: false,
    dimensions: "900x500",
    thumbnail: "/api/placeholder/300/200",
  },
];

const designTemplates = [
  { 
    name: "Blank Canvas", 
    icon: Image, 
    description: "Start with a blank design",
    color: "bg-pink-100 text-pink-600"
  },
  { 
    name: "Social Media Post", 
    icon: Palette, 
    description: "Instagram, Facebook posts",
    color: "bg-blue-100 text-blue-600"
  },
  { 
    name: "Logo Design", 
    icon: Layers, 
    description: "Professional logo template",
    color: "bg-purple-100 text-purple-600"
  },
  { 
    name: "Poster Design", 
    icon: Image, 
    description: "Event and promotional posters",
    color: "bg-green-100 text-green-600"
  },
];

export function DesignsSection({ searchQuery }: DesignsProps) {
  const [designs] = useState(mockDesigns);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredDesigns = designs.filter(design =>
    design.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateNew = (templateName: string) => {
    console.log(`Creating new design with template: ${templateName}`);
    // TODO: Implement design creation
  };

  const handleDesignAction = (action: string, designId: number) => {
    console.log(`${action} design with ID: ${designId}`);
    // TODO: Implement design actions
  };

  return (
    <div className="space-y-6">
      {/* Create New Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New Design</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {designTemplates.map((template) => {
            const Icon = template.icon;
            return (
              <Card 
                key={template.name} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleCreateNew(template.name)}
              >
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 ${template.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{template.name}</h3>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Designs */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Designs</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              List
            </Button>
          </div>
        </div>

        {filteredDesigns.length === 0 ? (
          <div className="text-center py-12">
            <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No designs found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery ? "Try adjusting your search terms" : "Create your first design to get started"}
            </p>
            <Button onClick={() => handleCreateNew("Blank Canvas")}>
              <Plus className="w-4 h-4 mr-2" />
              Create Design
            </Button>
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" : "space-y-3"}>
            {filteredDesigns.map((design) => (
              <Card key={design.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className={viewMode === "grid" ? "p-4" : "p-4 flex items-center space-x-4"}>
                  {viewMode === "grid" ? (
                    <>
                      <div className="aspect-square bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg mb-3 flex items-center justify-center border-2 border-pink-100">
                        <div className="text-center">
                          <Image className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                          <div className="text-xs text-pink-600 font-medium">{design.dimensions}</div>
                        </div>
                      </div>
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">{design.title}</h3>
                          <div className="flex items-center mt-1 space-x-2">
                            <Badge variant="secondary" className="text-xs bg-pink-100 text-pink-700">
                              {design.type}
                            </Badge>
                            {design.isStarred && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                          </div>
                          <p className="text-sm text-gray-600 mt-1 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {design.lastModified}
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleDesignAction("edit", design.id)}>
                              <Edit3 className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDesignAction("download", design.id)}>
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDesignAction("share", design.id)}>
                              <Share2 className="w-4 h-4 mr-2" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDesignAction("delete", design.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                        <Image className="w-5 h-5 text-pink-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-gray-900 truncate">{design.title}</h3>
                          {design.isStarred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                        </div>
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {design.lastModified} • {design.dimensions}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDesignAction("download", design.id)}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleDesignAction("edit", design.id)}>
                            <Edit3 className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDesignAction("share", design.id)}>
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDesignAction("delete", design.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
