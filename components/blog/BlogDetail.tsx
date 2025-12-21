"use client";

import Link from "next/link";
import { calculateReadTime, formatDate } from "@/lib/utils";
import { text } from "@/lib/i18n/translations";

type BlogDetailData = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  imageBase64: string | null;
  author: string;
  createdAt: string | Date;
};

interface BlogDetailProps {
  post: BlogDetailData;
}

export function BlogDetail({ post }: BlogDetailProps) {
  const readTime = calculateReadTime(post.content);

  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-4"
        >
          ← Späť na blog
        </Link>

        <div className="flex items-center gap-4 text-sm text-text-muted mb-4">
          <time dateTime={new Date(post.createdAt).toISOString()}>{formatDate(post.createdAt)}</time>
          {readTime > 0 && (
            <>
              <span>•</span>
              <span>
                {readTime} {text.blog.minRead}
              </span>
            </>
          )}
          {post.author && (
            <>
              <span>•</span>
              <span>{post.author}</span>
            </>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-text mb-4">{post.title}</h1>
      </div>

      {post.imageBase64 && (
        <div className="mb-8">
          <img
            src={`data:image/*;base64,${post.imageBase64}`}
            alt={post.title}
            className="w-full max-h-80 object-cover rounded-xl shadow-sm border border-border"
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        <div className="text-text-muted leading-relaxed whitespace-pre-line">{post.content}</div>
      </div>

      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="font-semibold text-lg text-text mb-4">Máte otázky?</h2>
        <p className="text-text-muted mb-4">Neváhajte nás kontaktovať, radi vám poradíme.</p>
        <Link href="/kontakt" className="btn-primary">
          Kontaktujte nás
        </Link>
      </div>
    </article>
  );
}
