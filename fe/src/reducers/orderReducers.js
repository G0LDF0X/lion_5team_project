import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    MY_ORDER_LIST_REQUEST,
    MY_ORDER_LIST_SUCCESS,
    MY_ORDER_LIST_FAIL,

    SHIPPING_ADDRESS_REQUEST,
    SHIPPING_ADDRESS_SUCCESS,
    SHIPPING_ADDRESS_FAIL,

    ORDER_REQUEST,
    ORDER_SUCCESS,
    ORDER_FAIL,
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

export const shippingAddressReducer = (state = { address: {} }, action) => {
    switch (action.type) {
        case SHIPPING_ADDRESS_REQUEST:
            return { loading: true }
        case SHIPPING_ADDRESS_SUCCESS:
            return { loading: false, address: action.payload }
        case SHIPPING_ADDRESS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const orderReducer = (state = { orderInfo: {} }, action) => {
    switch (action.type) {
        case ORDER_REQUEST:
            return { ...state, loading: true };
        case ORDER_SUCCESS:
            return { loading: false, orderInfo: action.payload };
        case ORDER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};