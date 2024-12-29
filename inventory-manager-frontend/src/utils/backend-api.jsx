import axios from 'axios';

const { VITE_BACKEND_API_URL } = import.meta.env;

export const backendApi = axios.create({
    baseURL: VITE_BACKEND_API_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

backendApi.interceptors.request.use(config => {
    const token = sessionStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});