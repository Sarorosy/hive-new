import React from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  ChevronDown,
  Globe,
  Youtube,
} from "lucide-react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { useNavigate, useOutletContext } from "react-router-dom";
import { citiesData } from "../data/centersData";
import { useState } from "react";
import { assetPath } from "../utils/assetPath";

export default function Footer({ theme = "light" }) {
  const navigate = useNavigate();
  const [showLocationsDropdown, setShowLocationsDropdown] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("India");

  const openCookieSettings = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("open-cookie-consent"));
    }
  };

  return (
    <footer
      className={`
          relative z-50 py-8 
          ${theme === "dark"
          ? "bg-gray-100 text-[#1c2c44]"
          : "bg-gray-100 text-[#1c2c44]"
        }
        `}
    >
      <div className="max-w-[90%] mx-auto">
        {/* Main Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 items-start">
          {/* About Section */}
          <div className="flex flex-col">
            <h3
              className={`text-lg font-bold mb-4 ${theme === "dark" ? "text-[#0d2847]" : "text-[#0d2847]"
                }`}
            >
              About
            </h3>
            <ul
              className={`flex flex-col gap-2 text-sm ${theme === "dark" ? "text-[#4b576a]" : "text-[#4b576a]"
                }`}
            >
              <li
                onClick={() => navigate("/")}
                className="hover:text-orange-500 cursor-pointer duration-200"
              >
                Home
              </li>
              <li
                onClick={() => navigate("/about-us")}
                className="hover:text-orange-500 cursor-pointer duration-200"
              >
                About Us
              </li>

              <li
                onClick={() => navigate("/blog")}
                className="hover:text-orange-500 cursor-pointer duration-200"
              >
                Blogs
              </li>

              <li
                onClick={() => navigate("/locations")}
                className="hover:text-orange-500 cursor-pointer duration-200"
              >
                Locations
              </li>
              <li
                onClick={() => navigate("/landlord-relationships")}
                className="hover:text-orange-500 cursor-pointer duration-200"
              >
                Landlord Relationships
              </li>
              <li
                onClick={() => navigate("/ecosystem")}
                className="hover:text-orange-500 cursor-pointer duration-200"
              >
                Ecosystem
              </li>
            </ul>
          </div>

          {/* Second Column */}
          <div className="flex flex-col">
            <h3
              className={`text-lg font-bold mb-4 ${theme === "dark" ? "text-[#0d2847]" : "text-[#0d2847]"
                }`}
            >
              Connect
            </h3>
            <ul
              className={`flex flex-col gap-2 text-sm ${theme === "dark" ? "text-[#4b576a]" : "text-[#4b576a]"
                }`}
            >
              <li
                onClick={() => navigate("/account/profile")}
                className="hover:text-orange-500 cursor-pointer duration-200"
              >
                My Account
              </li>

              <li
                className="hover:text-orange-500 cursor-pointer duration-200"
              >
                <a
                  href="tel:+917022274000"
                  className="flex items-center gap-1"
                >
                  Call us
                </a>
              </li>
              <li
                onClick={() => navigate("/careers")}
                className="hover:text-orange-500 cursor-pointer duration-200"
              >
                Careers
              </li>
              <li
                onClick={() => navigate("/support/faq")}
                className="hover:text-orange-500 cursor-pointer duration-200"
              >
                FAQ
              </li>
              <li
                onClick={() => navigate("/sitemap")}
                className="hover:text-orange-500 cursor-pointer duration-200"
              >
                Sitemap
              </li>
            </ul>
          </div>

          {/* Social Column */}
          <div className="flex flex-col sm:col-span-2 md:col-span-1">
            <h3
              className={`text-lg font-bold mb-4 ${theme === "dark" ? "text-[#0d2847]" : "text-[#0d2847]"
                }`}
            >
              Follow Us
            </h3>
            <div
              className={`mb-4 flex items-center gap-2 text-sm ${theme === "dark" ? "text-gray-600" : "text-gray-600"
                }`}
            >
              <Globe size={15} /> India
            </div>

            <div className="flex flex-wrap gap-4">
              {[
                {
                  href: "https://www.facebook.com/hiveworkspaces/",
                  icon: <Facebook className="w-5 h-5" />,
                },
                {
                  href: "https://www.linkedin.com/company/hiveworkspaces",
                  icon: <Linkedin className="w-5 h-5" />,
                },
                {
                  href: "https://www.instagram.com/hiveworkspaces/",
                  icon: <Instagram className="w-5 h-5" />,
                },
                {
                  href: "https://www.youtube.com/@thehivecollaborativeworksp8501",
                  icon: <Youtube className="w-5 h-5" />,
                },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`${theme === "dark" ? "text-black" : "text-black"
                    } hover:text-orange-500 transition-colors duration-200`}
                >
                  {item.icon}
                </a>
              ))}

              {/* Twitter Image */}
              <a
                href="https://twitter.com/hiveworkspaces?s=20"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-75 transition-opacity duration-200"
              >
                <img
                  src={assetPath("twitter.png")}
                  className="w-5 h-5"
                  alt="Twitter"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal */}
        <div
          className={`mt-12 pt-6 border-t ${theme === "dark" ? "border-gray-200" : "border-[#e4e7ee]"
            }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <img
                src={assetPath("logo-transparent.png")}
                alt="Logo"
                width={100}
                className="rounded-md transition-all duration-300"
                style={{
                  filter: theme === "dark" ? "invert(1) brightness(1.3)" : "none",
                }}
              />

              <div
                className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-sm ${theme === "dark" ? "text-gray-500" : "text-[#4b576a]"
                  }`}
              >
                {[
                  ["Privacy Policy", "/privacy-policy"],
                  ["Terms of Use", "/terms-and-conditions"],
                  ["Cookie Policy", "/cookie-policy"],
                ].map(([label, url], i) => (
                  <button
                    key={i}
                    onClick={() => navigate(url)}
                    className="hover:text-orange-600 hover:underline transition-colors duration-200"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <p className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-[#4b576a]"}`}>
              ©Copyright 2011 - {new Date().getFullYear()} The Hive. All rights reserved
            </p>
          </div>

          <div className="mt-8 text-sm">
            <p
              className={`font-semibold mb-3 ${theme === "dark" ? "text-[#0d2847]" : "text-[#0d2847]"
                }`}
            >
              Key Locations
            </p>

            <div className="flex flex-wrap gap-2 text-[10px] md:text-[11px]">
              {[
                "Anna Nagar, Chennai",
                "OMR Chennai (Pre-toll)",
                "SKCL Guindy, Chennai",
                "Keppal One Paramount, Chennai",
                "VR Bengaluru",
                "Prestige Tech Platina, Bengaluru",
                "Gachibowli, Hyderabad",
                "The Mills, Pune",
              ].map((loc, i) => (
                <span
                  key={i}
                  onClick={() => { navigate('/locations') }}
                  className={`cursor-pointer px-3 py-1 rounded-full border transition-all duration-200 ${theme === "dark"
                    ? "bg-white text-black border-gray-200 hover:bg-gray-50"
                    : "bg-white border-[#e4e7ee] hover:bg-[#f5f7fb] hover:border-orange-200"
                    }`}
                >
                  {loc}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Widget */}
      <FloatingWhatsApp
        phoneNumber="917022274000"
        accountName="The Hive"
        avatar="/Hive-Favicon.png"
        statusMessage="Typically replies in minutes"
        chatMessage="Hi 👋! How can we help?"
        placeholder="Type your message here..."
        allowClickAway={false}
        notification
        notificationSound
        darkMode={theme === "dark"}
        allowEsc={false}
      />
    </footer>
  );
}
