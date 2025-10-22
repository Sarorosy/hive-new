import React from "react";

const ProductLoader = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-pulse mt-6">
      {/* Left side - Image skeleton */}
      <div className="w-full rounded-2xl overflow-hidden bg-gray-200 h-[400px]"></div>

      {/* Right side - Booking panel */}
      <div className="border rounded-2xl p-6 shadow-sm bg-white">
        {/* Calendar placeholder */}
        <div className="h-[320px] bg-gray-200 rounded-xl mb-6"></div>

        {/* Available Time Slots heading */}
        <div className="h-5 w-1/3 bg-gray-200 rounded mb-3"></div>
        <div className="h-4 w-2/3 bg-gray-200 rounded mb-4"></div>

        {/* Booking info box */}
        <div className="bg-gray-100 rounded-xl p-4 space-y-3">
          <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-4 w-2/5 bg-gray-200 rounded"></div>
        </div>

        {/* Book Now button */}
        <div className="mt-5 h-10 w-32 bg-gray-300 rounded-xl mx-auto"></div>
      </div>

      {/* Bottom section (title + description) */}
      <div className="col-span-2 mt-8 space-y-4">
        {/* Location tag */}
        <div className="h-6 w-28 bg-gray-200 rounded-full"></div>

        {/* Title */}
        <div className="h-7 w-2/5 bg-gray-200 rounded"></div>

        {/* Paragraph lines */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-11/12 bg-gray-200 rounded"></div>
          <div className="h-4 w-10/12 bg-gray-200 rounded"></div>
          <div className="h-4 w-9/12 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductLoader;
