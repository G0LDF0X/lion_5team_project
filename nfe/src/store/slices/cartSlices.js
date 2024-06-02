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
        loading: false,
        error: null,
        successAdd: false,
        successCartRemove: false,
    },
    reducers: {resetSuccess: (state) => {
        state.successAdd = false;
        state.successCartRemove = false;
    }
    },
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
            state.successAdd = true;
        })
        .addCase(removeFromCart.fulfilled, (state, action) => {
            state.cartItems = action.payload;
            state.successCartRemove = true;
        })
        .addCase(addToCart.pending, (state) => {
            state.loading = true;
        })
        .addCase(removeFromCart.pending, (state) => {
            state.loading = true;
        })
        .addCase(addToCart.rejected, (state, action) => {
            state.error = action.payload;
        })
        .addCase(removeFromCart.rejected, (state, action) => {
            state.error = action.payload;
        })
        .addCase(updateQty.fulfilled, (state, action) => {
            state.cartItems = action.payload;

        })
        .addCase(saveShippingAddress.fulfilled, (state, action) => {
            state.shippingAddress = action.payload;
        });
    },
    });
export const { resetSuccess } = cartSlice.actions;