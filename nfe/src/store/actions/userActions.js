import { createAsyncThunk } from "@reduxjs/toolkit";
import { mainAxiosInstance } from "../../api/axiosInstances";

export const login = createAsyncThunk(
  "userLogin/login",
  async (user, { rejectWithValue }) => {
    try {
      const res = await mainAxiosInstance.post(
        `/app/token/`,
        { user },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("userInfo", JSON.stringify(res.data));
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
export const logout = createAsyncThunk(
  "userLogout/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await mainAxiosInstance.post(`/app/logout/`);

      localStorage.removeItem("userInfo");
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

export const register = createAsyncThunk(
  "userRegister/register",
  async (
    { name, email, password, nickname, adress, phone },
    { rejectWithValue }
  ) => {
    try {
      const res = await mainAxiosInstance.post(
        `/app/register/`,
        {
          username: name,
          email: email,
          password: password,
          nickname: nickname,
          address: adress,
          phone: phone,
        },
        {}
      );

      localStorage.setItem("userInfo", JSON.stringify(res.data));
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
export const getUserDetail = createAsyncThunk(
  "userDetail/detail",
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const res = await mainAxiosInstance.get(`/users/profile/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

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

export const updateUserProfile = createAsyncThunk(
  "userUpdate/update",
  async (user, { getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const res = await mainAxiosInstance.put(
        `/users/update_profile/`,
        { user },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      localStorage.setItem("userInfo", JSON.stringify(res.data));
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

export const updateUserPassword = createAsyncThunk(
  "passwordUpdate/update",
  async (password, { getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const res = await mainAxiosInstance.put(
        `/users/update_password/`,
        { password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

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
export const listUsers = createAsyncThunk(
  "userList/list",
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const res = await mainAxiosInstance.get(`/users/users`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

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
export const deleteUser = createAsyncThunk(
  "userDelete/delete",
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const res = await mainAxiosInstance.delete(`/users/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

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
