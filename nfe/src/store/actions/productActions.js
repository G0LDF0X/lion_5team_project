import { createAsyncThunk } from "@reduxjs/toolkit";
import { mainAxiosInstance } from "../../api/axiosInstances";

export const listProducts = createAsyncThunk(
  'products/listProducts',
  async ({ query = '', page = '', category = [], suggestions = '' }, { rejectWithValue }) => {
    try {
      let params = new URLSearchParams();
      if (query) params.append('query', query);
      
      if (page) params.append('page', page);
      if (category.length) {
        category.forEach((cat) => params.append('category', cat));
      }
      console.log(suggestions);
      if (suggestions) {
        params.append('s', suggestions);
      }
      const url = `items?${params.toString()}`;
      const response = await mainAxiosInstance.get(url);
      console.log(response.data);
      return response.data;
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
  async (id, { rejectWithValue }) => {
    try {
      const res = await mainAxiosInstance.get(`/items/detail/${id}`);

      return res.data;
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
  async (product, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const key in product) {
        formData.append(key, product[key]);
      }

      const res = await mainAxiosInstance.post(
        `/items/create/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res.data;
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
  async (product, { rejectWithValue }) => {
    try {
      const res = await mainAxiosInstance.put(
        `/items/update/${product.id}`,
        { product },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return res.data;
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
  async (id, { rejectWithValue }) => {
    try {
      const res = await mainAxiosInstance.delete(`/items/delete/${id}`);

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      );
    }
  }
);
