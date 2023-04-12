/* eslint-disable max-len */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CustomerService from '../../services/data/customerService';

const initialState = {
  customrs: [],
  customer: {},
  message: String,
  isLoading: false,
};

export const deleteCustomer = createAsyncThunk(
  'customer/deleteCustomer',
  async (customerId, thunkAPI) => {
    try {
      const response = await CustomerService.deleteCustomer(customerId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const addCustomer = createAsyncThunk(
  'customer/addCustomer',
  async (customer, thunkAPI) => {
    try {
      const response = await CustomerService.addCustomer(customer);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateCustomer = createAsyncThunk(
  'customer/updateCustomer',
  async (customer, thunkAPI) => {
    try {
      const response = await CustomerService.updateCustomer(customer);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getCustomers = createAsyncThunk(
  'customer/getCustomers',
  async (storeId, thunkAPI) => {
    try {
      const response = await CustomerService.getCustomers(storeId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getCustomer = createAsyncThunk(
  'customer/getCustomer',
  async (customerId, thunkAPI) => {
    try {
      const response = await CustomerService.getCustomer(customerId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const resetCustomer = createAsyncThunk(
  'customer/resetCustomer',
  async (_, thunkAPI) => {
    try {
      const response = await CustomerService.resetCustomer();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetCustomer.fulfilled, (state, action) => ({
        ...state, customer: action.payload, message: 'Customer information successfully reset', isLoading: false,
      }));
    builder
      .addCase(getCustomer.fulfilled, (state, action) => ({
        ...state, customer: action.payload, message: 'Customer information successfully loaded', isLoading: false,
      }));
    builder
      .addCase(getCustomer.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getCustomer.rejected, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
    builder
      .addCase(getCustomers.fulfilled, (state, action) => ({
        ...state, customers: action.payload, message: 'Customer information successfully loaded', isLoading: false,
      }));
    builder
      .addCase(getCustomers.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getCustomers.rejected, (state, action) => ({ ...state, message: action.payload, isLoading: false }));

    builder
      .addCase(addCustomer.fulfilled, (state, action) => ({
        ...state, customer: action.payload, message: 'Customer information successfully added', isLoading: false,
      }));
    builder
      .addCase(addCustomer.pending, (state) => ({ ...state, isLoading: true, message: '' }));
    builder
      .addCase(addCustomer.rejected, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
    builder
      .addCase(updateCustomer.fulfilled, (state, action) => ({
        ...state, customer: action.payload, message: 'Customer information successfully updated', isLoading: false,
      }));
    builder
      .addCase(updateCustomer.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(updateCustomer.rejected, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
    builder
      .addCase(deleteCustomer.fulfilled, (state, action) => ({
        ...state, message: action.payload, isLoading: false,
      }));
    builder
      .addCase(deleteCustomer.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(deleteCustomer.rejected, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
  },
});

export default customerSlice.reducer;
