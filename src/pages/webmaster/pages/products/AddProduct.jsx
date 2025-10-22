import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill-new";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Select from "react-select";
import { API_URL } from "../../../../utils/constants";
import { useAuth } from "../../../../utils/idb";
import { useNavigate } from "react-router-dom";
import { Calendar, Image, IndianRupee, Info, SquarePen, Tags, Users } from "lucide-react";

const AddProduct = ({ onClose, tags, categories, onSuccess }) => {
    const { admin, adminlogout } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        thumbnail: null,
        category: null,
        tags: [],
        booking_period: "fixed_blocks", // "fixed_blocks" | "calendar_range"
        booking_length: 1, // number, min 1
        calendar_type: "hour", // "hour" | "day"
        multi_day_selection: false, // only applicable when calendar_range & day
        max_bookings_per_block: "", // string input, will convert to int or null
        show_remaining_bookings: false, // visible only if max_bookings_per_block > 1
        cost: "", // number-like input
        cost_suffix: "", // text
        status: "active", // "active" or "inactive"
        available_booking_days: {
            sun: true,
            mon: true,
            tue: true,
            wed: true,
            thu: true,
            fri: true,
            sat: true,
        },
        discounts: [], // array of discount objects
    });
    const [loading, setLoading] = useState(false);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        
        // Clear error for this field when user makes changes
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
        
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
        // numeric fields coercion and constraints
        if (name === "booking_length") {
            const num = Math.max(1, Number(sanitizedValue) || 1);
            setFormData((prev) => ({ ...prev, booking_length: num }));
            return;
        }

        if (name === "max_bookings_per_block") {
            // allow empty (treated as null), else integer >= 1
            const raw = sanitizedValue;
            const val = raw === "" ? "" : Math.max(1, parseInt(raw, 10) || 1);
            setFormData((prev) => {
                const next = { ...prev, max_bookings_per_block: val };
                // if not > 1, force show_remaining_bookings false
                if (!(Number(val) > 1)) {
                    next.show_remaining_bookings = false;
                }
                return next;
            });
            return;
        }

        if (name === "cost") {
            // allow integer only, empty becomes ""
            const raw = sanitizedValue;
            const val = raw === "" ? "" : parseInt(String(raw).replace(/[^0-9]/g, ""), 10) || 0;
            setFormData((prev) => ({ ...prev, cost: val }));
            return;
        }

        if (name === "booking_period" || name === "calendar_type") {
            setFormData((prev) => {
                const next = { ...prev, [name]: sanitizedValue };
                const showMulti =
                    next.booking_period === "calendar_range" && next.calendar_type === "day";
                if (!showMulti) next.multi_day_selection = false;
                return next;
            });
            return;
        }

        if (name === "show_remaining_bookings") {
            setFormData((prev) => ({ ...prev, show_remaining_bookings: sanitizedValue === "true" }));
            return;
        }

        if (name === "multi_day_selection") {
            setFormData((prev) => ({ ...prev, multi_day_selection: sanitizedValue === "true" }));
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

    const handleToggleBookingDay = (dayKey) => {
        setFormData((prev) => ({
            ...prev,
            available_booking_days: {
                ...(prev.available_booking_days || {}),
                [dayKey]: !(prev.available_booking_days || {})[dayKey],
            },
        }));
    };

    const handleCategoryChange = (option) => {
        setFormData((prev) => ({ ...prev, category: option }));
    };

    const handleTagsChange = (options) => {
        setFormData((prev) => ({ ...prev, tags: options || [] }));
    };

    const addDiscount = () => {
        setFormData((prev) => ({
            ...prev,
            discounts: [
                ...prev.discounts,
                {
                    type: "count",
                    from_value: "",
                    to_value: "",
                    discount_cost: ""
                }
            ]
        }));
    };

    const removeDiscount = (index) => {
        setFormData((prev) => ({
            ...prev,
            discounts: prev.discounts.filter((_, i) => i !== index)
        }));
    };

    const handleDiscountChange = (index, field, value) => {
        setFormData((prev) => ({
            ...prev,
            discounts: prev.discounts.map((discount, i) =>
                i === index ? { ...discount, [field]: value } : discount
            )
        }));
        
        // Clear discount-specific errors when user makes changes
        if (errors[`discount_${index}_${field}`]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[`discount_${index}_${field}`];
                return newErrors;
            });
        }
    };

    // Validation functions
    const validateTitle = (title) => {
        if (!title || title.trim() === "") {
            return "Title is required";
        }
        if (!/^[A-Za-z0-9 \-]+$/.test(title)) {
            return "Title can only contain letters, numbers, spaces and hyphens";
        }
        if (title.length < 3) {
            return "Title must be at least 3 characters long";
        }
        if (title.length > 100) {
            return "Title must be less than 100 characters";
        }
        return null;
    };

    const validateThumbnail = (thumbnail) => {
        if (!thumbnail) {
            return "Thumbnail is required";
        }
        if (thumbnail.size > 5 * 1024 * 1024) { // 5MB limit
            return "Thumbnail size must be less than 5MB";
        }
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(thumbnail.type)) {
            return "Thumbnail must be a valid image file (JPEG, PNG, WebP)";
        }
        return null;
    };

    const validateDescription = (description) => {
        if (description && description.length > 5000) {
            return "Description must be less than 5000 characters";
        }
        return null;
    };

    const validateCost = (cost) => {
        if (cost !== "" && cost !== null && cost !== undefined) {
            const numCost = Number(cost);
            if (isNaN(numCost) || numCost < 0) {
                return "Cost must be a valid positive number";
            }
            if (numCost > 999999) {
                return "Cost must be less than ₹9,99,999";
            }
        }
        return null;
    };

    const validateCostSuffix = (suffix) => {
        if (suffix && suffix.length > 50) {
            return "Cost suffix must be less than 50 characters";
        }
        return null;
    };

    const validateBookingLength = (length) => {
        if (!length || length < 1) {
            return "Booking length must be at least 1";
        }
        if (length > 365) {
            return "Booking length must be less than 365";
        }
        return null;
    };

    const validateMaxBookings = (maxBookings) => {
        if (maxBookings !== "" && maxBookings !== null && maxBookings !== undefined) {
            const numBookings = Number(maxBookings);
            if (isNaN(numBookings) || numBookings < 1) {
                return "Max bookings must be a valid positive number";
            }
            if (numBookings > 1000) {
                return "Max bookings must be less than 1000";
            }
        }
        return null;
    };

    const validateDiscount = (discount, index) => {
        const discountErrors = {};
        
        // Validate discount type
        if (!discount.type) {
            discountErrors[`discount_${index}_type`] = "Discount type is required";
        }

        // Validate from_value based on type
        if (!discount.from_value || discount.from_value.trim() === "") {
            discountErrors[`discount_${index}_from_value`] = "From value is required";
        } else {
            if (discount.type === "count") {
                const fromNum = Number(discount.from_value);
                if (isNaN(fromNum) || fromNum < 1) {
                    discountErrors[`discount_${index}_from_value`] = "From count must be at least 1";
                }
            } else if (discount.type === "date_range") {
                const fromDate = new Date(discount.from_value);
                if (isNaN(fromDate.getTime())) {
                    discountErrors[`discount_${index}_from_value`] = "Invalid from date";
                }
            }
        }

        // Validate to_value based on type
        if (!discount.to_value || discount.to_value.trim() === "") {
            discountErrors[`discount_${index}_to_value`] = "To value is required";
        } else {
            if (discount.type === "count") {
                const toNum = Number(discount.to_value);
                const fromNum = Number(discount.from_value);
                if (isNaN(toNum) || toNum < 1) {
                    discountErrors[`discount_${index}_to_value`] = "To count must be at least 1";
                } else if (toNum < fromNum) {
                    discountErrors[`discount_${index}_to_value`] = "To count must be greater than or equal to from count";
                }
            } else if (discount.type === "date_range") {
                const toDate = new Date(discount.to_value);
                const fromDate = new Date(discount.from_value);
                if (isNaN(toDate.getTime())) {
                    discountErrors[`discount_${index}_to_value`] = "Invalid to date";
                } else if (toDate <= fromDate) {
                    discountErrors[`discount_${index}_to_value`] = "To date must be after from date";
                }
            } else if (discount.type === "exact_day") {
                if (!discount.to_value || !discount.from_value) {
                    discountErrors[`discount_${index}_to_value`] = "To day and from day are required";
                }
            }
        }

        // Validate discount cost
        if (!discount.discount_cost || discount.discount_cost.trim() === "") {
            discountErrors[`discount_${index}_discount_cost`] = "Discount cost is required";
        } else {
            const discountNum = Number(discount.discount_cost);
            if (isNaN(discountNum) || discountNum < 0) {
                discountErrors[`discount_${index}_discount_cost`] = "Discount cost must be a valid positive number";
            } else if (discountNum > 999999) {
                discountErrors[`discount_${index}_discount_cost`] = "Discount cost must be less than ₹9,99,999";
            }
        }

        return discountErrors;
    };

    const validateForm = () => {
        const newErrors = {};

        // Validate title
        const titleError = validateTitle(formData.title);
        if (titleError) newErrors.title = titleError;

        // Validate thumbnail
        const thumbnailError = validateThumbnail(formData.thumbnail);
        if (thumbnailError) newErrors.thumbnail = thumbnailError;

        // Validate description
        const descriptionError = validateDescription(formData.description);
        if (descriptionError) newErrors.description = descriptionError;

        // Validate cost
        const costError = validateCost(formData.cost);
        if (costError) newErrors.cost = costError;

        // Validate cost suffix
        const costSuffixError = validateCostSuffix(formData.cost_suffix);
        if (costSuffixError) newErrors.cost_suffix = costSuffixError;

        // Validate booking length
        const bookingLengthError = validateBookingLength(formData.booking_length);
        if (bookingLengthError) newErrors.booking_length = bookingLengthError;

        // Validate max bookings
        const maxBookingsError = validateMaxBookings(formData.max_bookings_per_block);
        if (maxBookingsError) newErrors.max_bookings_per_block = maxBookingsError;

        // Validate available booking days
        const enabledDays = Object.values(formData.available_booking_days || {}).filter(Boolean);
        if (enabledDays.length === 0) {
            newErrors.available_booking_days = "At least one day must be selected for booking";
        }

        // Validate discounts
        formData.discounts.forEach((discount, index) => {
            const discountErrors = validateDiscount(discount, index);
            Object.assign(newErrors, discountErrors);
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
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

    // Ensure dependent flags are kept consistent when inputs change externally
    useEffect(() => {
        const showMulti = formData.booking_period === "calendar_range" && formData.calendar_type === "day";
        if (!showMulti && formData.multi_day_selection) {
            setFormData((prev) => ({ ...prev, multi_day_selection: false }));
        }
        if (!(Number(formData.max_bookings_per_block) > 1) && formData.show_remaining_bookings) {
            setFormData((prev) => ({ ...prev, show_remaining_bookings: false }));
        }
    }, [formData.booking_period, formData.calendar_type, formData.max_bookings_per_block]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the entire form
        if (!validateForm()) {
            toast.error("Please fix the validation errors before submitting");
            return;
        }

        setLoading(true);

        try {
            const payload = new FormData();
            payload.append("title", formData.title);
            payload.append("description", formData.description || "");
            if (formData.thumbnail) payload.append("thumbnail", formData.thumbnail);
            if (formData.category) payload.append("category", formData.category.value);
            if (Array.isArray(formData.tags)) {
                formData.tags.forEach((t) => payload.append("tags[]", t.value));
            }
            payload.append("booking_period", formData.booking_period);
            payload.append("booking_length", String(formData.booking_length));
            payload.append("calendar_type", formData.calendar_type);
            payload.append("multi_day_selection", formData.multi_day_selection ? "1" : "0");
            if (formData.max_bookings_per_block !== "") {
                payload.append("max_bookings_per_block", String(formData.max_bookings_per_block));
            }
            payload.append(
                "show_remaining_bookings",
                Number(formData.max_bookings_per_block) > 1 && formData.show_remaining_bookings ? "1" : "0"
            );
            if (formData.cost !== "") payload.append("cost", String(formData.cost));
            if (formData.cost_suffix) payload.append("cost_suffix", formData.cost_suffix);
            payload.append("status", formData.status);

            // Add discounts data
            if (Array.isArray(formData.discounts) && formData.discounts.length > 0) {
                payload.append("discounts", JSON.stringify(formData.discounts));
            }

            // available_booking_days -> JSON (array of enabled day keys)
            try {
                const enabledDays = Object.entries(formData.available_booking_days || {})
                    .filter(([, val]) => Boolean(val))
                    .map(([key]) => key);
                payload.append("available_booking_days", JSON.stringify(enabledDays));
            } catch (_) {
                // fallback to all days if something goes wrong
                payload.append("available_booking_days", JSON.stringify(["sun", "mon", "tue", "wed", "thu", "fri", "sat"]));
            }

            const res = await fetch(`${API_URL}/api/admin/products/create`, {
                method: "POST",
                headers: {
                    // Do NOT set Content-Type; the browser will set the correct multipart boundary
                    Authorization: `Bearer ${admin.token}`,
                },
                body: payload,
            });

            const data = await res.json();

            if (data.status) {
                toast.success("Product added successfully!");
                setFormData({
                    title: "",
                    description: "",
                    thumbnail: null,
                    category: null,
                    tags: [],
                    booking_period: "fixed_blocks",
                    booking_length: 1,
                    calendar_type: "hour",
                    multi_day_selection: false,
                    max_bookings_per_block: "",
                    show_remaining_bookings: false,
                    cost: "",
                    cost_suffix: "",
                    status: "active",
                    available_booking_days: {
                        sun: true,
                        mon: true,
                        tue: true,
                        wed: true,
                        thu: true,
                        fri: true,
                        sat: true,
                    },
                    discounts: [],
                });
                setErrors({});
                onClose();
                onSuccess();
            } else {
                if (["Token expired", "Invalid token"].includes(data.message)) {
                    toast.error("Session expired. Please login again.");
                    adminlogout();
                    navigate("/webmaster/login");
                } else {
                    toast.error(data.message || "Failed to create product");
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
                className="bg-gray-50 w-full h-full shadow-xl overflow-hidden flex flex-col"
            >
                {/* Header */}
                <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">Add New Product</h2>
                        <p className="text-sm text-gray-600 mt-1">Create a new product for your workspace</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Main Form Area */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="max-w-4xl mx-auto p-6 space-y-8">
                            <form onSubmit={handleSubmit} className="space-y-8">

                                {/* Product Title & Thumbnail Section */}
                                <div className="bg-white rounded-lg border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <Info className="text-blue-600 mr-2" size={20} />
                                        Product Information
                                    </h3>

                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        {/* Product Title */}
                                        <div className="lg:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Product Title *
                                            </label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                placeholder="Enter product title"
                                                className={`w-full border rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent ${
                                                    errors.title 
                                                        ? 'border-red-500 focus:ring-red-500' 
                                                        : 'border-gray-300 focus:ring-blue-500'
                                                }`}
                                            />
                                            {errors.title && (
                                                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                            )}
                                        </div>

                                        {/* Thumbnail */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Product Thumbnail *
                                            </label>
                                            {thumbnailPreview ? (
                                                <div className="relative inline-block">
                                                    <img
                                                        src={thumbnailPreview}
                                                        alt="Thumbnail preview"
                                                        className="h-32 w-32 object-cover rounded-lg border-2 border-gray-200"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={removeThumbnail}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                                                        aria-label="Remove thumbnail"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                                    <input
                                                        ref={fileInputRef}
                                                        type="file"
                                                        name="thumbnail"
                                                        accept="image/*"
                                                        onChange={handleChange}
                                                        className="hidden"
                                                        id="thumbnail-upload"
                                                    />
                                                    <label htmlFor="thumbnail-upload" className="cursor-pointer">
                                                        <Image className="text-gray-500 mr-1" size={20} />
                                                        <p className="text-sm text-gray-600">Click to upload</p>
                                                    </label>
                                                </div>
                                            )}
                                            {errors.thumbnail && (
                                                <p className="mt-1 text-sm text-red-600">{errors.thumbnail}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Category & Tags Section */}
                                <div className="bg-white rounded-lg border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <Tags className="text-blue-500 mr-2" size={20} />
                                        Product Organization
                                    </h3>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {/* Category */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Category
                                            </label>
                                            <Select
                                                options={categoryOptions}
                                                value={formData.category}
                                                onChange={handleCategoryChange}
                                                isClearable
                                                placeholder="Select a category"
                                                classNamePrefix="react-select"
                                                styles={{
                                                    control: (base) => ({
                                                        ...base,
                                                        borderColor: '#d1d5db',
                                                        '&:hover': { borderColor: '#9ca3af' },
                                                        minHeight: '42px'
                                                    }),
                                                    option: (base, state) => ({
                                                        ...base,
                                                        backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#dbeafe' : 'white',
                                                        color: state.isSelected ? 'white' : '#374151'
                                                    })
                                                }}
                                            />
                                        </div>

                                        {/* Tags */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Tags
                                            </label>
                                            <Select
                                                options={tagOptions}
                                                value={formData.tags}
                                                onChange={handleTagsChange}
                                                isMulti
                                                isClearable
                                                placeholder="Select tags"
                                                classNamePrefix="react-select"
                                                styles={{
                                                    control: (base) => ({
                                                        ...base,
                                                        borderColor: '#d1d5db',
                                                        '&:hover': { borderColor: '#9ca3af' },
                                                        minHeight: '42px'
                                                    }),
                                                    option: (base, state) => ({
                                                        ...base,
                                                        backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#dbeafe' : 'white',
                                                        color: state.isSelected ? 'white' : '#374151'
                                                    })
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Description Section */}
                                <div className="bg-white rounded-lg border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <SquarePen className="text-blue-500 mr-2" size={20} />
                                        Product Description
                                    </h3>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Description
                                        </label>
                                        <div className={`border rounded-md ${
                                            errors.description ? 'border-red-500' : 'border-gray-300'
                                        }`}>
                                            <ReactQuill
                                                theme="snow"
                                                value={formData.description}
                                                onChange={handleDescriptionChange}
                                                placeholder="Write your product description here..."
                                                className="bg-white"
                                            />
                                        </div>
                                        {errors.description && (
                                            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Booking Settings Section */}
                                <div className="bg-white rounded-lg border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <Calendar className="text-orange-500 mr-2" size={20} />
                                        Booking Settings
                                    </h3>

                                    <div className="">
                                        <div className="flex items-end space-x-3 ">
                                            <div className="w-full">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Booking Period
                                                </label>
                                                <select
                                                    name="booking_period"
                                                    value={formData.booking_period}
                                                    onChange={handleChange}
                                                    className="w-full border border-gray-300 rounded-md px-3 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                >
                                                    <option value="fixed_blocks">Fixed Blocks of</option>
                                                    <option value="calendar_range">Enable Calendar Range with blocks of</option>
                                                </select>
                                            </div>

                                            <div className="w-1/3">

                                                <input
                                                    type="number"
                                                    min={1}
                                                    name="booking_length"
                                                    value={formData.booking_length}
                                                    onChange={handleChange}
                                                    onWheel={(e) => e.target.blur()}
                                                    className={`w-full border rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent ${
                                                        errors.booking_length 
                                                            ? 'border-red-500 focus:ring-red-500' 
                                                            : 'border-gray-300 focus:ring-blue-500'
                                                    }`}
                                                />
                                            </div>

                                            <div className="w-1/3">

                                                <select
                                                    name="calendar_type"
                                                    value={formData.calendar_type}
                                                    onChange={handleChange}
                                                    className="w-full border border-gray-300 rounded-md px-3 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                >
                                                    <option value="hour">Hour(s)</option>
                                                    <option value="day">Day(s)</option>
                                                </select>
                                            </div>

                                            {(formData.booking_period === "calendar_range" && formData.calendar_type === "day") && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Allow Multi-day Selection?
                                                    </label>
                                                    <select
                                                        name="multi_day_selection"
                                                        value={String(formData.multi_day_selection)}
                                                        onChange={handleChange}
                                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    >
                                                        <option value="false">No</option>
                                                        <option value="true">Yes</option>
                                                    </select>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col mt-1 text-gray-400">

                                            <i className="text-[10px]">Fixed Blocks : Customers can book one block at a time.</i>
                                            <i className="text-[10px]">Enable Range : Customers can book multiple blocks by choosing a start and an end.</i>
                                        </div>
                                    </div>
                                </div>

                                {/* Capacity & Availability Section */}
                                <div className="bg-white rounded-lg border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <Users className="text-purple-500 mr-2" size={20} />
                                        Capacity & Availability
                                    </h3>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Max bookings per block
                                            </label>
                                            <input
                                                type="number"
                                                min={1}
                                                name="max_bookings_per_block"
                                                value={formData.max_bookings_per_block}
                                                onChange={handleChange}
                                                onWheel={(e) => e.target.blur()}
                                                placeholder="Leave empty for unlimited"
                                                className={`w-full border rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent ${
                                                    errors.max_bookings_per_block 
                                                        ? 'border-red-500 focus:ring-red-500' 
                                                        : 'border-gray-300 focus:ring-blue-500'
                                                }`}
                                            />
                                            {errors.max_bookings_per_block && (
                                                <p className="mt-1 text-sm text-red-600">{errors.max_bookings_per_block}</p>
                                            )}
                                        </div>

                                        {Number(formData.max_bookings_per_block) > 1 && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Show remaining bookings?
                                                </label>
                                                <select
                                                    name="show_remaining_bookings"
                                                    value={String(formData.show_remaining_bookings)}
                                                    onChange={handleChange}
                                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                >
                                                    <option value="false">No</option>
                                                    <option value="true">Yes</option>
                                                </select>
                                            </div>
                                        )}

                                        {/* Available booking days */}
                                        <div className="lg:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Available booking days
                                            </label>
                                            <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
                                                {[
                                                    { key: "sun", label: "Sun" },
                                                    { key: "mon", label: "Mon" },
                                                    { key: "tue", label: "Tue" },
                                                    { key: "wed", label: "Wed" },
                                                    { key: "thu", label: "Thu" },
                                                    { key: "fri", label: "Fri" },
                                                    { key: "sat", label: "Sat" },
                                                ].map(({ key, label }) => (
                                                    <label key={key} className="inline-flex items-center space-x-2 p-2 border border-gray-200 rounded-md bg-white">
                                                        <input
                                                            type="checkbox"
                                                            checked={Boolean(formData.available_booking_days?.[key])}
                                                            onChange={() => handleToggleBookingDay(key)}
                                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                        />
                                                        <span className="text-sm text-gray-700">{label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            {errors.available_booking_days && (
                                                <p className="mt-1 text-sm text-red-600">{errors.available_booking_days}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Pricing Section */}
                                <div className="bg-white rounded-lg border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <IndianRupee className="text-green-500 mr-2" size={20} />
                                        Pricing
                                    </h3>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Cost (₹)
                                            </label>
                                            <input
                                                type="number"
                                                min={0}
                                                name="cost"
                                                value={formData.cost}
                                                onChange={handleChange}
                                                onWheel={(e) => e.target.blur()}
                                                placeholder="0"
                                                className={`w-full border rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent ${
                                                    errors.cost 
                                                        ? 'border-red-500 focus:ring-red-500' 
                                                        : 'border-gray-300 focus:ring-blue-500'
                                                }`}
                                            />
                                            {errors.cost && (
                                                <p className="mt-1 text-sm text-red-600">{errors.cost}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Cost Suffix
                                            </label>
                                            <input
                                                type="text"
                                                name="cost_suffix"
                                                value={formData.cost_suffix}
                                                onChange={handleChange}
                                                placeholder="e.g. Per hour, Per day"
                                                className={`w-full border rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent ${
                                                    errors.cost_suffix 
                                                        ? 'border-red-500 focus:ring-red-500' 
                                                        : 'border-gray-300 focus:ring-blue-500'
                                                }`}
                                            />
                                            {errors.cost_suffix && (
                                                <p className="mt-1 text-sm text-red-600">{errors.cost_suffix}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Discounts Section */}
                                <div className="bg-white rounded-lg border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <IndianRupee className="text-orange-500 mr-2" size={20} />
                                        Discounts
                                    </h3>

                                    <div className="space-y-4">
                                        {formData.discounts.map((discount, index) => (
                                            <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h4 className="text-sm font-medium text-gray-700">Discount {index + 1}</h4>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeDiscount(index)}
                                                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                                                    {/* Discount Type */}
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Discount Type
                                                        </label>
                                                        <select
                                                            value={discount.type}
                                                            onChange={(e) => handleDiscountChange(index, 'type', e.target.value)}
                                                            className={`w-full border rounded-md px-3 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent ${
                                                                errors[`discount_${index}_type`] 
                                                                    ? 'border-red-500 focus:ring-red-500' 
                                                                    : 'border-gray-300 focus:ring-blue-500'
                                                            }`}
                                                        >
                                                            <option value="">Select Discount Type</option>
                                                            {String(formData.multi_day_selection) == "true" && (

                                                                <option value="count">Count</option>
                                                            )}
                                                            <option value="date_range">Date Range</option>
                                                            <option value="exact_day">Exact Day</option>
                                                        </select>
                                                        {errors[`discount_${index}_type`] && (
                                                            <p className="mt-1 text-sm text-red-600">{errors[`discount_${index}_type`]}</p>
                                                        )}
                                                    </div>

                                                    {/* From Value */}
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            From
                                                        </label>
                                                        {discount.type === "count" && (
                                                            <input
                                                                type="number"
                                                                min={1}
                                                                value={discount.from_value}
                                                                onChange={(e) => handleDiscountChange(index, 'from_value', e.target.value)}
                                                                onWheel={(e) => e.target.blur()}
                                                                placeholder="Min count"
                                                                className={`w-full border rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent ${
                                                                    errors[`discount_${index}_from_value`] 
                                                                        ? 'border-red-500 focus:ring-red-500' 
                                                                        : 'border-gray-300 focus:ring-blue-500'
                                                                }`}
                                                            />
                                                        )}
                                                        {discount.type === "date_range" && (
                                                            <input
                                                                type="date"
                                                                value={discount.from_value}
                                                                onChange={(e) => handleDiscountChange(index, 'from_value', e.target.value)}
                                                                className={`w-full border rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent ${
                                                                    errors[`discount_${index}_from_value`] 
                                                                        ? 'border-red-500 focus:ring-red-500' 
                                                                        : 'border-gray-300 focus:ring-blue-500'
                                                                }`}
                                                            />
                                                        )}
                                                        {discount.type === "exact_day" && (
                                                            <select
                                                                value={discount.from_value}
                                                                onChange={(e) => handleDiscountChange(index, 'from_value', e.target.value)}
                                                                className={`w-full border rounded-md px-3 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent ${
                                                                    errors[`discount_${index}_from_value`] 
                                                                        ? 'border-red-500 focus:ring-red-500' 
                                                                        : 'border-gray-300 focus:ring-blue-500'
                                                                }`}
                                                            >
                                                                <option value="">Select day</option>
                                                                <option value="sunday">Sunday</option>
                                                                <option value="monday">Monday</option>
                                                                <option value="tuesday">Tuesday</option>
                                                                <option value="wednesday">Wednesday</option>
                                                                <option value="thursday">Thursday</option>
                                                                <option value="friday">Friday</option>
                                                                <option value="saturday">Saturday</option>
                                                            </select>
                                                        )}
                                                        {errors[`discount_${index}_from_value`] && (
                                                            <p className="mt-1 text-sm text-red-600">{errors[`discount_${index}_from_value`]}</p>
                                                        )}
                                                    </div>

                                                    {/* To Value */}
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            To
                                                        </label>
                                                        {discount.type === "count" && (
                                                            <input
                                                                type="number"
                                                                min={1}
                                                                value={discount.to_value}
                                                                onChange={(e) => handleDiscountChange(index, 'to_value', e.target.value)}
                                                                onWheel={(e) => e.target.blur()}
                                                                placeholder="Max count"
                                                                className={`w-full border rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent ${
                                                                    errors[`discount_${index}_to_value`] 
                                                                        ? 'border-red-500 focus:ring-red-500' 
                                                                        : 'border-gray-300 focus:ring-blue-500'
                                                                }`}
                                                            />
                                                        )}
                                                        {discount.type === "date_range" && (
                                                            <input
                                                                type="date"
                                                                value={discount.to_value}
                                                                onChange={(e) => handleDiscountChange(index, 'to_value', e.target.value)}
                                                                className={`w-full border rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent ${
                                                                    errors[`discount_${index}_to_value`] 
                                                                        ? 'border-red-500 focus:ring-red-500' 
                                                                        : 'border-gray-300 focus:ring-blue-500'
                                                                }`}
                                                            />
                                                        )}
                                                        {discount.type === "exact_day" && (
                                                            <select
                                                                value={discount.to_value}
                                                                onChange={(e) => handleDiscountChange(index, 'to_value', e.target.value)}
                                                                className={`w-full border rounded-md px-3 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent ${
                                                                    errors[`discount_${index}_to_value`] 
                                                                        ? 'border-red-500 focus:ring-red-500' 
                                                                        : 'border-gray-300 focus:ring-blue-500'
                                                                }`}
                                                            >
                                                                <option value="">Select day</option>
                                                                <option value="sunday">Sunday</option>
                                                                <option value="monday">Monday</option>
                                                                <option value="tuesday">Tuesday</option>
                                                                <option value="wednesday">Wednesday</option>
                                                                <option value="thursday">Thursday</option>
                                                                <option value="friday">Friday</option>
                                                                <option value="saturday">Saturday</option>
                                                            </select>
                                                        )}
                                                        {errors[`discount_${index}_to_value`] && (
                                                            <p className="mt-1 text-sm text-red-600">{errors[`discount_${index}_to_value`]}</p>
                                                        )}
                                                    </div>

                                                    {/* Discount Cost */}
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Discount Cost (₹)
                                                        </label>
                                                        <input
                                                            type="number"
                                                            min={0}
                                                            value={discount.discount_cost}
                                                            onChange={(e) => handleDiscountChange(index, 'discount_cost', e.target.value)}
                                                            onWheel={(e) => e.target.blur()}
                                                            placeholder="Discount amount"
                                                            className={`w-full border rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent ${
                                                                errors[`discount_${index}_discount_cost`] 
                                                                    ? 'border-red-500 focus:ring-red-500' 
                                                                    : 'border-gray-300 focus:ring-blue-500'
                                                            }`}
                                                        />
                                                        {errors[`discount_${index}_discount_cost`] && (
                                                            <p className="mt-1 text-sm text-red-600">{errors[`discount_${index}_discount_cost`]}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        <button
                                            type="button"
                                            onClick={addDiscount}
                                            className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors"
                                        >
                                            <span className="text-gray-600 font-medium">+ Add Discount</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
                        <div className="space-y-6">
                            {/* Publish Box */}
                            <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                                <h3 className="text-sm font-semibold text-gray-800 mb-4">Publish</h3>

                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Status
                                        </label>
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>

                                    <div className="flex space-x-2 pt-4">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            onClick={handleSubmit}
                                            disabled={loading}
                                            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            {loading ? "Creating..." : "Create Product"}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Product Data */}
                            <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                                <h3 className="text-sm font-semibold text-gray-800 mb-4">Product Data</h3>

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Booking Period:</span>
                                        <span className="font-medium capitalize">
                                            {formData.booking_period.replace('_', ' ')}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Calendar Type:</span>
                                        <span className="font-medium capitalize">{formData.calendar_type}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Booking Length:</span>
                                        <span className="font-medium">{formData.booking_length}</span>
                                    </div>

                                    {formData.cost && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Price:</span>
                                            <span className="font-medium">
                                                ₹{formData.cost}{formData.cost_suffix}
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Category:</span>
                                        <span className="font-medium">
                                            {formData.category ? formData.category.label : 'None'}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tags:</span>
                                        <span className="font-medium">
                                            {formData.tags.length > 0 ? formData.tags.length : 'None'}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Discounts:</span>
                                        <span className="font-medium">
                                            {formData.discounts.length > 0 ? formData.discounts.length : 'None'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                                <h3 className="text-sm font-semibold text-gray-800 mb-4">Quick Actions</h3>

                                <div className="space-y-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFormData({
                                                title: "",
                                                description: "",
                                                thumbnail: null,
                                                category: null,
                                                tags: [],
                                                booking_period: "fixed_blocks",
                                                booking_length: 1,
                                                calendar_type: "hour",
                                                multi_day_selection: false,
                                                max_bookings_per_block: "",
                                                show_remaining_bookings: false,
                                                cost: "",
                                                cost_suffix: "",
                                                status: "active",
                                                available_booking_days: {
                                                    sun: true,
                                                    mon: true,
                                                    tue: true,
                                                    wed: true,
                                                    thu: true,
                                                    fri: true,
                                                    sat: true,
                                                },
                                                discounts: [],
                                            });
                                            setErrors({});
                                            setThumbnailPreview(null);
                                            if (fileInputRef.current) fileInputRef.current.value = "";
                                        }}
                                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                    >
                                        Clear Form
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
                                            toast.success("Form data copied to clipboard");
                                        }}
                                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                    >
                                        Copy Form Data
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AddProduct;
