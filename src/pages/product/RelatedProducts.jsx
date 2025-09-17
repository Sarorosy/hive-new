import React from "react";
import { useNavigate } from "react-router-dom";
import { Monitor, Wifi, Snowflake } from "lucide-react";
import { allSpaces } from "../../data/productData";

const RelatedProducts = ({ location, currentRoute }) => {
  const navigate = useNavigate();

  // Filter products
  let filtered = allSpaces.filter(
    (item) =>
      item.route &&
      item.route.trim() !== "" &&
      item.route !== currentRoute
  );


  if (location !== "all") {
    filtered = filtered.filter((item) => item.location == location);
  }

  // If no related products, return null
  if (filtered.length === 0) {
    return null
  };


  return (
    <div className="my-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 ml-10">
        {location === "all"
          ? "Explore more spaces"
          : `More spaces in ${location}`}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((space, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl overflow-hidden border border-gray-200 p-1"
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

              {/* Price + Button */}
              <div className="flex items-center justify-between mt-5">
                <p className="text-green-600 font-bold">
                  {space.price} <span className="text-sm">{space.unit}</span>
                </p>
                <button
                  disabled={!space.route || space.route.trim() === ""}
                  onClick={() => navigate(`/${space.route}`)}
                  className={`bg-white text-black border border-black px-4 py-2 rounded-lg hover:bg-black hover:text-white transition ${
                    space.route && space.route.trim() !== ""
                      ? "cursor-pointer"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
