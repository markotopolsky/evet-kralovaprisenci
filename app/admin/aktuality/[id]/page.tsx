import { notFound } from "next/navigation";
import { AktualitaForm } from "../AktualitaForm";
import Link from "next/link";

async function fetchAktualita(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/admin/aktuality/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function EditAktualitaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const aktualita = await fetchAktualita(id);

  if (!aktualita) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-[#5C5C5C]">
        <Link href="/admin/aktuality" className="hover:text-[#3C8C80]">Aktuality</Link>
        <span>→</span>
        <span className="text-[#2A2A2A] truncate max-w-[200px]">{aktualita.title}</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#2A2A2A]">Upraviť aktualitu</h1>
        <Link
          href={`/vase-zvieratko/aktuality/${aktualita.slug}`}
          target="_blank"
          className="text-sm text-[#5C5C5C] hover:text-[#3C8C80]"
        >
          ↗ Náhľad
        </Link>
      </div>

      <div className="card-friendly p-6">
        <AktualitaForm
          mode="edit"
          aktualitaId={id}
          initialData={{
            title: aktualita.title,
            slug: aktualita.slug,
            content: aktualita.content,
            imageBase64: aktualita.imageBase64 ?? "",
            author: aktualita.author,
            category: aktualita.category ?? "general",
            published: aktualita.published ?? false,
          }}
        />
      </div>
    </div>
  );
}


