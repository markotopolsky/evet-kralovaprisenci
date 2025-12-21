"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimalArticle } from "@/lib/models/AnimalArticle";
import { formatDate } from "@/lib/utils";
import { text } from "@/lib/i18n/translations";
import { FileText } from "lucide-react";

interface ArticlesListProps {
  articles: AnimalArticle[];
  animalSlug: string;
}

export function ArticlesList({ articles, animalSlug }: ArticlesListProps) {
  if (!articles.length) {
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
      {articles.map((article) => (
        <Link
          key={article._id}
          href={`/vase-zvieratko/${animalSlug}/${article.slug}`}
          className="card-friendly overflow-hidden group"
        >
          <div className="aspect-video bg-primary-light relative overflow-hidden">
            {article.image ? (
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FileText className="w-16 h-16 text-primary/40" />
              </div>
            )}
          </div>
          <div className="p-6">
            <time
              dateTime={new Date(article.createdAt).toISOString()}
              className="text-sm text-text-muted block mb-2"
            >
              {formatDate(article.createdAt)}
            </time>
            <h3 className="font-semibold text-lg text-text mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {article.title}
            </h3>
            <p className="text-sm text-text-muted line-clamp-2">{article.excerpt}</p>
            <span className="inline-flex items-center gap-1 text-primary font-medium text-sm mt-4">
              {text.common.readMore} →
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
