import { createAsyncThunk } from "@reduxjs/toolkit";
import { mainAxiosInstance } from "../../api/axiosInstances";
export const listQNA = createAsyncThunk(
  "qnaList/listQnA",
  async (_, { rejectWithValue }) => {
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
  }
);
export const listQnADetails = createAsyncThunk(
  "qnaDetails/getQnADetails",
  async (id, { rejectWithValue }) => {
    try {
      const res = await mainAxiosInstance.get(`/qna/detail/${id}`);
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

export const createQNA = createAsyncThunk(
  "qnaCreate/createQnA",
  async ({ formData}, { getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const res = await mainAxiosInstance.post(`/qna/create/`, formData, {
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

export const updateQNA = createAsyncThunk(
  "qnaUpdate/updateQnA",
  async (qna, { rejectWithValue }) => {
    try {
      const res = await mainAxiosInstance.put(`/qna/update/${qna.id}`, {
        qna,
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
export const deleteQnA = createAsyncThunk(
  "qnaDelete/deleteQnA",
  async (id, { rejectWithValue }) => {
    try {
      const res = await mainAxiosInstance.delete(`/qna/delete/${id}`);
      

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
export const createQNAAnswer = createAsyncThunk(
  "qnaAnswerCreate/createQNAAnswer",
  async (qnaId, { getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const res = await mainAxiosInstance.post(
        `/qna/answer/create/${qnaId}`,
        {
          qnaId,
        },
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
export const updateQNAAnswer = createAsyncThunk(
  "qnaAnswerUpdate/updateQNAAnswer",
  async (qna, { getState, rejectWithValue }) => {
    // Add { getState } as the second argument
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const res = await mainAxiosInstance.put(`/qna/answer/update/${qna.id}`, 
      {qna},{
        headers: {
          "Content-Type": "application/json",
          Autorization: `Bearer ${userInfo.token}`,
        }}
      );
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
