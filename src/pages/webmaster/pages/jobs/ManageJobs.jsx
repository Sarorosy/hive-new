import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../utils/idb";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_URL, FRONTEND_URL, formatTime } from "../../../../utils/constants";
import { AnimatePresence } from "framer-motion";
import { Eye, Star } from "lucide-react";
import AddJob from "./AddJob";
import EditJob from "./EditJob";

const ManageJobs = () => {
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

    const [addJobOpen, setAddJobOpen] = useState(false);
    const [editJobOpen, setEditJobOpen] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState(null);

    const PER_PAGE = 10;

    useEffect(() => {
        if (!admin || (admin.role !== "HR" && admin.role !== "admin")) {
            navigate("/webmaster/login");
        } else {
            fetchJobs();
            fetchLocations();
            fetchcategories();
        }
    }, [page]);
    

    const fetchJobs = async (searchKeyword = keyword) => {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/api/admin/jobs`, {
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

    const fetchLocations = async () => {
        try {
            const res = await fetch(`${API_URL}/api/admin/locations`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${admin.token}`,
                    "Content-Type": "application/json",
                }
            });

            const data = await res.json();

            if (data.status) {
                setLocations(data.locations || []);
            } else {
                if (["Token expired", "Invalid token"].includes(data.message)) {
                    toast.error("Session expired. Please login again.");
                    adminlogout();
                    navigate("/webmaster/login");
                } else {
                    toast.error(data.message || "Failed to fetch locations");
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    const fetchcategories = async () => {
        try {
            const res = await fetch(`${API_URL}/api/admin/jobcategories`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${admin.token}`,
                    "Content-Type": "application/json",
                }
            });

            const data = await res.json();

            if (data.status) {
                setCategories(data.categories || []);
            } else {
                if (["Token expired", "Invalid token"].includes(data.message)) {
                    toast.error("Session expired. Please login again.");
                    adminlogout();
                    navigate("/webmaster/login");
                } else {
                    toast.error(data.message || "Failed to fetch categories");
                }
            }
        } catch (err) {
            console.error(err);
        }
    };


    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        fetchJobs(keyword);
    };

    const totalPages = Math.ceil(total / PER_PAGE);

    // Handle status toggle
    const handleStatusToggle = async (jobId, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
        const confirmMessage = `Are you sure you want to ${newStatus === 'active' ? 'activate' : 'deactivate'} this job?`;

        if (window.confirm(confirmMessage)) {
            try {
                setActionLoading(jobId);
                const res = await fetch(`${API_URL}/api/admin/jobs/status`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${admin.token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        jobId,
                        status: newStatus,
                    }),
                });

                const data = await res.json();

                if (data.status) {
                    toast.success(`Job ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
                    fetchJobs(); // Refresh the jobs list
                } else {
                    if (["Token expired", "Invalid token"].includes(data.message)) {
                        toast.error("Session expired. Please login again.");

                        adminlogout();
                        navigate("/webmaster/login");
                    } else {
                        toast.error(data.message || "Failed to update job status");
                    }
                }
            } catch (err) {
                console.error(err);
                toast.error("Error updating job status");
            } finally {
                setActionLoading(null);
            }
        }
    };

    // Handle delete user
    const handleDeleteJob = async (jobId, jobTitle) => {
        if (window.confirm(`Are you sure you want to delete job "${jobTitle}"? This action cannot be undone.`)) {
            try {
                setActionLoading(jobId);
                const res = await fetch(`${API_URL}/api/admin/jobs/${jobId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${admin.token}`,
                    },
                });

                const data = await res.json();

                if (data.status) {
                    toast.success("Job deleted successfully");
                    fetchJobs(); // Refresh the jobs list
                } else {
                    if (["Token expired", "Invalid token"].includes(data.message)) {
                        toast.error("Session expired. Please login again.");
                        adminlogout();
                        navigate("/webmaster/login");
                    } else {
                        toast.error(data.message || "Failed to delete job");
                    }
                }
            } catch (err) {
                console.error(err);
                toast.error("Error deleting job");
            } finally {
                setActionLoading(null);
            }
        }
    };

    // Handle edit job
    const handleEditJob = (job) => {
        setSelectedJobId(job.id);
        setEditJobOpen(true);
    };



    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Manage Jobs</h2>
                <button
                    onClick={() => { setAddJobOpen(true); }}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
                >
                    <span>+</span>
                    Add Job
                </button>
            </div>




            {/* Filter Search */}
            <form onSubmit={handleSearch} className="flex gap-3 mb-4">
                <input
                    type="text"
                    placeholder="Search by title"
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
                                <th className="border px-4 py-2 text-left">Title</th>
                                <th className="border px-4 py-2 text-left">status</th>
                                <th className="border px-4 py-2 text-left">Created</th>
                                <th className="border px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((j) => (
                                <tr key={j.id} className="hover:bg-gray-50">

                                    <td className="border px-4 py-2">{j.title}</td>
                                    <td className="border px-4 py-2">
                                        <button
                                            onClick={() => handleStatusToggle(j.id, j.status || 'active')}
                                            disabled={actionLoading === j.id}
                                            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${(j.status || 'active') === 'active'
                                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                                                } disabled:opacity-50`}
                                        >
                                            {actionLoading === j.id ? (
                                                <div className="h-3 w-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
                                            ) : (
                                                (j.status || 'active').charAt(0).toUpperCase() + (j.status || 'active').slice(1)
                                            )}
                                        </button>
                                    </td>

                                    <td className="border px-4 py-2">
                                        {j.created_at ? formatTime(j.created_at) : "-"}
                                    </td>
                                    <td className="border px-4 py-2">
                                        <div className="flex gap-2">
                                            <a href={`${FRONTEND_URL}/jobs/${j.slug}`} target="blank"
                                                data-tooltip-id="my-tooltip"
                                                data-tooltip-content="View Job"
                                                className="f-11 flex items-center rounded border px-2 py-1"
                                            >
                                                View <Eye size={15} className="ml-1" />
                                            </a>
                                            <button
                                                onClick={() => handleEditJob(j)}
                                                className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition-colors"
                                                title="Edit Job"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteJob(j.id, j.title)}
                                                disabled={actionLoading === j.id}
                                                className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition-colors disabled:opacity-50"
                                                title="Delete Job"
                                            >
                                                {actionLoading === j.id ? (
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

                    <p className="text-gray-500">No Jobs found.</p>
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
                {addJobOpen && (
                    <AddJob
                        onClose={() => { setAddJobOpen(false); }}
                        onSuccess={fetchJobs}
                        locations={locations}
                        categories={categories}
                    />
                )}
                {editJobOpen && (
                    <EditJob
                        onClose={() => {
                            setEditJobOpen(false);
                            setSelectedJobId(null);
                        }}
                        onSuccess={fetchJobs}
                        jobId={selectedJobId}
                        locations={locations}
                        categories={categories}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageJobs;
