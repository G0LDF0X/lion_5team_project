import { createAsyncThunk } from "@reduxjs/toolkit";
import { mainAxiosInstance } from "../../api/axiosInstances";

const getAuthHeaders = (getState) => {
  const {
    user: { userInfo },
  } = getState();
  return {
    Authorization: `Bearer ${userInfo.access}`,
  };
};

const handleError = (error) => {
  return error.response && error.response.data.detail
    ? error.response.data.detail
    : error.message;
};

export const listBookMark = createAsyncThunk(
  "bookMarkList/listBookMark",
  async (_, { getState, rejectWithValue }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await mainAxiosInstance.get(`/users/bookmark`, {
        headers,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const addToBookMark = createAsyncThunk(
  "bookMarkAdd/addToBookMark",
  async (id, { getState, rejectWithValue }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await mainAxiosInstance.put(
        `/users/bookmark/add/${id}/`,
        {},
        {
          headers,
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const removeFromBookMark = createAsyncThunk(
  "bookMarkRemove/removeFromBookMark",
  async (id, { getState, rejectWithValue }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await mainAxiosInstance.delete(`/users/bookmark/delete/${id}/`, {
        headers,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);