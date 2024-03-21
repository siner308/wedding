import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./boat.scss";
import React from 'react';
import { GoogleAnalytics } from '@next/third-parties/google'
import content from '@/app/content.json'
import Head from 'next/head';
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
      <Head>
        <meta property={'og:title'} content={content.title}/>
        <meta property={'og:description'} content={content.description}/>
        <meta property={'og:image'} content={'/images/luvel_map_og.jpg'}/>
      </Head>
      <body className={inter.className}>{children}</body>
      <GoogleAnalytics gaId={'G-6WVS0TEKW5'} />
    </html>
  );
}
