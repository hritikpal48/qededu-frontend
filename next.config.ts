import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    loader: "default",
    loaderFile: "./src/utils/imageLoader.ts",
  },
  compiler: {
    styledComponents: true,
  },
};
// next.config.js

module.exports = {
  images: {
    domains: ["192.168.1.55"],
  },
};
