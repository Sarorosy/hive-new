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
} from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { SITE_KEY, API_URL } from "../utils/constants";
import axios from "axios";

const ContactForm = ({ type = "regular", onClose }) => {
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

  // Flatten all locations from centersData
  const allLocations = Object.values(centersData)
    .map((city) => Object.values(city.branches).map((branch) => branch.name))
    .flat();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your name.");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error("Please enter your phone number.");
      return false;
    }
    // Basic phone validation (at least 10 digits)
    const phoneRegex = /^[0-9]{10,}$/;
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!phoneRegex.test(cleanPhone)) {
      toast.error("Please enter a valid phone number (at least 10 digits).");
      return false;
    }
    if (!formData.location) {
      toast.error("Please select a location.");
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
      setSubmitting(true);
      const response = await axios.post(`${API_URL}/api/contact`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        seats: formData.seats || null,
        message: formData.message || null,
        location: formData.location,
        captcha: captchaValue,
      });

      const data = response.data;
      if (data.status) {
        toast.success("We will get back to you shortly!");
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          seats: "",
          message: "",
          location: "",
        });
        setCaptchaValue(null);
        recaptchaRef.current?.reset();
        // Close modal if it's a modal type
        if (type === "modal" && onClose) {
          setTimeout(() => {
            onClose();
          }, 1000);
        }
      } else {
        toast.error(data.message || "Failed to submit form. Please try again.");
        if (data.message && data.message.includes("Captcha")) {
          recaptchaRef.current?.reset();
          setCaptchaValue(null);
        }
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Something went wrong. Please try again later.");
      if (error.response?.data?.message?.includes("Captcha")) {
        recaptchaRef.current?.reset();
        setCaptchaValue(null);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const content = (
    <div className="bg-gray-100 mt-2" id="Form">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 rounded-2xl max-w-7xl mx-auto relative">
        {/* X button for modal */}
        {type === "modal" && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Left Section */}
        <div>
          <h2 className="text-3xl font-bold font-serif mb-4">Start a Conversation</h2>
          <p className="text-gray-600 mb-6">
            We'd love to show you around our collaborative workspaces.
          </p>

          <div className="flex items-center mb-3">
            <span className="p-3 bg-black rounded-full">
              <Phone className="text-white" />
            </span>
            <a
              href="tel:+917022274000"
              className="ml-3 text-orange-500 font-medium"
            >
              +91-70222 74000
            </a>
          </div>

          <div className="flex items-center mb-6">
            <span className="p-3 bg-black rounded-full">
              <Mail className="text-white" />
            </span>
            <a
              href="mailto:hello@hiveworkspaces.com"
              className="ml-3 text-orange-500 font-medium"
            >
              hello@hiveworkspaces.com
            </a>
          </div>

          <h3 className="font-bold mb-2">We Offer:</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Customized Workspaces</li>
            <li>Private Cabins</li>
            <li>Dedicated Desks</li>
            <li>Hot Desks</li>
          </ul>
        </div>

        {/* Right Section (Form) */}
        <form
          className="bg-white shadow-xl p-6 rounded-2xl"
          onSubmit={handleSubmit}
        >
          <h3 className="text-2xl font-bold mb-4 font-serif">Book A Tour</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center border rounded-lg px-3">
              <User className="text-gray-400 mr-2" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full py-2 outline-none"
                
              />
            </div>
            <div className="flex items-center border rounded-lg px-3">
              <Mail className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full py-2 outline-none"
                
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center border rounded-lg px-3">
              <Phone className="text-gray-400 mr-2" />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full py-2 outline-none"
                
              />
            </div>
            <div className="flex items-center border rounded-lg px-3">
              <Users className="text-gray-400 mr-2" />
              <input
                type="number"
                name="seats"
                placeholder="Seats"
                value={formData.seats}
                onChange={handleChange}
                className="w-full py-2 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center border rounded-lg px-3 mb-4">
            <MessageSquareText className="text-gray-400 mr-2" />
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full py-2 outline-none"
              rows="3"
            />
          </div>

          <div className="flex items-center border rounded-lg px-3 mb-4">
            <MapPin className="text-gray-400 mr-2" />
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full py-2 outline-none"
              
            >
              <option value="">Select Location</option>
              {allLocations.map((loc, idx) => (
                <option key={idx} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* reCAPTCHA */}
          <div className="flex justify-center mb-4">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={SITE_KEY}
              onChange={handleCaptchaChange}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full cursor-pointer py-3 bg-black text-white font-medium rounded-lg shadow-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting..." : "SUBMIT"}
          </button>
        </form>
      </div>
    </div>
  );

  if (type === "modal") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="bg-gray-100 overflow-y-scroll overflow-x-hidden rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh]"
        >
          {content}
        </motion.div>
      </motion.div>
    );
  }

  return content;
};

export default ContactForm;
