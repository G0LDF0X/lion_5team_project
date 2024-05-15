import { configureStore } from "@reduxjs/toolkit";
import {
    productListSlice,
    productDetailsSlice,
    productCreateSlice,
    productUpdateSlice,
    productDeleteSlice,
    } from "./store/slices/productSlices";

export const sotre = configureStore({
  reducer: {
    productList: productListSlice.reducer,
    productDetails: productDetailsSlice.reducer,
    productCreate: productCreateSlice.reducer,
    productUpdate: productUpdateSlice.reducer,
    productDelete: productDeleteSlice.reducer,
  },
});
