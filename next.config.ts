import type { NextConfig } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://127.0.0.1:8000/";

const url = new URL(BASE_URL);

const nextConfig: NextConfig = {
  images: {
    domains: [url.hostname], // ✅ only "127.0.0.1"
  },
};

export default nextConfig;
