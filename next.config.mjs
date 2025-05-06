/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['flagcdn.com', 'upload.wikimedia.org', 'mainfacts.com'],
    unoptimized: true,
  },
};

export default nextConfig;
