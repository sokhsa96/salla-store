// src/lib/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  return config;
});

export default api;