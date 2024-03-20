import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from 'react';
import { GoogleAnalytics } from '@next/third-parties/google'
import content from '@/app/content.json'
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: content.title,
  description: content.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <GoogleAnalytics gaId={'G-6WVS0TEKW5'} />
    </html>
  );
}
