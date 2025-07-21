import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreatePresentationToggle } from "@/components/presentation/CreatePresentationToggle";
import { PresentationEditor } from "@/components/presentation/PresentationEditor";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Presentation,
  Play,
  Eye,
  Code,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Clock,
  Zap
} from "lucide-react";

export default function PresentationDemo() {
  const [showEditor, setShowEditor] = useState(false);

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Design",
      description: "Smart templates that adapt to your content automatically",
      color: "text-purple-600"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Create professional presentations in under 5 minutes",
      color: "text-yellow-600"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Real-time editing and commenting with your team",
      color: "text-blue-600"
    },
    {
      icon: Clock,
      title: "Auto-Save",
      description: "Never lose your work with automatic cloud saving",
      color: "text-green-600"
    }
  ];

  const stats = [
    { label: "Templates", value: "50+", icon: Presentation },
    { label: "Users", value: "10K+", icon: Users },
    { label: "Presentations", value: "25K+", icon: Play },
    { label: "Rating", value: "4.9", icon: Star }
  ];

  if (showEditor) {
    return <PresentationEditor presentationTitle="Demo Presentation" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Presentation className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Presentation Creator</h1>
                <p className="text-sm text-gray-600">Design beautiful presentations with AI</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                <Sparkles className="h-3 w-3 mr-1" />
                AI Powered
              </Badge>
              <Button
                onClick={() => setShowEditor(true)}
                variant="outline"
                size="sm"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview Editor
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Create Stunning Presentations
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"> Effortlessly</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your ideas into beautiful presentations with our AI-powered design tools. 
              Choose from professional templates and customize everything to match your brand.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center border-purple-100">
                  <CardContent className="p-4">
                    <stat.icon className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Main Demo */}
          <Tabs defaultValue="toggle" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
              <TabsTrigger value="toggle" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Toggle Demo
              </TabsTrigger>
              <TabsTrigger value="features" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Features
              </TabsTrigger>
              <TabsTrigger value="code" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                Code
              </TabsTrigger>
            </TabsList>

            <TabsContent value="toggle" className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Interactive Toggle Component</h3>
                <p className="text-gray-600">Click the toggle below to see the beautiful expand/collapse animation</p>
              </div>
              
              <div className="max-w-2xl mx-auto">
                <CreatePresentationToggle />
              </div>

              <div className="text-center mt-8">
                <Button
                  onClick={() => setShowEditor(true)}
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Try Full Editor
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="features" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <Card key={index} className="border-purple-100 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center`}>
                          <feature.icon className={`h-5 w-5 ${feature.color}`} />
                        </div>
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="code" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Implementation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm overflow-x-auto">
                    <div className="text-gray-500">// Import the component</div>
                    <div className="text-blue-400">import</div> {`{ CreatePresentationToggle }`} <div className="text-blue-400">from</div> <div className="text-yellow-400">'@/components/presentation/CreatePresentationToggle'</div>;
                    <br /><br />
                    <div className="text-gray-500">// Use in your component</div>
                    <div className="text-blue-400">function</div> <div className="text-yellow-400">MyComponent</div>() {`{`}
                    <br />
                    &nbsp;&nbsp;<div className="text-blue-400">return</div> (
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;{`<`}<div className="text-red-400">CreatePresentationToggle</div> {`/>`}
                    <br />
                    &nbsp;&nbsp;);
                    <br />
                    {`}`}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Smooth expand/collapse animations
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Beautiful gradient designs
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Responsive grid layouts
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Integrated modal workflow
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      TypeScript support
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
