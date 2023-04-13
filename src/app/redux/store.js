/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import counterReducer from './counterSlice';
import messageReducer from './reducers/messageSlice';
import shopReducer from './reducers/shopSlice';
import categoryReducer from './reducers/categorySlice';
import inventoryReducer from './reducers/inventorySlice';
import orderReducer from './reducers/orderSlice';
import customerReducer from './reducers/customerSlice';
import orderlineReducer from './reducers/orderlineSlice';

export const store = configureStore({
  reducer: {
    orderline: orderlineReducer,
    counter: counterReducer,
    message: messageReducer,
    auth: authReducer,
    shop: shopReducer,
    category: categoryReducer,
    inventory: inventoryReducer,
    order: orderReducer,
    customer: customerReducer,
  },
});
