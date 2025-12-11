// src/pages/DayPass.jsx
import React, { useState } from "react";
import {
  ChevronDown,
  CalendarDays,
  Building2,
  MapPin,
  Calendar,
  Wifi,
  Coffee,
  Car,
  Users,
} from "lucide-react";
import { centersData } from "../../data/centersData";

const DayPass = () => {
  const [selectedCity, setSelectedCity] = useState("chennai");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [date, setDate] = useState("");

  const cities = Object.entries(centersData);
  const branches = selectedCity
    ? Object.entries(centersData[selectedCity].branches)
    : [];

  const branchesToDisplay =
    selectedBranch && selectedCity
      ? [[selectedBranch, centersData[selectedCity].branches[selectedBranch]]]
      : branches;

  return (
    <div className="mt-5 min-h-screen bg-gradient-to-br from-orange-50 via-white to-indigo-50 py-8 px-4 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row w-full gap-6">
        {/* Left Side - Filters */}
        <div className="w-full md:w-1/3 bg-white/80 backdrop-blur-xl p-4 rounded shadow-xl border border-gray-100 md:sticky top-0">
          <h2 className="text-2xl md:text-3xl liber liber text-gray-900 mb-4">
            Book a <span className="text-orange-600">Day Pass</span>
          </h2>
          <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
            Choose your preferred center, branch, and date to explore our
            workspaces with a hassle-free day pass.
          </p>

          <div className="space-y-5">
            {/* City Select */}
            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                Select Center
              </label>
              <div className="relative">
                <select
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setSelectedBranch("");
                  }}
                  className="w-full px-4 py-3 pl-10 border rounded-xl appearance-none cursor-pointer focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition text-sm md:text-base"
                >
                  {cities.map(([cityKey, city]) => (
                    <option key={cityKey} value={cityKey}>
                      {city.name}
                    </option>
                  ))}
                </select>
                <Building2
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                  size={18}
                />
              </div>
            </div>

            {/* Branch Select */}
            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                Select Branch
              </label>
              <div className="relative">
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  disabled={!selectedCity}
                  className="w-full px-4 py-3 pl-10 border rounded-xl appearance-none cursor-pointer focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed text-sm md:text-base"
                >
                  <option value="">Select a branch</option>
                  {branches.map(([branchKey, branch]) => (
                    <option key={branchKey} value={branchKey}>
                      {branch.name}
                    </option>
                  ))}
                </select>
                <MapPin
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                  size={18}
                />
              </div>
            </div>

            {/* Date Picker */}
            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                Select Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition text-sm md:text-base"
                />
                <CalendarDays
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Branch Cards */}
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          {branchesToDisplay.length > 0 ? (
            branchesToDisplay.map(([branchKey, branch]) => (
              <div
                key={branchKey}
                className="w-full bg-white rounded shadow-xl overflow-hidden border border-gray-100 p-4"
              >
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  {/* Image */}
                  <div className="h-48 sm:h-56 w-full sm:w-56 flex-shrink-0 overflow-hidden rounded-xl">
                    <img
                      src={branch.images[0]}
                      alt={branch.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                      {branch.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {centersData[selectedCity].name}
                    </p>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base line-clamp-4">
                      {branch.details}
                    </p>
                    {date && (
                      <p className="text-orange-600 font-medium flex items-center text-sm">
                        <Calendar size={15} className="text-black mr-2" />{" "}
                        Selected Date: {date}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-3 pt-2">
                      {[Wifi, Coffee, Car, Users].map((Icon, i) => (
                        <div
                          key={i}
                          className="p-1 rounded-xl transition cursor-pointer"
                        >
                          <Icon size={18} className="text-orange-600" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Pass Type */}
                  <div className="flex gap-2 sm:gap-3 flex-wrap">
                    {["1", "5", "10"].map((days) => (
                      <label key={days} className="cursor-pointer">
                        <input
                          type="radio"
                          name={`pass-${branchKey}`}
                          value={days}
                          defaultChecked={days === "1"}
                          className="hidden peer"
                        />
                        <span className="px-3 sm:px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm sm:text-base peer-checked:bg-orange-600 peer-checked:text-white peer-checked:border-orange-600 hover:bg-orange-100 transition">
                          {days} Day{days !== "1" && "s"} Access
                        </span>
                      </label>
                    ))}
                  </div>

                  {/* Pass Count + Button  */}
                  <div className="flex flex-wrap items-center gap-3">
                    <label className="text-gray-700 font-medium text-sm">
                      No. of Passes
                    </label>
                    <select className="border px-2 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm">
                      {Array.from({ length: 99 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    <button className="bg-orange-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-700 transition text-sm">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">
              Select a center to see details ✨
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DayPass;
