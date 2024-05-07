import {
  CART_ITEM_LIST_REQUEST,
  CART_ITEM_LIST_SUCCESS,
  CART_ITEM_LIST_FAIL,
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_ADD_ITEM_FAIL,
  CART_REMOVE_ITEM_REQUEST,
  CART_REMOVE_ITEM_SUCCESS,
  CART_REMOVE_ITEM_FAIL,
  CART_QTY_UPDATE_REQUEST,
  CART_QTY_UPDATE_FAIL, 
  CART_QTY_UPDATE_SUCCESS,
  CART_SAVE_SHIPPING_ADDRESS
} from "../constants/cartConstants";

export const listCartItems = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_ITEM_LIST_REQUEST });
    const {
      userLogin: { userInfo }
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const res = await fetch(`/order/cart/`, config);
    const data = await res.json();
    dispatch({ type: CART_ITEM_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CART_ITEM_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
}

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_ADD_ITEM_REQUEST });
    const {
      userLogin: { userInfo }
    } = getState();
    const config = {  
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
      body: JSON.stringify({ qty }),
    };
    const res = await fetch(`/order/cart/${id}/`, config);
    const data = await res.json();
    dispatch({
      type: CART_ADD_ITEM_SUCCESS,
      payload: data,
    });
    dispatch(listCartItems());
  } catch (error) {
    dispatch({
      type: CART_ADD_ITEM_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
}

export const removeFromCart = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_REMOVE_ITEM_REQUEST });
    const {
      userLogin: { userInfo }
    } = getState();
    const config = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const res = await fetch(`/order/cart/remove/${id}/`, config);
    dispatch({
      type: CART_REMOVE_ITEM_SUCCESS,
      payload: res.json(),
    });
  }
  catch (error) {
    dispatch({
      type: CART_REMOVE_ITEM_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
}

export const updateQty = (id, qty) => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_QTY_UPDATE_REQUEST });
    const {
      userLogin: { userInfo }
    } = getState();
    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
      body: JSON.stringify({ qty }),
    };
    const res = await fetch(`/order/cart/update/${id}/`, config);
    const data = await res.json();
    dispatch({
      type: CART_QTY_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch(listCartItems());
  } catch (error) {
    dispatch({
      type: CART_QTY_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
}
