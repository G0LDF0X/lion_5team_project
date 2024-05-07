import {
  CART_ITEM_LIST_REQUEST,
  CART_ITEM_LIST_SUCCESS,
  CART_ITEM_LIST_FAIL,
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_ADD_ITEM_FAIL,
  CART_REMOVE_ITEM_REQUEST,
  CART_REMOVE_ITEM_SUCCESS,
  CART_REMOVE_ITEM_FAIL,
  CART_QTY_UPDATE_REQUEST,
  CART_QTY_UPDATE_FAIL,
  CART_QTY_UPDATE_SUCCESS,
  CART_SAVE_SHIPPING_ADDRESS,

} from "../constants/cartConstants";


export const cartListReducer = (state = { cartItems: [], shippingAddress:{} }, action) => {
  switch (action.type) {
    case CART_ITEM_LIST_REQUEST:
      return { loading: true, cartItems: [] };
    case CART_ITEM_LIST_SUCCESS:
      return { loading: false, cartItems: action.payload };
    case CART_ITEM_LIST_FAIL:
      return { loading: false, error: action.payload };
      case CART_SAVE_SHIPPING_ADDRESS:
        return {...state, 
          shippingAddress: action.payload,
        };
    default:
      return state;
  }
}
export const cartAddReducer = (state = { cartItems: [] }, action) => {  
  switch (action.type) {
    case CART_ADD_ITEM_REQUEST:
      return { loading: true, cartItems: [] };
    case CART_ADD_ITEM_SUCCESS:
      return { loading: false, cartItems: action.payload, success: true};
    case CART_ADD_ITEM_FAIL:
      return { loading: false, error: action.payload, success: false, fail: true};
    default:
      return state;
  }
}

export const cartRemoveReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_REMOVE_ITEM_REQUEST:
      return { loading: true, cartItems: [] };
    case CART_REMOVE_ITEM_SUCCESS:
      return {
        loading: false,
        cartItems: state.cartItems.filter((x) => x.id !== action.payload),
      };
    case CART_REMOVE_ITEM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const cartQtyUpdateReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_QTY_UPDATE_REQUEST:
      return { loading: true, cartItems: [] };
    case CART_QTY_UPDATE_SUCCESS:
      return { loading: false, cartItems: action.payload };
    case CART_QTY_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
