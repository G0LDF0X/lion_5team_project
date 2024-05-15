import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLogin = createAsyncThunk(
    "userLogin/login",
    async (user) => {
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
export const fetchLogout = createAsyncThunk(
    "userLogout/logout",
    async () => {
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

export const fetchRegister = createAsyncThunk(  
    "userRegister/register",
    async (user) => {
        try {
        const res = await fetch(`/app/register/`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
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
export const fetchUserdetail = createAsyncThunk(
    "userDetail/detail",
    async (id) => {
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

export const fetchUserUpdate = createAsyncThunk(
    "userUpdate/update",
    async (user) => {
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

export const fetchPasswordUpdate = createAsyncThunk(
    "passwordUpdate/update",
    async (password) => {
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
export const fetchUserList = createAsyncThunk(
    "userList/list",
    async () => {
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
export const fetchUserDelete = createAsyncThunk(
    "userDelete/delete",
    async (id) => {
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