"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";

interface BlogItem {
  _id: string;
  title: string;
  slug: string;
  author: string;
  createdAt: string;
  published: boolean;
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/blogs", { cache: "no-store" })
      .then((res) => res.json())
      .then(setBlogs)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Odstrániť "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
      if (res.ok) {
        setBlogs(blogs.filter((b) => b._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function togglePublish(id: string, published: boolean) {
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !published }),
      });
      if (res.ok) {
        setBlogs(blogs.map((b) => (b._id === id ? { ...b, published: !published } : b)));
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
        <h1 className="text-2xl font-bold text-[#2A2A2A]">Blogy</h1>
        <Link href="/admin/blogs/create" className="btn-primary">
          + Nový blog
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="card-friendly p-8 text-center">
          <p className="text-[#5C5C5C] mb-4">Zatiaľ žiadne blogy.</p>
          <Link href="/admin/blogs/create" className="btn-primary">
            Vytvoriť prvý blog
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {blogs.map((blog) => (
            <div key={blog._id} className="card-friendly p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-[#2A2A2A] truncate">{blog.title}</h3>
                    <span
                      onClick={() => togglePublish(blog._id, blog.published)}
                      className={`px-2 py-0.5 text-xs rounded-full cursor-pointer ${
                        blog.published
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {blog.published ? "Publikovaný" : "Koncept"}
                    </span>
                  </div>
                  <p className="text-sm text-[#5C5C5C]">
                    {blog.author} • {blog.createdAt ? formatDate(blog.createdAt) : "-"}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Link
                    href={`/blog/${blog.slug}`}
                    target="_blank"
                    className="text-[#5C5C5C] hover:text-[#3C8C80]"
                  >
                    ↗
                  </Link>
                  <Link
                    href={`/admin/blogs/${blog._id}`}
                    className="text-[#3C8C80] hover:underline"
                  >
                    Upraviť
                  </Link>
                  <button
                    onClick={() => handleDelete(blog._id, blog.title)}
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
