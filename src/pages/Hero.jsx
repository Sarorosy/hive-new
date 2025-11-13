import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  Search,
  MapPin,
  ChevronDown,
  ChevronUp,
  Building,
  Wifi,
  Users,
  Camera,
  Store,
  Home,
  MoveLeft,
  MoveRight,
  SquareUserRound,
  Building2,
  UserLock
} from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import office from "../assets/office-png.png";
import building from "../assets/buildings_2.png";
import daypass from "../assets/day-pass.svg";
import { useNavigate } from "react-router-dom";

import hero1 from "../assets/raw/all/DSC07729-min.JPG";
import hero2 from "../assets/raw/all/DSC07855-min.JPG";
import hero3 from "../assets/raw/chn/YAV00102-min.JPG";

// Background images
const heroImages = [
  // hero1,
  // hero2,
  // hero3,
  '/imagecompressor/1.jpg',
  '/imagecompressor/2.jpg', 
  '/imagecompressor/3.jpg',
  '/imagecompressor/4.jpg',
  '/imagecompressor/5.jpg',
  '/imagecompressor/6.jpg',
  '/imagecompressor/7.jpg',
  '/imagecompressor/8.jpg',
  '/imagecompressor/9.jpg',
  '/imagecompressor/10.jpg',
  '/imagecompressor/11.jpg',
  '/imagecompressor/12.jpg',
  '/imagecompressor/13.jpg',
  '/imagecompressor/14.jpg',
  '/imagecompressor/15.jpg',
  '/imagecompressor/16.jpg',
  '/imagecompressor/17.jpg',
  '/imagecompressor/18.jpg',
  '/imagecompressor/19.jpg',
  '/imagecompressor/20.jpg',
  '/imagecompressor/21.jpg',
];
// Background images
const heroImages2 = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1532916123995-50bad0fc528e?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1606836576983-8b458e75221d?auto=format&fit=crop&w=1920&q=80"
];

// Workspace types
const workspaceTypes = [
  { icon: <Building className="w-6 h-6" />, label: "Dedicated", sublabel: "Desks" },
  { icon: <UserLock className="w-6 h-6" />, label: "Private", sublabel: "Office" },
  { icon: <Building2 className="w-6 h-6" />, label: "Enterprise", sublabel: "Office" },
  { icon: <Users className="w-6 h-6" />, label: "Meeting", sublabel: "Room" },
  { icon: <Home className="w-6 h-6" />, label: "Hot", sublabel: "Desks" },
  { icon: <SquareUserRound className="w-6 h-6" />, label: "Flexi", sublabel: "Passes" },
  { icon: <Users className="w-6 h-6" />, label: "Managed", sublabel: "Office" },
  { icon: <Camera className="w-6 h-6" />, label: "Virtual", sublabel: "Office" },
];

// Data
const cityBranches = {
  Chennai: [
    "The Hive at Anna Nagar, Chennai",
    "The Hive at OMR, Chennai",
    "The Hive at SKCL Guindy, Chennai"
  ],
  Bangalore: ["The Hive at Whitefield, Bangalore", "The Hive at PTP, Bengaluru"],
  Hyderabad: ["The Hive at Gachibowli, Hyderabad"],
  Pune: ["The Hive at Mills, Pune"]
};

const offerings = [
  {
    icon: "/icons/additional.svg",
    title: "Day Pass",
    slug: "day-pass",
    subtitle: "Solutions that go beyond workspaces"
  },
  {
    icon: "/icons/coworking.svg",
    title: "Coworking Spaces",
    slug: "coworking-spaces",
    subtitle: "Coworking spaces for the hour, day, or month"
  },
  {
    icon: "/icons/office.svg",
    title: "Office Spaces",
    slug: "office-spaces",
    subtitle: "Ready-to-move-in or customisable private offices"
  },
  {
    icon: "/icons/additional.svg",
    title: "Additional Solutions",
    slug: "additional-solutions",
    subtitle: "Solutions that go beyond workspaces"
  }
];

// Simple City Dropdown Component
const CityDropdown = ({ selected, setSelected, isOpen, setIsOpen }) => {
  const ref = useRef();
  const cities = Object.keys(cityBranches);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  return (
    <div className="relative " ref={ref}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full border border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:border-black transition"
      >
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className={`text-sm ${selected ? "text-gray-900" : "text-gray-400"}`}>
            {selected || "Choose a City"}
          </span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </div>

      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-64 overflow-y-auto">
          {cities.map((city, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSelected(city);
                setIsOpen(false);
              }}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
            >
              <div className="text-sm font-medium text-gray-900">{city}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Simple Offering Dropdown Component
const OfferingDropdown = ({ selected, setSelected,setSelectedOfferingSlug,  isOpen, setIsOpen }) => {
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  return (
    <div className="relative" ref={ref}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full border border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:border-black transition"
      >
        <div className="flex items-center gap-2">
          <span className={`text-sm ${selected ? "text-gray-900" : "text-gray-400"}`}>
            {selected || "Choose a Solution"}
          </span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </div>

      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-64 overflow-y-auto">
          {offerings.map((offering, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSelected(offering.title);
                setSelectedOfferingSlug(offering.slug);
                setIsOpen(false);
              }}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3"
            >
              <img loading="lazy" src={offering.slug == "day-pass" ? daypass :  offering.slug == "coworking-spaces" ? building :office} alt="" className="w-6 h-6" />
              <div>
                <div className="text-sm font-medium text-gray-900">{offering.title}</div>
                <div className="text-xs text-gray-500">{offering.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Hero = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedOffering, setSelectedOffering] = useState("");
  const [selectedOfferingSlug, setSelectedOfferingSlug] = useState("");
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [offeringDropdownOpen, setOfferingDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("Selected City:", selectedCity);
    // console.log("Selected Offering:", selectedOffering);
  }, [selectedCity, selectedOffering,selectedOfferingSlug]);

  return (
    <div className="relative h-[97vh] w-full overflow-hidden z-49"
      id="curve"
    >
      {/* Swiper Background */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          prevEl: '.custom-prev',
          nextEl: '.custom-next',
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet custom-bullet',
          bulletActiveClass: 'custom-bullet-active',
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="absolute inset-0 h-full w-full"
      >
        {heroImages.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative h-full w-full">
              <img src={img} alt={`Hero ${idx}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="custom-prev cursor-pointer  absolute left-4 sm:right-24 bottom-16 z-99 w-8 h-8 sm:w-12 sm:h-12 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 hover:scale-110">
        <MoveLeft />
      </button>
      <button className="custom-next cursor-pointer  absolute left-20 sm:right-6 bottom-16 z-99 w-8 h-8 sm:w-12 sm:h-12 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 hover:scale-110">
        <MoveRight />
      </button>

      {/* Foreground Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side Text */}
          <div className="text-white space-y-4">
            <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
              Elevate Your Ambition.
              <span className="block">
                  Redefine Your 
                <span className="text-orange-400 ml-2">Workspace.</span>
              </span>
            </h1>
          </div>

          {/* Right Side Form */}
          <div className="bg-white rounded-2xl p-6 w-full max-w-md ml-auto space-y-6">
            <div className="space-y-4">
              <CityDropdown
                selected={selectedCity}
                setSelected={setSelectedCity}
                isOpen={cityDropdownOpen}
                setIsOpen={setCityDropdownOpen}
              />
              <OfferingDropdown
                selected={selectedOffering}
                setSelected={setSelectedOffering}
                setSelectedOfferingSlug={setSelectedOfferingSlug}
                isOpen={offeringDropdownOpen}
                setIsOpen={setOfferingDropdownOpen}
              />
            </div>

            {/* Workspace Types */}
            <div className="grid grid-cols-4 gap-2">
              {workspaceTypes.map((type, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center p-2 rounded-xl hover:bg-gray-900 hover:text-white cursor-pointer group"
                >
                  <div className="p-3 bg-gray-100 rounded-lg mb-1 group-hover:text-black ">{type.icon}</div>
                  <div className="text-xs font-medium">{type.label}</div>
                  <div className="text-xs">{type.sublabel}</div>
                </div>
              ))}
            </div>

            {/* Search Button */}
            <button
              disabled={!selectedCity || !selectedOffering || !selectedOfferingSlug}
              className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 
                  ${(!selectedCity || !selectedOffering || !selectedOfferingSlug)
                  ? "bg-black bg-opacity-10 text-gray-400 "
                  : "bg-black text-white hover:bg-gray-800 cursor-pointer"}`}

              onClick={()=>{
                (selectedOfferingSlug == "day-pass") ? navigate("/day_pass") :navigate(`/explore/${selectedCity}/${selectedOfferingSlug}`)
              }}
            >
              <Search className="w-4 h-4" /> Search
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;