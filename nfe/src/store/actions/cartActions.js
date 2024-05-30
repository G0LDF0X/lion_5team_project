import { createAsyncThunk } from '@reduxjs/toolkit';
import { mainAxiosInstance } from '../../api/axiosInstances';

const handleError = (error) => {
  return error.response && error.response.data.detail
    ? error.response.data.detail
    : error.message;
};

const getAuthHeaders = (getState) => {
  const {
    user: { userInfo },
  } = getState();
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userInfo.access}`,
  };
};

export const listCartItems = createAsyncThunk(
  'cartItems/listCartItems',
  async (_, { getState, rejectWithValue }) => {
    try {
      const config = {
        headers: getAuthHeaders(getState),
      };
      const res = await mainAxiosInstance.get('/order/cart/', config);
      return res.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const addToCart = createAsyncThunk(
  'cartItems/addToCart',
  async ({ id, qty }, { getState, rejectWithValue }) => {
    try {
      const config = {
        headers: getAuthHeaders(getState),
      };
      const res = await mainAxiosInstance.post(`/order/cart/${id}/`, { qty }, config);
      return res.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cartItems/removeFromCart',
  async (id, { getState, rejectWithValue }) => {
    try {
      const config = {
        headers: getAuthHeaders(getState),
      };
      const res = await mainAxiosInstance.delete(`/order/cart/remove/${id}/`, config);
      return res.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const updateQty = createAsyncThunk(
  'cartItems/updateQty',
  async ({ id, qty }, { getState, rejectWithValue }) => {
    try {
      console.log(id, qty);
      const config = {
        headers: getAuthHeaders(getState),
      };
      const res = await mainAxiosInstance.put(`/order/cart/update/${id}/`, { qty }, config);
      return res.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const saveShippingAddress = createAsyncThunk(
  'cartItems/saveShippingAddress',
  async (data) => {
    return data;
  }
);