import type { Metadata, Viewport } from "next";
import { Nunito, Inter } from "next/font/google";
import "@/styles/globals.css";
import { UIProvider } from "@/context/UIContext";
import { siteConfig } from "@/config/site";
import { defaultMetadata } from "@/lib/seo";

// Optimize fonts - only load weights we actually use
const nunito = Nunito({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  variable: "--font-nunito",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  ...defaultMetadata,
  title: {
    default: `${siteConfig.name} | Veterinár ${siteConfig.address.city}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: `${siteConfig.description} Veterinárna klinika v ${siteConfig.address.city}.`,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#3C8C80",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk" className={`${nunito.variable} ${inter.variable}`}>
      <head>
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://booking.veclis.sk" />

        {/* Preconnect only to critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="font-sans antialiased bg-white text-text">
        <UIProvider>
          {children}
        </UIProvider>
      </body>
    </html>
  );
}
