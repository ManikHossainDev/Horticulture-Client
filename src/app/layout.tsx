import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import { ConfigProvider } from "antd";
import Providers from "@/lib/Providers";
import React from "react";
import dynamic from "next/dynamic";

const CookiesConsent = dynamic(() => import("@/components/CookiesConsent"), {});
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Home | Horticulture Specialists",
  description:
    "Welcome to Horticulture, the premier horticultural and agricultural company.",
  keywords: [
    "horticulture",
    "agriculture",
    "fruit",
    "vegetable",
    "produce",
    "farming",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#3FB249",
            },
          }}
        >
          <Providers>
            <Toaster richColors position="top-center" />
            <CookiesConsent />
            <NextTopLoader
              color="#3FB249"
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              showSpinner={false}
              crawl={true}
              easing="ease"
              speed={200}
              zIndex={1600}
              showAtBottom={false}
            />
            {children}
          </Providers>
        </ConfigProvider>
      </body>
    </html>
  );
}
