import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    qualities: [70, 75],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};
export default nextConfig;
