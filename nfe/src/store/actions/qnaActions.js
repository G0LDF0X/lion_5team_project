import { createAsyncThunk } from "@reduxjs/toolkit";
import { mainAxiosInstance } from "../../api/axiosInstances";
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
    Authorization: `Bearer ${userInfo.access}`,
  };
};
export const listQNA = createAsyncThunk(
  "qnaList/listQnA",
  async (_, { rejectWithValue }) => {
    try {
      const res = await mainAxiosInstance.get(`/qna`);

      return res.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
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
      return rejectWithValue(handleError(error));
    }
  }
);

export const createQNA = createAsyncThunk(
  "qnaCreate/createQnA",
  async (formData, { getState, rejectWithValue }) => {
      try {
          const headers = getAuthHeaders(getState);
          const res = await mainAxiosInstance.post('/qna/create/', formData, {
              headers: {
                  ...headers,
                  'Content-Type': 'multipart/form-data', // Ensure correct content type
              },
          });
          return res.data;
      } catch (error) {
          return rejectWithValue(handleError(error));
      }
  }
);

export const updateQNA = createAsyncThunk(
  "qnaUpdate/updateQnA",
  async ({  formdata, QnaId }, { getState, rejectWithValue }) => {
    console.log(QnaId);
    try {
      const {
        user: { userInfo },
      } = getState();
      const res = await mainAxiosInstance.put(
        `/qna/update/${QnaId}/`,
        formdata,
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
export const deleteQnA = createAsyncThunk(
  "qnaDelete/deleteQnA",
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        user: { userInfo },
      } = getState();

      const res = await mainAxiosInstance.delete(`/qna/delete/${id}/`, {
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
export const createQNAAnswer = createAsyncThunk(
  "qnaAnswerCreate/createQNAAnswer",
  async ({ id, content, title }, { getState, rejectWithValue }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await mainAxiosInstance.post(
        `/qna/answer/create/${id}/`,
        {
          content: content,
          title: title,
        },
        {headers}
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);
export const updateQNAAnswer = createAsyncThunk(
  "qnaAnswerUpdate/updateQNAAnswer",
  async (qna, { getState, rejectWithValue }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await mainAxiosInstance.put(
        `/qna/answer/update/${qna.id}`,{ qna },{headers});
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);
