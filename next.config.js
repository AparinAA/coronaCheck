/** @type {import('next').NextConfig} */

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
  },
  assetPrefix,
}

module.exports = nextConfig;



