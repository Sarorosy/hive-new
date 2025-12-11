import React, { useEffect, useState } from "react";

const CityCarousel = ({ city, totalImages, basePath, theme }) => {
  const [index, setIndex] = useState(0);

  const images = Array.from(
    { length: totalImages },
    (_, i) => `${basePath}/${i + 1}.jpg`
  );

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      className={`
        relative rounded-2xl overflow-hidden shadow-lg border transition
        ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
      `}
    >
      {/* SOLD OUT STRIP */}
      <div
        className={`
          absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 
          z-20 w-full text-center font-bold text-lg py-2 shadow-lg
          ${theme === "dark" ? "bg-white/90 text-black" : "bg-white text-black"}
        `}
      >
        SOLD OUT
      </div>

      {/* IMAGE WRAPPER */}
      <div className="relative h-64 overflow-hidden">
        <img
          key={images[index]}
          src={images[index]}
          alt={`${city} workspace`}
          className="w-full h-full object-cover transition-opacity duration-500"
        />

        {/* DOTS */}
        <div
          className={`
            absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1 rounded-full backdrop-blur-sm
            ${theme === "dark" ? "bg-black/40" : "bg-black/30"}
          `}
        >
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setIndex(i);
              }}
              className={`w-1.5 h-1.5 rounded-full ${
                i === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* TITLE */}
      <div className="p-6">
        <h3
          className={`
            text-2xl font-bold mb-2
            ${theme === "dark" ? "text-white" : "text-black"}
          `}
        >
          {city}
        </h3>

        <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
          Premium managed office — currently unavailable.
        </p>
      </div>
    </div>
  );
};

export default CityCarousel;
