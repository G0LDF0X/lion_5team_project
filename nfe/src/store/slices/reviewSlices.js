import { createSlice } from "@reduxjs/toolkit";
import {
  listReviews,
  listReviewDetails,
  createReview,
  updateReview,
  deleteReview,
  listMyReview
} from "../actions/reviewActions";

export const reviewListSlice = createSlice({
  name: "reviewList",
  initialState: { loading: false, reviews: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listReviews.pending, (state) => {
        state.loading = true;
        state.reviews = [];
      })
      .addCase(listReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(listReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const reviewDetailsSlice = createSlice({
  name: "reviewDetails",
  initialState: { loading: false, review: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listReviewDetails.pending, (state) => {
        state.loading = true;
        state.review = {};
      })
      .addCase(listReviewDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.review = action.payload;
      })
      .addCase(listReviewDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const initialState = { loading: false, success: false, review: {}, error: null };

export const reviewCreateSlice = createSlice({
  name: "reviewCreate",
  initialState,
  reducers: {
    reset: () => initialState, // Correctly define the reset action here
  },
  extraReducers: (builder) => {
    builder
    .addCase(createReview.pending, (state) => {
      state.loading = true;
    })
    .addCase(createReview.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.review = action.payload;
    })
    .addCase(createReview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { reset: reviewCreateReset } = reviewCreateSlice.actions; // Correctly export the reset action
export default reviewCreateSlice.reducer;

export const reviewUpdateSlice = createSlice({
  name: "reviewUpdate",
  initialState: { loading: false, success: false, review: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.review = action.payload;
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const reviewDeleteSlice = createSlice({
  name: "reviewDelete",
  initialState: { loading: false, success: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReview.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const myReviewListSlice = createSlice({
  name: "myReviewList",
  initialState: { loading: false, reviews: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listMyReview.pending, (state) => {
        state.loading = true;
        state.reviews = [];
      })
      .addCase(listMyReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(listMyReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});