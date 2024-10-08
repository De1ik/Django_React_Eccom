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
    async ({pageUrl, token, searchKeyword}, { rejectWithValue }) => {
        try{

            const config = {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }

            const { data } = await axios.get(
                `/api/order/all-orders?${searchKeyword}page=${pageUrl}`,
                config
            )
            return data;
        
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)


export const getLatestOrders = createAsyncThunk(
    "user/latest_orders",
    async (token, { rejectWithValue }) => {
        try{

            const config = {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }

            const { data } = await axios.get(
                `/api/order/latest-orders`,
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
                config
            )
            return data;
        
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

export const markDeliveredById = createAsyncThunk(
    "user/mark-delivered-id",
    async ({id, token}, { rejectWithValue }) => {
        try{

            const config = {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }

            const { data } = await axios.get(
                `/api/admin/order-mark-delivered/${id}`,
                config
            )
            return data;
        
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

export const markPaidById = createAsyncThunk(
    "user/mark-paid-id",
    async ({id, token}, { rejectWithValue }) => {
        try{

            const config = {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }

            const { data } = await axios.get(
                `/api/admin/order-paid-delivered/${id}`,
                config
            )
            return data;
        
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)


const initialState = {
    loading: false,
    error: null,
    allOrders: [],
    orderById: {},
    orderItems: [],
    orderShipping: {},
    latestOrders: [],
    page: 1,
    pages: 1,
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
            state.allOrders = action.payload.orders
            state.page = action.payload.page;
            state.pages = action.payload.pages;
            localStorage.setItem("allOrders", JSON.stringify(action.payload))
        })
        .addCase(getAllOrder.rejected, (state, action) => {
            state.loading = false,
            state.error = action.payload
        })



        .addCase(getLatestOrders.pending, (state) => {
            state.loading = true
            state.error = null

        })
        .addCase(getLatestOrders.fulfilled, (state, action) => {
            state.error = null
            state.loading = false
            state.latestOrders = action.payload;
        })
        .addCase(getLatestOrders.rejected, (state, action) => {
            state.loading = false,
            state.error = action.payload
        })





        .addCase(getOrderById.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(getOrderById.fulfilled, (state, action) => {
            state.loading = false
            state.orderById = action.payload.order
            state.orderItems = action.payload.orderItems
            state.orderShipping = action.payload.orderShipping
        })
        .addCase(getOrderById.rejected, (state, action) => {
            state.loading = false,
            state.error = action.payload
        })


        .addCase(markDeliveredById.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(markDeliveredById.fulfilled, (state, action) => {
            state.loading = false
            state.orderById = action.payload.order
            state.orderItems = action.payload.orderItems
            state.orderShipping = action.payload.orderShipping
        })
        .addCase(markDeliveredById.rejected, (state, action) => {
            state.loading = false,
            state.error = action.payload
        })


        .addCase(markPaidById.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(markPaidById.fulfilled, (state, action) => {
            state.loading = false
            state.orderById = action.payload.order
            state.orderItems = action.payload.orderItems
            state.orderShipping = action.payload.orderShipping
        })
        .addCase(markPaidById.rejected, (state, action) => {
            state.loading = false,
            state.error = action.payload
        })
    }    
})

export default orderSlice.reducer;