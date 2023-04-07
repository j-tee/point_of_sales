/* eslint-disable max-len */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import InventoryService from '../../services/data/inventoryService';

const initialState = {
  products: [],
  message: '',
  isLoading: false,
};

export const addProduct = createAsyncThunk(
  'product/addProduct',
  async (product, thunkAPI) => {
    try {
      const response = InventoryService.addProduct(product);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getProducts = createAsyncThunk(
  'product/getProduct',
  async (param, thunkAPI) => {
    try {
      const response = InventoryService.getProducts(param.storeId, param.categoryId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.fulfilled, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
    builder
      .addCase(addProduct.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(addProduct.rejected, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
    builder
      .addCase(getProducts.fulfilled, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
    builder
      .addCase(getProducts.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getProducts.rejected, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
  },
});

export default inventorySlice.reducer;
