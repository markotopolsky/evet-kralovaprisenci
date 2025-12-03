import { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { WhyWeDoIt } from "@/components/home/WhyWeDoIt";
import { BasicInfoCards } from "@/components/home/BasicInfoCards";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { AboutPreview } from "@/components/home/AboutPreview";
import { TeamPreview } from "@/components/home/TeamPreview";
import { BlogPreview } from "@/components/home/BlogPreview";
import { FAQ } from "@/components/home/FAQ";
import { ContactCTA } from "@/components/layout/ContactCTA";
import { LazyGoogleReviews } from "@/components/layout/LazyGoogleReviews";
import { LazyMapSection } from "@/components/layout/LazyMapSection";
import { getFeaturedServices } from "@/lib/queries/services";
import { getRecentBlogPosts } from "@/lib/queries/blog";
import { siteConfig } from "@/config/site";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: `Veterinárna klinika ${siteConfig.address.city}`,
  description: `Profesionálna veterinárna klinika v ${siteConfig.address.city}. Preventívne prehliadky, vakcinácia, chirurgia, stomatológia. ☎️ ${siteConfig.phone}`,
  path: "",
});

export default async function HomePage() {
  const [services, blogPosts] = await Promise.all([
    getFeaturedServices(),
    getRecentBlogPosts(3),
  ]);

  return (
    <>
      <Hero />

      <section aria-labelledby="what-heading" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              id="what-heading"
              className="text-3xl sm:text-4xl font-bold text-[#2A2A2A] mb-4"
            >
              Čo robíme
            </h2>
            <p className="text-xl text-[#5C5C5C] max-w-3xl mx-auto">
              Poskytujeme komplexnú veterinárnu starostlivosť s dôrazom na prevenciu,
              diagnostiku a liečbu. Naším cieľom je udržať vaše miláčiky zdravé a šťastné.
            </p>
          </div>
          <BasicInfoCards />
        </div>
      </section>

      <WhyWeDoIt />

      <ServicesPreview services={services} />

      <AboutPreview />

      <TeamPreview />

      <section aria-labelledby="hours-heading" className="py-16 sm:py-20 bg-[#f8f8f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="hours-heading"
            className="text-3xl sm:text-4xl font-bold text-[#2A2A2A] mb-8 text-center"
          >
            Kedy nás navštíviť
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-[#e8e6e1]">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="text-center p-4 bg-[#f8f8f6] rounded-lg">
                  <p className="font-semibold text-[#2A2A2A] mb-1">Pondelok, Streda</p>
                  <p className="text-[#5C5C5C]">9:00 - 17:00</p>
                </div>
                <div className="text-center p-4 bg-[#f8f8f6] rounded-lg">
                  <p className="font-semibold text-[#2A2A2A] mb-1">Utorok, Štvrtok, Piatok</p>
                  <p className="text-[#5C5C5C]">13:00 - 20:00</p>
                </div>
                <div className="text-center p-4 bg-[#f8f8f6] rounded-lg">
                  <p className="font-semibold text-[#2A2A2A] mb-1">Sobota</p>
                  <p className="text-[#5C5C5C]">11:00 - 15:00</p>
                </div>
                <div className="text-center p-4 bg-[#f8f8f6] rounded-lg">
                  <p className="font-semibold text-[#2A2A2A] mb-1">Nedeľa</p>
                  <p className="text-[#5C5C5C]">18:00 - 20:00</p>
                </div>
              </div>
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
