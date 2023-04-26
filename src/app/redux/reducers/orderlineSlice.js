/* eslint-disable max-len */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import OrderLineService from '../../services/data/orderLineService';

export const addOrderLineItem = createAsyncThunk(
  'orderline/addOrderLineItem',
  async (product, thunkAPI) => {
    try {
      const response = await OrderLineService.addOrderLineItem(product);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.reponse.data);
    }
  },
);

export const getOrderLineItems = createAsyncThunk(
  'orderline/getOrderLineItems',
  async (params, thunkAPI) => {
    try {
      const response = await OrderLineService.getOrderLineItems(params.orderId, params.customerId, params.productId, params.page, params.perPage);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateOrderLineItem = createAsyncThunk(
  'orderline/updateOrderLineItem',
  async (orderLineItem, thunkAPI) => {
    try {
      const response = await OrderLineService.updateOrderLineItem(orderLineItem.id, orderLineItem);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getOrderLineItem = createAsyncThunk(
  'orderline/getOrderLineItem',
  async (id, thunkAPI) => {
    try {
      const response = await OrderLineService.getOrderLineItem(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
const initialState = {
  lineItems: [],
  isLoading: false,
  message: '',
  lineItem: {},
  pagination: {},
};
const OrderlineSlice = createSlice({
  name: 'orderline',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addOrderLineItem.fulfilled, (state, action) => ({
        ...state, lineItem: action.payload, isLoading: false, message: 'Item added to list successfully',
      }));
    builder.addCase(addOrderLineItem.pending, (state) => ({ ...state, isLoading: true, message: 'Loading data' }));
    builder
      .addCase(addOrderLineItem.rejected, (state) => ({ ...state, isLoading: false, message: 'Failed to add record to database' }));
    builder
      .addCase(getOrderLineItems.fulfilled, (state, action) => ({
        ...state,
        lineItems: action.payload.order_line_items.data,
        isLoading: false,
        message: 'Items fetched successfully',
        pagination: action.payload.pagination,
      }));
    builder.addCase(getOrderLineItems.pending, (state) => ({ ...state, isLoading: true, message: 'Loading data' }));
    builder
      .addCase(getOrderLineItems.rejected, (state) => ({ ...state, isLoading: false, message: 'Failed to retrieve data from database' }));
    builder
      .addCase(getOrderLineItem.fulfilled, (state, action) => ({
        ...state, lineItem: action.payload, isLoading: false, message: 'Items fetched successfully',
      }));
    builder.addCase(getOrderLineItem.pending, (state) => ({ ...state, isLoading: true, message: 'Loading data' }));
    builder
      .addCase(getOrderLineItem.rejected, (state) => ({ ...state, isLoading: false, message: 'Failed to retrieve data from database' }));
    builder
      .addCase(updateOrderLineItem.fulfilled, (state, action) => ({
        ...state, lineItem: action.payload, isLoading: false, message: 'Items updated successfully',
      }));
    builder.addCase(updateOrderLineItem.pending, (state) => ({ ...state, isLoading: true, message: 'Loading data' }));
    builder
      .addCase(updateOrderLineItem.rejected, (state) => ({ ...state, isLoading: false, message: 'Failed to update database' }));
  },
});

export default OrderlineSlice.reducer;
