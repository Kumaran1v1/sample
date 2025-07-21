import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, ChevronRight, Star, Heart, Award, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

// Featured logo templates
const featuredTemplates = [
  {
    id: 1,
    title: "Modern Minimalist",
    category: "Minimalist",
    color: "from-gray-600 to-gray-800",
    featured: true,
    new: false,
  },
  {
    id: 2,
    title: "Tech Startup",
    category: "Technology",
    color: "from-blue-500 to-cyan-500",
    featured: false,
    new: true,
  },
  {
    id: 3,
    title: "Creative Agency",
    category: "Creative",
    color: "from-purple-500 to-pink-500",
    featured: false,
    new: false,
  },
  {
    id: 4,
    title: "Restaurant Logo",
    category: "Food & Beverage",
    color: "from-orange-500 to-red-500",
    featured: false,
    new: false,
  },
  {
    id: 5,
    title: "Fashion Brand",
    category: "Fashion",
    color: "from-pink-500 to-rose-500",
    featured: false,
    new: false,
  },
  {
    id: 6,
    title: "Fitness Center",
    category: "Sports & Fitness",
    color: "from-green-500 to-teal-500",
    featured: false,
    new: false,
  },
  {
    id: 7,
    title: "Financial Services",
    category: "Finance",
    color: "from-blue-600 to-indigo-700",
    featured: false,
    new: false,
  },
  {
    id: 8,
    title: "Eco-Friendly",
    category: "Environment",
    color: "from-green-400 to-emerald-500",
    featured: false,
    new: false,
  },
];

// Filter categories
const filterCategories = [
  { name: "All", active: true },
  { name: "Minimalist", active: false },
  { name: "Technology", active: false },
  { name: "Creative", active: false },
  { name: "Food & Beverage", active: false },
  { name: "Fashion", active: false },
  { name: "Sports & Fitness", active: false },
];

export default function Logo() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const handleCreateNew = () => {
    // TODO: Implement create new logo functionality
    console.log("Create new logo");
  };

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
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-4xl font-bold text-gray-900">Logo Templates</h1>
                  <Button
                    onClick={handleCreateNew}
                    className="bg-purple-600 hover:bg-purple-700 flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Logo
                  </Button>
                </div>
                
                {/* Search Bar */}
                <div className="relative max-w-2xl mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search logo templates"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 py-3 text-lg border-gray-300 rounded-lg"
                  />
                </div>

                {/* Category Filter Tabs */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {filterCategories.map((category) => {
                    const isActive = activeCategory === category.name;
                    return (
                      <button
                        key={category.name}
                        onClick={() => setActiveCategory(category.name)}
                        className={cn(
                          "px-4 py-2 rounded-full text-sm font-medium transition-colors",
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

              {/* Featured Templates Section */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Featured Templates</h2>
                  <ChevronRight className="h-6 w-6 text-gray-400" />
                </div>
                
                {/* Templates Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {featuredTemplates.map((template) => (
                    <div 
                      key={template.id}
                      className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                    >
                      {template.featured && (
                        <div className="flex items-center gap-2 mb-3">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-xs font-medium text-white bg-purple-600 px-2 py-0.5 rounded uppercase tracking-wide">FEATURED</span>
                        </div>
                      )}
                      {template.new && (
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">NEW</span>
                        </div>
                      )}
                      <div className={`aspect-square bg-gradient-to-br ${template.color} rounded-lg mb-4 flex items-center justify-center relative`}>
                        <div className="text-center text-white">
                          <Award className="h-8 w-8 mx-auto mb-2" />
                          <span className="font-bold text-xs">{template.title}</span>
                        </div>
                        <div className="absolute top-2 right-2">
                          <Heart className="h-4 w-4 text-white hover:text-red-500 cursor-pointer" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 text-sm">{template.title}</h3>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{template.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Logo Design Tips Section */}
              <div className="mb-8">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Palette className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-900 mb-2">Logo Design Principles</h3>
                      <ul className="text-blue-800 space-y-1 text-sm">
                        <li>• Keep it simple and memorable</li>
                        <li>• Make it scalable for different sizes</li>
                        <li>• Use appropriate colors for your brand</li>
                        <li>• Ensure it works in black and white</li>
                        <li>• Make it timeless, not trendy</li>
                        <li>• Consider your target audience</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recently Used Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Recently Used</h2>
                  <ChevronRight className="h-6 w-6 text-gray-400" />
                </div>
                
                {/* Empty State */}
                <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No recent logos</h3>
                  <p className="text-gray-500 mb-4">Start creating logos to see them here</p>
                  <Button 
                    onClick={handleCreateNew}
                    variant="outline" 
                    className="mx-auto"
                  >
                    Create New
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
