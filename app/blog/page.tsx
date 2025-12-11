import { Metadata } from "next";
import { BlogList } from "@/components/blog/BlogList";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { getAllBlogPosts } from "@/lib/queries/blog";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Blog | Rady a tipy pre vaše zvieratá",
  description: "Prečítajte si naše články o starostlivosti o zvieratá, prevencii chorôb, výžive a zaujímavosti zo sveta veterinárnej medicíny.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <>
      <Breadcrumbs items={[{ name: "Blog", href: "/blog" }]} />
      
      <section className="section-padding bg-white" aria-labelledby="blog-heading">
        <div className="container-friendly">
          <div className="text-center mb-12">
            <span className="badge mb-4">📝 Blog</span>
            <h1
              id="blog-heading"
              className="text-3xl sm:text-4xl font-bold text-[#2A2A2A] mb-4"
            >
              Rady a tipy pre vaše miláčiky
            </h1>
            <p className="text-xl text-[#5C5C5C] max-w-3xl mx-auto">
              Prečítajte si naše články o starostlivosti o zvieratá, prevencii chorôb
              a zaujímavosti zo sveta veterinárnej medicíny.
            </p>
          </div>

          <BlogList posts={posts} />
        </div>
      </section>
    </>
  );
}



