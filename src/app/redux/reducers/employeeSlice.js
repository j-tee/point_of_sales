/* eslint-disable max-len */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import EmployeeService from '../../services/data/employeeService';

const initialState = {
  employees: [],
  message: '',
  isLoading: false,
};

export const getEmployees = createAsyncThunk(
  'employee/getEmployees',
  async (id, thunkAPI) => {
    try {
      const response = await EmployeeService.getEmployees(id);
      console.log('employees from slice ====>', response.data.employees.data);
      return response.data.employees.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const addEmployee = createAsyncThunk(
  'employee/addEmployee',
  async (employee, thunkAPI) => {
    try {
      const response = await EmployeeService.addEmployee(employee);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateEmployee = createAsyncThunk(
  'employee/updateEmployee',
  async (shopId, thunkAPI) => {
    try {
      const response = await EmployeeService.updateEmployee(shopId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteEmployee = createAsyncThunk(
  'employee/deleteEmployee',
  async (id, thunkAPI) => {
    try {
      const response = await EmployeeService.deleteEmployee(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployees.fulfilled, (state, action) => ({
        ...state, isLoading: false, employees: action.payload, message: 'Employees details successfully loaded',
      }));
    builder
      .addCase(getEmployees.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getEmployees.rejected, (state, action) => ({ ...state, isLoading: false, message: action.payload }));
    builder
      .addCase(addEmployee.fulfilled, (state, action) => ({
        ...state, isLoading: false, shop: action.payload, message: 'Employee added successfully!!!',
      }));
    builder
      .addCase(addEmployee.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(addEmployee.rejected, (state, action) => ({ ...state, isLoading: false, message: action.payload }));
    builder
      .addCase(updateEmployee.fulfilled, (state, action) => ({ ...state, isLoading: false, message: action.payload }));
    builder
      .addCase(updateEmployee.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(updateEmployee.rejected, (state, action) => ({ ...state, isLoading: false, message: action.payload }));
    builder
      .addCase(deleteEmployee.fulfilled, (state, action) => ({ ...state, isLoading: false, message: action.payload }));
    builder
      .addCase(deleteEmployee.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(deleteEmployee.rejected, (state, action) => ({ ...state, isLoading: false, message: action.payload }));
  },
});

export default employeeSlice.reducer;
