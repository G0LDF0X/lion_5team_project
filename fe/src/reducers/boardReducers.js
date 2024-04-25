import {
    BOARD_LIST_REQUEST,
    BOARD_LIST_SUCCESS,
    BOARD_LIST_FAIL,
    BOARD_DETAILS_REQUEST,
    BOARD_DETAILS_SUCCESS,
    BOARD_DETAILS_FAIL,
} from '../constants/boardConstants';


export const boardListReducer = (state = { boards: [] }, action) => {
    switch (action.type) {
        case BOARD_LIST_REQUEST:
            return { loading: true, boards: [] };
        case BOARD_LIST_SUCCESS:
            return {
                loading: false,
                boards: action.payload.boards,
                page: action.payload.page,
                pages: action.payload.pages,
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