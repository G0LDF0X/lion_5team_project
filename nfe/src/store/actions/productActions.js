import { createAsyncThunk } from "@reduxjs/toolkit";



export const fetchProducts = createAsyncThunk(
    "productList/listProducts",
    async (query = "", page = "", category = "") => {
      try {
        const categoryParams =
          category === ""
            ? ""
            : category.map((cat) => `category=${cat}`).join("&");
        const res = await fetch(
          `/items?query=${query}&page=${page}&${categoryParams}`
        );
        const data = await res.json();
        return data;
      } catch (error) {
        return rejectWithValue(
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        );
      }
    }
  );
  
  export const fetchProductDetails = createAsyncThunk(   
      "productDetails/listProductDetails",
      async (id) => {
          try {
          const res = await fetch(`/items/detail/${id}`);
          const data = await res.json();
          return data;
          } catch (error) {
          return rejectWithValue(
              error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message
          );
          }
      }
      );
  export const productCreate = createAsyncThunk(
    "productCreate/createProduct",
    async (product) => {
      try {
        const res = await fetch(`/items/create/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });
        const data = await res.json();
        return data;
      } catch (error) {
        return rejectWithValue(
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        );
      }
    }
  );
  
  export const productUpdate = createAsyncThunk(
    "productUpdate/updateProduct",
    async (product) => {
      try {
        const res = await fetch(`/items/update/${product.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });
        const data = await res.json();
        return data;
      } catch (error) {
        return rejectWithValue(
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        );
      }
    }
  );
  export const productDelete = createAsyncThunk(
    "productDelete/deleteProduct",
    async (id) => {
      try {
        const res = await fetch(`/items/delete/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        return data;
      } catch (error) {
        return rejectWithValue(
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        );
      }
    }
  );