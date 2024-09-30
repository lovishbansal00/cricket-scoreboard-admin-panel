import { configureStore } from '@reduxjs/toolkit';
import matchReducer from './matchSlice';

const store = configureStore({
  reducer: {
    match: matchReducer,
  },
});

export default store;
