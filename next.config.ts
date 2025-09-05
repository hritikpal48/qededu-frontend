import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000", // or whichever you use
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "192.168.1.55",
        port: "7001", // explicitly allow this port
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "qedwed.duckdns.org",
        pathname: "/**", // allow all images from your production domain
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
