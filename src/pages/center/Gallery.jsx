import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";

const Gallery = ({ images = [] }) => {
  const [selected, setSelected] = useState(null);

  if (selected !== null) {
    return (
      <div className="relative max-w-5xl mx-auto p-4">
        {/* Back Button */}
        <button
          onClick={() => setSelected(null)}
          className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="w-full h-[500px] flex items-center justify-center">
          <img
            src={images[selected]}
            alt="selected"
            className="max-h-full max-w-full object-contain rounded-lg shadow-lg"
          />
        </div>

        {/* Thumbnails Row */}
        <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
          {images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`thumb-${idx}`}
              onClick={() => setSelected(idx)}
              className={`h-28 rounded-lg shadow-md cursor-pointer object-cover flex-shrink-0 transition 
                ${idx === selected ? "ring-4 ring-blue-500" : "hover:opacity-80"}`}
            />
          ))}
        </div>
      </div>
    );
  }

  // Default Masonry Grid
  return (
    <div className="h-[600px] overflow-y-auto max-w-5xl mx-auto p-4">
      <div className="columns-2 sm:columns-3 md:columns-4 gap-4 space-y-4">
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`gallery-${idx}`}
            onClick={() => setSelected(idx)}
            className="w-full mb-4 rounded-lg shadow-md break-inside-avoid object-cover cursor-pointer hover:opacity-90 transition"
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
