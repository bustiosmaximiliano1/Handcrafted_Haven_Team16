import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "cdn.pixabay.com" },
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/artisan",
        destination: "/dashboard/artisan/products",
        permanent: true,
      },
      {
        source: "/artisan/:path*",
        destination: "/dashboard/artisan/:path*",
        permanent: true,
      },
      {
        source: "/admin",
        destination: "/dashboard/admin/products",
        permanent: true,
      },
      {
        source: "/admin/:path*",
        destination: "/dashboard/admin/:path*",
        permanent: true,
      },
      {
        source: "/customer",
        destination: "/dashboard/customer",
        permanent: true,
      },
      {
        source: "/customer/:path*",
        destination: "/dashboard/customer/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
