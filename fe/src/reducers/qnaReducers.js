import {
    QNA_LIST_REQUEST,
    QNA_LIST_SUCCESS,
    QNA_LIST_FAIL,

    QNA_DETAILS_REQUEST,
    QNA_DETAILS_SUCCESS,
    QNA_DETAILS_FAIL,
} from "../constants/qnaConstants";


export const qnaListReducer = (state = { qnas: [] }, action) => {
    switch (action.type) {
        case QNA_LIST_REQUEST:
            return { loading: true, qnas: [] };
        case QNA_LIST_SUCCESS:
            return {
                loading: false,
                qnas: action.payload.qnas,
                page: action.payload.page,
                pages: action.payload.pages,
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
            return { loading: false, qna: action.payload };
        case QNA_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}