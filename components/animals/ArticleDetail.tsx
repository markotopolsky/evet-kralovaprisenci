"use client";

import Link from "next/link";
import { AnimalArticle } from "@/lib/models/AnimalArticle";
import { useLanguage } from "@/context/LanguageContext";
import { formatDate } from "@/lib/utils";

interface ArticleDetailProps {
  article: AnimalArticle;
  animalSlug: string;
  animalName: string;
}

export function ArticleDetail({ article, animalSlug, animalName }: ArticleDetailProps) {
  const { language } = useLanguage();

  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          href={`/vase-zvieratko/${animalSlug}`}
          className="inline-flex items-center gap-2 text-[#3C8C80] hover:underline mb-4"
        >
          ← {language === "sk" ? "Späť na" : "Zurück zu"} {animalName}
        </Link>
        
        <time
          dateTime={new Date(article.createdAt).toISOString()}
          className="text-sm text-[#5C5C5C] block mb-4"
        >
          {formatDate(article.createdAt, language)}
        </time>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-[#2A2A2A] mb-4">
          {article.title}
        </h1>
        
        <p className="text-xl text-[#5C5C5C]">
          {article.excerpt}
        </p>
      </div>

      <div className="aspect-video bg-[#F2F7F5] rounded-xl flex items-center justify-center mb-8">
        <span className="text-8xl">📄</span>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="text-[#5C5C5C] leading-relaxed whitespace-pre-line">
          {article.content}
        </div>
      </div>

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




