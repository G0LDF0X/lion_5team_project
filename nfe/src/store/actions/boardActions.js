import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBoards = createAsyncThunk(
    "boardList/listBoards",
    async () => {
        try {
        const res = await fetch(`/board`);
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
export const fetchBoardDetails = createAsyncThunk(
    "boardDetails/getBoardDetails",
    async (id) => {
        try {
        const res = await fetch(`/board/detail/${id}/`);
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

export const createBoard = createAsyncThunk(
    "boardCreate/createBoard",
    async (board) => {
        try {
        const res = await fetch(`/board/create/`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(board),
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

export const updateBoard = createAsyncThunk(
    "boardUpdate/updateBoard",
    async (board) => {
        try {
        const res = await fetch(`/board/update/${board.id}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(board),
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

export const deleteBoard = createAsyncThunk(
    "boardDelete/deleteBoard",
    async (id) => {
        try {
        const res = await fetch(`/board/delete/${id}`, {
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

export const createBoardReply = createAsyncThunk(
    "boardCreateReply/createBoardReply",
    async (reply, content, id) => {
        try {
        const res = await fetch(`/board/detail/${id}`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({content, reply}),
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