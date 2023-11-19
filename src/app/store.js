import { configureStore } from '@reduxjs/toolkit';
import  horsesReducer from '../features/horses/horsesSlice';
import navbarReducer from '../components/navbar/navbarSlice'
import userReducer from '../features/user/userSlice'
import { api } from '../features/horses/apiSlice';
export const store = configureStore({
  reducer: {   
    horses: horsesReducer,
    navbar:navbarReducer,
    user:userReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
