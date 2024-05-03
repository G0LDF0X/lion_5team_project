import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_RESET,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
} from "../constants/userConstants";

export const login = (id, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch("/app/token/", {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({ 'username': id, 'password': password }),
    });

    const data = await response.json();

    if (response.ok) {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: data && data.message ? data.message : "Login failed",
      });
    }

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DETAILS_RESET });
    // dispatch({ type: ORDER_LIST_MY_RESET });
    // dispatch({ type: USER_LIST_RESET });
}


export const register = (name, email, password, nickname, adress, phone) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(
            "/app/register/",
            {
                method: "POST",
                headers: config.headers,

                body: JSON.stringify({ 'username':name, 'email':email, 'password':password, 'nickname':nickname, 'address':adress, 'phone':phone }),

//                 body: JSON.stringify({ 'username':name, 'email':email, 'password':password, 'password2':confirmPassword }),
// >>>>>>> 3a8bdc2dee71f9e87e70abc6a59a0adeafa739a2
            }
        );

        const data = await response.json();

        if (response.ok) {
            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: data,
            });

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data,
            });

            localStorage.setItem("userInfo", JSON.stringify(data));
        } else {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload:
                    data && data.message ? data.message : "Registration failed",
            });
        } 
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}


export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });
        const {
          userLogin: { userInfo },
      } = getState();
        const response = await fetch(`/user/${id}/`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().userLogin.userInfo.access}`,
            },
        });

        const data = await response.json();

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}