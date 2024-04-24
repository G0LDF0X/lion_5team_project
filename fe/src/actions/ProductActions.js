import { 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
 } from '../constants/ProductConstants';



 export const listProducts = (query = '', page='') => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const res = await fetch(`/api/products?query=${query}&page=${page}`);
      const data = await res.json();
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
      });
    }
  };