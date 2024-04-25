import {

QNA_LIST_REQUEST,
QNA_LIST_SUCCESS,
QNA_LIST_FAIL,

QNA_DETAILS_REQUEST,
QNA_DETAILS_SUCCESS,
QNA_DETAILS_FAIL,
} from "../constants/qnaConstants";


export const listQNA = () => async (dispatch) => {
try {
    dispatch({ type: QNA_LIST_REQUEST });

    const response = await fetch(`/qna`);
    const data = await response.json();

    dispatch({
        type: QNA_LIST_SUCCESS,
        payload: data,
    });
} catch (error) {
    dispatch({
        type: QNA_LIST_FAIL,
        payload:
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
    });
}
}

export const listQNADetails = (id) => async (dispatch) => {
try {
    dispatch({ type: QNA_DETAILS_REQUEST });

    const response = await fetch(`/qna//detail/${id}`);
    const data = await response.json();

    dispatch({
        type: QNA_DETAILS_SUCCESS,
        payload: data,
    });
}
catch (error) {
    dispatch({
        type: QNA_DETAILS_FAIL,
        payload:
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
    });
}
}