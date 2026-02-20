import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable the Next.js development indicator (icon in bottom left)
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },
  // Only use static export for production builds
  ...(process.env.NODE_ENV === 'production' && { output: "export" }),
};

export default nextConfig;
