import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authApi from "../../api/auth";

const TYPES = {
    LOGIN: "auth/login",
    REGISTER: "auth/register"
}

const initialState = {
  authToken: "",
  status: 'idle',
};

export const login = createAsyncThunk(
    TYPES.LOGIN,
  async (data) => {
    const response = await authApi.login(data)
    localStorage.setItem("token", response.data.accessToken)
    return response.data;
  }
);


export const registerRequest = createAsyncThunk(
    TYPES.REGISTER,
  async (data) => {
    const response = await authApi.register(data)
    localStorage.setItem("token", response.data.accessToken)
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
      updateAuthToken: (state, action) => {
          state.authToken = action.payload;
      },
  },
});

export const {updateAuthToken} = authSlice.actions;

export const selectAuthToken = (state) => state.auth.authToken;

export const setAuthToken = (token) => (dispatch) => {
    dispatch(updateAuthToken(token));
};

export const loginThunk = (data) => (dispatch) => {
    dispatch(login(data)).then(result => {
        dispatch(updateAuthToken(result.payload.accessToken))
    });
};

export const registerThunk = (data) => (dispatch) => {
    dispatch(registerRequest(data)).then(result => {
        dispatch(updateAuthToken(result.payload.accessToken))
    });
};

export default authSlice.reducer;
