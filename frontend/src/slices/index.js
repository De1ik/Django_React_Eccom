import { combineReducers } from '@reduxjs/toolkit';
import productReducer from './productListSlice'
import productByIdReducer from './productByIdSlice'
import cartReducer from './cartSlice';

const rootReducer = combineReducers({
    productsList: productReducer,
    productByIdRed: productByIdReducer,
    cartRed: cartReducer,
});

export default rootReducer;