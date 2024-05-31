import axios from 'axios';
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const VITE_CHAT_API_BASE_URL = import.meta.env.VITE_CHAT_API_BASE_URL;
const VITE_SEARCH_API_BASE_URL = import.meta.env.VITE_SEARCH_API_BASE_URL;
export const mainAxiosInstance = axios.create({
  baseURL: VITE_API_BASE_URL,
});

// mainAxiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export const chatbotAxiosInstance = axios.create({
    baseURL: VITE_CHAT_API_BASE_URL,
    });

export const searchAxiosInstance = axios.create({
    baseURL: VITE_SEARCH_API_BASE_URL,
    });
