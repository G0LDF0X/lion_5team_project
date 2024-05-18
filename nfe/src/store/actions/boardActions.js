import { createAsyncThunk } from "@reduxjs/toolkit";
import { mainAxiosInstance } from "../../api/axiosInstances";
export const listBoards = createAsyncThunk(
    "boardList/listBoards",
    async (_,{rejectWithValue}) => {
        try {
        const res = await mainAxiosInstance.get(`/board`);
        
        return res.data;
        } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        );
        }
    }
    );
export const getBoardDetails = createAsyncThunk(
    "boardDetails/getBoardDetails",
    async (id, {rejectWithValue}) => {
        try {
        const res = await mainAxiosInstance.get(`/board/detail/${id}/`);
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
    async (board, {rejectWithValue}) => {
        try {
        const res = await mainAxiosInstance.post
        (`/board/create/`, board);
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
    async (board, {rejectWithValue}) => {
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
    async (id, {rejectWithValue}) => {
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

export const createReply = createAsyncThunk(
    "boardCreateReply/createBoardReply",
    async ({repliedId = 0, content, id},{getState, rejectWithValue} ) => {
        try {
        const {
            userLogin: { userInfo },
        } = getState();
        const res = await fetch(`/board/detail/${id}`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
            },
            body: JSON.stringify({content, repliedId}),
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