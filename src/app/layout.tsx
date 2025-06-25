import type { Metadata } from "next";
import "./globals.css";
import MainLayout from "../components/MainLayout";
import { ReactNode, Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "mjaynsurreptitious",
  description: "AI-powered tarot card reader",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
    {
      rel: "shortcut icon",
      url: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      url: "/apple-icon.png",
    },
  ],
  appleWebApp: {
    title: "mjs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={`bg-gray-950`}>
        <Suspense fallback={<Loading />}>
          <MainLayout>{children}</MainLayout>
        </Suspense>
      </body>
    </html>
  );
}
