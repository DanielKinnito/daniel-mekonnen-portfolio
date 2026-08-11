import React from 'react';
import type { Metadata } from "next";
import { VT323, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "./components/layout-wrapper";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

const vt323 = VT323({ 
  weight: "400", 
  subsets: ["latin"],
  variable: "--font-vt323"
});

const shareTech = Share_Tech_Mono({
  weight: "400", 
  subsets: ["latin"],
  variable: "--font-share-tech"
});

export const metadata: Metadata = {
  title: "Daniel Mekonnen // Portfolio",
  description: "Web Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
       <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={`${vt323.variable} ${shareTech.variable} font-secondary`}>
        <LayoutWrapper>
           <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
           </div>
        </LayoutWrapper>
      </body>
    </html>
  );
}

