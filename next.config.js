/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
}
const images = {
  dangerouslyAllowSVG: true,
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
}

module.exports = { 
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  nextConfig,
  images
}

//domains: ['reqres.in', 's.gravatar.com'],
//formats: ['image/avif', 'image/webp'],
