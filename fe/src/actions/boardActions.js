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
BOARD_UPDATE_REQUEST,
BOARD_UPDATE_SUCCESS,
BOARD_UPDATE_FAIL,
BOARD_UPDATE_RESET,
BOARD_DELETE_REQUEST,
BOARD_DELETE_SUCCESS,
BOARD_DELETE_FAIL,
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

    const response = await fetch(`/board/detail/${id}`);
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

    const response = await fetch(`/board/create/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
        },
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

export const updateBoard = (board) => async (dispatch, getState) => {
try {
    dispatch({
        type: BOARD_UPDATE_REQUEST,
    });

    const { userLogin: { userInfo } } = getState();

    const response = await fetch(`/board/update/${board.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify(board),
    });

    const data = await response.json();

    dispatch({
        type: BOARD_UPDATE_SUCCESS,
        payload: data,
    });
}
catch (error) {
    dispatch({
        type: BOARD_UPDATE_FAIL,
        payload:
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
    });
}
}


export const deleteBoard = (id) => async (dispatch, getState) => {
try {
    dispatch({
        type: BOARD_DELETE_REQUEST,
    });

    const { userLogin: { userInfo } } = getState();

    const response = await fetch(`/board/delete/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    });

    dispatch({
        type: BOARD_DELETE_SUCCESS,
    });
}
catch (error) {
    dispatch({
        type: BOARD_DELETE_FAIL,
        payload:
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
    });
}
}