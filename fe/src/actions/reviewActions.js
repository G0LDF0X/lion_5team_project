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


export const listReviews = () => async (dispatch) => {
    try {
        dispatch({ type: REVIEW_LIST_REQUEST });

        const response = await fetch('/items/reviews');
        const data = await response.json();

        dispatch({
            type: REVIEW_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: REVIEW_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}
    
export const listReviewDetails = (id) => async (dispatch) => {  
    try {
        dispatch({ type: REVIEW_DETAILS_REQUEST });

        const response = await fetch(`/api/reviews/${id}`);
        const data = await response.json();

        dispatch({
            type: REVIEW_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: REVIEW_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export const createReview = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: REVIEW_CREATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const response = await fetch(`/items/review/create/${id}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`,
            },
        });

        const data = await response.json();

        if (response.ok) {
            dispatch({
                type: REVIEW_CREATE_SUCCESS,
                payload: data,
            });
        } else {
            dispatch({
                type: REVIEW_CREATE_FAIL,
                payload:
                    data && data.message ? data.message : 'Review creation failed',
            });
        }
    } catch (error) {
        dispatch({
            type: REVIEW_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export const updateReview = (review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: REVIEW_UPDATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const response = await fetch(`/api/reviews/${review.id}/edit`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`,
            },
            body: JSON.stringify(review),
        });

        const data = await response.json();

        if (response.ok) {
            dispatch({
                type: REVIEW_UPDATE_SUCCESS,
                payload: data,
            });
        } else {
            dispatch({
                type: REVIEW_UPDATE_FAIL,
                payload:
                    data && data.message ? data.message : 'Review update failed',
            });
        }
    } catch (error) {
        dispatch({
            type: REVIEW_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export const deleteReview = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: REVIEW_DELETE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const response = await fetch(`/api/reviews/${id}/delete`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${userInfo.access}`,
            },
        });

        if (response.ok) {
            dispatch({
                type: REVIEW_DELETE_SUCCESS,
            });
        } else {
            dispatch({
                type: REVIEW_DELETE_FAIL,
                payload: 'Review deletion failed',
            });
        }
    } catch (error) {
        dispatch({
            type: REVIEW_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}