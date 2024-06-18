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

// export const productListSlice = createSlice({
//   name: "productList",
//   initialState: { loading: false, products: [] },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(listProducts.pending, (state) => {
//         state.loading = true;
//         state.products = [];
//       })
//       .addCase(listProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.products = action.payload;
//       })
//       .addCase(listProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// // });
// export const productListSlice = createSlice({
//   name: 'productList',
//   initialState: {
//     products: [],
//     loading: false,
//     error: null,
//     cache: {}, // Initialize cache as an empty object
//     fetchTime: null, // Initialize fetchTime as null
//      totalPages:1, 
//        currentPage:1
//   },

//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(listProducts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(listProducts.fulfilled, (state, action) => {
//         const { data, cacheKey, fromCache, total_page, current_page } = action.payload;
//         state.products = data;
//         state.loading = false;
//         state.totalPages = total_page;
//         state.currentPage = current_page;      
//         if (!fromCache) {
//           state.cache[cacheKey] = data; // Store fetched data in cache
//           state.fetchTime = Date.now(); // Update fetchTime
//         }
        

//       })
//       .addCase(listProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

export const productListSlice = createSlice({
  name: 'productList',
  initialState: {
    products: [],
    loading: false,
    error: null,
    cache: {}, // Initialize cache as an empty object
    fetchTime: null, // Initialize fetchTime as null
    totalPages: 1, 
    currentPage: 1
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listProducts.fulfilled, (state, action) => {
        const { data, cacheKey, fromCache, totalPages, currentPage } = action.payload;
        state.products = data;
        state.loading = false;
        state.totalPages = totalPages;
        state.currentPage = currentPage;      
        if (!fromCache) {
          state.cache[cacheKey] = data; // Store fetched data in cache
          state.fetchTime = Date.now(); // Update fetchTime
        }
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
const initialState = { loading: false, success: false, productQnA: [], error: null, successUpdate: false,successCreate:false}; 
export const productQnASlice = createSlice({  
  name: "productQnA",
  initialState: initialState,
  reducers: {reset : () => initialState,
    getQnA: (state, action) => {
      state.productQnA = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProductQnA.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProductQnA.fulfilled, (state, action) => {
        state.loading = false;
        state.successCreate = true;
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
export const { getQnA } = productQnASlice.actions;