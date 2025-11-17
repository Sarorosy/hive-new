import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import logoblack from "../assets/logo-black.jpg";
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
    <footer className="bg-black text-white py-16 px-6  ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Logo */}
        <div>
          <img
            src="/logo-black.png"
            alt="Logo"
            width={160}
            height={40}
            className="rounded-md"
            unoptimized
          />
          <p className="text-sm text-gray-400 mt-4">
            Inspiring Workspaces for Ambitious Professionals.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Navigate</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
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
                className="hover:text-white hover:translate-x-1 transition duration-200 cursor-pointer"
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
          <h3 className="text-xl font-semibold mb-4 text-white">Locations</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            {Object.values(citiesData).flatMap((city) =>
              city.branches.map((branch) => (
                <li
                  key={branch.route}
                  onClick={() => navigate(branch.route)}
                  className="hover:text-white hover:translate-x-1 transition duration-200 cursor-pointer"
                >
                  {branch.name}
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Newsletter + Socials */}
        <div className="md:col-span-1">
          <h3 className="text-xl font-semibold mb-4 text-white">
            Subscribe to Our Newsletter
          </h3>
          <form className="bg-white/10 backdrop-blur-lg px-4 py-2 rounded-xl shadow-md border border-white/10 flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              placeholder="Your Email"
              className="flex-1 px-4 py-1 rounded-lg text-black w-full focus:outline-none text-white"
            />
            <button
              type="button"
              className="bg-orange-500 hover:bg-orange-600 transition text-white px-6 py-1 rounded-lg font-medium"
            >
              Subscribe
            </button>
          </form>

          <div className="mt-6">
            <h4 className="text-md font-semibold mb-3 text-white">Follow us</h4>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/hiveworkspaces/"
                target="_blank"
                className="text-gold transition"
              >
                <Facebook className="stroke-[1.2]" />
              </a>

              <a
                href="https://www.instagram.com/hiveworkspaces/"
                target="_blank"
                className="text-gold transition"
              >
                <Instagram className="stroke-[1.2]" />
              </a>

              <a
                href="https://www.linkedin.com/company/hiveworkspaces"
                target="_blank"
                className="text-gold transition"
              >
                <Linkedin className="stroke-[1.2]" />
              </a>

              <a
                href="https://twitter.com/hiveworkspaces?s=20"
                target="_blank"
                className="text-gold transition"
              >
                <Twitter className="stroke-[1.2]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="mt-16 border-t border-white/10 pt-6 text-sm text-center text-gray-500">
        <p>© 2025 The Hive. All rights reserved.</p>
        <p className="mt-1">
          Developed by{" "}
          <span className="text-white font-semibold">
            The Hive Marketing Team
          </span>
        </p>
        <button
          type="button"
          onClick={openCookieSettings}
          className="mt-4 inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white/80 hover:text-white hover:border-white transition"
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
