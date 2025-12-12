import { BlogForm } from "../BlogForm";

export default function CreateBlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Vytvoriť blog
          </h1>
          <p className="text-gray-500 mb-6">
            Vyplňte formulár a publikujte nový článok.
          </p>

          <BlogForm mode="create" />
        </div>
      </div>
    </div>
  );
}

