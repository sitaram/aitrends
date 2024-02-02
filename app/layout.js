// layout.js

import React from 'react';
import { Inter } from 'next/font/google';
import Head from 'next/head'; // Import Head from next/head
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AI Trends',
  description: 'Keep up with latest trends in AI with this dynamic and interactive newsletter',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Move the viewport meta tag to the <Head> component */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
