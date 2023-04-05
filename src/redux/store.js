/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import counterReducer from './counterSlice';
import messageReducer from './reducers/messageSlice';
import shopReducer from './reducers/shopSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    message: messageReducer,
    auth: authReducer,
    shop: shopReducer,
  },
});
