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
        [listQnA.pending]: (state) => {
        state.loading = true;
        state.qnas = [];
        state.error = "";
        },
        [listQnA.fulfilled]: (state, action) => {
        state.loading = false;
        state.qnas = action.payload;
        },
        [listQnA.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
    },
    });

export const qnaDetailsSlice = createSlice({
    name: "qnaDetails",
    initialState: { loading: false, qna: {} },
    reducers: {
        [listQnADetails.pending]: (state) => {
        state.loading = true;
        state.qna = {};
        state.error = "";
        },
        [listQnADetails.fulfilled]: (state, action) => {
        state.loading = false;
        state.qna = action.payload;
        },
        [listQnADetails.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
    },
    });

export const qnaCreateSlice = createSlice({
    name: "qnaCreate",
    initialState: { loading: false, success: false, qna: {} },
    reducers: {
        [createQnA.pending]: (state) => {
        state.loading = true;
        },
        [createQnA.fulfilled]: (state, action) => {
        state.loading = false;
        state.success = true;
        state.qna = action.payload;
        },
        [createQnA.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
    },
    });
export const qnaUpdateSlice = createSlice({
    name: "qnaUpdate",
    initialState: { loading: false, success: false, qna: {} },
    reducers: {
        [updateQnA.pending]: (state) => {
        state.loading = true;
        },
        [updateQnA.fulfilled]: (state, action) => {
        state.loading = false;
        state.success = true;
        state.qna = action.payload;
        },
        [updateQnA.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
    },
    });
export const qnaDeleteSlice = createSlice({
    name: "qnaDelete",
    initialState: { loading: false, success: false },
    reducers: {
        [deleteQnA.pending]: (state) => {
        state.loading = true;
        },
        [deleteQnA.fulfilled]: (state) => {
        state.loading = false;
        state.success = true;
        },
        [deleteQnA.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
    },
    });
export const qnaAnswerCreateSlice = createSlice({
    name: "qnaAnswerCreate",
    initialState: { loading: false, success: false, qna: {} },
    reducers: {
        [createQNAAnswer.pending]: (state) => {
        state.loading = true;
        },
        [createQNAAnswer.fulfilled]: (state, action) => {
        state.loading = false;
        state.success = true;
        state.qna = action.payload;
        },
        [createQNAAnswer.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
    },
    });
export const qnaAnswerUpdateSlice = createSlice({
    name: "qnaAnswerUpdate",
    initialState: { loading: false, success: false, qna: {} },
    reducers: {
        [updateQNAAnswer.pending]: (state) => {
        state.loading = true;
        },
        [updateQNAAnswer.fulfilled]: (state, action) => {
        state.loading = false;
        state.success = true;
        state.qna = action.payload;
        },
        [updateQNAAnswer.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
    },
    });
    