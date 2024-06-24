import { createAsyncThunk } from "@reduxjs/toolkit";
import { mainAxiosInstance } from "../../api/axiosInstances";


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
    Authorization: `Bearer ${userInfo.access}`,
  };
};

export const createOrder = createAsyncThunk(
  'orderCreate/createOrder',
  async (order, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await mainAxiosInstance.post('/order/payment/', order, { headers });
      return res.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  'orderDetails/getOrderDetails',
  async (id, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await mainAxiosInstance.get(`/order/detail/${id}`, { headers });
      return res.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const getMyOrders = createAsyncThunk(
  'myOrderList/getMyOrders',
  async ({ page = 1, pageSize = 12 }, { rejectWithValue, getState }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await mainAxiosInstance.get(`/order/myorderlist/?page=${page}&page_size=${pageSize}`, { headers });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
      return rejectWithValue(handleError(error));
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
      return rejectWithValue(handleError(error));
    }
  }
);