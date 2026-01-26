import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useOutletContext, useParams, useSearchParams } from "react-router-dom";
import { MapPin, ArrowUpRight, ChevronDown } from "lucide-react";
import { centersData } from "../data/centersData";
import { branchAddresses } from "../data/branchAddresses";

const AllLocations = () => {
  const navigate = useNavigate();
  const { theme } = useOutletContext();
  const [searchParams] = useSearchParams();
  const cityParam = searchParams.get("city")?.toLowerCase() || "all";



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
            address:
              addressData.address ||
              `${branchData.name}, ${cityData.name}, India`,
            netSize: addressData.netSize,
            grossSize: addressData.grossSize,
            floors: addressData.floors || 1,
          });
        }
      );
    });

    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const cityOptions = useMemo(() => {
    const cities = Object.entries(centersData).map(([key, value]) => ({
      value: key,
      label: value.name,
    }));

    cities.sort((a, b) => a.label.localeCompare(b.label));

    return [{ value: "all", label: "City" }].concat(cities);
  }, []);

  const [cityFilter, setCityFilter] = useState(cityParam);

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

  // Auto-slide images
  useEffect(() => {
    const intervals = {};

    filteredBranches.forEach((branch) => {
      if (branch.gallery && branch.gallery.length > 1) {
        intervals[branch.id] = setInterval(() => {
          setImageIndices((prev) => {
            const currIdx = prev[branch.id] || 0;
            const nextIdx = (currIdx + 1) % branch.gallery.length;
            return { ...prev, [branch.id]: nextIdx };
          });
        }, 3000);
      }
    });

    return () => {
      Object.values(intervals).forEach((intv) => clearInterval(intv));
    };
  }, [filteredBranches]);

  const selectedBranch =
    filteredBranches.find((b) => b.id === selectedBranchId) ||
    branches.find((b) => b.id === selectedBranchId) ||
    filteredBranches[0];

  return (
    <div
      className={`
        min-h-screen pt-20 pb-10
        ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-8">

        {/* LEFT SIDE */}
        <div className="lg:w-3/5 space-y-10">

          {/* HEADER */}
          <header className="space-y-6">

            <div className="flex flex-wrap gap-4">
              <div className="relative w-full sm:w-56">
                <MapPin
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
                />

                <select
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className={`
                    w-full pl-11 pr-10 py-3 text-sm appearance-none
                    border focus:outline-none focus:ring-2 transition-all
                    ${theme === "dark"
                      ? "bg-[#111] text-white border-gray-700 focus:ring-white focus:border-white"
                      : "bg-white text-black border-gray-200 focus:ring-gray-900 focus:border-gray-900"}
                  `}
                >
                  {cityOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className={theme === "dark" ? "text-white bg-black" : ""}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
                />
              </div>
            </div>

            <p
              className={`
                text-sm
                ${theme === "dark" ? "text-gray-400" : "text-gray-600"}
              `}
            >
              Choose from over {branches.length} Centres in{" "}
              {Object.keys(centersData).length} cities.
            </p>
          </header>

          {/* BRANCH LIST */}
          <section className="space-y-6">

            {filteredBranches.length === 0 && (
              <div
                className={`
                  p-10 text-center shadow-sm
                  ${theme === "dark" ? "bg-[#111] text-gray-400" : "bg-white text-gray-500"}
                `}
              >
                No centres match the filters. Try a different search.
              </div>
            )}

            {filteredBranches.map((branch) => {
              const currentIdx = imageIndices[branch.id] || 0;
              const imgs =
                branch.gallery.length > 0 ? branch.gallery : [branch.image];
              const imgSrc = imgs[currentIdx] || branch.image;

              return (
                <article
                  key={branch.id}
                  onClick={() => setSelectedBranchId(branch.id)}
                  className={`
                    shadow-sm transition-all cursor-pointer h-[280px]
                    border duration-300
                    ${theme === "dark"
                      ? branch.id === selectedBranchId
                        ? "bg-[#111] border-white"
                        : "bg-[#0d0d0d] border-gray-700"
                      : branch.id === selectedBranchId
                        ? "bg-white border-gray-900"
                        : "bg-white border-gray-200"}
                  `}
                >
                  <div className="flex flex-row h-full gap-0">
                    {/* IMAGE */}
                    <div
                      className="relative overflow-hidden w-[340px] shrink-0 h-full"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img
                        src={imgSrc}
                        alt={branch.name}
                        className="w-full h-full object-cover transition-opacity duration-500"
                        loading="lazy"
                      />

                      {imgs.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                          {imgs.map((img, i) => (
                            <button
                              key={img + i}
                              onClick={(e) => {
                                e.stopPropagation();
                                setImageIndices((prev) => ({
                                  ...prev,
                                  [branch.id]: i,
                                }));
                              }}
                              className={`
                                w-1.5 h-1.5 rounded-full
                                ${i === currentIdx ? "bg-white" : "bg-white/50"}
                              `}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* DETAILS */}
                    <div className="p-6 space-y-4 flex-1">
                      <h2
                        className={`
                          text-2xl liber
                          ${theme === "dark" ? "text-white" : "text-gray-900"}
                        `}
                      >
                        {branch.name
                          .replace("The Hive at ", "")
                          .replace(", " + branch.cityName, "")}
                      </h2>

                      <p
                        className={`
                          text-sm leading-relaxed
                          ${theme === "dark" ? "text-gray-400" : "text-gray-600"}
                        `}
                      >
                        {branch.address}
                      </p>

                      {branch.highlights && (
                        <p
                          className={`
                            text-sm
                            ${theme === "dark" ? "text-gray-300" : "text-gray-700"}
                          `}
                        >
                          {branch.highlights}
                        </p>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/${branch.cityKey}/${branch.branchKey}`);
                        }}
                        className="flex items-center gap-2 text-sm font-medium text-orange-500 mt-auto pt-2"
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

        {/* RIGHT SIDE */}
        <aside className="lg:w-2/5">
          <div
            className={`
              sticky top-20 shadow-xl flex flex-col h-[calc(100vh-5rem)]
              border
              ${theme === "dark"
                ? "bg-[#0d0d0d] border-gray-800"
                : "bg-white border-gray-100"}
            `}
          >
            <div className="p-1 flex flex-col gap-6 flex-1 min-h-0">
              {selectedBranch?.map ? (
                <iframe
                  title={`Map of ${selectedBranch.name}`}
                  src={selectedBranch.map}
                  loading="lazy"
                  className={`
                    w-full h-full border
                    ${theme === "dark"
                      ? "border-gray-700"
                      : "border-gray-100"}
                  `}
                  allowFullScreen=""
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div
                  className={`
                    w-full h-full border border-dashed flex items-center justify-center text-sm
                    ${theme === "dark"
                      ? "border-gray-700 text-gray-500"
                      : "border-gray-200 text-gray-500"}
                  `}
                >
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
