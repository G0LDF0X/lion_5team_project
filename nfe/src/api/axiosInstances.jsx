import axios from 'axios';
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const mainAxiosInstance = axios.create({
  baseURL: VITE_API_BASE_URL,
});

mainAxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const chatbotAxiosInstance = axios.create({
    baseURL: `http://127.0.0.1:8001/api/`,
    });

export const searchAxiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8002/',
    });
