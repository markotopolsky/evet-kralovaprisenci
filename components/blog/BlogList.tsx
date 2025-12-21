"use client";

import Link from "next/link";
import { calculateReadTime, formatDate, truncate } from "@/lib/utils";
import { text } from "@/lib/i18n/translations";
import { FileText } from "lucide-react";

type BlogListItem = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  createdAt: string | Date;
  excerpt?: string;
  imageBase64?: string | null;
};

interface BlogListProps {
  posts: BlogListItem[];
}

export function BlogList({ posts }: BlogListProps) {
  if (!posts.length) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-primary-light rounded-full flex items-center justify-center">
          <FileText className="w-12 h-12 text-primary/40" />
        </div>
        <p className="text-text-muted">Žiadne články zatiaľ nie sú k dispozícii.</p>
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
              <h2 className="font-semibold text-xl text-text mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h2>
              <p className="text-sm text-text-muted line-clamp-2">{excerpt}</p>
              <span className="inline-flex items-center gap-1 text-primary font-medium text-sm mt-4">
                {text.common.readMore} →
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
