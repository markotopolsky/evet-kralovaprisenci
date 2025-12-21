"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

type AktualitaCategory = "warning" | "disease" | "info" | "general";

type AktualitaFormValues = {
  title: string;
  slug: string;
  content: string;
  imageBase64: string;
  author: string;
  category: AktualitaCategory;
  published: boolean;
};

type AktualitaFormProps = {
  mode: "create" | "edit";
  aktualitaId?: string;
  initialData?: Partial<AktualitaFormValues>;
};

const categoryOptions: { value: AktualitaCategory; label: string }[] = [
  { value: "general", label: "Všeobecné" },
  { value: "warning", label: "Varovanie" },
  { value: "disease", label: "Choroba / Ochorenie" },
  { value: "info", label: "Informácia" },
];

export function AktualitaForm({ mode, aktualitaId, initialData }: AktualitaFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  const [values, setValues] = useState<AktualitaFormValues>({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    content: initialData?.content ?? "",
    imageBase64: initialData?.imageBase64 ?? "",
    author: initialData?.author ?? "",
    category: initialData?.category ?? "general",
    published: initialData?.published ?? false,
  });

  function handleChange(field: keyof AktualitaFormValues, value: string | boolean) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setValues((prev) => ({ ...prev, imageBase64: base64.split(",")[1] }));
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setError(null);

    try {
      const endpoint = mode === "create" ? "/api/admin/aktuality" : `/api/admin/aktuality/${aktualitaId}`;
      const res = await fetch(endpoint, {
        method: mode === "create" ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: values.title,
          slug: values.slug || undefined,
          content: values.content,
          imageBase64: values.imageBase64 || null,
          author: values.author,
          category: values.category,
          published: values.published,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Chyba pri ukladaní");
      }

      setStatus("Uložené ✓");
      if (mode === "create") {
        router.push("/admin/aktuality");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Chyba");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-[#5C5C5C] mb-1">Názov *</label>
          <input
            type="text"
            value={values.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
            className="w-full px-4 py-2 border border-[#e8e6e1] rounded-lg focus:ring-2 focus:ring-[#3C8C80] focus:border-[#3C8C80] outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-[#5C5C5C] mb-1">Autor *</label>
          <input
            type="text"
            value={values.author}
            onChange={(e) => handleChange("author", e.target.value)}
            required
            className="w-full px-4 py-2 border border-[#e8e6e1] rounded-lg focus:ring-2 focus:ring-[#3C8C80] focus:border-[#3C8C80] outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-[#5C5C5C] mb-1">Slug</label>
          <input
            type="text"
            value={values.slug}
            onChange={(e) => handleChange("slug", e.target.value)}
            placeholder="vygeneruje sa z názvu"
            className="w-full px-4 py-2 border border-[#e8e6e1] rounded-lg focus:ring-2 focus:ring-[#3C8C80] focus:border-[#3C8C80] outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-[#5C5C5C] mb-1">Kategória</label>
          <select
            value={values.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="w-full px-4 py-2 border border-[#e8e6e1] rounded-lg focus:ring-2 focus:ring-[#3C8C80] focus:border-[#3C8C80] outline-none bg-white"
          >
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm text-[#5C5C5C] mb-1">Obrázok</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="aktualita-file"
        />
        <label
          htmlFor="aktualita-file"
          className="inline-block px-4 py-2 border border-[#e8e6e1] rounded-lg text-sm text-[#2A2A2A] cursor-pointer hover:border-[#3C8C80]"
        >
          Vybrať obrázok
        </label>
        <p className="text-sm text-[#5C5C5C] mt-1">
          {fileName || (values.imageBase64 ? "Obrázok nahraný" : "Žiadny súbor")}
        </p>
        {values.imageBase64 && (
          <div className="mt-2 relative inline-block">
            <img
              src={`data:image/png;base64,${values.imageBase64}`}
              alt="Preview"
              className="max-h-20 rounded border border-[#e8e6e1]"
            />
            <button
              type="button"
              onClick={() => { handleChange("imageBase64", ""); setFileName(""); }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-sm"
            >
              ×
            </button>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm text-[#5C5C5C] mb-1">Obsah *</label>
        <textarea
          value={values.content}
          onChange={(e) => handleChange("content", e.target.value)}
          required
          rows={10}
          className="w-full px-4 py-2 border border-[#e8e6e1] rounded-lg focus:ring-2 focus:ring-[#3C8C80] focus:border-[#3C8C80] outline-none resize-y"
        />
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={values.published}
          onChange={(e) => handleChange("published", e.target.checked)}
          className="w-5 h-5 rounded border-[#e8e6e1] text-[#3C8C80] focus:ring-[#3C8C80]"
        />
        <span className="text-[#2A2A2A]">Publikovať</span>
      </label>

      {status && <p className="text-green-600 text-sm">{status}</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
          {loading ? "Ukladám..." : mode === "create" ? "Vytvoriť" : "Uložiť"}
        </button>
        <Link href="/admin/aktuality" className="text-[#2A2A2A]">
          Zrušiť
        </Link>
      </div>
    </form>
  );
}

