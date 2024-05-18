import axios from 'axios';

export const mainAxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
});

mainAxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const chatbotAxiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8001/api/',
    });

export const searchAxiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8002/',
    });
