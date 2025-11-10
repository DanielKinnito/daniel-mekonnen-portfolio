import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Sofia_Sans, Playpen_Sans } from "next/font/google";
import localFont from "next/font/local";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { ThemeProvider } from "./components/theme-provider";

export const metadata: Metadata = {
  title: "Daniel Mekonnen - Software Engineer and Competitive Programmer",
  description:
    "Welcome to my personal portfolio website. I am a passionate Software Engineering graduate from Addis Ababa Science and Technology University with expertise in Python, C++, and Dart. Skilled in data structures, algorithms, and competitive programming. Explore my portfolio to learn more about my projects and problem-solving skills.",
};

const cubonoFont = localFont({
  src: "./fonts/Cubano.ttf",
  weight: "900",
  display: "swap",
  variable: "--font-heading",
});

const primaryFont = localFont({
  src: "./fonts/Exo2.ttf",
  display: "swap",
  variable: "--font-primary",
});

const secondaryFont = localFont({
  src: "./fonts/SpaceGrotesk.ttf",
  display: "swap",
  variable: "--font-secondary",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="no-scrollbar" suppressHydrationWarning>
      <body
        className={cn(
          primaryFont.variable,
          secondaryFont.variable,
          cubonoFont.variable,
        )}
      >
        <ThemeProvider>
          <main className="h-full w-full">
            <Header />
            {children}
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
