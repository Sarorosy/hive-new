import React, { useEffect, useState } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import { API_URL, formatTime, getReadTime } from "../../utils/constants";

function BlogDetails({ blogs, blogLoading }) {
  const { slug } = useParams();
  const { theme } = useOutletContext(); // ✅ THEME ADDED
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/blogs/get/${slug}`);
      const data = await res.json();
      if (data.status) {
        setBlog(data.data || null);
        setRelatedBlogs(data.data.related_blogs || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  if (!blog) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === "dark" ? "bg-[#0e0e0e]" : "bg-white"
      }`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold ${
            theme === "dark" ? "text-white" : "text-black"
          }`}>
            Blog not found
          </h2>
          <Link
            to="/blog"
            className={`mt-4 inline-block rounded-full px-4 py-2 font-semibold transition-all
            ${
              theme === "dark"
                ? "border-white text-white hover:bg-orange-500 hover:border-orange-500"
                : "border-black text-black hover:bg-orange-500 hover:text-white"
            }`}
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen pt-14 ${
        theme === "dark" ? "bg-[#0e0e0e] text-white" : "bg-white text-black"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2">

          {/* Header */}
          <div className="mb-8">
            {blog.category && (
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide
                ${
                  theme === "dark"
                    ? "border-white text-white"
                    : "border-black text-black"
                }`}
              >
                {blog.category_name}
              </span>
            )}

            <h1
              className={`mt-4 text-3xl sm:text-4xl liber tracking-tight ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              {blog.title}
            </h1>

            <div
              className={`mt-3 flex items-center gap-3 text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <span>The Hive Team</span>
              <span>•</span>
              <span>{formatTime(blog.created_at)}</span>
              <span>•</span>
              <span>{getReadTime(blog.description)}</span>
            </div>
          </div>

          {/* Image */}
          <div className="overflow-hidden rounded-2xl">
            <img
              src={`${API_URL}/${blog.thumbnail}`}
              alt={blog.title}
              className="w-full h-80 object-cover"
            />
          </div>

          {/* Content */}
          <div
            className={`prose prose-lg mt-8 max-w-none
              ${theme === "dark" ? "prose-invert" : "text-gray-800"}
              prose-a:text-orange-500
            `}
            dangerouslySetInnerHTML={{
              __html: blog.description.replace(/\n/g, "<br/>"),
            }}
          />

          {/* Tags */}
          {blog.tag_list?.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {blog.tag_list.map((tag, i) => (
                <span
                  key={i}
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium transition-colors
                    ${
                      theme === "dark"
                        ? "border-gray-600 text-gray-300 hover:text-orange-500 hover:border-orange-500"
                        : "border-gray-300 text-gray-700 hover:text-orange-600"
                    }`}
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Back Button */}
          <div className="mt-12">
            <Link
              to="/blog"
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all
              ${
                theme === "dark"
                  ? "border-white text-white hover:bg-orange-500 hover:border-orange-500"
                  : "border-black text-black hover:bg-orange-500 hover:text-white"
              }`}
            >
              ← Back to Blogs
            </Link>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <h3
              className={`text-xl font-bold mb-6 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Related Blogs
            </h3>

            {loading ? (
              <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                Loading...
              </p>
            ) : (
              <div className="space-y-6">
                {relatedBlogs.map((rb) => (
                  <Link
                    key={rb.id}
                    to={`/blog/${rb.slug}`}
                    className={`group block rounded-xl overflow-hidden border transition-all
                    ${
                      theme === "dark"
                        ? "border-gray-700 hover:border-orange-500"
                        : "border-gray-200 hover:border-orange-500"
                    }`}
                  >
                    <div className="relative h-36 overflow-hidden">
                      <img
                        src={`${API_URL}/${rb.thumbnail}`}
                        alt={rb.title}
                        className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="p-4">
                      <h4
                        className={`text-sm font-bold line-clamp-2 group-hover:text-orange-500 ${
                          theme === "dark" ? "text-white" : "text-black"
                        }`}
                      >
                        {rb.title}
                      </h4>

                      <p
                        className={`mt-2 text-xs line-clamp-2 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                        dangerouslySetInnerHTML={{
                          __html: rb.description.replace(/<img[^>]*>/gi, ""),
                        }}
                      />

                      <span
                        className={`mt-2 block text-[11px] font-medium ${
                          theme === "dark" ? "text-gray-500" : "text-gray-500"
                        }`}
                      >
                        {formatTime(rb.created_at)} • {getReadTime(rb.description)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default BlogDetails;
