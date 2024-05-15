import { createAsyncThunk } from "@reduxjs/toolkit";

export const listQnA = createAsyncThunk(
    "qnaList/listQnA",
    async () => {
        try {
        const res = await fetch(`/qna`);
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
export const listQnADetails = createAsyncThunk(
    "qnaDetails/getQnADetails",
    async (id) => {
        try {
        const res = await fetch(`/qna/detail/${id}`);
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

export const createQnA = createAsyncThunk(
    "qnaCreate/createQnA",
    async (qna) => {
        try {
        const res = await fetch(`/qna/create/`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(qna),
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

export const updateQnA = createAsyncThunk(
    "qnaUpdate/updateQnA",
    async (qna) => {
        try {
        const res = await fetch(`/qna/update/${qna.id}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(qna),
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
export const deleteQnA = createAsyncThunk(
    "qnaDelete/deleteQnA",
    async (id) => {
        try {
        const res = await fetch(`/qna/delete/${id}`, {
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
export const createQNAAnswer = createAsyncThunk(
    "qnaAnswerCreate/createQNAAnswer",
    async (qnaId) => {
        try {
        const {userLogin: {userInfo}} = getState();
        const res = await fetch(`/qna/answer/create/${qnaId}`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Autorization: `Bearer ${userInfo.token}`
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
export const updateQNAAnswer = createAsyncThunk(
    "qnaAnswerUpdate/updateQNAAnswer",
    async (qna) => {
        try {
        const res = await fetch(`/qna/answer/update/${qna.id}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(qna),
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
    