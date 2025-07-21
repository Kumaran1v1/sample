import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import templateReducer from './slices/templateSlice';
import editorReducer from './slices/editorSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    template: templateReducer,
    editor: editorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
