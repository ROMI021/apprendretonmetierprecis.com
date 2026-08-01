import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Headers HTTP pour le Service Worker et le manifest PWA
  async headers() {
    return [
      {
        // Le SW doit être servi avec le bon Content-Type et ne doit pas être mis en cache par le navigateur
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
          {
            key: "Service-Worker-Allowed",
            value: "/",
          },
        ],
      },
      {
        // Le manifest PWA
        source: "/manifest.json",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
