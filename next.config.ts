import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the project root (a stray lockfile in the home folder otherwise confuses root detection).
  turbopack: { root: process.cwd() },
  poweredByHeader: false,
};

export default nextConfig;
