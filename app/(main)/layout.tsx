import { Banner } from "@/components/layout/Banner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { generateLocalBusinessSchema, generateWebsiteSchema } from "@/lib/seo";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Structured data for main site */}
      <JsonLd data={generateLocalBusinessSchema()} />
      <JsonLd data={generateWebsiteSchema()} />

      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg"
      >
        Preskočiť na hlavný obsah
      </a>

      <div className="flex flex-col min-h-screen">
        <Banner />
        <Navbar />
        <main id="main-content" className="flex-grow" role="main">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}

