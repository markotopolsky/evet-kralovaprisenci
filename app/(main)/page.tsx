import { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { WhyWeDoIt } from "@/components/home/WhyWeDoIt";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { AboutPreview } from "@/components/home/AboutPreview";
import { TeamPreview } from "@/components/home/TeamPreview";
import { BlogPreview } from "@/components/home/BlogPreview";
import { FAQ } from "@/components/home/FAQ";
import { ContactCTA } from "@/components/layout/ContactCTA";
import { LazyGoogleReviews } from "@/components/layout/LazyGoogleReviews";
import { LazyMapSection } from "@/components/layout/LazyMapSection";
import { OpeningHours } from "@/components/shared";
import { getFeaturedServices } from "@/lib/queries/services";
import { getRecentBlogPosts } from "@/lib/queries/blog";
import { siteConfig } from "@/config/site";
import { generatePageMetadata } from "@/lib/seo";

// =============================================================================
// METADATA
// =============================================================================

export const metadata: Metadata = generatePageMetadata({
  title: `Veterinárna klinika ${siteConfig.address.city}`,
  description: `Profesionálna veterinárna klinika v ${siteConfig.address.city}. Preventívne prehliadky, vakcinácia, chirurgia, stomatológia. ${siteConfig.phone}`,
  path: "",
});

// =============================================================================
// HOMEPAGE
// =============================================================================

export default async function HomePage() {
  const [services, blogPosts] = await Promise.all([
    getFeaturedServices(),
    getRecentBlogPosts(3),
  ]);

  return (
    <>
      <Hero />

      <WhatWeDo />

      <WhyWeDoIt />

      <ServicesPreview services={services} />

      <AboutPreview />

      <TeamPreview />

      {/* Opening Hours Section */}
      <section aria-labelledby="hours-heading" className="py-16 sm:py-20 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="hours-heading"
            className="text-3xl sm:text-4xl font-bold text-text mb-8 text-center"
          >
            Kedy nás navštíviť
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-border">
              <OpeningHours variant="table" />
            </div>
          </div>
        </div>
      </section>

      {/* Lazy loaded - only loads when user scrolls to it */}
      <LazyGoogleReviews />

      <BlogPreview posts={blogPosts} />

      <FAQ />

      <ContactCTA />

      {/* Lazy loaded map - heavy iframe */}
      <LazyMapSection />

      {/* SEO content - hidden */}
      <div className="sr-only">
        <p>
          Veterinárna klinika {siteConfig.name} poskytuje komplexnú veterinárnu
          starostlivosť pre psov, mačky a malé domáce zvieratá v meste{" "}
          {siteConfig.address.city} a okolí.
        </p>
      </div>
    </>
  );
}
