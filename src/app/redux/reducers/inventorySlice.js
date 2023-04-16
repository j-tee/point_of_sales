/* eslint-disable max-len */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import InventoryService from '../../services/data/inventoryService';

const initialState = {
  products: [],
  message: '',
  isLoading: false,
  countries: [],
  names: [],
  manufacturers: [],
};

export const getUniqueListOfCountries = createAsyncThunk(
  'inventory/getUniqueListOfCountries',
  async (storeId, thunkAPI) => {
    try {
      const response = await InventoryService.getUniqueListOfCountries(storeId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const addProduct = createAsyncThunk(
  'inventory/addProduct',
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
  'inventory/getProducts',
  async (param, thunkAPI) => {
    try {
      const response = await InventoryService.getProducts(param.storeId, param.categoryId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getUniqueProducts = createAsyncThunk(
  'inventory/getUniqueProducts',
  async (params, thunkAPI) => {
    try {
      const response = await InventoryService.getUniqueProducts(params.storeId, params.categoryId, params.country);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getUniqueManufacturers = createAsyncThunk(
  'inventory/getUniqueManufacturers',
  async (params, thunkAPI) => {
    try {
      const response = await InventoryService.getUniqueManufacturers(params.storeId, params.categoryId, params.country, params.productName);
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
      .addCase(getUniqueManufacturers.fulfilled, (state, action) => ({ ...state, manufacturers: action.payload, isLoading: false }));
    builder
      .addCase(getUniqueManufacturers.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getUniqueManufacturers.rejected, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
    builder
      .addCase(getUniqueProducts.fulfilled, (state, action) => ({ ...state, names: action.payload, isLoading: false }));
    builder
      .addCase(getUniqueProducts.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getUniqueProducts.rejected, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
    builder
      .addCase(addProduct.fulfilled, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
    builder
      .addCase(addProduct.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(addProduct.rejected, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
    builder
      .addCase(getProducts.fulfilled, (state, action) => ({ ...state, products: action.payload, isLoading: false }));
    builder
      .addCase(getProducts.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getProducts.rejected, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
    builder
      .addCase(getUniqueListOfCountries.fulfilled, (state, action) => ({ ...state, countries: action.payload, isLoading: false }));
    builder
      .addCase(getUniqueListOfCountries.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getUniqueListOfCountries.rejected, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
  },
});

export default inventorySlice.reducer;
