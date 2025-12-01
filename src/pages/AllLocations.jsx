import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, ArrowUpRight, ChevronDown } from "lucide-react";
import { centersData } from "../data/centersData";
import { branchAddresses } from "../data/branchAddresses";

const AllLocations = () => {
  const navigate = useNavigate();
  const branches = useMemo(() => {
    const list = [];

    Object.entries(centersData).forEach(([cityKey, cityData]) => {
      Object.entries(cityData.branches || {}).forEach(
        ([branchKey, branchData]) => {
          const branchId = `${cityKey}-${branchKey}`;
          const addressData = branchAddresses[branchId] || {};

          const highlights = branchData.details || "";

          list.push({
            id: branchId,
            cityKey,
            cityName: cityData.name,
            branchKey,
            image:
              branchData.images?.[0] ||
              cityData.centerImages?.[0] ||
              cityData.image,
            gallery:
              branchData.images?.slice(0, 5) ||
              cityData.centerImages?.slice(0, 5) ||
              [],
            description: cityData.description,
            ...branchData,
            highlights,
            address: addressData.address || `${branchData.name}, ${cityData.name}, India`,
            netSize: addressData.netSize,
            grossSize: addressData.grossSize,
            floors: addressData.floors || 1,
          });
        }
      );
    });

    return list;
  }, []);

  const cityOptions = useMemo(() => {
    return [{ value: "all", label: "City" }].concat(
      Object.entries(centersData).map(([key, value]) => ({
        value: key,
        label: value.name,
      }))
    );
  }, []);

  const [cityFilter, setCityFilter] = useState("all");
  const [selectedBranchId, setSelectedBranchId] = useState(
    branches[0]?.id || null
  );
  const [imageIndices, setImageIndices] = useState({});

  const filteredBranches = useMemo(() => {
    return branches.filter((branch) => {
      const matchCity =
        cityFilter === "all" ? true : branch.cityKey === cityFilter;

      return matchCity;
    });
  }, [branches, cityFilter]);

  useEffect(() => {
    if (
      filteredBranches.length &&
      !filteredBranches.some((branch) => branch.id === selectedBranchId)
    ) {
      setSelectedBranchId(filteredBranches[0].id);
    }
  }, [filteredBranches, selectedBranchId]);

  // Auto-slide functionality for image galleries
  useEffect(() => {
    const intervals = {};

    filteredBranches.forEach((branch) => {
      if (branch.gallery && branch.gallery.length > 1) {
        intervals[branch.id] = setInterval(() => {
          setImageIndices((prev) => {
            const currentIndex = prev[branch.id] || 0;
            const nextIndex = (currentIndex + 1) % branch.gallery.length;
            return { ...prev, [branch.id]: nextIndex };
          });
        }, 3000); // Change image every 3 seconds
      }
    });

    return () => {
      Object.values(intervals).forEach((interval) => clearInterval(interval));
    };
  }, [filteredBranches]);

  const selectedBranch =
    filteredBranches.find((branch) => branch.id === selectedBranchId) ||
    branches.find((branch) => branch.id === selectedBranchId) ||
    filteredBranches[0];

  return (
    <div className="bg-white min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-3/5 space-y-10">
          <header className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <div className="relative w-full sm:w-56">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                <select
                  value={cityFilter}
                  onChange={(event) => setCityFilter(event.target.value)}
                  className="w-full bg-white border border-gray-200  pl-11 pr-10 py-3 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all"
                >
                  {cityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                Choose from over {branches.length} Centres in{" "}
                {Object.keys(centersData).length} cities.
              </p>
            </div>
          </header>

          <section className="space-y-6">
            {filteredBranches.length === 0 && (
              <div className="bg-white  p-10 text-center shadow-sm">
                <p className="text-gray-500">
                  No centres match the filters. Try a different search.
                </p>
              </div>
            )}

            {filteredBranches.map((branch) => {
              const currentImageIndex = imageIndices[branch.id] || 0;
              const displayImages = branch.gallery.length > 0 ? branch.gallery : [branch.image];
              const currentImage = displayImages[currentImageIndex] || branch.image;

              return (
                <article
                  key={branch.id}
                  onClick={() => setSelectedBranchId(branch.id)}
                  className={`bg-white shadow-sm border transition-all duration-300 hover:-translate-y-1 cursor-pointer h-[280px] ${branch.id === selectedBranchId
                    ? "border-gray-900"
                    : "border-gray-200"
                    }`}
                >
                  <div className="flex flex-row h-full gap-0">
                    <div
                      className="relative overflow-hidden w-[340px] shrink-0 h-full"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img
                        src={currentImage}
                        alt={branch.name}
                        className="w-full h-full object-cover transition-opacity duration-500"
                        loading="lazy"
                      />
                      {displayImages.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                          {displayImages.map((img, index) => (
                            <button
                              key={img + index}
                              onClick={(e) => {
                                e.stopPropagation();
                                setImageIndices((prev) => ({
                                  ...prev,
                                  [branch.id]: index,
                                }));
                              }}
                              className={`transition-all duration-200 ${index === currentImageIndex
                                ? "w-1.5 h-1.5 bg-white"
                                : "w-1.5 h-1.5 bg-white/50 hover:bg-white/75"
                                } rounded-full cursor-pointer`}
                              aria-label={`Go to image ${index + 1}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="p-6 space-y-4  flex-1 ">
                      <div className="flex flex-col gap-2">
                        <h2 className="text-2xl  text-gray-900 liber">
                          {branch.name.replace("The Hive at ", "").replace(", " + branch.cityName, "")}
                        </h2>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {branch.address}
                        </p>

                      </div>

                      {branch.highlights && (
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {branch.highlights}
                        </p>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/${branch.cityKey}/${branch.branchKey}`);
                        }}
                        className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors mt-auto pt-2"
                      >
                        Know More <ArrowUpRight className="w-4 h-4" />
                      </button>

                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        </div>

        <aside className="lg:w-2/5">
          <div className="bg-white shadow-xl border border-gray-100 sticky top-20 flex flex-col h-[calc(100vh-5rem)]">

            <div className="p-1 flex flex-col gap-6 flex-1 min-h-0">
              {selectedBranch?.map ? (
                <iframe
                  title={`Map of ${selectedBranch.name}`}
                  src={selectedBranch.map}
                  loading="lazy"
                  className="w-full h-full  border border-gray-100"
                  allowFullScreen=""
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="w-full h-full  border border-dashed border-gray-200 flex items-center justify-center text-gray-500 text-sm">
                  Map embed unavailable for this centre.
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AllLocations;


