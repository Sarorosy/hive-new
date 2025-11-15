import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "The Hive transformed how our team works and collaborates. Impeccable service and space.",
    name: "Juliana",
    role: "Technology Startup CEO",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    class: "bg-[#dae2e5]"
  },
  {
    quote:
      "There’s a rare balance of privacy, energy, and luxury – absolutely unmatched.",
    name: "Bastian",
    role: "Senior Marketing Director",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    class: "bg-[#ede6e7]"
  },
  {
    quote:
      "Onboarding and bookings made effortless for our team through The Hive app",
    name: "Sarah Doe",
    role: "Operations Lead, Consulting Firm",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
    class: "bg-[#92031f] text-white"
  },
  {
    quote:
      "As a startup founder, having a cost-effective yet professional environment for my team has been game-changing.",
    name: "Albert",
    role: "Startup Founder",
    image: "https://randomuser.me/api/portraits/men/48.jpg",
    class: "bg-[#544c41] text-white "
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-12 px-6 lg:px-20 relative overflow-hidden">
      <div className="mx-auto">
        {/* Heading */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 relative z-10">
          <div>
            <p className="text-gray-500 text-sm mb-2 ">/ Testimonials /</p>
            <h2 className="text-4xl font-bold leading-snug mb-4 font-serif">
              Voices of Our Community
            </h2>
          </div>
          <p className="text-gray-500 max-w-md">
            Integer tincidunt cras dapibus vivamus elementum semper nisi. Aenean
            vulputate eleifend tellus.
          </p>
        </div>

        {/* Testimonials Grid with Background Image */}
        <div 
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 relative rounded-xl"
          id="testimonials"
          style={{
            backgroundImage: 'url(/hotdesk.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            padding: '2rem',
            position: 'relative'
          }}
        >
          {/* Overlay for better contrast */}
          <div className="absolute inset-0 bg-black/20 rounded-xl"></div>  
          
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="relative z-10 rounded-xl p-6 flex flex-col justify-between backdrop-blur-md bg-white/20 border border-white/30 shadow-lg hover:bg-white/30 transition-all duration-300"
              id={`testimonial-${index}`}
              style={{
                backdropFilter: 'blur(12px) saturate(180%)',
                WebkitBackdropFilter: 'blur(12px) saturate(180%)',
              }}
            >
              <p className="text-white mb-6 drop-shadow-md leading-relaxed">{t.quote}</p>

              <div className="flex items-center gap-4 mt-auto">
                <div>
                  <p className="font-semibold text-white drop-shadow-md">{t.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}
