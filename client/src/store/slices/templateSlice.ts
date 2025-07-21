import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type ITemplate, type ICategory } from '@shared/schema';

interface TemplateState {
  templates: ITemplate[];
  categories: ICategory[];
  selectedCategory: string | null;
  searchQuery: string;
  isLoading: boolean;
  favoriteTemplates: ITemplate[];
}

const initialState: TemplateState = {
  templates: [],
  categories: [],
  selectedCategory: null,
  searchQuery: '',
  isLoading: false,
  favoriteTemplates: [],
};

const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    setTemplates: (state, action: PayloadAction<ITemplate[]>) => {
      state.templates = action.payload;
    },
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setFavoriteTemplates: (state, action: PayloadAction<ITemplate[]>) => {
      state.favoriteTemplates = action.payload;
    },
    addFavorite: (state, action: PayloadAction<ITemplate>) => {
      state.favoriteTemplates.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favoriteTemplates = state.favoriteTemplates.filter(
        template => template._id !== action.payload
      );
    },
  },
});

export const {
  setTemplates,
  setCategories,
  setSelectedCategory,
  setSearchQuery,
  setLoading,
  setFavoriteTemplates,
  addFavorite,
  removeFavorite,
} = templateSlice.actions;

export default templateSlice.reducer;
