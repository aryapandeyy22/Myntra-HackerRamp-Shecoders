import { combineReducers } from 'redux';
import productReducer from './productReducer';

const rootReducer = combineReducers({
    products: productReducer
    // Add more reducers if needed
});

export default rootReducer;
