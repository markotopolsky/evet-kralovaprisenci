"use client";

import Link from "next/link";
import { calculateReadTime, formatDate } from "@/lib/utils";
import { text } from "@/lib/i18n/translations";
import { FileText } from "lucide-react";

type BlogPreviewItem = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  createdAt: Date | string;
  excerpt?: string;
  imageBase64?: string | null;
};

interface BlogPreviewProps {
  posts: BlogPreviewItem[];
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  return (
    <section className="section-padding bg-white" aria-labelledby="blog-preview-heading">
      <div className="container-friendly">
        <div className="text-center mb-12">
          <span className="badge mb-4 inline-flex items-center gap-2">
            <FileText className="w-4 h-4" /> {text.blog.badge}
          </span>
          <h2 id="blog-preview-heading" className="text-3xl sm:text-4xl font-bold text-text mb-4">
            {text.blog.title}
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">{text.blog.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {posts.map((post) => {
            const readTime = calculateReadTime(post.content);
            const excerpt = post.excerpt || post.content.slice(0, 160) + "...";

            return (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="card-friendly overflow-hidden group"
              >
                <div className="aspect-video bg-primary-light flex items-center justify-center overflow-hidden">
                  {post.imageBase64 ? (
                    <img
                      src={`data:image/*;base64,${post.imageBase64}`}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <FileText className="w-16 h-16 text-primary/40" />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-text-muted mb-3">
                    <time dateTime={new Date(post.createdAt).toISOString()}>
                      {formatDate(post.createdAt)}
                    </time>
                    {readTime > 0 && (
                      <>
                        <span>•</span>
                        <span>
                          {readTime} {text.blog.minRead}
                        </span>
                      </>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg text-text mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-text-muted line-clamp-2">{excerpt}</p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/blog" className="btn-secondary">
            {text.blog.allArticles} →
          </Link>
        </div>
      </div>
    </section>
  );
}
