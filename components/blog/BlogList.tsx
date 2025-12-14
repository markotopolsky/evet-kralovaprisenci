"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { calculateReadTime, formatDate, truncate } from "@/lib/utils";

type BlogListItem = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  createdAt: string | Date;
  excerpt?: string;
};

interface BlogListProps {
  posts: BlogListItem[];
}

export function BlogList({ posts }: BlogListProps) {
  const { t, language } = useLanguage();

  if (!posts.length) {
    return (
      <div className="text-center py-12">
        <span className="text-6xl block mb-4">📝</span>
        <p className="text-[#5C5C5C]">
          {language === "sk"
            ? "Žiadne články zatiaľ nie sú k dispozícii."
            : "Noch keine Artikel verfügbar."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => {
        const excerpt = post.excerpt ?? truncate(post.content, 160);
        const readTime = calculateReadTime(post.content);

        return (
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
                {readTime > 0 && (
                  <>
                    <span>•</span>
                    <span>{readTime} {t.blog.minRead}</span>
                  </>
                )}
              </div>
              <h2 className="font-semibold text-xl text-[#2A2A2A] mb-2 group-hover:text-[#3C8C80] transition-colors line-clamp-2">
                {post.title}
              </h2>
              <p className="text-sm text-[#5C5C5C] line-clamp-2">
                {excerpt}
              </p>
              <span className="inline-flex items-center gap-1 text-[#3C8C80] font-medium text-sm mt-4">
                {t.common.readMore} →
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}






