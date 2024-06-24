import { createAsyncThunk } from "@reduxjs/toolkit";
import { mainAxiosInstance } from "../../api/axiosInstances";

const handleError = (error) => {
  if (error.response && error.response.data) {
    const data = error.response.data;
    if (data.detail) {
      return { detail: data.detail }; // 상세 오류 메시지 반환
    } else if (data.username) {
      return { detail: data.username[0] };
    } else if (data.nickname) {
      return { detail: data.nickname[0] }; // 닉네임 중복 오류 처리
    }
  }
  return { detail: error.message || 'An unknown error occurred' };
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
      console.log("Error detail:", error.response?.data?.detail);
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
        user ,
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
  async ({ current_password, new_password }, { getState, rejectWithValue }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await mainAxiosInstance.put(
        `/users/updatePassword/`,
        { current_password, new_password },
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

export const deleteUserAccount = createAsyncThunk(
  "user/deleteAccount",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { userInfo } = getState().user;
      const response = await mainAxiosInstance.delete("/users/delete_account/", {
        headers: {
          Authorization: `Bearer ${userInfo.access}`,  
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);