// next.config.mjs
import type { NextConfig } from "next";

/** @type {NextConfig} */
const nextConfig = {
  images: {
    loader: "default",
    loaderFile: "./src/utils/imageLoader.ts",
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost", // ✅ allow localhost
        port: "**", // allow any port (3000, 4000 etc.)
        pathname: "/**", // allow all image paths
      },
      {
        protocol: "http",
        hostname: "192.168.1.55", // ✅ allow LAN IP
        port: "**",
        pathname: "/**",
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
