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

export default nextConfig;
