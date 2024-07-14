import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const allOrdersStorage = localStorage.getItem("allOrders") ? JSON.parse(localStorage.getItem("allOrders")) : []

export const createOrder = createAsyncThunk(
    "user/orders",
    async ({orderData, shippingData, orderItemsData, token}, { rejectWithValue }) => {
        try{
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }

            const { data } = await axios.post(
                "/api/order/create-order",
                { 
                    orderData, 
                    shippingData, 
                    orderItemsData 
                },
                config
            )
            return data;
        
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

export const getAllOrder = createAsyncThunk(
    "user/get-all-orders",
    async (token, { rejectWithValue }) => {
        try{

            const config = {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }

            const { data } = await axios.get(
                "/api/order/all-orders",
                config
            )
            return data;
        
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

export const getOrderById = createAsyncThunk(
    "user/get-order-id",
    async ({id, token}, { rejectWithValue }) => {
        try{

            const config = {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }

            const { data } = await axios.get(
                `/api/order/get-order-${id}`,
            )
            config
            return data;
        
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)


const initialState = {
    loading: false,
    error: null,
    allOrders: allOrdersStorage,
    orderById: null
}

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createOrder.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(createOrder.fulfilled, (state, action) => {
            state.loading = false
            // state.allOrders.push(action.payload)
            // localStorage.setItem("allOrders", JSON.stringify(state.allOrders))
        })
        .addCase(createOrder.rejected, (state, action) => {
            state.loading = false,
            state.error = action.payload
        })




        .addCase(getAllOrder.pending, (state) => {
            state.loading = true
            state.error = null

        })
        .addCase(getAllOrder.fulfilled, (state, action) => {
            state.loading = false
            state.allOrders = action.payload
            localStorage.setItem("allOrders", JSON.stringify(action.payload))
        })
        .addCase(getAllOrder.rejected, (state, action) => {
            state.loading = false,
            state.error = action.payload
        })





        .addCase(getOrderById.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(getOrderById.fulfilled, (state, action) => {
            state.loading = false
            state.orderById = action.payload
        })
        .addCase(getOrderById.rejected, (state, action) => {
            state.loading = false,
            state.error = action.payload
        })
    }    
})

export default orderSlice.reducer;