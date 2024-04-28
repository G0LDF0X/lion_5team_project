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
} from '../constants/boardConstants';


export const boardListReducer = (state = { boards: [] }, action) => {
    switch (action.type) {
        case BOARD_LIST_REQUEST:
            return { loading: true, boards: [] };
        case BOARD_LIST_SUCCESS:
            return {
                loading: false,
                boards: action.payload
            };
        case BOARD_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const boardDetailsReducer = (state = { board: { reviews: [] } }, action) => {
    switch (action.type) {
        case BOARD_DETAILS_REQUEST:
            return { ...state, loading: true };
        case BOARD_DETAILS_SUCCESS:
            return { loading: false, board: action.payload };
        case BOARD_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const boardCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case BOARD_CREATE_REQUEST:
            return { loading: true };
        case BOARD_CREATE_SUCCESS:
            return { loading: false, success: true, board: action.payload };
        case BOARD_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case BOARD_CREATE_RESET:
            return {};
        default:
            return state;
    }
}

export const boardUpdateReducer = (state = { board: {} }, action) => {
    switch (action.type) {
        case BOARD_UPDATE_REQUEST:
            return { loading: true };
        case BOARD_UPDATE_SUCCESS:
            return { loading: false, success: true, board: action.payload };
        case BOARD_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case BOARD_UPDATE_RESET:
            return { board: {} };
        default:
            return state;
    }
}