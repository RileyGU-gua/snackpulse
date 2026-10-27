import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.STATIC_EXPORT === "1" ? "export" : undefined,
  trailingSlash: process.env.STATIC_EXPORT === "1",
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
