/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['platform-lookaside.fbsbx.com', 'graph.facebook.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**.facebook.com',
        // port: '',
        // pathname: '**/picture**',
      },
    ],
  }
}

module.exports = nextConfig
