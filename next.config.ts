import type { NextConfig } from 'next'; // 1. Import the type
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin(
    './src/i18n/request.ts'
);

// 2. Add the ": NextConfig" type annotation here
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
      }
    ],
  },
};

export default withNextIntl(nextConfig);