// layout.js

import React from 'react';
import { Inter } from 'next/font/google';
import Head from 'next/head'; // Import Head from next/head
import ReactGA from 'react-ga';
import { useEffect } from 'react';
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
  useEffect(() => {
    ReactGA.initialize('G-TX2GLY9R4W');
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
