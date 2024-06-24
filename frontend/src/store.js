import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './slices'

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production', 
  });

window.store = store;

export default store;