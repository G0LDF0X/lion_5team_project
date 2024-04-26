import {

BOARD_LIST_REQUEST,
BOARD_LIST_SUCCESS,
BOARD_LIST_FAIL,
BOARD_DETAILS_REQUEST,
BOARD_DETAILS_SUCCESS,
BOARD_DETAILS_FAIL,
BOARD_CREATE_REQUEST,
BOARD_CREATE_SUCCESS,
BOARD_CREATE_FAIL,
BOARD_CREATE_RESET,
} from "../constants/boardConstants";

export const listBoards = () => async (dispatch) => {
try {
    dispatch({ type: BOARD_LIST_REQUEST });

    const response = await fetch("/board");
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

    const response = await fetch(`board/${id}`);
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

export const createBoard = (board) => async (dispatch, getState) => {
try {
    dispatch({
        type: BOARD_CREATE_REQUEST,
    });

    const { userLogin: { userInfo } } = getState();

    const response = await fetch(`/board`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify(board),
    });

    const data = await response.json();

    dispatch({
        type: BOARD_CREATE_SUCCESS,
        payload: data,
    });
}
catch (error) {
    dispatch({
        type: BOARD_CREATE_FAIL,
        payload:
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
    });
}
}