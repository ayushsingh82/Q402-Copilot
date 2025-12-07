import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@q402/core"],
  turbopack: {
    // Turbopack configuration
    resolveAlias: {
      // Add any aliases if needed
    },
  },
};

export default nextConfig;
