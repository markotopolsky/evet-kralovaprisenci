"use client";

import Link from "next/link";
import { BlogPost } from "@/lib/models/BlogPost";
import { useLanguage } from "@/context/LanguageContext";
import { formatDate } from "@/lib/utils";

interface BlogPreviewProps {
  posts: BlogPost[];
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  const { t, language } = useLanguage();

  return (
    <section className="section-padding bg-white" aria-labelledby="blog-preview-heading">
      <div className="container-friendly">
        <div className="text-center mb-12">
          <span className="badge mb-4">
            📝 {t.blog.badge}
          </span>
          <h2
            id="blog-preview-heading"
            className="text-3xl sm:text-4xl font-bold text-[#2A2A2A] mb-4"
          >
            {t.blog.title}
          </h2>
          <p className="text-xl text-[#5C5C5C] max-w-3xl mx-auto">
            {t.blog.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="card-friendly overflow-hidden group"
            >
              <div className="aspect-video bg-[#F2F7F5] flex items-center justify-center">
                <span className="text-6xl">📄</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-[#5C5C5C] mb-3">
                  <time dateTime={new Date(post.createdAt).toISOString()}>
                    {formatDate(post.createdAt, language)}
                  </time>
                  {post.readTime && (
                    <>
                      <span>•</span>
                      <span>{post.readTime} {t.blog.minRead}</span>
                    </>
                  )}
                </div>
                <h3 className="font-semibold text-lg text-[#2A2A2A] mb-2 group-hover:text-[#3C8C80] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-[#5C5C5C] line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/blog" className="btn-secondary">
            {t.blog.allArticles} →
          </Link>
        </div>
      </div>
    </section>
  );
}

