import { createAsyncThunk } from "@reduxjs/toolkit";
import { mainAxiosInstance } from "../../api/axiosInstances";
export const listQNA = createAsyncThunk("qnaList/listQnA",
 async (_, {rejectWithValue}) => {
  try {
    const res = await mainAxiosInstance.get(`/qna`);
    
    return res.data;
  } catch (error) {
    return rejectWithValue(
      error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message
    );
  }
});
export const listQnADetails = createAsyncThunk(
  "qnaDetails/getQnADetails",
  async (id, {rejectWithValue}) => {
    try {
      const res = await fetch(`/qna/detail/${id}`);
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

export const createQNA = createAsyncThunk(
  "qnaCreate/createQnA",
  async (qna, { getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const res = await fetch(`/qna/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Autorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify(qna),
      });
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

export const updateQNA = createAsyncThunk(
  "qnaUpdate/updateQnA",
  async (qna, {rejectWithValue}) => {
    try {
      const res = await fetch(`/qna/update/${qna.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(qna),
      });
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
export const deleteQnA = createAsyncThunk("qnaDelete/deleteQnA",
 async (id, {rejectWithValue}) => {
  try {
    const res = await fetch(`/qna/delete/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    return data;
  } catch (error) {
    return rejectWithValue(
      error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message
    );
  }
});
export const createQNAAnswer = createAsyncThunk(
  "qnaAnswerCreate/createQNAAnswer",
  async (qnaId, { getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const res = await fetch(`/qna/answer/create/${qnaId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Autorization: `Bearer ${userInfo.token}`,
        },
      });
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
export const updateQNAAnswer = createAsyncThunk(
  "qnaAnswerUpdate/updateQNAAnswer",
  async (qna, { getState, rejectWithValue }) => {
    // Add { getState } as the second argument
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const res = await fetch(`/qna/answer/update/${qna.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Autorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify(qna),
      });
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
