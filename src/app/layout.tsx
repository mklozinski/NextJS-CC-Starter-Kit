import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/GlobalProvider";
import GoogleAnalytics from "@/components/thirdParty/GoogleAnalytics";
import GoogleAdSense from "@/components/thirdParty/GoogleAdSense";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Next.js Starter Kit",
  description: "A comprehensive Next.js starter kit with authentication, database, emails and more",
  icons: {
    icon: `${process.env.NEXT_PUBLIC_URL}/favicon.ico`,
  },
  openGraph: {
    title: "Next.js Starter Kit",
    description: "A comprehensive Next.js starter kit with authentication, database, emails and more",
    url: process.env.NEXT_PUBLIC_URL,
    siteName: "Next.js Starter Kit",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_URL}/nextjs-starter-kit-dark.webp`,
        width: 1536,
        height: 1024,
        alt: "Next.js Starter Kit",
        type: "image/webp",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
        <GoogleAdSense/>
      </head>
      <body className={`${montserrat.variable} antialiased`}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
