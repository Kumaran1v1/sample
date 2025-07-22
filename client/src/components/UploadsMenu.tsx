import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Upload, Image } from "lucide-react";
import { SlideElement, Presentation } from "@/components/presentation/types";

interface UploadsMenuProps {
  selectedElement: string | null;
  currentSlide: number;
  presentation: Presentation;
  setPresentation: React.Dispatch<React.SetStateAction<Presentation>>;
  setSelectedElement: React.Dispatch<React.SetStateAction<string | null>>;
  updateElement: (elementId: string, updates: Partial<SlideElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export default function UploadsMenu({ 
  selectedElement,
  currentSlide,
  presentation,
  setPresentation,
  setSelectedElement,
  updateElement,
  fileInputRef
}: UploadsMenuProps) {
  const stockImages = [
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400',
    'https://images.unsplash.com/photo-1515378791036-0648a814c963?w=400',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
  ];

  const addImageFromUrl = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      const newElement: SlideElement = {
        id: Date.now().toString(),
        type: 'image',
        content: url,
        x: 100,
        y: 100,
        width: 200,
        height: 150,
        style: {
          transform: 'rotate(0deg)' // Default rotation for images
        }
      };

      setPresentation(prev => ({
        ...prev,
        slides: prev.slides.map((slide, index) =>
          index === currentSlide - 1
            ? { ...slide, elements: [...slide.elements, newElement] }
            : slide
        )
      }));
      setSelectedElement(newElement.id);
    }
  };

  const addStockImage = (imageUrl: string) => {
    const newElement: SlideElement = {
      id: Date.now().toString(),
      type: 'image',
      content: imageUrl,
      x: 100,
      y: 100,
      width: 300,
      height: 200,
      style: {
        transform: 'rotate(0deg)' // Default rotation for images
      }
    };

    setPresentation(prev => ({
      ...prev,
      slides: prev.slides.map((slide, slideIndex) =>
        slideIndex === currentSlide - 1
          ? { ...slide, elements: [...slide.elements, newElement] }
          : slide
      )
    }));
    setSelectedElement(newElement.id);
  };

  const applyImageEffect = (filter: string) => {
    if (selectedElement) {
      updateElement(selectedElement, {
        style: { filter }
      });
    }
  };

  const imageEffects = [
    { name: "Grayscale", filter: "grayscale(100%)", icon: "🎨" },
    { name: "Sepia", filter: "sepia(100%)", icon: "📸" },
    { name: "Blur", filter: "blur(2px)", icon: "🌫️" },
    { name: "Brighten", filter: "brightness(1.3)", icon: "☀️" },
    { name: "High Contrast", filter: "contrast(1.5)", icon: "🔆" },
    { name: "Saturate", filter: "saturate(2)", icon: "🎨" },
    { name: "Hue Rotate", filter: "hue-rotate(90deg)", icon: "🌈" },
    { name: "Invert", filter: "invert(1)", icon: "🔄" },
    { name: "Remove Filter", filter: "none", icon: "✨" }
  ];

  const currentElement = selectedElement 
    ? presentation.slides[currentSlide - 1]?.elements.find(el => el.id === selectedElement)
    : null;

  const isImageSelected = currentElement?.type === 'image';

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Button
          className="w-full"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Image
        </Button>

        <Button
          className="w-full"
          variant="outline"
          onClick={addImageFromUrl}
        >
          <Image className="h-4 w-4 mr-2" />
          Add from URL
        </Button>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Stock Images</h3>
        <div className="grid grid-cols-2 gap-2">
          {stockImages.map((imageUrl, index) => (
            <div
              key={index}
              className="aspect-video bg-gray-100 rounded cursor-pointer hover:opacity-80 transition-opacity overflow-hidden"
              onClick={() => addStockImage(imageUrl)}
            >
              <img
                src={imageUrl}
                alt={`Stock image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Image Effects</h3>
        {isImageSelected ? (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {imageEffects.map((effect, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start"
                onClick={() => applyImageEffect(effect.filter)}
              >
                <span className="mr-2">{effect.icon}</span>
                {effect.name}
              </Button>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500 text-center py-4">
            Select an image to apply effects
          </div>
        )}
      </div>

      <Separator />

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Image Categories</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="justify-start">
            🏢 Business
          </Button>
          <Button variant="outline" size="sm" className="justify-start">
            🌿 Nature
          </Button>
          <Button variant="outline" size="sm" className="justify-start">
            👥 People
          </Button>
          <Button variant="outline" size="sm" className="justify-start">
            💻 Technology
          </Button>
          <Button variant="outline" size="sm" className="justify-start">
            🎨 Abstract
          </Button>
          <Button variant="outline" size="sm" className="justify-start">
            🏠 Lifestyle
          </Button>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Upload Tips</h3>
        <div className="text-xs text-gray-600 space-y-1">
          <p>• Supported formats: JPG, PNG, GIF, SVG</p>
          <p>• Max file size: 10MB</p>
          <p>• Recommended: 1920x1080px for best quality</p>
          <p>• Use high-resolution images for crisp results</p>
        </div>
      </div>
    </div>
  );
}
