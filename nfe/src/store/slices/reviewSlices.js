import { createSlice } from "@reduxjs/toolkit";
import {
    fetchReviews,
    fetchReviewDetails,
    createReview,
    updateReview,
    deleteReview,
    myReview
} from "../actions/reviewActions";

export const reviewListSlice = createSlice({
    name: "reviewList",
    initialState: { loading: false, reviews: [] },
    reducers: {
        [fetchReviews.pending]: (state) => {
            state.loading = true;
            state.reviews = [];
            state.error = "";
        },
        [fetchReviews.fulfilled]: (state, action) => {
            state.loading = false;
            state.reviews = action.payload;
        },
        [fetchReviews.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const reviewDetailsSlice = createSlice({
    name: "reviewDetails",
    initialState: { loading: false, review: {} },
    reducers: {
        [fetchReviewDetails.pending]: (state) => {
            state.loading = true;
            state.review = {};
            state.error = "";
        },
        [fetchReviewDetails.fulfilled]: (state, action) => {
            state.loading = false;
            state.review = action.payload;
        },
        [fetchReviewDetails.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const reviewCreateSlice = createSlice({
    name: "reviewCreate",
    initialState: { loading: false, success: false, review: {} },
    reducers: {
        [createReview.pending]: (state) => {
            state.loading = true;
        },
        [createReview.fulfilled]: (state, action) => {
            state.loading = false;
            state.success = true;
            state.review = action.payload;
        },
        [createReview.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const reviewUpdateSlice = createSlice({
    name: "reviewUpdate",
    initialState: { loading: false, success: false, review: {} },
    reducers: {
        [updateReview.pending]: (state) => {
            state.loading = true;
        },
        [updateReview.fulfilled]: (state, action) => {
            state.loading = false;
            state.success = true;
            state.review = action.payload;
        },
        [updateReview.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const reviewDeleteSlice = createSlice({
    name: "reviewDelete",
    initialState: { loading: false, success: false },
    reducers: {
        [deleteReview.pending]: (state) => {
            state.loading = true;
        },
        [deleteReview.fulfilled]: (state) => {
            state.loading = false;
            state.success = true;
        },
        [deleteReview.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const myReviewSlice = createSlice({
    name: "myReview",
    initialState: { loading: false, reviews: [] },
    reducers: {
        [myReview.pending]: (state) => {
            state.loading = true;
            state.reviews = [];
            state.error = "";
        },
        [myReview.fulfilled]: (state, action) => {
            state.loading = false;
            state.reviews = action.payload;
        },
        [myReview.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});