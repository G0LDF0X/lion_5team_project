import { createSlice } from "@reduxjs/toolkit";
import {
  fetchLogin,
  fetchRegister,
  fetchLogout,
  fetchUserDetails,
  fetchUserUpdate,
  fetchPasswordUpdate,
  fetchUserList,
  fetchUserDelete,
} from "../actions/userActions";


export const userLoginSlice = createSlice({
    name: "userLogin",
    initialState: {},
    reducers: {
    [fetchLogin.pending]: (state) => {
        state.loading = true;
    }, 
    [fetchLogin.fulfilled]: (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
    },
    [fetchLogin.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    },
});

export const userRegisterSlice = createSlice({
    name: "userRegister",
    initialState: {},
    reducers: {
    [fetchRegister.pending]: (state) => {
        state.loading = true;
    }, 
    [fetchRegister.fulfilled]: (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
    },
    [fetchRegister.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    },
});

export const userLogoutSlice = createSlice({
    name: "userLogout",
    initialState: {},
    reducers: {
    [fetchLogout.pending]: (state) => {
        state.loading = true;
    }, 
    [fetchLogout.fulfilled]: (state, action) => {
        state.loading = false;
        state.userInfo = {};
        
    },
    [fetchLogout.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    },
});


export const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState: {},
    reducers: {
    [fetchUserDetails.pending]: (state) => {
        state.loading = true;
    }, 
    [fetchUserDetails.fulfilled]: (state, action) => {
        state.loading = false;
        state.user = action.payload;
    },
    [fetchUserDetails.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    },
});

export const userUpdateSlice = createSlice({
    name: "userUpdate",
    initialState: {},
    reducers: {
    [fetchUserUpdate.pending]: (state) => {
        state.loading = true;
    }, 
    [fetchUserUpdate.fulfilled]: (state, action) => {
        state.loading = false;
        state.success = true;
        state.userInfo = action.payload;
    },
    [fetchUserUpdate.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    },
});

export const passwordUpdateSlice = createSlice({
    name: "passwordUpdate",
    initialState: {},
    reducers: {
    [fetchPasswordUpdate.pending]: (state) => {
        state.loading = true;
    }, 
    [fetchPasswordUpdate.fulfilled]: (state, action) => {
        state.loading = false;
        state.success = true;
    },
    [fetchPasswordUpdate.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    },
});

export const userListSlice = createSlice({
    name: "userList",
    initialState: {},
    reducers: {
    [fetchUserList.pending]: (state) => {
        state.loading = true;
    }, 
    [fetchUserList.fulfilled]: (state, action) => {
        state.loading = false;
        state.users = action.payload;
    },
    [fetchUserList.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    },
});

export const userDeleteSlice = createSlice({
    name: "userDelete",
    initialState: {},
    reducers: {
    [fetchUserDelete.pending]: (state) => {
        state.loading = true;
    }, 
    [fetchUserDelete.fulfilled]: (state, action) => {
        state.loading = false;
        state.success = true;
    },
    [fetchUserDelete.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    },
});
