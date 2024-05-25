import { createAsyncThunk } from "@reduxjs/toolkit";
import { mainAxiosInstance } from "../../api/axiosInstances";
export const listBoards = createAsyncThunk(
  "boardList/listBoards",
  async (_, { rejectWithValue }) => {
    try {
      const res = await mainAxiosInstance.get(`/board`);

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
export const getBoardDetails = createAsyncThunk(
  "boardDetails/getBoardDetails",
  async (id, { rejectWithValue }) => {
    try {
      const res = await mainAxiosInstance.get(`/board/detail/${id}/`);
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

export const createBoard = createAsyncThunk(
  "boardCreate/createBoard",
  async (board, { rejectWithValue }) => {
    try {
      const res = await mainAxiosInstance.post(`/board/create/`, board);
    
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

export const updateBoard = createAsyncThunk(
  "boardUpdate/updateBoard",
  async (board, { rejectWithValue }) => {
    try {
      const res = await mainAxiosInstance.put(
        `/board/update/${board.id}`,
        { board },
        {
          headers: {
            "Content-Type": "application/json",
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

export const deleteBoard = createAsyncThunk(
  "boardDelete/deleteBoard",
  async (id, { rejectWithValue }) => {
    try {
      const res = await mainAxiosInstance.delete(`/board/delete/${id}`);

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

export const createReply = createAsyncThunk(
  "boardCreateReply/createBoardReply",
  async ({ repliedId = 0, content, id }, { getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const res = await mainAxiosInstance.post(
        `/board/detail/${id}`,
        { content, repliedId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
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
