import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Search,
  PresentationIcon,
  FileText,
  Image,
  Award,
  Video,
  Mail,
  Plus,
  ChevronRight,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";

// Design categories for the dashboard
const designCategories = [
  {
    id: "presentation",
    name: "Presentation",
    icon: PresentationIcon,
    href: "/presentation",
    color: "from-blue-500 to-purple-600",
    description: "Create stunning presentations"
  },
  {
    id: "resume",
    name: "Resume",
    icon: FileText,
    href: "/resume",
    color: "from-green-500 to-teal-500",
    description: "Professional resume templates"
  },
  {
    id: "poster",
    name: "Poster",
    icon: Image,
    href: "/poster",
    color: "from-purple-500 to-pink-500",
    description: "Eye-catching poster designs"
  },
  {
    id: "logo",
    name: "Logo",
    icon: Award,
    href: "/logo",
    color: "from-orange-500 to-red-500",
    description: "Brand identity and logos"
  },
  {
    id: "youtube-thumbnail",
    name: "YouTube Thumbnail",
    icon: Video,
    href: "/youtube-thumbnail",
    color: "from-red-500 to-pink-500",
    description: "Engaging video thumbnails"
  },
  {
    id: "invitation",
    name: "Invitation",
    icon: Mail,
    href: "/invitation",
    color: "from-pink-500 to-purple-500",
    description: "Beautiful event invitations"
  },
];

export function DashboardContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality will be implemented
    console.log(`Searching for: ${searchQuery}`);
  };

  const handleCategoryClick = (href: string) => {
    setLocation(href);
  };

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-3 sm:px-6 py-4 sm:py-6 content-mobile">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4 sm:gap-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Design Studio</h1>
              <p className="text-gray-600 mt-2">Create amazing designs with professional templates</p>
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search all design templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 w-full text-lg border-gray-300 rounded-lg"
              />
            </div>
          </form>

        </div>
      </div>

      {/* Main Content */}
      <div className="p-3 sm:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Design Categories Section */}
          <div className="mb-8 sm:mb-12">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900 responsive-text-xl">What will you design today?</h2>
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
            </div>

            {/* Categories Grid */}
            <div className="responsive-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {designCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.id}
                    onClick={() => handleCategoryClick(category.href)}
                    className="group cursor-pointer bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200"
                  >
                    <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-gray-600 text-sm">{category.description}</p>
                    <div className="mt-4 flex items-center text-purple-600 text-sm font-medium">
                      <span>Get started</span>
                      <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Start Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Quick Start</h2>
              <ChevronRight className="h-6 w-6 text-gray-400" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Featured Quick Actions */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                <Star className="h-8 w-8 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Popular Templates</h3>
                <p className="text-blue-100 text-sm mb-4">Browse trending designs</p>
                <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                  Explore
                </Button>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-xl p-6 text-white">
                <Plus className="h-8 w-8 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Blank Canvas</h3>
                <p className="text-green-100 text-sm mb-4">Start from scratch</p>
                <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                  Create
                </Button>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-6 text-white">
                <Video className="h-8 w-8 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Video Content</h3>
                <p className="text-orange-100 text-sm mb-4">Thumbnails & more</p>
                <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                  Start
                </Button>
              </div>

              <div className="bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl p-6 text-white">
                <Mail className="h-8 w-8 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Events</h3>
                <p className="text-pink-100 text-sm mb-4">Invitations & posters</p>
                <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                  Design
                </Button>
              </div>
            </div>
          </div>

          {/* Recent Projects Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recent Projects</h2>
              <ChevronRight className="h-6 w-6 text-gray-400" />
            </div>

            {/* Empty State */}
            <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No recent projects</h3>
              <p className="text-gray-500 mb-6">Start creating to see your projects here</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {designCategories.slice(0, 3).map((category) => (
                  <Button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.href)}
                    variant="outline"
                    size="sm"
                  >
                    Create {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
