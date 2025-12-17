// src/types/index.ts

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface Cart {
  id: number;
  userId: number;
  date: string;
  products: CartItem[];
}

export interface User {
  id: number;
  username: string;
  email: string;
  name: {
    firstname: string;
    lastname: string;
  };
  phone: string;
}

export interface AuthResponse {
  token: string;
}