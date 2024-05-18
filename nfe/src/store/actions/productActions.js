import { createAsyncThunk } from "@reduxjs/toolkit";
import { mainAxiosInstance } from "../../api/axiosInstances";


export const listProducts = createAsyncThunk(
  'products/listProducts',
  async ({ query = "", page = "", category = [] }, { rejectWithValue }) => {
    try {
      let params = new URLSearchParams();
      if (query) params.append('query', query);
      if (page) params.append('page', page);
      if (category.length) {
        category.forEach(cat => params.append('category', cat));
      }

      const url = `/items?${params.toString()}`;
      console.log("Request URL:", url); // Log the URL for debugging

      const response = await mainAxiosInstance.get(url);
      console.log(response.data); // Log the response for debugging
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Response error:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('Request error:', error.request);
      } else {
        console.error('General error:', error.message);
      }

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