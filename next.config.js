/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'attachment-tool.com' }],
        destination: 'https://www.attachment-tool.com/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
