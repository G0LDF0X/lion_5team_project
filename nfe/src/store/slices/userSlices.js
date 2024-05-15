import { createSlice } from "@reduxjs/toolkit";
import {
  login, 
    register,
    logout,
    getUserDetails,
    updateUserProfile,
    updateUserPassword,
    listUsers,
    deleteUser,
    updateUser,

} from "../actions/userActions";


export const userLoginSlice = createSlice({
    name: "userLogin",
    initialState: {},
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state) => {
            state.loading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const userRegisterSlice = createSlice({
    name: "userRegister",
    initialState: {},
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.loading = true;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
        })
        .addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const userLogoutSlice = createSlice({
    name: "userLogout",
    initialState: {},
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(logout.pending, (state) => {
            state.loading = true;
        })
        .addCase(logout.fulfilled, (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
        })
        .addCase(logout.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});


export const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState: {},
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(getUserDetails.pending, (state) => {
            state.loading = true;
        })
        .addCase(getUserDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(getUserDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const userUpdateSlice = createSlice({
    name: "userUpdate",
    initialState: {},
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(updateUserProfile.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
        })
        .addCase(updateUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const passwordUpdateSlice = createSlice({
    name: "passwordUpdate",
    initialState: {},
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(updateUserPassword.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateUserPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
        })
        .addCase(updateUserPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const userListSlice = createSlice({
    name: "userList",
    initialState: {},
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(listUsers.pending, (state) => {
            state.loading = true;
        })
        .addCase(listUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        })
        .addCase(listUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const userDeleteSlice = createSlice({
    name: "userDelete",
    initialState: {},
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(deleteUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
        })
        .addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});
