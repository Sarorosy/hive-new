import React, { useState, useRef } from "react";
import ReactQuill from "react-quill-new";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Select from "react-select";
import { API_URL } from "../../../../utils/constants";
import { useAuth } from "../../../../utils/idb";

const AddBlog = ({ onClose, tags, categories, onSuccess }) => {
    const { admin, adminlogout } = useAuth();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        thumbnail: null,
        category: null,
        tags: [],
        featured: "0", // "0" or "1"
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
        if (name === "thumbnail") {
            const file = files && files[0] ? files[0] : null;
            if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
            if (file) {
                const url = URL.createObjectURL(file);
                setThumbnailPreview(url);
            } else {
                setThumbnailPreview(null);
            }
            setFormData((prev) => ({ ...prev, thumbnail: file }));
            return;
        }
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : sanitizedValue,
        }));
    };

    const handleDescriptionChange = (value) => {
        setFormData((prev) => ({ ...prev, description: value }));
    };

    const handleCategoryChange = (option) => {
        setFormData((prev) => ({ ...prev, category: option }));
    };

    const handleTagsChange = (options) => {
        setFormData((prev) => ({ ...prev, tags: options || [] }));
    };

    const removeThumbnail = () => {
        if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
        setThumbnailPreview(null);
        setFormData((prev) => ({ ...prev, thumbnail: null }));
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const toSelectOption = (item) => {
        if (typeof item === "string") return { value: item, label: item };
        const label = item?.label || item?.name || item?.title || String(item?.value || item?.id || item?._id || "");
        const value = item?.value || item?.id || item?._id || label;
        return { value, label };
    };

    const categoryOptions = Array.isArray(categories) ? categories.map(toSelectOption) : [];
    const tagOptions = Array.isArray(tags) ? tags.map(toSelectOption) : [];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description || !formData.thumbnail) {
            toast.error("Please fill all required fields");
            return;
        }
        if (formData.tags.length == 0) {
            toast.error("Please select atleast one tag");
            return;
        }

        // validate title against allowed characters
        if (!/^[A-Za-z0-9 \-]+$/.test(formData.title)) {
            toast.error("Title can include letters, numbers, spaces and - only");
            return;
        }

        setLoading(true);

        try {
            const payload = new FormData();
            payload.append("title", formData.title);
            payload.append("description", formData.description);
            if (formData.thumbnail) payload.append("thumbnail", formData.thumbnail);
            if (formData.category) payload.append("category", formData.category.value);
            if (Array.isArray(formData.tags)) {
                formData.tags.forEach((t) => payload.append("tags[]", t.value));
            }
            payload.append("featured", formData.featured);
            payload.append("status", formData.status);

            const res = await fetch(`${API_URL}/api/admin/blogs/create`, {
                method: "POST",
                headers: {
                    // Do NOT set Content-Type; the browser will set the correct multipart boundary
                    Authorization: `Bearer ${admin.token}`,
                },
                body: payload,
            });

            const data = await res.json();

            if (data.status) {
                toast.success("Blog added successfully!");
                setFormData({
                    title: "",
                    description: "",
                    thumbnail: null,
                    category: null,
                    tags: [],
                    featured: "0",
                    status: "active",
                });
                onClose();
                onSuccess();
            } else {
                if (["Token expired", "Invalid token"].includes(data.message)) {
                    toast.error("Session expired. Please login again.");
                    adminlogout();
                    navigate("/webmaster/login");
                } else {
                    toast.error(data.message || "Failed to create blog");
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
                    Add New Blog
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
                            placeholder="Enter blog title"
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>



                    {/* Category (Single Select) */}
                    <div>
                        <label className="block font-medium mb-1">Category</label>
                        <Select
                            options={categoryOptions}
                            value={formData.category}
                            onChange={handleCategoryChange}
                            isClearable
                            placeholder="Select a category"
                            classNamePrefix="react-select"
                        />
                    </div>

                    {/* Tags (Multi Select) */}
                    <div>
                        <label className="block font-medium mb-1">Tags</label>
                        <Select
                            options={tagOptions}
                            value={formData.tags}
                            onChange={handleTagsChange}
                            isMulti
                            isClearable
                            placeholder="Select tags"
                            classNamePrefix="react-select"
                        />
                    </div>

                    {/* Thumbnail */}
                    <div>
                        <label className="block font-medium mb-1">Thumbnail</label>
                        {thumbnailPreview && (
                            <div className="relative inline-block mb-2">
                                <img
                                    src={thumbnailPreview}
                                    alt="Thumbnail preview"
                                    className="h-24 w-24 object-cover rounded border"
                                />
                                <button
                                    type="button"
                                    onClick={removeThumbnail}
                                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full h-6 w-6 flex items-center justify-center shadow"
                                    aria-label="Remove thumbnail"
                                >
                                    ×
                                </button>
                            </div>
                        )}
                        <input
                            ref={fileInputRef}
                            type="file"
                            name="thumbnail"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full border rounded-lg p-2"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block font-medium mb-1">Description *</label>
                        <ReactQuill
                            theme="snow"
                            value={formData.description}
                            onChange={handleDescriptionChange}
                            placeholder="Write your blog content here..."
                            className="bg-white rounded-lg "
                        />
                    </div>

                    <div className="flex items-center space-x-10">



                        {/* Featured Post */}
                        <div>
                            <label className="block font-medium mb-1">Featured Post ?</label>
                            <select
                                name="featured"
                                value={formData.featured}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="0">No</option>
                                <option value="1">Yes</option>
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
                        {loading ? "Submitting..." : "Add Blog"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AddBlog;
