/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  message: '',
};

export const clearMessage = createAsyncThunk(
  'message/clear',
  async () => '',
);

export const setMessage = createAsyncThunk(
  'message/set',
  async (payload) => payload,
);

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(clearMessage.fulfilled, (state) => {
      state.message = '';
    });
    builder.addCase(setMessage.fulfilled, (state, action) => {
      state.message = action.payload;
    });
  },
});

export default messageSlice.reducer;
