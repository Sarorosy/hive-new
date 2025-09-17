import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { allSpaces } from "../../data/productData";
import { DateRange } from "react-date-range";
import { addDays, isBefore, startOfDay } from "date-fns";
import RelatedProducts from "./RelatedProducts";

const ProductPage = () => {
  const { slug } = useParams();
  const product = allSpaces.find(
    (item) =>
      item.route &&
      item.route.toLowerCase() === `product/${slug}`.toLowerCase()
  );

  const today = startOfDay(new Date());

  // 🔹 View type toggle
  const [mode, setMode] = useState("month"); // "day" | "month"

  // 🔹 Date state
  const [range, setRange] = useState([
    {
      startDate: today,
      endDate: addDays(today, 29),
      key: "selection",
    },
  ]);

  if (!product) return <Navigate to="/" replace />;

  // Handle user selecting date(s)
  const handleSelect = (ranges) => {
    const start = ranges.selection.startDate;
    if (isBefore(start, today)) return;

    if (mode === "day") {
      // Single date mode
      setRange([{ startDate: start, endDate: start, key: "selection" }]);
    } else {
      // Month mode → force 30 days
      setRange([{ startDate: start, endDate: addDays(start, 29), key: "selection" }]);
    }
  };

 const getNumericPrice = () => {
  return Number(product.price.replace(/[^\d]/g, "")); // "₹ 7000" → 7000
};

// Calculate per-day / per-month cost
const calcCost = () => {
  const monthly = getNumericPrice();
  if (mode === "day") {
    return Math.round(monthly / 30); // per day
  } else {
    return monthly; // per month
  }
};

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 max-w-6xl mx-auto mt-12">
        {/* Left */}
        <div>
          <img
            src={product.img}
            alt={product.title}
            className="w-full h-80 object-cover rounded-2xl shadow"
          />
          <h1 className="text-3xl font-bold mt-4">{product.title}</h1>
          <p className="text-gray-500 mt-2">{product.desc}</p>
          <p className="text-2xl font-bold text-green-600 mt-4 shimmer">
            {product.price} <span className="text-sm">/month</span>
          </p>

          {/* Amenities */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Amenities</h2>
            <div className="grid grid-cols-2 gap-3">
              {product.amenities.map((a, idx) => {
                const Icon = a.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg shadow-sm"
                  >
                    {Icon && <Icon className="w-5 h-5 text-orange-500" />}
                    <span className="text-gray-700 text-sm">{a.caption}</span>
                  </div>
                );
              })}
              <div className="flex items-center justify-center bg-gray-100 p-2 rounded-lg shadow-sm transition">
                <span className="text-orange-500 font-medium text-sm">and More ++</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="border rounded-2xl shadow p-4 w-full">
          {/* 🔹 Dropdown Toggle */}
          <div className="mb-4">
            <label className="mr-2 font-medium">Booking Type:</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="border rounded p-2"
            >
              <option value="month">Per Month</option>
              <option value="day">Per Day</option>
            </select>
          </div>

          <DateRange
            ranges={range}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            minDate={today}
            showDateDisplay={false}
            months={2}
            direction="vertical"
            rangeColors={["#ff7413"]}
            editableDateInputs={true}
          />

          <div className="mt-4 bg-orange-100 p-3 rounded-lg">
            <p>
              <strong>Booking:</strong>{" "}
              {range[0].startDate.toLocaleDateString()} to{" "}
              {range[0].endDate.toLocaleDateString()}
            </p>
            <p>
              <strong>Booking cost:</strong> ₹{calcCost()}
            </p>
          </div>

          <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
            Book Now
          </button>
        </div>
      </div>
      <RelatedProducts location={product.location || "all"} currentRoute={product.route} />
    </>
  );
};

export default ProductPage;
