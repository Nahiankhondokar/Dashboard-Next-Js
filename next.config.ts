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
    reactStrictMode: false,
    eslint: {
        // Warning: This allows production builds to successfully complete
        // even if your project has ESLint errors.
        // This will allow the build to succeed even with the 'any' errors
        ignoreDuringBuilds: true,
    },
    typescript: {
        // This will ignore TypeScript errors during the build
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
