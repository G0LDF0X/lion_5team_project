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
} from "../constants/cartConstants";

export const listCartItems = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_ITEM_LIST_REQUEST });
    const res = await fetch(`/cart/`, {
      headers: {
        // Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    });
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
    const res = await fetch(`/items/detail/${id}`);
    const data = await res.json();
    dispatch({
      type: CART_ADD_ITEM_SUCCESS,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
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

export const removeFromCart = (id) => (dispatch, getState) => {
  try {
    dispatch({ type: CART_REMOVE_ITEM_REQUEST });
    dispatch({
      type: CART_REMOVE_ITEM_SUCCESS,
      payload: id,
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
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