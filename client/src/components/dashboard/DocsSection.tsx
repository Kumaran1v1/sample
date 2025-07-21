import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  File, 
  FileText, 
  Plus, 
  Clock, 
  Star, 
  MoreVertical,
  Edit3,
  Trash2,
  Share2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DocsProps {
  searchQuery: string;
}

// Mock data for documents
const mockDocs = [
  {
    id: 1,
    title: "Project Proposal 2024",
    type: "Document",
    lastModified: "2 hours ago",
    size: "2.4 MB",
    isStarred: true,
    thumbnail: "/api/placeholder/200/250",
  },
  {
    id: 2,
    title: "Meeting Notes - Q1 Review",
    type: "Document",
    lastModified: "1 day ago",
    size: "1.2 MB",
    isStarred: false,
    thumbnail: "/api/placeholder/200/250",
  },
  {
    id: 3,
    title: "User Research Report",
    type: "Document",
    lastModified: "3 days ago",
    size: "5.1 MB",
    isStarred: true,
    thumbnail: "/api/placeholder/200/250",
  },
  {
    id: 4,
    title: "Product Requirements",
    type: "Document",
    lastModified: "1 week ago",
    size: "3.8 MB",
    isStarred: false,
    thumbnail: "/api/placeholder/200/250",
  },
];

const docTemplates = [
  { name: "Blank Document", icon: FileText, description: "Start with a clean slate" },
  { name: "Report Template", icon: File, description: "Professional report format" },
  { name: "Letter Template", icon: FileText, description: "Formal letter layout" },
  { name: "Resume Template", icon: File, description: "Professional resume design" },
];

export function DocsSection({ searchQuery }: DocsProps) {
  const [docs] = useState(mockDocs);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredDocs = docs.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateNew = (templateName: string) => {
    console.log(`Creating new document with template: ${templateName}`);
    // TODO: Implement document creation
  };

  const handleDocAction = (action: string, docId: number) => {
    console.log(`${action} document with ID: ${docId}`);
    // TODO: Implement document actions
  };

  return (
    <div className="space-y-6">
      {/* Create New Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New Document</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {docTemplates.map((template) => {
            const Icon = template.icon;
            return (
              <Card 
                key={template.name} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleCreateNew(template.name)}
              >
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{template.name}</h3>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Documents */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Documents</h2>
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

        {filteredDocs.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery ? "Try adjusting your search terms" : "Create your first document to get started"}
            </p>
            <Button onClick={() => handleCreateNew("Blank Document")}>
              <Plus className="w-4 h-4 mr-2" />
              Create Document
            </Button>
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" : "space-y-3"}>
            {filteredDocs.map((doc) => (
              <Card key={doc.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className={viewMode === "grid" ? "p-4" : "p-4 flex items-center space-x-4"}>
                  {viewMode === "grid" ? (
                    <>
                      <div className="aspect-[4/5] bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                        <FileText className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">{doc.title}</h3>
                          <div className="flex items-center mt-1 space-x-2">
                            <Badge variant="secondary" className="text-xs">{doc.type}</Badge>
                            {doc.isStarred && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                          </div>
                          <p className="text-sm text-gray-600 mt-1 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {doc.lastModified}
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleDocAction("edit", doc.id)}>
                              <Edit3 className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDocAction("share", doc.id)}>
                              <Share2 className="w-4 h-4 mr-2" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDocAction("delete", doc.id)}
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
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-gray-900 truncate">{doc.title}</h3>
                          {doc.isStarred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                        </div>
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {doc.lastModified} • {doc.size}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleDocAction("edit", doc.id)}>
                            <Edit3 className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDocAction("share", doc.id)}>
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDocAction("delete", doc.id)}
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
