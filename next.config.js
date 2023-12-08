/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["images.ctfassets.net"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
