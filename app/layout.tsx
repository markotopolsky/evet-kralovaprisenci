import type { Metadata, Viewport } from "next";
import { Nunito, Inter } from "next/font/google";
import "@/styles/globals.css";
import { UIProvider } from "@/context/UIContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { Banner } from "@/components/layout/Banner";
import { InfoBar } from "@/components/layout/InfoBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { defaultMetadata, generateLocalBusinessSchema, generateWebsiteSchema } from "@/lib/seo";
import { getActiveBanners } from "@/lib/queries/banners";

// Optimize fonts - only load weights we actually use
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-nunito",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

const inter = Inter({
  subsets: ["latin"],
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const banners = await getActiveBanners();

  return (
    <html
      lang="sk"
      className={`${nunito.variable} ${inter.variable}`}
    >
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
        
        {/* Structured data */}
        <JsonLd data={generateLocalBusinessSchema()} />
        <JsonLd data={generateWebsiteSchema()} />
      </head>
      <body className="font-sans antialiased bg-white text-[#2A2A2A]">
        <LanguageProvider>
          <UIProvider>
            {/* Skip to main content link */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#3C8C80] focus:text-white focus:rounded-lg"
            >
              Preskočiť na hlavný obsah
            </a>
            
            <div className="flex flex-col min-h-screen">
              <Banner banners={banners} />
              <InfoBar />
              <Navbar />
              <main id="main-content" className="flex-grow" role="main">
                {children}
              </main>
              <Footer />
            </div>
          </UIProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
