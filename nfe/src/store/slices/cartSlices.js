import { createSlice } from "@reduxjs/toolkit";
import {
  listCartItems,
  addToCart,
  removeFromCart,
  updateQty,
  saveShippingAddress,
} from "../actions/cartActions";


export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        shippingAddress: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(listCartItems.pending, (state) => {
            state.loading = true;
        })
        .addCase(listCartItems.fulfilled, (state, action) => {
            state.loading = false;
            state.cartItems = action.payload;
        })
        .addCase(listCartItems.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            state.cartItems = action.payload;
        })
        .addCase(removeFromCart.fulfilled, (state, action) => {
            state.cartItems = action.payload;
        })
        .addCase(updateQty.fulfilled, (state, action) => {
            state.cartItems = action.payload;
        })
        .addCase(saveShippingAddress.fulfilled, (state, action) => {
            state.shippingAddress = action.payload;
        });
    },
    });

