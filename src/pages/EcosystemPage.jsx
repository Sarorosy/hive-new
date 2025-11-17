import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { MapPin, Calendar, Users, Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Breadcrumb from "../components/BreadCrumb";
import { useOutletContext } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const EcosystemPage = () => {
  const { setContactFormOpen } = useOutletContext();
  
  // Center data with images from public/ecosystem
  const centers = [
    {
      id: "blr",
      name: "Bangalore",
      fullName: "The Hive Bangalore",
      location: "Whitefield & PTP",
      description: "Premium coworking spaces in the heart of India's Silicon Valley, designed for innovation and collaboration.",
      images: [
        "/ecosystem/blr/Common-Areas_1.jpg",
        "/ecosystem/blr/Common-Areas_2.jpg",
        "/ecosystem/blr/Common-Areas_3.jpg",
        "/ecosystem/blr/Hive-Blr_-Reception.jpg",
        "/ecosystem/blr/HiveBlr_Cabin3.jpg",
        "/ecosystem/blr/HiveBlr_Cabin4.jpg",
        "/ecosystem/blr/HiveBlR_Collab-Space.jpg",
        "/ecosystem/blr/HiveBlr_Meeting-Room_1.jpg",
        "/ecosystem/blr/HiveBlr_Meeting-Room_2.jpg",
        "/ecosystem/blr/HiveBlr_Meeting-Room_4.jpg",
        "/ecosystem/blr/HiveBlr_Meeting-Room_5.jpg",
        "/ecosystem/blr/HiveBlr_Meeting-Room-3.jpg",
      ],
      features: ["Modern Meeting Rooms", "Collaborative Spaces", "Private Cabins", "Reception Area"]
    },
    {
      id: "vr",
      name: "VR Chennai",
      fullName: "The Hive VR Chennai",
      location: "Anna Nagar",
      description: "A state-of-the-art workspace featuring cutting-edge amenities and stunning architecture.",
      images: [
        "/ecosystem/vr/THEHIVEVR10.jpg",
        "/ecosystem/vr/THEHIVEVR14.jpg",
        "/ecosystem/vr/THEHIVEVR18.jpg",
        "/ecosystem/vr/THEHIVEVR2.jpg",
        "/ecosystem/vr/THEHIVEVR23.jpg",
        "/ecosystem/vr/THEHIVEVR25.jpg",
        "/ecosystem/vr/THEHIVEVR27.jpg",
        "/ecosystem/vr/THEHIVEVR3.jpg",
        "/ecosystem/vr/THEHIVEVR31.jpg",
        "/ecosystem/vr/THEHIVEVR34.jpg",
        "/ecosystem/vr/THEHIVEVR35.jpg",
        "/ecosystem/vr/THEHIVEVR36.jpg",
        "/ecosystem/vr/THEHIVEVR37.jpg",
        "/ecosystem/vr/THEHIVEVR39.jpg",
        "/ecosystem/vr/THEHIVEVR4.jpg",
        "/ecosystem/vr/THEHIVEVR41-1.jpg",
        "/ecosystem/vr/THEHIVEVR7.jpg",
        "/ecosystem/vr/THEHIVEVR8.jpg",
        "/ecosystem/vr/THEHIVEVR9.jpg",
      ],
      features: ["Premium Workspaces", "Modern Design", "Flexible Layouts", "Tech-Enabled"]
    },
    {
      id: "hyadr",
      name: "Hyderabad",
      fullName: "The Hive Hyderabad",
      location: "Gachibowli",
      description: "Located in the IT hub of Hyderabad, offering premium workspaces for growing businesses.",
      images: [
        "/ecosystem/hyadr/HiveHyd_15-Seater-Cabin.jpg",
        "/ecosystem/hyadr/HiveHyd_75-Seater-Cabin-2.jpg",
        "/ecosystem/hyadr/HiveHyd_Amphitheater_11zon.jpg",
        "/ecosystem/hyadr/HiveHyd_Enterprise-Pantry_11zon.jpg",
        "/ecosystem/hyadr/HiveHyd_Pantry_11zon.jpg",
        "/ecosystem/hyadr/HiveHyderabad_7-Seater-MR.jpg",
        "/ecosystem/hyadr/HiveHyderabad_8-Seater-MR.jpg",
      ],
      features: ["Amphitheater", "Enterprise Cabins", "Meeting Rooms", "Premium Pantry"]
    },
    {
      id: "omr",
      name: "Chennai OMR",
      fullName: "The Hive Chennai OMR",
      location: "Old Mahabalipuram Road",
      description: "A vibrant coworking space on Chennai's tech corridor, perfect for startups and enterprises.",
      images: [
        "/ecosystem/omr/149A8736.jpg",
        "/ecosystem/omr/149A8772.jpg",
        "/ecosystem/omr/20191204_091109.jpg",
        "/ecosystem/omr/20200304_201547.jpg",
        "/ecosystem/omr/20200304_202312.jpg",
        "/ecosystem/omr/20200306_171011.jpg",
        "/ecosystem/omr/Hive_Enterprise_OMR.jpg",
        "/ecosystem/omr/Hive_OMR_10-Seater.jpg",
        "/ecosystem/omr/Hot-Desk_OMR-1.jpg",
        "/ecosystem/omr/THEHIVE86.jpg",
        "/ecosystem/omr/THEHIVE91.jpg",
      ],
      features: ["Enterprise Solutions", "Hot Desks", "Meeting Rooms", "Modern Interiors"]
    },
    {
      id: "pune",
      name: "Pune",
      fullName: "The Hive Pune",
      location: "The Mills",
      description: "Where heritage meets innovation. A unique workspace in Pune's cultural heart.",
      images: [
        "/ecosystem/pune/HivePune_18-Seater-MR.jpg",
        "/ecosystem/pune/HivePune_Amphitheater.jpg",
        "/ecosystem/pune/HivePune_Cafe.jpg",
        "/ecosystem/pune/HivePune_Common-Areas-1.jpg",
        "/ecosystem/pune/HivePune_CommonAr.jpg",
        "/ecosystem/pune/HivePune_Pantry1_11zon.jpg",
        "/ecosystem/pune/IMG_4235.jpg",
        "/ecosystem/pune/IMG_4385.jpg",
      ],
      features: ["Amphitheater", "Cafe", "Meeting Rooms", "Common Areas"]
    },
  ];

  // Events data
  const events = [
    {
      id: 1,
      title: "Networking Mixer",
      date: "2024-03-15",
      time: "6:00 PM - 8:00 PM",
      location: "Bangalore - VR",
      description: "Connect with fellow entrepreneurs, investors, and professionals over drinks and appetizers.",
      attendees: 50,
      type: "Networking"
    },
    {
      id: 2,
      title: "Startup Pitch Night",
      date: "2024-03-22",
      time: "7:00 PM - 9:00 PM",
      location: "Hyderabad - Gachibowli",
      description: "Watch innovative startups pitch their ideas to a panel of investors and industry experts.",
      attendees: 100,
      type: "Pitch Event"
    },
    {
      id: 3,
      title: "Wellness Workshop",
      date: "2024-03-28",
      time: "10:00 AM - 12:00 PM",
      location: "Chennai - OMR",
      description: "Join us for a morning of mindfulness, yoga, and wellness practices to boost productivity.",
      attendees: 30,
      type: "Wellness"
    },
    {
      id: 4,
      title: "Tech Talk Series",
      date: "2024-04-05",
      time: "5:00 PM - 7:00 PM",
      location: "Pune - The Mills",
      description: "Expert-led discussion on the latest trends in technology and innovation.",
      attendees: 75,
      type: "Tech Talk"
    },
    {
      id: 5,
      title: "Community Lunch",
      date: "2024-04-12",
      time: "12:30 PM - 2:00 PM",
      location: "All Centers",
      description: "Monthly community lunch bringing together members from all our locations.",
      attendees: 200,
      type: "Community"
    },
    {
      id: 6,
      title: "Workshop: Digital Marketing",
      date: "2024-04-18",
      time: "3:00 PM - 5:00 PM",
      location: "Bangalore - PTP",
      description: "Learn effective digital marketing strategies from industry experts.",
      attendees: 40,
      type: "Workshop"
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: "Home", path: "/" },
            { label: "Ecosystem" }
          ]} />
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-4 h-4 mr-2" />
              Across 5 Cities
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              The Hive Ecosystem
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Discover our vibrant coworking spaces across India. Each location is thoughtfully designed to foster creativity, collaboration, and community.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Users className="w-5 h-5 mr-2" />
                <span className="font-medium">500+ Members</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="font-medium">5 Locations</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Calendar className="w-5 h-5 mr-2" />
                <span className="font-medium">Monthly Events</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Centers Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Our Centers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our beautifully designed workspaces across India's major tech hubs
            </p>
          </div>

          <div className="space-y-24">
            {centers.map((center, index) => (
              <div
                key={center.id}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Image Gallery */}
                <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <Swiper
                      modules={[Navigation, Pagination, Autoplay]}
                      spaceBetween={0}
                      slidesPerView={1}
                      navigation={{
                        prevEl: `.prev-${center.id}`,
                        nextEl: `.next-${center.id}`,
                      }}
                      pagination={{
                        clickable: true,
                        bulletClass: "swiper-pagination-bullet custom-bullet",
                        bulletActiveClass: "custom-bullet-active",
                      }}
                      autoplay={{ delay: 4000, disableOnInteraction: false }}
                      loop
                      className="h-[400px] md:h-[500px] rounded-2xl"
                    >
                      {center.images.map((img, idx) => (
                        <SwiperSlide key={idx}>
                          <div className="relative h-full">
                            <img
                              src={img}
                              alt={`${center.name} ${idx + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/800x500?text=Image+Not+Found";
                              }}
                            />
                            <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-lg rounded-full text-white text-sm font-medium">
                              {idx + 1} / {center.images.length}
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <button
                      className={`prev-${center.id} absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-lg rounded-full shadow-xl flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110`}
                    >
                      <ChevronLeft className="w-6 h-6 text-black" />
                    </button>
                    <button
                      className={`next-${center.id} absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-lg rounded-full shadow-xl flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110`}
                    >
                      <ChevronRight className="w-6 h-6 text-black" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
                  <div className="inline-flex items-center bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-700 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    {center.location}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-black mb-4">
                    {center.fullName}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {center.description}
                  </p>
                  
                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {center.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center text-gray-700"
                      >
                        <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
                        <span className="text-sm md:text-base">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setContactFormOpen(true)}
                    className="inline-flex items-center px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    Schedule a Tour
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-black text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Calendar className="w-4 h-4 mr-2" />
              Community Events
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Upcoming Events
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our vibrant community for networking, learning, and collaboration opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-black group"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                      {event.type}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Users className="w-4 h-4 mr-1" />
                      {event.attendees}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-black mb-3 group-hover:text-gray-700 transition-colors">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {event.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-700 text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center text-gray-700 text-sm">
                      <Clock className="w-4 h-4 mr-2 text-gray-500" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-gray-700 text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                      {event.location}
                    </div>
                  </div>

                  <button
                    onClick={() => setContactFormOpen(true)}
                    className="w-full mt-4 px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 text-sm"
                  >
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setContactFormOpen(true)}
              className="inline-flex items-center px-8 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              View All Events
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Join The Hive Ecosystem?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Experience the perfect blend of productivity, community, and innovation at any of our premium locations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setContactFormOpen(true)}
              className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl"
            >
              Schedule a Tour
            </button>
            <button
              onClick={() => setContactFormOpen(true)}
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-300"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EcosystemPage;

