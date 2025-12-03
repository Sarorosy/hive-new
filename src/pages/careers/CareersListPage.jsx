// src/pages/CareersListPage.jsx
import React from "react";
import { MapPin, Briefcase, Tag } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";

function CareersListPage({ jobs, jobLoading }) {
  const navigate = useNavigate();
  const { theme } = useOutletContext(); // ✅ THEME ADDED

  return (
    <div
      className={`min-h-screen pt-14 ${
        theme === "dark" ? "bg-[#0e0e0e] text-white" : "bg-white text-black"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="mb-12 text-center">
          <h1
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            We’re Hiring
          </h1>
          <p
            className={`mt-3 max-w-2xl mx-auto ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Join a transformative real estate platform that’s reshaping how India works.
            Discover roles that match your skills and fuel your aspirations.
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {jobs.map((job) => (
            <div
              key={job.title}
              className={`group flex flex-col justify-between rounded-2xl border shadow-sm transition-all duration-300
              ${
                theme === "dark"
                  ? "bg-[#111] border-gray-700 hover:border-orange-500 hover:shadow-orange-500/10"
                  : "bg-white border-gray-200 hover:border-orange-500 hover:shadow-xl"
              }`}
            >
              {/* Card Body */}
              <div className="p-6 flex-1">

                {/* Job Meta */}
                <div
                  className={`flex flex-wrap items-center gap-3 text-xs mb-3
                  ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                >
                  <span className="inline-flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5" />
                    {job.job_type}
                  </span>

                  {job.category_name && (
                    <span className="inline-flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" />
                      {job.category_name}
                    </span>
                  )}

                  {job.location_name && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {job.location_name}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2
                  className={`text-lg sm:text-xl font-bold transition-colors ${
                    theme === "dark"
                      ? "text-white group-hover:text-orange-500"
                      : "text-black group-hover:text-orange-500"
                  }`}
                >
                  {job.title}
                </h2>

                {/* Description */}
                <p
                  className={`mt-2 text-sm line-clamp-3 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: job.description.replace(/<img[^>]*>/gi, ""),
                  }}
                ></p>
              </div>

              {/* Footer Button */}
              <div className="p-6 pt-0 flex items-center justify-end">
                <button
                  onClick={() => navigate(`/job/${job.slug}`)}
                  className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-all
                  ${
                    theme === "dark"
                      ? "border-white text-white hover:bg-orange-500 hover:border-orange-500"
                      : "border-black text-black hover:bg-orange-500 hover:text-white hover:border-orange-500"
                  }`}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CareersListPage;
