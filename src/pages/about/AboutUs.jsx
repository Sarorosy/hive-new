import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Building,
  Users,
  Award,
  Target,
  Zap,
  Globe,
  Rocket,
} from "lucide-react";
import { centersData } from "../../data/centersData";
import { branchAddresses } from "../../data/branchAddresses";

// Import images
import heroImg from "../../assets/raw/all/DSC07729-min.JPG";
import workspaceImg from "../../assets/raw/all/DSC07855-min.JPG";
import communityImg from "../../assets/raw/chn/YAV00102-min.JPG";
import Members from "../home/Members";
import HiveWorkspaces from "./HiveWorkspaces";
import RetrofuturismRoadmap from "./RetrofuturismRoadmap";
import { useOutletContext } from "react-router-dom";

export default function AboutUs() {
  const { theme } = useOutletContext();

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
    "Air conditioning, power backup, and ergonomic furniture",
  ];

  return (
    <div
      className={`
        w-full
        ${theme === "dark" ? "bg-black text-gray-200" : "bg-white text-gray-800"}
      `}
    >
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1
              className={`
                text-4xl md:text-5xl mb-6 leading-tight liber
                ${theme === "dark" ? "text-white" : "text-gray-900"}
              `}
            >
              <span className="font-bold">The Hive Workspaces</span>
              <br />
              <span className="text-gray-500 text-3xl">
                Premium Managed Workspaces
              </span>
              <br />
              <span className="text-gray-500 text-2xl">
                Designed for Modern Businesses
              </span>
            </h1>

            <p
              className={`
                text-lg leading-relaxed mb-4
                ${theme === "dark" ? "text-gray-300" : "text-gray-600"}
              `}
            >
              The Hive Workspaces is a leading provider of premium managed
              office spaces in India, offering flexible, fully serviced, and
              technology-enabled environments for ambitious businesses.
            </p>

            <p
              className={`
                text-lg leading-relaxed
                ${theme === "dark" ? "text-gray-300" : "text-gray-600"}
              `}
            >
              With a growing presence across major commercial districts, The Hive
              delivers a seamless mix of Grade-A infrastructure, hospitality-driven
              service, and a collaborative community.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <img
              src="/CB_26495-min.jpg"
              alt="The Hive Workspace"
              className="rounded-2xl shadow-2xl w-full h-96 object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <section
        className={`
          py-20
          ${theme === "dark" ? "bg-black" : "bg-gradient-to-br from-gray-50 to-gray-100"}
        `}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className={`
                text-3xl md:text-3xl font-bold mb-8 liber
                ${theme === "dark" ? "text-white" : "text-gray-900"}
              `}
            >
              Who We Are
            </h2>

            <div>
              {[
                "The Hive Workspaces was established as part of The Xander Group's portfolio...",
                "The legal entity Hive Workspaces LLP was officially registered on October 22, 2021...",
                "Before founding The Hive, he served as Vice President of Investments...",
                "After his tenure as CEO (2018–2020), he moved on to leadership roles at LOGOS Group.",
              ].map((para, index) => (
                <p
                  key={index}
                  className={`
                    leading-relaxed mb-4 text-lg
                    ${theme === "dark" ? "text-gray-300" : "text-gray-700"}
                  `}
                >
                  {para}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <RetrofuturismRoadmap />

      {/* Premium Amenities */}
      <section
        className={`
          py-20
          ${theme === "dark" ? "bg-black" : "bg-gray-50"}
        `}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className={`
                text-3xl md:text-4xl font-bold mb-4 text-center liber
                ${theme === "dark" ? "text-white" : "text-gray-900"}
              `}
            >
              Premium Amenities
            </h2>

            <p
              className={`
                text-center mb-8 text-lg
                ${theme === "dark" ? "text-gray-400" : "text-gray-600"}
              `}
            >
              All workspace options include comprehensive amenities
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className={`
                    flex items-start gap-3 p-4 rounded-lg shadow-sm
                    ${theme === "dark" ? "bg-white/5 text-gray-300" : "bg-white text-gray-700"}
                  `}
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      theme === "dark" ? "bg-white" : "bg-gray-800"
                    }`}
                  ></div>
                  <p>{amenity}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Members />
      <HiveWorkspaces />
    </div>
  );
}
