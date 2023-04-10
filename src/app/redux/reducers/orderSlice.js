/* eslint-disable max-len */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import OrderService from '../../services/data/orderService';

export const getOrder = createAsyncThunk(
  'order/getOrder',
  async (orderId, thunkAPI) => {
    try {
      const response = await OrderService.getOrder(orderId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getOrders = createAsyncThunk(
  'order/getOrders',
  async (params, thunkAPI) => {
    try {
      const response = await OrderService.getOrders(params.storeId, params.customerId, params.status);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const addOrder = createAsyncThunk(
  'order/addOrder',
  async (order, thunkAPI) => {
    try {
      const response = await OrderService.addOrders(order);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateOrder = createAsyncThunk(
  'order/updateOrder',
  async (order, thunkAPI) => {
    try {
      const response = await OrderService.updateOrder(order);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteOrder = createAsyncThunk(
  'order/deleteOrder',
  async (orderId, thunkAPI) => {
    try {
      const response = await OrderService.deleteOrder(orderId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
const initialState = {
  orders: [],
  order: {},
  message: '',
  isLoading: false,
};
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.fulfilled, (state, action) => ({
        ...state, order: action.payload, message: 'Order successfully loaded', isLoading: false,
      }));
    builder
      .addCase(getOrder.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getOrder.rejected, (state, action) => ({
        ...state, message: action.payload, isLoading: false,
      }));
    builder
      .addCase(getOrders.fulfilled, (state, action) => ({
        ...state, orders: action.payload, message: 'Orders successfully loaded', isLoading: false,
      }));
    builder
      .addCase(getOrders.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getOrders.rejected, (state, action) => ({
        ...state, message: action.payload, isLoading: false,
      }));
    builder
      .addCase(addOrder.fulfilled, (state, action) => ({
        ...state, order: action.payload, message: 'Orders successfully added', isLoading: false,
      }));
    builder
      .addCase(addOrder.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(addOrder.rejected, (state, action) => ({
        ...state, message: action.payload, isLoading: false,
      }));
    builder
      .addCase(updateOrder.fulfilled, (state, action) => ({
        ...state, order: action.payload, message: 'Orders successfully updated', isLoading: false,
      }));
    builder
      .addCase(updateOrder.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(updateOrder.rejected, (state, action) => ({
        ...state, message: action.payload, isLoading: false,
      }));
    builder
      .addCase(deleteOrder.fulfilled, (state, action) => ({
        ...state, message: action.payload, isLoading: false,
      }));
    builder
      .addCase(deleteOrder.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(deleteOrder.rejected, (state, action) => ({
        ...state, message: action.payload, isLoading: false,
      }));
  },
});

export default orderSlice.reducer;
