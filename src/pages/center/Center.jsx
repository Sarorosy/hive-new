// src/pages/Center.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { centersData } from "../../data/centersData";
import Breadcrumb from "../../components/BreadCrumb";
import {
  ChevronLeftIcon,
  ChevronRight,
  MapPin,
  Mail,
  Phone,
  Clock,
  Wifi,
  Users,
  Coffee,
  Printer,
  Gamepad2,
  PhoneCall,
  Building,
  Ruler,
  Layers
} from "lucide-react";
import ContactForm from "../../components/ContactForm";
import Faq from '../home/Faq';
import LatestBlogs from "../home/LatestBlogs";
import ExploreBlogs from "./ExploreBlogs";

// Address and size data mapping
const branchAddresses = {
  "chennai-anna-nagar": {
    address: "Level 3, VR Chennai, Jawaharlal Nehru Road, Anna Nagar, Chennai, Tamil Nadu, India",
    netSize: 15500,
    grossSize: 25800,
    floors: 1,
    email: "hello@hiveworkspaces.com",
    phone: "+91 70222 74000",
    metro: "Anna Nagar Metro Station (5 mins walk away)",
    hours: "Open 24/7"
  },
  "chennai-omr": {
    address: "SRP Stratford, Old Mahabalipuram Road (OMR), Perungudi, Chennai, Tamil Nadu, India",
    netSize: 95000,
    grossSize: 158000,
    floors: 1,
    email: "hello@hiveworkspaces.com",
    phone: "+91 70222 74000",
    metro: "Perungudi Metro Station (3 mins walk away)",
    hours: "Open 24/7"
  },
  "chennai-skcl-guindy": {
    address: "SKCL Guindy, Chennai, Tamil Nadu, India",
    netSize: 25000,
    grossSize: 42000,
    floors: 1,
    email: "hello@hiveworkspaces.com",
    phone: "+91 70222 74000",
    metro: "Guindy Metro Station (2 mins walk away)",
    hours: "Open 24/7"
  },
  "chennai-porur": {
    address: "Level 3, Keppel One Paramount, Mount Poonamallee Road, Porur, Chennai, Tamil Nadu 600116, India",
    netSize: 20000,
    grossSize: 33000,
    floors: 1,
    email: "hello@hiveworkspaces.com",
    phone: "+91 70222 74000",
    metro: "Porur Metro Station (4 mins walk away)",
    hours: "Open 24/7"
  },
  "bangalore-whitefield": {
    address: "ITPL Main Road, Whitefield, Bangalore, Karnataka, India",
    netSize: 48000,
    grossSize: 80000,
    floors: 1,
    email: "hello@hiveworkspaces.com",
    phone: "+91 70222 74000",
    metro: "Whitefield Metro Station (5 mins walk away)",
    hours: "Open 24/7"
  },
  "bangalore-ptp": {
    address: "Prestige Tech Platina, Bangalore, Karnataka, India",
    netSize: 30000,
    grossSize: 50000,
    floors: 1,
    email: "hello@hiveworkspaces.com",
    phone: "+91 70222 74000",
    metro: "Kadubeesanahalli Metro Station (3 mins walk away)",
    hours: "Open 24/7"
  },
  "hyderabad-gachibowli": {
    address: "Corporate Capital, Financial District, next to Sheraton Hyderabad Hotel, Gachibowli, Hyderabad, Telangana, India",
    netSize: 45000,
    grossSize: 75000,
    floors: 1,
    email: "hello@hiveworkspaces.com",
    phone: "+91 70222 74000",
    metro: "Gachibowli Metro Station (3 mins walk away)",
    hours: "Open 24/7"
  },
  "pune-mills": {
    address: "The Mills at RBCC, Raja Bahadur Mill Road, behind Sheraton Grand Hotel, Sangamwadi, Pune, Maharashtra, India",
    netSize: 35000,
    grossSize: 58000,
    floors: 1,
    email: "hello@hiveworkspaces.com",
    phone: "+91 70222 74000",
    metro: "Sangamwadi Metro Station (2 mins walk away)",
    hours: "Open 24/7"
  },
};

const branchServiceAvailability = {
  "chennai-anna-nagar": ["coworking", "enterprise"],
  "chennai-omr": ["coworking", "enterprise"],
  "chennai-skcl-guindy": ["enterprise"],
  "chennai-porur": ["enterprise"],
  "bangalore-whitefield": ["coworking", "enterprise"],
  "bangalore-ptp": ["enterprise"],
  "hyderabad-gachibowli": ["coworking", "enterprise"],
  "pune-mills": ["coworking", "enterprise"],
};

const coworkingServices = [
  {
    title: "Private Cabins",
    description:
      "Fully furnished offices for teams of 1-50+ members with plug-and-play convenience and premium shared amenities.",
  },
  {
    title: "Dedicated Desks",
    description:
      "Permanent desks inside a collaborative workspace, ideal for core team members who need consistent seating.",
  },
  {
    title: "Hot Desks",
    description:
      "Flexible seats for hybrid teams, remote workers, and freelancers who need professional infrastructure only when required.",
  },
  {
    title: "Meeting Rooms",
    description:
      "Tech-enabled meeting and board rooms that can be booked on demand for workshops, pitches, or client discussions.",
  },
];

const enterpriseServices = [
  {
    title: "Enterprise Solutions",
    description:
      "Custom-built, fully managed offices that match enterprise-level IT, security, and branding requirements.",
    bullets: [
      "Tailored floor plates for 50-500+ members",
      "Dedicated entrances, branding, and compliance",
      "End-to-end facility management with SLA-backed support",
    ],
  },
];

const amenities = [
  { icon: Wifi, name: "High-Speed Internet" },
  { icon: Users, name: "Meeting Rooms" },
  { icon: Coffee, name: "Premium Pantry" },
  { icon: Printer, name: "Printing & Scanning" },
  { icon: PhoneCall, name: "Phone Booths" },
  { icon: Gamepad2, name: "Game Lounge" },
  { icon: Building, name: "24/7 Access" },
  { icon: Users, name: "Concierge Services" },
];

function Center() {
  const { city, branch } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [layoutOffset, setLayoutOffset] = useState({ header: 0, tab: 0 });
  const { theme } = useOutletContext?.() || { theme: "light" };
  const isDark = theme === "dark";
  const sectionRefs = useRef({
    overview: null,
    services: null,
    features: null,
    amenities: null,
    location: null,
  });
  const tabsWrapperRef = useRef(null);

  const cityData = centersData[city];
  const branchData = cityData?.branches[branch];
  const branchId = branch ? `${city}-${branch}` : null;
  const addressData = branchId ? branchAddresses[branchId] : null;
  const availableServices = branchId
    ? branchServiceAvailability[branchId] ?? ["coworking", "enterprise"]
    : ["coworking", "enterprise"];
  const showCoworkingServices = availableServices.includes("coworking");
  const showEnterpriseSolutions = availableServices.includes("enterprise");
  const servicesToRender = [
    ...(showCoworkingServices ? coworkingServices : []),
    ...(showEnterpriseSolutions ? enterpriseServices : []),
  ];

  useEffect(() => {
    if (!cityData || (branch && !branchData)) {
      // navigate("/404", { replace: true });
    }
  }, [city, branch, cityData, branchData, navigate]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: 0.25,
      rootMargin: "-20% 0px -20% 0px",
    };

    const observerCallback = (entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => {
          const aTop = a.target.getBoundingClientRect().top;
          const bTop = b.target.getBoundingClientRect().top;
          return aTop - bTop;
        });

      if (visibleEntries.length > 0) {
        const sectionId = visibleEntries[0].dataset.sectionId;
        if (sectionId) {
          setActiveTab((prev) => (prev === sectionId ? prev : sectionId));
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.entries(sectionRefs.current).forEach(([key, ref]) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const measureOffsets = () => {
      const headerEl = document.querySelector("header");
      const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 0;
      const tabHeight = tabsWrapperRef.current ? tabsWrapperRef.current.getBoundingClientRect().height : 0;
      setLayoutOffset((prev) => {
        if (prev.header !== headerHeight || prev.tab !== tabHeight) {
          return { header: headerHeight, tab: tabHeight };
        }
        return prev;
      });
    };

    measureOffsets();
    window.addEventListener("resize", measureOffsets);
    return () => window.removeEventListener("resize", measureOffsets);
  }, []);

  const scrollOffset = layoutOffset.header + layoutOffset.tab + 24;
  const sectionScrollMargin = scrollOffset > 0 ? scrollOffset : 120;
  const clickScrollOffset = scrollOffset > 0 ? scrollOffset : 100;

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const targetSection = sectionRefs.current[tabId];
    if (targetSection) {
      const top = targetSection.getBoundingClientRect().top + window.scrollY - clickScrollOffset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "services", label: "Our Services" },
    { id: "features", label: "Centre Features" },
    { id: "amenities", label: "Amenities" },
    { id: "location", label: "Centre Location" },
  ];

  if (!cityData || (branch && !branchData)) {
    return null;
  }

  const displayName = branchData ? branchData.name : cityData.name;
  const displayDescription = branchData ? branchData.details : cityData.description;
  const images = branchData ? branchData.images : cityData.centerImages;

  return (
    <div
      className={`min-h-screen ${isDark ? "bg-gray-950 text-gray-100" : "bg-white text-gray-900"
        }`}
    >
      {/* Hero Section */}
      <div className="relative w-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            prevEl: ".hero-prev",
            nextEl: ".hero-next",
          }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet hero-bullet",
            bulletActiveClass: "hero-bullet-active",
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          className="h-[500px] md:h-[600px] lg:h-[700px]"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative h-full">
                <img
                  src={img}
                  alt={`${displayName} ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
                  <div className="max-w-7xl mx-auto">
                    <div className="text-white [&_a]:text-white [&_span]:text-white/80">
                      <Breadcrumb
                        items={branchData ? branchData.breadcrumb : cityData.breadcrumb}
                        theme={theme}
                      />
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mt-4 mb-2">
                      {displayName}
                    </h1>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows */}
        <button className="hero-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-lg rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-300">
          <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
        <button className="hero-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-lg rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-300">
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      {/* Tab Navigation */}
      <div
        className={`sticky z-40 shadow-md w-full left-0 right-0 top-0 ${isDark ? "bg-gray-900 text-gray-100" : "bg-black text-white"
          }`}
      // style={{ top: layoutOffset.header ? `${layoutOffset.header}px` : 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8" ref={tabsWrapperRef}>
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`px-6 py-4 font-medium text-sm md:text-base whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id
                  ? "border-white text-white"
                  : "border-transparent text-white/70 hover:text-white hover:border-white/50"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Overview */}
            <section
              id="overview"
              data-section-id="overview"
              ref={(el) => (sectionRefs.current.overview = el)}
              className="space-y-6 py-10 border-b border-gray-200"
              style={{ scrollMarginTop: sectionScrollMargin }}
            >
              <div>
                <h2
                  className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"
                    }`}
                >
                  {displayName}
                </h2>
                <p
                  className={`text-lg leading-relaxed mb-6 ${isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                >
                  {displayDescription}
                </p>
              </div>

              {addressData && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className={`w-5 h-5 ${isDark ? 'text-white' : 'text-[#1a3a5c]'} mt-1 flex-shrink-0`} />
                    <p className={isDark ? "text-gray-300" : "text-gray-700"}>
                      {addressData.address}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className={`w-5 h-5 ${isDark ? 'text-white' : 'text-[#1a3a5c]'} mt-1 flex-shrink-0`} />
                    <a
                      href={`mailto:${addressData.email}`}
                      className={`hover:text-[#1a3a5c] ${isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                    >
                      {addressData.email}
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className={`w-5 h-5 ${isDark ? 'text-white' : 'text-[#1a3a5c]'} mt-1 flex-shrink-0`} />
                    <a
                      href={`tel:${addressData.phone}`}
                      className={`hover:text-[#1a3a5c] ${isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                    >
                      {addressData.phone}
                    </a>
                  </div>
                  {addressData.metro && (
                    <div className="flex items-start gap-3">
                      <MapPin className={`w-5 h-5 ${isDark ? 'text-white' : 'text-[#1a3a5c]'} mt-1 flex-shrink-0`} />
                      <p className={isDark ? "text-gray-300" : "text-gray-700"}>
                        {addressData.metro}
                      </p>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <Clock className={`w-5 h-5 ${isDark ? 'text-white' : 'text-[#1a3a5c]'} mt-1 flex-shrink-0`} />
                    <p className={isDark ? "text-gray-300" : "text-gray-700"}>
                      {addressData.hours}
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* Services */}
            {servicesToRender.length > 0 && (
              <section
                id="services"
                data-section-id="services"
                ref={(el) => (sectionRefs.current.services = el)}
                className="space-y-6 py-10 border-b border-gray-200"
                style={{ scrollMarginTop: sectionScrollMargin }}
              >
                <h2
                  className={`text-3xl md:text-4xl font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"
                    }`}
                >
                  Our Services
                </h2>
                <p
                  className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                >
                  {showCoworkingServices && showEnterpriseSolutions
                    ? "This centre offers flexible coworking products and fully managed enterprise solutions."
                    : showCoworkingServices
                      ? "This centre focuses on our coworking products."
                      : "This centre is tailored for bespoke enterprise solutions."}
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  {servicesToRender.map((service, idx) => (
                    <div key={idx} className={`p-6 rounded-lg h-full ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                      <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{service.title}</h3>
                      <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{service.description}</p>
                      {service.bullets && (
                        <ul className={`mt-4 space-y-2 text-sm list-disc list-inside ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {service.bullets.map((item, bulletIdx) => (
                            <li key={bulletIdx}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Features */}
            <section
              id="features"
              data-section-id="features"
              ref={(el) => (sectionRefs.current.features = el)}
              className="space-y-6 py-10 border-b border-gray-200"
              style={{ scrollMarginTop: sectionScrollMargin }}
            >
              <h2
                className={`text-3xl md:text-4xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"
                  }`}
              >
                Centre Features
              </h2>
              <div className="space-y-4">
                <div
                  className={`flex items-start gap-4 p-4 rounded-lg ${isDark ? "bg-gray-900" : "bg-gray-50"
                    }`}
                >
                  <Building className={`w-6 h-6 ${isDark ? 'text-white' : 'text-[#1a3a5c]'} mt-1 flex-shrink-0`} />
                  <div>
                    <h3
                      className={`font-semibold mb-1 ${isDark ? "text-white" : "text-gray-900"
                        }`}
                    >
                      Modern Infrastructure
                    </h3>
                    <p
                      className={isDark ? "text-gray-300" : "text-gray-700"}
                    >
                      State-of-the-art facilities designed for productivity and
                      comfort.
                    </p>
                  </div>
                </div>
                <div
                  className={`flex items-start gap-4 p-4 rounded-lg ${isDark ? "bg-gray-900" : "bg-gray-50"
                    }`}
                >
                  <Users className={`w-6 h-6 ${isDark ? 'text-white' : 'text-[#1a3a5c]'} mt-1 flex-shrink-0`} />
                  <div>
                    <h3
                      className={`font-semibold mb-1 ${isDark ? "text-white" : "text-gray-900"
                        }`}
                    >
                      Collaborative Spaces
                    </h3>
                    <p
                      className={isDark ? "text-gray-300" : "text-gray-700"}
                    >
                      Open areas designed to foster collaboration and
                      networking.
                    </p>
                  </div>
                </div>
                <div
                  className={`flex items-start gap-4 p-4 rounded-lg ${isDark ? "bg-gray-900" : "bg-gray-50"
                    }`}
                >
                  <Wifi className={`w-6 h-6 ${isDark ? 'text-white' : 'text-[#1a3a5c]'} mt-1 flex-shrink-0`} />
                  <div>
                    <h3
                      className={`font-semibold mb-1 ${isDark ? "text-white" : "text-gray-900"
                        }`}
                    >
                      High-Speed Connectivity
                    </h3>
                    <p
                      className={isDark ? "text-gray-300" : "text-gray-700"}
                    >
                      Reliable internet and IT infrastructure for seamless
                      operations.
                    </p>
                  </div>
                </div>
                <div
                  className={`flex items-start gap-4 p-4 rounded-lg ${isDark ? "bg-gray-900" : "bg-gray-50"
                    }`}
                >
                  <Coffee className={`w-6 h-6 ${isDark ? 'text-white' : 'text-[#1a3a5c]'} mt-1 flex-shrink-0`} />
                  <div>
                    <h3
                      className={`font-semibold mb-1 ${isDark ? "text-white" : "text-gray-900"
                        }`}
                    >
                      Premium Pantry
                    </h3>
                    <p
                      className={isDark ? "text-gray-300" : "text-gray-700"}
                    >
                      Fully equipped pantry with complimentary beverages and
                      snacks.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Amenities */}
            <section
              id="amenities"
              data-section-id="amenities"
              ref={(el) => (sectionRefs.current.amenities = el)}
              className="space-y-6 py-10 border-b border-gray-200"
              style={{ scrollMarginTop: sectionScrollMargin }}
            >
              <h2
                className={`text-3xl md:text-4xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"
                  }`}
              >
                Amenities
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {amenities.map((amenity, idx) => {
                  const Icon = amenity.icon;
                  return (
                    <div
                      key={idx}
                      className={`p-6 rounded-lg text-center transition-colors ${isDark
                        ? "bg-gray-900 hover:bg-gray-800"
                        : "bg-gray-50 hover:bg-gray-100"
                        }`}
                    >
                      <Icon className={`w-8 h-8 ${isDark ? 'text-white' : 'text-[#1a3a5c]'} mx-auto mb-3`} />
                      <h3
                        className={`font-semibold text-sm ${isDark ? "text-white" : "text-gray-900"
                          }`}
                      >
                        {amenity.name}
                      </h3>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Location */}
            {addressData && (
              <section
                id="location"
                data-section-id="location"
                ref={(el) => (sectionRefs.current.location = el)}
                className="space-y-6 py-10"
                style={{ scrollMarginTop: sectionScrollMargin }}
              >
                <h2 className={`text-3xl md:text-4xl font-bold ${theme == "dark" ? "text-white" : "text-gray-900"} mb-6`}>
                  Centre Location
                </h2>
                <div className="space-y-4">
                  <div
                    className={`p-6 rounded-lg ${isDark ? "bg-gray-900" : "bg-gray-50"
                      }`}
                  >
                    <h3
                      className={`font-semibold mb-3 flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"
                        }`}
                    >
                      <MapPin className="w-5 h-5 text-[#1a3a5c]" />
                      Address
                    </h3>
                    <p className={isDark ? "text-gray-300" : "text-gray-700"}>
                      {addressData.address}
                    </p>
                  </div>
                  {addressData.metro && (
                    <div
                      className={`p-6 rounded-lg ${isDark ? "bg-gray-900" : "bg-gray-50"
                        }`}
                    >
                      <h3
                        className={`font-semibold mb-3 flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"
                          }`}
                      >
                        <MapPin className="w-5 h-5 text-[#1a3a5c]" />
                        Public Transport
                      </h3>
                      <p
                        className={isDark ? "text-gray-300" : "text-gray-700"}
                      >
                        {addressData.metro}
                      </p>
                    </div>
                  )}
                  {branchData?.map && (
                    <div className="rounded-lg overflow-hidden shadow-lg">
                      <iframe
                        src={branchData.map}
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Location Map"
                      />
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* Right Sidebar - Latest Blogs */}
          <div className="hidden lg:block lg:col-span-1">
            <ExploreBlogs />
          </div>
        </div>
      </div>

      <ContactForm type="regular" theme={theme} />
      <Faq />
    </div>
  );
}

// Add CSS for the cards and carousel
const styles = `
  .explore-other-centers {
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .explore-other-centers h3 {
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: bold;
  }
  .city-group {
    margin-bottom: 24px;
  }
  .city-group h4 {
    margin-bottom: 12px;
    font-size: 16px;
    font-weight: bold;
  }
  .center-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }
  .center-card {
    padding: 12px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .center-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  .center-card .image-carousel {
    width: 100%;
    height: 120px;
    overflow: hidden;
    border-radius: 8px;
    margin-bottom: 8px;
  }
  .center-card .image-carousel img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .center-card h5 {
    margin: 0;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
  }
`;

// Inject styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Center;
