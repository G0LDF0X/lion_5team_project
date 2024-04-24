import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
//   productDetailsReducer,
//   productDeleteReducer,
//   productCreateReducer,
//   productUpdateReducer,
//   productReviewCreateReducer,
//   productTopRatedReducer,
} from "./reducers/ProductReducers";
// import { cartReducer } from "./reducers/cartReducers";
// import {
//   userLoginReducer,
//   userRegisterReducer,
//   userDetailsReducer,
//   userUpdateProfileReducer,
//   userListReducer,
//   userDeleteReducer,
//   userUpdateReducer,
// } from "./reducers/userReducers";
// import {
//   orderCreateReducer,
//   orderDetailsReducer,
//   orderPayReducer,
//   orderListMyReducer,
//   orderListReducer,
//   orderDeliverReducer,
// } from "./reducers/OrderReducers";

const reducer = combineReducers({
  productList: productListReducer,
//   productDetails: productDetailsReducer,
//   productUpdate: productUpdateReducer,
//   productDelete: productDeleteReducer,
//   productCreate: productCreateReducer,
//   productReviewCreate: productReviewCreateReducer, 
//   productTopRated : productTopRatedReducer,
  
//   cart: cartReducer,
//   userLogin: userLoginReducer,
//   userRegister: userRegisterReducer,
//   userDetails: userDetailsReducer,
//   userUpdateProfile: userUpdateProfileReducer,
//   userList: userListReducer,
//   userDelete: userDeleteReducer,
//   userUpdate: userUpdateReducer,

//   orderCreate: orderCreateReducer,
//   orderDetails: orderDetailsReducer,
//   orderPay: orderPayReducer,
//   orderListMY: orderListMyReducer,
//   orderList: orderListReducer,
//   orderDeliver: orderDeliverReducer,
});


const initialState = {
//   cart: {
//     cartItems: cartItemsFromStorage,
//     shippingAddress: shippingAddressFromStorage,
//   },
//   userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
