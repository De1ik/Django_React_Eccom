import { combineReducers } from '@reduxjs/toolkit';
import productReducer from './productListSlice'
import productByIdReducer from './productByIdSlice'
import cartReducer from './cartSlice';
import authReducer from './authSlice';
import orderReducer from './orderSlice';


const rootReducer = combineReducers({
    productsList: productReducer,
    productByIdRed: productByIdReducer,
    cartRed: cartReducer,
    authRed: authReducer,
    orderRed: orderReducer,
});

export default rootReducer;