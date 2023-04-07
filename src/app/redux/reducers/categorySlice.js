/* eslint-disable max-len */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CategoryService from '../../services/data/categoryService';

const initialState = {
  categories: [],
  message: '',
  isLoading: false,
};

export const getCategories = createAsyncThunk(
  'category/getCategories',
  async (storeId, thunkAPI) => {
    try {
      const response = CategoryService.getCategories(storeId);
      return (await response).data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const addCategory = createAsyncThunk(
  'category/addCategory',
  async (category, thunkAPI) => {
    try {
      const response = CategoryService.addCategory(category);
      return (await response).data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async (category, thunkAPI) => {
    try {
      const response = CategoryService.updateCategory(category);
      return (await response).data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (id, thunkAPI) => {
    try {
      const response = CategoryService.deleteCategory(id);
      return (await response).data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  redusers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.fulfilled, (state, action) => ({ ...state, categories: action.payload, isLoading: false }));
    builder
      .addCase(getCategories.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getCategories.rejected, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
    builder
      .addCase(addCategory.fulfilled, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
    builder
      .addCase(addCategory.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(addCategory.rejected, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
    builder
      .addCase(updateCategory.fulfilled, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
    builder
      .addCase(updateCategory.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(updateCategory.rejected, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
    builder
      .addCase(deleteCategory.fulfilled, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
    builder
      .addCase(deleteCategory.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(deleteCategory.rejected, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
  },
});

export default categorySlice.reducer;
