import React, { useState } from "react";
import toast from "react-hot-toast";
import { centersData } from "../data/centersData";

import ContactFormImg from "../assets/raw/all/RAJA8221-min.JPG";

export default function LearnMoreForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    companyEmail: "",
    phone: "",
    city: "",
    area: "",
    tourOption: "learnMore",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Reset area if city changes
    if (name === "city") {
      setFormData({ ...formData, city: value, area: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const branchOptions = formData.city
    ? Object.keys(centersData[formData.city]?.branches || {})
    : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form submitted:", formData);
    toast.success("We will get back to you shortly");
  };

  return (
    <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-6xl mx-auto my-8"
    id="Form"
    >
      {/* Left Side Image */}
      <div className="md:w-1/2">
        <img
          src={ContactFormImg}
          alt="Coworking Space"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side Form */}
      <div className="md:w-1/2 p-8">
        <h2 className="text-2xl font-bold mb-6">Learn More</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Full Name*</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Company Name*</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Company Email Address*</label>
            <input
              type="email"
              name="companyEmail"
              value={formData.companyEmail}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Phone Number*</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">City*</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select City</option>
              {Object.keys(centersData).map((cityKey) => (
                <option key={cityKey} value={cityKey}>
                  {centersData[cityKey].name}
                </option>
              ))}
            </select>
          </div>

          {/* Area Dropdown */}
          <div>
            <label className="block mb-1 font-semibold">Area*</label>
            <select
              name="area"
              value={formData.area}
              onChange={handleChange}
              required
              disabled={!formData.city}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            >
              <option value="">Select Area</option>
              {branchOptions.map((branchKey) => (
                <option key={branchKey} value={branchKey}>
                  {centersData[formData.city].branches[branchKey].name}
                </option>
              ))}
            </select>
          </div>

          {/* Radio Buttons full width */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-semibold">Would you like to book a tour?*</label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="tourOption"
                  value="learnMore"
                  checked={formData.tourOption === "learnMore"}
                  onChange={handleChange}
                  className="form-radio"
                />
                No, I would like to learn more
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="tourOption"
                  value="scheduleTour"
                  checked={formData.tourOption === "scheduleTour"}
                  onChange={handleChange}
                  className="form-radio"
                />
                Yes, schedule my tour
              </label>
            </div>
          </div>

          {/* Submit button full width */}
          <div className="md:col-span-2">
            <button
              type="button"
              className="w-full cursor-pointer bg-black text-white font-semibold py-2 rounded  transition"
            >
              {formData.tourOption == "learnMore" ? "Submit" : "Schedule my tour"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
