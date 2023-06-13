/* eslint-disable max-len */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SubscriptionService from '../../services/data/subscriptionService';

const initialState = {
  subscriptions: [],
  apiUser: {},
  apiKey: {},
  message: '',
  token: {},
  rates: [],
  pagination: {},
  isLoading: false,
  subscription: {},
  status: '',
};

export const addAPIUser = createAsyncThunk(
  'momo/addAPIUser',
  async (params, thunkAPI) => {
    try {
      const response = await SubscriptionService.addAPIUser(params.header, params.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getAPIUser = createAsyncThunk(
  'momo/getAPIUser',
  async (params, thunkAPI) => {
    try {
      const response = await SubscriptionService.getAPIUser(params.refId, params.headers);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getAPIKey = createAsyncThunk(
  'momo/getAPIKey',
  async (params, thunkAPI) => {
    try {
      const response = await SubscriptionService.getAPIKey(params.refId, params.header);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getToken = createAsyncThunk(
  'momo/getToken',
  async (params, thunkAPI) => {
    try {
      const response = await SubscriptionService.getToken(params.refId, params.header);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getSubscriptions = createAsyncThunk(
  'momo/getSubscriptions',
  async (params, thunkAPI) => {
    try {
      const response = await SubscriptionService.getSubscriptions(params.id, params.page, params.perPage);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const addSubscription = createAsyncThunk(
  'momo/addSubscription',
  async (subscription, thunkAPI) => {
    try {
      const response = await SubscriptionService.addSubscription(JSON.stringify(subscription));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
export const getRates = createAsyncThunk(
  'momo/getRates',
  async (_, thunkAPI) => {
    try {
      const response = await SubscriptionService.getRates();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
export const subscriptionSlice = createSlice({
  name: 'momo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSubscription.fulfilled, (state, action) => ({
        ...state,
        subscription: action.payload,
        isLoading: false,
        status: 'ok',
      }));
    builder
      .addCase(addSubscription.rejected, (state) => ({
        ...state,
        message: 'Failed to load rates information',
        isLoading: false,
        status: 'rejected',
      }));
    builder
      .addCase(addSubscription.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getRates.fulfilled, (state, action) => ({
        ...state,
        rates: action.payload,
        isLoading: false,
      }));
    builder
      .addCase(getRates.rejected, (state) => ({
        ...state,
        message: 'Failed to load rates information',
        isLoading: false,
      }));
    builder
      .addCase(getRates.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getSubscriptions.fulfilled, (state, action) => ({
        ...state,
        subscriptions: action.payload.subscriptions.data,
        pagination: action.payload.pagination,
        isLoading: false,
      }));
    builder
      .addCase(getSubscriptions.rejected, (state) => ({
        ...state,
        message: 'Failed to load subscription information',
        isLoading: false,
      }));
    builder
      .addCase(getSubscriptions.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getToken.fulfilled, (state, action) => ({
        ...state,
        token: action.payload,
        isLoading: false,
      }));
    builder
      .addCase(getToken.rejected, (state) => ({
        ...state,
        message: 'Failed to load token information',
        isLoading: false,
      }));
    builder
      .addCase(getToken.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getAPIKey.fulfilled, (state, action) => ({
        ...state,
        apiKey: action.payload,
        isLoading: false,
      }));
    builder
      .addCase(getAPIKey.rejected, (state) => ({
        ...state,
        message: 'Failed to load api key information',
        isLoading: false,
      }));
    builder
      .addCase(getAPIKey.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(addAPIUser.fulfilled, (state, action) => ({
        ...state,
        message: action.payload,
        isLoading: false,
      }));
    builder
      .addCase(addAPIUser.rejected, (state) => ({
        ...state,
        message: 'Failed to load customer information',
        isLoading: false,
      }));
    builder
      .addCase(addAPIUser.pending, (state) => ({ ...state, isLoading: true }));
  },
});

export default subscriptionSlice.reducer;
