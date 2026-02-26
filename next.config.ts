import type { NextConfig } from "next";
import dns from "node:dns";

// Force IPv4 resolution to prevent "fetch failed" on some Windows / Node.js 18+ setups
dns.setDefaultResultOrder("ipv4first");
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
