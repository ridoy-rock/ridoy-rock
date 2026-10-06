import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export so the redesign can be previewed without a server.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
