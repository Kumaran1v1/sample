import { useEffect } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Templates() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // Redirect to dashboard
  useEffect(() => {
    toast({
      title: "Redirecting",
      description: "Templates page has been moved to the dashboard",
    });

    // Redirect to dashboard after a short delay
    const timer = setTimeout(() => {
      setLocation("/dashboard");
    }, 1500);

    return () => clearTimeout(timer);
  }, [toast, setLocation]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center md:ml-16 lg:ml-72">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to Dashboard...</p>
      </div>
    </div>
  );
}
