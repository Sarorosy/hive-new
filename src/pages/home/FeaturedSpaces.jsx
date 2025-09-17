import React, { useState } from "react";
import { Monitor, Wifi, Snowflake, ChevronRight } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { allSpaces } from "../../data/productData";

const FeaturedSpaces = () => {
  

const navigate = useNavigate();

  const categories = [
    "All",
    "Dedicated Desk",
    "Flexi Passes",
    "Open Spaces",
    "Private Office",
    "Meeting Room",
  ];

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSpaces =
    activeCategory === "All"
      ? allSpaces
      : allSpaces.filter((space) => space.category === activeCategory);

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
            Integer tincidunt cras dapibus vivamus elementum semper nisi. Aenean
            vulputate eleifend tellus.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full cursor-pointer border transition ${
                activeCategory === cat
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
          
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {filteredSpaces.slice(0, 6).map((space, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden  border border-gray-200 p-1 "
            >
              <img
                src={space.img}
                alt={space.title}
                className="w-full h-48 object-cover rounded-xl"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold">{space.title}</h3>
                <p className="text-gray-500 text-sm">{space.desc}</p>

                {/* Icons */}
                <div className="flex gap-4 mt-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Monitor size={16} /> {space.desk}
                  </div>
                  <div className="flex items-center gap-1">
                    <Wifi size={16} /> Internet
                  </div>
                  <div className="flex items-center gap-1">
                    <Snowflake size={16} /> Full AC
                  </div>
                </div>

                {/* Price and Button */}
                <div className="flex items-center justify-end mt-5">
                
                  <button 
                  disabled={space.route.trim() == ""}
                  onClick={()=>{navigate(space.route)}}
                  className={`bg-white text-black border border-black px-4 py-2 rounded-lg hover:bg-black hover:text-white ${space.route.trim() != "" && "cursor-pointer"}`}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedSpaces;
