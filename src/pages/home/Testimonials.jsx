import React from "react";
import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 mb-12">
        {/* Heading */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
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
      </div>

      {/* Testimonials Carousel - Full Width */}
      <div className="w-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          className="testimonials-swiper w-full"
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index} className="w-full">
              <div
                className="bg-gray-50 flex flex-col justify-center shadow-sm relative overflow-hidden min-h-[250px] w-full px-6 lg:px-20 py-8"
                style={{ 
                  backgroundImage: 'url(/test.jpg)',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative z-10 flex flex-row items-center justify-between h-full w-full max-w-6xl mx-auto gap-8">
                  <div className="flex-1">
                    <p className="text-white text-2xl mb-3">❝</p>
                    <p className="text-white mb-4 text-lg lg:text-xl leading-relaxed">{t.quote}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <p className="font-semibold text-white text-lg lg:text-xl text-right">{t.name}</p>
                    {/* <p className="text-sm text-gray-500">{t.role}</p> */}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
