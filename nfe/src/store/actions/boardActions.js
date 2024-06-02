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
    ㄴ,
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
  async (id, { rejectWithValue }) => {
    try {
      const res = await mainAxiosInstance.get(`/board/detail/${id}/`);
      return res.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const createBoard = createAsyncThunk(
  "boardCreate/createBoard",
  async ({ board }, { getState, rejectWithValue }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await mainAxiosInstance.post(`/board/create/`, board, {
        headers,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const updateBoard = createAsyncThunk(
  "boardUpdate/updateBoard",
  async (board, { rejectWithValue }) => {
    try {
      const res = await mainAxiosInstance.put(
        `/board/update/${board.id}`,
        board,
        {
          headers: {
            "Content-Type": "application/json",
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
  async ({ reply, boardId }, { getState, rejectWithValue }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await mainAxiosInstance.post(
        `/board/detail/${boardId}/`,
        { content: reply },
        { headers }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);
