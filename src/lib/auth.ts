import api from './axios';
import { LoginFormValues, SignupFormValues } from './schemas';
import { User, AuthResponse } from '@/types';

// Mock delay helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  login: async (creds: LoginFormValues) => {
    await delay(1500); // Simulate delay

    // Call API to check credentials
    const { data } = await api.post<AuthResponse>('/auth/login', {
      username: creds.username,
      password: creds.password,
    });

    // MOCK USER DATA
    // In a real app, this comes from the backend.
    const mockUser: User = {
      id: 1,
      username: creds.username,
      email: "user@salla.sa",
      name: { firstname: "Sohaib", lastname: "Sayed" },
      phone:     "050-000-0000",
      // Simulate a past date for existing users
      joinedAt: new Date('2023-11-20').toISOString() 
    };

    return { token: data.token, user: mockUser };
  },

  signup: async (data: SignupFormValues) => {
    await delay(2000);

    // Call API to create user (Mock)
    await api.post('/users', {
        email: data.email,
        username: data.username,
        // ... other fields
    });
    
    // Create the User Object immediately to log them in automatically
    const newUser: User = {
        id: Math.floor(Math.random() * 1000),
        username: data.username,
        email: data.email,
        name: { firstname: data.firstname, lastname: data.lastname },
        // IMPORTANT: Use current date for new signups
        joinedAt: new Date().toISOString() 
    };
    
    // Return the user so we can store it in Zustand immediately
    return { token: "mock_jwt_token_123", user: newUser };
  }
};