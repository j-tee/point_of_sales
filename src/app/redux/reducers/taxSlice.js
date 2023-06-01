/* eslint-disable camelcase */
/* eslint-disable max-len */
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

export const getTaxList = createAsyncThunk(
  'tax/getTaxList',
  async (storeId, thunkAPI) => {
    try {
      const response = await TaxService.getTaxList(storeId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const addTax = createAsyncThunk(
  'tax/addTax',
  async (tax, thunkAPI) => {
    try {
      const response = await TaxService.addTax(tax);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const addProductTax = createAsyncThunk(
  'tax/addProductTax',
  async (product_tax, thunkAPI) => {
    try {
      const response = await TaxService.addProductTax(product_tax);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const applyTax = createAsyncThunk(
  'tax/applyTax',
  async (taxId, thunkAPI) => {
    try {
      const response = await TaxService.applyTax(taxId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const applyTaxToSpecificProducts = createAsyncThunk(
  'tax/applyTaxToSpecificProducts',
  async (dataObj, thunkAPI) => {
    try {
      const response = await TaxService.applyTaxToSpecificProducts(dataObj.taxId, dataObj.products);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getTaxedProducts = createAsyncThunk(
  'tax/getTaxedProducts',
  async (params, thunkAPI) => {
    try {
      const response = await TaxService.getTaxedProducts(params.storeId, params.taxId, params.page, params.perPage);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getProductWithoutTaxes = createAsyncThunk(
  'tax/getProductWithoutTaxes',
  async (params, thunkAPI) => {
    try {
      const response = await TaxService.getProductWithoutTaxes(params.storeId, params.taxId, params.page, params.perPage);
      return response.data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getTaxesOnAProduct = createAsyncThunk(
  'tax/getTaxesOnAProduct',
  async (productId, thunkAPI) => {
    try {
      const response = await TaxService.getTaxesOnAProduct(productId);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteProductTax = createAsyncThunk(
  'tax/deleteProductTax',
  async (product_tax, thunkAPI) => {
    try {
      const response = await TaxService.deleteProductTax(product_tax);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  taxes: [],
  taxesOnProduct: [],
  products: [],
  pagination: {},
  taxProduct: {},
  tax: {},
  message: {},
  isLoading: '',
};
export const taxSlice = createSlice({
  name: 'tax',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteProductTax.fulfilled, (state, action) => ({
      ...state, isLoading: false, message: action.payload,
    }));
    builder.addCase(deleteProductTax.pending, (state, action) => ({
      ...state, message: action.payload, isLoading: true,
    }));
    builder.addCase(deleteProductTax.rejected, (state) => ({
      ...state, message: 'Failed to load data', isLoading: false,
    }));
    builder.addCase(addProductTax.fulfilled, (state, action) => ({
      ...state, taxProduct: action.payload, isLoading: false, message: 'Data loaded successfully',
    }));
    builder.addCase(addProductTax.pending, (state, action) => ({
      ...state, message: action.payload, isLoading: true,
    }));
    builder.addCase(addProductTax.rejected, (state) => ({
      ...state, message: 'Failed to load data', isLoading: false,
    }));
    builder.addCase(getTaxesOnAProduct.fulfilled, (state, action) => ({
      ...state, taxesOnProduct: action.payload, isLoading: false, message: 'Data loaded successfully',
    }));
    builder.addCase(getTaxesOnAProduct.pending, (state, action) => ({
      ...state, message: action.payload, isLoading: true,
    }));
    builder.addCase(getTaxesOnAProduct.rejected, (state) => ({
      ...state, message: 'Failed to load data', isLoading: false,
    }));
    builder.addCase(getProductWithoutTaxes.fulfilled, (state, action) => ({
      ...state, products: action.payload.products, pagination: action.payload.pagination, isLoading: false, message: 'Data loaded successfully',
    }));
    builder.addCase(getProductWithoutTaxes.pending, (state, action) => ({
      ...state, message: action.payload, isLoading: true,
    }));
    builder.addCase(getProductWithoutTaxes.rejected, (state) => ({
      ...state, message: 'Failed to load data', isLoading: false,
    }));
    builder.addCase(getTaxedProducts.fulfilled, (state, action) => ({
      ...state, products: action.payload.products, pagination: action.payload.pagination, isLoading: false, message: 'Data loaded successfully',
    }));
    builder.addCase(getTaxedProducts.pending, (state, action) => ({
      ...state, message: action.payload, isLoading: true,
    }));
    builder.addCase(getTaxedProducts.rejected, (state) => ({
      ...state, message: 'Failed to load data', isLoading: false,
    }));
    builder.addCase(applyTaxToSpecificProducts.fulfilled, (state, action) => ({
      ...state, tax: action.payload, isLoading: false, message: 'New tax applied',
    }));
    builder.addCase(applyTaxToSpecificProducts.pending, (state, action) => ({
      ...state, message: action.payload, isLoading: true,
    }));
    builder.addCase(applyTaxToSpecificProducts.rejected, (state) => ({
      ...state, message: 'Failed to apply new tax', isLoading: false,
    }));
    builder.addCase(applyTax.fulfilled, (state) => ({
      ...state, isLoading: false, message: 'New tax applied',
    }));
    builder.addCase(applyTax.pending, (state, action) => ({
      ...state, message: action.payload, isLoading: true,
    }));
    builder.addCase(applyTax.rejected, (state) => ({
      ...state, message: 'Failed to apply new tax', isLoading: false,
    }));
    builder.addCase(addTax.fulfilled, (state, action) => ({
      ...state, tax: action.payload, isLoading: false, message: 'New tax added',
    }));
    builder.addCase(addTax.pending, (state, action) => ({
      ...state, message: action.payload, isLoading: true,
    }));
    builder.addCase(addTax.rejected, (state) => ({
      ...state, message: 'Failed to add new tax to database', isLoading: false,
    }));
    builder.addCase(getTaxList.fulfilled, (state, action) => ({
      ...state, taxes: action.payload, isLoading: false, message: 'Taxes loaded',
    }));
    builder.addCase(getTaxList.pending, (state, action) => ({
      ...state, message: action.payload, isLoading: true,
    }));
    builder.addCase(getTaxList.rejected, (state) => ({
      ...state, message: 'Failed to load taxes from the database', isLoading: false,
    }));
    builder.addCase(getTaxes.fulfilled, (state, action) => ({
      ...state, taxes: action.payload, isLoading: false, message: 'Taxes loaded',
    }));
    builder.addCase(getTaxes.pending, (state, action) => ({
      ...state, message: action.payload, isLoading: true,
    }));
    builder.addCase(getTaxes.rejected, (state) => ({
      ...state, message: 'Failed to load taxes from the database', isLoading: false,
    }));
  },

});

export default taxSlice.reducer;
