const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/c',
        destination: '/contact',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
