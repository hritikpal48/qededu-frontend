import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000", // allow localhost:3000
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "7001", // ✅ allow localhost:7001 as well
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "192.168.1.55",
        port: "7001",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "qedwed.duckdns.org",
        pathname: "/**",
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
