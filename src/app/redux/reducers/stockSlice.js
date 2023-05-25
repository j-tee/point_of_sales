/* eslint-disable max-len */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import StockService from '../../services/data/stockService';

export const getStock = createAsyncThunk(
  'stock/getStock',
  async (stockId, thunkAPI) => {
    try {
      const response = await StockService.getStock(stockId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getStocks = createAsyncThunk(
  'stock/getStocks',
  async (params, thunkAPI) => {
    try {
      const response = await StockService.getStocks(params.store_id, params.customer_id, params.status);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const addStock = createAsyncThunk(
  'stock/addStock',
  async (stock, thunkAPI) => {
    try {
      const response = await StockService.addStock(stock);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateOrder = createAsyncThunk(
  'stock/updateOrder',
  async (stock, thunkAPI) => {
    try {
      const response = await StockService.updateOrder(stock);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteStock = createAsyncThunk(
  'stock/deleteStock',
  async (stockId, thunkAPI) => {
    try {
      const response = await StockService.deleteStock(stockId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
const initialState = {
  stocks: [],
  stock: {},
  message: '',
  isLoading: false,
};
export const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStock.fulfilled, (state, action) => ({
        ...state, stock: action.payload, message: 'Order successfully loaded', isLoading: false,
      }));
    builder
      .addCase(getStock.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getStock.rejected, (state, action) => ({
        ...state, message: action.payload, isLoading: false,
      }));
    builder
      .addCase(getStocks.fulfilled, (state, action) => ({
        ...state, stocks: action.payload, message: 'Orders successfully loaded', isLoading: false,
      }));
    builder
      .addCase(getStocks.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getStocks.rejected, (state, action) => ({
        ...state, message: action.payload, isLoading: false,
      }));
    builder
      .addCase(addStock.fulfilled, (state, action) => ({
        ...state, stock: action.payload, message: 'Orders successfully added', isLoading: false,
      }));
    builder
      .addCase(addStock.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(addStock.rejected, (state) => ({
        ...state, message: 'failed to add stock', isLoading: false,
      }));
    builder
      .addCase(updateOrder.fulfilled, (state, action) => ({
        ...state, stock: action.payload, message: 'Orders successfully updated', isLoading: false,
      }));
    builder
      .addCase(updateOrder.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(updateOrder.rejected, (state) => ({
        ...state, message: 'failed to update stock', isLoading: false,
      }));
    builder
      .addCase(deleteStock.fulfilled, (state) => ({
        ...state, message: 'failed to delete stock', isLoading: false,
      }));
    builder
      .addCase(deleteStock.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(deleteStock.rejected, (state, action) => ({
        ...state, message: action.payload, isLoading: false,
      }));
  },
});

export default stockSlice.reducer;
