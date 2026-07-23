import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { getBaseUrl } from "@/lib/site-url";
import "./globals.css";

// Display face — elegant serif for headlines and brand moments.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

// Body face — modern, clean sans serif for UI and long reading.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

// SEO: Next.js reads this metadata to build <title>, <meta> and social tags.
export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: "Handcrafted Haven — Unique handmade goods from independent makers",
  description:
    "A marketplace for artisans and crafters. Browse ceramics, textiles, jewelry, and woodwork made by hand, and buy directly from the maker.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  keywords: [
    "handmade",
    "handcrafted",
    "artisan marketplace",
    "crafts",
    "ceramics",
    "textiles",
    "jewelry",
    "woodwork",
  ],
  openGraph: {
    title: "Handcrafted Haven",
    description:
      "Discover and buy one-of-a-kind handmade goods directly from independent makers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>{children}</body>
    </html>
  );
}
