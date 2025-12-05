import React from "react";
import { motion } from "framer-motion";
import {
  Wifi,
  Video,
  Bell,
  Mail,
  Printer,
  Coffee,
  Gamepad2,
  Phone,
  ShieldCheck,
  Brush,
  Smartphone,
  Gift,
  Wind,
  ChevronRight,
  Sparkles,
  Building,
  Users,
  Target,
} from "lucide-react";

import Members from "../home/Members";
import HiveWorkspaces from "./HiveWorkspaces";
import RetrofuturismRoadmap from "./RetrofuturismRoadmap";
import { useOutletContext, useNavigate } from "react-router-dom";

export default function AboutUs() {
  const { theme } = useOutletContext();
  const navigate = useNavigate();

  const amenities = [
    { label: "High-speed internet and advanced connectivity", icon: Wifi },
    {
      label: "Meeting & conference rooms with video/audio conferencing",
      icon: Video,
    },
    { label: "Reception and concierge services", icon: Bell },
    { label: "Mail handling and packaging services", icon: Mail },
    { label: "Printing, scanning, and photocopying", icon: Printer },
    { label: "Equipped pantry with complimentary coffee / tea", icon: Coffee },
    { label: "Game lounge and recreational areas", icon: Gamepad2 },
    { label: "Phone booths for private calls", icon: Phone },
    { label: "24/7 access and two-level security", icon: ShieldCheck },
    { label: "Housekeeping and maintenance", icon: Brush },
    { label: "Community app for seamless service access", icon: Smartphone },
    { label: "Partner discounts and exclusive events", icon: Gift },
    {
      label: "Air conditioning, power backup, ergonomic furniture",
      icon: Wind,
    },
  ];

  const isDark = theme === "dark";

  return (
    <div
      className={`w-full pt-8 overflow-hidden ${
        isDark ? "bg-black text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Hero Section - Elegant Card */}
      <section
        className={`py-16 md:py-20 bg-gradient-to-b ${
          isDark ? "from-black to-slate-900" : "from-white to-gray-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-6">
                <span
                  className={`text-xs font-medium  uppercase ${
                    isDark ? "text-slate-300" : "text-gray-500"
                  }`}
                >
                  Designed for Modern Businesses
                </span>
              </div>

              <div className="mb-8">
                <h1 className="text-5xl md:text-6xl font-medium mb-4 liber">
                  The Hive
                  <span
                    className={`block ${
                      isDark ? "text-slate-300" : "text-gray-600"
                    }`}
                  >
                    Workspaces
                  </span>
                </h1>
                <div
                  className={`w-20 h-0.5 mb-6 ${
                    isDark ? "bg-slate-600" : "bg-gray-300"
                  }`}
                ></div>
              </div>

              <div
                className={`rounded-xl p-8 shadow-sm border mb-8 ${
                  isDark
                    ? "bg-black/60 border-slate-800"
                    : "bg-white border-gray-100"
                }`}
              >
                <p
                  className={`mb-6 leading-relaxed ${
                    isDark ? "text-slate-200" : "text-gray-700"
                  }`}
                >
                  The Hive Workspaces is a leading provider of premium managed
                  office spaces in India, offering flexible, fully serviced, and
                  technology-enabled environments for ambitious businesses.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isDark ? "bg-white" : "bg-gray-800"
                      }`}
                    ></div>
                    <span
                      className={`text-sm ${
                        isDark ? "text-slate-200" : "text-gray-600"
                      }`}
                    >
                      With a growing presence across major commercial districts
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isDark ? "bg-white" : "bg-gray-800"
                      }`}
                    ></div>
                    <span
                      className={`text-sm ${
                        isDark ? "text-slate-200" : "text-gray-600"
                      }`}
                    >
                      The Hive delivers a seamless mix of Grade-A
                      infrastructure, hospitality-driven service, and a
                      collaborative community
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div
                className={`rounded-2xl shadow-lg overflow-hidden border ${
                  isDark ? "bg-black border-slate-800" : "bg-white border-gray-100"
                }`}
              >
                <div className="aspect-[4/3] relative">
                  <img
                    src="/CB_26495-min.jpg"
                    alt="The Hive Workspace"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3
                        className={`font-medium mb-1 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Premium Managed Workspaces
                      </h3>
                      <p
                        className={`text-sm ${
                          isDark ? "text-slate-400" : "text-gray-500"
                        }`}
                      >
                        Grade-A Infrastructure • Hospitality-Driven •
                        Collaborative
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are - Minimalist */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`relative rounded-3xl border backdrop-blur-sm p-8 md:p-10 shadow-sm ${
              isDark
                ? "border-slate-800 bg-black/40"
                : "border-gray-100 bg-white/70"
            }`}
          >
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-10 h-0.5 ${isDark ? "bg-white" : "bg-black"}`}
                ></div>
                <h2 className="text-3xl md:text-4xl font-semibold liber">
                  Who We Are
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <p
                    className={`leading-relaxed text-sm md:text-base ${
                      isDark ? "text-slate-200" : "text-gray-700"
                    }`}
                  >
                    The Hive Workspaces was established as part of The Xander
                    Group's portfolio...
                  </p>
                  <p
                    className={`leading-relaxed text-sm md:text-base ${
                      isDark ? "text-slate-200" : "text-gray-700"
                    }`}
                  >
                    The legal entity Hive Workspaces LLP was officially
                    registered on October 22, 2021...
                  </p>
                </div>
                <div className="space-y-4">
                  <p
                    className={`leading-relaxed text-sm md:text-base ${
                      isDark ? "text-slate-200" : "text-gray-700"
                    }`}
                  >
                    Before founding The Hive, he served as Vice President of
                    Investments...
                  </p>
                  <p
                    className={`leading-relaxed text-sm md:text-base ${
                      isDark ? "text-slate-200" : "text-gray-700"
                    }`}
                  >
                    After his tenure as CEO (2018–2020), he moved on to
                    leadership roles at LOGOS Group.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <RetrofuturismRoadmap />

      {/* Premium Amenities - Grid Layout */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-10">
              <div
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs uppercase  ${
                  isDark ? "bg-white text-black" : "bg-black text-white"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span className="font-medium">Inclusive Amenities</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold mt-4 mb-2 liber">
                Premium Amenities
              </h2>
              <p
                className={`max-w-2xl mx-auto text-sm md:text-base ${
                  isDark ? "text-slate-300" : "text-gray-600"
                }`}
              >
                All workspace options include comprehensive amenities designed
                for modern businesses
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {amenities.map((a, idx) => {
                const Icon = a.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(0,0,0,0.03)",
                      transition: { duration: 0.2 },
                    }}
                    className="group relative"
                  >
                    <div
                      className={`absolute inset-0 border rounded-xl transition-colors ${
                        isDark
                          ? "border-slate-800 group-hover:border-white/40"
                          : "border-gray-100 group-hover:border-black/30"
                      }`}
                    ></div>
                    <div
                      className={`relative p-5 rounded-xl backdrop-blur-sm ${
                        isDark ? "bg-black/50" : "bg-white/90"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2.5 rounded-lg transition-colors ${
                            isDark
                              ? "bg-white/10 group-hover:bg-white/20"
                              : "bg-black/5 group-hover:bg-black/10"
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 ${
                              isDark ? "text-white" : "text-black"
                            }`}
                          />
                        </div>
                        <p
                          className={`leading-relaxed text-sm md:text-base font-medium transition-colors ${
                            isDark
                              ? "text-slate-200 group-hover:text-white"
                              : "text-gray-700 group-hover:text-gray-900"
                          }`}
                        >
                          {a.label}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <Members />
      <HiveWorkspaces />

      {/* Floating CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="fixed bottom-6 left-6 z-50"
      >
        <button
          className={`px-5 py-3 font-medium rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2 text-sm ${
            isDark ? "bg-white text-black" : "bg-black text-white"
          }`}
          onClick={()=>{navigate("/solutions")}}
        >
          <span>Explore Workspaces</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
}
