import type { NextConfig } from "next";
import deployment from "./deployment.config.json";

const nextConfig: NextConfig = {
  basePath: deployment.basePath,
  output: process.env.ROADSIDE_STATIC_EXPORT === "1" ? "export" : undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
