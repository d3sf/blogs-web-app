import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false, // Disable strict mode
  typescript: {
    ignoreBuildErrors: true, // Ignores TypeScript errors during build
  },

};

export default nextConfig;
