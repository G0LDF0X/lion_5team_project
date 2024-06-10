import axios from 'axios';
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const VITE_CHAT_API_BASE_URL = import.meta.env.VITE_CHAT_API_BASE_URL;
const VITE_SEARCH_API_BASE_URL = import.meta.env.VITE_SEARCH_API_BASE_URL;
const VITE_SEARCH_BY_CONSTANTS_API_BASE_URL = import.meta.env.VITE_SEARCH_BY_CONSTANTS_API_BASE_URL;
const VITE_RECOMMENDATION_API_BASE_URL = import.meta.env.VITE_RECOMMENDATION_API_BASE_URL;

const getCsrfToken = async () => {
  try {
    const response = await axios.get(`${VITE_API_BASE_URL}/csrf-token`, {
      withCredentials: true,
    });
    console.log('CSRF', response.data)
    return response.data.csrfToken;
  } catch(error){
    console.error('ERROR', error)
  }
}



export const mainAxiosInstance = axios.create({
  baseURL: VITE_API_BASE_URL,
  withCredentials: true,
});

mainAxiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token')
  let csrfToken = localStorage.getItem('csrfToken');


  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if(!csrfToken){
    csrfToken = await getCsrfToken();
    localStorage.setItem('csrfToken', csrfToken);
  } 
  if(csrfToken){
    config.headers['X-CSRF-Token'] = csrfToken;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const chatbotAxiosInstance = axios.create({
    baseURL: VITE_CHAT_API_BASE_URL,
    withCredentials: true,
    });

export const searchAxiosInstance = axios.create({
    baseURL: VITE_SEARCH_API_BASE_URL,
    withCredentials: true,
    });
export const searchByConstantsAxiosInstance = axios.create({  
    baseURL: VITE_SEARCH_BY_CONSTANTS_API_BASE_URL,
    withCredentials: true,
    });

export const recommendationAxiosInstance = axios.create({
    baseURL: VITE_RECOMMENDATION_API_BASE_URL,
    withCredentials: true,
    });