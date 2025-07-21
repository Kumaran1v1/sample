import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project, Template } from '@shared/schema';

interface EditorElement {
  id: string;
  type: 'text' | 'image' | 'shape';
  x: number;
  y: number;
  width: number;
  height: number;
  properties: Record<string, any>;
}

interface EditorState {
  currentProject: Project | null;
  currentTemplate: Template | null;
  elements: EditorElement[];
  selectedElement: string | null;
  canvasWidth: number;
  canvasHeight: number;
  zoom: number;
  isLoading: boolean;
}

const initialState: EditorState = {
  currentProject: null,
  currentTemplate: null,
  elements: [],
  selectedElement: null,
  canvasWidth: 800,
  canvasHeight: 600,
  zoom: 1,
  isLoading: false,
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setCurrentProject: (state, action: PayloadAction<Project | null>) => {
      state.currentProject = action.payload;
    },
    setCurrentTemplate: (state, action: PayloadAction<Template | null>) => {
      state.currentTemplate = action.payload;
    },
    setElements: (state, action: PayloadAction<EditorElement[]>) => {
      state.elements = action.payload;
    },
    addElement: (state, action: PayloadAction<EditorElement>) => {
      state.elements.push(action.payload);
    },
    updateElement: (state, action: PayloadAction<{ id: string; updates: Partial<EditorElement> }>) => {
      const { id, updates } = action.payload;
      const index = state.elements.findIndex(el => el.id === id);
      if (index !== -1) {
        state.elements[index] = { ...state.elements[index], ...updates };
      }
    },
    deleteElement: (state, action: PayloadAction<string>) => {
      state.elements = state.elements.filter(el => el.id !== action.payload);
    },
    setSelectedElement: (state, action: PayloadAction<string | null>) => {
      state.selectedElement = action.payload;
    },
    setCanvasSize: (state, action: PayloadAction<{ width: number; height: number }>) => {
      state.canvasWidth = action.payload.width;
      state.canvasHeight = action.payload.height;
    },
    setZoom: (state, action: PayloadAction<number>) => {
      state.zoom = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    resetEditor: (state) => {
      state.currentProject = null;
      state.currentTemplate = null;
      state.elements = [];
      state.selectedElement = null;
      state.zoom = 1;
    },
  },
});

export const {
  setCurrentProject,
  setCurrentTemplate,
  setElements,
  addElement,
  updateElement,
  deleteElement,
  setSelectedElement,
  setCanvasSize,
  setZoom,
  setLoading,
  resetEditor,
} = editorSlice.actions;

export default editorSlice.reducer;
