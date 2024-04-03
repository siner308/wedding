import type { Metadata } from "next";
import "./globals.css";
import React from 'react';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import content from '@/app/content.json'
import Head from 'next/head';
import localFont from "next/font/local";

const preloadFont = localFont({
  src: '../../public/fonts/Pretendard-Light.subset.woff2',
  preload: true,
});

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
      <Head>
        <meta property={'og:title'} content={content.title}/>
        <meta property={'og:description'} content={content.description}/>
        <meta property={'og:image'} content={'/images/luvel_map_og.jpg'}/>
      </Head>
      <body className={preloadFont.className}>{children}</body>
      <GoogleAnalytics gaId={'G-6WVS0TEKW5'} />
      <GoogleTagManager gtmId={'GTM-MKSQ7M7T'} />
    </html>
  );
}
