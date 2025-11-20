import React, { useRef, useEffect, useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { centersData } from "../../data/centersData";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function FeaturedCentres() {
  const navigate = useNavigate();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiper, setSwiper] = useState(null);

  // Extract all centers from centersData dynamically
  const featuredCentres = useMemo(() => {
    const centres = [];
    
    // Loop through all cities in centersData
    Object.keys(centersData).forEach((cityKey) => {
      const cityData = centersData[cityKey];
      
      // Loop through all branches in each city
      if (cityData.branches) {
        Object.keys(cityData.branches).forEach((branchKey) => {
          const branchData = cityData.branches[branchKey];
          
          // Get the first image from branch images, or fallback to city centerImages
          const image = branchData.images?.[0] || cityData.centerImages?.[0];
          
          centres.push({
            id: `${cityKey}-${branchKey}`,
            name: branchData.name,
            city: cityKey,
            branch: branchKey,
            image: image,
            route: `/${cityKey}/${branchKey}`
          });
        });
      }
    });
    
    return centres;
  }, []);

  useEffect(() => {
    if (swiper && prevRef.current && nextRef.current) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper]);

  return (
    <section className="bg-white py-12 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <p className="text-gray-500 text-sm mb-2">/ Featured Centres /</p>
            <h2 className="text-2xl md:text-3xl font-bold leading-snug mb-4 font-serif">
              Featured Centres
            </h2>
          </div>
          <button
            onClick={() => navigate("/")}
            className="text-orange-500 font-medium flex items-center gap-2 transition-colors"
          >
            Explore all our locations
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={true}
            onSwiper={setSwiper}
            className="featured-centres-swiper"
          >
            {featuredCentres.map((centre) => (
              <SwiperSlide key={centre.id}>
                <div
                  className="relative group cursor-pointer overflow-hidden "
                  onClick={() => navigate(centre.route)}
                >
                  <div className="relative h-[200px] md:h-[225px] lg:h-[250px] overflow-hidden">
                    <img
                      src={centre.image}
                      alt={centre.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Center name overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white text-md  md:text-lg font-bold leading-tight">
                        {centre.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          <button
            ref={prevRef}
            className="featured-prev absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black backdrop-blur-lg border border-gray-200 rounded-full shadow-xl flex items-center justify-center hover:bg-gray-900 hover:border-gray-300 transition-all duration-300 hover:scale-105"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            ref={nextRef}
            className="featured-next absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black backdrop-blur-lg border border-gray-200 rounded-full shadow-xl flex items-center justify-center hover:bg-gray-900 hover:border-gray-300 transition-all duration-300 hover:scale-105"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}

