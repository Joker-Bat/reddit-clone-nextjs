/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "logos-world.net",
      "encrypted-tbn0.gstatic.com",
      "avatars.dicebear.com",
    ],
  },
};

module.exports = nextConfig;
