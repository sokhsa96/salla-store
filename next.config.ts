import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin(
    './src/i18n/request.ts'
);
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow images from fakestoreapi.com
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