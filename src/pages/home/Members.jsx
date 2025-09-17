import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import one from "../../assets/sponsors/1.png";
import two from "../../assets/sponsors/2.png";
import three from "../../assets/sponsors/3.png";
import four from "../../assets/sponsors/4.png";
import five from "../../assets/sponsors/5.png";
import six from "../../assets/sponsors/6.png";
import seven from "../../assets/sponsors/7.png";
import eight from "../../assets/sponsors/8.png";
import nine from "../../assets/sponsors/9.png";
import ten from "../../assets/sponsors/10.png";
import eleven from "../../assets/sponsors/11.png";

export default function Members() {
  const [isVisible, setIsVisible] = useState(false);

  // Sponsor images
  const sponsors = [
    { id: 1, src: one, alt: "Sponsor 1" },
    { id: 2, src: two, alt: "Sponsor 2" },
    { id: 3, src: three, alt: "Sponsor 3" },
    { id: 4, src: four, alt: "Sponsor 4" },
    { id: 5, src: five, alt: "Sponsor 5" },
    { id: 6, src: six, alt: "Sponsor 6" },
    { id: 7, src: seven, alt: "Sponsor 7" },
    { id: 8, src: eight, alt: "Sponsor 8" },
    { id: 9, src: nine, alt: "Sponsor 9" },
    { id: 10, src: ten, alt: "Sponsor 10" },
    { id: 11, src: eleven, alt: "Sponsor 11" },
  ];

    const sponsorsClone = [
    { id: 12, src: one, alt: "Sponsor 1" },
    { id: 13, src: two, alt: "Sponsor 2" },
    { id: 14, src: three, alt: "Sponsor 3" },
    { id: 15, src: four, alt: "Sponsor 4" },
    { id: 16, src: five, alt: "Sponsor 5" },
    { id: 17, src: six, alt: "Sponsor 6" },
    { id: 18, src: seven, alt: "Sponsor 7" },
    { id: 19, src: eight, alt: "Sponsor 8" },
    { id: 20, src: nine, alt: "Sponsor 9" },
    { id: 21, src: ten, alt: "Sponsor 10" },
    { id: 22, src: eleven, alt: "Sponsor 11" },
  ];

  // Duplicate for seamless scroll
  const duplicatedSponsors = [...sponsors, ...sponsorsClone];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-16 bg-gray-50 overflow-hidden relative cstd">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >

          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 font-serif">
            Our Members
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We’re proud to be supported by these amazing sponsors.
          </p>
        </motion.div>

        {/* Scrolling sponsors */}
        <div className="overflow-hidden relative">
          <motion.div
            className="flex gap-12"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
          >
            {duplicatedSponsors.map((sponsor) => (
              <div key={sponsor.id} className="flex-shrink-0">
                <img
                  src={sponsor.src}
                  alt={sponsor.alt}
                  className="h-20 w-auto object-contain members-image"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
