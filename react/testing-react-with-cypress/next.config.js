/** @type {import('next').NextConfig} */
const nextConfig = {
  // fix babel issue with next.js
  compiler: {
    swcMinify: true // Ensure SWC minification is enabled
  }
};

module.exports = nextConfig;
