import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Copy, 
  Download,
  Folder,
  Calendar,
  Filter,
  Grid3X3,
  List
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock project data - in real app this would come from API
const mockProjects = [
  {
    id: 1,
    title: "Marketing Presentation",
    type: "Presentation",
    thumbnail: "from-blue-500 to-purple-600",
    lastModified: "2 hours ago",
    created: "Dec 15, 2024",
    status: "draft"
  },
  {
    id: 2,
    title: "My Resume 2024",
    type: "Resume",
    thumbnail: "from-green-500 to-teal-500",
    lastModified: "1 day ago",
    created: "Dec 14, 2024",
    status: "completed"
  },
  {
    id: 3,
    title: "Event Poster",
    type: "Poster",
    thumbnail: "from-purple-500 to-pink-500",
    lastModified: "3 days ago",
    created: "Dec 12, 2024",
    status: "draft"
  },
  {
    id: 4,
    title: "Company Logo",
    type: "Logo",
    thumbnail: "from-orange-500 to-red-500",
    lastModified: "1 week ago",
    created: "Dec 8, 2024",
    status: "completed"
  },
  {
    id: 5,
    title: "YouTube Thumbnail",
    type: "YouTube Thumbnail",
    thumbnail: "from-red-500 to-pink-500",
    lastModified: "1 week ago",
    created: "Dec 7, 2024",
    status: "draft"
  },
  {
    id: 6,
    title: "Wedding Invitation",
    type: "Invitation",
    thumbnail: "from-pink-500 to-purple-500",
    lastModified: "2 weeks ago",
    created: "Dec 1, 2024",
    status: "completed"
  }
];

const filterOptions = [
  { name: "All Projects", value: "all" },
  { name: "Presentation", value: "presentation" },
  { name: "Resume", value: "resume" },
  { name: "Poster", value: "poster" },
  { name: "Logo", value: "logo" },
  { name: "YouTube Thumbnail", value: "youtube" },
  { name: "Invitation", value: "invitation" },
];

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleCreateNew = () => {
    // TODO: Implement create new project functionality
    console.log("Create new project");
  };

  const handleEditProject = (projectId: number) => {
    // TODO: Implement edit project functionality
    console.log("Edit project:", projectId);
  };

  const handleDeleteProject = (projectId: number) => {
    // TODO: Implement delete project functionality (move to trash)
    console.log("Delete project:", projectId);
  };

  const handleDuplicateProject = (projectId: number) => {
    // TODO: Implement duplicate project functionality
    console.log("Duplicate project:", projectId);
  };

  const handleDownloadProject = (projectId: number) => {
    // TODO: Implement download project functionality
    console.log("Download project:", projectId);
  };

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" || 
      project.type.toLowerCase().replace(" ", "").includes(activeFilter);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8 content-mobile">
              {/* Header Section */}
              <div className="mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4 sm:gap-0">
                  <div>
                    <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 responsive-text-xl">My Projects</h1>
                    <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2 responsive-text-base">Manage and organize your design projects</p>
                  </div>
                  <Button
                    onClick={handleCreateNew}
                    className="bg-purple-600 hover:bg-purple-700 flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create New
                  </Button>
                </div>
                
                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                    <Input
                      type="text"
                      placeholder="Search projects..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 sm:pl-10 py-2 sm:py-3 text-sm sm:text-lg border-gray-300 rounded-lg"
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3">
                          <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="hidden xs:inline">Filter</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="minimal-scrollbar">
                        {filterOptions.map((option) => (
                          <DropdownMenuItem
                            key={option.value}
                            onClick={() => setActiveFilter(option.value)}
                            className={activeFilter === option.value ? "bg-purple-50" : ""}
                          >
                            {option.name}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    <div className="flex border border-gray-300 rounded-lg">
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className="rounded-r-none px-2 sm:px-3"
                      >
                        <Grid3X3 className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className="rounded-l-none px-2 sm:px-3"
                      >
                        <List className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Projects Grid/List */}
              {filteredProjects.length > 0 ? (
                <div className={cn(
                  "premium-scrollbar responsive-grid",
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6"
                    : "space-y-3 sm:space-y-4"
                )}>
                  {filteredProjects.map((project) => (
                    <div 
                      key={project.id}
                      className={cn(
                        "bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200",
                        viewMode === "grid" ? "p-5" : "p-4 flex items-center gap-4"
                      )}
                    >
                      {viewMode === "grid" ? (
                        <>
                          <div className={`aspect-video bg-gradient-to-br ${project.thumbnail} rounded-lg mb-4 flex items-center justify-center relative group`}>
                            <span className="text-white font-bold text-sm">{project.type}</span>
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <Button
                                size="sm"
                                onClick={() => handleEditProject(project.id)}
                                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 truncate">{project.title}</h3>
                              <p className="text-sm text-gray-500 mt-1">{project.lastModified}</p>
                              <span className={cn(
                                "inline-block px-2 py-1 text-xs rounded-full mt-2",
                                project.status === "completed" 
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              )}>
                                {project.status}
                              </span>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handleEditProject(project.id)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDuplicateProject(project.id)}>
                                  <Copy className="h-4 w-4 mr-2" />
                                  Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDownloadProject(project.id)}>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleDeleteProject(project.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className={`w-16 h-12 bg-gradient-to-br ${project.thumbnail} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <span className="text-white font-bold text-xs">{project.type.charAt(0)}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate">{project.title}</h3>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-sm text-gray-500">{project.type}</span>
                              <span className="text-sm text-gray-500">{project.lastModified}</span>
                              <span className={cn(
                                "px-2 py-1 text-xs rounded-full",
                                project.status === "completed" 
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              )}>
                                {project.status}
                              </span>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={() => handleEditProject(project.id)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDuplicateProject(project.id)}>
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDownloadProject(project.id)}>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteProject(project.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                /* Empty State */
                <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Folder className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects found</h3>
                  <p className="text-gray-500 mb-6">
                    {searchQuery || activeFilter !== "all" 
                      ? "Try adjusting your search or filter criteria"
                      : "Start creating your first design project"
                    }
                  </p>
                  <Button 
                    onClick={handleCreateNew}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Project
                  </Button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
