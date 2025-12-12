import { Metadata } from "next";
import { BlogList } from "@/components/blog/BlogList";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { getAllBlogPosts } from "@/lib/queries/blog";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Aktuality | Dôležité informácie a varovania",
  description: "Sledujte najnovšie aktuality, varovania a dôležité oznámenia pre majiteľov zvierat. Informácie o zdraví, prevencii a aktuálnych témach.",
  path: "/vase-zvieratko/aktuality",
});

export default async function AktualityPage() {
  const posts = await getAllBlogPosts();

  return (
    <>
      <Breadcrumbs 
        items={[
          { name: "Vaše zvieratko", href: "/vase-zvieratko" },
          { name: "Aktuality", href: "/vase-zvieratko/aktuality" }
        ]} 
      />
      
      <section className="section-padding bg-white" aria-labelledby="aktuality-heading">
        <div className="container-friendly">
          <div className="text-center mb-12">
            <span className="badge mb-4">📰 Aktuality</span>
            <h1
              id="aktuality-heading"
              className="text-3xl sm:text-4xl font-bold text-[#2A2A2A] mb-4"
            >
              Aktuality a novinky
            </h1>
            <p className="text-xl text-[#5C5C5C] max-w-3xl mx-auto">
              Sledujte najnovšie informácie, varovania a dôležité oznámenia pre majiteľov zvierat.
              Zostaňte informovaní o aktuálnych témach týkajúcich sa zdravia a starostlivosti o zvieratá.
            </p>
          </div>

          <BlogList posts={posts} />
        </div>
      </section>
    </>
  );
}

