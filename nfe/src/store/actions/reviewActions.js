import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchReviews = createAsyncThunk(
    "reviewList/listReviews",
    async () => {
        try {
        const res = await fetch(`/items/reviews`);
        const data = await res.json();
        return data;
        } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        );
        }
    }
    );

export const fetchReviewDetails = createAsyncThunk(
    "reviewDetails/getReviewDetails",
    async (id) => {
        try {
        const res = await fetch(`/items/review/detail/${id}`);
        const data = await res.json();
        return data;
        } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        );
        }
    }
    );

export const createReview = createAsyncThunk(
    "reviewCreate/createReview",
    async (review) => {
        try {
        const res = await fetch(`/items/review/create/`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(review),
        });
        const data = await res.json();
        return data;
        } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        );
        }
    }
    );

export const updateReview = createAsyncThunk(
    "reviewUpdate/updateReview",
    async (review) => {
        try {
        const res = await fetch(`/items/review/update/${review.id}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(review),
        });
        const data = await res.json();
        return data;
        } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        );
        }
    }
    );

export const deleteReview = createAsyncThunk(
    "reviewDelete/deleteReview",
    async (id) => {
        try {
        const res = await fetch(`/items/review/delete/${id}`, {
            method: "DELETE",
        });
        const data = await res.json();
        return data;
        } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        );
        }
    }
    );

export const myReview = createAsyncThunk(
    "reviewMy/myReview",
    async () => {
        try {
        const res = await fetch(`/items/myreviews`);
        const data = await res.json();
        return data;
        } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        );
        }
    }
    );