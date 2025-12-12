"use client";

import Link from "next/link";
import { AnimalArticle } from "@/lib/models/AnimalArticle";
import { useLanguage } from "@/context/LanguageContext";
import { formatDate } from "@/lib/utils";

interface ArticlesListProps {
  articles: AnimalArticle[];
  animalSlug: string;
}

export function ArticlesList({ articles, animalSlug }: ArticlesListProps) {
  const { t, language } = useLanguage();

  if (!articles.length) {
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
      {articles.map((article) => (
        <Link
          key={article._id}
          href={`/vase-zvieratko/${animalSlug}/${article.slug}`}
          className="card-friendly overflow-hidden group"
        >
          <div className="aspect-video bg-[#F2F7F5] flex items-center justify-center">
            <span className="text-6xl">📄</span>
          </div>
          <div className="p-6">
            <time
              dateTime={new Date(article.createdAt).toISOString()}
              className="text-sm text-[#5C5C5C] block mb-2"
            >
              {formatDate(article.createdAt, language)}
            </time>
            <h3 className="font-semibold text-lg text-[#2A2A2A] mb-2 group-hover:text-[#3C8C80] transition-colors line-clamp-2">
              {article.title}
            </h3>
            <p className="text-sm text-[#5C5C5C] line-clamp-2">
              {article.excerpt}
            </p>
            <span className="inline-flex items-center gap-1 text-[#3C8C80] font-medium text-sm mt-4">
              {t.common.readMore} →
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}




