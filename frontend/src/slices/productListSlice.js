import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const listProducts = createAsyncThunk(
    'products/listProducts',
    async ({path, pageUrl}, {rejectWithValue}) => {
        try{
            const {data} = await axios.get(`/api/products?${path}page=${pageUrl}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
          }
    }
);


export const getPrdTopRating = createAsyncThunk(
    'products/topRating',
    async (_, {rejectWithValue}) => {
        try{
            const {data} = await axios.get(`/api/products/top-rating`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
          }
    }
);


const productSlice = createSlice({
    name: "productList",
    initialState: {
        prdTopRating: [],
        products: [],
        loading: false,
        error: null,
        page: 1,
        pages: 1,
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
                state.products = action.payload.products;
                state.page = action.payload.page;
                state.pages = action.payload.pages;
            })
            .addCase(listProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getPrdTopRating.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPrdTopRating.fulfilled, (state, action) => {
                state.loading = false;
                state.prdTopRating = action.payload;
            })
            .addCase(getPrdTopRating.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
})


export default productSlice.reducer;

