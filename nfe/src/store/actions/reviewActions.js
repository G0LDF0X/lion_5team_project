import { createAsyncThunk } from "@reduxjs/toolkit";

export const listReviews = createAsyncThunk(
    "reviewList/listReviews",
    async (_, {rejectWithValue}) => {
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

export const listReviewDetails = createAsyncThunk(
    "reviewDetails/getReviewDetails",
    async (id, {rejectWithValue}) => {
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
    async (review,{getState, rejectWithValue}) => {
        try {
        const {
            userLogin: { userInfo },
        } = getState();    
        const res = await fetch(`/items/review/create/`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.access}`,
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
    async (review, {getState, rejectWithValue}) => {
        try {
        const {
            userLogin: { userInfo },
        } = getState();
        const res = await fetch(`/items/review/update/${review.id}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.access}`,
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
    async (id, {getState, rejectWithValue}) => {
        try {
        const {
            userLogin: { userInfo },
        } = getState();
        const res = await fetch(`/items/review/delete/${id}`, {
            method: "DELETE",
            headers: {
            Authorization: `Bearer ${userInfo.access}`,
            },
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
    async (_, {getState, rejectWithValue}) => {
        try {
        const {
            userLogin: { userInfo },
        } = getState();
        const res = await fetch(`/items/myreviews`, {
            headers: {
            Authorization: `Bearer ${userInfo.access}`,
            },
            
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