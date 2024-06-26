import { createAsyncThunk } from "@reduxjs/toolkit";
import { mainAxiosInstance, recommendationAxiosInstance } from "../../api/axiosInstances";

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
    "Content-Type": "application/json",
    Authorization: `Bearer ${userInfo.access}`,
    
  };
};

export const listBoards = createAsyncThunk(
  "boardList/listBoards",
  async ({  page = ''}, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const cacheKey = `${page}`;
      const fetchTime = state.board.fetchTime;

      if (state.board.cache[cacheKey] && fetchTime && (Date.now() - fetchTime) < 1000 * 60 * 5) {
        return {
          data: state.board.cache[cacheKey],
          cacheKey,
          fromCache: true,
          totalPages: state.board.totalPages,
          currentPage: state.board.currentPage
        };
      }

      let params = new URLSearchParams();
      if (page) params.append('page', page);

      const url = `board?${params.toString()}`;
      const response = await mainAxiosInstance.get(url);
      const { boards, total_pages, current_page } = response.data;

      // boards.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      boards.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      return {
        data: boards,
        cacheKey,
        fromCache: false,
        totalPages: total_pages,
        currentPage: current_page
      };
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
      const res = await mainAxiosInstance.post(`/board/create/`, formData, {
        headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.access}`,
      },
    });
      console.log(res.data);
      return res.data;
    } catch (error) {
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
      const res = await mainAxiosInstance.put(
        `/board/update_board/${id}/`,
        board,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        user: { userInfo },
      } = getState();

      const res = await mainAxiosInstance.delete(`/board/delete/${id}/`, {
        headers: {
          Authorization: `Bearer ${userInfo.access}`,
        },
      });
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


export const getTopBoards = createAsyncThunk( 
  "boardTop/getTopBoards",
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    const cacheKey = 'topBoards';
    const fetchTime = state.topBoard.fetchTime;
    if( state.topBoard.cache[cacheKey] && fetchTime && (Date.now() - fetchTime) < 1000 * 60 * 5){
      return { data: state.topBoard.cache[cacheKey],cacheKey,  fromCache: true, };
    }
    try {
      const res = await mainAxiosInstance.get(`/board/top/`);
      return {data:res.data, cacheKey, fromCache: false};
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const getBoardRecommendations = createAsyncThunk(
  "boardRecommendations/getBoardRecommendations",
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    const userIfo = state.user.userInfo;
    const cacheKey = 'recommendations';
    const fetchTime = state.topBoard.fetchTime;
    if( state.topBoard.cache[cacheKey] && fetchTime && (Date.now() - fetchTime) < 1000 * 60 * 5){
      return { data: state.topBoard.cache[cacheKey],cacheKey,  fromCache: true, };
    }
    try {
      const res = await recommendationAxiosInstance.get(`/board-recommendations/${userIfo.id}/`);
      return {data:res.data, cacheKey, fromCache: false};
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);