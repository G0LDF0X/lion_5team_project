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

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true }
        case ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload }
        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case ORDER_DETAILS_SUCCESS:
            return { loading: false, order: action.payload, orderItems: action.payload.orderItems, shippingAddress: action.payload.shippingAddress}
        case ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}   

export const myOrderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case MY_ORDER_LIST_REQUEST:
            return { loading: true }
        case MY_ORDER_LIST_SUCCESS:
            return { loading: false, orders: action.payload }
        case MY_ORDER_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}