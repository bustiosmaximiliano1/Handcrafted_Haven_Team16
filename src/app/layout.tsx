import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

// I chose this display face to give headlines and brand moments an elegant serif style.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

// I chose this body face to keep UI text and long reading sections clean and modern.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

// I configured this metadata so Next.js can build title, meta, and social tags for SEO.
export const metadata: Metadata = {
  title: "Handcrafted Haven — Unique handmade goods from independent makers",
  description:
    "A marketplace for artisans and crafters. Browse ceramics, textiles, jewelry, and woodwork made by hand, and buy directly from the maker.",
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
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
