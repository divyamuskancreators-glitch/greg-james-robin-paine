import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteTitle = "Greg James | Robin Paine";
const siteDescription =
  "An immersive visual story of Greg James and Robin Paine - exploring their journey, work, and the world of IoT Automation.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,

  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    siteName: siteTitle,
  },

  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}