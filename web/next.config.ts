import type { NextConfig } from "next";

// Set PAGES_BASE_PATH (e.g. "/ridoy-rock") to build for a sub-path such as GitHub Pages.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static export so the redesign can be previewed without a server.
  output: "export",
  basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
