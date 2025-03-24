/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["your-image-domain.com"], // Replace with your image domain if needed
  },
  output: "export", // Enable static HTML export
};

module.exports = nextConfig;
