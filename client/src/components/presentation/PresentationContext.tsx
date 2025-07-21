import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { Presentation, PresentationContextType, SlideElement, Slide } from './types';

const PresentationContext = createContext<PresentationContextType | undefined>(undefined);

export const usePresentationContext = () => {
  const context = useContext(PresentationContext);
  if (!context) {
    throw new Error('usePresentationContext must be used within a PresentationProvider');
  }
  return context;
};

interface PresentationProviderProps {
  children: React.ReactNode;
}

export const PresentationProvider: React.FC<PresentationProviderProps> = ({ children }) => {
  // Initial presentation state
  const [presentation, setPresentation] = useState<Presentation>({
    id: '1',
    title: 'Untitled design - Presentation',
    slides: [{
      id: '1',
      elements: [],
      background: 'bg-white',
      notes: ''
    }],
    createdAt: new Date(),
    updatedAt: new Date()
  });

  // Current state
  const [currentSlide, setCurrentSlide] = useState(1);
  const [totalSlides, setTotalSlides] = useState(1);

  // UI state
  const [zoomLevel, setZoomLevel] = useState(100);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isTextEditing, setIsTextEditing] = useState(false);
  const [editMode, setEditMode] = useState<'edit' | 'view' | 'comment'>('edit');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Drag and drop state
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  // Functions
  const savePresentation = useCallback(async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPresentation(prev => ({ ...prev, updatedAt: new Date() }));
    } catch (error) {
      console.error('Failed to save presentation:', error);
    } finally {
      setIsSaving(false);
    }
  }, []);

  const addNewSlide = useCallback(() => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      elements: [],
      background: 'bg-white',
      notes: ''
    };

    setPresentation(prev => ({
      ...prev,
      slides: [...prev.slides, newSlide]
    }));
    setTotalSlides(prev => prev + 1);
    setCurrentSlide(presentation.slides.length + 1);
  }, [presentation.slides.length]);

  const deleteSlide = useCallback((slideIndex: number) => {
    if (presentation.slides.length <= 1) return;

    setPresentation(prev => ({
      ...prev,
      slides: prev.slides.filter((_, index) => index !== slideIndex)
    }));
    setTotalSlides(prev => prev - 1);
    
    if (currentSlide > slideIndex + 1) {
      setCurrentSlide(prev => prev - 1);
    } else if (currentSlide === slideIndex + 1 && currentSlide > 1) {
      setCurrentSlide(prev => prev - 1);
    }
  }, [presentation.slides.length, currentSlide]);

  const duplicateSlide = useCallback((slideIndex: number) => {
    const slideToClone = presentation.slides[slideIndex];
    if (!slideToClone) return;

    const newSlide: Slide = {
      ...slideToClone,
      id: Date.now().toString(),
      elements: slideToClone.elements.map(element => ({
        ...element,
        id: Date.now().toString() + Math.random()
      }))
    };

    setPresentation(prev => ({
      ...prev,
      slides: [
        ...prev.slides.slice(0, slideIndex + 1),
        newSlide,
        ...prev.slides.slice(slideIndex + 1)
      ]
    }));
    setTotalSlides(prev => prev + 1);
    setCurrentSlide(slideIndex + 2);
  }, [presentation.slides]);

  const navigateToSlide = useCallback((slideNumber: number) => {
    if (slideNumber >= 1 && slideNumber <= totalSlides) {
      setCurrentSlide(slideNumber);
    }
  }, [totalSlides]);

  const addTextElement = useCallback((text: string = 'Click to edit text') => {
    const newElement: SlideElement = {
      id: Date.now().toString(),
      type: 'text',
      content: text,
      x: 100,
      y: 100,
      width: 200,
      height: 50,
      style: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#000000'
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
  }, [currentSlide]);

  const addShapeElement = useCallback((shapeType: string) => {
    const newElement: SlideElement = {
      id: Date.now().toString(),
      type: 'shape',
      content: shapeType,
      x: 150,
      y: 150,
      width: 100,
      height: 100,
      style: {
        backgroundColor: '#3b82f6',
        borderRadius: shapeType === 'circle' ? '50%' : 0
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
  }, [currentSlide]);



  const deleteElement = useCallback((elementId: string) => {
    setPresentation(prev => ({
      ...prev,
      slides: prev.slides.map((slide, index) => 
        index === currentSlide - 1 
          ? { ...slide, elements: slide.elements.filter(el => el.id !== elementId) }
          : slide
      )
    }));
    setSelectedElement(null);
  }, [currentSlide]);

  const updateElement = useCallback((elementId: string, updates: Partial<SlideElement>) => {
    setPresentation(prev => ({
      ...prev,
      slides: prev.slides.map((slide, index) => 
        index === currentSlide - 1 
          ? {
              ...slide,
              elements: slide.elements.map(element => 
                element.id === elementId 
                  ? { ...element, ...updates, style: { ...element.style, ...updates.style } }
                  : element
              )
            }
          : slide
      )
    }));
  }, [currentSlide]);

  const applyTemplate = useCallback((templateId: string) => {
    const templates = {
      '0': 'bg-white',
      '1': 'bg-gradient-to-br from-blue-400 to-blue-600',
      '2': 'bg-gradient-to-br from-purple-400 to-pink-500',
      '3': 'bg-gradient-to-br from-green-400 to-teal-500',
      '4': 'bg-gradient-to-br from-orange-400 to-red-500',
      '5': 'bg-gradient-to-br from-gray-700 to-gray-900',
      '6': 'bg-gradient-to-br from-gray-100 to-gray-300',
      '7': 'bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600',
      '8': 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600',
      '9': 'bg-gradient-to-br from-green-300 via-emerald-500 to-teal-700',
      '10': 'bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-700',
      '11': 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900',
      '12': 'bg-gradient-to-br from-pink-300 via-rose-400 to-orange-400',
      '13': 'bg-gradient-to-br from-blue-100 via-cyan-200 to-teal-300',
      '14': 'bg-gradient-to-br from-amber-400 via-orange-500 to-red-500',
      '15': 'bg-gradient-to-br from-purple-900 via-indigo-900 to-black',
      '16': 'bg-gradient-to-br from-pink-200 via-purple-300 to-indigo-400',
    };

    const background = templates[templateId as keyof typeof templates] || 'bg-white';
    
    setPresentation(prev => ({
      ...prev,
      slides: prev.slides.map((slide, index) => 
        index === currentSlide - 1 
          ? { ...slide, background }
          : slide
      )
    }));
  }, [currentSlide]);

  const zoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(200, prev + 25));
  }, []);

  const zoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(25, prev - 25));
  }, []);

  const resetZoom = useCallback(() => {
    setZoomLevel(100);
  }, []);

  const startPresentation = useCallback(() => {
    setIsPlaying(true);
    setEditMode('view');
  }, []);

  const stopPresentation = useCallback(() => {
    setIsPlaying(false);
    setEditMode('edit');
  }, []);

  const exportPresentation = useCallback(async (format: 'pdf' | 'pptx' | 'png') => {
    try {
      // Simulate export
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(`Exported as ${format}`);
    } catch (error) {
      console.error('Export failed:', error);
    }
  }, []);

  const sharePresentation = useCallback(async (shareType: 'link' | 'email' | 'embed') => {
    try {
      // Simulate sharing
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Shared via ${shareType}`);
    } catch (error) {
      console.error('Share failed:', error);
    }
  }, []);

  const uploadFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        const newElement: SlideElement = {
          id: Date.now().toString(),
          type: 'image',
          content: result,
          x: 100,
          y: 100,
          width: 300,
          height: 200,
          style: {}
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
    reader.readAsDataURL(file);
  }, [currentSlide]);

  const value: PresentationContextType = {
    // State
    presentation,
    setPresentation,
    currentSlide,
    setCurrentSlide,
    totalSlides,
    setTotalSlides,
    zoomLevel,
    setZoomLevel,
    selectedElement,
    setSelectedElement,
    isTextEditing,
    setIsTextEditing,
    editMode,
    setEditMode,
    isPlaying,
    setIsPlaying,
    isSaving,
    setIsSaving,
    isDragging,
    setIsDragging,
    isResizing,
    setIsResizing,

    // Functions
    savePresentation,
    addNewSlide,
    deleteSlide,
    duplicateSlide,
    navigateToSlide,
    addTextElement,
    addShapeElement,
    addEmojiElement,
    deleteElement,
    updateElement,
    applyTemplate,
    zoomIn,
    zoomOut,
    resetZoom,
    startPresentation,
    stopPresentation,
    exportPresentation,
    sharePresentation,
    uploadFile,
  };

  return (
    <PresentationContext.Provider value={value}>
      {children}
    </PresentationContext.Provider>
  );
};
