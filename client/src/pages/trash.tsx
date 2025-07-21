import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  RotateCcw, 
  Trash2, 
  MoreVertical, 
  AlertTriangle,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Mock deleted projects data - in real app this would come from API
const mockDeletedProjects = [
  {
    id: 1,
    title: "Old Marketing Presentation",
    type: "Presentation",
    thumbnail: "from-blue-500 to-purple-600",
    deletedDate: "3 days ago",
    originalCreated: "Nov 20, 2024",
    deletedBy: "You"
  },
  {
    id: 2,
    title: "Draft Resume",
    type: "Resume",
    thumbnail: "from-green-500 to-teal-500",
    deletedDate: "1 week ago",
    originalCreated: "Nov 15, 2024",
    deletedBy: "You"
  },
  {
    id: 3,
    title: "Concert Poster Draft",
    type: "Poster",
    thumbnail: "from-purple-500 to-pink-500",
    deletedDate: "2 weeks ago",
    originalCreated: "Nov 1, 2024",
    deletedBy: "You"
  },
  {
    id: 4,
    title: "Logo Concept v1",
    type: "Logo",
    thumbnail: "from-orange-500 to-red-500",
    deletedDate: "3 weeks ago",
    originalCreated: "Oct 25, 2024",
    deletedBy: "You"
  }
];

const filterOptions = [
  { name: "All Items", value: "all" },
  { name: "Presentation", value: "presentation" },
  { name: "Resume", value: "resume" },
  { name: "Poster", value: "poster" },
  { name: "Logo", value: "logo" },
  { name: "YouTube Thumbnail", value: "youtube" },
  { name: "Invitation", value: "invitation" },
];

export default function Trash() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleRestoreProject = (projectId: number) => {
    // TODO: Implement restore project functionality
    console.log("Restore project:", projectId);
  };

  const handlePermanentDelete = (projectId: number) => {
    // TODO: Implement permanent delete functionality
    console.log("Permanently delete project:", projectId);
  };

  const handleEmptyTrash = () => {
    // TODO: Implement empty trash functionality
    console.log("Empty trash");
  };

  const filteredProjects = mockDeletedProjects.filter(project => {
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
            <div className="max-w-7xl mx-auto px-6 py-8">
              {/* Header Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900">Trash</h1>
                    <p className="text-gray-600 mt-2">Restore or permanently delete your projects</p>
                  </div>
                  {mockDeletedProjects.length > 0 && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="flex items-center">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Empty Trash
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Empty Trash</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete all items in trash. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleEmptyTrash} className="bg-red-600 hover:bg-red-700">
                            Empty Trash
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
                
                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      type="text"
                      placeholder="Search deleted items..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 py-3 text-lg border-gray-300 rounded-lg"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Filter className="h-4 w-4" />
                          Filter
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
                        className="rounded-r-none"
                      >
                        <Grid3X3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className="rounded-l-none"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Info Banner */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-yellow-800">Items in trash</h3>
                      <p className="text-sm text-yellow-700 mt-1">
                        Items will be automatically deleted after 30 days. You can restore them or delete them permanently.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Deleted Projects Grid/List */}
              {filteredProjects.length > 0 ? (
                <div className={cn(
                  viewMode === "grid" 
                    ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    : "space-y-4"
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
                          <div className={`aspect-video bg-gradient-to-br ${project.thumbnail} rounded-lg mb-4 flex items-center justify-center relative opacity-75`}>
                            <span className="text-white font-bold text-sm">{project.type}</span>
                            <div className="absolute inset-0 bg-black/10 rounded-lg"></div>
                          </div>
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 truncate">{project.title}</h3>
                              <p className="text-sm text-gray-500 mt-1">Deleted {project.deletedDate}</p>
                              <p className="text-xs text-gray-400 mt-1">Created {project.originalCreated}</p>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handleRestoreProject(project.id)}>
                                  <RotateCcw className="h-4 w-4 mr-2" />
                                  Restore
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handlePermanentDelete(project.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete Forever
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRestoreProject(project.id)}
                              className="flex-1"
                            >
                              <RotateCcw className="h-4 w-4 mr-1" />
                              Restore
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Forever</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently delete "{project.title}". This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handlePermanentDelete(project.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Delete Forever
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className={`w-16 h-12 bg-gradient-to-br ${project.thumbnail} rounded-lg flex items-center justify-center flex-shrink-0 opacity-75`}>
                            <span className="text-white font-bold text-xs">{project.type.charAt(0)}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate">{project.title}</h3>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-sm text-gray-500">{project.type}</span>
                              <span className="text-sm text-gray-500">Deleted {project.deletedDate}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRestoreProject(project.id)}
                            >
                              <RotateCcw className="h-4 w-4 mr-1" />
                              Restore
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Forever</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently delete "{project.title}". This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handlePermanentDelete(project.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Delete Forever
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                /* Empty State */
                <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trash2 className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Trash is empty</h3>
                  <p className="text-gray-500">
                    {searchQuery || activeFilter !== "all" 
                      ? "No deleted items match your search criteria"
                      : "Deleted projects will appear here"
                    }
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
