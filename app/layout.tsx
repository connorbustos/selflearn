"use client";
import React from "react";
import Navbar from "../components/Navbar";
import { usePathname } from "next/navigation";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body>
        <Navbar currentPath={pathname} />
        {children}
      </body>
    </html>
  );
}
