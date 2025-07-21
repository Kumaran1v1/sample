import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Home,
  FileText,
  Folder,
  Trash2,
  Palette,
  LogOut,
  PresentationIcon,
  Image,
  Video,
  Mail,
  Award,
  Menu,
  X
} from "lucide-react";

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Presentation', href: '/presentation', icon: PresentationIcon },
  { name: 'Resume', href: '/resume', icon: FileText },
  { name: 'Poster', href: '/poster', icon: Image },
  { name: 'Logo', href: '/logo', icon: Award },
  { name: 'YouTube Thumbnail', href: '/youtube-thumbnail', icon: Video },
  { name: 'Invitation', href: '/invitation', icon: Mail },
  { name: 'My Projects', href: '/projects', icon: Folder },
  { name: 'Trash', href: '/trash', icon: Trash2 },
];

export function Sidebar() {
  const [location, setLocation] = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if we're on mobile or small tablet
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      // Mobile: < 768px, Small tablet: 768-1023px, Desktop: >= 1024px
      const isMobile = width < 768;
      const isSmallTablet = width >= 768 && width < 1024;

      setIsCollapsed(isMobile || isSmallTablet);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleMobileMenu}
        className="mobile-menu-btn fixed top-4 left-4 z-50 md:hidden bg-white shadow-md hover:bg-gray-50 transition-all duration-200"
      >
        {isMobileMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
      </Button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-screen bg-white shadow-lg z-40 transition-all duration-300 flex flex-col overflow-hidden",
        // Desktop: always visible, responsive width
        "md:relative md:translate-x-0",
        // Mobile: slide in/out, responsive width
        isMobileMenuOpen ? "translate-x-0 w-64 sidebar-mobile" : "-translate-x-full w-64 sidebar-mobile",
        // Responsive width based on screen size
        isCollapsed && !isMobileMenuOpen
          ? "md:w-16" // Collapsed on tablet and small desktop
          : "md:w-56 lg:w-64 xl:w-72" // Progressive width increase
      )}>
        {/* Header */}
        <div className={cn(
          "p-4 border-b border-gray-100",
          isCollapsed && !isMobileMenuOpen ? "md:p-2" : "lg:p-6"
        )}>
          <div className="flex items-center">
            <div className={cn(
              "bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center",
              isCollapsed && !isMobileMenuOpen ? "w-8 h-8" : "w-8 h-8 lg:w-10 lg:h-10"
            )}>
              <Palette className={cn(
                "text-white",
                isCollapsed && !isMobileMenuOpen ? "w-4 h-4" : "w-4 h-4 lg:w-6 lg:h-6"
              )} />
            </div>
            {(!isCollapsed || isMobileMenuOpen) && (
              <h2 className="ml-2 lg:ml-3 text-lg lg:text-xl font-bold text-gray-900 truncate">
                Design Studio
              </h2>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-hidden">
          <nav className={cn(
            "space-y-1",
            isCollapsed && !isMobileMenuOpen ? "p-2" : "p-4"
          )}>
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;

              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setLocation(item.href);
                    setIsMobileMenuOpen(false); // Close mobile menu on navigation
                  }}
                  className={cn(
                    "flex items-center w-full text-sm font-medium rounded-lg transition-all duration-200 group relative",
                    isCollapsed && !isMobileMenuOpen
                      ? "p-2 justify-center"
                      : "px-3 py-2.5",
                    isActive
                      ? "text-purple-700 bg-purple-50"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                  title={isCollapsed && !isMobileMenuOpen ? item.name : undefined}
                >
                  <Icon className={cn(
                    "flex-shrink-0",
                    isCollapsed && !isMobileMenuOpen
                      ? "w-5 h-5"
                      : "mr-3 w-4 h-4 lg:w-5 lg:h-5"
                  )} />
                  {(!isCollapsed || isMobileMenuOpen) && (
                    <span className="truncate">{item.name}</span>
                  )}

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && !isMobileMenuOpen && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {item.name}
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        {(!isCollapsed || isMobileMenuOpen) && (
          <div className="p-4 border-t border-gray-100">
            <div className="text-xs text-gray-500 text-center">
              Design Studio v1.0
            </div>
          </div>
        )}
      </div>
    </>
  );
}
