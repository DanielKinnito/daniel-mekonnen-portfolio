/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["your-image-domain.com"], // Replace with your image domain if needed
  },
  // output: "export", // Commented out for development - uncomment for static export if needed
};

module.exports = nextConfig;
