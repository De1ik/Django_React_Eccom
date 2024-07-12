import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'



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

const allOrdersStorage = localStorage.getItem("allOrders") ? JSON.parse(localStorage.getItem("allOrders")) : []


const initialState = {
    loading: false,
    error: null,
    allOrders: allOrdersStorage,
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
            state.allOrders.push(action.payload)
            localStorage.setItem("allOrders", JSON.stringify(state.allOrders))
        })
        .addCase(createOrder.rejected, (state, action) => {
            state.loading = false,
            state.error = action.payload
        })
    }    
})

export default orderSlice.reducer;