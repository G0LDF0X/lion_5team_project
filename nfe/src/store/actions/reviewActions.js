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
export const listReviews = createAsyncThunk(
  "reviewList/listReviews",
  async (_, { rejectWithValue }) => {
    try {
      const res = await mainAxiosInstance.get(`/items/reviews`);

      return res.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const listReviewDetails = createAsyncThunk(
  "reviewDetails/getReviewDetails",
  async (id, { rejectWithValue }) => {
    try {
      const res = await mainAxiosInstance.get(`/items/review/detail/${id}`);

      return res.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const createReview = createAsyncThunk(
  "reviewCreate/createReview",
  async ({ id }, { getState, rejectWithValue }) => {
    try {
      const headers = getAuthHeaders(getState);
      
      const res = await mainAxiosInstance.post(
        `/items/review/create/${id}/`,{}
        ,
        { headers }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const updateReview = createAsyncThunk(
  "reviewUpdate/updateReview",
  async (review, { getState, rejectWithValue }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await mainAxiosInstance.put(
        `/items/review/update/${review.id}`,
        { review },
        { headers }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const deleteReview = createAsyncThunk(
  "reviewDelete/deleteReview",
  async (id, { getState, rejectWithValue }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await mainAxiosInstance.delete(`/items/review/delete/${id}`, {
        headers,
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const listMyReview = createAsyncThunk(
  "reviewMy/myReview",
  async (_, { getState, rejectWithValue }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await mainAxiosInstance.get(`/items/myreviews`, {
        headers,
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);
