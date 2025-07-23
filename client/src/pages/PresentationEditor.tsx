import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import {
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Type,
  Palette,
  Upload,
  Settings,
  Grid3X3,
  Shapes,
  Hexagon,
  Layout,
  Home
} from "lucide-react";
import PresentationHeader from "@/components/PresentationHeader";
import PresentationFooter from "@/components/PresentationFooter";
import SlideNavigator from "@/components/SlideNavigator";
import SidebarTabs from "@/components/SidebarTabs";
import PresentationCanvas from "@/components/PresentationCanvas";
import SettingsDialog from "@/components/SettingsDialog";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import SlideTemplatesMenu from "@/components/SlideTemplatesMenu";
import { presentationService, ExportOptions, ShareOptions } from "@/services/PresentationService";
import { PresentationExporter, PresentationSharer, AutoSaver, ExportProgress } from "@/utils/exportUtils";

// Types for presentation elements
interface SlideElement {
  id: string;
  type: 'text' | 'shape' | 'image';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  style: {
    fontSize?: number;
    fontWeight?: string;
    fontFamily?: string;
    fontStyle?: string;
    textDecoration?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    textTransform?: string;
    textShadow?: string;
    lineHeight?: string;
    letterSpacing?: string;
    color?: string;
    backgroundColor?: string;
    background?: string;
    borderRadius?: number | string;
    border?: string;
    borderWidth?: string;
    borderStyle?: string;
    borderColor?: string;
    padding?: string;
    filter?: string;
    animation?: string;
    transform?: string;
    opacity?: string;
    WebkitBackgroundClip?: string;
    WebkitTextFillColor?: string;
    backgroundClip?: string;
  };
}

interface Slide {
  id: string;
  elements: SlideElement[];
  background: string;
  notes: string;
  border?: string;
  borderRadius?: string;
  style?: {
    border?: string;
    borderRadius?: string;
    padding?: string;
    boxShadow?: string;
  };
}

interface Presentation {
  id: string;
  title: string;
  slides: Slide[];
  createdAt: Date;
  updatedAt: Date;
}

// Slide Template Types
interface SlideTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  elements: Omit<SlideElement, 'id'>[];
}

// Predefined Slide Templates
const slideTemplates: SlideTemplate[] = [
  {
    id: 'blank',
    name: 'Blank',
    description: 'Empty slide',
    thumbnail: '⬜',
    elements: []
  },
  {
    id: 'title',
    name: 'Title Slide',
    description: 'Title and subtitle',
    thumbnail: '📄',
    elements: [
      {
        type: 'text',
        content: 'Presentation Title',
        x: 100,
        y: 200,
        width: 600,
        height: 80,
        style: {
          fontSize: 48,
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#000000'
        }
      },
      {
        type: 'text',
        content: 'Subtitle or description',
        x: 100,
        y: 300,
        width: 600,
        height: 40,
        style: {
          fontSize: 24,
          textAlign: 'center',
          color: '#666666'
        }
      }
    ]
  },
  {
    id: 'title-content',
    name: 'Title & Content',
    description: 'Title with content area',
    thumbnail: '📝',
    elements: [
      {
        type: 'text',
        content: 'Slide Title',
        x: 50,
        y: 50,
        width: 700,
        height: 60,
        style: {
          fontSize: 36,
          fontWeight: 'bold',
          color: '#000000'
        }
      },
      {
        type: 'text',
        content: 'Add your content here...',
        x: 50,
        y: 130,
        width: 700,
        height: 300,
        style: {
          fontSize: 18,
          color: '#333333'
        }
      }
    ]
  },
  {
    id: 'two-column',
    name: 'Two Column',
    description: 'Title with two columns',
    thumbnail: '📊',
    elements: [
      {
        type: 'text',
        content: 'Slide Title',
        x: 50,
        y: 50,
        width: 700,
        height: 60,
        style: {
          fontSize: 36,
          fontWeight: 'bold',
          color: '#000000'
        }
      },
      {
        type: 'text',
        content: 'Left Column Content',
        x: 50,
        y: 130,
        width: 325,
        height: 300,
        style: {
          fontSize: 18,
          color: '#333333'
        }
      },
      {
        type: 'text',
        content: 'Right Column Content',
        x: 425,
        y: 130,
        width: 325,
        height: 300,
        style: {
          fontSize: 18,
          color: '#333333'
        }
      }
    ]
  },
  {
    id: 'title-footer',
    name: 'Title & Footer',
    description: 'Title with footer',
    thumbnail: '📋',
    elements: [
      {
        type: 'text',
        content: 'Slide Title',
        x: 50,
        y: 50,
        width: 700,
        height: 60,
        style: {
          fontSize: 36,
          fontWeight: 'bold',
          color: '#000000'
        }
      },
      {
        type: 'text',
        content: 'Main content area',
        x: 50,
        y: 130,
        width: 700,
        height: 250,
        style: {
          fontSize: 18,
          color: '#333333'
        }
      },
      {
        type: 'text',
        content: 'Footer information',
        x: 50,
        y: 400,
        width: 700,
        height: 30,
        style: {
          fontSize: 14,
          color: '#666666',
          textAlign: 'center'
        }
      }
    ]
  },
  {
    id: 'section-header',
    name: 'Section Header',
    description: 'Large section title',
    thumbnail: '🏷️',
    elements: [
      {
        type: 'text',
        content: 'Section Title',
        x: 100,
        y: 180,
        width: 600,
        height: 100,
        style: {
          fontSize: 54,
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#000000'
        }
      },
      {
        type: 'text',
        content: 'Section description or number',
        x: 100,
        y: 300,
        width: 600,
        height: 40,
        style: {
          fontSize: 20,
          textAlign: 'center',
          color: '#666666'
        }
      }
    ]
  }
];

export default function PresentationEditor() {
  // Core state
  const [activeTab, setActiveTab] = useState<'home' | 'templates' | 'design' | 'elements' | 'text' | 'borders' | 'brand' | 'uploads' | 'tools'>('home');
  const [currentSlide, setCurrentSlide] = useState(1);
  const [totalSlides, setTotalSlides] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [editMode, setEditMode] = useState<'edit' | 'view' | 'comment'>('edit');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Presentation data
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

  // Selected elements and editing state
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isTextEditing, setIsTextEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  const [exportProgress, setExportProgress] = useState<ExportProgress | null>(null);

  // Undo/Redo functionality - Track individual slide changes
  const [slideHistory, setSlideHistory] = useState<{[slideIndex: number]: any[]}>({});
  const [slideHistoryIndex, setSlideHistoryIndex] = useState<{[slideIndex: number]: number}>({});
  const [maxHistorySize] = useState(50); // Limit history to 50 states per slide

  // Settings state
  const [settings, setSettings] = useState({
    slideSize: '16:9' as '16:9' | '4:3' | '1:1',
    autoSave: true,
    showGrid: false,
    snapToGrid: false,
    showRulers: false,
    showGuides: true,
    gridSize: 20,
    autoBackup: true,
    theme: 'auto' as 'light' | 'dark' | 'auto'
  });

  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Core Functions
  const savePresentation = useCallback(async () => {
    setIsSaving(true);
    try {
      await presentationService.savePresentation(presentation, {
        autoSave: settings.autoSave,
        createBackup: settings.autoBackup
      });
      setPresentation(prev => ({ ...prev, updatedAt: new Date() }));
      console.log('Presentation saved successfully');
    } catch (error) {
      console.error('Failed to save presentation:', error);
    } finally {
      setIsSaving(false);
    }
  }, [presentation, settings.autoSave, settings.autoBackup]);

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
    setCurrentSlide(totalSlides + 1);
  }, [totalSlides]);

  const deleteSlide = useCallback((slideIndex: number) => {
    if (totalSlides <= 1) return;

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
  }, [currentSlide, totalSlides]);

  const duplicateSlide = useCallback((slideIndex: number) => {
    const slideToClone = presentation.slides[slideIndex];
    const newSlide: Slide = {
      ...slideToClone,
      id: Date.now().toString(),
      elements: slideToClone.elements.map(el => ({ ...el, id: Date.now().toString() + Math.random() }))
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
  }, [presentation.slides]);

  const navigateToSlide = useCallback((slideNumber: number) => {
    if (slideNumber >= 1 && slideNumber <= totalSlides) {
      setCurrentSlide(slideNumber);
    }
  }, [totalSlides]);

  const zoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev + 10, 200));
  }, []);

  const zoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(prev - 10, 25));
  }, []);

  const resetZoom = useCallback(() => {
    setZoomLevel(100);
  }, []);

  // History management functions - Per slide
  const saveSlideToHistory = useCallback((slideIndex: number, slideData: any) => {
    setSlideHistory(prev => {
      const slideHist = prev[slideIndex] || [];
      const currentIndex = slideHistoryIndex[slideIndex] || -1;
      const newHistory = slideHist.slice(0, currentIndex + 1);
      newHistory.push(JSON.parse(JSON.stringify(slideData)));

      // Limit history size
      if (newHistory.length > maxHistorySize) {
        newHistory.shift();
      }

      return {
        ...prev,
        [slideIndex]: newHistory
      };
    });

    setSlideHistoryIndex(prev => ({
      ...prev,
      [slideIndex]: Math.min((prev[slideIndex] || -1) + 1, maxHistorySize - 1)
    }));
  }, [slideHistoryIndex, maxHistorySize]);

  const undo = useCallback(() => {
    const slideIndex = currentSlide - 1;
    const currentIndex = slideHistoryIndex[slideIndex] || 0;
    const slideHist = slideHistory[slideIndex] || [];

    if (currentIndex > 0) {
      const previousState = slideHist[currentIndex - 1];
      setPresentation(prev => ({
        ...prev,
        slides: prev.slides.map((slide, index) =>
          index === slideIndex ? JSON.parse(JSON.stringify(previousState)) : slide
        )
      }));

      setSlideHistoryIndex(prev => ({
        ...prev,
        [slideIndex]: currentIndex - 1
      }));
    }
  }, [slideHistory, slideHistoryIndex, currentSlide]);

  const redo = useCallback(() => {
    const slideIndex = currentSlide - 1;
    const currentIndex = slideHistoryIndex[slideIndex] || -1;
    const slideHist = slideHistory[slideIndex] || [];

    if (currentIndex < slideHist.length - 1) {
      const nextState = slideHist[currentIndex + 1];
      setPresentation(prev => ({
        ...prev,
        slides: prev.slides.map((slide, index) =>
          index === slideIndex ? JSON.parse(JSON.stringify(nextState)) : slide
        )
      }));

      setSlideHistoryIndex(prev => ({
        ...prev,
        [slideIndex]: currentIndex + 1
      }));
    }
  }, [slideHistory, slideHistoryIndex, currentSlide]);

  const canUndo = (slideHistoryIndex[currentSlide - 1] || 0) > 0;
  const canRedo = (slideHistoryIndex[currentSlide - 1] || -1) < (slideHistory[currentSlide - 1]?.length || 0) - 1;

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
        color: '#000000',
        transform: 'rotate(0deg)' // Default rotation for text
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
        backgroundColor: 'transparent', // Transparent background by default
        borderRadius: shapeType === 'circle' ? 50 : 0,
        border: '2px solid #000000', // Black border by default
        borderColor: '#000000',
        transform: 'rotate(0deg)' // Default rotation
      }
    };


    setPresentation(prev => {
      const slideIndex = currentSlide - 1;
      const currentSlideData = prev.slides[slideIndex];

      // Save current slide state to history
      saveSlideToHistory(slideIndex, currentSlideData);

      return {
        ...prev,
        slides: prev.slides.map((slide, index) =>
          index === slideIndex
            ? { ...slide, elements: [...slide.elements, newElement] }
            : slide
        )
      };
    });
    setSelectedElement(newElement.id);
  }, [currentSlide, saveSlideToHistory]);

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
    setPresentation(prev => {
      const slideIndex = currentSlide - 1;
      const currentSlideData = prev.slides[slideIndex];

      // Save current slide state to history before making changes
      saveSlideToHistory(slideIndex, currentSlideData);

      return {
        ...prev,
        slides: prev.slides.map((slide, index) =>
          index === slideIndex
            ? {
                ...slide,
                elements: slide.elements.map(el =>
                  el.id === elementId ? { ...el, ...updates } : el
                )
              }
            : slide
        )
      };
    });
  }, [currentSlide, saveSlideToHistory]);

  const startPresentation = useCallback(() => {
    setIsPlaying(true);
    setCurrentSlide(1);
    // In a real app, this would enter fullscreen mode
    console.log('Starting presentation...');
  }, []);

  const stopPresentation = useCallback(() => {
    setIsPlaying(false);
    console.log('Stopping presentation...');
  }, []);

  const exportPresentation = useCallback(async (format: 'pdf' | 'pptx' | 'png') => {
    try {
      const exporter = new PresentationExporter(setExportProgress);

      switch (format) {
        case 'pdf':
          await exporter.exportToPDF(presentation, {
            includeNotes: true,
            quality: 'high',
            slideRange: 'all'
          });
          break;
        case 'pptx':
          await exporter.exportToPPTX(presentation);
          break;
        case 'png':
          await exporter.exportAsImages(presentation, 'png', 1.0);
          break;
      }
    } catch (error) {
      console.error(`Export failed:`, error);
    }
  }, [presentation]);

  const sharePresentation = useCallback(async (shareType: 'link' | 'email' | 'embed') => {
    try {
      const shareUrl = await PresentationSharer.generateShareLink(presentation.id, {
        permissions: 'view'
      });

      switch (shareType) {
        case 'link':
          await PresentationSharer.copyToClipboard(shareUrl);
          console.log('Share link copied to clipboard');
          break;
        case 'email':
          PresentationSharer.shareViaEmail(shareUrl, presentation.title);
          break;
        case 'embed':
          const embedCode = PresentationSharer.generateEmbedCode(shareUrl);
          await PresentationSharer.copyToClipboard(embedCode);
          console.log('Embed code copied to clipboard');
          break;
      }
      setShowShareDialog(true);
    } catch (error) {
      console.error('Share failed:', error);
    }
  }, [presentation.id, presentation.title]);

  // Settings update function
  const updateSettings = useCallback((newSettings: Partial<typeof settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  // Auto-saver setup
  const autoSaver = useMemo(() => {
    if (settings.autoSave) {
      return new AutoSaver(savePresentation, 30000); // Auto-save every 30 seconds
    }
    return null;
  }, [settings.autoSave, savePresentation]);

  useEffect(() => {
    if (autoSaver) {
      autoSaver.start();
      return () => autoSaver.stop();
    }
  }, [autoSaver]);

  const uploadFile = useCallback((file: File) => {
    console.log('Uploading file:', file.name);
    // Handle file upload logic here
    if (file.type.startsWith('image/')) {
      // Add image element to slide
      const newElement: SlideElement = {
        id: Date.now().toString(),
        type: 'image',
        content: URL.createObjectURL(file),
        x: 100,
        y: 100,
        width: 200,
        height: 150,
        style: {
          transform: 'rotate(0deg)' // Default rotation for images
        }
      };

      setPresentation(prev => {
        const slideIndex = currentSlide - 1;
        const currentSlideData = prev.slides[slideIndex];

        // Save current slide state to history
        saveSlideToHistory(slideIndex, currentSlideData);

        return {
          ...prev,
          slides: prev.slides.map((slide, index) =>
            index === slideIndex
              ? { ...slide, elements: [...slide.elements, newElement] }
              : slide
          )
        };
      });
      setSelectedElement(newElement.id);
    }
  }, [currentSlide, saveSlideToHistory]);

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

  // Apply slide layout template
  const applySlideTemplate = useCallback((templateId: string, slideIndex?: number) => {
    const template = slideTemplates.find(t => t.id === templateId);
    if (!template) return;

    const targetSlideIndex = slideIndex !== undefined ? slideIndex : currentSlide - 1;

    setPresentation(prev => {
      const newSlides = [...prev.slides];
      const elementsWithIds = template.elements.map(element => ({
        ...element,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
      }));

      // Save current slide state to history before applying template
      const currentSlideData = newSlides[targetSlideIndex];
      saveSlideToHistory(targetSlideIndex, currentSlideData);

      newSlides[targetSlideIndex] = {
        ...newSlides[targetSlideIndex],
        elements: elementsWithIds
      };

      return {
        ...prev,
        slides: newSlides
      };
    });
  }, [currentSlide, saveSlideToHistory]);

  // Add new slide with template
  const addSlide = useCallback((templateId: string = 'blank') => {
    const template = slideTemplates.find(t => t.id === templateId);

    setPresentation(prev => {
      const elementsWithIds = template ? template.elements.map(element => ({
        ...element,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
      })) : [];

      const newSlide: Slide = {
        id: Date.now().toString(),
        elements: elementsWithIds,
        background: '#ffffff',
        notes: ''
      };

      const newSlides = [...prev.slides];
      newSlides.splice(currentSlide, 0, newSlide);

      return {
        ...prev,
        slides: newSlides
      };
    });

    setTotalSlides(prev => prev + 1);
    setCurrentSlide(prev => prev + 1);
  }, [currentSlide]);

  // Handle template parameter from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const templateId = urlParams.get('template');

    if (templateId && templateId !== 'blank') {
      // Apply the template to the first slide
      applySlideTemplate(templateId, 0);
      // Clear the template parameter from URL
      window.history.replaceState({}, '', '/presentation-editor');
    }
  }, [applySlideTemplate]);

  // Drag and drop functionality
  const handleMouseDown = useCallback((e: React.MouseEvent, elementId: string) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedElement(elementId);
    setIsDragging(true);

    // Find the canvas element by traversing up the DOM
    let canvasElement = e.currentTarget as HTMLElement;
    while (canvasElement && !canvasElement.classList.contains('relative')) {
      canvasElement = canvasElement.parentElement as HTMLElement;
    }

    if (canvasElement) {
      const rect = canvasElement.getBoundingClientRect();
      const startPos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      setDragStart(startPos);

    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !selectedElement) {
      return;
    }

    // Find the canvas element
    const canvasElement = document.querySelector('[data-canvas="true"]') as HTMLElement;
    if (!canvasElement) {
      return;
    }

    const rect = canvasElement.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const deltaX = (currentX - dragStart.x) / (zoomLevel / 100);
    const deltaY = (currentY - dragStart.y) / (zoomLevel / 100);

    const currentElement = presentation.slides[currentSlide - 1]?.elements
      .find(el => el.id === selectedElement);

    if (currentElement) {
      // Calculate new position with bounds checking
      const canvasWidth = 800; // Standard slide width
      const canvasHeight = 450; // Standard slide height

      const newX = Math.max(0, Math.min(canvasWidth - currentElement.width, currentElement.x + deltaX));
      const newY = Math.max(0, Math.min(canvasHeight - currentElement.height, currentElement.y + deltaY));


      updateElement(selectedElement, { x: newX, y: newY });

      // Update drag start position for next move
      setDragStart({ x: currentX, y: currentY });
    }
  }, [isDragging, selectedElement, dragStart, zoomLevel, currentSlide, presentation.slides, updateElement]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeHandle(null);
  }, []);

  // Resize functionality
  const handleResizeStart = useCallback((e: React.MouseEvent, handle: string) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeHandle(handle);

    const canvasElement = document.querySelector('[data-canvas="true"]') as HTMLElement;
    if (canvasElement) {
      const rect = canvasElement.getBoundingClientRect();
      setDragStart({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  }, []);

  const handleResize = useCallback((e: React.MouseEvent) => {
    if (!isResizing || !selectedElement || !resizeHandle) return;

    const canvasElement = document.querySelector('[data-canvas="true"]') as HTMLElement;
    if (!canvasElement) return;

    const rect = canvasElement.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const deltaX = (currentX - dragStart.x) / (zoomLevel / 100);
    const deltaY = (currentY - dragStart.y) / (zoomLevel / 100);

    const currentElement = presentation.slides[currentSlide - 1]?.elements
      .find(el => el.id === selectedElement);

    if (currentElement) {
      let updates: Partial<SlideElement> = {};

      switch (resizeHandle) {
        case 'se': // Southeast
          updates = {
            width: Math.max(20, currentElement.width + deltaX),
            height: Math.max(20, currentElement.height + deltaY)
          };
          break;
        case 'sw': // Southwest
          updates = {
            x: currentElement.x + deltaX,
            width: Math.max(20, currentElement.width - deltaX),
            height: Math.max(20, currentElement.height + deltaY)
          };
          break;
        case 'ne': // Northeast
          updates = {
            y: currentElement.y + deltaY,
            width: Math.max(20, currentElement.width + deltaX),
            height: Math.max(20, currentElement.height - deltaY)
          };
          break;
        case 'nw': // Northwest
          updates = {
            x: currentElement.x + deltaX,
            y: currentElement.y + deltaY,
            width: Math.max(20, currentElement.width - deltaX),
            height: Math.max(20, currentElement.height - deltaY)
          };
          break;
      }

      updateElement(selectedElement, updates);
      setDragStart({ x: currentX, y: currentY });
    }
  }, [isResizing, selectedElement, resizeHandle, dragStart, zoomLevel, currentSlide, presentation.slides, updateElement]);

  // Rotation functionality
  const handleRotationStart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRotating(true);

    const canvasElement = document.querySelector('[data-canvas="true"]') as HTMLElement;
    if (canvasElement) {
      const rect = canvasElement.getBoundingClientRect();
      setDragStart({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  }, []);

  const handleRotation = useCallback((e: React.MouseEvent) => {
    if (!isRotating || !selectedElement) return;

    const canvasElement = document.querySelector('[data-canvas="true"]') as HTMLElement;
    if (!canvasElement) return;

    const rect = canvasElement.getBoundingClientRect();
    const currentElement = presentation.slides[currentSlide - 1]?.elements
      .find(el => el.id === selectedElement);

    if (currentElement) {
      const centerX = currentElement.x + currentElement.width / 2;
      const centerY = currentElement.y + currentElement.height / 2;

      const currentX = (e.clientX - rect.left) / (zoomLevel / 100);
      const currentY = (e.clientY - rect.top) / (zoomLevel / 100);

      const angle = Math.atan2(currentY - centerY, currentX - centerX) * (180 / Math.PI);

      updateElement(selectedElement, {
        style: {
          ...currentElement.style,
          transform: `rotate(${angle}deg)`
        }
      });
    }
  }, [isRotating, selectedElement, zoomLevel, currentSlide, presentation.slides, updateElement]);

  const rotateElement = useCallback((degrees: number) => {
    if (!selectedElement) return;

    const currentElement = presentation.slides[currentSlide - 1]?.elements
      .find(el => el.id === selectedElement);

    if (currentElement) {
      const currentTransform = currentElement.style.transform || 'rotate(0deg)';
      const currentRotation = parseFloat(currentTransform.match(/rotate\((-?\d+(?:\.\d+)?)deg\)/)?.[1] || '0');
      const newRotation = (currentRotation + degrees) % 360;

      updateElement(selectedElement, {
        style: {
          ...currentElement.style,
          transform: `rotate(${newRotation}deg)`
        }
      });
    }
  }, [selectedElement, currentSlide, presentation.slides, updateElement]);

  // Add emoji element
  const addEmojiElement = useCallback((emoji: string) => {
    const newElement: SlideElement = {
      id: Date.now().toString(),
      type: 'text',
      content: emoji,
      x: 150,
      y: 150,
      width: 60,
      height: 60,
      style: {
        fontSize: 48,
        fontWeight: 'normal',
        color: 'transparent',
        textAlign: 'center',
        transform: 'rotate(0deg)' // Default rotation for emojis
      }
    };

    setPresentation(prev => {
      const slideIndex = currentSlide - 1;
      const currentSlideData = prev.slides[slideIndex];

      // Save current slide state to history
      saveSlideToHistory(slideIndex, currentSlideData);

      return {
        ...prev,
        slides: prev.slides.map((slide, index) =>
          index === slideIndex
            ? { ...slide, elements: [...slide.elements, newElement] }
            : slide
        )
      };
    });
    setSelectedElement(newElement.id);
  }, [currentSlide, saveSlideToHistory]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            savePresentation();
            break;
          case 'm':
            e.preventDefault();
            addNewSlide();
            break;
          case 'd':
            e.preventDefault();
            duplicateSlide(currentSlide - 1);
            break;
          case '=':
          case '+':
            e.preventDefault();
            zoomIn();
            break;
          case '-':
            e.preventDefault();
            zoomOut();
            break;
          case '0':
            e.preventDefault();
            resetZoom();
            break;
        }
      } else {
        switch (e.key) {
          case 'F5':
            e.preventDefault();
            startPresentation();
            break;
          case 'Delete':
            if (selectedElement) {
              deleteElement(selectedElement);
            } else if (totalSlides > 1) {
              deleteSlide(currentSlide - 1);
            }
            break;
          case 'Escape':
            if (isPlaying) {
              stopPresentation();
            } else {
              setSelectedElement(null);
              setIsTextEditing(false);
            }
            break;
          case 'ArrowLeft':
            if (isPlaying && currentSlide > 1) {
              navigateToSlide(currentSlide - 1);
            }
            break;
          case 'ArrowRight':
            if (isPlaying && currentSlide < totalSlides) {
              navigateToSlide(currentSlide + 1);
            }
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [
    savePresentation, addNewSlide, duplicateSlide, currentSlide, zoomIn, zoomOut,
    resetZoom, startPresentation, selectedElement, deleteElement, totalSlides,
    deleteSlide, isPlaying, stopPresentation, navigateToSlide
  ]);

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      savePresentation();
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [savePresentation]);

  // Initialize slide history with initial slide states
  useEffect(() => {
    presentation.slides.forEach((slide, index) => {
      if (!slideHistory[index] || slideHistory[index].length === 0) {
        setSlideHistory(prev => ({
          ...prev,
          [index]: [JSON.parse(JSON.stringify(slide))]
        }));
        setSlideHistoryIndex(prev => ({
          ...prev,
          [index]: 0
        }));
      }
    });
  }, [presentation.slides, slideHistory]);

  // Global mouse event listeners for dragging, resizing, and rotating
  useEffect(() => {
    const handleGlobalMouseMove = (event: MouseEvent) => {
      if (isDragging || isResizing || isRotating) {
        const canvasElement = document.querySelector('[data-canvas="true"]') as HTMLElement;
        if (canvasElement) {
          const mouseEvent = {
            clientX: event.clientX,
            clientY: event.clientY,
            preventDefault: () => event.preventDefault(),
            stopPropagation: () => event.stopPropagation(),
          } as React.MouseEvent;

          if (isDragging) {
            handleMouseMove(mouseEvent);
          } else if (isResizing) {
            handleResize(mouseEvent);
          } else if (isRotating) {
            handleRotation(mouseEvent);
          }
        }
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDragging || isResizing || isRotating) {
        setIsDragging(false);
        setIsResizing(false);
        setIsRotating(false);
        setResizeHandle(null);
      }
    };

    if (isDragging || isResizing || isRotating) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, isResizing, isRotating, handleMouseMove, handleResize, handleRotation]);

  // Keyboard shortcuts for undo/redo
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && !event.shiftKey && event.key === 'z') {
        event.preventDefault();
        undo();
      } else if (((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'z') ||
                 ((event.ctrlKey || event.metaKey) && event.key === 'y')) {
        event.preventDefault();
        redo();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  const sidebarTabs = [
    { id: 'home', icon: Home, label: 'Home', color: 'text-blue-600' },
    { id: 'templates', icon: Layout, label: 'Templates', color: 'text-pink-600' },
    { id: 'design', icon: Grid3X3, label: 'Design', color: 'text-blue-600' },
    { id: 'elements', icon: Shapes, label: 'Elements', color: 'text-green-600' },
    { id: 'text', icon: Type, label: 'Text', color: 'text-purple-600' },
    { id: 'borders', icon: Hexagon, label: 'Borders', color: 'text-indigo-600' },
    { id: 'brand', icon: Palette, label: 'Brand', color: 'text-orange-600' },
    { id: 'uploads', icon: Upload, label: 'Uploads', color: 'text-pink-600' },
    { id: 'tools', icon: Settings, label: 'Tools', color: 'text-gray-600' },
  ];

  // Color arrays for brand section
  const textColors = [
    { name: "Black", value: "#000000", class: "bg-black" },
    { name: "White", value: "#ffffff", class: "bg-white border" },
    { name: "Gray", value: "#6b7280", class: "bg-gray-500" },
    { name: "Red", value: "#ef4444", class: "bg-red-500" },
    { name: "Orange", value: "#f97316", class: "bg-orange-500" },
    { name: "Amber", value: "#f59e0b", class: "bg-amber-500" },
    { name: "Yellow", value: "#eab308", class: "bg-yellow-500" },
    { name: "Lime", value: "#84cc16", class: "bg-lime-500" },
    { name: "Green", value: "#22c55e", class: "bg-green-500" },
    { name: "Emerald", value: "#10b981", class: "bg-emerald-500" },
    { name: "Teal", value: "#14b8a6", class: "bg-teal-500" },
    { name: "Cyan", value: "#06b6d4", class: "bg-cyan-500" },
    { name: "Sky", value: "#0ea5e9", class: "bg-sky-500" },
    { name: "Blue", value: "#3b82f6", class: "bg-blue-500" },
    { name: "Indigo", value: "#6366f1", class: "bg-indigo-500" },
    { name: "Violet", value: "#8b5cf6", class: "bg-violet-500" },
    { name: "Purple", value: "#a855f7", class: "bg-purple-500" },
    { name: "Fuchsia", value: "#d946ef", class: "bg-fuchsia-500" },
    { name: "Pink", value: "#ec4899", class: "bg-pink-500" },
    { name: "Rose", value: "#f43f5e", class: "bg-rose-500" },
  ];

  const backgroundColors = [
    { name: "Transparent", value: "transparent", class: "bg-transparent border-2 border-dashed border-gray-300" },
    { name: "White", value: "#ffffff", class: "bg-white border" },
    { name: "Light Gray", value: "#f3f4f6", class: "bg-gray-100" },
    { name: "Gray", value: "#e5e7eb", class: "bg-gray-200" },
    { name: "Dark Gray", value: "#374151", class: "bg-gray-700" },
    { name: "Black", value: "#000000", class: "bg-black" },
    { name: "Red", value: "#fef2f2", class: "bg-red-50" },
    { name: "Orange", value: "#fff7ed", class: "bg-orange-50" },
    { name: "Yellow", value: "#fefce8", class: "bg-yellow-50" },
    { name: "Green", value: "#f0fdf4", class: "bg-green-50" },
    { name: "Blue", value: "#eff6ff", class: "bg-blue-50" },
    { name: "Purple", value: "#faf5ff", class: "bg-purple-50" },
    { name: "Pink", value: "#fdf2f8", class: "bg-pink-50" },
  ];

  const fontFamilies = [
    { name: "Inter", value: "Inter, sans-serif", category: "Sans Serif" },
    { name: "Helvetica", value: "Helvetica, Arial, sans-serif", category: "Sans Serif" },
    { name: "Arial", value: "Arial, sans-serif", category: "Sans Serif" },
    { name: "Roboto", value: "Roboto, sans-serif", category: "Sans Serif" },
    { name: "Open Sans", value: "Open Sans, sans-serif", category: "Sans Serif" },
    { name: "Lato", value: "Lato, sans-serif", category: "Sans Serif" },
    { name: "Times New Roman", value: "Times New Roman, serif", category: "Serif" },
    { name: "Georgia", value: "Georgia, serif", category: "Serif" },
    { name: "Playfair Display", value: "Playfair Display, serif", category: "Serif" },
    { name: "Merriweather", value: "Merriweather, serif", category: "Serif" },
    { name: "Courier New", value: "Courier New, monospace", category: "Monospace" },
    { name: "Monaco", value: "Monaco, monospace", category: "Monospace" },
    { name: "Fira Code", value: "Fira Code, monospace", category: "Monospace" },
  ];

  const textStyles = [
    { name: "Heading 1", fontSize: 48, fontWeight: "bold", example: "Main Title" },
    { name: "Heading 2", fontSize: 36, fontWeight: "bold", example: "Section Title" },
    { name: "Heading 3", fontSize: 24, fontWeight: "semibold", example: "Subsection" },
    { name: "Heading 4", fontSize: 20, fontWeight: "semibold", example: "Small Heading" },
    { name: "Body Large", fontSize: 18, fontWeight: "normal", example: "Large body text" },
    { name: "Body", fontSize: 16, fontWeight: "normal", example: "Regular body text" },
    { name: "Body Small", fontSize: 14, fontWeight: "normal", example: "Small body text" },
    { name: "Caption", fontSize: 12, fontWeight: "normal", example: "Caption text" },
    { name: "Quote", fontSize: 20, fontWeight: "normal", example: "Quote text", italic: true },
    { name: "Code", fontSize: 14, fontWeight: "normal", example: "Code text", fontFamily: "monospace" },
  ];

  // CSS animations styles
  const animationStyles = `
    @keyframes bounce {
      0%, 20%, 53%, 80%, 100% {
        transform: translate3d(0,0,0);
      }
      40%, 43% {
        transform: translate3d(0,-30px,0);
      }
      70% {
        transform: translate3d(0,-15px,0);
      }
      90% {
        transform: translate3d(0,-4px,0);
      }
    }

    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes slideInLeft {
      from {
        transform: translateX(-100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes float {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-20px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  `;

  return (
    <TooltipProvider>
      <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
        {/* CSS Animations */}
        <style dangerouslySetInnerHTML={{ __html: animationStyles }} />

        <PresentationHeader
          presentation={presentation}
          setPresentation={setPresentation}
          savePresentation={savePresentation}
          exportPresentation={exportPresentation}
          sharePresentation={sharePresentation}
          startPresentation={startPresentation}
          stopPresentation={stopPresentation}
          isPlaying={isPlaying}
          isSaving={isSaving}
          editMode={editMode}
          setEditMode={setEditMode}
          setShowSettingsDialog={setShowSettingsDialog}
          setShowShareDialog={setShowShareDialog}
          showShareDialog={showShareDialog}
          duplicateSlide={duplicateSlide}
          deleteSlide={deleteSlide}
          currentSlide={currentSlide}
          totalSlides={totalSlides}
          uploadFile={uploadFile}
          fileInputRef={fileInputRef}
          undo={undo}
          redo={redo}
          canUndo={canUndo}
          canRedo={canRedo}
          setActiveTab={setActiveTab}
        />
  
        <div className="flex-1 flex overflow-hidden">
          <SidebarTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            currentSlide={currentSlide}
            presentation={presentation}
            setPresentation={setPresentation}
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            updateElement={updateElement}
            addShapeElement={addShapeElement}
            addEmojiElement={addEmojiElement}
            applyTemplate={applyTemplate}
            applySlideTemplate={applySlideTemplate}
            addSlide={addSlide}
            zoomLevel={zoomLevel}
            zoomIn={zoomIn}
            zoomOut={zoomOut}
            resetZoom={resetZoom}
            addNewSlide={addNewSlide}
            duplicateSlide={duplicateSlide}
            deleteSlide={deleteSlide}
            totalSlides={totalSlides}
            fileInputRef={fileInputRef}
          />

          <SlideNavigator
            presentation={presentation}
            currentSlide={currentSlide}
            navigateToSlide={navigateToSlide}
            addNewSlide={addNewSlide}
            duplicateSlide={duplicateSlide}
            deleteSlide={deleteSlide}
            totalSlides={totalSlides}
          />

          {/* Main Canvas Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <PresentationCanvas
              presentation={presentation}
              setPresentation={setPresentation}
              currentSlide={currentSlide}
              zoomLevel={zoomLevel}
              selectedElement={selectedElement}
              setSelectedElement={setSelectedElement}
              isTextEditing={isTextEditing}
              setIsTextEditing={setIsTextEditing}
              editMode={editMode}
              isDragging={isDragging}
              setIsDragging={setIsDragging}
              isResizing={isResizing}
              setIsResizing={setIsResizing}
              dragStart={dragStart}
              setDragStart={setDragStart}
              resizeHandle={resizeHandle}
              setResizeHandle={setResizeHandle}
              updateElement={updateElement}
              handleMouseDown={handleMouseDown}
              handleMouseMove={handleMouseMove}
              handleMouseUp={handleMouseUp}
              handleResizeStart={handleResizeStart}
              handleResize={handleResize}
              handleRotationStart={handleRotationStart}
              handleRotation={handleRotation}
              rotateElement={rotateElement}
              deleteElement={deleteElement}
            />

            <PresentationFooter
              currentSlide={currentSlide}
              totalSlides={totalSlides}
              zoomLevel={zoomLevel}
              presentation={presentation}
              setPresentation={setPresentation}
              addNewSlide={addNewSlide}
              duplicateSlide={duplicateSlide}
              deleteSlide={deleteSlide}
              zoomIn={zoomIn}
              zoomOut={zoomOut}
              navigateToSlide={navigateToSlide}
            />
          </div>
        </div>

        <SettingsDialog
          open={showSettingsDialog}
          onOpenChange={setShowSettingsDialog}
          settings={settings}
          updateSettings={updateSettings}
        />

        <KeyboardShortcuts />
      </div>
    </TooltipProvider>
  );
}
 