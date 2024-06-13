import { createSlice } from "@reduxjs/toolkit";
import {
  listProducts,
  listProductDetails,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductQnA,
  updateProductQnA,
  deleteProductQnA,
} from "../actions/productActions";

export const productListSlice = createSlice({
  name: "productList",
  initialState: { loading: false, products: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listProducts.pending, (state) => {
        state.loading = true;
        state.products = [];
      })
      .addCase(listProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(listProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: { loading: false, product: {}, error: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listProductDetails.pending, (state) => {
        state.loading = true;
        state.product = {};
        state.error = "";
      })
      .addCase(listProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(listProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const productCreateSlice = createSlice({
  name: "productCreate",
  initialState: { loading: false, success: false, product: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.product = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const productUpdateSlice = createSlice({
  name: "productUpdate",
  initialState: { loading: false, success: false, product: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.product = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const productDeleteSlice = createSlice({
  name: "productDelete",
  initialState: { loading: false, success: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
const initialState = { loading: false, success: false, productQnA: [], error: null, successUpdate: false,}; 
export const productQnASlice = createSlice({  
  name: "productQnA",
  initialState: initialState,
  reducers: {reset : () => initialState,},
  extraReducers: (builder) => {
    builder
      .addCase(createProductQnA.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProductQnA.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.productQnA = action.payload;
      })
      .addCase(createProductQnA.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProductQnA.pending, (state) => {
        state.loading = true;
      }
      )
      .addCase(updateProductQnA.fulfilled, (state, action) => {
        state.loading = false;
        state.successUpdate = true;
        state.productQnA = action.payload;
      }
      )
      .addCase(updateProductQnA.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
      )
      .addCase(deleteProductQnA.pending, (state) => {
        state.loading = true;
      }
      )
      .addCase(deleteProductQnA.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      }
      )
      .addCase(deleteProductQnA.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

      });
  },
});
export const { reset: productQnaReset } = productQnASlice.actions;