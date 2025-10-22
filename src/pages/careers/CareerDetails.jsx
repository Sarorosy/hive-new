import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL, formatTime } from "../../utils/constants";
import ApplyJob from "./ApplyJob";

function CareerDetails() {
    const { slug } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(false);
    const [applyOpen, setApplyOpen] = useState(false);

    const fetchJob = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/api/jobs/get/${slug}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (data.status) {
                setJob(data.data || null);
            } else {
                console.error(data.message || "Failed to fetch job");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJob();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading job details...</p>
                </div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-black">Job not found</h2>
                    <Link
                        to="/careers"
                        className="mt-4 inline-block rounded-full border border-black px-4 py-2 font-semibold text-black transition-all hover:bg-orange-500 hover:border-orange-500 hover:text-white"
                    >
                        Back to Careers
                    </Link>
                </div>
            </div>
        );
    }

    const formatDate = (iso) =>
        new Date(iso).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* LEFT - Main Content */}
                <div className="lg:col-span-2">

                    {/* Header */}
                    <div className="mb-8">
                        <div className={`flex ${job.category_name ? "justify-between" : "justify-end"}`}>
                            {job.category_name && (
                                <span className="inline-flex items-center rounded-full border border-black px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black">
                                    {job.category_name}
                                </span>
                            )}
                            <Link
                                to="/careers"
                                className="inline-flex items-center gap-2 rounded-full border border-black px-5 py-2 text-sm font-semibold text-black transition-all hover:bg-orange-500 hover:border-orange-500 hover:text-white"
                            >
                                ← Back to Careers
                            </Link>
                        </div>

                        <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-black">
                            {job.title}
                        </h1>
                        <div className="mt-3 flex items-center gap-3 text-sm text-gray-600">
                            {job.location_name && (
                                <>
                                    <span>{job.location_name}</span>
                                    <span>•</span>
                                </>
                            )}
                            <span>{job.job_type}</span>
                            <span>•</span>
                            <span>Posted {formatDate(job.created_at)}</span>
                        </div>
                    </div>

                    {/* Job Details */}
                    <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                        <h3 className="text-xl font-bold text-black mb-4">Job Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <span className="text-sm font-medium text-gray-600">Job Type:</span>
                                <p className="text-black font-semibold">{job.job_type}</p>
                            </div>
                            {job.location_name && (
                                <div>
                                    <span className="text-sm font-medium text-gray-600">Location:</span>
                                    <p className="text-black font-semibold">{job.location_name}</p>
                                </div>
                            )}
                            {job.category_name && (
                                <div>
                                    <span className="text-sm font-medium text-gray-600">Category:</span>
                                    <p className="text-black font-semibold">{job.category_name}</p>
                                </div>
                            )}
                            <div>
                                <span className="text-sm font-medium text-gray-600">Posted:</span>
                                <p className="text-black font-semibold">{formatDate(job.created_at)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Job Description */}
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-black mb-4">Job Description</h3>
                        <div
                            className="prose prose-lg max-w-none text-gray-800 prose-headings:text-black prose-a:text-orange-600"
                            dangerouslySetInnerHTML={{
                                __html: job.description,
                            }}
                        />
                    </div>

                    {/* Apply Button */}
                    <div className="mt-12 flex gap-4">
                        <Link
                            to="/careers"
                            className="inline-flex items-center gap-2 rounded-full border border-black px-5 py-2 text-sm font-semibold text-black transition-all hover:bg-orange-500 hover:border-orange-500 hover:text-white"
                        >
                            ← Back to Careers
                        </Link>
                        <button 
                        onClick={()=>{setApplyOpen(true)}}
                        className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-orange-600">
                            Apply Now
                        </button>
                    </div>
                </div>

                {/* RIGHT - Job Info Sidebar */}
                <aside className="lg:col-span-1">
                    <div className="sticky top-24">
                        <div className="bg-orange-50 rounded-2xl p-6 mb-6">
                            <h3 className="text-xl font-bold text-black mb-4">Quick Apply</h3>
                            <p className="text-gray-600 mb-4">
                                Ready to join our team? Apply for this position today!
                            </p>
                            <button 
                            onClick={()=>{setApplyOpen(true)}}
                            className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                                Apply Now
                            </button>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-black mb-4">Job Summary</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Position:</span>
                                    <span className="font-semibold text-black">{job.title}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Type:</span>
                                    <span className="font-semibold text-black">{job.job_type}</span>
                                </div>
                                {job.location_name && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Location:</span>
                                        <span className="font-semibold text-black">{job.location_name}</span>
                                    </div>
                                )}
                                {job.category_name && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Department:</span>
                                        <span className="font-semibold text-black">{job.category_name}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Posted:</span>
                                    <span className="font-semibold text-black">{formatDate(job.created_at)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 bg-blue-50 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-black mb-4">Need Help?</h3>
                            <p className="text-gray-600 mb-4">
                                Have questions about this position? Our HR team is here to help.
                            </p>
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Email:</span> careers@hive.com
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Phone:</span> +91 12345 67890
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
            {applyOpen && (
                <ApplyJob job={job} onClose={()=>{setApplyOpen(false)}} />
            )}
        </div>
    );
}

export default CareerDetails;
