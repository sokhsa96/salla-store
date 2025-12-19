import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest } from 'next/server';

// 1. Initialize Intl Middleware
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // 2. Run Intl Middleware first (to handle /ar, /en logic)
  const response = intlMiddleware(request);

  // 3. (Optional) Check for Session Cookie here if you want to protect routes
  // For now, we just pass the response through. 
  // If you wanted to protect /cart, you would check request.cookies.get('session') here.

  return response;
}

export const config = {
  matcher: ['/', '/(ar|en)/:path*']
};