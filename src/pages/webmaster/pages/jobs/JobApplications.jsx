import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../utils/idb";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_URL, formatTime } from "../../../../utils/constants";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, Star } from "lucide-react";

const JobApplications = () => {
    const { admin, adminlogout } = useAuth();
    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);
    const [locations, setLocations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [totalJobs, setTotalJobs] = useState(0);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(null);

    const [selectedApplication, setSelectedApplication] = useState(null);
    const [editJobOpen, setEditJobOpen] = useState(false);

    const PER_PAGE = 10;

    useEffect(() => {
        if (!admin || (admin.role !== "HR" && admin.role !== "admin")) {
            navigate("/webmaster/login");
        } else {
            fetchJobApplications();
        }
    }, [page]);


    const fetchJobApplications = async (searchKeyword = keyword) => {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/api/admin/jobapplications`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${admin.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    keyword: searchKeyword,
                    page,
                }),
            });

            const data = await res.json();

            if (data.status) {
                setJobs(data.jobs || []);
                setTotal(data.total || 0);
                setTotalJobs(data.total_jobs || 0);
            } else {
                if (["Token expired", "Invalid token"].includes(data.message)) {
                    toast.error("Session expired. Please login again.");
                    adminlogout();
                    navigate("/webmaster/login");
                } else {
                    toast.error(data.message || "Failed to fetch jobs");
                }
            }
        } catch (err) {
            console.error(err);
            toast.error("Error fetching jobs");
        }
        finally {
            setLoading(false);
        }
    };



    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        fetchJobApplications(keyword);
    };

    const totalPages = Math.ceil(total / PER_PAGE);

    // Handle delete application
    const handleDeleteJob = async (applicationId, applicationTitle) => {
        if (window.confirm(`Are you sure you want to delete application "${applicationTitle}"? This action cannot be undone.`)) {
            try {
                setActionLoading(applicationId);
                const res = await fetch(`${API_URL}/api/admin/jobapplications/${applicationId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${admin.token}`,
                    },
                });

                const data = await res.json();

                if (data.status) {
                    toast.success("Application deleted successfully");
                    fetchJobApplications(); // Refresh the applications list
                } else {
                    if (["Token expired", "Invalid token"].includes(data.message)) {
                        toast.error("Session expired. Please login again.");
                        adminlogout();
                        navigate("/webmaster/login");
                    } else {
                        toast.error(data.message || "Failed to delete application");
                    }
                }
            } catch (err) {
                console.error(err);
                toast.error("Error deleting application");
            } finally {
                setActionLoading(null);
            }
        }
    };

    // Handle edit job
    const handleViewJob = (job) => {
        setSelectedApplication(job);
        setEditJobOpen(true);
    };





    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Jobs Applications</h2>
            </div>




            {/* Filter Search */}
            <form onSubmit={handleSearch} className="flex gap-3 mb-4">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="border px-3 py-2 rounded w-1/3"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Search
                </button>
            </form>

            {/* Jobs Table */}
            {jobs.length > 0 ? (
                <div className="overflow-x-auto bg-white p-2 rounded">
                    <table className="min-w-full border border-gray-200 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-4 py-2 text-left">Applicant Name</th>
                                <th className="border px-4 py-2 text-left">Job Title</th>
                                <th className="border px-4 py-2 text-left">Email</th>
                                <th className="border px-4 py-2 text-left">Phone</th>
                                <th className="border px-4 py-2 text-left">Applied Date</th>
                                <th className="border px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((application) => (
                                <tr key={application.id} className="hover:bg-gray-50">
                                    <td className="border px-4 py-2">
                                        {application.applicant_name || application.name || 'N/A'}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {application.job_title || application.title || 'N/A'}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {application.applicant_email || application.email || 'N/A'}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {application.applicant_phone || application.phone || 'N/A'}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {application.created_at ? formatTime(application.applied_at || application.created_at) : "-"}
                                    </td>
                                    <td className="border px-4 py-2">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleViewJob(application)}
                                                className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition-colors"
                                                title="View Application"
                                            >
                                                <Eye className="h-3 w-3" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteJob(application.id, `Application for ${application.job_title || application.title}`)}
                                                disabled={actionLoading === application.id}
                                                className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition-colors disabled:opacity-50"
                                                title="Delete Application"
                                            >
                                                {actionLoading === application.id ? (
                                                    <div className="h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                                ) : (
                                                    'Delete'
                                                )}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                loading ? (
                    <div className="flex items-center justify-center ">
                        <div className="h-10 w-10 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
                    </div>
                ) :

                    <p className="text-gray-500">No applications found.</p>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span className="px-3 py-1">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}

            <AnimatePresence>
                {editJobOpen && selectedApplication && (
                    <div className="fixed inset-0 z-50">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black"
                            onClick={() => {
                                setEditJobOpen(false);
                                setSelectedApplication(null);
                            }}
                        />
                        {/* Offcanvas Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "tween", duration: 0.25 }}
                            className="absolute right-0 top-0 h-full w-full max-w-xl bg-white shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between border-b px-6 py-4">
                                <h3 className="text-lg font-semibold">Application Details</h3>
                                <button
                                    onClick={() => {
                                        setEditJobOpen(false);
                                        setSelectedApplication(null);
                                    }}
                                    className="text-gray-500 hover:text-gray-700"
                                    aria-label="Close"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="px-6 py-4 overflow-y-auto h-[calc(100%-64px)]">
                                <div className="space-y-4 text-sm">
                                    <div>
                                        <p className="text-gray-500">Job Title</p>
                                        <p className="font-medium">{selectedApplication.job_title || selectedApplication.title || "-"}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-gray-500">Applicant Name</p>
                                            <p className="font-medium">{selectedApplication.applicant_name || selectedApplication.name || "-"}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Applied On</p>
                                            <p className="font-medium">{selectedApplication.created_at ? formatTime(selectedApplication.applied_at || selectedApplication.created_at) : "-"}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Email</p>
                                            <p className="font-medium break-all">{selectedApplication.applicant_email || selectedApplication.email || "-"}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Phone</p>
                                            <p className="font-medium">{selectedApplication.applicant_phone || selectedApplication.phone || "-"}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Location</p>
                                            <p className="font-medium">{selectedApplication.location_name || selectedApplication.location || "-"}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Category</p>
                                            <p className="font-medium">{selectedApplication.category_name || selectedApplication.category || "-"}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-gray-500 mb-1">Cover Letter</p>
                                        <p className="rounded border bg-gray-50 p-3 whitespace-pre-wrap">
                                            {selectedApplication.cover_letter || "-"}
                                        </p>
                                    </div>

                                    {selectedApplication.resume && (
                                        <div>
                                            <p className="text-gray-500 mb-1">Resume</p>
                                            <a
                                                href={`${API_URL}/${selectedApplication.resume}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 bg-blue-100 rounded px-2 py-0.5  text-blue-900 hover:underline break-all"
                                            >
                                                View / Download Resume
                                            </a>
                                        </div>
                                    )}


                                    {selectedApplication.resume && (
                                        (() => {
                                            // Remove uploads/applications/ prefix
                                            const fileName = selectedApplication.resume.replace(/^uploads\/applications\//, '');

                                            return selectedApplication.resume.endsWith('.pdf') ? (
                                                <iframe
                                                    src={`${API_URL}/api/files/serve/applications/${fileName}`}
                                                    width="100%"
                                                    height="500px"
                                                    className="border rounded"
                                                />
                                            ) : null
                                        })()
                                    )}



                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default JobApplications;
