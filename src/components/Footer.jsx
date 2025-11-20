import { Facebook, Instagram, Linkedin } from "lucide-react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { useNavigate } from "react-router-dom";
import { citiesData } from "../data/centersData";

export default function Footer() {
  const navigate = useNavigate();
  const openCookieSettings = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("open-cookie-consent"));
    }
  };

  return (
    <footer className="bg-gray-100 text-[#1c2c44] py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-12 md:grid-cols-4">
        {/* Logo */}
        <div>
          <img
            src="/logo-transparent.png"
            alt="Logo"
            width={160}
            height={40}
            className="rounded-md"
            loading="lazy"
          />
          <p className="text-sm text-[#4b576a] mt-4">
            Flexible Workspaces for Ambitious Professionals.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#0d2847]">Navigate</h3>
          <ul className="space-y-2 text-[#4b576a] text-sm">
            {[
              { title: "Home", slug: "/" },
              { title: "Careers", slug: "/careers" },
              { title: "Blogs", slug: "/blog" },
              { title: "Landlord Relationships", slug: "/landlord-relationships" },
              { title: "Terms & Conditions", slug: "/terms-and-conditions" },
              { title: "Refund Policy", slug: "/refund-policy" },
              { title: "Cookie Policy", slug: "/cookie-policy" },
            ].map((item) => (
              <li
                key={item.title}
                className="hover:text-[#0d2847] transition duration-200 cursor-pointer"
              >
                <button
                  onClick={() => {
                    navigate(item.slug);
                  }}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Location Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#0d2847]">
            Locations
          </h3>
          <ul className="space-y-2 text-[#4b576a] text-sm max-h-64 overflow-y-auto pr-2">
            {Object.values(citiesData).flatMap((city) =>
              city.branches.map((branch) => (
                <li
                  key={branch.route}
                  onClick={() => navigate(branch.route)}
                  className="hover:text-[#0d2847] transition duration-200 cursor-pointer"
                >
                  {branch.name}
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Newsletter + Socials */}
        <div className="md:col-span-1">
          <h3 className="text-xl font-semibold mb-4 text-[#0d2847]">
            Subscribe to Our Newsletter
          </h3>
          <form className="bg-white px-4 py-2 rounded-xl shadow-sm border border-[#e4e7ee] flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              placeholder="Your Email"
              className="flex-1 px-4 py-2 rounded-lg text-sm text-[#1c2c44] w-full focus:outline-none border border-[#e4e7ee] bg-transparent focus:border-[#0d2847]"
            />
            <button
              type="button"
              className="bg-black hover:bg-gray-900 transition text-white px-6 py-2 rounded-lg font-medium text-sm w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>

          <div className="mt-6">
            <h4 className="text-md font-semibold mb-3 text-[#0d2847]">
              Follow us
            </h4>
            <div className="flex gap-4 text-black">
              <a
                href="https://www.facebook.com/hiveworkspaces/"
                target="_blank"
                rel="noreferrer"
                className="transition "
              >
                <Facebook className="stroke-[1.2]" />
              </a>

              <a
                href="https://www.instagram.com/hiveworkspaces/"
                target="_blank"
                rel="noreferrer"
                className="transition "
              >
                <Instagram className="stroke-[1.2]" />
              </a>

              <a
                href="https://www.linkedin.com/company/hiveworkspaces"
                target="_blank"
                rel="noreferrer"
                className="transition "
              >
                <Linkedin className="stroke-[1.2]" />
              </a>

              <a
                href="https://twitter.com/hiveworkspaces?s=20"
                target="_blank"
                rel="noreferrer"
                className="transition "
              >
                <img src="/twitter.png" alt="Twitter" className="w-5 " />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="mt-16 border-t border-[#e4e7ee] pt-6 text-sm text-center text-[#4b576a]">
        <p>© 2025 The Hive. All rights reserved.</p>
        <p className="mt-1">
          Developed by{" "}
          <span className="text-[#0d2847] font-semibold">
            The Hive Marketing Team
          </span>
        </p>
        <button
          type="button"
          onClick={openCookieSettings}
          className="mt-4 inline-flex items-center justify-center rounded-full border border-[#d9dee7] px-5 py-2 text-sm font-semibold text-[#1c2c44] hover:text-[#0d2847] hover:border-[#0d2847] transition"
        >
          Cookie Settings
        </button>
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
