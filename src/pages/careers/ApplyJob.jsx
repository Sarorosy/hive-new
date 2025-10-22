import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { API_URL, SITE_KEY } from "../../utils/constants";
import ReCAPTCHA from "react-google-recaptcha";

const ApplyJob = ({ onClose, job }) => {
    const [form, setForm] = useState({
        jobId: job?.id,
        fullname: "",
        email: "",
        phone: "",
        coverLetter: "",
        resume: null,
    });
    const [loading, setLoading] = useState(false);
    const [captchaValue, setCaptchaValue] = useState(null);
    const recaptchaRef = useRef(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    const validateForm = () => {

        if (!form.jobId) {
            toast.error("Invalid job.");
            return false;
        }
        if (!form.fullname.trim()) {
            toast.error("Please enter your full name.");
            return false;
        }
        if (!form.email.trim()) {
            toast.error("Please enter your email.");
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            toast.error("Please enter a valid email address.");
            return false;
        }
        if (!form.phone.trim()) {
            toast.error("Please enter your phone number.");
            return false;
        }
        if (!form.resume) {
            toast.error("Please upload your resume.");
            return false;
        }
        if (!captchaValue) {
            toast.error("Please complete the reCAPTCHA verification.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setLoading(true);
            const formData = new FormData();
            Object.entries(form).forEach(([key, value]) => formData.append(key, value));
            formData.append("captcha", captchaValue);

            const res = await fetch(`${API_URL}/career/apply`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (data.status) {
                toast.success("Application submitted successfully!");
                onClose();
            } else {
                if (data.message == "Captcha verification failed. Please try again.") {
                    recaptchaRef.current.reset();
                    setCaptchaValue(null);
                }
                if(data.message == "You have already applied for this job."){
                    onClose();  
                }
                toast.error(data.message || "Failed to submit application.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 80, opacity: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[90vh] overflow-y-auto p-8 relative"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
                >
                    <X size={22} />
                </button>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">Apply for this Job</h2>
                <p className="text-gray-600 mb-6">
                    Fill out the form below to submit your application.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Grid layout for inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Full Name */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                            <input
                                type="text"
                                name="fullname"
                                value={form.fullname}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="John Doe"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="you@example.com"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="+91 9876543210"
                            />
                        </div>

                        {/* Resume */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Resume (PDF, DOC)</label>
                            <input
                                type="file"
                                name="resume"
                                accept=".pdf,.doc,.docx"
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-2 file:mr-2 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100"
                            />
                        </div>
                    </div>

                    {/* Cover Letter */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Cover Letter</label>
                        <textarea
                            name="coverLetter"
                            value={form.coverLetter}
                            onChange={handleChange}
                            rows="5"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="Tell us why you’d be a great fit..."
                        ></textarea>
                    </div>

                    {/* reCAPTCHA */}
                    <div className="flex justify-center">
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={SITE_KEY}
                            onChange={handleCaptchaChange}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-6 border-t mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition disabled:opacity-60"
                        >
                            {loading ? "Submitting..." : "Submit Application"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default ApplyJob;
