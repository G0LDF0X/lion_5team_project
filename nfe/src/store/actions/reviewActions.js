import { createAsyncThunk } from "@reduxjs/toolkit";
import { mainAxiosInstance } from "../../api/axiosInstances";
export const listReviews = createAsyncThunk(
  "reviewList/listReviews",
  async (_, { rejectWithValue }) => {
    try {
      const res = await mainAxiosInstance.get(`/items/reviews`);

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

export const listReviewDetails = createAsyncThunk(
  "reviewDetails/getReviewDetails",
  async (id, { rejectWithValue }) => {
    try {
      const res = await mainAxiosInstance.get(`/items/review/detail/${id}`);

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

export const createReview = createAsyncThunk(
  "reviewCreate/createReview",
  async (review, { getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const res = await mainAxiosInstance.post(
        `/items/review/create/`,
        { review },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.access}`,
          },
        }
      );

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

export const updateReview = createAsyncThunk(
  "reviewUpdate/updateReview",
  async (review, { getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const res = await mainAxiosInstance.put(
        `/items/review/update/${review.id}`,
        { review },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.access}`,
          },
        }
      );

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

export const deleteReview = createAsyncThunk(
  "reviewDelete/deleteReview",
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const res = await mainAxiosInstance.delete(`/items/review/delete/${id}`, {
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

export const ListMyReview = createAsyncThunk(
  "reviewMy/myReview",
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const res = await mainAxiosInstance.get(`/items/myreviews`, {
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
