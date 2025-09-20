import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },
  
  // Turbopack configuration
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
    root: "/Users/rishi/studyControl/client",
  },
  
  // Output for Docker builds
  output: 'standalone',
  
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.flaticon.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value: process.env.NODE_ENV === "development" 
              ? "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' http://localhost:5000 ws: wss: localhost:*;"
              : "default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self';",
          },
        ],
      },
    ]
  },

  // Performance optimizations
  poweredByHeader: false,
  compress: true,
}

export default nextConfig;
