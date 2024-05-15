import { createSlice } from "@reduxjs/toolkit";

import {
  fetchBoards,
  fetchBoardDetails,
  createBoard,
  updateBoard,
  deleteBoard,
  createBoardReply,
} from "../actions/boardActions";

export const boardListSlice = createSlice({
  name: "boardList",
  initialState: { loading: false, boards: [] },
  reducers: {
    [fetchBoards.pending]: (state) => {
      state.loading = true;
      state.boards = [];
      state.error = "";
    },
    [fetchBoards.fulfilled]: (state, action) => {
      state.loading = false;
      state.boards = action.payload;
    },
    [fetchBoards.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const boardDetailsSlice = createSlice({
  name: "boardDetails",
  initialState: { loading: false, board: {}, replies: [] },
  reducers: {
    [fetchBoardDetails.pending]: (state) => {
      state.loading = true;
      state.board = {};
      state.replies = [];
      state.error = "";
    },
    [fetchBoardDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.board = action.payload.board;
      state.replies = action.payload.replies;
    },
    [fetchBoardDetails.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const boardCreateSlice = createSlice({
  name: "boardCreate",
  initialState: { loading: false, success: false, board: {} },
  reducers: {
    [createBoard.pending]: (state) => {
      state.loading = true;
    },
    [createBoard.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.board = action.payload;
    },
    [createBoard.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const boardUpdateSlice = createSlice({
  name: "boardUpdate",
  initialState: { loading: false, success: false, board: {} },
  reducers: {
    [updateBoard.pending]: (state) => {
      state.loading = true;
    },
    [updateBoard.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.board = action.payload;
    },
    [updateBoard.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const boardDeleteSlice = createSlice({
  name: "boardDelete",
  initialState: { loading: false, success: false },
  reducers: {
    [deleteBoard.pending]: (state) => {
      state.loading = true;
    },
    [deleteBoard.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [deleteBoard.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const boardReplySlice = createSlice({
  name: "boardReply",
  initialState: { loading: false, success: false, reply: {} },
  reducers: {
    [createBoardReply.pending]: (state) => {
      state.loading = true;
    },
    [createBoardReply.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.reply = action.payload;
    },
    [createBoardReply.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

