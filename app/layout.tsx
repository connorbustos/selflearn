"use client";

import React from "react";
import Navbar from "../components/Navbar";
import { usePathname } from "next/navigation";
import SessionWrapper from "../components/SessionWrapper";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  return (
    <SessionWrapper>
      <html lang="en">
        <link rel="stylesheet" href="https://use.typekit.net/urj3apl.css" />
        <body>
          <Navbar currentPath={pathName} />
          {children}
        </body>
      </html>
    </SessionWrapper>
  );
}
