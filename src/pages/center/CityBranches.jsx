import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { centersData } from "../../data/centersData";
import Breadcrumb from "../../components/BreadCrumb";

// Address data mapping
const branchAddresses = {
  "chennai-anna-nagar": {
    address: "Level 3, VR Chennai, Jawaharlal Nehru Road, Anna Nagar, Chennai, Tamil Nadu, India",
    email: "chennai@thehive.com",
    phone: "+91 44 6633 7777",
  },
  "chennai-omr": {
    address: "SRP Stratford, Old Mahabalipuram Road (OMR), Perungudi, Chennai, Tamil Nadu, India",
    email: "omr@thehive.com",
    phone: "+91 44 6633 7778",
  },
  "chennai-skcl-guindy": {
    address: "SKCL Guindy, Chennai, Tamil Nadu, India",
    email: "guindy@thehive.com",
    phone: "+91 44 6633 7779",
  },
  "chennai-porur": {
    address: "Level 3, Keppel One Paramount, Mount Poonamallee Road, Porur, Chennai, Tamil Nadu 600116, India",
    email: "porur@thehive.com",
    phone: "+91 44 6633 7780",
  },
  "bangalore-whitefield": {
    address: "ITPL Main Road, Whitefield, Bangalore, Karnataka, India",
    email: "whitefield@thehive.com",
    phone: "+91 80 6633 7777",
  },
  "bangalore-ptp": {
    address: "Prestige Tech Platina, Bangalore, Karnataka, India",
    email: "ptp@thehive.com",
    phone: "+91 80 6633 7778",
  },
  "hyderabad-gachibowli": {
    address: "Corporate Capital, Financial District, next to Sheraton Hyderabad Hotel, Gachibowli, Hyderabad, Telangana, India",
    email: "gachibowli@thehive.com",
    phone: "+91 40 6633 7777",
  },
  "pune-mills": {
    address: "The Mills at RBCC, Raja Bahadur Mill Road, behind Sheraton Grand Hotel, Sangamwadi, Pune, Maharashtra, India",
    email: "mills@thehive.com",
    phone: "+91 20 6633 7777",
  },
};

function CityBranches() {
  const { city } = useParams();
  const navigate = useNavigate();
  const [selectedBranchKey, setSelectedBranchKey] = useState(null);
  const { theme } = useOutletContext?.() || { theme: "light" };

  const cityData = centersData[city];

  useEffect(() => {
    if (!cityData) {
      navigate("/404", { replace: true });
      return;
    }

    // Set first branch as selected by default
    const branchKeys = Object.keys(cityData.branches || {});
    if (branchKeys.length > 0 && !selectedBranchKey) {
      setSelectedBranchKey(branchKeys[0]);
    }
  }, [city, cityData, navigate, selectedBranchKey]);

  if (!cityData) {
    return null;
  }

  const branches = Object.entries(cityData.branches || {});
  const selectedBranch = selectedBranchKey
    ? cityData.branches[selectedBranchKey]
    : null;
  const branchId = selectedBranchKey ? `${city}-${selectedBranchKey}` : null;
  const addressData = branchId ? branchAddresses[branchId] : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] md:h-[500px]">
        <img
          src={cityData.centerImages?.[0] || cityData.image}
          alt={cityData.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-white [&_a]:text-white [&_span]:text-white/80">
              <Breadcrumb items={cityData.breadcrumb} theme={theme} />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mt-4 mb-2">
              Coworking Spaces in {cityData.name}
            </h1>
            <p className="text-lg md:text-xl mt-2 text-white/90 max-w-3xl">
              {cityData.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - Flex Column with 2 columns */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Branches List */}
          <div className="lg:w-1/2 space-y-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Our Locations in {cityData.name}
              </h2>
              <p className="text-gray-600">
                Select a location to view details and map
              </p>
            </div>

            {branches.length === 0 ? (
              <div className="bg-gray-50 p-8 text-center rounded-lg">
                <p className="text-gray-500">No branches available for this city.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {branches.map(([branchKey, branchData]) => {
                  const isSelected = selectedBranchKey === branchKey;
                  const currentBranchId = `${city}-${branchKey}`;
                  const currentAddressData = branchAddresses[currentBranchId] || {};
                  const thumbnailImage = branchData.images?.[0] || cityData.centerImages?.[0] || cityData.image;

                  return (
                    <div
                      key={branchKey}
                      className={`group bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-500 ease-out ${isSelected
                          ? "ring-4 ring-black/20 shadow-2xl shadow-black/10 border-2 border-black scale-[1.02]"
                          : "border border-gray-200 hover:border-gray-300 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1"
                        }`}
                    >
                      <div className="flex flex-col">
                        {/* Thumbnail Image */}
                        <div
                          className="relative w-full h-64 overflow-hidden"
                          onClick={() => setSelectedBranchKey(branchKey)}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10" />
                          <img
                            src={thumbnailImage}
                            alt={branchData.name}
                            className={`w-full h-full object-cover transition-transform duration-500 ${isSelected ? "scale-110" : "group-hover:scale-110"
                              }`}
                          />

                        </div>

                        {/* Content */}
                        <div
                          className="flex-1 p-6 flex flex-col bg-gradient-to-br from-white to-gray-50/50"
                          onClick={() => setSelectedBranchKey(branchKey)}
                        >
                          <div className="flex-1 mb-4">
                            <h3 className={`text-2xl font-bold text-gray-900 mb-3 transition-colors ${isSelected ? "text-black" : "group-hover:text-black"
                              }`}>
                              {branchData.name}
                            </h3>
                            {branchData.details && (
                              <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                                {branchData.details}
                              </p>
                            )}
                            {currentAddressData.address && (
                              <div className="flex items-start gap-2.5 text-sm text-gray-700 bg-gray-50/80 rounded-lg p-3 border border-gray-100">
                                <MapPin className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
                                <span className="line-clamp-2 leading-relaxed">
                                  {currentAddressData.address}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Know More Button */}
                        <div className="px-6 pb-6 pt-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/${city}/${branchKey}`);
                            }}
                            className={`w-full bg-black text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:shadow-black/30 active:scale-95  ${isSelected ? "ring-2 ring-black/30" : ""
                              }`}
                          >
                            <span className="relative z-10">Know More</span>
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column - Map */}
          <div className="lg:w-1/2">
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg sticky top-24 h-[600px] md:h-[700px]">
              {selectedBranch && selectedBranch.map ? (
                <iframe
                  src={selectedBranch.map}
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: "0.5rem" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${selectedBranch.name}`}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-sm">Select a location to view map</p>
                  </div>
                </div>
              )}
            </div>

            {/* Selected Branch Details */}
            {selectedBranch && addressData && (
              <div className="mt-6 bg-gray-50 rounded-lg p-6 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedBranch.name}
                </h3>
                <div className="space-y-3">
                  {addressData.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-black mt-1 flex-shrink-0" />
                      <p className="text-gray-700 text-sm">{addressData.address}</p>
                    </div>
                  )}
                  {addressData.email && (
                    <div className="flex items-start gap-3">
                      <span className="text-black font-medium text-sm">Email:</span>
                      <a
                        href={`mailto:${addressData.email}`}
                        className="text-gray-700 hover:text-black text-sm"
                      >
                        {addressData.email}
                      </a>
                    </div>
                  )}
                  {addressData.phone && (
                    <div className="flex items-start gap-3">
                      <span className="text-black font-medium text-sm">Phone:</span>
                      <a
                        href={`tel:${addressData.phone}`}
                        className="text-gray-700 hover:text-black text-sm"
                      >
                        {addressData.phone}
                      </a>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => navigate(`/${city}/${selectedBranchKey}`)}
                  className="w-full mt-4 bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-black/90 transition-colors"
                >
                  View Full Details
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CityBranches;

