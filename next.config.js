/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}


module.exports = {
  images: {
    domains: ['reqres.in'],
    formats: ['image/avif', 'image/webp'],
  },
  nextConfig
}
