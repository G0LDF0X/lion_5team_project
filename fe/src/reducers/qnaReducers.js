import {
    QNA_LIST_REQUEST,
    QNA_LIST_SUCCESS,
    QNA_LIST_FAIL,

    QNA_DETAILS_REQUEST,
    QNA_DETAILS_SUCCESS,
    QNA_DETAILS_FAIL,

    QNA_CREATE_REQUEST,
    QNA_CREATE_SUCCESS,
    QNA_CREATE_FAIL,
    QNA_CREATE_RESET,
} from "../constants/qnaConstants";


export const qnaListReducer = (state = { qnas: [] }, action) => {
    switch (action.type) {
        case QNA_LIST_REQUEST:
            return { loading: true, qnas: [] };
        case QNA_LIST_SUCCESS:
            return {
                loading: false,
                qnas: action.payload,
            };
        case QNA_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const qnaDetailsReducer = (state = { qna: {} }, action) => {
    switch (action.type) {
        case QNA_DETAILS_REQUEST:
            return { loading: true, ...state };
        case QNA_DETAILS_SUCCESS:
            return { loading: false, qna: action.payload.question , answers: action.payload.answers};
        case QNA_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const qnaCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case QNA_CREATE_REQUEST:
            return { loading: true };
        case QNA_CREATE_SUCCESS:
            return { loading: false, success: true, qna: action.payload };
        case QNA_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case QNA_CREATE_RESET:
            return {};
        default:
            return state;
    }
}