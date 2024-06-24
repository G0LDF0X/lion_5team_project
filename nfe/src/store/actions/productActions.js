import { createAsyncThunk } from "@reduxjs/toolkit";
import { mainAxiosInstance, recommendationAxiosInstance } from "../../api/axiosInstances";

const getAuthHeaders = (getState) => {
  const {
    user: { userInfo },
  } = getState();
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userInfo.access}`,
  };
};
export const listProducts = createAsyncThunk(
  'products/listProducts',
  async ({ query = '', page = 1, category = [] }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const cacheKey = `${query}-${page}-${category.join(',')}`;
      const fetchTime = state.productList.fetchTime;

      if (state.productList.cache[cacheKey] && fetchTime && (Date.now() - fetchTime) < 1000 * 60 * 5) {
        return { data: state.productList.cache[cacheKey], cacheKey, fromCache: true, totalPages: state.productList.totalPages, currentPage: state.productList.currentPage };
      }

      let params = new URLSearchParams();
      if (query) params.append('query', query);
      if (page) params.append('page', page);
      if (category.length) {
        category.forEach((cat) => params.append('category', cat));
      }

      const url = `items/?${params.toString()}`;
      const response = await mainAxiosInstance.get(url);
      const { items, total_pages, current_page } = response.data;

      return { data: items, cacheKey, fromCache: false, totalPages: total_pages, currentPage: current_page };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const listMyProducts = createAsyncThunk(
  'products/listMyProducts',
  async ({ query = '', page = 1, category = [] }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const cacheKey = `my-${query}-${page}-${category.join(',')}`;
      const fetchTime = state.productList.fetchTime;

      if (state.productList.cache[cacheKey] && fetchTime && (Date.now() - fetchTime) < 1000 * 60 * 5) {
        return { data: state.productList.cache[cacheKey], cacheKey, fromCache: true, totalPages: state.productList.totalPages, currentPage: state.productList.currentPage };
      }

      let params = new URLSearchParams();
      if (query) params.append('query', query);
      if (page) params.append('page', page);
      if (category.length) {
        category.forEach((cat) => params.append('category', cat));
      }

      const url = `items/myitems?${params.toString()}`;
      const headers = getAuthHeaders(getState); // 인증 헤더 설정
      const response = await mainAxiosInstance.get(url, { headers });

      console.log('listMyProducts response:', response.data); // API 응답 데이터 로그
      
      const { items, total_pages, current_page } = response.data;

      return { data: items, cacheKey, fromCache: false, totalPages: total_pages, currentPage: current_page };
    } catch (error) {
      return rejectWithValue(error.response.data);
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
  async (product, { rejectWithValue, getState }) => {
    try {
      const {
        user: { userInfo },
      } = getState();

      
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
            "Authorization": `Bearer ${userInfo.access}`,
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
export const createProductQnA = createAsyncThunk(
  "productQnACreate/createProductQnA",
  async (id, { getState, rejectWithValue }) => {
    try {
      const headers = getAuthHeaders(getState);
      const res = await mainAxiosInstance.post(`/items/qna/create/${id}/`,
        {},
         {headers});
      return res.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);
export const updateProductQnA = createAsyncThunk(
  "productQnAUpdate/updateProductQnA",
  async ({id, title, content}, { rejectWithValue, getState }) => {
    console.log("id:", id)
    try {
      const headers = getAuthHeaders(getState);
      const res = await mainAxiosInstance.put(`/items/qna/update/${id}/`, {
         'title': title, 'content': content },
        { headers });
      return res.data;
      
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);
export const deleteProductQnA = createAsyncThunk(
  "productQnADelete/deleteProductQnA",
  async (id, { getState, rejectWithValue }) => {
    const {
      user: { userInfo },
    } = getState();
    console.log("id:", id)
    try {
      const res = await mainAxiosInstance.delete(`/items/qna/delete/${id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userInfo.access}`,
        },}
      );
      console.log("DATA:", res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(handleError(error));
    }
  }
);

export const getTopProducts = createAsyncThunk(
  "products/getTopProductsOrRecommendations",
  async(_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const cacheKey = 'top';
      const fetchTime = state.topProducts.fetchTime;
      if (state.topProducts.cache[cacheKey] && fetchTime && (Date.now() - fetchTime) < 1000 * 60 * 5){
        return { data: state.topProducts.cache[cacheKey], cacheKey, fromCache: true };
      }
      const res = await mainAxiosInstance.get(`/items/top/`);
      return { data: res.data, cacheKey, fromCache: false}
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }

);

export const getRecommendations = createAsyncThunk(
  "products/getRecommendations",
  async(_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const user = state.user.userInfo;
      const cacheKey = 'recommendation';
      const fetchTime = state.topProducts.fetchTime;
      if (state.topProducts.cache[cacheKey] && fetchTime && (Date.now() - fetchTime) < 1000 * 60 * 5){
        return { data: state.topProducts.cache[cacheKey], cacheKey, fromCache: true };
      }
      const res = await recommendationAxiosInstance.get(`/recommendations/${user.id}/`);
      return { data: res.data, cacheKey, fromCache: false}
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);