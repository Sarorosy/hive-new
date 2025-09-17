// src/pages/DayPass.jsx
import React, { useState } from "react";
import { ChevronDown, CalendarDays, Building2, MapPin, Calendar } from "lucide-react";
import { centersData } from "../../data/centersData";
import { Wifi, Coffee, Car, Users } from "lucide-react";

const DayPass = () => {
    const [selectedCity, setSelectedCity] = useState("chennai");
    const [selectedBranch, setSelectedBranch] = useState("");
    const [date, setDate] = useState("");

    const cities = Object.entries(centersData);
    const branches = selectedCity
        ? Object.entries(centersData[selectedCity].branches)
        : [];

    // If branch is selected → show that one
    // If not → show all branches of the selected city
    const branchesToDisplay =
        selectedBranch && selectedCity
            ? [[selectedBranch, centersData[selectedCity].branches[selectedBranch]]]
            : branches;

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-indigo-50 py-12 px-6 md:px-12 relative">
            <div className="max-w-7xl mx-auto flex w-full gap-2 ">
                {/* Left Side - Filters */}
                <div className=" w-1/3 bg-white/80  backdrop-blur-xl p-3 rounded-2xl shadow-xl border border-gray-100 sticky top-0">
                    <h2 className="text-3xl font-extrabold font-serif text-gray-900 mb-6">
                        Book a <span className="text-orange-600">Day Pass</span>
                    </h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        Choose your preferred center, branch, and date to explore our
                        workspaces with a hassle-free day pass.
                    </p>

                    <div className="space-y-6">
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
                                        setSelectedBranch(""); // reset branch when city changes
                                    }}
                                    className="w-full px-4 py-3 pl-10 border rounded-xl appearance-none cursor-pointer focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
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
                                    className="w-full px-4 py-3 pl-10 border rounded-xl appearance-none cursor-pointer focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                                >
                                    <option value="">-- Show All Branches --</option>
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
                                    className="w-full px-4 py-3 pl-10 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
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
                <div className=" w-2/3 flex flex-col gap-6">
                    {branchesToDisplay.length > 0 ? (
                        branchesToDisplay.map(([branchKey, branch]) => (
                            <div
                                key={branchKey}
                                className="w-full   bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-4"
                            >
                                <div className="flex items-start gap-6">

                                    {/* Image */}
                                    <div className="h-56 w-56 flex-shrink-0 overflow-hidden rounded-xl">
                                        <img
                                            src={branch.images[0]}
                                            alt={branch.name}
                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 space-y-3">
                                        <h3 className="text-xl font-semibold text-gray-900">{branch.name}</h3>
                                        <p className="text-gray-600 text-sm">
                                            {centersData[selectedCity].name}
                                        </p>
                                        <p className="text-gray-700 leading-relaxed line-clamp-4">
                                            {branch.details}
                                        </p>
                                        {date && (
                                            <p className="text-orange-600 font-medium flex items-center">
                                                <Calendar size={15} className="text-black mr-2" /> Selected Date: {date}
                                            </p>
                                        )}
                                        <div className="flex flex-wrap gap-4 pt-3">
                                            <div
                                                data-tooltip-id="my-tooltip"
                                                data-tooltip-content="High Speed Internet"
                                                className="p-1  rounded-xl transition cursor-pointer"
                                            >
                                                <Wifi size={18} className="text-orange-600" />
                                            </div>

                                            <div
                                                data-tooltip-id="my-tooltip"
                                                data-tooltip-content="Free Coffee"
                                                className="p-1  rounded-xl transition cursor-pointer"
                                            >
                                                <Coffee size={18} className="text-orange-600" />
                                            </div>

                                            <div
                                                data-tooltip-id="my-tooltip"
                                                data-tooltip-content="Parking Available"
                                                className="p-1  rounded-xl transition cursor-pointer"
                                            >
                                                <Car size={18} className="text-orange-600" />
                                            </div>

                                            <div
                                                data-tooltip-id="my-tooltip"
                                                data-tooltip-content="Flexible Desks"
                                                className="p-1  rounded-xl transition cursor-pointer"
                                            >
                                                <Users size={18} className="text-orange-600" />
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="mt-6 flex items-center justify-between gap-6">
                                    {/* Left - Pass Type as Buttons */}
                                    <div className="flex gap-3">
                                        <label className="cursor-pointer">
                                            <input
                                                type="radio"
                                                name={`pass-${branchKey}`}
                                                value="1"
                                                defaultChecked
                                                className="hidden peer"
                                            />
                                            <span className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 peer-checked:bg-orange-600 peer-checked:text-white peer-checked:border-orange-600 hover:bg-orange-100 transition">
                                                1 Day Access
                                            </span>
                                        </label>

                                        <label className="cursor-pointer">
                                            <input
                                                type="radio"
                                                name={`pass-${branchKey}`}
                                                value="5"
                                                className="hidden peer"
                                            />
                                            <span className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 peer-checked:bg-orange-600 peer-checked:text-white peer-checked:border-orange-600 hover:bg-orange-100 transition">
                                                5 Days Access
                                            </span>
                                        </label>

                                        <label className="cursor-pointer">
                                            <input
                                                type="radio"
                                                name={`pass-${branchKey}`}
                                                value="10"
                                                className="hidden peer"
                                            />
                                            <span className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 peer-checked:bg-orange-600 peer-checked:text-white peer-checked:border-orange-600 hover:bg-orange-100 transition">
                                                10 Days Access
                                            </span>
                                        </label>
                                    </div>

                                    {/* Right - Pass Count + Button */}
                                    <div className="flex items-center gap-3">
                                        <label className="text-gray-700 font-medium">No. of Passes</label>
                                        <select className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                                            {Array.from({ length: 99 }, (_, i) => (
                                                <option key={i + 1} value={i + 1}>
                                                    {i + 1}
                                                </option>
                                            ))}
                                        </select>
                                        <button className="bg-orange-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-orange-700 transition">
                                            Book Now
                                        </button>
                                    </div>
                                </div>


                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 italic">Select a center to see details ✨</p>
                    )}

                </div>
            </div>
        </div>
    );
};

export default DayPass;
