// src/lib/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add an interceptor if we need to attach the token dynamically later
api.interceptors.request.use((config) => {
  // We will handle auth token injection here later
  return config;
});

export default api;