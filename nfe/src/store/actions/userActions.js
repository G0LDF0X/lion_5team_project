import { createAsyncThunk } from "@reduxjs/toolkit";


export const login = createAsyncThunk(
    "userLogin/login",
    async (user, {rejectWithValue}) => {
        try {
        const res = await fetch(`/app/token/`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const data = await res.json();
        localStorage.setItem("userInfo", JSON.stringify(data));
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
export const logout = createAsyncThunk(
    "userLogout/logout",
    async (_,{rejectWithValue}) => {
        try {
        const res = await fetch(`/app/logout/`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        localStorage.removeItem("userInfo");
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

export const register = createAsyncThunk(  
    "userRegister/register",
    async ({name, email, password, nickname, adress, phone}, {rejectWithValue}) => {
        try {
        const res = await fetch(`/app/register/`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ 'username':name, 'email':email, 'password':password, 'nickname':nickname, 'address':adress, 'phone':phone }),
        });
        const data = await res.json();
        localStorage.setItem("userInfo", JSON.stringify(data));
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
export const getUserDetail = createAsyncThunk(
    "userDetail/detail",
    async (_, { getState, rejectWithValue }) => {
        try {
            const {userLogin: {userInfo}} = getState();
        const res = await fetch(`/users/profile/`, 
        {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
            },
        }
        );
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

export const updateUserProfile = createAsyncThunk(
    "userUpdate/update",
    async (user,{getState, rejectWithValue}) => {
        try {
            const {userLogin: {userInfo}} = getState();
        const res = await fetch(`/users/update_profile/`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
            },
            body: JSON.stringify(user),
        });
        const data = await res.json();
        localStorage.setItem("userInfo", JSON.stringify(data));
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

export const updateUserPassword = createAsyncThunk(
    "passwordUpdate/update",
    async (password, {getState, rejectWithValue}) => {
        try {
            const {userLogin: {userInfo}} = getState();
        const res = await fetch(`/users/update_password/`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
            },
            body: JSON.stringify(password),
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
export const listUsers = createAsyncThunk(
    "userList/list",
    async (_, {getState, rejectWithValue}) => {
        try {
            const {userLogin: {userInfo}} = getState();
        const res = await fetch(`/users/users`, {
            headers: {
            Authorization: `Bearer ${userInfo.token}`,
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
export const deleteUser = createAsyncThunk(
    "userDelete/delete",
    async (id, {getState, rejectWithValue}) => {
        try {
            const {userLogin: {userInfo}} = getState();
        const res = await fetch(`/users/delete/${id}`, {
            method: "DELETE",
            headers: {
            Authorization: `Bearer ${userInfo.token}`,
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