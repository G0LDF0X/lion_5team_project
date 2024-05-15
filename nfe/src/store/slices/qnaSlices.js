import { createSlice } from "@reduxjs/toolkit";
import {
  listQnA,
  listQnADetails,
  createQnA,
  updateQnA,
  deleteQnA,
  createQNAAnswer,
  updateQNAAnswer,
} from "../actions/qnaActions";

export const qnaListSlice = createSlice({
    name: "qnaList",
    initialState: { loading: false, qnas: [] },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(listQnA.pending, (state) => {
            state.loading = true;
            state.qnas = [];
        })
        .addCase(listQnA.fulfilled, (state, action) => {
            state.loading = false;
            state.qnas = action.payload;
        })
        .addCase(listQnA.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
    });

export const qnaDetailsSlice = createSlice({
    name: "qnaDetails",
    initialState: { loading: false, qna: {} },
    reducers: {
    },
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
    }
    });

export const qnaCreateSlice = createSlice({
    name: "qnaCreate",
    initialState: { loading: false, success: false, qna: {} },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(createQnA.pending, (state) => {
            state.loading = true;
        })
        .addCase(createQnA.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.qna = action.payload;
        })
        .addCase(createQnA.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
    });
export const qnaUpdateSlice = createSlice({
    name: "qnaUpdate",
    initialState: { loading: false, success: false, qna: {} },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(updateQnA.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateQnA.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.qna = action.payload;
        })
        .addCase(updateQnA.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
    });
export const qnaDeleteSlice = createSlice({
    name: "qnaDelete",
    initialState: { loading: false, success: false },
    reducers: {
    },
    extraReducers : (builder) => {
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
    }
    });
export const qnaAnswerCreateSlice = createSlice({
    name: "qnaAnswerCreate",
    initialState: { loading: false, success: false, qna: {} },
    reducers: {
    },
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
    }
    });
export const qnaAnswerUpdateSlice = createSlice({
    name: "qnaAnswerUpdate",
    initialState: { loading: false, success: false, qna: {} },
    reducers: {
    },
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
    }
    });
