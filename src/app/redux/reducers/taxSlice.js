import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import TaxService from '../../services/data/taxService';

export const getTaxes = createAsyncThunk(
  'tax/getTaxes',
  async (orderId, thunkAPI) => {
    try {
      const response = await TaxService.getTaxes(orderId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  taxes: [],
  tax: {},
  message: {},
  isLoading: '',
};
export const taxSlice = createSlice({
  name: 'tax',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTaxes.fulfilled, (state, action) => ({
      ...state, taxes: action.payload, isLoading: false, message: 'Taxes loaded',
    }));
    builder.addCase(getTaxes.pending, (state, action) => ({
      ...state, message: action.payload, isLoading: true,
    }));
    builder.addCase(getTaxes.rejected, (state, action) => ({
      ...state, message: action.payload, isLoading: false,
    }));
  },

});

export default taxSlice.reducer;
