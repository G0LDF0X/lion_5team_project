import {
    TAG_LIST_REQUEST,
    TAG_LIST_SUCCESS,
    TAG_LIST_FAIL
} from '../constants/tagConstants'

export const listTags = () => async (dispatch) => {
    try {
        dispatch({ type: TAG_LIST_REQUEST })
        res = await fetch ('/api/tags')
        data = await res.json()
        dispatch({
            type: TAG_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: TAG_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

