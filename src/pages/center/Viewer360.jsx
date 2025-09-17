// src/pages/center/Viewer360.jsx
import React, { useEffect, useRef, useState } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import "@photo-sphere-viewer/core/index.css";

const Viewer360 = ({ images = [] }) => {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  

  useEffect(() => {
    if (!containerRef.current || images.length === 0) return;

    if (!viewerRef.current) {
      // Create viewer once
      viewerRef.current = new Viewer({
        container: containerRef.current,
        panorama: images[currentIndex],
        navbar: ["zoom", "fullscreen"],
        mousewheel: false, // disable scroll zoom
      });
    } else {
      // Update panorama without re-creating
      viewerRef.current.setPanorama(images[currentIndex]);
    }

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [currentIndex, images]);

  const handleSelect = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full">
      {/* 360 Viewer */}
      <div
        ref={containerRef}
        className="w-full max-w-7xl mx-auto h-[500px] rounded-2xl shadow-md"
      />

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex justify-center gap-3 mt-4 flex-wrap">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`border-2 rounded-lg overflow-hidden w-20 h-14 transition cursor-pointer 
                ${currentIndex === idx ? "border-blue-500" : "border-gray-300"}`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Viewer360;
