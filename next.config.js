/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  optimizeFonts: false,
};


const withVideos = require('next-videos')
module.exports = withVideos(nextConfig);
