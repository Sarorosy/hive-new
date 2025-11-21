import { Facebook, Instagram, Linkedin, ChevronDown, Globe } from "lucide-react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { useNavigate } from "react-router-dom";
import { citiesData } from "../data/centersData";
import { useState } from "react";

export default function Footer() {
  const navigate = useNavigate();
  const [showLocationsDropdown, setShowLocationsDropdown] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("India");

  const openCookieSettings = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("open-cookie-consent"));
    }
  };

  return (
    <footer className="bg-gray-100 text-[#1c2c44] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#0d2847]">About</h3>
            <ul className="space-y-2 text-[#4b576a] text-sm">
              <li
                onClick={() => navigate("/")}
                className="hover:text-[#0d2847] transition duration-200 cursor-pointer"
              >
                Home
              </li>
              <li
                onClick={() => navigate("/careers")}
                className="hover:text-[#0d2847] transition duration-200 cursor-pointer"
              >
                Careers
              </li>
              <li
                onClick={() => navigate("/landlord-relationships")}
                className="hover:text-[#0d2847] transition duration-200 cursor-pointer"
              >
                Landlord Relationships
              </li>
              <li
                onClick={() => navigate("/locations")}
                className="hover:text-[#0d2847] transition duration-200 cursor-pointer"
              >
                Locations
              </li>
              
            </ul>
          </div>

          {/* Community Section */}
          <div>
            <ul className="space-y-2 text-[#4b576a] text-sm mt-8 md:mt-0">
              <li
                onClick={() => navigate("/ecosystem")}
                className="hover:text-[#0d2847] transition duration-200 cursor-pointer"
              >
                Ecosystem
              </li>
            </ul>
          </div>

          {/* News & Media Section */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#0d2847]">News & Media</h3>
            <ul className="space-y-2 text-[#4b576a] text-sm">
              <li
                onClick={() => navigate("/blog")}
                className="hover:text-[#0d2847] transition duration-200 cursor-pointer"
              >
                Blog
              </li>
            </ul>
          </div>

          {/* Right Section - Region Selector & Social Media */}
          <div className="md:col-span-2">
            <div className="mb-6 flex items-center gap-2">
              <Globe size={15} /> India
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/hiveworkspaces/"
                target="_blank"
                rel="noreferrer"
                className="text-[#0d2847] hover:text-[#1c2c44] transition"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/hiveworkspaces"
                target="_blank"
                rel="noreferrer"
                className="text-[#0d2847] hover:text-[#1c2c44] transition"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/hiveworkspaces/"
                target="_blank"
                rel="noreferrer"
                className="text-[#0d2847] hover:text-[#1c2c44] transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/hiveworkspaces?s=20"
                target="_blank"
                rel="noreferrer"
                className="text-[#0d2847] hover:text-[#1c2c44] transition"
              >
                <img src="/twitter.png" alt="Twitter" className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal Section */}
        <div className="mt-16 border-t border-[#e4e7ee] pt-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                src="/logo-transparent.png"
                alt="Logo"
                width={120}
                height={30}
                className="rounded-md"
                loading="lazy"
              />
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <button
                onClick={() => navigate("/privacy-policy")}
                className="text-orange-600 hover:underline"
              >
                Privacy Policy
              </button>
              <span className="text-[#4b576a]">|</span>
              <button
                onClick={() => navigate("/terms-and-conditions")}
                className="text-orange-600 hover:underline"
              >
                Terms of Use
              </button>
              <span className="text-[#4b576a]">|</span>
              <button
                onClick={() => navigate("/cookie-policy")}
                className="text-orange-600 hover:underline"
              >
                Cookie Policy
              </button>
              <span className="text-[#4b576a]">|</span>
              <button
                onClick={() => navigate("/sitemap")}
                className="text-orange-600 hover:underline"
              >
                Sitemap
              </button>
            </div>
          </div>

          {/* Copyright and Address */}
          <div className="mt-4 text-sm text-[#4b576a]">
            <p>©Copyright 2011 - 2025 The Hive. All rights reserved</p>
            <p className="mt-2">
              THE HIVE INDIA LIMITED | Level 1, First International Financial Centre, Plot Nos. C-54 & C-55 G Block Road, Bandra Kurla Complex, Bandra(East), Mumbai, Mumbai- 400051, Maharashtra
            </p>
          </div>
        </div>
      </div>
      <FloatingWhatsApp
        phoneNumber="918072075487"
        accountName="The Hive"
        avatar="/Hive-Favicon.png"
        statusMessage="Typically replies in minutes"
        chatMessage="Hi 👋! How can we help?"
        placeholder="Type your message here..."
        allowClickAway={false}
        notification
        notificationSound
        darkMode={false}
        allowEsc={false}
        className="text-black"
      />
    </footer>
  );
}
