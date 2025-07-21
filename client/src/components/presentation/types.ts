// Shared types for presentation components

export interface SlideElement {
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

export interface Slide {
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

export interface Presentation {
  id: string;
  title: string;
  slides: Slide[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DesignTemplate {
  id: number;
  name: string;
  color: string;
  isCustom: boolean;
}

export interface TextColor {
  name: string;
  value: string;
  class: string;
}

export interface BorderStyle {
  name: string;
  value: string;
  preview: string;
}

export interface FontFamily {
  name: string;
  value: string;
  category: string;
}

export interface FontSize {
  name: string;
  value: number;
  display: string;
}

export interface TextStyle {
  name: string;
  fontSize: number;
  fontWeight: string;
  example: string;
  italic?: boolean;
  fontFamily?: string;
}

export interface EmojiCategories {
  [key: string]: string[];
}

export interface PresentationContextType {
  // Presentation state
  presentation: Presentation;
  setPresentation: React.Dispatch<React.SetStateAction<Presentation>>;
  
  // Current state
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
  totalSlides: number;
  setTotalSlides: React.Dispatch<React.SetStateAction<number>>;
  
  // UI state
  zoomLevel: number;
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
  selectedElement: string | null;
  setSelectedElement: React.Dispatch<React.SetStateAction<string | null>>;
  isTextEditing: boolean;
  setIsTextEditing: React.Dispatch<React.SetStateAction<boolean>>;
  editMode: 'edit' | 'view' | 'comment';
  setEditMode: React.Dispatch<React.SetStateAction<'edit' | 'view' | 'comment'>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  isSaving: boolean;
  setIsSaving: React.Dispatch<React.SetStateAction<boolean>>;
  
  // Drag and drop state
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  isResizing: boolean;
  setIsResizing: React.Dispatch<React.SetStateAction<boolean>>;
  
  // Functions
  savePresentation: () => Promise<void>;
  addNewSlide: () => void;
  deleteSlide: (slideIndex: number) => void;
  duplicateSlide: (slideIndex: number) => void;
  navigateToSlide: (slideNumber: number) => void;
  addTextElement: (text?: string) => void;
  addShapeElement: (shapeType: string) => void;
  addEmojiElement: (emoji: string) => void;
  deleteElement: (elementId: string) => void;
  updateElement: (elementId: string, updates: Partial<SlideElement>) => void;
  applyTemplate: (templateId: string) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  startPresentation: () => void;
  stopPresentation: () => void;
  exportPresentation: (format: 'pdf' | 'pptx' | 'png') => Promise<void>;
  sharePresentation: (shareType: 'link' | 'email' | 'embed') => Promise<void>;
  uploadFile: (file: File) => void;
}
