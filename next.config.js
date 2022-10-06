/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['reqres.in', 's.gravatar.com'],
    formats: ['image/avif', 'image/webp'],
  },
  assetPrefix: '/'
}


module.exports = nextConfig;
