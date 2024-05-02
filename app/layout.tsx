"use client";

import React from "react";
import Navbar from "../components/Navbar";
import { usePathname } from "next/navigation";
import SessionWrapper from "../components/SessionWrapper";
import "./globals.css";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  return (
    <SessionWrapper>
      <html lang="en">
        <body>
          <div className="w-screen h-screen">
            <Navbar currentPath={pathName} />
            <div className="min-h-screen">{children}</div>
          </div>
        </body>
      </html>
    </SessionWrapper>
  );
}
