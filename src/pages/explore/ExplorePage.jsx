import React from "react";
import { useParams } from "react-router-dom";
import { centersData } from "../../data/centersData";
import Breadcrumb from "../../components/BreadCrumb";
import one from '../../assets/featured/1.jpg';
import two from '../../assets/featured/2.jpg';
import three from '../../assets/featured/3.jpg';
import four from '../../assets/featured/4.jpg';
import five from '../../assets/featured/5.jpg';
import six from '../../assets/featured/6.jpg';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeftIcon, ChevronRight, TriangleAlert } from "lucide-react";
import ChoosePreference from "../center/ChoosePreference";
import ContactForm from "../../components/ContactForm";
import Faq from "../home/Faq";
function ExplorePage() {
  const { location, offering } = useParams(); // e.g. /Chennai/coworking-spaces

  const cityBranches = {
    Chennai: [
      "The Hive at Anna Nagar, Chennai",
      "The Hive at OMR, Chennai",
      "The Hive at SKCL Guindy, Chennai",
    ],
    Bangalore: ["The Hive at Whitefield, Bangalore", "The Hive at PTP, Bengaluru"],
    Hyderabad: ["The Hive at Gachibowli, Hyderabad"],
    Pune: ["The Hive at Mills, Pune"],
  };

  const offerings = [
    {
      icon: "/icons/office.svg",
      title: "Office Spaces",
      slug: "office-spaces",
      subtitle: "Ready-to-move-in or customisable private offices",
    },
    {
      icon: "/icons/coworking.svg",
      title: "Coworking Spaces",
      slug: "coworking-spaces",
      subtitle: "Coworking spaces for the hour, day, or month",
    },
    {
      icon: "/icons/additional.svg",
      title: "Additional Solutions",
      slug: "additional-solutions",
      subtitle: "Solutions that go beyond workspaces",
    },
  ];

  // ✅ Find city data (case-insensitive check for safety)
  const city = Object.keys(cityBranches).find(
    (cityName) => cityName.toLowerCase() === location?.toLowerCase()
  );

  // ✅ Find offering data by slug
  const offeringSlug = offerings.find((item) => item.slug === offering);

  const cityData = centersData[city.toLowerCase()];

  const centerImages = [
              one,
              two,
              three,
              four,
              five,
              six
            ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Hero Section with Floating Text */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-900"></div>
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="grid"
                width="8"
                height="8"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 8 0 L 0 0 0 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.3"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative pt-16 pb-8 px-4 md:px-8 mx-auto max-w-[1600px]">
          {/* Breadcrumb */}
          <div className="mb-6 md:mb-8 relative z-20">
            <Breadcrumb items={cityData.breadcrumb} />
          </div>

          {/* Slider */}
          <div className="relative w-full md:w-[90%] mx-auto rounded overflow-hidden shadow-2xl bg-white p-2">
            {/* Floating Text Card */}
            <div className="mb-6 md:mb-10 lg:absolute lg:top-1/2 lg:left-8 lg:transform lg:-translate-y-1/2 lg:w-[40%] rounded-xl p-4 sm:p-6 z-20 bg-white text-[#092e46] shadow-md">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 via-black font-serif to-purple-900 bg-clip-text text-transparent leading-tight">
                {offeringSlug?.title} in { cityData.name}
              </h1>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-light">
                {cityData.description}
              </p>
            </div>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              navigation={{
                prevEl: ".custom-prev",
                nextEl: ".custom-next",
              }}
              pagination={{
                clickable: true,
                bulletClass: "swiper-pagination-bullet custom-bullet",
                bulletActiveClass: "custom-bullet-active",
              }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop
              className="h-[250px] sm:h-[350px] md:h-[450px] lg:h-[600px] rounded overflow-hidden"
            >
              {
                centerImages.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <div className="relative h-full group/slide">
                    <img
                      src={img}
                      alt={`${cityData.name} ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 px-2 py-1 bg-black/50 backdrop-blur-lg rounded-full text-white text-xs sm:text-sm font-medium">
                      {idx + 1} / {centerImages.length}
                    </div>
                  </div>
                </SwiperSlide>
              ))
              }
            </Swiper>

            {/* Navigation Arrows */}
            <button className="custom-prev absolute right-20 sm:right-24 bottom-2 sm:bottom-4 z-10 w-8 h-8 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-lg rounded-full shadow-2xl flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110">
              <ChevronLeftIcon />
            </button>
            <button className="custom-next absolute right-4 sm:right-6 bottom-2 sm:bottom-4 z-10 w-8 h-8 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-lg rounded-full shadow-2xl flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110">
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
      <ChoosePreference cityData={cityData} centersData={centersData}/>
      <ContactForm type="regular" />
      <Faq />
    </div>
  );
}

export default ExplorePage;
