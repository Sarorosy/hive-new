import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Members() {
  const [isVisible, setIsVisible] = useState(false);

  // All sponsor images from public/sponsors folder
  const sponsorFiles = [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg",
    "8.jpg",
    "9.jpg",
    "10.jpg",
    "11.jpg",
    "12.jpg",
    "13.jpg",
    "14.jpg",
    "15.jpg",
    "16.jpg",
    "17.jpg",
    "18.jpg",
    "19.jpg",
    "20.jpg",
    "21.jpg",
    "22.jpg",
    "23.jpg",
    "24.jpg",
    "25.jpg",
    "26.jpg",
    "27.jpg",
    "28.jpg",
    "29.jpg",
    "30.jpg",
    "31.jpg",
    "32.jpg",
    "33.jpg",
    "34.jpg",
    "35.jpg",
    "36.jpg",
    "37.jpg",
    "38.jpg",
    "39.jpg",
    "40.jpg",
    "41.jpg",
    "42.jpg",
    "43.jpg",
    "44.jpg",
    "46.jpg",
    "48.jpg",
  ];

  // Create sponsor objects with public path
  const sponsors = sponsorFiles.map((filename, index) => ({
    id: index + 1,
    src: `/sponsors/${filename}`,
    alt: `Sponsor ${filename.replace(".jpg", "")}`,
  }));

  // Duplicate multiple times for seamless infinite scroll
  const duplicatedSponsors = [...sponsors, ...sponsors, ...sponsors];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-16 bg-white overflow-hidden relative max-w-6xl mx-auto">
      

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className=" mb-10"
        >

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 liber">
            Our Members
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl">
            We're proud to be supported by these amazing sponsors.
          </p>
        </motion.div>

        {/* Marquee Scrolling sponsors */}
        <div className="overflow-hidden relative">
          <div className="flex gap-8 md:gap-12 animate-marquee">
            {duplicatedSponsors.map((sponsor, index) => (
              <div 
                key={`${sponsor.id}-${index}`} 
                className="flex-shrink-0 flex items-center justify-center px-2"
              >
                <img
                  src={sponsor.src}
                  alt={sponsor.alt}
                  className="h-16 md:h-20 w-auto object-contain members-image max-w-[150px]"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / .2));
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
          will-change: transform;
        }
      `}</style>
    </section>
  );
}
