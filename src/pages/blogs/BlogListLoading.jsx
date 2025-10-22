import React from "react";

export default function BlogListLoading() {
  const skeletonCards = [1, 2, 3];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {skeletonCards.map((i) => (
        <div
          key={i}
          className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm bg-white animate-pulse"
        >
          {/* Image skeleton */}
          <div className="w-full h-48 bg-gray-200"></div>

          {/* Content */}
          <div className="p-5 space-y-3">
            {/* Category badge */}
            <div className="w-32 h-5 bg-gray-200 rounded-full"></div>

            {/* Meta row (date + read time) */}
            <div className="flex items-center space-x-2 mt-1">
              <div className="w-24 h-4 bg-gray-200 rounded"></div>
              <div className="w-16 h-4 bg-gray-200 rounded"></div>
            </div>

            {/* Title */}
            <div className="w-3/4 h-6 bg-gray-200 rounded"></div>
            <div className="w-2/3 h-6 bg-gray-200 rounded"></div>

            {/* Description */}
            <div className="w-full h-4 bg-gray-200 rounded"></div>
            <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
            <div className="w-2/3 h-4 bg-gray-200 rounded"></div>

            {/* Tags */}
            <div className="flex space-x-2 mt-3">
              <div className="w-16 h-5 bg-gray-200 rounded-full"></div>
              <div className="w-20 h-5 bg-gray-200 rounded-full"></div>
            </div>

            {/* Author + Button */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                <div className="w-24 h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="w-24 h-8 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
