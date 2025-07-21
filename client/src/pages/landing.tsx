import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Palette, WandSparkles, FileText, Download } from "lucide-react";
import { AuthModal } from "@/components/auth/AuthModal";

export default function Landing() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">("register");

  const handleSignUp = () => {
    setAuthModalTab("register");
    setIsAuthModalOpen(true);
  };

  const handleSignIn = () => {
    setAuthModalTab("login");
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <h1 className="ml-3 text-xl font-bold text-gray-900">Design Studio</h1>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">Templates</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">Pricing</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">Learn</a>
            </nav>

            <div className="flex items-center space-x-3">
              <Button
                onClick={handleSignIn}
                variant="ghost"
                className="text-gray-600 hover:text-gray-900"
              >
                Sign In
              </Button>
              <Button
                onClick={handleSignUp}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Create Amazing Designs
              <span className="block text-yellow-300">In Minutes</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Professional templates for resumes, invitations, business cards, and more
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleSignUp}
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              >
                Sign Up Free
              </Button>
              <Button
                onClick={handleSignIn}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Create
            </h2>
            <p className="text-xl text-gray-600">
              Professional design tools made simple for everyone
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <WandSparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Editor</h3>
              <p className="text-gray-600">Drag and drop elements to create stunning designs without any experience</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Templates</h3>
              <p className="text-gray-600">Thousands of professionally designed templates for every occasion</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Export Options</h3>
              <p className="text-gray-600">Download your designs in multiple formats including PDF, PNG, and JPEG</p>
            </div>
          </div>
        </div>
      </section>

      {/* Template Showcase */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Templates
            </h2>
            <p className="text-xl text-gray-600">
              Start with professionally designed templates
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Resume Templates", desc: "Professional resume designs", gradient: "from-blue-100 to-blue-200" },
              { title: "Invitations", desc: "Beautiful event invitations", gradient: "from-pink-100 to-pink-200" },
              { title: "Business Cards", desc: "Professional business cards", gradient: "from-green-100 to-green-200" },
              { title: "Presentations", desc: "Engaging slide decks", gradient: "from-purple-100 to-purple-200" }
            ].map((template, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className={`aspect-[3/4] bg-gradient-to-br ${template.gradient} rounded-t-lg p-4 relative overflow-hidden`}>
                    <div className="w-full h-full bg-white/80 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Template Preview</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{template.title}</h3>
                    <p className="text-sm text-gray-600">{template.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Create Something Amazing?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of users creating professional designs every day
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleSignUp}
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              Sign Up Free
            </Button>
            <Button
              onClick={handleSignIn}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold"
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <h3 className="ml-2 text-xl font-bold">Design Studio</h3>
              </div>
              <p className="text-gray-400">Create beautiful designs with our easy-to-use tools and professional templates.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Templates</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Resumes</a></li>
                <li><a href="#" className="hover:text-white">Business Cards</a></li>
                <li><a href="#" className="hover:text-white">Invitations</a></li>
                <li><a href="#" className="hover:text-white">Presentations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Tutorials</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Design Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        defaultTab={authModalTab}
      />
    </div>
  );
}
