import { Switch, Route } from "wouter";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { NotificationProvider } from "@/contexts/NotificationContext";
import Landing from "@/pages/landing";
import Dashboard from "@/pages/dashboard";
import Templates from "@/pages/templates";
import Presentation from "@/pages/presentation";
import Resume from "@/pages/resume";
import Poster from "@/pages/poster";
import Logo from "@/pages/logo";
import YouTubeThumbnail from "@/pages/youtube-thumbnail";
import Invitation from "@/pages/invitation";
import Projects from "@/pages/projects";
import Trash from "@/pages/trash";
import Editor from "@/pages/editor";
import PresentationDemo from "@/pages/PresentationDemo";
import PresentationEditor from "@/pages/PresentationEditor";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Switch>
      {!isAuthenticated ? (
        <Route path="/" component={Landing} />
      ) : (
        <>
          <Route path="/" component={Dashboard} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/templates" component={Templates} />
          <Route path="/presentation" component={Presentation} />
          <Route path="/resume" component={Resume} />
          <Route path="/poster" component={Poster} />
          <Route path="/logo" component={Logo} />
          <Route path="/youtube-thumbnail" component={YouTubeThumbnail} />
          <Route path="/invitation" component={Invitation} />
          <Route path="/projects" component={Projects} />
          <Route path="/trash" component={Trash} />
          <Route path="/editor" component={Editor} />
          <Route path="/presentation-demo" component={PresentationDemo} />
          <Route path="/presentation-editor" component={PresentationEditor} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </NotificationProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
