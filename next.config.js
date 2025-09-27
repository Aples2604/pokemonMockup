const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/PokeAPI/**'
      }
    ]
  },
  experimental: {
    typedRoutes: true
  }
};

module.exports = nextConfig;
