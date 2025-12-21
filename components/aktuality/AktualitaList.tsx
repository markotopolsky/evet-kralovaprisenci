"use client";

import Link from "next/link";
import { calculateReadTime, formatDate, truncate } from "@/lib/utils";
import { text } from "@/lib/i18n/translations";
import { Newspaper, AlertTriangle, Bug, Info } from "lucide-react";

type AktualitaCategory = "warning" | "disease" | "info" | "general";

type AktualitaListItem = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  category?: AktualitaCategory;
  createdAt: string | Date;
  excerpt?: string;
  imageBase64?: string | null;
};

interface AktualitaListProps {
  aktuality: AktualitaListItem[];
}

const categoryConfig: Record<AktualitaCategory, { icon: React.ReactNode; color: string; label: string }> = {
  warning: {
    icon: <AlertTriangle className="w-4 h-4" />,
    color: "bg-orange-100 text-orange-700",
    label: "Varovanie",
  },
  disease: {
    icon: <Bug className="w-4 h-4" />,
    color: "bg-red-100 text-red-700",
    label: "Choroba",
  },
  info: {
    icon: <Info className="w-4 h-4" />,
    color: "bg-blue-100 text-blue-700",
    label: "Informácia",
  },
  general: {
    icon: <Newspaper className="w-4 h-4" />,
    color: "bg-gray-100 text-gray-600",
    label: "Aktualita",
  },
};

export function AktualitaList({ aktuality }: AktualitaListProps) {
  if (!aktuality.length) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-primary-light rounded-full flex items-center justify-center">
          <Newspaper className="w-12 h-12 text-primary/40" />
        </div>
        <p className="text-text-muted">Žiadne aktuality zatiaľ nie sú k dispozícii.</p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {aktuality.map((aktualita) => {
        const excerpt = aktualita.excerpt ?? truncate(aktualita.content, 160);
        const readTime = calculateReadTime(aktualita.content);
        const category = aktualita.category || "general";
        const config = categoryConfig[category];

        return (
          <Link
            key={aktualita._id}
            href={`/vase-zvieratko/aktuality/${aktualita.slug}`}
            className="card-friendly overflow-hidden group"
          >
            <div className="aspect-video bg-primary-light flex items-center justify-center overflow-hidden relative">
              {aktualita.imageBase64 ? (
                <img
                  src={`data:image/*;base64,${aktualita.imageBase64}`}
                  alt={aktualita.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <Newspaper className="w-16 h-16 text-primary/40" />
              )}
              {/* Category badge on image */}
              <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${config.color}`}>
                {config.icon}
                {config.label}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 text-sm text-text-muted mb-3">
                <time dateTime={new Date(aktualita.createdAt).toISOString()}>
                  {formatDate(aktualita.createdAt)}
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
                {aktualita.title}
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

