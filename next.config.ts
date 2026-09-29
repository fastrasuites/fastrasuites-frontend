// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["**"],
  async rewrites() {
    return [
      { source: "/estimate", destination: "/nigerian-estimation-engine.html" },
    ];
  },
};

export default nextConfig;
