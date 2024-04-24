import {

BOARD_LIST_REQUEST,
BOARD_LIST_SUCCESS,
BOARD_LIST_FAIL,
BOARD_DETAILS_REQUEST,
BOARD_DETAILS_SUCCESS,
BOARD_DETAILS_FAIL,
} from "../constants/boardConstants";

export const listBoard = () => async (dispatch) => {
try {
    dispatch({ type: BOARD_LIST_REQUEST });

    const response = await fetch("/api/boards");
    const data = await response.json();

    dispatch({
        type: BOARD_LIST_SUCCESS,
        payload: data,
    });
} catch (error) {
    dispatch({
        type: BOARD_LIST_FAIL,
        payload:
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
    });
}
}

export const listBoardDetails = (id) => async (dispatch) => {
try {
    dispatch({ type: BOARD_DETAILS_REQUEST });

    const response = await fetch(`/api/boards/${id}`);
    const data = await response.json();

    dispatch({
        type: BOARD_DETAILS_SUCCESS,
        payload: data,
    });
} catch (error) {
    dispatch({
        type: BOARD_DETAILS_FAIL,
        payload:
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
    });
}
}
