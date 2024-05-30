import { createSlice } from "@reduxjs/toolkit";
import {
    listBookMark,
    addToBookMark,
    removeFromBookMark,
} from "../actions/bookMarkActions";

export const bookMarkListSlice = createSlice({  
    name: "bookMarkList",
    initialState: { loading: false, bookMarkItems: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(listBookMark.pending, (state) => {
                state.loading = true;
                state.bookMarkItems = [];
            })
            .addCase(listBookMark.fulfilled, (state, action) => {
                state.loading = false;
                state.bookMarkItems = action.payload;
            })
            .addCase(listBookMark.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export const bookMarkAddSlice = createSlice({
    name: "bookMarkAdd",
    initialState: { loading: false, success: false, bookMarkItems: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToBookMark.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToBookMark.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.bookMarkItems = action.payload;
            })
            .addCase(addToBookMark.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export const bookMarkRemoveSlice = createSlice({
    name: "bookMarkRemove",
    initialState: { loading: false, success: false, bookMarkItems: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(removeFromBookMark.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeFromBookMark.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.bookMarkItems = action.payload;
            })
            .addCase(removeFromBookMark.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});