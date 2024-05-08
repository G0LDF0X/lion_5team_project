import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    MY_ORDER_LIST_REQUEST,
    MY_ORDER_LIST_SUCCESS,
    MY_ORDER_LIST_FAIL
} from '../constants/orderConstants'

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })
        const {
            userLogin: { userInfo },
        } = getState(); 
        const res = await fetch(`/order/payment/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            },
            body: JSON.stringify(order)
        })

        const data = await res.json()

        if (res.ok) {
            dispatch({
                type: ORDER_CREATE_SUCCESS,
                payload: data
            })
        } else {
            dispatch({
                type: ORDER_CREATE_FAIL,
                payload: data.message
            })
        }
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.message
        })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })
        const {
            userLogin: { userInfo },
        } = getState();
        
        const res = await fetch(`/order/detail/${id}`, {
            headers: {
                Authorization: `Bearer ${userInfo.access}`
            }
        })

        const data = await res.json()

        if (res.ok) {
            dispatch({
                type: ORDER_DETAILS_SUCCESS,
                payload: data
            })
        } else {
            dispatch({
                type: ORDER_DETAILS_FAIL,
                payload: data.message
            })
        }
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.message
        })
    }
}


export const getMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: MY_ORDER_LIST_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState();

        const res = await fetch(`/order/myorderlist/`, {
            headers: {
                Authorization: `Bearer ${userInfo.access}`
            }
        })

        const data = await res.json()

        if (res.ok) {
            dispatch({
                type: MY_ORDER_LIST_SUCCESS,
                payload: data
            })
        } else {
            dispatch({
                type: MY_ORDER_LIST_FAIL,
                payload: data.message
            })
        }
    } catch (error) {
        dispatch({
            type: MY_ORDER_LIST_FAIL,
            payload: error.message
        })
    }
}