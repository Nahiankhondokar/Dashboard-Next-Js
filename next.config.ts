import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8000', // Match your backend port
                pathname: '/storage/**', // Match your Laravel/Backend storage path
            },
        ],
    },
};

export default nextConfig;
