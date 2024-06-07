import { createAsyncThunk } from "@reduxjs/toolkit";
import { mainAxiosInstance } from "../../api/axiosInstances";
const handleError = (error) => {
  return error.response && error.response.data.detail
    ? error.response.data.detail
    : error.message;
};

const getAuthHeaders = (getState) => {
  const {
    user: { userInfo },
  } = getState();
  return {
    Authorization: `Bearer ${userInfo.access}`,
  };
};
export const login = createAsyncThunk(
  "userLogin/login",
  async (user, { rejectWithValue }) => {
    try {
      const res = await mainAxiosInstance.post(
        `/app/token/`,
        { username: user.username, password: user.password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("userInfo", JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);
export const logout = createAsyncThunk(
  "userLogout/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await mainAxiosInstance.post(`/app/logout/`);

      localStorage.removeItem("userInfo");
      window.location.href = '/';
      return res.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const register = createAsyncThunk(
  "userRegister/register",
  async (
    { username, email, password, nickname, address, phone, pet },
    { rejectWithValue }
  ) => {
    try {
      const res = await mainAxiosInstance.post(`/app/register/`, {
        username,
         email,
        password,
         nickname,
         address,
        phone,
        pet
      });
      
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);
export const getUserDetail = createAsyncThunk(
  "userDetail/detail",
  async (id, { getState, rejectWithValue }) => {
    try {
      const {userInfo} = getState().user
      const res = await mainAxiosInstance.get(`/users/detail/${id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.access}`,
        },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "userUpdate/update",
  async (user, { getState, rejectWithValue }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await mainAxiosInstance.put(
        `/users/update_profile/`,
        { user },
        {
          headers,
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  "passwordUpdate/update",
  async (password, { getState, rejectWithValue }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await mainAxiosInstance.put(
        `/users/update_password/`,
        { password },
        {
          headers,
        }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);
export const listUsers = createAsyncThunk(
  "userList/list",
  async (_, { getState, rejectWithValue }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await mainAxiosInstance.get(`/users/users`, {
        headers,
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);
export const deleteUser = createAsyncThunk(
  "userDelete/delete",
  async (id, { getState, rejectWithValue }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await mainAxiosInstance.delete(`/users/delete/${id}`, {
        headers,
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);