import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Self-hosted at build time (no runtime CDN call), so the demo runs offline.
// Inter is the documented near-match to Salesforce Sans; the CSS stack still
// lists "Salesforce Sans" first, so a licensed org build picks that up instead.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vocus · End-to-End Reference Architecture",
  description: "Salesforce SMB & Enterprise customer journey map for Vocus",
};

export const viewport = {
  themeColor: "#0a1322",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="noise">{children}</body>
    </html>
  );
}
