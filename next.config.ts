import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep client-side interactions available in local and tunneled IDE previews.
  // This setting is only consulted by the Next.js development server.
  allowedDevOrigins: ["127.0.0.1", "*.trycloudflare.com"],
  reactStrictMode: true,
};

export default nextConfig;
