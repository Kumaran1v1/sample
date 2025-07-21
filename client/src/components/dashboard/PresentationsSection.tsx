import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Presentation, 
  Monitor, 
  Plus, 
  Clock, 
  Star, 
  MoreVertical,
  Edit3,
  Trash2,
  Share2,
  Play,
  Users
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PresentationsProps {
  searchQuery: string;
}

// Mock data for presentations
const mockPresentations = [
  {
    id: 1,
    title: "Q1 Business Review",
    type: "Presentation",
    lastModified: "3 hours ago",
    size: "4.2 MB",
    isStarred: true,
    slides: 24,
    thumbnail: "/api/placeholder/300/200",
  },
  {
    id: 2,
    title: "Product Launch Strategy",
    type: "Presentation",
    lastModified: "1 day ago",
    size: "6.8 MB",
    isStarred: false,
    slides: 35,
    thumbnail: "/api/placeholder/300/200",
  },
  {
    id: 3,
    title: "Team Training Session",
    type: "Presentation",
    lastModified: "3 days ago",
    size: "2.1 MB",
    isStarred: true,
    slides: 18,
    thumbnail: "/api/placeholder/300/200",
  },
  {
    id: 4,
    title: "Market Analysis Report",
    type: "Presentation",
    lastModified: "1 week ago",
    size: "5.5 MB",
    isStarred: false,
    slides: 42,
    thumbnail: "/api/placeholder/300/200",
  },
];

const presentationTemplates = [
  { 
    name: "Blank Presentation", 
    icon: Presentation, 
    description: "Start with a clean slide",
    color: "bg-red-100 text-red-600"
  },
  { 
    name: "Business Pitch", 
    icon: Monitor, 
    description: "Professional pitch deck",
    color: "bg-blue-100 text-blue-600"
  },
  { 
    name: "Team Meeting", 
    icon: Users, 
    description: "Meeting presentation template",
    color: "bg-green-100 text-green-600"
  },
  { 
    name: "Training Session", 
    icon: Play, 
    description: "Educational presentation",
    color: "bg-purple-100 text-purple-600"
  },
];

export function PresentationsSection({ searchQuery }: PresentationsProps) {
  const [presentations] = useState(mockPresentations);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredPresentations = presentations.filter(presentation =>
    presentation.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateNew = (templateName: string) => {
    console.log(`Creating new presentation with template: ${templateName}`);
    // TODO: Implement presentation creation
  };

  const handlePresentationAction = (action: string, presentationId: number) => {
    console.log(`${action} presentation with ID: ${presentationId}`);
    // TODO: Implement presentation actions
  };

  return (
    <div className="space-y-6">
      {/* Create New Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New Presentation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {presentationTemplates.map((template) => {
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

      {/* Recent Presentations */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Presentations</h2>
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

        {filteredPresentations.length === 0 ? (
          <div className="text-center py-12">
            <Presentation className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No presentations found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery ? "Try adjusting your search terms" : "Create your first presentation to get started"}
            </p>
            <Button onClick={() => handleCreateNew("Blank Presentation")}>
              <Plus className="w-4 h-4 mr-2" />
              Create Presentation
            </Button>
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" : "space-y-3"}>
            {filteredPresentations.map((presentation) => (
              <Card key={presentation.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className={viewMode === "grid" ? "p-4" : "p-4 flex items-center space-x-4"}>
                  {viewMode === "grid" ? (
                    <>
                      <div className="aspect-[16/10] bg-gradient-to-br from-red-50 to-orange-50 rounded-lg mb-3 flex items-center justify-center border-2 border-red-100">
                        <div className="text-center">
                          <Presentation className="w-8 h-8 text-red-400 mx-auto mb-2" />
                          <div className="text-xs text-red-600 font-medium">{presentation.slides} slides</div>
                        </div>
                      </div>
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">{presentation.title}</h3>
                          <div className="flex items-center mt-1 space-x-2">
                            <Badge variant="secondary" className="text-xs bg-red-100 text-red-700">
                              {presentation.slides} slides
                            </Badge>
                            {presentation.isStarred && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                          </div>
                          <p className="text-sm text-gray-600 mt-1 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {presentation.lastModified}
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handlePresentationAction("present", presentation.id)}>
                              <Play className="w-4 h-4 mr-2" />
                              Present
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handlePresentationAction("edit", presentation.id)}>
                              <Edit3 className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handlePresentationAction("share", presentation.id)}>
                              <Share2 className="w-4 h-4 mr-2" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handlePresentationAction("delete", presentation.id)}
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
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <Presentation className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-gray-900 truncate">{presentation.title}</h3>
                          {presentation.isStarred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                        </div>
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {presentation.lastModified} • {presentation.slides} slides
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handlePresentationAction("present", presentation.id)}
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Present
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handlePresentationAction("edit", presentation.id)}>
                            <Edit3 className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePresentationAction("share", presentation.id)}>
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handlePresentationAction("delete", presentation.id)}
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
