import { createAsyncThunk, rejectWithValue } from "@reduxjs/toolkit";



export const listProducts = createAsyncThunk(
    "productList/listProducts",
    async ({query = "", page = "", category = ""},{rejectWithValue}) => {
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
  
  export const listProductDetails = createAsyncThunk(   
      "productDetails/listProductDetails",
      async (id, {rejectWithValue}) => {
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
  export const createProduct = createAsyncThunk(
    "productCreate/createProduct",
    async (product, {rejectWithValue}) => {
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
  
  export const updateProduct = createAsyncThunk(
    "productUpdate/updateProduct",
    async (product, {rejectWithValue}) => {
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
  export const deleteProduct = createAsyncThunk(
    "productDelete/deleteProduct",
    async (id, {rejectWithValue}) => {
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