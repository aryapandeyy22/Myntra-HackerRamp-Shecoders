import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productReducer from './Components/Reducer/productReducer'; // Adjust the path as per your project structure


const rootReducer = combineReducers({
 
  products: productReducer, 
 
});

const store = configureStore({
  reducer: rootReducer,

});

export default store;
