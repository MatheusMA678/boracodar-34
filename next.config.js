/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  images: {
    domains: [
      "example.com",
      "api.github.com"
    ]
  }
}

module.exports = nextConfig
