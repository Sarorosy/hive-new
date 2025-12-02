import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { API_URL } from "../../utils/constants";

const LatestBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/blogs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
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
    try {
      if (!Array.isArray(blogs) || blogs.length === 0) {
        return [];
      }

      return [...blogs]
        .sort(
          (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        )
        .slice(0, 3);
    } catch (error) {
      console.error("Failed to load blogs data", error);
      return [];
    }
  }, [blogs]);

  if (loading && latestBlogs.length === 0) {
    return null;
  }

  return (
    <section className="max-w-[90%] mx-auto px-4 py-12">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-10">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold liber text-black">
            Latest Blogs
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Fresh perspectives from The Hive team to keep you inspired.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/blog")}
          className="inline-flex items-center justify-center px-6 py-2 text-sm font-semibold text-black transition-all duration-200 hover:bg-black hover:text-white"
        >
          View all <ArrowRight size={16} className="ml-2" />
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {latestBlogs.map((blog) => (
          <article
            key={blog.id}
            className="flex flex-col overflow-hidden border border-black/10 bg-white shadow-sm transition-all duration-200 "
          >
            <button
              type="button"
              onClick={() => navigate(`/blog/${blog.slug}`)}
              className="block h-48 overflow-hidden"
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
                <h3 className="text-lg font-semibold text-black line-clamp-2">
                  {blog.title}
                </h3>
              </button>

             
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default LatestBlogs;

