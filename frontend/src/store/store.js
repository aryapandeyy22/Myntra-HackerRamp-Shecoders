import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}


export default store;
