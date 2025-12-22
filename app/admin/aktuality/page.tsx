"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";

interface AktualitaItem {
  _id: string;
  title: string;
  slug: string;
  author: string;
  category: string;
  createdAt: string;
  published: boolean;
}

const categoryLabels: Record<string, string> = {
  warning: "Varovanie",
  disease: "Choroba",
  info: "Info",
  general: "Všeobecné",
};

const categoryColors: Record<string, string> = {
  warning: "bg-orange-100 text-orange-700",
  disease: "bg-red-100 text-red-700",
  info: "bg-blue-100 text-blue-700",
  general: "bg-gray-100 text-gray-600",
};

export default function AdminAktualityPage() {
  const [aktuality, setAktuality] = useState<AktualitaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/aktuality", { cache: "no-store" })
      .then((res) => res.json())
      .then(setAktuality)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Odstrániť "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/aktuality/${id}`, { method: "DELETE" });
      if (res.ok) {
        setAktuality(aktuality.filter((a) => a._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function togglePublish(id: string, published: boolean) {
    try {
      const res = await fetch(`/api/admin/aktuality/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !published }),
      });
      if (res.ok) {
        setAktuality(aktuality.map((a) => (a._id === id ? { ...a, published: !published } : a)));
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return <p className="text-[#5C5C5C]">Načítavam...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#2A2A2A]">Aktuality</h1>
        <Link href="/admin/aktuality/create" className="btn-primary">
          + Nová aktualita
        </Link>
      </div>

      {aktuality.length === 0 ? (
        <div className="card-friendly p-8 text-center">
          <p className="text-[#5C5C5C] mb-4">Zatiaľ žiadne aktuality.</p>
          <Link href="/admin/aktuality/create" className="btn-primary">
            Vytvoriť prvú aktualitu
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {aktuality.map((aktualita) => (
            <div key={aktualita._id} className="card-friendly p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-medium text-[#2A2A2A] truncate">{aktualita.title}</h3>
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${categoryColors[aktualita.category] || categoryColors.general}`}
                    >
                      {categoryLabels[aktualita.category] || aktualita.category}
                    </span>
                    <span
                      onClick={() => togglePublish(aktualita._id, aktualita.published)}
                      className={`px-2 py-0.5 text-xs rounded-full cursor-pointer ${
                        aktualita.published
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {aktualita.published ? "Publikované" : "Koncept"}
                    </span>
                  </div>
                  <p className="text-sm text-[#5C5C5C]">
                    {aktualita.author} • {aktualita.createdAt ? formatDate(aktualita.createdAt) : "-"}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Link
                    href={`/vase-zvieratko/aktuality/${aktualita.slug}`}
                    target="_blank"
                    className="text-[#5C5C5C] hover:text-[#3C8C80]"
                  >
                    ↗
                  </Link>
                  <Link
                    href={`/admin/aktuality/${aktualita._id}`}
                    className="text-[#3C8C80] hover:underline"
                  >
                    Upraviť
                  </Link>
                  <button
                    onClick={() => handleDelete(aktualita._id, aktualita.title)}
                    className="text-red-600 hover:underline"
                  >
                    Zmazať
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


