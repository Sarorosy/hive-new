import React, { useEffect, useState } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import { API_URL, formatTime } from "../../utils/constants";
import ApplyJob from "./ApplyJob";

function CareerDetails() {
  const { slug } = useParams();
  const { theme } = useOutletContext(); // 🌙 THEME ADDED

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);

  const fetchJob = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/jobs/get/${slug}`);
      const data = await res.json();
      if (data.status) setJob(data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [slug]);

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark" ? "bg-[#0e0e0e]" : "bg-white"
        }`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} mt-4`}>
            Loading job details...
          </p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark" ? "bg-[#0e0e0e]" : "bg-white"
        }`}
      >
        <div className="text-center">
          <h2 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-black"}`}>
            Job not found
          </h2>
          <Link
            to="/careers"
            className={`mt-4 inline-block rounded-full border px-4 py-2 font-semibold transition-all
              ${
                theme === "dark"
                  ? "border-white text-white hover:bg-orange-500 hover:border-orange-500"
                  : "border-black text-black hover:bg-orange-500 hover:text-white hover:border-orange-500"
              }`}
          >
            Back to Careers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`${theme === "dark" ? "bg-[#0d0d0d] text-white" : "bg-white text-black"} min-h-screen pt-14`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2">

          {/* Header */}
          <div className="mb-8">
            <div className={`flex ${job.category_name ? "justify-between" : "justify-end"}`}>
              {job.category_name && (
                <span
                  className={`
                    inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide
                    ${theme === "dark" ? "border-white text-white" : "border-black text-black"}
                  `}
                >
                  {job.category_name}
                </span>
              )}

              <Link
                to="/careers"
                className={`inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition-all
                ${
                  theme === "dark"
                    ? "border-white text-white hover:bg-orange-500 hover:border-orange-500"
                    : "border-black text-black hover:bg-orange-500 hover:text-white hover:border-orange-500"
                }`}
              >
                ← Back to Careers
              </Link>
            </div>

            <h1
              className={`mt-4 text-3xl sm:text-4xl liber tracking-tight ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              {job.title}
            </h1>

            <div
              className={`mt-3 flex items-center gap-3 text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {job.location_name && <span>{job.location_name}</span>}
              <span>•</span>
              <span>{job.job_type}</span>
              <span>•</span>
              <span>Posted {formatDate(job.created_at)}</span>
            </div>
          </div>

          {/* Job Details */}
          <div
            className={`rounded-2xl p-6 mb-8 ${
              theme === "dark" ? "bg-[#1a1a1a] border border-gray-700" : "bg-gray-50"
            }`}
          >
            <h3 className={`text-xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-black"}`}>
              Job Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Detail label="Job Type" value={job.job_type} theme={theme} />
              {job.location_name && <Detail label="Location" value={job.location_name} theme={theme} />}
              {job.category_name && <Detail label="Category" value={job.category_name} theme={theme} />}
              <Detail label="Posted" value={formatDate(job.created_at)} theme={theme} />
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-black"}`}>
              Job Description
            </h3>
            <div
              className={`prose prose-lg max-w-none ${
                theme === "dark"
                  ? "text-gray-300 prose-headings:text-white"
                  : "text-gray-800 prose-headings:text-black"
              }`}
              dangerouslySetInnerHTML={{ __html: job.description }}
            />
          </div>

          {/* Buttons */}
          <div className="mt-12 flex gap-4">
            <Link
              to="/careers"
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition-all
              ${
                theme === "dark"
                  ? "border-white text-white hover:bg-orange-500 hover:border-orange-500"
                  : "border-black text-black hover:bg-orange-500 hover:text-white hover:border-orange-500"
              }`}
            >
              ← Back to Careers
            </Link>

            <button
              onClick={() => setApplyOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-2 text-sm font-semibold text-white hover:bg-orange-600"
            >
              Apply Now
            </button>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24">

            {/* Quick Apply */}
            <div
              className={`rounded-2xl p-6 mb-6 ${
                theme === "dark" ? "bg-[#1a1300] text-white" : "bg-orange-50"
              }`}
            >
              <h3 className="text-xl font-bold mb-4">Quick Apply</h3>
              <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} mb-4`}>
                Ready to join our team? Apply for this position today!
              </p>
              <button
                onClick={() => setApplyOpen(true)}
                className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-600"
              >
                Apply Now
              </button>
            </div>

            {/* Summary */}
            <div
              className={`rounded-2xl p-6 ${
                theme === "dark" ? "bg-[#131313]" : "bg-gray-50"
              }`}
            >
              <h3 className="text-xl font-bold mb-4">Job Summary</h3>

              <Summary label="Position" value={job.title} theme={theme} />
              <Summary label="Type" value={job.job_type} theme={theme} />

              {job.location_name && (
                <Summary label="Location" value={job.location_name} theme={theme} />
              )}

              {job.category_name && (
                <Summary label="Department" value={job.category_name} theme={theme} />
              )}

              <Summary label="Posted" value={formatDate(job.created_at)} theme={theme} />
            </div>

            {/* Help */}
            <div
              className={`mt-6 rounded-2xl p-6 ${
                theme === "dark" ? "bg-[#001122]" : "bg-blue-50"
              }`}
            >
              <h3 className="text-xl font-bold mb-4">Need Help?</h3>
              <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} mb-4`}>
                Have questions about this position? Our HR team is here to help.
              </p>

              <p className="text-sm">
                <span className="font-medium">Email:</span>{" "}
                career@hive.com
              </p>
              <p className="text-sm mt-1">
                <span className="font-medium">Phone:</span> +91 12345 67890
              </p>
            </div>
          </div>
        </aside>
      </div>

      {applyOpen && <ApplyJob job={job} onClose={() => setApplyOpen(false)} />}
    </div>
  );
}

function Detail({ label, value, theme }) {
  return (
    <div>
      <span className={`text-sm font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
        {label}:
      </span>
      <p className={`font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>
        {value}
      </p>
    </div>
  );
}

function Summary({ label, value, theme }) {
  return (
    <div className="flex justify-between text-sm mb-2">
      <span className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{label}:</span>
      <span className={`font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>
        {value}
      </span>
    </div>
  );
}

export default CareerDetails;
