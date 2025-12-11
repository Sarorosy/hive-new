import React from "react";
import { API_URL, formatTime, getReadTime } from "../../utils/constants";
import { useNavigate, useOutletContext } from "react-router-dom";
import BlogListLoading from "./BlogListLoading";

function BlogsListPage({ blogs, blogLoading }) {
  const navigate = useNavigate();
  const { theme } = useOutletContext();

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen mt-14 ${
        isDark ? "bg-[#0b0b0b] text-white" : "bg-white text-black"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h1
              className={`text-3xl sm:text-4xl liber tracking-tight ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              Insights & Stories
            </h1>
            <p className={`mt-2 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              Curated reads from The Hive team.
            </p>
          </div>
        </div>

        {/* Grid */}
        {blogLoading ? (
          <BlogListLoading />
        ) : (
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs?.map((post) => (
              <article
                key={post.id}
                className={`
                  group relative overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-xl
                  ${
                    isDark
                      ? "bg-[#111] border-gray-800 hover:shadow-black/40"
                      : "bg-white border-gray-200"
                  }
                `}
              >
                {/* Featured badge */}
                {post.is_featured == 1 && (
                  <span className="absolute left-4 top-4 z-10 inline-flex items-center rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                    Featured
                  </span>
                )}

                {/* Image */}
                <button
                  onClick={() => navigate(`/blog/${post.slug}`)}
                  className="block"
                >
                  <div className="relative">
                    <img
                      src={`${API_URL}/${post.thumbnail}`}
                      alt={post.title}
                      className="h-48 w-full object-cover transition-all duration-500 group-hover:scale-[1.02]"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-10"
                      style={{
                        background: "linear-gradient(180deg, #000 0%, #000 100%)",
                      }}
                    />
                  </div>
                </button>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  {/* Category & meta */}
                  <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                    {post.category_name && (
                      <span
                        className={`
                          inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide
                          ${isDark ? "border-white text-white" : "border-black text-black"}
                        `}
                      >
                        {post.category_name}
                      </span>
                    )}

                    <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      {formatTime(post.created_at)} • {getReadTime(post.description)}
                    </span>
                  </div>

                  {/* Title */}
                  <button
                    onClick={() => navigate(`/blog/${post.slug}`)}
                    className="block"
                  >
                    <h2
                      className={`
                        text-lg sm:text-xl liber transition-colors line-clamp-2
                        ${isDark ? "text-white group-hover:text-orange-400" : "text-black group-hover:text-orange-500"}
                      `}
                    >
                      {post.title}
                    </h2>
                  </button>

                  {/* Excerpt */}
                  <p
                    className={`mt-2 text-sm line-clamp-3 ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: post.description.replace(/<img[^>]*>/gi, ""),
                    }}
                  ></p>

                  {/* Tags */}
                  {post?.tag_list?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tag_list.map((tag, i) => (
                        <span
                          key={i}
                          className={`
                            inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium transition-colors
                            ${
                              isDark
                                ? "border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-400"
                                : "border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-600"
                            }
                          `}
                        >
                          #{tag.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`
                          grid h-9 w-9 place-items-center rounded-full text-xs liber
                          ${isDark ? "bg-white text-black" : "bg-black text-white"}
                        `}
                      >
                        TH
                      </div>
                      <div className="leading-tight">
                        <p
                          className={`text-sm font-semibold ${
                            isDark ? "text-white" : "text-black"
                          }`}
                        >
                          The Hive Team
                        </p>
                        <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                          {formatTime(post.created_at)}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/blog/${post.slug}`)}
                      className={`
                        inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all
                        ${
                          isDark
                            ? "border-white text-white hover:bg-orange-500 hover:border-orange-500"
                            : "border-black text-black hover:bg-orange-500 hover:border-orange-500 hover:text-white"
                        }
                      `}
                    >
                      Read more
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M5 12h14M13 5l7 7-7 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogsListPage;
