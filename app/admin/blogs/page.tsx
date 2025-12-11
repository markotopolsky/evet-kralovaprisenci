import Link from "next/link";
import { formatDate } from "@/lib/utils";

async function fetchBlogs() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/admin/blogs`, { cache: "no-store" });
  if (!res.ok) {
    return [];
  }
  return res.json();
}

export default async function AdminBlogsPage() {
  const blogs = await fetchBlogs();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Blogy</h1>
            <p className="text-gray-500">Spravujte články na blogu.</p>
          </div>
          <Link
            href="/admin/blogs/create"
            className="px-4 py-2 bg-[#3C8C80] text-white font-medium rounded-lg hover:bg-[#2d6b62] transition-colors"
          >
            Vytvoriť nový blog
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Názov
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Autor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vytvorené
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Publikované
                  </th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogs.map((blog: any) => (
                  <tr key={blog._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {blog.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {blog.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {blog.createdAt ? formatDate(blog.createdAt) : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          blog.published
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-gray-50 text-gray-600 border border-gray-200"
                        }`}
                      >
                        {blog.published ? "Áno" : "Nie"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/admin/blogs/${blog._id}`}
                        className="text-[#3C8C80] hover:text-[#2d6b62]"
                      >
                        Upraviť
                      </Link>
                    </td>
                  </tr>
                ))}

                {blogs.length === 0 && (
                  <tr>
                    <td className="px-6 py-6 text-center text-gray-500" colSpan={5}>
                      Žiadne blogy zatiaľ nie sú.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
