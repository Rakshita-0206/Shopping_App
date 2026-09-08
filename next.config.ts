import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cf.getxeno.com",
      },
      {
        protocol: "https",
        hostname: "fabfamily.fabindia.com",
      },
      {
        protocol: "https",
        hostname: "www.fabindia.com",
      },
    ],
  },
};

export default nextConfig;
