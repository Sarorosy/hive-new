// src/pages/CareersListPage.jsx
import React, { useState } from "react";
// import { jobs } from "../../data/careersData";
import { MapPin, Briefcase, Tag, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CareersListPage({ jobs, jobLoading }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black">
            We’re Hiring
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-gray-600">
            Join a transformative real estate platform that’s reshaping how India works.
            Discover roles that match your skills and fuel your aspirations.
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {jobs.map((job) => (
            <div
              key={job.title}
              className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:border-orange-500"
            >
              <div className="p-6 flex-1">
                {/* Job Meta */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
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
                <h2 className="text-lg sm:text-xl font-bold text-black group-hover:text-orange-500 transition-colors">
                  {job.title}
                </h2>

                {/* Description */}
                <p
                    className="mt-2 text-sm text-gray-600 line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: job.description.replace(/<img[^>]*>/gi, ""),
                    }}
                  ></p>
              </div>

              {/* Footer Button */}
              <div className="p-6 pt-0 flex items-center justify-end">
                <button
                  onClick={() => navigate(`/job/${job.slug}`)}
                  className="cursor-pointer rounded-full border border-black px-4 py-2 text-sm font-semibold text-black transition-all hover:bg-orange-500 hover:border-orange-500 hover:text-white"
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
