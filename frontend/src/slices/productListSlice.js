import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const listProducts = createAsyncThunk(
    'products/listProducts',
    async (_, {rejectWithValue}) => {
        try{
            const {data} = await axios.get('/api/products');
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
          }
    }
);


const productSlice = createSlice({
    name: "productList",
    initialState: {
        products: [],
        loading: false,
        error: null
    },
    reducers:{
    
    },
    extraReducers: (builder) => {
        builder
            .addCase(listProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(listProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(listProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
})


export default productSlice.reducer;

