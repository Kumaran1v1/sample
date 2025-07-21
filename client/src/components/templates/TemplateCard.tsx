import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, FileText } from "lucide-react";
import { Template } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface TemplateCardProps {
  template: Template;
  isFavorite?: boolean;
}

export function TemplateCard({ template, isFavorite = false }: TemplateCardProps) {
  const [, setLocation] = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const favoriteMutation = useMutation({
    mutationFn: async (action: 'add' | 'remove') => {
      if (action === 'add') {
        return apiRequest('POST', '/api/favorites', { templateId: template.id });
      } else {
        return apiRequest('DELETE', `/api/favorites/${template.id}`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/favorites'] });
      toast({
        title: isFavorite ? "Removed from favorites" : "Added to favorites",
        description: isFavorite ? "Template removed from your favorites" : "Template added to your favorites",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleCardClick = () => {
    setLocation(`/editor?templateId=${template.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    favoriteMutation.mutate(isFavorite ? 'remove' : 'add');
  };

  return (
    <Card 
      className="group hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        <div className="aspect-[3/4] bg-gradient-to-br from-purple-50 to-blue-50 rounded-t-lg p-4 relative overflow-hidden">
          {template.thumbnailUrl ? (
            <img
              src={template.thumbnailUrl}
              alt={template.title}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-full bg-white/80 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Template Preview</p>
              </div>
            </div>
          )}
          
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity",
            isHovered ? "opacity-100" : "opacity-0"
          )} />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFavoriteClick}
            className={cn(
              "absolute top-4 right-4 w-8 h-8 p-0 bg-white/90 hover:bg-white transition-all",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          >
            <Heart 
              className={cn(
                "w-4 h-4 transition-colors",
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
              )}
            />
          </Button>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{template.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{template.description}</p>
          {template.isPremium && (
            <div className="mt-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Premium
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
