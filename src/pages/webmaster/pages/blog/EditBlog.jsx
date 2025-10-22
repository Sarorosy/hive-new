import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../../utils/constants";
import { useAuth } from "../../../../utils/idb";

const EditBlog = ({ onClose, onSuccess, tags, categories, blogId }) => {
    const { admin, adminlogout } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        thumbnail: null, // File if changed
        category: null, // { value, label }
        tags: [], // array of { value, label }
        featured: "0",
        status: "active",
    });
    const [loading, setLoading] = useState(false);
    const [initialThumbUrl, setInitialThumbUrl] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [removeThumb, setRemoveThumb] = useState(false);
    const fileInputRef = useRef(null);

    const toSelectOption = (item) => {
        if (!item) return null;
        if (typeof item === "string") return { value: item, label: item };
        const label = item?.label || item?.name || item?.title || String(item?.value || item?.id || item?._id || "");
        const value = item?.value || item?.id || item?._id || label;
        return { value, label };
    };

    const categoryOptions = Array.isArray(categories) ? categories.map(toSelectOption) : [];
    const tagOptions = Array.isArray(tags) ? tags.map(toSelectOption) : [];

    useEffect(() => {
        if (!admin?.token) {
            navigate("/webmaster/login");
            return;
        }
        if (!blogId) return;
        // Load blog details
        (async () => {
            try {
                const res = await fetch(`${API_URL}/api/admin/blogs/get/${blogId}`, {
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
                        toast.error(data?.message || "Failed to load blog");
                    }
                    return;
                }

                const blog = data.data || {};
                // Convert category string to single object
                const selectedCategory = categoryOptions.find(
                    (c) => String(c.value) === String(blog.category) // blog.category is "1" string
                ) || null;

                // Convert tags string "1,2" to array of objects
                let selectedTags = [];
                if (blog.tags) {
                    const tagIds = blog.tags.split(','); // ["1", "2"]
                    selectedTags = tagIds
                        .map((id) => tagOptions.find((opt) => String(opt.value) === String(id)) || { value: id, label: `Tag ${id}` })
                        .filter(Boolean);
                }


                setFormData({
                    title: blog.title || "",
                    description: blog.description || "",
                    thumbnail: null, // not changed yet
                    category: selectedCategory,
                    tags: selectedTags,
                    featured: String(blog.is_featured ?? "0"),
                    status: blog.status || "active",
                });
                setInitialThumbUrl(blog.thumbnail ? `${API_URL}/${blog.thumbnail}` : null);
                setThumbnailPreview(null);
                setRemoveThumb(false);
                if (fileInputRef.current) fileInputRef.current.value = "";
            } catch (err) {
                console.error(err);
                toast.error("Error loading blog");
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blogId]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
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
            // If a new thumbnail is picked, we won't remove the old one explicitly
            setRemoveThumb(false);
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
        setRemoveThumb(true);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description) {
            toast.error("Please fill all required fields");
            return;
        }
        if (formData.tags.length === 0) {
            toast.error("Please select atleast one tag");
            return;
        }
        if (!/^[A-Za-z0-9 \-]+$/.test(formData.title)) {
            toast.error("Title can include letters, numbers, spaces and - only");
            return;
        }

        setLoading(true);
        try {
            const payload = new FormData();
            payload.append("title", formData.title);
            payload.append("description", formData.description);
            if (formData.category) payload.append("category", formData.category.value);
            if (Array.isArray(formData.tags)) {
                formData.tags.forEach((t) => payload.append("tags[]", t.value));
            }
            payload.append("featured", formData.featured);
            payload.append("status", formData.status);

            if (formData.thumbnail) {
                payload.append("thumbnail", formData.thumbnail);
            }
            if (removeThumb) {
                payload.append("remove_thumbnail", "1");
            }

            const res = await fetch(`${API_URL}/api/admin/blogs/update/${blogId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${admin.token}`,
                    // Do NOT set Content-Type when sending FormData
                },
                body: payload,
            });

            const data = await res.json();
            if (data.status) {
                toast.success("Blog updated successfully!");
                onClose();
                onSuccess && onSuccess();
            } else {
                if (["Token expired", "Invalid token"].includes(data.message)) {
                    toast.error("Session expired. Please login again.");
                    adminlogout();
                    navigate("/webmaster/login");
                } else {
                    toast.error(data.message || "Failed to update blog");
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
                    Edit Blog
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
                            placeholder="Enter blog title"
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

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

                    <div>
                        <label className="block font-medium mb-1">Thumbnail (leave blank to use old image)</label>
                        {(thumbnailPreview || initialThumbUrl) && (
                            <div className="relative inline-block mb-2">
                                <img
                                    src={thumbnailPreview || initialThumbUrl}
                                    alt="Thumbnail preview"
                                    className="h-24 w-24 object-cover rounded border"
                                />
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
                        {loading ? "Saving..." : "Update Blog"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default EditBlog;


