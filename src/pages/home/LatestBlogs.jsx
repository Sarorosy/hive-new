import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { blogs } from "../../data/blogsData";
import { ArrowRight } from "lucide-react";

const LatestBlogs = () => {
  const navigate = useNavigate();

  const latestBlogs = useMemo(() => {
    try {
      if (!Array.isArray(blogs) || blogs.length === 0) {
        return [];
      }

      return [...blogs]
        .sort(
          (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        )
        .slice(0, 4);
    } catch (error) {
      console.error("Failed to load blogs data", error);
      return [];
    }
  }, []);

  if (latestBlogs.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-10">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-black">
            Latest Blogs
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Fresh perspectives from The Hive team to keep you inspired.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/blogs")}
          className="inline-flex items-center justify-center px-6 py-2 text-sm font-semibold text-black transition-all duration-200 hover:bg-black hover:text-white"
        >
          View all <ArrowRight size={16} className="ml-2" />
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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
                src={blog.image}
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

