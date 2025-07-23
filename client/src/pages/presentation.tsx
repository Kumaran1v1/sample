import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SlideTemplatesMenu from "@/components/SlideTemplatesMenu";

import {
  Search,
  Plus,
  ChevronRight,
  Star,
  Heart,
  Layout
} from "lucide-react";
import { cn } from "@/lib/utils";

// Featured presentation templates
const featuredTemplates = [
  {
    id: 1,
    title: "Business Pitch",
    category: "Business",
    color: "from-blue-500 to-purple-600",
    featured: true,
    new: false,
  },
  {
    id: 2,
    title: "Creative Portfolio",
    category: "Portfolio",
    color: "from-pink-500 to-orange-500",
    featured: false,
    new: true,
  },
  {
    id: 3,
    title: "Education Slides",
    category: "Education",
    color: "from-green-500 to-teal-500",
    featured: false,
    new: false,
  },
  {
    id: 4,
    title: "Marketing Proposal",
    category: "Marketing",
    color: "from-purple-500 to-indigo-600",
    featured: false,
    new: false,
  },
  {
    id: 5,
    title: "Annual Report",
    category: "Business",
    color: "from-blue-400 to-blue-600",
    featured: false,
    new: false,
  },
  {
    id: 6,
    title: "Product Launch",
    category: "Marketing",
    color: "from-red-500 to-pink-600",
    featured: false,
    new: false,
  },
  {
    id: 7,
    title: "Thesis Defense",
    category: "Education",
    color: "from-yellow-400 to-orange-500",
    featured: false,
    new: false,
  },
  {
    id: 8,
    title: "Startup Pitch Deck",
    category: "Business",
    color: "from-indigo-500 to-blue-600",
    featured: false,
    new: false,
  },
];

// Filter categories
const filterCategories = [
  { name: "Slide Templates", active: true },
  { name: "All", active: false },
  { name: "Business", active: false },
  { name: "Education", active: false },
  { name: "Marketing", active: false },
  { name: "Portfolio", active: false },
  { name: "Creative", active: false },
];

export default function Presentation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Slide Templates");
  const [, setLocation] = useLocation();

  // Check for template parameter in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const templateId = urlParams.get('template');

    if (templateId) {
      // Redirect to presentation editor with template
      window.open(`/presentation-editor?template=${templateId}`, '_blank');
      // Clear the template parameter from URL
      window.history.replaceState({}, '', '/presentation');
    }
  }, []);

  const handleCreateNew = () => {
    // Open presentation editor in new tab
    window.open('/presentation-editor', '_blank');
  };

  const handleCreateWithTemplate = (templateId: string) => {
    // Navigate to presentation editor with template
    window.open(`/presentation-editor?template=${templateId}`, '_blank');
  };

  const handleApplyTemplate = (templateId: string) => {
    // For presentation page, we'll create a new presentation with template
    handleCreateWithTemplate(templateId);
  };

  const handleAddSlide = (templateId: string) => {
    // For presentation page, we'll create a new presentation with template
    handleCreateWithTemplate(templateId);
  };

  const handleTemplateClick = (templateId: number) => {
    // Open presentation editor in new tab with selected template
    window.open('/presentation-editor', '_blank');
    console.log("Selected template:", templateId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
              {/* Header Section */}
              <div className="mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3 sm:gap-0">
                  <div className="flex-1">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">Presentations</h1>
                  </div>
                  <div className="w-full sm:w-auto">
                    <Button
                      onClick={handleCreateNew}
                      className="bg-purple-600 hover:bg-purple-700 flex items-center justify-center w-full sm:w-auto px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 text-sm sm:text-base"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      <span className="font-medium">Create Presentation</span>
                    </Button>
                  </div>
                </div>
                
                {/* Search Bar */}
                <div className="relative max-w-2xl mb-4 sm:mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                  <Input
                    type="text"
                    placeholder="Search presentation templates"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 sm:pl-10 py-2 sm:py-3 text-sm sm:text-base border-gray-300 rounded-lg w-full"
                  />
                </div>

                {/* Category Filter Tabs */}
                <div className="overflow-x-auto mb-6 sm:mb-8">
                  <div className="flex gap-2 sm:flex-wrap">
                    {filterCategories.map((category) => {
                      const isActive = activeCategory === category.name;
                      return (
                        <button
                          key={category.name}
                          onClick={() => setActiveCategory(category.name)}
                          className={cn(
                            "px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap",
                            isActive
                              ? "bg-blue-600 text-white"
                              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                          )}
                        >
                          {category.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Slide Templates Section */}
              {activeCategory === "Slide Templates" && (
                <div className="mb-8 sm:mb-12">
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                    <SlideTemplatesMenu
                      onApplyTemplate={handleApplyTemplate}
                      onAddSlide={handleAddSlide}
                    />
                  </div>
                </div>
              )}

              {/* Featured Templates Section */}
              {activeCategory !== "Slide Templates" && (
                <div className="mb-8 sm:mb-12">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Featured Templates</h2>
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gray-400" />
                  </div>

                {/* Responsive Templates Grid - Mobile Single Column Centered */}
                <div className="grid gap-3 sm:gap-4 md:gap-6
                  grid-cols-1
                  sm:grid-cols-2
                  md:grid-cols-3
                  lg:grid-cols-4
                  xl:grid-cols-5
                  2xl:grid-cols-6
                  justify-items-center
                  sm:justify-items-stretch
                  mobile-single-column">
                  {featuredTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 cursor-pointer group
                        p-3 sm:p-3 md:p-4 lg:p-5
                        w-full max-w-sm sm:max-w-none
                        mx-auto sm:mx-0
                        mobile-template-card"
                      onClick={() => handleTemplateClick(template.id)}
                    >
                      {template.featured && (
                        <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                          <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current" />
                          <span className="text-xs font-medium text-white bg-purple-600 px-1.5 sm:px-2 py-0.5 rounded uppercase tracking-wide">FEATURED</span>
                        </div>
                      )}
                      {template.new && (
                        <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">NEW</span>
                        </div>
                      )}
                      <div className={`aspect-[16/9] bg-gradient-to-br ${template.color} rounded-md sm:rounded-lg mb-2 sm:mb-3 md:mb-4 flex items-center justify-center relative group-hover:scale-105 transition-transform duration-200 mobile-template-preview`}>
                        <span className="text-white font-bold text-sm sm:text-sm md:text-base lg:text-lg text-center px-2">{template.title}</span>
                        <div className="absolute top-2 right-2">
                          <Heart className="h-4 w-4 sm:h-4 sm:w-4 text-white hover:text-red-500 cursor-pointer transition-colors" />
                        </div>
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-md sm:rounded-lg flex items-center justify-center">
                          <span className="text-white text-sm font-medium bg-black/20 px-3 py-1.5 rounded">Use Template</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mobile-card-content">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-sm md:text-base truncate pr-2 flex-1 mobile-template-title">{template.title}</h3>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{template.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              )}

              {/* Recently Used Section */}
              {activeCategory !== "Slide Templates" && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Recently Used</h2>
                    <ChevronRight className="h-6 w-6 text-gray-400" />
                  </div>

                  {/* Empty State */}
                <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ChevronRight className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No recent presentations</h3>
                  <p className="text-gray-500 mb-4">Start creating presentations to see them here</p>
                  <Button 
                    onClick={handleCreateNew}
                    variant="outline" 
                    className="mx-auto"
                  >
                    Create New
                  </Button>
                </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
