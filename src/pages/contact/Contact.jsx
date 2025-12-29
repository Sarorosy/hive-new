
import { useOutletContext } from "react-router-dom";
import React, { useState, useRef } from "react";
import { centersData } from "../../data/centersData";
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
import { SITE_KEY, API_URL } from "../../utils/constants";
import axios from "axios";

export default function Contact() {
  const { theme } = useOutletContext();

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

  return (
  <div
    className={`min-h-screen py-24 ${
      theme === "dark"
        ? "bg-gray-900 text-white"
        : "bg-[#fafafa] text-gray-900"
    }`}
  >
    <section className="max-w-6xl mx-auto px-6">
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <p className="text-xs tracking-[0.3em] uppercase text-orange-500 font-semibold">
          Contact
        </p>
        <h1 className="mt-4 text-4xl font-semibold liber">
          Let’s find your ideal workspace
        </h1>
        <p className="mt-4 text-base text-gray-500">
          Tell us about your team and requirements. Our workspace advisors will
          reach out within 24 hours.
        </p>
      </div>

      {/* MAIN CARD */}
      <div
        className={`grid md:grid-cols-2 rounded-2xl overflow-hidden border ${
          theme === "dark"
            ? "bg-[#111] border-gray-800"
            : "bg-white border-gray-200"
        }`}
      >
        {/* LEFT INFO */}
        <div className="p-10">
          <h2 className="text-2xl font-semibold liber mb-4">
            Start a conversation
          </h2>
          <p className="text-gray-500 mb-8">
            Speak with our workspace specialists and schedule a tour at your
            preferred location.
          </p>

          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-orange-500" />
              <a
                href="tel:+917022274000"
                className="font-medium text-gray-700 dark:text-gray-300"
              >
                +91 70222 74000
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-orange-500" />
              <a
                href="mailto:hello@hiveworkspaces.com"
                className="font-medium text-gray-700 dark:text-gray-300"
              >
                hello@hiveworkspaces.com
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold mb-4 text-gray-600 dark:text-gray-400">
              Workspace Solutions
            </p>
            <ul className="grid grid-cols-2 gap-y-2 text-sm text-gray-500">
              <li>Hot Desks</li>
              <li>Dedicated Desks</li>
              <li>Private Cabins</li>
              <li>Managed Offices</li>
              <li>Enterprise Suites</li>
              <li>Meeting Rooms</li>
            </ul>
          </div>
        </div>

        {/* RIGHT FORM */}
        <form
          onSubmit={handleSubmit}
          className={`p-10 ${
            theme === "dark" ? "bg-[#0e0e0e]" : "bg-[#fbfbfb]"
          }`}
        >
          <h3 className="text-xl font-semibold mb-6 liber">
            Book a tour
          </h3>

          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 bg-transparent"
            />

            <input
              type="email"
              name="email"
              placeholder="Work Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 bg-transparent"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 bg-transparent"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="seats"
                placeholder="Seats"
                value={formData.seats}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 bg-transparent"
              />

              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 bg-transparent"
              >
                <option value="">Location</option>
                {allLocations.map((loc, idx) => (
                  <option key={idx} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              name="message"
              placeholder="Tell us about your requirements (optional)"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 bg-transparent"
            />

            <div className="flex justify-center pt-2">
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
              className={`w-full mt-4 rounded-lg py-3 text-sm font-semibold transition ${
                submitting
                  ? "opacity-50"
                  : "bg-orange-500 text-white hover:bg-orange-600"
              }`}
            >
              {submitting ? "Submitting..." : "Request Callback"}
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
);

}
