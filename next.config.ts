import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
 images: {
    loader: 'custom',
    loaderFile: './src/utils/imageLoader.ts'
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
