/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "images.unsplash.com",
      "images.pexels.com",
      "s3.us-west-2.amazonaws.com",
      "s3.amazonaws.com",
      "prod-files-secure.s3.us-west-2.amazonaws.com",
      "www.notion.so",
      "notion.so",
      "secure.notion-static.com"
    ],
  },
};

export default nextConfig;
