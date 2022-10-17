/** 
 * @type {import('next').NextConfig} 
 */

const isGithubActions = process.env.GITHUB_ACTIONS || false

let assetPrefix = '/'

if (isGithubActions) {
  // trim off `<owner>/`
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')

  assetPrefix = `/${repo}/`
}

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['reqres.in', 's.gravatar.com', 'lh3.googleusercontent.com'],
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
  },
  assetPrefix,
  env: {
    AUTH0_BASE_URL: process.env.NEXT_PUBLIC_AUTH0_BASE_URL,
    AUTH0_SECRET: process.env.NEXT_PUBLIC_AUTH0_SECRET,
    AUTH0_ISSUER_BASE_URL: process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL,
    AUTH0_CLIENT_ID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET,
    MYSQL_HOST: process.env.NEXT_PUBLIC_VERCEL_MYSQL_HOST,
    MYSQL_PORT: process.env.NEXT_PUBLIC_VERCEL_MYSQL_PORT,
    MYSQL_DATABASE: process.env.NEXT_PUBLIC_VERCEL_MYSQL_DATABASE,
    MYSQL_USER: process.env.NEXT_PUBLIC_VERCEL_MYSQL_USER,
    MYSQL_PASSWORD: process.env.NEXT_PUBLIC_VERCEL_MYSQL_PASSWORD,
    NEXTAUTH_URL: 'http://localhost:3000'
  }
}

module.exports = nextConfig;



