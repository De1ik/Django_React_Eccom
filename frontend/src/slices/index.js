import { combineReducers } from '@reduxjs/toolkit';
import productReducer from './productListSlice'
import productByIdReducer from './productByIdSlice'
import cartReducer from './cartSlice';
import authReducer from './authSlice';
import orderReducer from './orderSlice';
import adminReducer from './adminSlice';
import reviewReducer from './reviewSlice';


const rootReducer = combineReducers({
    productsList: productReducer,
    productByIdRed: productByIdReducer,
    cartRed: cartReducer,
    authRed: authReducer,
    orderRed: orderReducer,
    adminRed: adminReducer,
    reviewRed: reviewReducer,
});

export default rootReducer;