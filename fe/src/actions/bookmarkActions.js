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
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
}

export const addToBookMark = (id) => async (dispatch, getState) => {
    dispatch({
        type: BookMark_ADD_ITEM_REQUEST,
        payload: id,
    });
    try {
        const { data } = await fetch(`/api/bookmark/${id}`);
        dispatch({
            type: BookMark_ADD_ITEM_SUCCESS,
            payload: data,
        });
        localStorage.setItem("bookMarkItems", JSON.stringify(getState().bookMark.bookMarkItems));
    } catch (error) {
        dispatch({
            type: BookMark_ADD_ITEM_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
}

export const removeFromBookMark = (id) => (dispatch, getState) => {
    try {
        dispatch({
            type: BookMark_REMOVE_ITEM_REQUEST,
            payload: id,
        });
        dispatch({
            type: BookMark_REMOVE_ITEM_SUCCESS,
            payload: id,
        });
        localStorage.setItem("bookMarkItems", JSON.stringify(getState().bookMark.bookMarkItems));
    }
    catch (error) {
        dispatch({
            type: BookMark_REMOVE_ITEM_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
}