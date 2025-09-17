import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import video from "../../assets/hero.mp4";
import thumbnail from "../../assets/spinner/one.jpg";

function HeroVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    setIsPlaying(true);
    setTimeout(() => {
      videoRef.current?.play();
    }, 100);
  };

  const handlePause = () => {
    videoRef.current?.pause();
    setIsPlaying(false);
  };

  return (
    <motion.div
      className="relative w-full max-w-4xl mx-auto h-[450px] my-2 overflow-hidden rounded-2xl shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {!isPlaying ? (
        <>
          {/* Thumbnail */}
          <img
            src={thumbnail}
            alt="Workspace"
            className="w-full h-full object-cover"
          />

          {/* Play Button Overlay */}
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition"
          >
            <div className="bg-black/80 p-4 rounded-full">
              <Play className="w-8 h-8 text-white" fill="white" />
            </div>
          </button>
        </>
      ) : (
        <video
          ref={videoRef}
          src={video}
          autoPlay
          className="w-full h-full object-cover cursor-pointer"
          onClick={handlePause} // click video to pause
          onEnded={handlePause} // when finished, go back to thumbnail
        />
      )}
    </motion.div>
  );
}

export default HeroVideo;
