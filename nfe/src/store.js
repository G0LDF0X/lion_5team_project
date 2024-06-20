import { configureStore } from "@reduxjs/toolkit";

import {
    productListSlice,
    productDetailsSlice,
    productCreateSlice,
    productUpdateSlice,
    productDeleteSlice,
    productQnASlice,
    topProductsSlice
    } from "./store/slices/productSlices";
import {
    reviewListSlice,
    reviewDetailsSlice,
    reviewCreateSlice,
    reviewUpdateSlice,
    reviewDeleteSlice,
    myReviewListSlice
    } from "./store/slices/reviewSlices";
import {
    qnaListSlice,
    qnaDetailsSlice,
    qnaCreateSlice,
    qnaUpdateSlice,
    qnaDeleteSlice,
    qnaAnswerCreateSlice,
    qnaAnswerUpdateSlice,
    } from "./store/slices/qnaSlices";
import {
    userSlice,
    } from "./store/slices/userSlices";
import {
    orderSlice,    
    } from "./store/slices/orderSlices";
// import {
//     cartSlice,
//     cartSaveShippingAddressSlice,
//     cartSavePaymentMethodSlice,
//     } from "./store/slices/cartSlices";
import {
    boardSlice,
    topBoardSlice
    } from "./store/slices/boardSlices";

import {
    bookMarkListSlice,
    bookMarkAddSlice,
    bookMarkRemoveSlice,
    } from "./store/slices/bookMarkSlices";
import { cartSlice } from "./store/slices/cartSlices";


const sotre = configureStore({
  reducer: {
    user: userSlice.reducer,
    productList: productListSlice.reducer,
    productDetails: productDetailsSlice.reducer,
    productCreate: productCreateSlice.reducer,
    productUpdate: productUpdateSlice.reducer,
    productDelete: productDeleteSlice.reducer,
    productQnA: productQnASlice.reducer,
    topProducts: topProductsSlice.reducer,

    reviewList: reviewListSlice.reducer,
    reviewDetails: reviewDetailsSlice.reducer,
    reviewCreate: reviewCreateSlice.reducer,
    reviewUpdate: reviewUpdateSlice.reducer,
    reviewDelete: reviewDeleteSlice.reducer,
    myReviewList: myReviewListSlice.reducer,

    qnaList: qnaListSlice.reducer,
    qnaDetails: qnaDetailsSlice.reducer,
    qnaCreate: qnaCreateSlice.reducer,
    qnaUpdate: qnaUpdateSlice.reducer,
    qnaDelete: qnaDeleteSlice.reducer,
    qnaAnswerCreate: qnaAnswerCreateSlice.reducer,

    // orderCreate: orderCreateSlice.reducer,
    // orderDetails: orderDetailsSlice.reducer,
    // orderPay: orderPaySlice.reducer,
    // orderListMy: orderListMySlice.reducer,
    // orderList: orderListSlice.reducer,
    // orderDeliver: orderDeliverSlice.reducer,

    // cart: cartSlice.reducer,
    // cartSaveShippingAddress: cartSaveShippingAddressSlice.reducer,
    // cartSavePaymentMethod: cartSavePaymentMethodSlice.reducer,

    board: boardSlice.reducer,
    topBoard: topBoardSlice.reducer,
    
    bookMarkList: bookMarkListSlice.reducer,
    bookMarkAdd: bookMarkAddSlice.reducer,
    bookMarkRemove: bookMarkRemoveSlice.reducer,

    cart: cartSlice.reducer,

    order: orderSlice.reducer,
  },
});

export default sotre;