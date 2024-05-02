import {
    REVIEW_LIST_REQUEST,
    REVIEW_LIST_SUCCESS,
    REVIEW_LIST_FAIL,

    REVIEW_DETAILS_REQUEST,
    REVIEW_DETAILS_SUCCESS,
    REVIEW_DETAILS_FAIL,

    REVIEW_DELETE_REQUEST,
    REVIEW_DELETE_SUCCESS,
    REVIEW_DELETE_FAIL,

    REVIEW_CREATE_REQUEST,
    REVIEW_CREATE_SUCCESS,
    REVIEW_CREATE_FAIL,
    REVIEW_CREATE_RESET,

    REVIEW_UPDATE_REQUEST,
    REVIEW_UPDATE_SUCCESS,
    REVIEW_UPDATE_FAIL,
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


export const reviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case REVIEW_CREATE_REQUEST:
            return { loading: true };
        case REVIEW_CREATE_SUCCESS:
            return { loading: false, success: true, createdReview: action.payload };
        case REVIEW_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case REVIEW_CREATE_RESET:
            return {};
        default:
            return state;
    }
}

export const reviewUpdateReducer = (state = { review: {} }, action) => {
    switch (action.type) {
        case REVIEW_UPDATE_REQUEST:
            return { loading: true };
        case REVIEW_UPDATE_SUCCESS:
            return { loading: false, success: true, review: action.payload };
        case REVIEW_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const reviewDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case REVIEW_DELETE_REQUEST:
            return { loading: true };
        case REVIEW_DELETE_SUCCESS:
            return { loading: false, success: true };
        case REVIEW_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}
