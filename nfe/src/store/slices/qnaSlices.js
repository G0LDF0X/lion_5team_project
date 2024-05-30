import { createSlice } from "@reduxjs/toolkit";
import {
  listQNA,
  listQnADetails,
  createQNA,
  updateQNA,
  deleteQnA,
  createQNAAnswer,
  updateQNAAnswer,
} from "../actions/qnaActions";

export const qnaListSlice = createSlice({
  name: "qnaList",
  initialState: { loading: false, qnas: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listQNA.pending, (state) => {
        state.loading = true;
        state.qnas = [];
      })
      .addCase(listQNA.fulfilled, (state, action) => {
        state.loading = false;
        state.qnas = action.payload;
      })
      .addCase(listQNA.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const qnaDetailsSlice = createSlice({
  name: "qnaDetails",
  initialState: { loading: false, qna: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listQnADetails.pending, (state) => {
        state.loading = true;
        state.qna = {};
      })
      .addCase(listQnADetails.fulfilled, (state, action) => {
        state.loading = false;
        state.qna = action.payload;
      })
      .addCase(listQnADetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
const initialState = { loading: false, success: false, qna: {} };
export const qnaCreateSlice = createSlice({
  name: "qnaCreate",
  initialState,
  reducers: { reset: () => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(createQNA.pending, (state) => {
        state.loading = true;
      })
      .addCase(createQNA.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.qna = action.payload;
      })
      .addCase(createQNA.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { reset: qnaCreateReset } = qnaCreateSlice.actions;
export const qnaUpdateSlice = createSlice({
  name: "qnaUpdate",
  initialState: { loading: false, success: false, qna: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateQNA.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateQNA.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.qna = action.payload;
      })
      .addCase(updateQNA.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const qnaDeleteSlice = createSlice({
  name: "qnaDelete",
  initialState: { loading: false, success: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteQnA.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteQnA.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteQnA.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const qnaAnswerCreateSlice = createSlice({
  name: "qnaAnswerCreate",
  initialState: { loading: false, success: false, qna: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createQNAAnswer.pending, (state) => {
        state.loading = true;
      })
      .addCase(createQNAAnswer.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.qna = action.payload;
      })
      .addCase(createQNAAnswer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const qnaAnswerUpdateSlice = createSlice({
  name: "qnaAnswerUpdate",
  initialState: { loading: false, success: false, qna: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateQNAAnswer.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateQNAAnswer.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.qna = action.payload;
      })
      .addCase(updateQNAAnswer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
