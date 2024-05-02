import {
  BookMark_ITEM_LIST_REQUEST,
  BookMark_ITEM_LIST_SUCCESS,
  BookMark_ITEM_LIST_FAIL,
  BookMark_ADD_ITEM_REQUEST,
  BookMark_ADD_ITEM_SUCCESS,
  BookMark_ADD_ITEM_FAIL,
  BookMark_REMOVE_ITEM_REQUEST,
  BookMark_REMOVE_ITEM_SUCCESS,
  BookMark_REMOVE_ITEM_FAIL,
} from "../constants/bookmarkConstants";

export const listBookMark = () => async (dispatch) => {
  dispatch({
    type: BookMark_ITEM_LIST_REQUEST,
  });
  try {
    const { data } = await fetch("/users/bookmark");
    dispatch({
      type: BookMark_ITEM_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BookMark_ITEM_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addToBookMark = (id) => async (dispatch, getState) => {
  dispatch({
    type: BookMark_ADD_ITEM_REQUEST,
  });
  try {
    const {
        userLogin: { userInfo },
        } = getState();
    
    const  res  = await fetch(`/users/bookmark/add/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    });
    const data = await res.json();
    if (res.ok) {
      dispatch({
        type: BookMark_ADD_ITEM_SUCCESS,
        payload: data,
      });
    } else {
      throw new Error(res.message);
    }
  } catch (error) {
    dispatch({
      type: BookMark_ADD_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeFromBookMark = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BookMark_REMOVE_ITEM_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const  res  = await fetch(`/users/bookmark/delete/${id}/`, config);
    
    if (res.ok) {
      dispatch({
        type: BookMark_REMOVE_ITEM_SUCCESS,

      });
    } else {
      throw new Error(res.message);
    }
  } catch (error) {
    dispatch({
      type: BookMark_REMOVE_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
