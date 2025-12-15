import { useEffect, useMemo, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { API_URL } from "../../utils/constants";

const LatestBlogs = () => {
  const navigate = useNavigate();
  const { theme } = useOutletContext();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/blogs`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.status) {
        setBlogs(data.blogs || []);
      } else {
        console.error(data.message || "Failed to fetch blogs");
      }
    } catch (error) {
      console.error("Failed to load blogs data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const latestBlogs = useMemo(() => {
    if (!Array.isArray(blogs) || blogs.length === 0) return [];

    return [...blogs]
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() -
          new Date(a.publishedAt).getTime()
      )
      .slice(0, 3);
  }, [blogs]);

  if (loading && latestBlogs.length === 0) return null;

  return (
    <div className={`w-full ${theme == "dark" ? "bg-black" : "bg-white"}`}>
    <section
      className={`
        max-w-[90%] mx-auto px-4 py-12
        ${theme === "dark" ? "text-white bg-black" : "text-black"}
      `}
    >
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-10">
        <div>
          <h2
            className={`
              text-3xl sm:text-4xl font-bold liber
              ${theme === "dark" ? "text-white" : "text-black"}
            `}
          >
            Latest Blogs
          </h2>

          <p
            className={`
              text-sm mt-2
              ${theme === "dark" ? "text-gray-400" : "text-gray-500"}
            `}
          >
            Fresh perspectives from The Hive team to keep you inspired.
          </p>
        </div>

        {/* View All button */}
        <button
          type="button"
          onClick={() => navigate("/blog")}
          className={`
            inline-flex items-center justify-center px-6 py-2 text-sm font-semibold transition-all duration-200
            ${
              theme === "dark"
                ? "text-black bg-white hover:bg-gradient-to-br hover:from-goldt hover:via-gold hover:to-goldt hover:text-black"
                : "bg-gradient-to-br from-goldt via-gold to-goldt text-black hover:bg-black "
            }
          `}
        >
          View all <ArrowRight size={16} className="ml-2" />
        </button>
      </div>

      {/* Blog Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {latestBlogs.map((blog) => (
          <article
            key={blog.id}
            className={`
              flex flex-col overflow-hidden rounded-tl-4xl rounded-br-4xl shadow-sm transition-all duration-200 border
              ${
                theme === "dark"
                  ? "border-white/10 bg-black hover:border-white/20"
                  : "border-black/10 bg-white"
              }
            `}
          >
            <button
              type="button"
              onClick={() => navigate(`/blog/${blog.slug}`)}
              className=" overflow-hidden"
            >
              <img
                src={`${API_URL}/${blog.thumbnail}`}
                alt={blog.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </button>

            <div className="flex flex-col gap-3 p-6">
              <button
                type="button"
                onClick={() => navigate(`/blog/${blog.slug}`)}
                className="text-left"
              >
                <h3
                  className={`
                    text-lg font-semibold line-clamp-2
                    ${theme === "dark" ? "text-white" : "text-black"}
                  `}
                >
                  {blog.title}
                </h3>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
    </div>
  );
};

export default LatestBlogs;
