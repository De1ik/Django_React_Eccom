import { combineReducers } from '@reduxjs/toolkit';
import productReducer from './productListSlice'
import productByIdReducer from './productByIdSlice'
import cartReducer from './cartSlice';
import authReducer from './authSlice';


const rootReducer = combineReducers({
    productsList: productReducer,
    productByIdRed: productByIdReducer,
    cartRed: cartReducer,
    authRed: authReducer,
});

export default rootReducer;