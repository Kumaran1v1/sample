import { FileText, Layout, Columns2, FileImage, Hash, Heading1 } from "lucide-react";

// Slide Template Types
export interface SlideTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  icon: any;
  elements: any[];
}

// Predefined Slide Templates Data
export const slideTemplates: SlideTemplate[] = [
  {
    id: 'blank',
    name: 'Blank',
    description: 'Empty slide',
    thumbnail: '⬜',
    icon: FileText,
    elements: []
  },
  {
    id: 'title',
    name: 'Title Slide',
    description: 'Title and subtitle',
    thumbnail: '📄',
    icon: Heading1,
    elements: []
  },
  {
    id: 'title-content',
    name: 'Title & Content',
    description: 'Title with content area',
    thumbnail: '📝',
    icon: Layout,
    elements: []
  },
  {
    id: 'two-column',
    name: 'Two Column',
    description: 'Title with two columns',
    thumbnail: '📊',
    icon: Columns2,
    elements: []
  },
  {
    id: 'title-footer',
    name: 'Title & Footer',
    description: 'Title with footer',
    thumbnail: '📋',
    icon: FileImage,
    elements: []
  },
  {
    id: 'section-header',
    name: 'Section Header',
    description: 'Large section title',
    thumbnail: '🏷️',
    icon: Hash,
    elements: []
  }
];

// Template utility functions
export const getTemplateById = (id: string): SlideTemplate | undefined => {
  return slideTemplates.find(template => template.id === id);
};

export const getTemplatesByCategory = (category?: string): SlideTemplate[] => {
  if (!category || category === 'all') {
    return slideTemplates;
  }
  // Add category filtering logic here if needed
  return slideTemplates;
};
