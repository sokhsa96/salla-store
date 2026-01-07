import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Use the recommended Next-Intl matcher that skips internal files
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the last locale for these paths
    '/(ar|en)/:path*',

    // Do not run middleware on internal Next.js paths and static files
    '/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)'
  ]
};