// src/pages/CareersListPage.jsx
import React, { useState } from "react";
import { jobs } from "../../data/careersData";
import { MapPin, Briefcase, Tag, X } from "lucide-react";

function CareersListPage() {
  const [selectedJob, setSelectedJob] = useState(null);

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
                    {job.type}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    {job.department}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {job.location}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-lg sm:text-xl font-bold text-black group-hover:text-orange-500 transition-colors">
                  {job.title}
                </h2>

                {/* Excerpt */}
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">{job.excerpt}</p>
              </div>

              {/* Footer Button */}
              <div className="p-6 pt-0 flex items-center justify-end">
                <button
                  onClick={() => setSelectedJob(job)}
                  className="cursor-pointer rounded-full border border-black px-4 py-2 text-sm font-semibold text-black transition-all hover:bg-orange-500 hover:border-orange-500 hover:text-white"
                >
                  {job.applyText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-700 font-medium">
            Don’t see the perfect role? We’re always looking for exceptional talent.
          </p>
          <button className="mt-4 inline-flex items-center rounded-full border border-black px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-orange-500 hover:border-orange-500 hover:text-white">
            Send Your Resume
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-2xl shadow-lg max-w-lg w-full p-6">
            {/* Close button */}
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-black"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Job Details */}
            <h2 className="text-2xl font-bold text-black mb-4">{selectedJob.title}</h2>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="inline-flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                {selectedJob.type}
              </span>
              <span className="inline-flex items-center gap-1">
                <Tag className="w-4 h-4" />
                {selectedJob.department}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {selectedJob.location}
              </span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{selectedJob.excerpt}</p>

            <div className="mt-6">
              <button className="w-full rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CareersListPage;
