import { createSlice } from '@reduxjs/toolkit'


const crtItmLclStrge = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []

const initialState = {
    cartItems: crtItmLclStrge,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload
            const existItem = state.cartItems.find(x => x.id == item.id)
            existItem ? existItem.qnty += item.qnty : state.cartItems.push(item)
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        removeFromCart: (state, action) => {
            const id = action.payload
            state.cartItems = state.cartItems.filter(x => x.id != id)
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        increaseQnty: (state, action) => {
            state.cartItems.find(x => x.id == action.payload).qnty += 1
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        decreaseQnty: (state, action) => {
            state.cartItems.find(x => x.id == action.payload).qnty -= 1
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
    }
})

export const { addToCart, removeFromCart, increaseQnty, decreaseQnty } = cartSlice.actions;
export default cartSlice.reducer;