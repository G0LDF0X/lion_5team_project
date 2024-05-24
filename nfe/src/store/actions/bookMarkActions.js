import { createAsyncThunk } from "@reduxjs/toolkit";
import { mainAxiosInstance } from "../../api/axiosInstances";
  
export const listBookMark = createAsyncThunk(
    "bookMarkList/listBookMark",
    async (_, { getState, rejectWithValue }) => {
        try {
            const { userInfo } = getState().userLogin;
            const res = await mainAxiosInstance.get(`/users/bookmark`,
            {
                headers: {
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

export const addToBookMark = createAsyncThunk(
    "bookMarkAdd/addToBookMark",
    async (id, { getState, rejectWithValue }) => {
        try {
            const { userInfo } = getState().userLogin;
            const res = await mainAxiosInstance.put(`/users/bookmark/add/${id}/`,
            
            {
                headers: {
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
export const removeFromBookMark = createAsyncThunk(
    "bookMarkRemove/removeFromBookMark",
    async (id, { getState, rejectWithValue }) => {
        try {
            const { userInfo } = getState().userLogin;
            const res = await mainAxiosInstance.delete(`/users/bookmark/delete/${id}/`,
            {
                headers: {
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