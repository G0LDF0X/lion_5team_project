import { createSlice } from "@reduxjs/toolkit";

import {
  listBoards,
  getBoardDetails,
  createBoard,
  updateBoard,
  deleteBoard,
  createReply,
} from "../actions/boardActions";

export const boardListSlice = createSlice({
  name: "boardList",
  initialState: { loading: false, boards: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listBoards.pending, (state) => {
        state.loading = true;
        state.boards = [];
      })
      .addCase(listBoards.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = action.payload;
      })
      .addCase(listBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const boardDetailsSlice = createSlice({
  name: "boardDetails",
  initialState: { loading: false, board: {}, replies: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoardDetails.pending, (state) => {
        state.loading = true;
        state.board = {};
        state.replies = [];
      })
      .addCase(getBoardDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.board = action.payload;
        state.replies = action.payload.replies;
      })
      .addCase(getBoardDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const boardCreateSlice = createSlice({
  name: "boardCreate",
  initialState: { loading: false, success: false, board: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.board = action.payload;
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const boardUpdateSlice = createSlice({
  name: "boardUpdate",
  initialState: { loading: false, success: false, board: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.board = action.payload;
      })
      .addCase(updateBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const boardDeleteSlice = createSlice({
  name: "boardDelete",
  initialState: { loading: false, success: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBoard.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const boardReplySlice = createSlice({
  name: "boardReply",
  initialState: { loading: false, success: false, reply: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReply.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReply.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.reply = action.payload;
      })
      .addCase(createReply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
