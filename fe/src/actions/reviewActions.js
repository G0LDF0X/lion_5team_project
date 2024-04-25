import {
    REVIEW_LIST_REQUEST,
    REVIEW_LIST_SUCCESS,
    REVIEW_LIST_FAIL,

    REVIEW_DETAILS_REQUEST,
    REVIEW_DETAILS_SUCCESS,
    REVIEW_DETAILS_FAIL,

} from "../constants/reviewConstants";


export const listReviews = () => async (dispatch) => {
    try {
        dispatch({ type: REVIEW_LIST_REQUEST });

        const response = await fetch('/api/reviews');
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