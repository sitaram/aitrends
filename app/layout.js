// layout.js

import React from 'react';
import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AI Trends',
  description: 'Keep up with latest trends in AI with this dynamic and interactive newsletter',
};

export const viewport = {
  content: 'width=device-width, initial-scale=1.0',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <GoogleAnalytics gaId="G-TX2GLY9R4W" />
    </html>
  );
}
