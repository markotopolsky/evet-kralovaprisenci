"use client";

import Link from "next/link";
import { AnimalArticle } from "@/lib/models/AnimalArticle";
import { formatDate } from "@/lib/utils";
import { FileText } from "lucide-react";

interface ArticleDetailProps {
  article: AnimalArticle;
  animalSlug: string;
  animalName: string;
}

export function ArticleDetail({ article, animalSlug, animalName }: ArticleDetailProps) {
  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          href={`/vase-zvieratko/${animalSlug}`}
          className="inline-flex items-center gap-2 text-primary hover:underline mb-4"
        >
          ← Späť na {animalName}
        </Link>

        <time
          dateTime={new Date(article.createdAt).toISOString()}
          className="text-sm text-text-muted block mb-4"
        >
          {formatDate(article.createdAt)}
        </time>

        <h1 className="text-3xl sm:text-4xl font-bold text-text mb-4">{article.title}</h1>

        <p className="text-xl text-text-muted">{article.excerpt}</p>
      </div>

      <div className="aspect-video bg-primary-light rounded-xl flex items-center justify-center mb-8">
        <FileText className="w-24 h-24 text-primary/40" />
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="text-text-muted leading-relaxed whitespace-pre-line">{article.content}</div>
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
