import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["http://vector-core:3333", "http://100.124.215.117:3333"],
};

export default nextConfig;
