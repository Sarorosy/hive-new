import React, { useState, useRef } from "react";
import ReactQuill from "react-quill-new";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Select from "react-select";
import { API_URL } from "../../../../utils/constants";
import { useAuth } from "../../../../utils/idb";

const AddJob = ({ onClose, onSuccess , locations, categories}) => {
    const { admin, adminlogout } = useAuth();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        type: "Full time",
        location:"",
        category:"",
        status: "active", // "active" or "inactive"
    });
    const [loading, setLoading] = useState(false);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        // sanitize title to allow only letters, numbers, spaces and hyphen
        const sanitizedValue =
            name === "title" ? (files ? value : (value || "").replace(/[^A-Za-z0-9 \-]/g, "")) : value;
        
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : sanitizedValue,
        }));
    };

    const handleDescriptionChange = (value) => {
        setFormData((prev) => ({ ...prev, description: value }));
    };




    const toSelectOption = (item) => {
        if (typeof item === "string") return { value: item, label: item };
        const label = item?.label || item?.name || item?.title || String(item?.value || item?.id || item?._id || "");
        const value = item?.value || item?.id || item?._id || label;
        return { value, label };
    };

    const locationOptions = Array.isArray(locations) ? locations.map(toSelectOption) : [];
    const categoryOptions = Array.isArray(categories) ? categories.map(toSelectOption) : [];

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

        // validate title against allowed characters
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

            const res = await fetch(`${API_URL}/api/admin/jobs/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${admin.token}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (data.status) {
                toast.success("Job added successfully!");
                setFormData({
                    title: "",
                    description: "",
                    type: "Full time",
                    location: "",
                    category: "",
                    status: "active",
                });
                onClose();
                onSuccess();
            } else {
                if (["Token expired", "Invalid token"].includes(data.message)) {
                    toast.error("Session expired. Please login again.");
                    adminlogout();
                } else {
                    toast.error(data.message || "Failed to create job");
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
            {/* Modal content sliding in */}
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="bg-white w-full max-w-5xl h-full shadow-xl p-6 overflow-y-auto"
            >
                <h2 className="text-xl font-semibold mb-4 border-b pb-2 flex justify-between items-center">
                    Add New Job
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-red-500 text-lg font-bold"
                    >
                        ✕
                    </button>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Blog Title */}
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


                    {/* Description */}
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

                    {/* Location (Single Select) */}
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
                        {/* Type */}
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


                        {/* Status */}
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
                        {loading ? "Submitting..." : "Add Job"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AddJob;
