import {
    REVIEW_LIST_REQUEST,
    REVIEW_LIST_SUCCESS,
    REVIEW_LIST_FAIL,

    REVIEW_DETAILS_REQUEST,
    REVIEW_DETAILS_SUCCESS,
    REVIEW_DETAILS_FAIL,
} from "../constants/reviewConstants";

export const reviewListReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
        case REVIEW_LIST_REQUEST:
            return { loading: true, reviews: [] };
        case REVIEW_LIST_SUCCESS:
            return { loading: false, reviews: action.payload };
        case REVIEW_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const reviewDetailsReducer = (state = { review: {} }, action) => {
    switch (action.type) {
        case REVIEW_DETAILS_REQUEST:
            return { loading: true, ...state };
        case REVIEW_DETAILS_SUCCESS:
            return { loading: false, review: action.payload };
        case REVIEW_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}