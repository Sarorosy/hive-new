import React, { useState, useRef } from "react";
import { Check } from "lucide-react";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { SITE_KEY, API_URL } from "../../utils/constants";

const LandingHeroForm = ({ city }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    organization: "",
    email: "",
    seats: "",
  });

  const [captchaValue, setCaptchaValue] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const recaptchaRef = useRef(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCaptchaChange = (value) => setCaptchaValue(value);

  const validateForm = () => {
    if (!formData.name.trim()) return toast.error("Please enter your full name.");
    if (!formData.phone.trim()) return toast.error("Enter your phone number.");
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!/^[0-9]{10,}$/.test(cleanPhone))
      return toast.error("Enter a valid phone number.");
    if (!formData.organization.trim())
      return toast.error("Please enter your organization name.");
    if (!formData.email.trim()) return toast.error("Please enter your work email.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return toast.error("Please enter a valid email.");
    if (!formData.seats) return toast.error("Please select the number of seats.");
    if (!captchaValue)
      return toast.error("Please complete the reCAPTCHA verification.");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSubmitting(true);
      const payload = {
        ...formData,
        location: city || "Landing Page",
        message: "Request from Landing Page Hero Form",
        captcha: captchaValue,
      };

      const response = await axios.post(`${API_URL}/api/contact`, payload);

      if (response.data.status) {
        toast.success("Thank you! We’ll contact you shortly.");
        setFormData({ name: "", phone: "", organization: "", email: "", seats: "" });
        recaptchaRef.current?.reset();
        setCaptchaValue(null);
      } else {
        toast.error(response.data.message || "Submission failed.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full  rounded-2xl bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100 px-6 py-4">
      {/* Heading */}
      <div className="mb-1">
        <h3 className="text-xl md:text-2xl liber py-3 text-gray-900 leading-tight">
          Ready-to-Move Coworking Spaces in{" "}
          <span className="text-orange-500">
            {city || "Chennai"}
          </span>
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          Our workspace experts will help you find the best option for your team.
        </p>
      </div>

      {/* Trust markers */}
      <div className="flex items-center gap-5 my-4 text-sm font-medium text-gray-800">
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-green-600" strokeWidth={3} />
          Zero Brokerage
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-green-600" strokeWidth={3} />
          Quick Response
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full flex-1">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full name *"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
            focus:border-orange-500 outline-none"
        />

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Mobile number *"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
            focus:border-orange-500 outline-none"
        />

        <input
          type="text"
          name="organization"
          value={formData.organization}
          onChange={handleChange}
          placeholder="Organization name *"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
            focus:border-orange-500 outline-none"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Work email *"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
            focus:border-orange-500 outline-none"
        />

        <select
          name="seats"
          value={formData.seats}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
            focus:border-orange-500 outline-none"
        >
          <option value="" disabled>
            Select number of seats *
          </option>
          <option value="1-10">1-10</option>
          <option value="10-20">10-20</option>
          <option value="20-50">20-50</option>
          <option value="50-200">50-200</option>
          <option value="200+">200+</option>
        </select>

        {/* reCAPTCHA */}
        <div className="pt-1 scale-[0.92] origin-left md:col-span-2">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={SITE_KEY}
            onChange={handleCaptchaChange}
          />
        </div>

        {/* CTA */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-black py-3.5 text-sm font-semibold
            text-white transition hover:bg-gray-900
            disabled:opacity-70 disabled:cursor-not-allowed md:col-span-2"
        >
          {submitting ? "Requesting..." : "Request Callback"}
        </button>
      </form>
    </div>
  );
};

export default LandingHeroForm;
