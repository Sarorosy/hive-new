import React from "react";
import { useParams, Link } from "react-router-dom";
import { blogs } from "../../data/blogsData";

function BlogDetails() {
  const { slug } = useParams();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black">Blog not found</h2>
          <Link
            to="/blogs"
            className="mt-4 inline-block rounded-full border border-black px-4 py-2 font-semibold text-black transition-all hover:bg-orange-500 hover:border-orange-500 hover:text-white"
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // Related blogs (exclude current)
  const relatedBlogs = blogs.filter((b) => b.slug !== slug).slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* LEFT - Main Content */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="mb-8">
            {blog.category && (
              <span className="inline-flex items-center rounded-full border border-black px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black">
                {blog.category}
              </span>
            )}
            <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-black">
              {blog.title}
            </h1>
            <div className="mt-3 flex items-center gap-3 text-sm text-gray-600">
              <span>{blog.author}</span>
              <span>•</span>
              <span>{formatDate(blog.publishedAt)}</span>
              <span>•</span>
              <span>{blog.readTime}</span>
            </div>
          </div>

          {/* Image */}
          <div className="overflow-hidden rounded-2xl">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-80 object-cover grayscale transition-all duration-500 hover:grayscale-0"
            />
          </div>

          {/* Content */}
          <div
            className="prose prose-lg mt-8 max-w-none text-gray-800 prose-headings:text-black prose-a:text-orange-600"
            dangerouslySetInnerHTML={{
              __html: blog.content.replace(/\n/g, "<br/>"),
            }}
          />

          {/* Tags */}
          {blog.tags?.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {blog.tags.map((tag, i) => (
                <span
                  key={i}
                  className="inline-flex items-center rounded-full border border-gray-300 px-3 py-1 text-sm font-medium
                             text-gray-700 hover:border-orange-500 hover:text-orange-600 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Back button */}
          <div className="mt-12">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 rounded-full border border-black px-5 py-2 text-sm font-semibold text-black transition-all hover:bg-orange-500 hover:border-orange-500 hover:text-white"
            >
              ← Back to Blogs
            </Link>
          </div>
        </div>

        {/* RIGHT - Related Blogs Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <h3 className="text-xl font-bold text-black mb-6">Related Blogs</h3>
            <div className="space-y-6">
              {relatedBlogs.map((rb) => (
                <Link
                  key={rb.id}
                  to={`/blog/${rb.slug}`}
                  className="group block rounded-xl border border-gray-200 overflow-hidden hover:border-orange-500 transition-all"
                >
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={rb.image}
                      alt={rb.title}
                      className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-bold text-black line-clamp-2 group-hover:text-orange-500">
                      {rb.title}
                    </h4>
                    <p className="mt-2 text-xs text-gray-600 line-clamp-2">
                      {rb.excerpt}
                    </p>
                    <span className="mt-2 block text-[11px] font-medium text-gray-500">
                      {formatDate(rb.publishedAt)} • {rb.readTime}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default BlogDetails;
