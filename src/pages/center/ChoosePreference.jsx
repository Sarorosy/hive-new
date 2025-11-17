import React, { useEffect, useState } from "react";
import { MapPin, Car, Users, Monitor, Heart, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ChoosePreference = ({ cityData, centersData }) => {
    const [showMap, setShowMap] = useState(true);

    const branches = Object.entries(cityData.branches);

    const [selectedAreas, setSelectedAreas] = useState(["all"]);
    const [selectedBranchKey, setSelectedBranchKey] = useState(
        branches[0]?.[0] ?? null
    );

    const toggleArea = (key) => {
        if (selectedAreas.includes("all")) {
            setSelectedAreas([key]);
        } else if (selectedAreas.includes(key)) {
            const newAreas = selectedAreas.filter((a) => a !== key);
            setSelectedAreas(newAreas.length ? newAreas : ["all"]);
        } else {
            const newAreas = [...selectedAreas, key];
            if (newAreas.length === branches.length) {
                setSelectedAreas(["all"]);
            } else {
                setSelectedAreas(newAreas);
            }
        }
    };

    const toggleAll = () => {
        if (selectedAreas.includes("all")) {
            setSelectedAreas([]);
        } else {
            setSelectedAreas(["all"]);
        }
    };

    const filteredBranches =
        selectedAreas.includes("all")
            ? branches
            : branches.filter(([key]) => selectedAreas.includes(key));

    useEffect(() => {
        if (!filteredBranches.length) {
            setSelectedBranchKey(null);
            return;
        }

        const branchExists = filteredBranches.some(([key]) => key === selectedBranchKey);
        if (!branchExists) {
            setSelectedBranchKey(filteredBranches[0][0]);
        }
    }, [filteredBranches, selectedBranchKey]);

    const activeBranch = filteredBranches.find(([key]) => key === selectedBranchKey)?.[1] ?? null;


    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleSelect = (cityKey) => {
        setOpen(false);
        navigate(`/${cityKey.toLowerCase()}`);
    };

    return (
        <div className="w-full px-4 md:px-12 py-8">
            {/* Filters */}
            <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 font-serif">
                    Choose your preferences
                </h2>
                <div className="flex flex-wrap gap-4 items-center">
                    <div className="relative">
                        {/* Dropdown Trigger */}
                        <button
                            onClick={() => setOpen(!open)}
                            className="px-4 py-2 border rounded-lg flex items-center gap-2"
                        >
                            City{" "}
                            <span className="font-semibold">
                                {cityData?.name ?? "Select City"}
                            </span>
                            <span className="font-semibold text-blue-600">
                                <ChevronDown size={15} />
                            </span>
                        </button>

                        {/* Dropdown Menu */}
                        {open && (
                            <div className="absolute mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                                {Object.entries(centersData).map(([cityKey, city]) => (
                                    <button
                                        key={cityKey}
                                        onClick={() => handleSelect(cityKey)}
                                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                                    >
                                        {city.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Area filter buttons */}
                <div className="flex flex-wrap gap-3 mt-4">
                    <button
                        className={`px-4 py-2 border rounded-full text-sm ${selectedAreas.includes("all")
                            ? "text-blue-600  border-blue-600"
                            : "border-gray-300 text-gray-600 hover:border-blue-600 hover:text-blue-600"
                            }`}
                        onClick={toggleAll}
                    >
                        All Areas
                    </button>

                    {branches.map(([key, branch]) => (
                        <button
                            key={key}
                            className={`px-4 py-2 border rounded-full text-sm ${selectedAreas.includes(key)
                                ? "text-blue-600  border-blue-600"
                                : "border-gray-300 text-gray-600 hover:border-blue-600 hover:text-blue-600"
                                }`}
                            onClick={() => toggleArea(key)}
                        >
                            {branch.breadcrumb[2].label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Branch List + Map */}
            <h3 className="text-xl md:text-2xl font-semibold mb-4">
                Pick a workspace you love
            </h3>

            <div className="flex items-center justify-between mb-4">
                <p className="text-gray-600">
                    Viewing {filteredBranches.length} buildings
                </p>
                <div className="flex items-center gap-2">
                    <span className="text-sm">Map</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={showMap}
                            onChange={() => setShowMap(!showMap)}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition-colors"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                    </label>
                </div>
            </div>

            <div
                className={`grid gap-6 ${showMap ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
                    }`}
            >
                {/* Left - Branch List */}
                <div
                    className={`w-full ${showMap
                        ? "space-y-6"
                        : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        }`}
                >
                    {filteredBranches.map(([key, branch]) => (
                        <div
                            key={key}
                            className={`border rounded-lg p-4 cursor-pointer hover:shadow-lg transition ${selectedBranchKey === key ? "border-blue-500 shadow-lg" : ""
                                }`}
                            onClick={() => setSelectedBranchKey(key)}
                        >
                            <div className="flex items-start gap-4">
                                <img
                                    src={branch.images[0]}
                                    alt={branch.name}
                                    className="w-28 h-20 object-cover rounded-md"
                                />
                                <div className="flex-1">
                                    <h4 className="font-semibold text-lg">{branch.name}</h4>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {branch.details.slice(0, 80)}...
                                    </p>
                                    <div className="flex gap-4 mt-3 text-gray-500">
                                        <Monitor size={18} title="Video facilities" />
                                        <Car size={18} title="Parking" />
                                        <Heart size={18} title="Wellness room" />
                                    </div>
                                    <button 
                                    onClick={()=>{
                                        window.location.href = "#Form"
                                    }}
                                    className="mt-3 px-4 py-2 text-sm font-medium bg-orange-500 text-white rounded-md cursor-pointer">
                                        Know more
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right - Map */}
                {showMap && (
                    <div className="h-[500px] w-full border rounded-lg overflow-hidden sticky top-0">
                        {activeBranch ? (
                            <iframe
                                src={activeBranch.map}
                                width="100%"
                                height="100%"
                                allowFullScreen=""
                                loading="lazy"
                                className="rounded-lg"
                            ></iframe>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                <MapPin className="w-6 h-6 mr-2" /> No branches found
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChoosePreference;
