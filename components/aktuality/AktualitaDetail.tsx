"use client";

import Link from "next/link";
import { formatDate, calculateReadTime } from "@/lib/utils";
import { ArrowLeft, Calendar, Clock, User, AlertTriangle, Bug, Info, Newspaper } from "lucide-react";

type AktualitaCategory = "warning" | "disease" | "info" | "general";

interface AktualitaDetailProps {
  aktualita: {
    title: string;
    slug: string;
    content: string;
    author: string;
    category?: AktualitaCategory;
    createdAt: string | Date;
    imageBase64?: string | null;
  };
  adjacentAktuality?: {
    prev: { title: string; slug: string } | null;
    next: { title: string; slug: string } | null;
  };
}

const categoryConfig: Record<AktualitaCategory, { icon: React.ReactNode; color: string; label: string; bgColor: string }> = {
  warning: {
    icon: <AlertTriangle className="w-5 h-5" />,
    color: "text-orange-700",
    bgColor: "bg-orange-100",
    label: "Varovanie",
  },
  disease: {
    icon: <Bug className="w-5 h-5" />,
    color: "text-red-700",
    bgColor: "bg-red-100",
    label: "Choroba / Ochorenie",
  },
  info: {
    icon: <Info className="w-5 h-5" />,
    color: "text-blue-700",
    bgColor: "bg-blue-100",
    label: "Informácia",
  },
  general: {
    icon: <Newspaper className="w-5 h-5" />,
    color: "text-gray-700",
    bgColor: "bg-gray-100",
    label: "Aktualita",
  },
};

export function AktualitaDetail({ aktualita, adjacentAktuality }: AktualitaDetailProps) {
  const readTime = calculateReadTime(aktualita.content);
  const category = aktualita.category || "general";
  const config = categoryConfig[category];

  return (
    <article className="max-w-3xl mx-auto">
      {/* Back link */}
      <Link
        href="/vase-zvieratko/aktuality"
        className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Späť na aktuality
      </Link>

      {/* Header */}
      <header className="mb-8">
        {/* Category badge */}
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-4 ${config.bgColor} ${config.color}`}>
          {config.icon}
          {config.label}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-text mb-4">
          {aktualita.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            {aktualita.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {formatDate(aktualita.createdAt)}
          </span>
          {readTime > 0 && (
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {readTime} min čítania
            </span>
          )}
        </div>
      </header>

      {/* Featured image */}
      {aktualita.imageBase64 && (
        <div className="mb-8 rounded-xl overflow-hidden">
          <img
            src={`data:image/*;base64,${aktualita.imageBase64}`}
            alt={aktualita.title}
            className="w-full h-auto"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div className="text-text-muted leading-relaxed whitespace-pre-line">
          {aktualita.content}
        </div>
      </div>

      {/* Navigation */}
      {adjacentAktuality && (adjacentAktuality.prev || adjacentAktuality.next) && (
        <nav 
          aria-label="Navigácia medzi položkami"
          className="mt-12 pt-8 border-t border-[#E4E4E4]"
        >
          <div className="flex flex-col sm:flex-row items-stretch gap-4">
            {/* Previous */}
            <div className="flex-1">
              {adjacentAktuality.prev ? (
                <Link
                  href={`/vase-zvieratko/aktuality/${adjacentAktuality.prev.slug}`}
                  className="group flex items-center gap-3 p-4 rounded-xl border border-[#E4E4E4] hover:border-[#3C8C80] hover:bg-[#F2F7F5] transition-all h-full"
                >
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F2F7F5] group-hover:bg-white flex items-center justify-center text-[#3C8C80] transition-colors">
                    ←
                  </span>
                  <div className="min-w-0 flex-1 text-left">
                    <span className="text-xs text-[#5C5C5C] block mb-0.5">
                      Predchádzajúca
                    </span>
                    <span className="font-medium text-[#2A2A2A] group-hover:text-[#3C8C80] transition-colors line-clamp-1">
                      {adjacentAktuality.prev.title}
                    </span>
                  </div>
                </Link>
              ) : (
                <div className="p-4 rounded-xl border border-dashed border-[#E4E4E4] h-full flex items-center justify-center text-[#9CA3AF] text-sm">
                  Žiadna predchádzajúca
                </div>
              )}
            </div>

            {/* Next */}
            <div className="flex-1">
              {adjacentAktuality.next ? (
                <Link
                  href={`/vase-zvieratko/aktuality/${adjacentAktuality.next.slug}`}
                  className="group flex items-center gap-3 p-4 rounded-xl border border-[#E4E4E4] hover:border-[#3C8C80] hover:bg-[#F2F7F5] transition-all h-full"
                >
                  <div className="min-w-0 flex-1 text-right">
                    <span className="text-xs text-[#5C5C5C] block mb-0.5">
                      Nasledujúca
                    </span>
                    <span className="font-medium text-[#2A2A2A] group-hover:text-[#3C8C80] transition-colors line-clamp-1">
                      {adjacentAktuality.next.title}
                    </span>
                  </div>
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F2F7F5] group-hover:bg-white flex items-center justify-center text-[#3C8C80] transition-colors">
                    →
                  </span>
                </Link>
              ) : (
                <div className="p-4 rounded-xl border border-dashed border-[#E4E4E4] h-full flex items-center justify-center text-[#9CA3AF] text-sm">
                  Žiadna nasledujúca
                </div>
              )}
            </div>
          </div>
        </nav>
      )}

      {/* Contact CTA */}
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
