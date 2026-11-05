import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { ThemeProvider } from "./components/theme-provider";

export const metadata: Metadata = {
  title: "Daniel Mekonnen — Software Engineer",
  description:
    "Backend Software Engineer specializing in scalable microservices, distributed APIs, and performance-critical developer tools. Creator of HexPic.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
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
