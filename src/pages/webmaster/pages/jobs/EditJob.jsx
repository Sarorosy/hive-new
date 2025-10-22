import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../../utils/constants";
import { useAuth } from "../../../../utils/idb";

const EditJob = ({ onClose, onSuccess, jobId, locations, categories }) => {
    const { admin, adminlogout } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        type: "Full time",
        location: "",
        category: "",
        status: "active",
    });
    const [loading, setLoading] = useState(false);

    const toSelectOption = (item) => {
        if (typeof item === "string") return { value: item, label: item };
        const label = item?.label || item?.name || item?.title || String(item?.value || item?.id || item?._id || "");
        const value = item?.id || item?._id || label;
        return { value, label };
    };

    const locationOptions = Array.isArray(locations) ? locations.map(toSelectOption) : [];
    const categoryOptions = Array.isArray(categories) ? categories.map(toSelectOption) : [];

    useEffect(() => {
        if (!admin?.token) {
            navigate("/webmaster/login");
            return;
        }
        if (!jobId) return;
        (async () => {
            try {
                const res = await fetch(`${API_URL}/api/admin/jobs/get/${jobId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${admin.token}`,
                        "Content-Type": "application/json",
                    },
                });
                const data = await res.json();
                if (!data?.status) {
                    if (["Token expired", "Invalid token"].includes(data?.message)) {
                        toast.error("Session expired. Please login again.");
                        adminlogout();
                        navigate("/webmaster/login");
                    } else {
                        if(data?.message == "Job not found"){
                            toast.error(data?.message || "Failed to load job");
                            onClose();
                        }
                        toast.error(data?.message || "Failed to load job");
                    }
                    return;
                }

                const job = data.data || {};

                // Resolve location: API may return an id string (e.g., "4") or null
                let resolvedLocation = "";
                if (job.location) {
                    const jobLocationId = String(job.location);
                    const matchedLocation = Array.isArray(locations)
                        ? locations.find((loc) => String(loc?.id ?? loc?.value) === jobLocationId)
                        : null;
                    resolvedLocation = matchedLocation
                        ? toSelectOption(matchedLocation)
                        : toSelectOption(jobLocationId);
                }

                // Resolve category: API may return an id string (e.g., "4") or null
                let resolvedCategory = "";
                if (job.category) {
                    const jobCategoryId = String(job.category);
                    const matchedCategory = Array.isArray(categories)
                        ? categories.find((cat) => String(cat?.id ?? cat?.value) === jobCategoryId)
                        : null;
                    resolvedCategory = matchedCategory
                        ? toSelectOption(matchedCategory)
                        : toSelectOption(jobCategoryId);
                }

                setFormData({
                    title: job.title || "",
                    description: job.description || "",
                    type: job.type || "Full time",
                    location: resolvedLocation,
                    category: resolvedCategory,
                    status: job.status || "active",
                });
            } catch (err) {
                console.error(err);
                toast.error("Error loading job");
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jobId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const sanitizedValue = name === "title" ? (value || "").replace(/[^A-Za-z0-9 \-]/g, "") : value;
        setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
    };

    const handleDescriptionChange = (value) => {
        setFormData((prev) => ({ ...prev, description: value }));
    };

    const handleLocationChange = (option) => {
        setFormData((prev) => ({ ...prev, location: option }));
    };

    const handleCategoryChange = (option) => {
        setFormData((prev) => ({ ...prev, category: option }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description) {
            toast.error("Please fill all required fields");
            return;
        }
        if (!/^[A-Za-z0-9 \-]+$/.test(formData.title)) {
            toast.error("Title can include letters, numbers, spaces and - only");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                title: formData.title,
                description: formData.description,
                type: formData.type,
                location: formData.location ? formData.location.value : null,
                category: formData.category ? formData.category.value : null,
                status: formData.status,
            };

            const res = await fetch(`${API_URL}/api/admin/jobs/update/${jobId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${admin.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (data.status) {
                toast.success("Job updated successfully!");
                onClose();
                onSuccess && onSuccess();
            } else {
                if (["Token expired", "Invalid token"].includes(data.message)) {
                    toast.error("Session expired. Please login again.");
                    adminlogout();
                    navigate("/webmaster/login");
                } else {
                    toast.error(data.message || "Failed to update job");
                }
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="bg-white w-full max-w-5xl h-full shadow-xl p-6 overflow-y-auto"
            >
                <h2 className="text-xl font-semibold mb-4 border-b pb-2 flex justify-between items-center">
                    Edit Job
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-red-500 text-lg font-bold"
                    >
                        ✕
                    </button>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block font-medium mb-1">Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter job title"
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Description *</label>
                        <ReactQuill
                            theme="snow"
                            value={formData.description}
                            onChange={handleDescriptionChange}
                            placeholder="Write your job description here..."
                            className="bg-white rounded-lg "
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Location (Optional)</label>
                        <Select
                            options={locationOptions}
                            value={formData.location}
                            onChange={handleLocationChange}
                            isClearable
                            placeholder="Select a location"
                            classNamePrefix="react-select"
                        />
                    </div>

                    {/* Category (Single Select) */}
                    <div>
                        <label className="block font-medium mb-1">Category (Optional)</label>
                        <Select
                            options={categoryOptions}
                            value={formData.category}
                            onChange={handleCategoryChange}
                            isClearable
                            placeholder="Select a category"
                            classNamePrefix="react-select"
                        />
                    </div>

                    <div className="flex items-center space-x-10">
                        <div>
                            <label className="block font-medium mb-1">Job type</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Full time">Full time</option>
                                <option value="Part time">Part time</option>
                                <option value="Freelance">Freelance</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Saving..." : "Update Job"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default EditJob;


