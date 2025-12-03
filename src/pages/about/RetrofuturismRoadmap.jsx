import React from 'react';
import { useOutletContext } from "react-router-dom";

export default function RetrofuturismRoadmap() {

  const { theme } = useOutletContext();

  const timelineData = [
    {
      number: "1",
      year: "2013-2016",
      title: "Strategic Blueprint",
      description: "Xander Group architects a fully-integrated workspace ecosystem that blends work, retail, and hospitality."
    },
    {
      number: "2",
      year: "2015",
      title: "Launch Momentum",
      description: "The Hive Collaborative Workspaces welcomes its first members and validates the Work-Play-Grow promise."
    },
    {
      number: "3",
      year: "2017-2019",
      title: "Expansion Phase",
      description: "Multi-city presence established with flagship locations becoming innovation hubs for creative entrepreneurs."
    },
    {
      number: "4",
      year: "2020-Present",
      title: "Future Forward",
      description: "Continuous evolution through technology integration and community-driven experiences that redefine collaborative work."
    }
  ];

  return (
    <div
      className={`
        min-h-screen py-16 px-4 sm:px-6 lg:px-8
        ${theme === "dark" ? "bg-black text-white" : "bg-white text-gray-900"}
      `}
    >
      <div className="max-w-5xl mx-auto">

        {/* Header Section */}
        <div className="mb-16">
          <h1
            className={`
              text-4xl sm:text-5xl font-bold mb-4
              ${theme === "dark" ? "text-white" : "text-gray-900"}
            `}
          >
            Retrofuturism Roadmap
          </h1>

          <h2
            className={`
              text-xl sm:text-2xl font-semibold mb-3
              ${theme === "dark" ? "text-gray-300" : "text-gray-700"}
            `}
          >
            Company History & Timeline
          </h2>

          <p
            className={`
              text-base sm:text-lg max-w-3xl leading-relaxed
              ${theme === "dark" ? "text-gray-400" : "text-gray-600"}
            `}
          >
            A cinematic view of The Hive's journey— from bold ideation to a multi-city flagship network that keeps accelerating toward the horizon.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Vertical Line */}
          <div
            className={`
              absolute left-4 top-0 bottom-0 w-px
              ${theme === "dark" ? "bg-gray-700" : "bg-gray-300"}
            `}
          ></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <div key={index} className="relative pl-12">

                {/* Number Circle */}
                <div className="absolute left-0 flex items-center justify-center">
                  <div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      ${theme === "dark" ? "bg-white text-black" : "bg-gray-900 text-white"}
                    `}
                  >
                    <span className="text-sm font-semibold">{item.number}</span>
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`
                    pb-8 border-b last:border-b-0
                    ${theme === "dark" ? "border-gray-700" : "border-gray-200"}
                  `}
                >
                  <span
                    className={`
                      inline-block text-sm font-medium mb-2
                      ${theme === "dark" ? "text-gray-400" : "text-gray-500"}
                    `}
                  >
                    {item.year}
                  </span>

                  <h3
                    className={`
                      text-xl sm:text-2xl font-semibold mb-2
                      ${theme === "dark" ? "text-white" : "text-gray-900"}
                    `}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`
                      leading-relaxed
                      ${theme === "dark" ? "text-gray-300" : "text-gray-600"}
                    `}
                  >
                    {item.description}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
