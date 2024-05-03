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

} from "../constants/cartConstants";


export const cartListReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ITEM_LIST_REQUEST:
      return { loading: true, cartItems: [] };
    case CART_ITEM_LIST_SUCCESS:
      return { loading: false, cartItems: action.payload };
    case CART_ITEM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const cartAddReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM_REQUEST:
      return { loading: true, cartItems: [] };
    case CART_ADD_ITEM_SUCCESS:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.item_id === item.item_id  );
      if (existItem) {
        return {
          loading: false,
          cartItems: state.cartItems.map((x) =>
            x.item_id === existItem.item_id ? item : x
          ),
        };
      } else {
        return { loading: false, cartItems: [...state.cartItems, item] };
      }
    case CART_ADD_ITEM_FAIL:
      return { loading: false, error: action.payload };
    case CART_REMOVE_ITEM_REQUEST:
      return { loading: true, cartItems: [] };
    case CART_REMOVE_ITEM_SUCCESS:
      return {
        loading: false,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_REMOVE_ITEM_FAIL:
      return { loading: false, error: action.payload };
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
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_REMOVE_ITEM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
