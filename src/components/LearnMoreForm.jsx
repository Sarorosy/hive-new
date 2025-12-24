import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { centersData } from "../data/centersData";
import ReCAPTCHA from "react-google-recaptcha";
import { API_URL, SITE_KEY } from "../utils/constants";

// import ContactFormImg from "../assets/raw/all/RAJA8221-min.JPG";
import ContactFormImg from "../assets/raw/all/get_set_grow.png";

export default function LearnMoreForm({ theme }) {
  // Dynamic theme classes
  const textPrimary = theme === "dark" ? "text-white" : "text-gray-900";
  const textSecondary = theme === "dark" ? "text-gray-300" : "text-gray-600";
  const bgCard = theme === "dark" ? "bg-gray-800" : "bg-white";
  const bgInput = theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300";
  const bgMain = theme === "dark" ? "bg-gray-900" : "bg-white";

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    companyEmail: "",
    phone: "",
    city: "",
    area: "",
    tourOption: "learnMore",
  });

  const [submitting, setSubmitting] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const recaptchaRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "city") {
      setFormData({ ...formData, city: value, area: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const branchOptions = formData.city
    ? Object.keys(centersData[formData.city]?.branches || {})
    : [];

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Please enter your full name.");
    if (!formData.companyName.trim()) return toast.error("Please enter your company name.");
    if (!formData.companyEmail.trim()) return toast.error("Please enter your company email.");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.companyEmail))
      return toast.error("Please enter a valid email address.");

    const digitsOnly = formData.phone.replace(/\D/g, "");
    if (!digitsOnly || digitsOnly.length < 10)
      return toast.error("Please enter a valid phone number (min 10 digits).");

    if (!formData.city) return toast.error("Please select a city.");
    if (!formData.area) return toast.error("Please select an area.");
    if (!captchaValue) return toast.error("Please complete the reCAPTCHA verification.");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const cityName = centersData[formData.city]?.name || formData.city;
    const areaName =
      centersData[formData.city]?.branches?.[formData.area]?.name || formData.area;

    const locationLabel = [cityName, areaName].filter(Boolean).join(" - ");

    const additionalMessage = [
      `Company: ${formData.companyName}`,
      `Tour Preference: ${formData.tourOption === "scheduleTour"
        ? "Schedule my tour"
        : "Learn more first"
      }`,
    ].join("\n");

    try {
      setSubmitting(true);

      const response = await axios.post(`${API_URL}/api/contact`, {
        name: formData.fullName,
        email: formData.companyEmail,
        phone: formData.phone,
        seats: null,
        message: additionalMessage,
        location: locationLabel,
        source: "learnMoreForm",
        captcha: captchaValue,
      });

      if (response.data?.status) {
        toast.success("We will get back to you shortly!");

        setFormData({
          fullName: "",
          companyName: "",
          companyEmail: "",
          phone: "",
          city: "",
          area: "",
          tourOption: "learnMore",
        });

        setCaptchaValue(null);
        recaptchaRef.current?.reset();
      } else {
        toast.error(response.data?.message || "Failed to submit form.");

        if (response.data?.message?.includes("Captcha")) {
          setCaptchaValue(null);
          recaptchaRef.current?.reset();
        }
      }
    } catch (error) {
      console.error("Learn more form error:", error);
      toast.error("Something went wrong. Please try again later.");

      if (error.response?.data?.message?.includes("Captcha")) {
        setCaptchaValue(null);
        recaptchaRef.current?.reset();
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      id="Form"
      className={`max-w-6xl mx-auto mt-12 shadow-xl rounded-2xl overflow-hidden ${bgMain}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* LEFT IMAGE */}
        <div className="relative hidden md:block">
          <img
            src={ContactFormImg}
            alt="Coworking Space"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* <div className="absolute inset-0 bg-black/30" /> */}
        </div>

        {/* RIGHT FORM */}
        <div className={`p-10 lg:p-12 ${bgCard}`}>
          {/* HEADER */}
          <div className="mb-8">
            <h2 className={`text-3xl font-semibold liber mb-2 ${textPrimary}`}>
              Learn More
            </h2>
            <p className={`text-sm ${textSecondary}`}>
              Tell us a little about yourself and we’ll get in touch shortly.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5"
          >
            {/* INPUTS */}
            {[
              { label: "Full Name*", name: "fullName" },
              { label: "Company Name*", name: "companyName" },
              { label: "Company Email Address*", name: "companyEmail", type: "email" },
              { label: "Phone Number*", name: "phone", type: "tel" },
            ].map((field, idx) => (
              <div key={idx} className="flex flex-col">
                <label className={`mb-1.5 text-sm font-medium ${textPrimary}`}>
                  {field.label}
                </label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  className={`h-11 rounded-lg px-4 text-sm border focus:outline-none focus:ring-2 focus:ring-orange-400 transition ${bgInput} ${textPrimary}`}
                />
              </div>
            ))}

            {/* CITY */}
            <div className="flex flex-col">
              <label className={`mb-1.5 text-sm font-medium ${textPrimary}`}>
                City*
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className={`h-11 rounded-lg px-4 text-sm border focus:ring-2 focus:ring-orange-400 transition ${bgInput} ${textPrimary}`}
              >
                <option value="">Select City</option>
                {Object.keys(centersData).map((cityKey) => (
                  <option key={cityKey} value={cityKey}>
                    {centersData[cityKey].name}
                  </option>
                ))}
              </select>
            </div>

            {/* AREA */}
            <div className="flex flex-col">
              <label className={`mb-1.5 text-sm font-medium ${textPrimary}`}>
                Area*
              </label>
              <select
                name="area"
                value={formData.area}
                onChange={handleChange}
                required
                disabled={!formData.city}
                className={`h-11 rounded-lg px-4 text-sm border focus:ring-2 focus:ring-orange-400 disabled:opacity-60 transition ${bgInput} ${textPrimary}`}
              >
                <option value="">Select Area</option>
                {branchOptions.map((branchKey) => (
                  <option key={branchKey} value={branchKey}>
                    {centersData[formData.city].branches[branchKey].name}
                  </option>
                ))}
              </select>
            </div>

            {/* RADIO */}
            <div className="md:col-span-2 mt-2">
              <label className={`block mb-3 text-sm font-medium ${textPrimary}`}>
                Would you like to book a tour?*
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { value: "learnMore", label: "No, I would like to learn more" },
                  { value: "scheduleTour", label: "Yes, schedule my tour" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer transition hover:border-orange-400 ${formData.tourOption === opt.value
                        ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10"
                        : "border-gray-300"
                      }`}
                  >
                    <input
                      type="radio"
                      name="tourOption"
                      value={opt.value}
                      checked={formData.tourOption === opt.value}
                      onChange={handleChange}
                      className="accent-orange-500"
                    />
                    <span className="text-sm">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* CAPTCHA */}
            <div className="md:col-span-2 flex justify-center pt-4">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={SITE_KEY}
                onChange={setCaptchaValue}
              />
            </div>

            {/* SUBMIT */}
            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className={`w-full h-12 rounded-xl font-semibold tracking-wide transition disabled:opacity-50 ${theme === "dark"
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-black text-white hover:bg-gray-900"
                  }`}
              >
                {submitting
                  ? "Submitting..."
                  : formData.tourOption === "learnMore"
                    ? "Submit"
                    : "Schedule my tour"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
}
