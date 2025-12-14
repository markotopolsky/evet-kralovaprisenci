import { notFound } from "next/navigation";
import { BlogForm } from "../BlogForm";

async function fetchBlog(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/admin/blogs/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await fetchBlog(id);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Upraviť blog
          </h1>
          <p className="text-gray-500 mb-6">
            Aktualizujte obsah článku a uložte zmeny.
          </p>

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
    </div>
  );
}



