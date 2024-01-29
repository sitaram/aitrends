import React from "react";
import { Inter } from "next/font/google";
import { useMetadata } from 'next/navigation'; // Import useMetadata hook
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  // Use the useMetadata hook to set metadata
  useMetadata({
    title: "AI Trends",
    description: "Keep up with the latest trends in AI with this dynamic and interactive newsletter",
    // Include viewport meta as part of the metadata
    viewport: 'width=device-width, initial-scale=1.0',
  });

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
