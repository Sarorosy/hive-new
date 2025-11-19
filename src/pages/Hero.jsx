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
import { citiesData } from "../data/centersData";

// Background images
const heroImages = [
  // hero1,
  // hero2,
  // hero3,
  // '/imagecompressor/1.jpg',
  // '/imagecompressor/2.jpg', 
  // '/imagecompressor/3.jpg',
  // '/imagecompressor/4.jpg',
  // '/imagecompressor/5.jpg',
  // '/imagecompressor/6.jpg',
  // '/imagecompressor/7.jpg',
  // '/imagecompressor/8.jpg',
  // '/imagecompressor/9.jpg',
  '/imagecompressor/10.jpg', //
  '/imagecompressor/11.jpg', //
  '/imagecompressor/12.jpg',//
  // '/imagecompressor/13.jpg',
  '/imagecompressor/6.jpg',//
  // '/imagecompressor/15.jpg',
  // '/imagecompressor/16.jpg',
  // '/imagecompressor/17.png',
  // '/imagecompressor/18.jpg',
  // '/imagecompressor/19.jpg',
  // '/imagecompressor/20.jpg',
  '/imagecompressor/21.png', //
];
// Background images
const heroImages2 = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1532916123995-50bad0fc528e?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1606836576983-8b458e75221d?auto=format&fit=crop&w=1920&q=80"
];

// Workspace types
const workspaceTypes = [
  { icon: <Building className="w-5 h-5" />, label: "Dedicated", sublabel: "Desks" },
  { icon: <UserLock className="w-5 h-5" />, label: "Private", sublabel: "Office" },
  { icon: <Building2 className="w-5 h-5" />, label: "Enterprise", sublabel: "Office" },
  { icon: <Users className="w-5 h-5" />, label: "Meeting", sublabel: "Room" },
  { icon: <Home className="w-5 h-5" />, label: "Hot", sublabel: "Desks" },
  { icon: <SquareUserRound className="w-5 h-5" />, label: "Flexi", sublabel: "Passes" },
  { icon: <Users className="w-5 h-5" />, label: "Managed", sublabel: "Office" },
  { icon: <Camera className="w-5 h-5" />, label: "Virtual", sublabel: "Office" },
];

const offerings = [
  // {
  //   icon: "/icons/additional.svg",
  //   title: "Day Pass",
  //   slug: "day-pass",
  //   subtitle: "Solutions that go beyond workspaces"
  // },
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
  const cities = Object.keys(citiesData);

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
        className="flex items-center justify-between w-full border border-gray-300 rounded px-3 py-2 cursor-pointer hover:border-black transition"
      >
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className={`text-sm ${selected ? "text-gray-900" : "text-gray-900"}`}>
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
        <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto">
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

// Simple Center Dropdown Component
const CenterDropdown = ({ selected, setSelected, selectedCity, isOpen, setIsOpen }) => {
  const ref = useRef();
  const centers = selectedCity && citiesData[selectedCity] ? citiesData[selectedCity].branches.map(branch => branch.name) : [];

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
        onClick={() => selectedCity && setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full border border-gray-300 rounded px-3 py-2 transition ${
          !selectedCity ? " cursor-not-allowed" : "cursor-pointer hover:border-black"
        }`}
      >
        <div className="flex items-center gap-2">
          <Building className="w-4 h-4 text-gray-400" />
          <span className={`text-sm ${selected ? "text-gray-900" : "text-gray-900"}`}>
            {selected || "Choose a Center"}
          </span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </div>

      {isOpen && selectedCity && centers.length > 0 && (
        <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto">
          {centers.map((center, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSelected(center);
                setIsOpen(false);
              }}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
            >
              <div className="text-sm font-medium text-gray-900">{center}</div>
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
        className="flex items-center justify-between w-full border border-gray-300 rounded px-3 py-2 transition cursor-pointer hover:border-black"
      >
        <div className="flex items-center gap-2">
          <span className={`text-sm ${selected ? "text-gray-900" : "text-gray-900"}`}>
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
  const [selectedCenter, setSelectedCenter] = useState("");
  const [selectedOffering, setSelectedOffering] = useState("");
  const [selectedOfferingSlug, setSelectedOfferingSlug] = useState("");
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [centerDropdownOpen, setCenterDropdownOpen] = useState(false);
  const [offeringDropdownOpen, setOfferingDropdownOpen] = useState(false);
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);
  const marqueeContainerRef = useRef(null);
  const marqueeContentRef = useRef(null);
  const animationFrameRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const isUserScrollingRef = useRef(false);
  const lastScrollLeftRef = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Reset center and offering when city changes
    setSelectedCenter("");
    setSelectedOffering("");
    setSelectedOfferingSlug("");
  }, [selectedCity]);

  useEffect(() => {
    // Reset offering when center changes
    setSelectedOffering("");
    setSelectedOfferingSlug("");
  }, [selectedCenter]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Auto-scroll marquee animation
  useEffect(() => {
    if (!marqueeContainerRef.current || !marqueeContentRef.current) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const container = marqueeContainerRef.current;
    const content = marqueeContentRef.current;
    const scrollSpeed = 1.5; // pixels per frame (smooth continuous movement)
    
    // Calculate content width - need to wait for layout
    const getContentWidth = () => {
      if (!content) return 0;
      const firstChild = content.firstElementChild;
      if (!firstChild) return 0;
      // Calculate width of one set of items
      return Array.from(content.children)
        .slice(0, workspaceTypes.length)
        .reduce((sum, child) => sum + child.offsetWidth + 4, 0); // 4px for gap-1
    };

    const animate = () => {
      if (container && !isMarqueePaused && !isUserScrollingRef.current) {
        const contentWidth = getContentWidth();
        if (contentWidth === 0) {
          animationFrameRef.current = requestAnimationFrame(animate);
          return;
        }
        
        let currentScroll = container.scrollLeft;
        currentScroll += scrollSpeed;
        
        // Seamless loop: when we reach the end of first set, reset seamlessly
        if (currentScroll >= contentWidth) {
          currentScroll = currentScroll - contentWidth;
        }
        
        container.scrollLeft = currentScroll;
        lastScrollLeftRef.current = currentScroll;
        animationFrameRef.current = requestAnimationFrame(animate);
      } else if (animationFrameRef.current && !isMarqueePaused && !isUserScrollingRef.current) {
        // Resume animation if not paused and user not scrolling
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    if (!isMarqueePaused && !isUserScrollingRef.current) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMarqueePaused]);


 

  return (
    <div className="relative h-[97vh] w-full overflow-visible z-49"
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

      <button className="custom-prev cursor-pointer  absolute left-4 sm:right-24 bottom-16 z-99 w-6 h-6 sm:w-8 sm:h-8 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 hover:scale-110">
        <MoveLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
      <button className="custom-next cursor-pointer  absolute left-20 sm:right-6 bottom-16 z-99 w-6 h-6 sm:w-8 sm:h-8 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 hover:scale-110">
        <MoveRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Foreground Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex-1 flex flex-col justify-end">
            <div className="w-full mx-auto text-white space-y-4 pb-4">
              <h1 className="text-3xl xl:text-4xl font-bold leading-tight text-center filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
              Elevate Your Ambition.
              
                  Redefine Your 
                <span className="text-orange-400 ml-2">Workspace.</span>
              
            </h1>
          </div>
        </div>

        {/* Bottom Row Form */}
        <div className="w-full max-w-6xl mx-auto">
          <div className="bg-white/95 backdrop-blur rounded p-4 md:p-6 shadow-2xl flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex flex-col gap-4 w-full md:flex-row md:flex-1">
              <div className="flex-1">
                <CityDropdown
                  selected={selectedCity}
                  setSelected={setSelectedCity}
                  isOpen={cityDropdownOpen}
                  setIsOpen={setCityDropdownOpen}
                />
              </div>
              <div className="flex-1">
                <CenterDropdown
                  selected={selectedCenter}
                  setSelected={setSelectedCenter}
                  selectedCity={selectedCity}
                  isOpen={centerDropdownOpen}
                  setIsOpen={setCenterDropdownOpen}
                />
              </div>
              <div className="flex-1">
                <OfferingDropdown
                  selected={selectedOffering}
                  setSelected={setSelectedOffering}
                  setSelectedOfferingSlug={setSelectedOfferingSlug}
                  isOpen={offeringDropdownOpen}
                  setIsOpen={setOfferingDropdownOpen}
                  selectedCenter={selectedCenter}
                />
              </div>
            </div>

            {/* Search Button */}
            <button
              disabled={!selectedCity || !selectedCenter || !selectedOffering || !selectedOfferingSlug}
              className={`w-full md:w-auto px-8 py-3 rounded flex items-center justify-center gap-2 font-semibold transition
                ${(!selectedCity || !selectedCenter || !selectedOffering || !selectedOfferingSlug)
                ? "bg-black text-gray-400 cursor-not-allowed"
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