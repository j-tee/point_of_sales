/* eslint-disable max-len */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PaymentService from '../../services/data/paymentService';

const initialState = {
  payments: [],
  payment: {},
  message: '',
  isLoading: false,
  pagination: {},
};

export const addPayment = createAsyncThunk(
  'payment/addPayment',
  async (payment, thunkAPI) => {
    try {
      const response = await PaymentService.addPayment(payment);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getPayments = createAsyncThunk(
  'payment/getPayments',
  async (params, thunkAPI) => {
    try {
      const response = await PaymentService.getPayments(params.paymentId, params.orderId, params.storeId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getPaymentDetails = createAsyncThunk(
  'payment/getPaymentDetails',
  async (params, thunkAPI) => {
    try {
      const response = await PaymentService.getPaymentDetails(params.storeId, params.stockId, params.customerId, params.employeeId, params.startDate, params.endDate, params.page, params.perPage);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  redusers: {},
  extraReducers: (builder) => {
    builder.addCase(getPaymentDetails.fulfilled, (state, action) => ({
      ...state,
      message: 'Payment information loaded',
      payments: action.payload.payments.data,
      isLoading: false,
      pagination: action.payload.pagination,
    }));
    builder.addCase(getPaymentDetails.pending, (state) => ({ ...state, message: 'Loading data', isLoading: true }));
    builder.addCase(getPaymentDetails.rejected, (state, action) => ({ ...state, message: action.payload, isLoading: false }));

    builder.addCase(addPayment.fulfilled, (state, action) => ({
      ...state, message: 'Payment successfully added', payment: action.payload, isLoading: false,
    }));
    builder.addCase(addPayment.pending, (state) => ({ ...state, message: 'Loading data', isLoading: true }));
    builder.addCase(addPayment.rejected, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
    builder.addCase(getPayments, (state, action) => ({
      ...state, payments: action.payload, message: 'Payment data loaded successfully', isLoading: false,
    }));
    builder.addCase(getPayments.pending, (state) => ({ ...state, isLoading: false, message: 'Payment data loading' }));
    builder.addCase(getPayments.rejected, (state, action) => ({ ...state, isLoading: false, message: action.payload }));
  },
});
export default paymentSlice.reducer;
