import { createAsyncThunk } from "@reduxjs/toolkit";
import { mainAxiosInstance } from "../../api/axiosInstances";

export const createOrder = createAsyncThunk(
    'orderCreate/createOrder',
    async (order, { rejectWithValue, getState }) => {
        try {
            const {
                userLogin: { userInfo },
            } = getState();
            const res = await mainAxiosInstance.post(`/order/payment/`, order, {
                headers: {
                    Authorization: `Bearer ${userInfo.access}`,
                },
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message
            );
        }
    }
);

export const getOrderDetails = createAsyncThunk(
    'orderDetails/getOrderDetails',
    async (id, { rejectWithValue, getState }) => {
        try {
            const {
                userLogin: { userInfo },
            } = getState();
            const res = await mainAxiosInstance.get(`/order/detail/${id}`, {
                headers: {
                    Authorization: `Bearer ${userInfo.access}`,
                },
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message
            );
        }
    }

);

export const getMyOrders = createAsyncThunk(
    'myOrderList/getMyOrders',
    async (_, { rejectWithValue, getState }) => {
        try {
            const {
                userLogin: { userInfo },
            } = getState();
            const res = await mainAxiosInstance.get(`/order/myorderlist/`, {
                headers: {
                    Authorization: `Bearer ${userInfo.access}`,
                },
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message
            );
        }
    }
);

export const getShippingAddress = createAsyncThunk(
    'shippingAddress/getShippingAddress',
    async (orderId, { rejectWithValue }) => {
        try {
            const res = await mainAxiosInstance.get(`/order/address/${orderId}`);
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message
            );
        }
    }
);

export const get_Order = createAsyncThunk(
    'order/getOrder',
    async (orderId, { rejectWithValue }) => {
        try {
            const res = await mainAxiosInstance.get(`/order/${orderId}`);
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message
            );
        }
    }
);
