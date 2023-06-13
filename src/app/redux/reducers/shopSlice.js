/* eslint-disable max-len */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ShopService from '../../services/data/shopService';

const initialState = {
  outlets: [],
  message: '',
  shop: {},
  isLoading: false,
};

export const getShops = createAsyncThunk(
  'shop/getShops',
  async (id, thunkAPI) => {
    try {
      const response = await ShopService.getShops(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const registerShop = createAsyncThunk(
  'shop/registerShops',
  async (shop, thunkAPI) => {
    try {
      const response = await ShopService.registerShop(shop);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteShop = createAsyncThunk(
  'shop/deleteShop',
  async (id, thunkAPI) => {
    try {
      const response = ShopService.deleteShop(id);
      return (await response).data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getShop = createAsyncThunk(
  'shop/getShop',
  async (id, thunkAPI) => {
    try {
      const response = ShopService.getShop(id);
      return (await response).data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateShop = createAsyncThunk(
  'shop/updateShop',
  async (shop, thunkAPI) => {
    try {
      const response = await ShopService.updateShop(shop.id, shop);
      return await response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShops.fulfilled, (state, action) => ({ ...state, outlets: action.payload, isLoading: false }));
    builder
      .addCase(getShops.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getShops.rejected, (state, action) => ({ ...state, isLoading: false, message: action.payload }));
    builder
      .addCase(registerShop.fulfilled, (state, action) => ({ ...state, shop: action.payload, isLoading: false }));
    builder
      .addCase(registerShop.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(registerShop.rejected, (state, action) => ({ ...state, isLoading: false, message: action.payload }));
    builder
      .addCase(getShop.fulfilled, (state, action) => ({ ...state, outlets: action.payload }));
    builder
      .addCase(getShop.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getShop.rejected, (state, action) => ({ ...state, message: action.payload }));
    builder
      .addCase(updateShop.fulfilled, (state, action) => ({ ...state, outlets: action.payload }));
    builder
      .addCase(updateShop.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(updateShop.rejected, (state, action) => ({ ...state, message: action.payload }));
  },
});

export default shopSlice.reducer;
