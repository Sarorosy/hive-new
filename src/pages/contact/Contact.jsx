
import { useNavigate, useOutletContext } from "react-router-dom";
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

  const navigate = useNavigate();

  return (
    <div
      className={`min-h-screen py-16 transition-colors duration-300 ${theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-[#fafafa] text-gray-900"
        }`}
    >
      <section
        className={`transition-colors duration-300 ${theme === "dark" ? "bg-gray-900" : "bg-[#faf9f7]"
          }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* LEFT */}
            <div className="lg:col-span-8">
              <h1
                className={`text-4xl liber font-medium transition-colors duration-300 ${theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
              >
                Hey there, how can we help?
              </h1>

              <p
                className={`mt-4 max-w-2xl transition-colors duration-300 ${theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
              >
                The best way to experience our workspace is to see it for
                yourself. Complete the form and our team will reach out to
                understand your needs.
              </p>

              <hr
                className={`my-8 ${theme === "dark" ? "border-gray-700" : "border-gray-200"
                  }`}
              />

              <form
                onSubmit={handleSubmit}
                className={`p-10 rounded-xl border transition-colors duration-300 ${theme === "dark"
                    ? "bg-[#0e0e0e] border-gray-800"
                    : "bg-[#fbfbfb] border-gray-200"
                  }`}
              >

                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 bg-transparent transition-colors duration-300 ${theme === "dark"
                        ? "border-gray-700 placeholder-gray-500 text-white"
                        : "border-gray-200 placeholder-gray-400 text-gray-900"
                      }`}
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Work Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 bg-transparent transition-colors duration-300 ${theme === "dark"
                        ? "border-gray-700 placeholder-gray-500 text-white"
                        : "border-gray-200 placeholder-gray-400 text-gray-900"
                      }`}
                  />

                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 bg-transparent transition-colors duration-300 ${theme === "dark"
                        ? "border-gray-700 placeholder-gray-500 text-white"
                        : "border-gray-200 placeholder-gray-400 text-gray-900"
                      }`}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      name="seats"
                      placeholder="Seats"
                      value={formData.seats}
                      onChange={handleChange}
                      className={`w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 bg-transparent transition-colors duration-300 ${theme === "dark"
                          ? "border-gray-700 placeholder-gray-500 text-white"
                          : "border-gray-200 placeholder-gray-400 text-gray-900"
                        }`}
                    />

                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className={`w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 bg-transparent transition-colors duration-300 ${theme === "dark"
                          ? "border-gray-700 text-white [&>option]:bg-gray-900"
                          : "border-gray-200 text-gray-900"
                        }`}
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
                    className={`w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500 bg-transparent transition-colors duration-300 ${theme === "dark"
                        ? "border-gray-700 placeholder-gray-500 text-white"
                        : "border-gray-200 placeholder-gray-400 text-gray-900"
                      }`}
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
                    className={`w-full mt-4 rounded-lg py-3 text-sm font-medium transition ${submitting
                        ? "opacity-50"
                        : "bg-orange-500 text-white hover:bg-orange-600"
                      }`}
                  >
                    {submitting ? "Submitting..." : "Request Callback"}
                  </button>
                </div>
              </form>
            </div>

            {/* RIGHT SIDEBAR */}
            <aside className="lg:col-span-4">
              <div className="space-y-10">
                <div>
                  <h3
                    className={`text-xl liber font-medium transition-colors duration-300 ${theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                  >
                    Prefer to call now?
                  </h3>
                  <p
                    className={`mt-2 transition-colors duration-300 ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                  >
                    You can reach us at{" "}
                    <a
                      href="tel:7022274000"
                      className="font-medium text-orange-500 hover:text-orange-400 underline"
                    >
                      7022274000
                    </a>{" "}
                    Monday–Saturday, 8am–5pm.
                  </p>
                </div>

                <hr
                  className={`${theme === "dark" ? "border-gray-700" : "border-gray-200"
                    }`}
                />

                <div>
                  <h3
                    className={`text-xl liber font-medium transition-colors duration-300 ${theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                  >
                    Prefer to email?
                  </h3>
                  <p
                    className={`mt-2 transition-colors duration-300 ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                  >
                    Drop us a line at{" "}
                    <a
                      href="mailto:hello@hiveworkspaces.com"
                      className="font-medium text-orange-500 hover:text-orange-400 underline"
                    >
                      hello@hiveworkspaces.com
                    </a>
                  </p>
                </div>

                <hr
                  className={`${theme === "dark" ? "border-gray-700" : "border-gray-200"
                    }`}
                />

                <div>
                  <h3
                    className={`text-xl liber font-medium transition-colors duration-300 ${theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                  >
                    Already a member?
                  </h3>
                  <p
                    className={`mt-2 transition-colors duration-300 ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                  >
                    <button
                      onClick={() => {
                        navigate("/account/login");
                      }}
                      className="text-orange-500 hover:text-orange-400 underline"
                    >
                      Sign in
                    </button>{" "}
                    to manage reservations, account details, and more.
                  </p>
                </div>

                <hr
                  className={`${theme === "dark" ? "border-gray-700" : "border-gray-200"
                    }`}
                />

                <div>
                  <h3
                    className={`text-xl liber font-medium transition-colors duration-300 ${theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                  >
                    Ready to join now?
                  </h3>
                  <p
                    className={`mt-2 transition-colors duration-300 ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                  >
                    <button
                      onClick={() => {
                        navigate("/solutions");
                      }}
                      className="text-orange-500 hover:text-orange-400 underline"
                    >
                      Get instant access
                    </button>{" "}
                    to coworking and meeting spaces with our Access Membership.
                  </p>
                </div>

                <hr
                  className={`${theme === "dark" ? "border-gray-700" : "border-gray-200"
                    }`}
                />

                <div>
                  <p
                    className={`text-sm font-medium mb-4 transition-colors duration-300 ${theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                  >
                    Workspace Solutions
                  </p>
                  <ul
                    className={`grid grid-cols-2 gap-y-2 text-sm transition-colors duration-300 ${theme === "dark" ? "text-gray-500" : "text-gray-500"
                      }`}
                  >
                    <li>Hot Desks</li>
                    <li>Dedicated Desks</li>
                    <li>Private Cabins</li>
                    <li>Managed Offices</li>
                    <li>Enterprise Suites</li>
                    <li>Meeting Rooms</li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );

}
