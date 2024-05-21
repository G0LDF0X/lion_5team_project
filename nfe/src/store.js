import { configureStore } from "@reduxjs/toolkit";

import {
    productListSlice,
    productDetailsSlice,
    productCreateSlice,
    productUpdateSlice,
    productDeleteSlice,
    } from "./store/slices/productSlices";
import {
    reviewListSlice,
    reviewDetailsSlice,
    reviewCreateSlice,
    reviewUpdateSlice,
    reviewDeleteSlice,
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
    userLoginSlice,
    userRegisterSlice,
    userLogoutSlice,
    userDetailsSlice,
    userUpdateSlice,
    passwordUpdateSlice,
    userListSlice,
    userDeleteSlice,
    } from "./store/slices/userSlices";
// import {
//     orderCreateSlice,
//     orderDetailsSlice,
//     orderPaySlice,
//     orderListMySlice,
//     orderListSlice,
//     orderDeliverSlice,
//     } from "./store/slices/orderSlices";
// import {
//     cartSlice,
//     cartSaveShippingAddressSlice,
//     cartSavePaymentMethodSlice,
//     } from "./store/slices/cartSlices";
import {
    boardListSlice,
    boardDetailsSlice,
    boardCreateSlice,
    boardUpdateSlice,
    boardDeleteSlice,
    boardReplySlice
    } from "./store/slices/boardSlices";



const sotre = configureStore({
  reducer: {
    productList: productListSlice.reducer,
    productDetails: productDetailsSlice.reducer,
    productCreate: productCreateSlice.reducer,
    productUpdate: productUpdateSlice.reducer,
    productDelete: productDeleteSlice.reducer,


    reviewList: reviewListSlice.reducer,
    reviewDetails: reviewDetailsSlice.reducer,
    reviewCreate: reviewCreateSlice.reducer,
    reviewUpdate: reviewUpdateSlice.reducer,
    reviewDelete: reviewDeleteSlice.reducer,

    qnaList: qnaListSlice.reducer,
    qnaDetails: qnaDetailsSlice.reducer,
    qnaCreate: qnaCreateSlice.reducer,
    qnaUpdate: qnaUpdateSlice.reducer,
    qnaDelete: qnaDeleteSlice.reducer,
    qnaAnswerCreate: qnaAnswerCreateSlice.reducer,

    userLogin: userLoginSlice.reducer,
    userRegister: userRegisterSlice.reducer,
    userDetails: userDetailsSlice.reducer,
    userList: userListSlice.reducer,
    userDelete: userDeleteSlice.reducer,
    userUpdate: userUpdateSlice.reducer,
    passwordUpdate: passwordUpdateSlice.reducer,
    userLogout: userLogoutSlice.reducer,
    

    // orderCreate: orderCreateSlice.reducer,
    // orderDetails: orderDetailsSlice.reducer,
    // orderPay: orderPaySlice.reducer,
    // orderListMy: orderListMySlice.reducer,
    // orderList: orderListSlice.reducer,
    // orderDeliver: orderDeliverSlice.reducer,

    // cart: cartSlice.reducer,
    // cartSaveShippingAddress: cartSaveShippingAddressSlice.reducer,
    // cartSavePaymentMethod: cartSavePaymentMethodSlice.reducer,

    boardList: boardListSlice.reducer,
    boardDetails: boardDetailsSlice.reducer,
    boardCreate: boardCreateSlice.reducer,
    boardUpdate: boardUpdateSlice.reducer,
    boardDelete: boardDeleteSlice.reducer,
    boardReply: boardReplySlice.reducer,
    
  },
});

export default sotre;