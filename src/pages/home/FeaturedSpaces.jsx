import React, { useEffect, useState } from "react";
import { Monitor, Wifi, Snowflake, ChevronRight } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/constants";

const FeaturedSpaces = () => {

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

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSpaces =
    activeCategory === "All"
      ? spaces
      : spaces.filter((space) => space.category === activeCategory);

  return (
    <div className="bg-gray-50 py-10">
      {/* Heading */}
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-sm text-gray-500">/ Featured Workspaces /</p>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-2">
          <h2 className="text-4xl font-bold max-w-xl font-serif">
            Tailored Solutions for Your Unique Work Needs.
          </h2>
          <p className="text-gray-500 max-w-sm mt-4 md:mt-0">
            Coworking, Reimagined for Visionaries and Leaders.

          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full cursor-pointer border transition ${activeCategory === cat
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {cat}
            </button>
          ))}

        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={fetchSpaces}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Cards */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {filteredSpaces.slice(0, 6).map((space, idx) => (
              <div
                key={space.id || idx}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 p-1"
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
                  <h3 className="text-lg font-semibold line-clamp-1">{space.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2">{space.desc}</p>
                  
                  {/* Location */}
                  {space.location && (
                    <p className="text-gray-400 text-xs mt-1">{space.location}</p>
                  )}

                  

                  {/* Price and Button */}
                  <div className="flex items-center justify-between mt-5">
                    <div className="text-left">
                      <span className="text-lg font-bold">{space.price}</span>
                      <span className="text-gray-500 text-sm ml-1">{space.unit}</span>
                    </div>
                    <button
                      onClick={() => { navigate(space.route) }}
                      className="bg-white text-black border border-black px-4 py-2 rounded-lg hover:bg-black hover:text-white transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && !error && filteredSpaces.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">No products found for the selected category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedSpaces;
