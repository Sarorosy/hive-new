import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Maximize2, X } from "lucide-react";
import thumbnail from "../../assets/spinner/one.jpg";

function HeroVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);
  const fullscreenVideoRef = useRef(null);

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

  const handleFullscreen = () => {
    // Pause the main video first to prevent double audio
    videoRef.current?.pause();
    // Get current time from the main video
    const currentTime = videoRef.current?.currentTime || 0;
    setIsFullscreen(true);
    // Wait for modal to render, then set video time and play
    setTimeout(() => {
      if (fullscreenVideoRef.current) {
        fullscreenVideoRef.current.currentTime = currentTime;
        fullscreenVideoRef.current.play();
      }
    }, 100);
  };

  const handleCloseFullscreen = () => {
    // Get current time from fullscreen video
    const currentTime = fullscreenVideoRef.current?.currentTime || 0;
    setIsFullscreen(false);
    // Update main video time when closing
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = currentTime;
        if (isPlaying) {
          videoRef.current.play();
        }
      }
    }, 100);
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
        <div className={`relative w-full h-full ${isFullscreen ? 'hidden' : ''}`}>
          <video
            ref={videoRef}
            src="/THE_HIVE_BRAND_VIDEO.mp4"
            autoPlay
            controls
            muted={isFullscreen}
            className="w-full h-full object-cover"
            onEnded={handlePause} // when finished, go back to thumbnail
          />
          {/* Fullscreen Button */}
          <button
            onClick={handleFullscreen}
            className="absolute bottom-16 right-4 bg-black/80 hover:bg-black/90 p-2 rounded-full transition z-10"
            aria-label="Fullscreen"
          >
            <Maximize2 className="w-5 h-5 text-white" />
          </button>
        </div>
      )}

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={handleCloseFullscreen}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-6xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseFullscreen}
                className="absolute -top-12 right-0 bg-black/80 hover:bg-black p-3 rounded-full transition z-20"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Fullscreen Video */}
              <video
                ref={fullscreenVideoRef}
                src="/THE_HIVE_BRAND_VIDEO.mp4"
                controls
                className="w-full h-full object-contain rounded-lg"
                autoPlay
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default HeroVideo;
