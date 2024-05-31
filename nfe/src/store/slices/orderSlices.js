import { createSlice } from "@reduxjs/toolkit";
import { createOrder, getOrderDetails, getMyOrders, get_Order, getShippingAddress } from "../actions/orderActions";

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        order: {},
        orders: [],
        shippingAddress: {},
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(get_Order.pending, (state) => {
                state.loading = true;
            })
            .addCase(get_Order.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(get_Order.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getShippingAddress.pending, (state) => {
                state.loading = true;
            })
            .addCase(getShippingAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.shippingAddress = action.payload;
            })
            .addCase(getShippingAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getMyOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMyOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(getMyOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getOrderDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(getOrderDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});