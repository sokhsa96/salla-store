import axios from 'axios';
import { LoginFormValues, SignupFormValues } from './schemas';

// We use a local axios instance for internal API calls
const localApi = axios.create({ baseURL: '/api' }); 

export const authService = {
  login: async (creds: LoginFormValues) => {
    // 1. Simulate Network Delay (for the UI loader)
    await new Promise(r => setTimeout(r, 1500)); 
    
    // 2. Call Next.js API
    const { data } = await localApi.post('/auth/login', creds);
    return data; 
  },

  signup: async (creds: SignupFormValues) => {
    await new Promise(r => setTimeout(r, 2000));
    const { data } = await localApi.post('/auth/signup', creds);
    return data;
  },

  logout: async () => {
    await localApi.post('/auth/logout');
  },

  checkSession: async () => {
    const { data } = await localApi.get('/auth/me');
    return data.user;
  }
};