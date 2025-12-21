import { notFound } from "next/navigation";
import { BlogForm } from "../BlogForm";
import Link from "next/link";

async function fetchBlog(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/admin/blogs/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await fetchBlog(id);

  if (!blog) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-[#5C5C5C]">
        <Link href="/admin/blogs" className="hover:text-[#3C8C80]">Blogy</Link>
        <span>→</span>
        <span className="text-[#2A2A2A] truncate max-w-[200px]">{blog.title}</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#2A2A2A]">Upraviť blog</h1>
        <Link
          href={`/blog/${blog.slug}`}
          target="_blank"
          className="text-sm text-[#5C5C5C] hover:text-[#3C8C80]"
        >
          ↗ Náhľad
        </Link>
      </div>

      <div className="card-friendly p-6">
        <BlogForm
          mode="edit"
          blogId={id}
          initialData={{
            title: blog.title,
            slug: blog.slug,
            content: blog.content,
            imageBase64: blog.imageBase64 ?? "",
            author: blog.author,
            published: blog.published ?? false,
          }}
        />
      </div>
    </div>
  );
}
