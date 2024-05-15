import { createSlice } from "reduxjs/toolkit";
import {
  fetchProducts,
  fetchProductDetails,
  productCreate,
  productUpdate,
} from "../actions/productActions";
export const productListSlice = createSlice({
  name: "productList",
  initialState: { loading: false, products: [] },
  reducers: {
    [fetchProducts.pending]: (state) => {
      state.loading = true;
      state.products = [];
      state.error = "";
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: { loading: false, product: {}, e },
  reducers: {
    [fetchProductDetails.pending]: (state) => {
      state.loading = true;
      state.product = {};
      state.error = "";
    },
    [fetchProductDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    [fetchProductDetails.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const productCreateSlice = createSlice({
  name: "productCreate",
  initialState: { loading: false, success: false, product: {} },
  reducers: {
    [productCreate.pending]: (state) => {
      state.loading = true;
    },
    [productCreate.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.product = action.payload;
    },
    [productCreate.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    productCreateReset: (state) => {
      state.product = {};
    },
  },
});

export const productUpdateSlice = createSlice({
  name: "productUpdate",
  initialState: { loading: false, success: false, product: {} },
  reducers: {
    [productUpdate.pending]: (state) => {
      state.loading = true;
    },
    [productUpdate.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.product = action.payload;
    },
    [productUpdate.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    productUpdateReset: (state) => {
      state.product = {};
    },
  },
});

export const productDeleteSlice = createSlice({
  name: "productDelete",
  initialState: { loading: false, success: false },
  reducers: {
    productDeleteRequest: (state) => {
      state.loading = true;
    },
    productDeleteSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    productDeleteFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
