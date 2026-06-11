import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

// Self-hosted at build time (no runtime CDN call), so the demo runs offline.
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vocus · End-to-End Reference Architecture",
  description: "Salesforce SMB & Enterprise customer journey map for Vocus",
};

export const viewport = {
  themeColor: "#0d1b2e",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={display.variable}>
      <body>{children}</body>
    </html>
  );
}
