/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import InventoryService from '../../services/data/inventoryService';

const initialState = {
  notifications: [],
  stocks: [],
  stock: {},
  products: [],
  product: {},
  message: '',
  isLoading: false,
  countries: [],
  names: [],
  manufacturers: [],
  pagination: { totalItems: 0, currentPage: 0, perPage: 0 },
};

export const getStocks = createAsyncThunk(
  'inventory/getStocks',
  async (storeId, thunkAPI) => {
    try {
      const response = await InventoryService.getStocks(storeId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getUniqueListOfCountries = createAsyncThunk(
  'inventory/getUniqueListOfCountries',
  async (stockId, thunkAPI) => {
    try {
      const response = await InventoryService.getUniqueListOfCountries(stockId);
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

export const addStock = createAsyncThunk(
  'inventory/addStock',
  async (stock, thunkAPI) => {
    try {
      const response = InventoryService.addStock(stock);
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
      const response = await InventoryService.getProducts(param.storeId, param.stockId, param.categoryId, param.page, param.perPage, param.productName, param.country, param.manufacturer, param.expdate);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getStock = createAsyncThunk(
  'inventory/getStock',
  async (id, thunkAPI) => {
    try {
      const response = await InventoryService.getStock(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getProduct = createAsyncThunk(
  'inventory/getProduct',
  async (id, thunkAPI) => {
    try {
      const response = await InventoryService.getProduct(id);
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
      const response = await InventoryService.getUniqueProducts(params.stockId, params.categoryId, params.country);
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
      const response = await InventoryService.getUniqueManufacturers(params.stockId, params.categoryId, params.country, params.productName);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getUniqueProductNamesByStock = createAsyncThunk(
  'inventory/getUniqueProductNamesByStock',
  async (stockId, thunkAPI) => {
    try {
      const response = await InventoryService.getUniqueProductNamesByStock(stockId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getProductWitoutASpecificTax = createAsyncThunk(
  'inventory/getProductWitoutASpecificTax',
  async (taxId, thunkAPI) => {
    try {
      const response = await InventoryService.getProductWitoutASpecificTax(taxId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const addNotification = createAsyncThunk(
  'inventory/addNotification',
  async (notification, thunkAPI) => {
    try {
      const response = await InventoryService.addNotification({ notification });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getNotifications = createAsyncThunk(
  'inventory/getNotifications',
  async (storeId, thunkAPI) => {
    try {
      const response = await InventoryService.getNotifications(storeId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteNotification = createAsyncThunk(
  'inventory/deleteNotification',
  async (id, thunkAPI) => {
    try {
      const response = await InventoryService.deleteNotification(id);
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
      .addCase(deleteNotification.fulfilled, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
    builder
      .addCase(deleteNotification.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(deleteNotification.rejected, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
    builder
      .addCase(getNotifications.fulfilled, (state, action) => ({ ...state, notifications: action.payload, isLoading: false }));
    builder
      .addCase(getNotifications.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getNotifications.rejected, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
    builder
      .addCase(addNotification.fulfilled, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
    builder
      .addCase(addNotification.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(addNotification.rejected, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
    builder
      .addCase(getProductWitoutASpecificTax.fulfilled, (state, action) => ({ ...state, products: action.payload, isLoading: false }));
    builder
      .addCase(getProductWitoutASpecificTax.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getProductWitoutASpecificTax.rejected, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
    builder
      .addCase(getUniqueProductNamesByStock.fulfilled, (state, action) => ({ ...state, names: action.payload, isLoading: false }));
    builder
      .addCase(getUniqueProductNamesByStock.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getUniqueProductNamesByStock.rejected, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
    builder
      .addCase(getStock.fulfilled, (state, action) => ({ ...state, stock: action.payload, isLoading: false }));
    builder
      .addCase(getStock.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getStock.rejected, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
    builder
      .addCase(getProduct.fulfilled, (state, action) => ({ ...state, product: action.payload, isLoading: false }));
    builder
      .addCase(getProduct.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getProduct.rejected, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
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
      .addCase(getProducts.fulfilled, (state, action) => ({
        ...state,
        products: action.payload.products.data,
        isLoading: false,
        pagination: {
          totalItems: action.payload.pagination.total_items,
          perPage: action.payload.pagination.per_page,
          currentPage: action.payload.pagination.current_page,
        },
      }));
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
    builder
      .addCase(addStock.fulfilled, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
    builder
      .addCase(addStock.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(addStock.rejected, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
    builder
      .addCase(getStocks.fulfilled, (state, action) => ({ ...state, stocks: action.payload, isLoading: false }));
    builder
      .addCase(getStocks.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getStocks.rejected, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
  },
});

export default inventorySlice.reducer;
