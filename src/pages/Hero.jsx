import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  MapPin,
  ChevronDown,
  ChevronUp,
  Building,
  Users,
  Camera,
  Home,
  SquareUserRound,
  Building2,
  UserLock
} from "lucide-react";

import office from "../assets/office-png.png";
import building from "../assets/buildings_2.png";
import daypass from "../assets/day-pass.svg";
import { useNavigate } from "react-router-dom";
import { citiesData } from "../data/centersData";

// Placeholder image while video loads
const placeholderImage = '/imagecompressor/10.jpg';

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
          <MapPin className="w-4 h-4 text-gray-200" />
          <span className={`text-sm ${selected ? "text-gray-200" : "text-gray-200"}`}>
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
          <Building className="w-4 h-4 text-gray-200" />
          <span className={`text-sm ${selected ? "text-gray-200" : "text-gray-200"}`}>
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
          <span className={`text-sm ${selected ? "text-gray-200" : "text-gray-200"}`}>
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
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);
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

  // Handle video loading
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsVideoLoaded(true);
      video.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    };

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("loadeddata", handleLoadedData);

    // Try to load the video
    video.load();

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("loadeddata", handleLoadedData);
    };
  }, []);


 

  return (
    <div className="group relative h-[97vh] w-full overflow-visible z-49"
      id="curve"
    >
      {/* Background Video */}
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        {/* Placeholder Image - shown while video loads */}
        {!isVideoLoaded && (
          <img 
            src={placeholderImage} 
            alt="Hero background" 
            className="w-full h-full object-cover transition-opacity duration-500"
          />
        )}
        
        {/* Video - shown once loaded */}
        <video
          ref={videoRef}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/HERO720.mp4" type="video/mp4" />
        </video>
        
        {/* Gradient overlay on hover */}
        {/* <div className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute -bottom-24 -left-24 w-[80%] max-w-[900px] h-[70%] bg-[radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.75),rgba(0,0,0,0.55)_35%,rgba(0,0,0,0.2)_65%,transparent_80%)] blur-2xl rounded-[999px]" />
          <div className="absolute -bottom-24 -right-24 w-[80%] max-w-[900px] h-[70%] bg-[radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.75),rgba(0,0,0,0.55)_35%,rgba(0,0,0,0.2)_65%,transparent_80%)] blur-2xl rounded-[999px]" />
        </div> */}
      </div>

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
        <div className="w-full max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 md:p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col gap-4 md:flex-row md:items-center">
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
              {/* <div className="flex-1">
                <OfferingDropdown
                  selected={selectedOffering}
                  setSelected={setSelectedOffering}
                  setSelectedOfferingSlug={setSelectedOfferingSlug}
                  isOpen={offeringDropdownOpen}
                  setIsOpen={setOfferingDropdownOpen}
                  selectedCenter={selectedCenter}
                />
              </div> */}
            </div>

            {/* Search Button */}
            <button
              disabled={!selectedCity || !selectedCenter}
              className={`w-full md:w-auto px-6 py-2 rounded flex items-center justify-center gap-2 font-semibold transition
                ${(!selectedCity || !selectedCenter)
                ? "bg-black text-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800 cursor-pointer"}`}
              onClick={()=>{
                if (selectedCity && selectedCenter) {
                  const branch = citiesData[selectedCity]?.branches.find(b => b.name === selectedCenter);
                  if (branch?.route) {
                    navigate(branch.route);
                  }
                }
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