import { BlogForm } from "../BlogForm";
import Link from "next/link";

export default function CreateBlogPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-[#5C5C5C]">
        <Link href="/admin/blogs" className="hover:text-[#3C8C80]">Blogy</Link>
        <span>→</span>
        <span className="text-[#2A2A2A]">Nový</span>
      </div>

      <h1 className="text-2xl font-bold text-[#2A2A2A]">Nový blog</h1>

      <div className="card-friendly p-6">
        <BlogForm mode="create" />
      </div>
    </div>
  );
}
