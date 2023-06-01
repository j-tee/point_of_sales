/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService from '../../services/auth/authService';

// const user = JSON.parse(localStorage.getItem('user'));

// const initialState = user
//   ? {
//     isLoggedIn: true, isSuccessful: true, user, message: 'User already registered',
//   }
//   : {
//     isLoggedIn: false, isSuccessful: false, user: null, message: '',
//   };

const initialState = {
  isLoggedIn: false,
  isSuccessful: false,
  user: null,
  message: '',
};

export const resetMessage = createAsyncThunk(
  'auth/resetMessage',
  async (_, thunkAPI) => {
    try {
      const response = await AuthService.resetMessage();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, thunkAPI) => {
    try {
      // API call to register user
      const response = await AuthService.getCurrentUser();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, thunkAPI) => {
    try {
      // API call to register user
      const response = await AuthService.register(userData.username, userData.email, userData.password, userData.password_confirmation);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      const response = await AuthService.logout();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, thunkAPI) => {
    try {
      const response = await AuthService.login(userData.email, userData.password);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const requestPasswordReset = createAsyncThunk(
  'auth/requestPasswordReset',
  async (email, thunkAPI) => {
    try {
      const response = await AuthService.requestPasswordReset(email);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (pwd, thunkAPI) => {
    try {
      const response = await AuthService.resetPassword(pwd);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getUserByEmail = createAsyncThunk(
  'auth/getUserByEmail',
  async (email, thunkAPI) => {
    try {
      const response = await AuthService.getUserByEmail(email);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserByEmail.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isSuccessful = true;
      })
      .addCase(getUserByEmail.rejected, (state, action) => {
        state.message = action.payload;
        state.isSuccessful = false;
      })
      .addCase(getUserByEmail.pending, (state, action) => {
        state.message = action.payload;
        state.isSuccessful = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.isSuccessful = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.message = action.payload;
        state.isSuccessful = false;
      })
      .addCase(resetPassword.pending, (state, action) => {
        state.message = action.payload;
        state.isSuccessful = false;
      })
      .addCase(requestPasswordReset.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.isSuccessful = true;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.message = action.payload;
        state.isSuccessful = false;
      })
      .addCase(requestPasswordReset.pending, (state, action) => {
        state.message = action.payload;
        state.isSuccessful = false;
      })
      .addCase(resetMessage.fulfilled, (state) => {
        state.message = undefined;
        state.isSuccessful = true;
      })
      .addCase(resetMessage.rejected, (state) => {
        state.message = undefined;
        state.isSuccessful = false;
      })
      .addCase(resetMessage.pending, (state) => {
        state.message = undefined;
        state.isSuccessful = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
        state.message = action.message;
        state.isSuccessful = true;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoggedIn = true;
        state.message = 'User logged out Failure!!';
        state.isSuccessful = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoggedIn = true;
        state.message = 'User log out pending!!';
        state.isSuccessful = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.message = 'User successfully registered!!';
        state.isSuccessful = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.message = 'Registration failed!!';
        state.isSuccessful = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.message = 'User logged In Successfully!!';
        state.isSuccessful = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.message = 'User log in failure!!';
        state.isSuccessful = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.message = 'User log in pending';
        state.isSuccessful = false;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.message = 'User Profile Retrieved Successfully';
        state.isSuccessful = true;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.message = 'User Profile Retrieval failed';
        state.isSuccessful = false;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.message = 'User Profile Retrieval pending';
        state.isSuccessful = false;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
