import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  myProductListReducer,
  //   productReviewCreateReducer,
  //   productTopRatedReducer,
} from "./reducers/productReducers";
import {
  reviewListReducer,
  reviewDetailsReducer,
  reviewCreateReducer,
  reviewDeleteReducer,
  reviewUpdateReducer,
  myReviewListReducer,
} from "./reducers/reviewReducers";
import {
  cartListReducer,
  cartAddReducer,
  cartRemoveReducer,
  cartQtyUpdateReducer,
} from "./reducers/cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userUpdatePasswordReducer,
  sellerListReducer,
  userListReducer,
  //   userDeleteReducer,
  //   userUpdateReducer,
} from "./reducers/userReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  //   orderPayReducer,
  //   orderListMyReducer,
  // orderListReducer,
  myOrderListReducer,
  //   orderDeliverReducer,
  shippingAddressReducer,
  orderReducer,
} from "./reducers/orderReducers";

import {
  qnaListReducer,
  qnaDetailsReducer,
  qnaCreateReducer,
  qnaAnswerCreateReducer,
  qnaAnswerDetailsReducer,
  qnaDeleteReducer,
  qnaUpdateReducer,
  qnaAnswerUpdateReducer
} from "./reducers/qnaReducers";

import {
  boardListReducer,
  boardDetailsReducer,
  boardCreateReducer,
  boardUpdateReducer,
  boardDeleteReducer,
} from "./reducers/boardReducers";

import {
  bookMarkListReducer,
  bookMarkAddReducer,
  bookMarkRemoveReducer,
} from "./reducers/bookmarkReducer";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  myProductList: myProductListReducer,

  cartList: cartListReducer,
  cartAdd: cartAddReducer,
  cartRemove: cartRemoveReducer,
  cartQtyUpdate: cartQtyUpdateReducer,

  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdatePassword: userUpdatePasswordReducer,
  sellerList: sellerListReducer,
  userList: userListReducer,
  //   userDelete: userDeleteReducer,
  //   userUpdate: userUpdateReducer,

  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  //   orderPay: orderPayReducer,
  //   orderListMY: orderListMyReducer,
  myOrderList: myOrderListReducer,
  //   orderDeliver: orderDeliverReducer,
  shippingAddress: shippingAddressReducer,
  getOrder: orderReducer,

  reviewList: reviewListReducer,
  reviewDetail: reviewDetailsReducer,
  reviewCreate: reviewCreateReducer,
  reviewDelete: reviewDeleteReducer,
  reviewUpdate: reviewUpdateReducer,
  myReviewList: myReviewListReducer,

  qnaList: qnaListReducer,
  qnaDetails: qnaDetailsReducer,
  qnaCreate: qnaCreateReducer,
  qnaAnswerCreate: qnaAnswerCreateReducer,
  qnaAnswerDetails: qnaAnswerDetailsReducer,
  qnaUpdate: qnaUpdateReducer,
  qnaDelete: qnaDeleteReducer,
  qnaAnswerUpdate: qnaAnswerUpdateReducer,

  boardList: boardListReducer,
  boardDetails: boardDetailsReducer,
  boardCreate: boardCreateReducer,
  boardUpdate: boardUpdateReducer,
  boardDelete: boardDeleteReducer,

  bookMarkList: bookMarkListReducer,
  bookMarkAdd: bookMarkAddReducer,
  bookMarkRemove: bookMarkRemoveReducer,
});


const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
