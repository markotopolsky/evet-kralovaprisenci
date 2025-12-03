"use client";

import Link from "next/link";
import { BlogPost } from "@/lib/models/BlogPost";
import { useLanguage } from "@/context/LanguageContext";
import { formatDate } from "@/lib/utils";

interface BlogDetailProps {
  post: BlogPost;
}

export function BlogDetail({ post }: BlogDetailProps) {
  const { t, language } = useLanguage();

  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#3C8C80] hover:underline mb-4"
        >
          ← {language === "sk" ? "Späť na blog" : "Zurück zum Blog"}
        </Link>
        
        <div className="flex items-center gap-4 text-sm text-[#5C5C5C] mb-4">
          <time dateTime={new Date(post.createdAt).toISOString()}>
            {formatDate(post.createdAt, language)}
          </time>
          {post.readTime && (
            <>
              <span>•</span>
              <span>{post.readTime} {t.blog.minRead}</span>
            </>
          )}
          {post.author && (
            <>
              <span>•</span>
              <span>{post.author}</span>
            </>
          )}
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-[#2A2A2A] mb-4">
          {post.title}
        </h1>
        
        <p className="text-xl text-[#5C5C5C]">
          {post.excerpt}
        </p>
      </div>

      <div className="aspect-video bg-[#F2F7F5] rounded-xl flex items-center justify-center mb-8">
        <span className="text-8xl">📄</span>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="text-[#5C5C5C] leading-relaxed whitespace-pre-line">
          {post.content}
        </div>
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="mt-8 pt-8 border-t border-[#E4E4E4]">
          <h2 className="font-semibold text-sm text-[#2A2A2A] mb-3">
            {language === "sk" ? "Tagy" : "Tags"}:
          </h2>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-[#F2F7F5] text-[#3C8C80] rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 pt-8 border-t border-[#E4E4E4]">
        <h2 className="font-semibold text-lg text-[#2A2A2A] mb-4">
          {language === "sk" ? "Máte otázky?" : "Haben Sie Fragen?"}
        </h2>
        <p className="text-[#5C5C5C] mb-4">
          {language === "sk"
            ? "Neváhajte nás kontaktovať, radi vám poradíme."
            : "Zögern Sie nicht, uns zu kontaktieren, wir beraten Sie gerne."}
        </p>
        <Link href="/contact" className="btn-primary">
          {language === "sk" ? "Kontaktujte nás" : "Kontaktieren Sie uns"}
        </Link>
      </div>
    </article>
  );
}

