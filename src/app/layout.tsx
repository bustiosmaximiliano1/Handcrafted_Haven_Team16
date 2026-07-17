import type { Metadata } from "next";
import { Fraunces, Karla } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import "./globals.css";

// Display face — soft, characterful serif for headings and the logo.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Body face — a warm grotesque for readable copy and UI.
const karla = Karla({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// SEO: Next.js reads this metadata to build <title>, <meta> and social tags.
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

/**
 * Root layout. The Navbar, Footer, and skip link live HERE, so every page in
 * the app gets them automatically — a new page only has to render its own
 * content. There is one <main id="main"> landmark for the whole app; pages
 * return their sections directly (they do NOT add their own <main>).
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${karla.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
