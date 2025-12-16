import React, { useState, useRef } from "react";
import { centersData } from "../data/centersData";
import {
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  User,
  Users,
  X,
  Armchair,
  Zap,
  Lock,
  Monitor,
  Building2,
  Briefcase,
  Globe,
  MessageSquare,
  Palette,
} from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { SITE_KEY, API_URL } from "../utils/constants";
import axios from "axios";

const ContactForm = ({ type = "regular", onClose, theme }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    seats: "",
    message: "",
    location: "",
  });

  const [captchaValue, setCaptchaValue] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const recaptchaRef = useRef(null);

  // Flatten locations
  const allLocations = Object.values(centersData)
    .map((city) => Object.values(city.branches).map((branch) => branch.name))
    .flat();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCaptchaChange = (value) => setCaptchaValue(value);

  const validateForm = () => {
    if (!formData.name.trim()) return toast.error("Please enter your name.");
    if (!formData.email.trim()) return toast.error("Please enter your email.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return toast.error("Please enter a valid email.");
    if (!formData.phone.trim()) return toast.error("Enter your phone number.");
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!/^[0-9]{10,}$/.test(cleanPhone))
      return toast.error("Enter a valid phone number.");
    if (!formData.location) return toast.error("Please select a location.");
    if (!captchaValue)
      return toast.error("Please complete the reCAPTCHA verification.");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSubmitting(true);
      const response = await axios.post(`${API_URL}/api/contact`, {
        ...formData,
        seats: formData.seats || null,
        message: formData.message || null,
        captcha: captchaValue,
      });

      if (response.data.status) {
        toast.success("We will get back to you shortly!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          seats: "",
          message: "",
          location: "",
        });
        recaptchaRef.current?.reset();
        setCaptchaValue(null);

        if (type === "modal" && onClose) {
          setTimeout(() => onClose(), 1000);
        }
      } else {
        toast.error(response.data.message || "Submission failed.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const formClasses =
    theme === "dark"
      ? "bg-[#111] text-white border border-gray-700"
      : "bg-white text-gray-900";

  const inputClasses =
    theme === "dark"
      ? "bg-[#0d0d0d] text-white placeholder-gray-400 border-gray-700"
      : "bg-white text-black placeholder-gray-500 border-gray-300";

  const leftText = theme === "dark" ? "text-gray-300" : "text-gray-600";

  const content = (
    <div
      className={theme === "dark" ? "bg-[#0b0b0b] mt-2" : "bg-gray-100 mt-2"}
      id="Form"
    >
      <div
        className={`
          grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl max-w-5xl mx-auto relative
          ${theme === "dark" ? "text-white" : "text-gray-900"}
        `}
      >
        {/* Modal Close */}
        {type === "modal" && (
          <button
            onClick={onClose}
            className={`
              absolute top-2 right-2 p-2 rounded-full cursor-pointer
              ${theme === "dark" ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"}
            `}
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* LEFT SECTION */}
        <div>
          <h2 className="text-2xl font-bold liber mb-2">Start a Conversation</h2>

          <p className={`mb-4 ${leftText}`}>
            We'd love to show you around our collaborative workspaces.
          </p>

          <div className="flex items-center mb-2">
            <span className="p-2 bg-black rounded-full">
              <Phone className="text-white" />
            </span>
            <a
              href="tel:+917022274000"
              className="ml-2 text-orange-500 font-medium"
            >
              +91-70222 74000
            </a>
          </div>

          <div className="flex items-center mb-4">
            <span className="p-2 bg-black rounded-full">
              <Mail className="text-white" />
            </span>
            <a
              href="mailto:hello@hiveworkspaces.com"
              className="ml-2 text-orange-500 font-medium"
            >
              hello@hiveworkspaces.com
            </a>
          </div>

          <h3 className="font-bold mb-2">We Offer:</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className={`flex items-center gap-2 py-1 ${leftText}`}>
              <Armchair className="w-4 h-4 text-orange-500 flex-shrink-0" />
              <span className="f-12">Hot Desks</span>
            </div>
            <div className={`flex items-center gap-2 py-1 ${leftText}`}>
              <Zap className="w-4 h-4 text-orange-500 flex-shrink-0" />
              <span className="f-12">Flexi Passes</span>
            </div>
            <div className={`flex items-center gap-2 py-1 ${leftText}`}>
              <Lock className="w-4 h-4 text-orange-500 flex-shrink-0" />
              <span className="f-12">Private Cabins</span>
            </div>
            <div className={`flex items-center gap-2 py-1 ${leftText}`}>
              <Monitor className="w-4 h-4 text-orange-500 flex-shrink-0" />
              <span className="f-12">Dedicated Desks</span>
            </div>
            <div className={`flex items-center gap-2 py-1 ${leftText}`}>
              <Building2 className="w-4 h-4 text-orange-500 flex-shrink-0" />
              <span className="f-12">Managed Offices</span>
            </div>
            <div className={`flex items-center gap-2 py-1 ${leftText}`}>
              <Briefcase className="w-4 h-4 text-orange-500 flex-shrink-0" />
              <span className="f-12">Enterprise Offices</span>
            </div>
            
            <div className={`flex items-center gap-2 py-1 ${leftText}`}>
              <MessageSquare className="w-4 h-4 text-orange-500 flex-shrink-0" />
              <span className="f-12">Meeting Rooms</span>
            </div>
            <div className={`flex items-center gap-2 py-1 ${leftText}`}>
              <Palette className="w-4 h-4 text-orange-500 flex-shrink-0" />
              <span className="f-12">Customized Workspaces</span>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <form
          onSubmit={handleSubmit}
          className={`shadow-md p-4 rounded-xl ${formClasses}`}
        >
          <h3 className="text-xl font-bold mb-2 liber">Book A Tour</h3>

          {/* Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">

            <div
              className={`flex items-center border rounded-lg px-2 ${inputClasses}`}
            >
              <User className="text-gray-400 mr-1" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full py-1 outline-none ${inputClasses}`}
              />
            </div>

            <div
              className={`flex items-center border rounded-lg px-2 ${inputClasses}`}
            >
              <Mail className="text-gray-400 mr-1" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full py-1 outline-none ${inputClasses}`}
              />
            </div>

          </div>

          {/* Phone + Seats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">

            <div
              className={`flex items-center border rounded-lg px-2 ${inputClasses}`}
            >
              <Phone className="text-gray-400 mr-1" />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full py-1 outline-none ${inputClasses}`}
              />
            </div>

            <div
              className={`flex items-center border rounded-lg px-2 ${inputClasses}`}
            >
              <Users className="text-gray-400 mr-1" />
              <input
                type="number"
                name="seats"
                placeholder="Seats"
                value={formData.seats}
                onChange={handleChange}
                className={`w-full py-1 outline-none ${inputClasses}`}
              />
            </div>

          </div>

          {/* Message */}
          <div
            className={`flex items-center border rounded-lg px-2 mb-2 ${inputClasses}`}
          >
            <MessageSquareText className="text-gray-400 mr-1" />
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              rows="2"
              className={`w-full py-1 outline-none ${inputClasses}`}
            />
          </div>

          {/* Location */}
          <div
            className={`flex items-center border rounded-lg px-2 mb-2 ${inputClasses}`}
          >
            <MapPin className="text-gray-400 mr-1" />
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`w-full py-1 outline-none ${inputClasses}`}
            >
              <option value="">Select Location</option>
              {allLocations.map((loc, idx) => (
                <option
                  key={idx}
                  className={theme === "dark" ? "bg-black text-white" : ""}
                  value={loc}
                >
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* CAPTCHA */}
          <div className="flex justify-center mb-2">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={SITE_KEY}
              onChange={handleCaptchaChange}
              theme={theme === "dark" ? "dark" : "light"}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`
              w-full cursor-pointer py-2 font-medium rounded-lg shadow-md transition
              ${submitting ? "opacity-50" : ""}
              ${theme === "dark"
                ? "bg-white text-black hover:opacity-90"
                : "bg-black text-white hover:opacity-90"}
            `}
          >
            {submitting ? "Submitting..." : "SUBMIT"}
          </button>
        </form>
      </div>
    </div>
  );

  // MODAL MODE -------------------------------------------------------
  if (type === "modal") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-2"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={`
            overflow-y-scroll overflow-x-hidden rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh]
            ${theme === "dark" ? "bg-[#0d0d0d]" : "bg-gray-100"}
          `}
        >
          {content}
        </motion.div>
      </motion.div>
    );
  }

  return content;
};

export default ContactForm;
