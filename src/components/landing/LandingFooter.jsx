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
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { assetPath } from "../../utils/assetPath";

export default function LandingFooter({ theme = "light" }) {
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
        <div className=" w-ful flex justify-between items-center space-x-2">
          {/* About Section */}
          <div>
            <h3
              className={`text-lg font-bold mb-2 ${theme === "dark" ? "text-[#0d2847]" : "text-[#0d2847]"
                }`}
            >
              About
            </h3>
            <ul
              className={`flex space-x-3 space-y-1 text-sm ${theme === "dark" ? "text-[#4b576a]" : "text-[#4b576a]"
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
          <div className="">
            <h3
              className={`text-lg font-bold mb-2 ${theme === "dark" ? "text-[#0d2847]" : "text-[#0d2847]"
                }`}
            >
              Connect
            </h3>
            <ul
              className={`flex space-x-3 space-y-1 text-sm mt-4 md:mt-0 ${theme === "dark" ? "text-[#4b576a]" : "text-[#4b576a]"
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
          <div className="md:col-span-3 ">
            <div
              className={`mb-3 flex items-center gap-2 ${theme === "dark" ? "text-black" : "text-black"
                }`}
            >
              <Globe size={15} /> India
            </div>

            <div className="flex gap-3">
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
                  className={theme === "dark" ? "text-black" : "text-black"}
                >
                  {item.icon}
                </a>
              ))}

              {/* Twitter Image */}
              <a
                href="https://twitter.com/hiveworkspaces?s=20"
                target="_blank"
                rel="noreferrer"
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
          className={`mt-3 pt-4 border-t ${theme === "dark" ? "border-white/10" : "border-[#e4e7ee]"
            }`}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <img
              src={assetPath("logo-transparent.png")}
              alt="Logo"
              width={100}
              className="rounded-md transition-all duration-300"
              style={{
                filter: theme === "darkk" ? "invert(1) brightness(1.3)" : "none",
              }}
            />

            <div
              className={`flex flex-wrap items-center gap-2 text-sm ${theme === "dark" ? "text-gray-300" : "text-[#4b576a]"
                }`}
            >
              {[
                ["Privacy Policy", "/privacy-policy"],
                ["Terms of Use", "/terms-and-conditions"],
                ["Cookie Policy", "/cookie-policy"],
              ].map(([label, url], i) => (
                <React.Fragment key={i}>
                  <button
                    onClick={() => navigate(url)}
                    className={`hover:underline ${theme === "dark" ? "text-orange-600" : "text-orange-600"
                      }`}
                  >
                    {label}
                  </button>
                  {i < 2 && <span>|</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div
            className={`mt-2 text-sm ${theme === "dark" ? "text-gray-400" : "text-[#4b576a]"
              }`}
          >
            <p>©Copyright 2011 - 2025 The Hive. All rights reserved</p>

            <div className="mt-2 text-xs">
              <p
                className={`font-semibold mb-1 ${theme === "dark" ? "text-[#0d2847]" : "text-[#0d2847]"
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
                    className={`cursor-pointer px-1.5 py-0.5 rounded-full border ${theme === "dark"
                      ? "bg-black text-white border-white/20 "
                      : "bg-white border-[#e4e7ee] hover:bg-[#f5f7fb]"
                      }`}
                  >
                    {loc}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Widget */}
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
        darkMode={theme === "dark"}
        allowEsc={false}
      />
    </footer>
  );
}
