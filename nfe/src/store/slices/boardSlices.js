import { createSlice } from "@reduxjs/toolkit";
import {
  listBoards,
  getBoardDetails,
  createBoard,
  updateBoard,
  deleteBoard,
  createReply,
} from "../actions/boardActions";

const initialState = {
  loading: false,
  success: false,
  error: null,
  boardDetail: {},
  boards: [],
  replies: [],
  cache: {},
  fetchTime: null,
  fromCache: false,
};

const pendingReducer = (state) => {
  state.loading = true;
  state.error = null;
};

const fulfilledListReducer = (state, action) => {
  const { data, fromCache } = action.payload;
  state.loading = false;
  state.boards = data;
  state.error = null;
  if (!fromCache) {
    state.cache['boards'] = data;
    state.fetchTime = Date.now();
  }

};

const fulfilledDetailsReducer = (state, action) => {
  state.loading = false;
  state.boardDetail = action.payload.board;
  state.replies = action.payload.replies || [];
  state.error = null;
};

const fulfilledCreateUpdateReducer = (state, action) => {
  state.loading = false;
  state.success = true;
  state.boardDetail = action.payload;
  state.error = null;
};

const fulfilledDeleteReducer = (state) => {
  state.loading = false;
  state.success = true;
  state.error = null;
};

const rejectedReducer = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listBoards.pending, pendingReducer)
      .addCase(listBoards.fulfilled, fulfilledListReducer)
      .addCase(listBoards.rejected, rejectedReducer)
      .addCase(getBoardDetails.pending, pendingReducer)
      .addCase(getBoardDetails.fulfilled, fulfilledDetailsReducer)
      .addCase(getBoardDetails.rejected, rejectedReducer)
      .addCase(createBoard.pending, pendingReducer)
      .addCase(createBoard.fulfilled, fulfilledCreateUpdateReducer)
      .addCase(createBoard.rejected, rejectedReducer)
      .addCase(updateBoard.pending, pendingReducer)
      .addCase(updateBoard.fulfilled, fulfilledCreateUpdateReducer)
      .addCase(updateBoard.rejected, rejectedReducer)
      .addCase(deleteBoard.pending, pendingReducer)
      .addCase(deleteBoard.fulfilled, fulfilledDeleteReducer)
      .addCase(deleteBoard.rejected, rejectedReducer)
      .addCase(createReply.pending, pendingReducer)
      .addCase(createReply.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.reply = action.payload;
        state.replies = [...state.replies, action.payload];
        state.error = null;
      })
      .addCase(createReply.rejected, rejectedReducer);
  },
});

export const { resetSuccess } = boardSlice.actions;
