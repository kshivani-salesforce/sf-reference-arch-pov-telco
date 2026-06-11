import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vocus · End-to-End Reference Architecture",
  description: "Salesforce SMB & Enterprise customer journey map for Vocus",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
