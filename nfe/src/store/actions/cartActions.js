import React from 'react';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { mainAxiosInstance } from '../../api/axiosInstances';

export const listCartItems = createAsyncThunk(
    'cartItems/listCartItems',
    async (_, { getState, rejectWithValue }) => {
        try {
            const {
                user: { userInfo }
            } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.access}`
                }
            };
            const res = await mainAxiosInstance.get('/order/cart/', config);
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
export const addToCart = createAsyncThunk(
    'cartItems/addToCart',
    async ({ id, qty }, { getState, rejectWithValue }) => {
        try {
            const {
                user: { userInfo }
            } = getState();
            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.access}`
                },
                body: JSON.stringify({ qty })
            };
            const res = await mainAxiosInstance.post(`/order/cart/${id}/`, config);
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

export const removeFromCart = createAsyncThunk(
    'cartItems/removeFromCart',
    async (id, { getState, rejectWithValue }) => {
        try {
            const {
                user: { userInfo }
            } = getState();
            const config = {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${userInfo.access}`
                }
            };
            const res = await mainAxiosInstance.delete(`/order/cart/remove/${id}/`, config);
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

export const updateQty = createAsyncThunk(
    'cartItems/updateQty',
    async ({ id, qty }, { getState, rejectWithValue }) => {
        try {
            const {
                user: { userInfo }
            } = getState();
            const config = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.access}`
                },
                body: JSON.stringify({ qty })
            };
            const res = await mainAxiosInstance.put(`/order/cart/update/${id}/`, config);
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

export const saveShippingAddress = createAsyncThunk(
    'cartItems/saveShippingAddress',
    async (data) => {
        return data;
    }
);