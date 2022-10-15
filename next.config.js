/** 
 * @type {import('next').NextConfig} 
 */

const isGithubActions = process.env.GITHUB_ACTIONS || false

let assetPrefix = '/'

if (isGithubActions) {
  // trim off `<owner>/`
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')

  assetPrefix = `${process.env.NEXT_PUBLIC_BASE_PATH}/`;
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
    AUTH0_BASE_URL: process.env.ANEXT_PUBLIC_UTH0_BASE_URL || 'http://localhost:3000',
    AUTH0_SECRET: process.env.NEXT_PUBLIC_AUTH0_SECRET,
    AUTH0_ISSUER_BASE_URL: process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL || 'https://dev-m8xtdhux.us.auth0.com',
    AUTH0_CLIENT_ID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET,
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_PORT: process.env.MYSQL_PORT,
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD
  }
}

module.exports = nextConfig;



