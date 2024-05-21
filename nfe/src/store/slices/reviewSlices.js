import { createSlice } from "@reduxjs/toolkit";
import {
  listReviews,
  listReviewDetails,
  createReview,
  updateReview,
  deleteReview,
  myReview,
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

export const reviewCreateSlice = createSlice({
  name: "reviewCreate",
  initialState: { loading: false, success: false, review: {} },
  reducers: {},
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

export const myReviewSlice = createSlice({
  name: "myReview",
  initialState: { loading: false, reviews: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(myReview.pending, (state) => {
        state.loading = true;
        state.reviews = [];
      })
      .addCase(myReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(myReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
