import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: { serverActions: { bodySizeLimit: "2mb" } },
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
