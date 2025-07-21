import { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Home,
  FileText,
  Image,
  Type,
  Palette,
  Upload,
  Settings,
  Share,
  Download,
  Play,
  Plus,
  ChevronDown,
  Search,
  Grid3X3,
  Square,
  Circle,
  Triangle,
  Star,
  Heart,
  Zap,
  Clock,
  Users,
  MoreHorizontal,
  Crown,
  Sparkles,
  Save,
  FolderOpen,
  Copy,
  Trash2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  RotateCw,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Minus,
  ChevronLeft,
  ChevronRight,
  Eye,
  MessageSquare,
  Edit3,
  Maximize,
  Minimize,
  Volume2,
  VolumeX,
  Shapes,
  Hexagon
} from "lucide-react";
import { cn } from "@/lib/utils";
import DesignMenu from "@/components/DesignMenu";
import ElementsMenu from "@/components/ElementsMenu";
import TextMenu from "@/components/TextMenu";
import SlideBorderMenu from "@/components/SlideBorderMenu";
import BorderMenu from "@/components/BorderMenu";

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

export default function PresentationEditor() {
  // Core state
  const [activeTab, setActiveTab] = useState<'design' | 'elements' | 'text' | 'borders' | 'brand' | 'uploads' | 'tools'>('design');
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
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);

  // Canvas refs
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Core Functions
  const savePresentation = useCallback(async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPresentation(prev => ({ ...prev, updatedAt: new Date() }));
      console.log('Presentation saved successfully');
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
        borderRadius: shapeType === 'circle' ? 50 : 0
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
              elements: slide.elements.map(el =>
                el.id === elementId ? { ...el, ...updates } : el
              )
            }
          : slide
      )
    }));
  }, [currentSlide]);

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
    console.log(`Exporting presentation as ${format}...`);
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(`Export completed: ${format}`);
  }, []);

  const sharePresentation = useCallback(async (shareType: 'link' | 'email' | 'embed') => {
    console.log(`Sharing presentation via ${shareType}...`);
    setShowShareDialog(true);
  }, []);

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
    }
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

  // Drag and drop functionality
  const handleMouseDown = useCallback((e: React.MouseEvent, elementId: string) => {
    e.stopPropagation();
    setSelectedElement(elementId);
    setIsDragging(true);

    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setDragStart({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !selectedElement || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const deltaX = (currentX - dragStart.x) / (zoomLevel / 100);
    const deltaY = (currentY - dragStart.y) / (zoomLevel / 100);

    const currentElement = presentation.slides[currentSlide - 1]?.elements
      .find(el => el.id === selectedElement);

    if (currentElement) {
      const newX = Math.max(0, Math.min(800 - currentElement.width, currentElement.x + deltaX));
      const newY = Math.max(0, Math.min(450 - currentElement.height, currentElement.y + deltaY));

      updateElement(selectedElement, { x: newX, y: newY });

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

    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setDragStart({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  }, []);

  const handleResize = useCallback((e: React.MouseEvent) => {
    if (!isResizing || !selectedElement || !resizeHandle || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
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
        textAlign: 'center'
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

  const sidebarTabs = [
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

        {/* Top Header - Canva Style - Fixed */}
        <header className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between flex-shrink-0 z-10">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-xl text-cyan-500">DS</span>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-cyan-600 font-medium">
                    File <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => savePresentation()}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
                    <FolderOpen className="h-4 w-4 mr-2" />
                    Open
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => exportPresentation('pdf')}>
                    <Download className="h-4 w-4 mr-2" />
                    Export as PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => exportPresentation('pptx')}>
                    <Download className="h-4 w-4 mr-2" />
                    Export as PowerPoint
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="ghost"
                size="sm"
                className="text-cyan-600 font-medium"
                onClick={() => setShowSettingsDialog(true)}
              >
                Resize
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-gray-700 font-medium">
                    {editMode === 'edit' ? 'Editing' : editMode === 'view' ? 'Viewing' : 'Commenting'}
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setEditMode('edit')}>
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Mode
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setEditMode('view')}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Mode
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setEditMode('comment')}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Comment Mode
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>

          {/* Center - Presentation Title */}
          <div className="flex-1 max-w-md mx-4">
            <Input
              value={presentation.title}
              onChange={(e) => setPresentation(prev => ({ ...prev, title: e.target.value }))}
              className="text-center border-none shadow-none text-lg font-medium bg-transparent"
              placeholder="Untitled Presentation"
              onBlur={savePresentation}
            />
            {isSaving && (
              <div className="text-xs text-gray-500 text-center mt-1">Saving...</div>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-cyan-600 font-medium">
              <Crown className="h-4 w-4 mr-2" />
              Upgrade to Pro
            </Button>

            <DropdownMenu open={showShareDialog} onOpenChange={setShowShareDialog}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => sharePresentation('link')}>
                  <Share className="h-4 w-4 mr-2" />
                  Share Link
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => sharePresentation('email')}>
                  <Share className="h-4 w-4 mr-2" />
                  Share via Email
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => sharePresentation('embed')}>
                  <Share className="h-4 w-4 mr-2" />
                  Embed Code
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              size="sm"
              className={cn(
                "text-white",
                isPlaying ? "bg-red-600 hover:bg-red-700" : "bg-purple-600 hover:bg-purple-700"
              )}
              onClick={isPlaying ? stopPresentation : startPresentation}
            >
              {isPlaying ? (
                <>
                  <Square className="h-4 w-4 mr-2" />
                  Stop
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Present
                </>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => exportPresentation('pdf')}>
                  <Download className="h-4 w-4 mr-2" />
                  Download as PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => exportPresentation('pptx')}>
                  <Download className="h-4 w-4 mr-2" />
                  Download as PowerPoint
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => exportPresentation('png')}>
                  <Image className="h-4 w-4 mr-2" />
                  Download as Images
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setShowSettingsDialog(true)}>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => duplicateSlide(currentSlide - 1)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate Slide
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => deleteSlide(currentSlide - 1)}
                  disabled={totalSlides <= 1}
                  className="text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Slide
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Hidden file input for uploads */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pptx,.pdf"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadFile(file);
            }}
          />
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Fixed */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-shrink-0 max-h-full">
            {/* Tab Icons */}
            <div className="w-16 bg-gray-50 border-r border-gray-200 flex flex-col items-center py-4 gap-2 flex-shrink-0 overflow-y-auto">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
                    <Home className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Home</TooltipContent>
              </Tooltip>

              {sidebarTabs.map((tab) => (
                <Tooltip key={tab.id}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-10 h-10 p-0",
                        activeTab === tab.id ? `${tab.color} bg-blue-50` : "text-gray-600"
                      )}
                      onClick={() => setActiveTab(tab.id as any)}
                    >
                      <tab.icon className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">{tab.label}</TooltipContent>
                </Tooltip>
              ))}
            </div>

            {/* Tab Content - Scrollable */}
            <div className="flex-1 p-4 overflow-y-auto max-h-full">
              {activeTab === 'design' && (
                <DesignMenu
                  currentSlide={currentSlide}
                  presentation={presentation}
                  setPresentation={setPresentation}
                  applyTemplate={applyTemplate}
                />
              )}

              {activeTab === 'elements' && (
                <ElementsMenu
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  addShapeElement={addShapeElement}
                  addEmojiElement={addEmojiElement}
                />
              )}

              {activeTab === 'text' && (
                <TextMenu
                  selectedElement={selectedElement}
                  currentSlide={currentSlide}
                  presentation={presentation}
                  setPresentation={setPresentation}
                  setSelectedElement={setSelectedElement}
                  updateElement={updateElement}
                />
              )}

              {activeTab === 'borders' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Slide Borders</h3>
                    <SlideBorderMenu
                      currentSlide={currentSlide}
                      presentation={presentation}
                      setPresentation={setPresentation}
                    />
                  </div>
                  
                  {selectedElement && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Element Borders</h3>
                      <BorderMenu
                        selectedElement={selectedElement}
                        currentSlide={currentSlide}
                        presentation={presentation}
                        updateElement={updateElement}
                      />
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'brand' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Primary Colors</h3>
                    <div className="grid grid-cols-5 gap-2">
                      {textColors.slice(0, 10).map((color, index) => (
                        <Tooltip key={index}>
                          <TooltipTrigger asChild>
                            <div
                              className={cn(
                                "aspect-square rounded-lg cursor-pointer border-2 hover:border-gray-400 transition-colors",
                                color.class
                              )}
                              onClick={() => {
                                if (selectedElement) {
                                  updateElement(selectedElement, {
                                    style: { color: color.value }
                                  });
                                }
                              }}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{color.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Secondary Colors</h3>
                    <div className="grid grid-cols-5 gap-2">
                      {textColors.slice(10).map((color, index) => (
                        <Tooltip key={index}>
                          <TooltipTrigger asChild>
                            <div
                              className={cn(
                                "aspect-square rounded-lg cursor-pointer border-2 hover:border-gray-400 transition-colors",
                                color.class
                              )}
                              onClick={() => {
                                if (selectedElement) {
                                  updateElement(selectedElement, {
                                    style: { color: color.value }
                                  });
                                }
                              }}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{color.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Background Colors</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {backgroundColors.slice(0, 8).map((color, index) => (
                        <Tooltip key={index}>
                          <TooltipTrigger asChild>
                            <div
                              className={cn(
                                "aspect-square rounded-lg cursor-pointer border-2 hover:border-gray-400 transition-colors",
                                color.class
                              )}
                              onClick={() => {
                                if (selectedElement) {
                                  updateElement(selectedElement, {
                                    style: { backgroundColor: color.value }
                                  });
                                }
                              }}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{color.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Brand Fonts</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {fontFamilies.filter(font => font.category === 'Sans Serif').map((font, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full justify-start h-auto p-3"
                          style={{ fontFamily: font.value }}
                          onClick={() => {
                            if (selectedElement) {
                              updateElement(selectedElement, {
                                style: { fontFamily: font.value }
                              });
                            }
                          }}
                        >
                          <div className="text-left">
                            <div className="font-medium">{font.name}</div>
                            <div className="text-sm text-gray-500">The quick brown fox</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Text Presets</h3>
                    <div className="space-y-2">
                      {textStyles.slice(0, 5).map((style, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full justify-start h-auto p-3"
                          onClick={() => {
                            if (selectedElement) {
                              updateElement(selectedElement, {
                                style: {
                                  fontSize: style.fontSize,
                                  fontWeight: style.fontWeight,
                                  fontFamily: style.fontFamily || 'Inter, sans-serif'
                                }
                              });
                            }
                          }}
                        >
                          <div className="text-left">
                            <div className="font-medium text-sm">{style.name}</div>
                            <div
                              className="text-gray-600 mt-1"
                              style={{
                                fontSize: Math.min(style.fontSize * 0.4, 12),
                                fontWeight: style.fontWeight
                              }}
                            >
                              {style.example}
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'uploads' && (
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
                      onClick={() => {
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
                      }}
                    >
                      <Image className="h-4 w-4 mr-2" />
                      Add from URL
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Stock Images</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
                        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400',
                        'https://images.unsplash.com/photo-1515378791036-0648a814c963?w=400',
                        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400',
                        'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400',
                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
                      ].map((imageUrl, index) => (
                        <div
                          key={index}
                          className="aspect-video bg-gray-100 rounded cursor-pointer hover:opacity-80 transition-opacity overflow-hidden"
                          onClick={() => {
                            const newElement: SlideElement = {
                              id: Date.now().toString(),
                              type: 'image',
                              content: imageUrl,
                              x: 100,
                              y: 100,
                              width: 300,
                              height: 200,
                              style: {}
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
                          }}
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
                    {selectedElement && presentation.slides[currentSlide - 1]?.elements
                      .find(el => el.id === selectedElement)?.type === 'image' && (
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => {
                            if (selectedElement) {
                              updateElement(selectedElement, {
                                style: {
                                  filter: 'grayscale(100%)'
                                }
                              });
                            }
                          }}
                        >
                          🎨 Grayscale
                        </Button>

                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => {
                            if (selectedElement) {
                              updateElement(selectedElement, {
                                style: {
                                  filter: 'sepia(100%)'
                                }
                              });
                            }
                          }}
                        >
                          📸 Sepia
                        </Button>

                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => {
                            if (selectedElement) {
                              updateElement(selectedElement, {
                                style: {
                                  filter: 'blur(2px)'
                                }
                              });
                            }
                          }}
                        >
                          🌫️ Blur
                        </Button>

                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => {
                            if (selectedElement) {
                              updateElement(selectedElement, {
                                style: {
                                  filter: 'brightness(1.3)'
                                }
                              });
                            }
                          }}
                        >
                          ☀️ Brighten
                        </Button>

                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => {
                            if (selectedElement) {
                              updateElement(selectedElement, {
                                style: {
                                  filter: 'contrast(1.5)'
                                }
                              });
                            }
                          }}
                        >
                          🔆 High Contrast
                        </Button>

                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => {
                            if (selectedElement) {
                              updateElement(selectedElement, {
                                style: {
                                  filter: 'saturate(2)'
                                }
                              });
                            }
                          }}
                        >
                          🌈 Saturate
                        </Button>

                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => {
                            if (selectedElement) {
                              updateElement(selectedElement, {
                                style: {
                                  borderRadius: '50%'
                                }
                              });
                            }
                          }}
                        >
                          ⭕ Circle Crop
                        </Button>

                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => {
                            if (selectedElement) {
                              updateElement(selectedElement, {
                                style: {
                                  borderRadius: '12px'
                                }
                              });
                            }
                          }}
                        >
                          📐 Rounded Corners
                        </Button>

                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => {
                            if (selectedElement) {
                              updateElement(selectedElement, {
                                style: {
                                  animation: 'float 3s ease-in-out infinite'
                                }
                              });
                            }
                          }}
                        >
                          🦋 Float Effect
                        </Button>

                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => {
                            if (selectedElement) {
                              updateElement(selectedElement, {
                                style: {
                                  animation: 'pulse 2s infinite'
                                }
                              });
                            }
                          }}
                        >
                          💫 Pulse Effect
                        </Button>

                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => {
                            if (selectedElement) {
                              updateElement(selectedElement, {
                                style: {
                                  transform: 'rotate(5deg)'
                                }
                              });
                            }
                          }}
                        >
                          🔄 Rotate
                        </Button>

                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => {
                            if (selectedElement) {
                              updateElement(selectedElement, {
                                style: {
                                  filter: 'none',
                                  borderRadius: 0,
                                  animation: 'none',
                                  transform: 'none'
                                }
                              });
                            }
                          }}
                        >
                          🔄 Reset All Effects
                        </Button>
                      </div>
                    )}

                    {(!selectedElement || presentation.slides[currentSlide - 1]?.elements
                      .find(el => el.id === selectedElement)?.type !== 'image') && (
                      <div className="text-sm text-gray-500 text-center py-4">
                        Select an image to apply effects
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'tools' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">View Options</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Grid3X3 className="h-4 w-4 mr-2" />
                        Slide Sorter View
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Maximize className="h-4 w-4 mr-2" />
                        Full Screen
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Zoom</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Button variant="outline" size="sm" onClick={zoomOut}>
                        <ZoomOut className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-medium min-w-[3rem] text-center">
                        {zoomLevel}%
                      </span>
                      <Button variant="outline" size="sm" onClick={zoomIn}>
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="outline" size="sm" onClick={resetZoom} className="w-full">
                      Reset Zoom
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Slide Actions</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start" onClick={addNewSlide}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Slide
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => duplicateSlide(currentSlide - 1)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate Slide
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-red-600 hover:text-red-700"
                        onClick={() => deleteSlide(currentSlide - 1)}
                        disabled={totalSlides <= 1}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Slide
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Grid & Guides</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="show-grid-sidebar" />
                        <Label htmlFor="show-grid-sidebar" className="text-sm">Show grid</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="snap-to-grid-sidebar" />
                        <Label htmlFor="snap-to-grid-sidebar" className="text-sm">Snap to grid</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="show-rulers-sidebar" />
                        <Label htmlFor="show-rulers-sidebar" className="text-sm">Show rulers</Label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Slide Thumbnail Panel */}
          <div className="w-48 bg-gray-50 border-r border-gray-200 flex flex-col flex-shrink-0">
            <div className="p-3 border-b border-gray-200">
              <h3 className="font-medium text-gray-900 text-sm">Slides</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {presentation.slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={cn(
                    "relative group cursor-pointer rounded-lg border-2 transition-all",
                    currentSlide === index + 1
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                  onClick={() => navigateToSlide(index + 1)}
                >
                  {/* Slide Preview */}
                  <div className="aspect-video bg-white rounded-md m-1 relative overflow-hidden">
                    <div
                      className={cn("w-full h-full", slide.background)}
                      style={{
                        border: slide.border || 'none',
                        borderRadius: slide.borderRadius || '0px',
                        boxShadow: slide.style?.boxShadow || 'none'
                      }}
                    >
                      {/* Mini preview of slide elements */}
                      {slide.elements.map((element) => (
                        <div
                          key={element.id}
                          className="absolute"
                          style={{
                            left: `${(element.x / 800) * 100}%`,
                            top: `${(element.y / 450) * 100}%`,
                            width: `${(element.width / 800) * 100}%`,
                            height: `${(element.height / 450) * 100}%`,
                            fontSize: '6px',
                            backgroundColor: element.type === 'shape' ? element.style.backgroundColor : 'transparent',
                            color: element.style.color,
                            borderRadius: element.style.borderRadius ? `${element.style.borderRadius}px` : '0',
                          }}
                        >
                          {element.type === 'text' && (
                            <div className="text-xs truncate">{element.content}</div>
                          )}
                          {element.type === 'shape' && (
                            <div className="w-full h-full bg-current opacity-70"></div>
                          )}
                          {element.type === 'image' && (
                            <img src={element.content} alt="" className="w-full h-full object-cover" />
                          )}
                        </div>
                      ))}

                      {/* Empty slide indicator */}
                      {slide.elements.length === 0 && (
                        <div className="absolute inset-2 border border-dashed border-gray-300 rounded flex items-center justify-center">
                          <div className="text-gray-400 text-xs">Empty</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Slide Number */}
                  <div className="absolute top-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                    {index + 1}
                  </div>

                  {/* Slide Actions (visible on hover) */}
                  <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 bg-white shadow-sm">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => duplicateSlide(index)}>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => deleteSlide(index)}
                          disabled={totalSlides <= 1}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Speaker Notes Indicator */}
                  {slide.notes && (
                    <div className="absolute bottom-1 right-1">
                      <FileText className="h-3 w-3 text-gray-500" />
                    </div>
                  )}
                </div>
              ))}

              {/* Add New Slide Button */}
              <Button
                variant="outline"
                className="w-full aspect-video border-2 border-dashed border-gray-300 hover:border-gray-400 flex items-center justify-center"
                onClick={addNewSlide}
              >
                <Plus className="h-6 w-6 text-gray-400" />
              </Button>
            </div>
          </div>

          {/* Main Canvas Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Canvas - Scrollable */}
            <div className="flex-1 bg-gray-100 p-8 flex items-center justify-center overflow-auto">
              <Card
                className="w-full max-w-4xl aspect-video shadow-2xl border-2 border-purple-200"
                style={{ transform: `scale(${zoomLevel / 100})` }}
              >
                <CardContent
                  ref={canvasRef}
                  className={cn(
                    "p-0 h-full rounded-lg relative overflow-hidden cursor-pointer",
                    presentation.slides[currentSlide - 1]?.background || "bg-white"
                  )}
                  style={{
                    border: presentation.slides[currentSlide - 1]?.border || 'none',
                    borderRadius: presentation.slides[currentSlide - 1]?.borderRadius || '8px',
                    boxShadow: presentation.slides[currentSlide - 1]?.style?.boxShadow || 'none'
                  }}
                  onMouseMove={(e) => {
                    if (isDragging) {
                      handleMouseMove(e);
                    } else if (isResizing) {
                      handleResize(e);
                    }
                  }}
                  onMouseUp={handleMouseUp}
                  onClick={(e) => {
                    if (editMode === 'edit' && e.target === e.currentTarget) {
                      // Clicked on empty canvas - add text element
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = ((e.clientX - rect.left) / (zoomLevel / 100)) - 100;
                      const y = ((e.clientY - rect.top) / (zoomLevel / 100)) - 25;

                      const newElement: SlideElement = {
                        id: Date.now().toString(),
                        type: 'text',
                        content: 'Click to edit text',
                        x: Math.max(0, x),
                        y: Math.max(0, y),
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
                    }
                  }}
                >
                  {/* Render slide elements */}
                  {presentation.slides[currentSlide - 1]?.elements.map((element) => (
                    <div
                      key={element.id}
                      className={cn(
                        "absolute border-2 select-none",
                        selectedElement === element.id
                          ? "border-blue-500 border-dashed"
                          : "border-transparent hover:border-gray-300",
                        isDragging && selectedElement === element.id ? "cursor-grabbing" : "cursor-grab"
                      )}
                      style={{
                        left: element.x,
                        top: element.y,
                        width: element.width,
                        height: element.height,
                        fontSize: element.style.fontSize,
                        fontWeight: element.style.fontWeight,
                        fontFamily: element.style.fontFamily,
                        fontStyle: element.style.fontStyle,
                        textDecoration: element.style.textDecoration,
                        textAlign: element.style.textAlign,
                        textTransform: element.style.textTransform,
                        textShadow: element.style.textShadow,
                        lineHeight: element.style.lineHeight,
                        letterSpacing: element.style.letterSpacing,
                        color: element.style.color,
                        backgroundColor: element.style.backgroundColor,
                        background: element.style.background,
                        borderRadius: element.style.borderRadius,
                        border: element.style.border,
                        padding: element.style.padding,
                        filter: element.style.filter,
                        animation: element.style.animation,
                        transform: element.style.transform,
                        opacity: element.style.opacity,
                        WebkitBackgroundClip: element.style.WebkitBackgroundClip,
                        WebkitTextFillColor: element.style.WebkitTextFillColor,
                        backgroundClip: element.style.backgroundClip,
                      } as React.CSSProperties}
                      onMouseDown={(e) => handleMouseDown(e, element.id)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedElement(element.id);
                      }}
                      onDoubleClick={(e) => {
                        e.stopPropagation();
                        if (element.type === 'text') {
                          setIsTextEditing(true);
                        }
                      }}
                    >
                      {element.type === 'text' && (
                        <div className="w-full h-full flex items-center justify-center p-2">
                          {isTextEditing && selectedElement === element.id ? (
                            <Textarea
                              value={element.content}
                              onChange={(e) => updateElement(element.id, { content: e.target.value })}
                              onBlur={() => setIsTextEditing(false)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault();
                                  setIsTextEditing(false);
                                }
                              }}
                              className="w-full h-full resize-none border-none bg-transparent"
                              autoFocus
                            />
                          ) : (
                            <span className="text-center">{element.content}</span>
                          )}
                        </div>
                      )}

                      {element.type === 'shape' && (
                        <div className="w-full h-full flex items-center justify-center">
                          {element.content === 'rectangle' && <Square className="w-full h-full" />}
                          {element.content === 'square' && <Square className="w-full h-full" />}
                          {element.content === 'circle' && <Circle className="w-full h-full" />}
                          {element.content === 'oval' && <Circle className="w-full h-full" />}
                          {element.content === 'triangle' && <Triangle className="w-full h-full" />}
                          {element.content === 'star' && <Star className="w-full h-full" />}
                          {element.content === 'heart' && <Heart className="w-full h-full" />}
                          {element.content === 'lightning' && <Zap className="w-full h-full" />}
                          {element.content === 'line' && <Minus className="w-full h-full" />}
                          {element.content === 'diamond' && (
                            <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2L2 12l10 10 10-10L12 2z"/>
                            </svg>
                          )}
                          {element.content === 'pentagon' && (
                            <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2l7.5 5.5-2.9 8.9H7.4L4.5 7.5L12 2z"/>
                            </svg>
                          )}
                          {element.content === 'hexagon' && (
                            <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M17.5 3.5L22 12l-4.5 8.5h-11L2 12l4.5-8.5h11z"/>
                            </svg>
                          )}
                          {element.content === 'arrow right' && (
                            <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M8 4l8 8-8 8V4z"/>
                            </svg>
                          )}
                          {element.content === 'arrow left' && (
                            <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M16 4l-8 8 8 8V4z"/>
                            </svg>
                          )}
                          {element.content === 'arrow up' && (
                            <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M4 16l8-8 8 8H4z"/>
                            </svg>
                          )}
                          {element.content === 'arrow down' && (
                            <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M4 8l8 8 8-8H4z"/>
                            </svg>
                          )}
                          {element.content === 'cloud' && (
                            <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
                            </svg>
                          )}
                          {element.content === 'sun' && (
                            <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
                              <circle cx="12" cy="12" r="5"/>
                              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                            </svg>
                          )}
                        </div>
                      )}

                      {element.type === 'image' && (
                        <img
                          src={element.content}
                          alt="Slide element"
                          className="w-full h-full object-cover rounded"
                        />
                      )}

                      {/* Selection handles */}
                      {selectedElement === element.id && (
                        <>
                          <div
                            className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-full cursor-nw-resize border-2 border-white shadow-sm"
                            onMouseDown={(e) => handleResizeStart(e, 'nw')}
                          ></div>
                          <div
                            className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full cursor-ne-resize border-2 border-white shadow-sm"
                            onMouseDown={(e) => handleResizeStart(e, 'ne')}
                          ></div>
                          <div
                            className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 rounded-full cursor-sw-resize border-2 border-white shadow-sm"
                            onMouseDown={(e) => handleResizeStart(e, 'sw')}
                          ></div>
                          <div
                            className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full cursor-se-resize border-2 border-white shadow-sm"
                            onMouseDown={(e) => handleResizeStart(e, 'se')}
                          ></div>

                          {/* Element toolbar */}
                          <div className="absolute -top-10 left-0 flex gap-1 bg-white rounded shadow-lg border p-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-6 h-6 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Duplicate element
                                const newElement = {
                                  ...element,
                                  id: Date.now().toString(),
                                  x: element.x + 20,
                                  y: element.y + 20
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
                              }}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-6 h-6 p-0 text-red-600 hover:text-red-700"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteElement(element.id);
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}

                  {/* Empty state */}
                  {presentation.slides[currentSlide - 1]?.elements.length === 0 && (
                    <div className="absolute inset-4 border-2 border-dashed border-purple-300 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <Sparkles className="h-16 w-16 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Click to add content</h2>
                        <p className="text-gray-500">Start designing your presentation</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Bottom Controls - Fixed */}
            <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Notes
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Slide Notes</DialogTitle>
                        <DialogDescription>
                          Add speaker notes for slide {currentSlide}
                        </DialogDescription>
                      </DialogHeader>
                      <Textarea
                        placeholder="Enter your speaker notes here..."
                        value={presentation.slides[currentSlide - 1]?.notes || ''}
                        onChange={(e) => {
                          setPresentation(prev => ({
                            ...prev,
                            slides: prev.slides.map((slide, index) =>
                              index === currentSlide - 1
                                ? { ...slide, notes: e.target.value }
                                : slide
                            )
                          }));
                        }}
                        className="min-h-[100px]"
                      />
                    </DialogContent>
                  </Dialog>

                  <Button variant="ghost" size="sm">
                    <Clock className="h-4 w-4 mr-2" />
                    Duration
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Clock className="h-4 w-4 mr-2" />
                    Timer
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" onClick={addNewSlide}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Add New Slide</TooltipContent>
                  </Tooltip>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => duplicateSlide(currentSlide - 1)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate Slide
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => deleteSlide(currentSlide - 1)}
                        disabled={totalSlides <= 1}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Slide
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={zoomOut}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <div className="text-sm text-gray-600 min-w-[3rem] text-center">
                    {zoomLevel}%
                  </div>
                  <Button variant="outline" size="sm" onClick={zoomIn}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateToSlide(currentSlide - 1)}
                    disabled={currentSlide <= 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="1"
                      max={totalSlides}
                      value={currentSlide}
                      onChange={(e) => {
                        const slideNum = parseInt(e.target.value);
                        if (slideNum >= 1 && slideNum <= totalSlides) {
                          navigateToSlide(slideNum);
                        }
                      }}
                      className="w-16 h-8 text-center text-sm"
                    />
                    <span className="text-sm text-gray-600">/ {totalSlides}</span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateToSlide(currentSlide + 1)}
                    disabled={currentSlide >= totalSlides}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Dialog */}
        <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Presentation Settings</DialogTitle>
              <DialogDescription>
                Configure your presentation settings
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="slide-size">Slide Size</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      16:9 (Widescreen) <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    <DropdownMenuItem>16:9 (Widescreen)</DropdownMenuItem>
                    <DropdownMenuItem>4:3 (Standard)</DropdownMenuItem>
                    <DropdownMenuItem>1:1 (Square)</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div>
                <Label htmlFor="auto-save">Auto-save</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <input type="checkbox" id="auto-save" defaultChecked />
                  <Label htmlFor="auto-save" className="text-sm">
                    Automatically save changes
                  </Label>
                </div>
              </div>

              <div>
                <Label>Grid & Guides</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="show-grid" />
                    <Label htmlFor="show-grid" className="text-sm">Show grid</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="snap-to-grid" />
                    <Label htmlFor="snap-to-grid" className="text-sm">Snap to grid</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="show-rulers" />
                    <Label htmlFor="show-rulers" className="text-sm">Show rulers</Label>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Keyboard Shortcuts Help */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="fixed bottom-4 right-4 bg-white shadow-lg border"
            >
              <span className="text-xs">?</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Keyboard Shortcuts</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Add new slide</span>
                <Badge variant="outline">Ctrl + M</Badge>
              </div>
              <div className="flex justify-between">
                <span>Duplicate slide</span>
                <Badge variant="outline">Ctrl + D</Badge>
              </div>
              <div className="flex justify-between">
                <span>Delete slide</span>
                <Badge variant="outline">Delete</Badge>
              </div>
              <div className="flex justify-between">
                <span>Save presentation</span>
                <Badge variant="outline">Ctrl + S</Badge>
              </div>
              <div className="flex justify-between">
                <span>Start presentation</span>
                <Badge variant="outline">F5</Badge>
              </div>
              <div className="flex justify-between">
                <span>Zoom in</span>
                <Badge variant="outline">Ctrl + +</Badge>
              </div>
              <div className="flex justify-between">
                <span>Zoom out</span>
                <Badge variant="outline">Ctrl + -</Badge>
              </div>
              <div className="flex justify-between">
                <span>Reset zoom</span>
                <Badge variant="outline">Ctrl + 0</Badge>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
