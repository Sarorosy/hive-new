import React from "react";
import { motion } from "framer-motion";
import { MapPin, Building, Users, TrendingUp, Award, Target, Zap, Globe } from "lucide-react";
import { centersData } from "../../data/centersData";

// Import images
import heroImg from "../../assets/raw/all/DSC07729-min.JPG";
import workspaceImg from "../../assets/raw/all/DSC07855-min.JPG";
import communityImg from "../../assets/raw/chn/YAV00102-min.JPG";
import Members from "../home/Members";

export default function AboutUs() {
  // Extract YouTube video ID from URL
  const youtubeUrl = "https://youtu.be/IftKbB5Nfks";
  const videoId = youtubeUrl.split("/").pop().split("?")[0];

  // Prepare locations data from centersData
  const locations = [
    {
      city: "Bangalore (Whitefield)",
      desc: "900 seats • 48,000 sq. ft. • Integrated into VR Bengaluru",
      address: "ITPL Main Road, Whitefield",
      image: centersData.bangalore.centerImages?.[0] || centersData.bangalore.image,
      clients: ["Hensoldt", "Spinny", "Appsflyer", "Xebia", "Webonise Lab", "Thoucentric Technology"],
      details: "Located on ITPL Main Road in Whitefield, Bangalore's premier IT hub. Strategic location with upcoming metro connectivity and ample parking."
    },
    {
      city: "Chennai – Anna Nagar",
      desc: "350 seats • 15,500 sq. ft. • Inside VR Chennai",
      address: "Level 3, VR Chennai, Jawaharlal Nehru Road, Anna Nagar",
      image: centersData.chennai.centerImages?.[0] || centersData.chennai.image,
      details: "Integrated into VR Chennai, a 2 million sq. ft. lifestyle center with 10-screen multiplex, boutique hotel, and extensive retail/F&B. Central business district location with metro and bus connectivity."
    },
    {
      city: "Chennai – OMR",
      desc: "1,500 seats • 95,000 sq. ft. • SRP Stratford",
      address: "SRP Stratford, Old Mahabalipuram Road (OMR), Perungudi",
      image: centersData.chennai.branches?.omr?.images?.[0] || centersData.chennai.image,
      details: "Chennai's IT corridor location with onsite café, crèche, and adjacent Holiday Inn hotel. Easy access via bus, train, and upcoming metro."
    },
    {
      city: "Hyderabad (Gachibowli)",
      desc: "750–900 seats • 45,000 sq. ft. • Financial District",
      address: "Corporate Capital, Financial District, next to Sheraton Hyderabad Hotel",
      image: centersData.hyderabad.centerImages?.[0] || centersData.hyderabad.image,
      details: "Serves Hyderabad's major office catchments: HITEC City and Financial District. Integrated with 5-star hotel, serviced apartments, restaurants, and office complex. Excellent airport connectivity and public transport access."
    },
    {
      city: "Pune (Koregaon Park)",
      desc: "1,000 seats • Mixed-use lifestyle destination",
      address: "The Mills at RBCC, Raja Bahadur Mill Road, behind Sheraton Grand Hotel, Sangamwadi",
      image: centersData.pune.centerImages?.[0] || centersData.pune.image,
      details: "Part of a revamped 6-acre mixed-use development with restaurants, bars, open courtyards, event spaces, and 5-star hotel. Centrally located with connectivity to Kalyani Nagar, Koregaon Park, Boat Club Road, and Viman Nagar."
    },
  ];

  const notableClients = [
    "Condé Nast India",
    "iD Fresh Food",
    "Shopmatic",
    "Abengoa",
    "Airbus",
    "Hensoldt Pvt. Ltd.",
    "Spinny (Autorev Pvt. Ltd.)",
    "Appsflyer India",
    "Xebia IT Architects India",
    "Webonise Lab",
    "Thoucentric Technology"
  ];

  const services = [
    {
      name: "Managed Offices",
      description: "Custom-designed offices on dedicated floors for teams of 50-500+ members, tailored to specific brand, culture, and operational needs. The Hive handles everything from asset identification to design, fit-out, and ongoing management.",
      icon: Building
    },
    {
      name: "Private Offices",
      description: "Fully furnished private cabins ideal for teams of 1-50+ members, offering dedicated space with access to shared amenities.",
      icon: Users
    },
    {
      name: "Dedicated Desks",
      description: "Reserved workstations in shared spaces with personal locked storage cabinets, providing a balance between privacy and community.",
      icon: Target
    },
    {
      name: "Hot Desks",
      description: "Flexible access to any workspace in common areas on a first-come, first-served basis.",
      icon: Zap
    },
    {
      name: "Virtual Offices",
      description: "Business presence and address services without physical workspace.",
      icon: Globe
    },
    {
      name: "Meeting & Event Spaces",
      description: "Bookable spaces for monthly meetings, interviews, team building sessions, workshops, product launches, and more.",
      icon: Award
    },
  ];

  const amenities = [
    "High-speed internet and advanced connectivity",
    "Meeting and conference rooms with video/audio conferencing",
    "Reception and concierge services",
    "Mail handling and packaging services",
    "Printing, scanning, and photocopying",
    "Fully equipped pantry with complimentary coffee, tea, and drinking water",
    "Game lounge and recreational areas",
    "Phone booths for private calls",
    "24/7 access and two-level security",
    "Housekeeping and maintenance",
    "Community app for seamless service access",
    "Partner discounts and exclusive events",
    "Air conditioning, power backup, and ergonomic furniture"
  ];

  const lifestyleAccess = [
    "State-of-the-art retail outlets",
    "Multiple F&B options (restaurants, cafés, bars)",
    "Five-star hotels and serviced apartments",
    "Fitness studios and gyms",
    "Swimming pools and spa facilities",
    "Cinema multiplexes",
    "Event venues and entertainment spaces",
    "Childcare facilities at select locations"
  ];

  return (
    <div className="w-full bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              The Hive Workspaces
              <br />
              <span className="text-gray-500">Comprehensive Company Overview</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              The Hive is a premium managed workspace platform operating across India, offering
              flexible and customized office solutions designed to nurture and grow the
              next generation of enterprises.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              The company positions itself as an "all-encompassing ecosystem" that provides more
              than just physical workspace—it creates integrated lifestyle destinations where work,
              leisure, and community converge.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <img
              src={heroImg}
              alt="The Hive Workspace"
              className="rounded-2xl shadow-2xl w-full h-96 object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Who We Are</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  The Hive integrates workspaces within lifestyle destinations, blending work,
                  leisure, and community. With its signature <span className="font-semibold text-gray-900">Work-Play-Grow</span> philosophy, The Hive
                  caters to enterprises, SMEs, startups, and entrepreneurs.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  The Hive distinguishes itself by integrating workspaces into larger lifestyle
                  developments, offering members seamless access to retail, hospitality,
                  entertainment, and food & beverage experiences.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  This unique "Work-Play-Grow" philosophy sets it apart from traditional coworking
                  operators, positioning workspaces within vibrant community centers rather than
                  standalone office buildings.
                </p>
              </div>
              <div>
                <img
                  src={workspaceImg}
                  alt="The Hive Workspace Interior"
                  className="rounded-2xl shadow-lg w-full h-80 object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Virtual Tour Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Take a Virtual Tour</h2>
            <p className="text-gray-600 text-center mb-8 text-lg">
              Experience The Hive workspaces from anywhere in the world
            </p>
            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="The Hive Virtual Tour"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company History and Timeline */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-10">Company History & Timeline</h2>
            
            <div className="grid md:grid-cols-2 gap-10 mb-10">
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Building className="w-6 h-6 text-gray-700" />
                  Foundation and Sponsorship
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Hive Workspaces was established as part of <span className="font-semibold">The Xander Group's</span> portfolio,
                  a leading real estate private equity firm that pioneered foreign direct investment
                  in Indian real estate in 2005.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The company was co-founded and led by <span className="font-semibold">Ankit Samdariya</span>, who served as CEO
                  from 2018 to 2020. The legal entity Hive Workspaces LLP was officially registered
                  on October 22, 2021, in Hyderabad, though the operational centers had been
                  established earlier as part of Xander's strategic initiatives.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-gray-700" />
                  Leadership Evolution
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <span className="font-semibold">Ankit Samdariya</span>, a Harvard MBA graduate and IIT Delhi alumnus, brought
                  extensive real estate experience to The Hive. Before founding The Hive, he served
                  as Vice President of Investments & Asset Management at Virtuous Retail South Asia.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Under Samdariya's leadership, The Hive grew profitably to over 500,000 square feet
                  of operational portfolio across India. After his tenure as CEO (2018-2020), he moved
                  on to leadership roles at LOGOS Group.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-2xl font-semibold mb-6">Operational Timeline</h3>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-3 h-3 rounded-full bg-gray-800 mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-900">2013-2016</p>
                    <p className="text-gray-700">Xander Group begins strategic planning for integrated workspace platform</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-3 h-3 rounded-full bg-gray-800 mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-900">2015</p>
                    <p className="text-gray-700">The Hive Collaborative Workspaces begins operations</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-3 h-3 rounded-full bg-gray-800 mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-900">2018-2020</p>
                    <p className="text-gray-700">Ankit Samdariya serves as CEO, expanding portfolio profitably</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-3 h-3 rounded-full bg-gray-800 mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-900">October 2021</p>
                    <p className="text-gray-700">Hive Workspaces LLP formally registered</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-3 h-3 rounded-full bg-gray-800 mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Present</p>
                    <p className="text-gray-700">Operating with 5 flagship centers across 4 gateway cities</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Do - Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">What We Do</h2>
            <p className="text-gray-600 text-center mb-12 text-lg">
              Comprehensive flexible workspace solutions across multiple formats
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-gray-100 rounded-lg">
                        <Icon className="w-6 h-6 text-gray-800" />
                      </div>
                      <h3 className="text-xl font-semibold">{service.name}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Premium Amenities */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Premium Amenities</h2>
            <p className="text-gray-600 text-center mb-8 text-lg">
              All workspace options include comprehensive amenities
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gray-800 mt-2"></div>
                  <p className="text-gray-700">{amenity}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Integrated Lifestyle Access */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Integrated Lifestyle Access</h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  Members enjoy seamless access to the broader lifestyle ecosystems in which
                  The Hive centers are embedded:
                </p>
                <div className="grid gap-3">
                  {lifestyleAccess.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gray-800"></div>
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <img
                  src={communityImg}
                  alt="Lifestyle Access"
                  className="rounded-2xl shadow-xl w-full h-96 object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Current Locations */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Current Locations</h2>
            <p className="text-gray-600 text-center mb-12 text-lg">
              Five flagship centers across four gateway cities in India
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {locations.map((loc, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={loc.image}
                      alt={loc.city}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start gap-2 mb-3">
                      <MapPin className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
                      <h3 className="text-xl font-semibold">{loc.city}</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 font-medium">{loc.desc}</p>
                    <p className="text-gray-500 text-xs mb-3">{loc.address}</p>
                    <p className="text-gray-700 text-sm leading-relaxed">{loc.details}</p>
                    
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Members />

      {/* Company Philosophy */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Company Philosophy and Values</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-8 rounded-2xl shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Work-Play-Grow Ecosystem</h3>
                <p className="text-gray-700 leading-relaxed">
                  The Hive's core philosophy centers on providing an integrated environment where professional
                  growth, personal wellness, and social interaction coexist. This is achieved by strategically
                  locating centers within or adjacent to lifestyle hubs featuring retail, entertainment,
                  hospitality, and F&B experiences.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Flexibility and Scalability</h3>
                <p className="text-gray-700 leading-relaxed">
                  The company emphasizes workspace flexibility, allowing businesses to seamlessly scale up or
                  down as needed. Members can adjust seat counts, expand to multiple locations across India,
                  and customize terms to create bespoke workspace solutions.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Community-Centric Approach</h3>
                <p className="text-gray-700 leading-relaxed">
                  The Hive fosters a "close-knit community" of like-minded professionals, encouraging
                  collaboration, networking, and potential synergies between members. The company organizes
                  regular events and programming to facilitate connections.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Technology Integration</h3>
                <p className="text-gray-700 leading-relaxed">
                  The company provides a comprehensive smartphone application that enables members to book
                  meeting rooms, access spaces with key cards, request concierge services, and manage their
                  membership digitally.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Best-in-Class Service</h3>
              <p className="text-lg leading-relaxed opacity-90">
                With experienced on-ground teams and professional service delivery, The Hive aims to provide
                an "impeccable occupancy experience" that allows businesses to focus on core operations while
                the company handles all workspace management.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Business Model */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Business Model and Structure</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold mb-4">Managed Workspace Platform</h3>
                <p className="text-gray-700 leading-relaxed">
                  The Hive operates on a managed workspace model where it leases properties from developers
                  (often within larger mixed-use developments), designs and operates flexible workspace centers,
                  and subleases to corporate clients under flexible terms.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold mb-4">Xander Group Backing</h3>
                <p className="text-gray-700 leading-relaxed">
                  As part of The Xander Group's real estate portfolio, The Hive benefits from institutional
                  backing and strategic alignment with Xander's broader real estate investments, particularly
                  in retail-led mixed-use developments through Virtuous Retail.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold mb-4">Integrated Development Strategy</h3>
                <p className="text-gray-700 leading-relaxed">
                  The unique differentiator is The Hive's integration into larger lifestyle destinations rather
                  than standalone office buildings. This provides mutual benefits: workspace members access
                  superior amenities, while the lifestyle centers benefit from daytime foot traffic and engaged
                  professional communities.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expansion Plans */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Expansion Plans and Roadmap</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Current Presence</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  5 flagship centers totaling approximately 150,000+ sq. ft. across 4 cities
                </p>
                <h4 className="text-xl font-semibold mb-3 mt-6">Rapid Expansion Plans:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-800 mt-1">•</span>
                    <span>Additional centers in existing cities: Bengaluru, Chennai, Hyderabad, Pune</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-800 mt-1">•</span>
                    <span>Entry into new gateway cities: Mumbai and Delhi</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Market Trends</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-800 mt-1">•</span>
                    <span>India's coworking market expected to reach USD 7.71 billion by 2030, growing at 14.14% CAGR</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-800 mt-1">•</span>
                    <span>Hybrid work models driving demand: 53% of employers favoring hybrid policies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-800 mt-1">•</span>
                    <span>India projected to host over 200,000 startups by 2030</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-800 mt-1">•</span>
                    <span>Trend toward "experience-driven spaces" and "modular, data-driven" workspace solutions</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Market Position */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Market Position and Competitive Landscape</h2>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-10 rounded-2xl shadow-xl">
              <p className="text-lg leading-relaxed mb-6 opacity-95">
                The Hive operates in India's rapidly growing flexible workspace market alongside major competitors
                including WeWork India, BHIVE Workspace, Awfis, Smartworks, and others.
              </p>
              
              <h3 className="text-2xl font-semibold mb-4 mt-8">Key Differentiators:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <span className="text-gray-300 mt-1">✓</span>
                  <span>Integration with lifestyle destinations rather than standalone office buildings</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-300 mt-1">✓</span>
                  <span>Institutional backing from Xander Group, a leading real estate investment firm</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-300 mt-1">✓</span>
                  <span>Premium positioning with best-in-class amenities and curated locations</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-300 mt-1">✓</span>
                  <span>Profitability focus, having grown to 500,000+ sq. ft. profitably</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-300 mt-1">✓</span>
                  <span>Target clientele spanning established enterprises, MNCs, and high-growth startups</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-300 mt-1">✓</span>
                  <span>Strategic locations in gateway cities with flexible terms and institutional backing</span>
                </div>
              </div>
              
              <p className="text-lg leading-relaxed mt-8 opacity-95">
                The company's strategic locations in gateway cities, combined with flexible terms and institutional
                backing, position it as a premium alternative in India's evolving workspace ecosystem.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
