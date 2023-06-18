import { configureStore } from '@reduxjs/toolkit';
import  horsesReducer from '../features/horses/horsesSlice';
import navbarReducer from '../components/navbar/navbarSlice'
export const store = configureStore({
  reducer: {   
    horses: horsesReducer,
    navbar:navbarReducer
  },
});
