"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type BlogFormValues = {
  title: string;
  slug: string;
  content: string;
  imageBase64: string;
  author: string;
  published: boolean;
};

type BlogFormProps = {
  mode: "create" | "edit";
  blogId?: string;
  initialData?: Partial<BlogFormValues>;
};

export function BlogForm({ mode, blogId, initialData }: BlogFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState<BlogFormValues>({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    content: initialData?.content ?? "",
    imageBase64: initialData?.imageBase64 ?? "",
    author: initialData?.author ?? "",
    published: initialData?.published ?? false,
  });

  const actionLabel = mode === "create" ? "Vytvoriť blog" : "Uložiť zmeny";

  function handleChange(field: keyof BlogFormValues, value: string | boolean) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setError(null);

    try {
      const endpoint =
        mode === "create"
          ? "/api/admin/blogs"
          : `/api/admin/blogs/${blogId}`;

      const res = await fetch(endpoint, {
        method: mode === "create" ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: values.title,
          slug: values.slug || undefined,
          content: values.content,
          imageBase64: values.imageBase64 || null,
          author: values.author,
          published: values.published,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Nepodarilo sa uložiť blog");
      }

      setStatus("Blog bol uložený");
      if (mode === "create") {
        router.push("/admin/blogs");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Chyba pri ukladaní");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
          Názov
        </label>
        <input
          id="title"
          type="text"
          value={values.title}
          onChange={(e) => handleChange("title", e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3C8C80] focus:border-[#3C8C80] outline-none"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="slug">
          Slug (nepovinné)
        </label>
        <input
          id="slug"
          type="text"
          value={values.slug}
          onChange={(e) => handleChange("slug", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3C8C80] focus:border-[#3C8C80] outline-none"
          placeholder="napr. moja-novinka"
        />
        <p className="text-sm text-gray-500 mt-1">
          Ak slug nevyplníte, vygeneruje sa z názvu.
        </p>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="author">
          Autor
        </label>
        <input
          id="author"
          type="text"
          value={values.author}
          onChange={(e) => handleChange("author", e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3C8C80] focus:border-[#3C8C80] outline-none"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="content">
          Obsah
        </label>
        <textarea
          id="content"
          value={values.content}
          onChange={(e) => handleChange("content", e.target.value)}
          required
          rows={10}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3C8C80] focus:border-[#3C8C80] outline-none"
          placeholder="Text článku..."
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="imageBase64">
          Obrázok (Base64)
        </label>
        <textarea
          id="imageBase64"
          value={values.imageBase64}
          onChange={(e) => handleChange("imageBase64", e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3C8C80] focus:border-[#3C8C80] outline-none"
          placeholder="Sem vložte Base64 reťazec obrázka (nepovinné)"
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          id="published"
          type="checkbox"
          checked={values.published}
          onChange={(e) => handleChange("published", e.target.checked)}
          className="w-5 h-5 rounded border-gray-300 text-[#3C8C80] focus:ring-[#3C8C80]"
        />
        <label htmlFor="published" className="text-gray-700 font-medium">
          Publikovať
        </label>
      </div>

      {status && (
        <div className="px-4 py-3 rounded-lg bg-green-50 text-green-700 border border-green-200">
          {status}
        </div>
      )}

      {error && (
        <div className="px-4 py-3 rounded-lg bg-red-50 text-red-700 border border-red-200">
          {error}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-[#3C8C80] text-white font-medium rounded-lg hover:bg-[#2d6b62] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Ukladám..." : actionLabel}
        </button>
      </div>
    </form>
  );
}
