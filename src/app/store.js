import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';
import clientsReducer from '../features/companies/clientsSlice';
import userReducer from '../features/profile/profileSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    clients: clientsReducer,
    user: userReducer
  },
});
