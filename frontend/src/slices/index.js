import { combineReducers } from '@reduxjs/toolkit';
import productReducer from './productListSlice'

const rootReducer = combineReducers({
    productsList: productReducer,
});

export default rootReducer;