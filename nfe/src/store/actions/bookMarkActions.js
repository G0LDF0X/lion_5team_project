import { createAsyncThunk } from "@reduxjs/toolkit";
import { mainAxiosInstance } from "../../api/axiosInstances";
  
export const listBookMark = createAsyncThunk(
    "bookMarkList/listBookMark",
    async (_, { rejectWithValue }) => {
        try {
            const res = await mainAxiosInstance.get(`/users/bookmark`);
    
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

export const addToBookMark = createAsyncThunk(
    "bookMarkAdd/addToBookMark",
    async (id, { rejectWithValue }) => {
        try {
            const res = await mainAxiosInstance.put(`/users/bookmark/add/${id}/`);
            const data = await res.json();
            return data;
        } catch (error) {
            return rejectWithValue(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
            );
        }
    }
);
export const removeFromBookMark = createAsyncThunk(
    "bookMarkRemove/removeFromBookMark",
    async (id, { rejectWithValue }) => {
        try {
            const res = await mainAxiosInstance.delete(`/users/bookmark/delete/${id}/`);
            const data = await res.json();
            return data;
        } catch (error) {
            return rejectWithValue(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
            );
        }
    }
);