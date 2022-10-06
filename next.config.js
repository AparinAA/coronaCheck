/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ['reqres.in', 's.gravatar.com'],
    formats: ['image/avif', 'image/webp'],
  },
  assetPrefix: '/'
}


module.exports = nextConfig;
