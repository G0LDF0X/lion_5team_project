import { createAsyncThunk } from "@reduxjs/toolkit";
import { mainAxiosInstance } from "../../api/axiosInstances";

// Helper function to handle errors
const handleError = (error) => {
  return error.response && error.response.data.detail
    ? error.response.data.detail
    : error.message;
};

// Helper function to get Authorization headers
const getAuthHeaders = (getState) => {
  const {
    user: { userInfo },
  } = getState();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userInfo.access}`,
    
  };
};

export const listBoards = createAsyncThunk(
  "boardList/listBoards",
  async (_, { rejectWithValue }) => {
    try {
      const res = await mainAxiosInstance.get(`/board`);
      return res.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const getBoardDetails = createAsyncThunk(
  "boardDetails/getBoardDetails",
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        user: { userInfo },
      } = getState();
      if (!userInfo) {
       const res = await mainAxiosInstance.get(`/board/detail/${id}/`);
        return res.data;
      }
      else{
      const res = await mainAxiosInstance.get(`/board/detail/${id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization  ": `Bearer ${userInfo.access}`,
          },
        }
        );
      return res.data;
    }
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const createBoard = createAsyncThunk(
  "boardCreate/createBoard",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const {
        user: { userInfo },
      } = getState();

      // Debugging logs to verify token and headers
      console.log('User Info:', userInfo);
      console.log('Access Token:', userInfo?.access);

      const res = await mainAxiosInstance.post(`/board/create/`, formData, {
        headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.access}`,
      },
    });
      return res.data;
    } catch (error) {
      console.error('Error:', error);
      return rejectWithValue(handleError(error));
    }
  }
);

export const updateBoard = createAsyncThunk(
  "boardUpdate/updateBoard",
  async ({ id, board }, { getState, rejectWithValue }) => {
    console.log(id);
    try {
      const {
        user: { userInfo },
      } = getState();

      console.log('Access Token:', userInfo.access);  // 토큰 확인
      console.log('Request Data:', board);

      const res = await mainAxiosInstance.put(
        `/board/update_board/${id}/`,
        board,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.access}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const deleteBoard = createAsyncThunk(
  "boardDelete/deleteBoard",
  async (id, { rejectWithValue }) => {
    try {
      const res = await mainAxiosInstance.delete(`/board/delete/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const createReply = createAsyncThunk(
  "boardCreateReply/createBoardReply",
  async ({ reply, boardId, applied_id }, { getState, rejectWithValue }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await mainAxiosInstance.post(
        `/board/detail/${boardId}/`,
        { content: reply, applied_id },
        { headers }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const createApply = createAsyncThunk(
  "boardCreateReply/createBoardReply",
  async ({ apply, boardId, applied_id }, { getState, rejectWithValue }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await mainAxiosInstance.post(
        `/board/detail/${boardId}/`,
        { content: apply, replied_id: applied_id },
        { headers }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);
