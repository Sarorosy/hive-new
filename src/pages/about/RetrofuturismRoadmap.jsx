import React from 'react';
import { motion } from 'framer-motion';
import {
  Rocket,
  Target,
  Zap,
  Globe,
  Sparkles,
  ChevronRight,
  Calendar,
  MapPin,
  Building,
  TrendingUp,
  ArrowUpRight,
  Infinity,
  MapIcon,
  Presentation
} from 'lucide-react';
import { useOutletContext } from "react-router-dom";

export default function RetrofuturismRoadmap() {
  const { theme } = useOutletContext();
  const isDark = theme === "dark";

  const timelineData = [
    {
      number: "01",
      year: "2013-2016",
      title: "Strategic Blueprint",
      description: "Xander Group architects a fully-integrated workspace ecosystem that blends work, retail, and hospitality.",
      icon: <Target className="w-4 h-4" />,
      color: "text-blue-600"
    },
    {
      number: "02",
      year: "2015",
      title: "Launch Momentum",
      description: "The Hive Collaborative Workspaces welcomes its first members and validates the Work-Play-Grow promise.",
      icon: <Rocket className="w-4 h-4" />,
      color: "text-violet-600"
    },
    {
      number: "03",
      year: "2017-2019",
      title: "Expansion Phase",
      description: "Multi-city presence established with flagship locations becoming innovation hubs for creative entrepreneurs.",
      icon: <Globe className="w-4 h-4" />,
      color: "text-emerald-600"
    },
    {
      number: "04",
      year: "2020-Present",
      title: "Future Forward",
      description: "Continuous evolution through technology integration and community-driven experiences that redefine collaborative work.",
      icon: <Zap className="w-4 h-4" />,
      color: "text-amber-600"
    }
  ];

  return (
    <div
      className={`min-h-screen py-16 md:py-20 ${isDark ? "bg-black text-white" : "bg-white text-gray-900"
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 md:mb-20"
        >
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2">
              <div className={`w-4 h-px ${isDark ? "bg-slate-600" : "bg-gray-300"}`}></div>
              <span
                className={`text-xs font-medium  uppercase ${isDark ? "text-slate-300" : "text-gray-500"
                  }`}
              >
                Our Journey
              </span>
              <div className={`w-4 h-px ${isDark ? "bg-slate-600" : "bg-gray-300"}`}></div>
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 liber">
              Timeline of{" "}
              <span className={`font-normal ${isDark ? "text-white" : ""}`}>Innovation</span>
            </h1>
            <p
              className={`max-w-2xl mx-auto text-base leading-relaxed ${isDark ? "text-slate-300" : "text-gray-600"
                }`}
            >
              A cinematic view of The Hive's journey— from bold ideation to a multi-city flagship network that keeps accelerating toward the horizon.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              { value: "5+", label: "Prime Locations", icon: MapPin },
              { value: "100 %", label: "Satisfied Customers", icon: MapPin },
              { value: "20000+", label: "Workstations", icon: Building },
              { value: "50+", label: "Meeting Rooms", icon: Presentation }
            ].map((stat, index) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="text-center"
                >
                  <div className={`text-2xl font-light mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                    {stat.value}
                  </div>
                  <div className={`text-xs flex items-center justify-center ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                    <Icon
                      className={`w-5 mr-1 h-5 ${isDark ? "text-white" : "text-black"
                        }`}
                    /> {stat.label}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div
            className={`absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-px ${isDark ? "bg-slate-800" : "bg-gray-200"
              }`}
          ></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2 w-3 h-3 rounded-full z-10 border ${isDark ? "bg-black border-slate-700" : "bg-white border-gray-300"
                    }`}
                ></div>

                {/* Content */}
                <div className={`md:flex md:items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Left/Right Content */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'} mb-8 md:mb-0`}>
                    {/* Year */}
                    <div className="mb-2">
                      <span
                        className={`text-xs font-medium tracking-wider ${isDark ? "text-slate-400" : "text-gray-500"
                          }`}
                      >
                        {item.year}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className={`text-xl font-normal mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={`text-sm leading-relaxed mb-4 ${isDark ? "text-slate-300" : "text-gray-600"
                        }`}
                    >
                      {item.description}
                    </p>

                    {/* Icon */}
                    <div className="inline-flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center border ${item.color} border-current ${isDark ? "bg-white/5" : ""
                          }`}
                      >
                        {React.cloneElement(item.icon, { className: "w-3 h-3" })}
                      </div>
                      <span className={`text-xs ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                        Milestone
                      </span>
                    </div>
                  </div>

                  {/* Center Spacing for Desktop */}
                  <div className="hidden md:block w-1/2"></div>
                </div>

                {/* Number */}
                <div className="absolute top-0 left-0 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${isDark ? "bg-white/10" : "bg-gray-100"
                      }`}
                  >
                    <span className={`text-xs font-medium ${isDark ? "text-slate-300" : "text-gray-600"}`}>
                      {item.number}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Future Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="max-w-2xl mx-auto">
            {/* Divider */}
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className={`flex-1 h-px ${isDark ? "bg-slate-700" : "bg-gray-200"}`}></div>
              <Infinity className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-gray-400"}`} />
              <div className={`flex-1 h-px ${isDark ? "bg-slate-700" : "bg-gray-200"}`}></div>
            </div>

            {/* Content */}
            <div className="text-center">
              <h2 className={`text-2xl font-light mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
                Continuous Evolution
              </h2>

              <p
                className={`mb-8 leading-relaxed text-base ${isDark ? "text-slate-300" : "text-gray-600"
                  }`}
              >
                As we move forward, The Hive continues to innovate, integrating cutting-edge technology and community-driven experiences that redefine the future of collaborative work.
              </p>

              
            </div>
          </div>
        </motion.div>


      </div>
    </div>
  );
}