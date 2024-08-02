import { combineReducers } from '@reduxjs/toolkit';
import productReducer from './productListSlice'
import productByIdReducer from './productByIdSlice'
import cartReducer from './cartSlice';
import authReducer from './authSlice';
import orderReducer from './orderSlice';
import adminReducer from './adminSlice';


const rootReducer = combineReducers({
    productsList: productReducer,
    productByIdRed: productByIdReducer,
    cartRed: cartReducer,
    authRed: authReducer,
    orderRed: orderReducer,
    adminRed: adminReducer,
});

export default rootReducer;