import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogDetail } from "@/components/blog/BlogDetail";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PrevNextNav } from "@/components/ui/PrevNextNav";
import { getAllBlogPosts, getBlogPostBySlug, getAdjacentBlogPosts } from "@/lib/queries/blog";
import { generatePageMetadata, generateArticleSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    return generatePageMetadata({
      title: "Článok nenájdený",
      description: "Tento článok neexistuje.",
      path: `/blog/${slug}`,
    });
  }

  return generatePageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, adjacent] = await Promise.all([
    getBlogPostBySlug(slug),
    getAdjacentBlogPosts(slug),
  ]);

  if (!post) {
    notFound();
  }

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.excerpt,
    slug: slug,
    datePublished: new Date(post.createdAt).toISOString(),
    dateModified: new Date(post.updatedAt || post.createdAt).toISOString(),
    authorName: post.author || siteConfig.name,
  });

  return (
    <>
      <JsonLd data={articleSchema} />
      <Breadcrumbs
        items={[
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${slug}` },
        ]}
      />
      
      <section className="section-padding bg-white">
        <div className="container-friendly">
          <BlogDetail post={post} />
          
          <PrevNextNav
            prev={adjacent.prev ? {
              title: adjacent.prev.title,
              slug: adjacent.prev.slug,
              href: `/blog/${adjacent.prev.slug}`,
            } : null}
            next={adjacent.next ? {
              title: adjacent.next.title,
              slug: adjacent.next.slug,
              href: `/blog/${adjacent.next.slug}`,
            } : null}
            backLink={{
              href: "/blog",
              label: "Späť na všetky články",
            }}
          />
        </div>
      </section>
    </>
  );
}

