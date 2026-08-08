import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 95],
  },
  // Remove or comment out allowedDevOrigins for production
  // allowedDevOrigins: ["192.168.211.1"],
};

export default nextConfig;
