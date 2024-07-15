import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer';
import crowdProfileReducer from '../features/crowdProfileSlice';
import userReducer from '../features/userSlice';
import postReducer from '../features/postSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    crowdProfile: crowdProfileReducer,
    user: userReducer,
    posts: postReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}


export default store;
