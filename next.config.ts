import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true
  },
  // allowedDevOrigins: ['10.0.0.186'],
  allowedDevOrigins: ["10.0.0.186"],
};

export default nextConfig;
