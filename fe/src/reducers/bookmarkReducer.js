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

export const bookMarkListReducer = (state = { bookMarkItems: [] }, action) => {
    switch (action.type) {
        case BookMark_ITEM_LIST_REQUEST:
            return { loading: true, bookMarkItems: [] };
        case BookMark_ITEM_LIST_SUCCESS:
            return { loading: false, bookMarkItems: action.payload, success: true};
        case BookMark_ITEM_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const bookMarkAddReducer = (state = {}, action) => {
    switch (action.type) {
        case BookMark_ADD_ITEM_REQUEST:
            return { loading: true };
        case BookMark_ADD_ITEM_SUCCESS:
            return { loading: false, success: true, bookMarkItems: action.payload };
        case BookMark_ADD_ITEM_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const bookMarkRemoveReducer = (state = {}, action) => {
    switch (action.type) {
        case BookMark_REMOVE_ITEM_REQUEST:
            return { loading: true };
        case BookMark_REMOVE_ITEM_SUCCESS:
            return { loading: false, success: true, bookMarkItems: action.payload };
        case BookMark_REMOVE_ITEM_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}
