import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "The Hive transformed how our team works and collaborates. Impeccable service and space.",
    name: "Priya Sharma",
    role: "Technology Startup CEO",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    class: "bg-[#dae2e5]"
  },
  {
    quote:
      "There's a rare balance of privacy, energy, and luxury – absolutely unmatched.",
    name: "Rahul Kapoor",
    role: "Senior Marketing Director",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    class: "bg-[#ede6e7]"
  },
  {
    quote:
      "Onboarding and bookings made effortless for our team through The Hive app",
    name: "Ananya Patel",
    role: "Operations Lead, Consulting Firm",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
    class: "bg-[#92031f] text-white"
  },
  {
    quote:
      "As a startup founder, having a cost-effective yet professional environment for my team has been game-changing.",
    name: "Arjun Singh",
    role: "Startup Founder",
    image: "https://randomuser.me/api/portraits/men/48.jpg",
    class: "bg-[#544c41] text-white "
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white py-12 px-4 max-w-6xl mx-auto relative overflow-hidden">
      <div className="mx-auto">
        {/* Heading */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 relative z-10">
          <div>
            <p className="text-gray-500 text-sm mb-2 ">/ Testimonials /</p>
            <h2 className="text-4xl font-bold leading-snug mb-4 liber">
              Voices of Our Community
            </h2>
          </div>
          <p className="text-gray-500 max-w-md">
            Discover what makes The Hive special through the experiences of our members. 
            From startups to enterprises, hear how our spaces, community, and service 
            have transformed their way of working.
          </p>
        </div>

        {/* Testimonials Slider */}
        <div 
          className="relative rounded-xl overflow-hidden"
          id="testimonials"
          style={{
            backgroundImage: 'url(/hotdesk.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '400px',
            position: 'relative'
          }}
        >
          {/* Overlay for better contrast */}
          <div className="absolute inset-0 bg-black/20 rounded-xl"></div>
          
          {/* Slider Container */}
          <div className="relative overflow-hidden rounded-xl" style={{ minHeight: '400px' }}>
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {testimonials.map((t, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-8 md:px-16 lg:px-24 py-12 flex items-center justify-center"
                  id={`testimonial-${index}`}
                >
                  <div
                    className="relative z-10 rounded-xl p-8 md:p-12 max-w-4xl w-full flex flex-col justify-center backdrop-blur-md bg-white/20 border border-white/30 shadow-lg"
                    style={{
                      backdropFilter: 'blur(12px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                    }}
                  >
                    <p className="text-white mb-8 drop-shadow-md leading-relaxed text-lg md:text-xl text-center">
                      {t.quote}
                    </p>

                    <div className="flex items-center justify-center gap-4 mt-4">
                      <div>
                        <p className="font-semibold text-white drop-shadow-md text-center text-lg">
                          {t.name}
                        </p>
                        {/*<p className="text-white/80 drop-shadow-md text-center text-sm mt-1">
                          {t.role}
                        </p> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
