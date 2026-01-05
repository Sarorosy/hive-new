import React, { useEffect, useState } from "react";
import { Monitor, Wifi, Snowflake, ChevronRight, Phone } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/constants";

const Products = ({ city, theme }) => {

  const [loading, setLoading] = useState(false);
  const [spaces, setSpaces] = useState([]);
  const [error, setError] = useState(null);

  const fetchSpaces = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_URL}/api/products`);
      const data = await res.json();

      if (data.status && data.products) {
        // Map API data to match component expectations
        const mappedSpaces = data.products.map(product => ({
          id: product.id,
          img: `${API_URL}/${product.thumbnail}`,
          title: product.title,
          desc: product.description.replace(/<[^>]*>/g, '').substring(0, 100) + '...', // Strip HTML and truncate
          desk: "1 Desk", // Default value since API doesn't provide this
          price: `₹ ${product.cost}`,
          unit: product.cost_suffix,
          category: product.tag_list?.[0]?.name || "Other",
          location: product.category_name,
          route: `/product/${product.slug}`,
          slug: product.slug,
          status: product.status
        }));
        setSpaces(mappedSpaces);
      } else {
        setError("Failed to fetch products");
      }
    } catch (err) {
      console.log(err);
      setError("Error loading products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpaces();
  }, [])

  const navigate = useNavigate();

  // Extract unique categories from API data
  const categories = ["All", ...new Set(spaces.map(space => space.category).filter(Boolean))];

  const [activeCategory, setActiveCategory] = useState(city);

  const filteredSpaces =
    activeCategory === "All"
      ? spaces
      : spaces.filter((space) => space.category === activeCategory);

  const handleCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const isDark = theme === "dark";

  return (
    <div className={`py-10 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Heading */}
      <div className="max-w-6xl mx-auto px-4">


        {/* Filters */}
        {/* <div className="flex flex-wrap items-center gap-3 mt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full cursor-pointer border transition ${activeCategory === cat
                ? (isDark ? "bg-white text-black" : "bg-black text-white")
                : (isDark ? "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200")
                }`}
            >
              {cat}
            </button>
          ))}

        </div> */}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${isDark ? "border-white" : "border-black"}`}></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={fetchSpaces}
              className={`px-4 py-2 rounded-lg transition-colors ${isDark ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"}`}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Cards */}
        {!loading && !error && (
          <div className="grid grid-cols-1 gap-6 mt-2">
            {filteredSpaces.map((space, idx) => (
              <div
                key={space.id || idx}
                className={`rounded-2xl overflow-hidden border p-1 transition-colors ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
              >
                <img
                  src={space.img}
                  alt={space.title}
                  className="w-full h-48 object-cover rounded-xl"
                  onError={(e) => {
                    e.target.src = '/placeholder-image.jpg'; // Fallback image
                  }}
                />
                <div className="p-5">
                  <h3 className={`text-lg font-semibold line-clamp-1 ${isDark ? "text-white" : "text-black"}`}>{space.title}</h3>
                  <p className={`text-sm line-clamp-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>{space.desc}</p>

                  {/* Location */}
                  {space.location && (
                    <p className={`text-xs mt-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}>{space.location}</p>
                  )}

                  {/* Price and Button */}
                  <div className="flex items-center justify-between mt-5">
                    <div className="text-left">
                      <span className={`text-lg font-bold ${isDark ? "text-white" : "text-black"}`}>{space.price}</span>
                      <span className={`text-sm ml-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>{space.unit}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCall("+911234567890")}
                    className={`flex w-full text-center items-center justify-center mt-2 px-4 py-2 rounded-lg border transition-colors ${isDark
                      ? "bg-gray-900 text-white border-white hover:bg-white hover:text-black"
                      : "bg-white text-black border-black hover:bg-black hover:text-white"}`}
                  >
                    <Phone size={15} className="mr-2" /> Call us to book now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && !error && filteredSpaces.length === 0 && (
          <div className="text-center py-20">
            <p className={`${isDark ? "text-gray-400" : "text-gray-500"}`}>No products found for the selected category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
