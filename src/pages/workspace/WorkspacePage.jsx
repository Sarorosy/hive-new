import React, { useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import {
  Users,
  Clock,
  MapPin,
  Check,
  Star,
  Wifi,
  Coffee,
  Shield,
  Calendar,
  Camera,
  Dumbbell,
  Monitor,
  Leaf,
  Lock,
  Music,
  Plus,
  Minus,
} from "lucide-react";

import { workspaces, amenities, benefits } from "../../data/workspaceData";

import StartWithUs from "./StartWithUs";
import LearnMoreForm from "../../components/LearnMoreForm";

// IMAGES
import ManagedOffices from "../../assets/raw/all/DSC07782-min.JPG";
import ManagedOffices2 from "../../assets/raw/chn/PUR08687-min.jpg";

import EnterPriseSol from "../../assets/raw/chn/YAV00102-min.JPG";
import EnterPriseSol2 from "../../assets/raw/chn/PUR08687-min.jpg";

import privateCabins2 from "../../assets/offerings/privatecabins/2.jpg";
import privateCabins3 from "../../assets/offerings/privatecabins/1.jpg";

import dedicatedDesks from "../../assets/raw/chn/skcl/dedicated.jpg";
import dedicatedDesks2 from "../../assets/offerings/dedicateddesks/5.jpg";

import hotdesks from "../../assets/offerings/hotdesks/2.jpg";
import hotdesks2 from "../../assets/offerings/hotdesks/1.jpg";

import meetings2 from "../../assets/raw/blr/_SPL9744-min.JPG";
import meetings3 from "../../assets/raw/blr/THEHIVEVR16.jpg";

import whyChooseUs from "../../assets/raw/chn/skcl/IMG_7932.JPG";
import CityCarousel from "./CityCarousel";

const WorkspacePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  const { theme, setContactFormOpen } = useOutletContext();

  // workspace data
  const workspace = workspaces.find((w) => w.slug === slug);
  if (!workspace) navigate("/404");

  const formatPrice = (price) => {
    if (price >= 1000) {
      let val = (price / 1000).toFixed(1);
      val = val.endsWith(".0") ? val.slice(0, -2) : val;
      return `₹${val}K`;
    }
    return `₹${price}`;
  };

  const amenityIcons = {
    "High-Speed Internet": Wifi,
    "Coffee & Tea": Coffee,
    "Community Events": Users,
    "Fitness Center": Dumbbell,
    "Meeting Rooms": Monitor,
    "Green Spaces": Leaf,
    "Secure Access": Lock,
    "Lounge Music": Music,
  };

  const getWorkspaceImage = (slug) => {
    const map = {
      "managed-offices": ManagedOffices,
      "enterprise-solutions": EnterPriseSol,
      "private-cabins": privateCabins3,
      "dedicated-desks": dedicatedDesks,
      "hot-desks": hotdesks,
      "meetings-and-event-spaces": meetings3,
    };
    return map[slug] || ManagedOffices;
  };

  const getSecondaryImage = (slug) => {
    const map = {
      "managed-offices": ManagedOffices2,
      "enterprise-solutions": EnterPriseSol2,
      "private-cabins": privateCabins2,
      "dedicated-desks": dedicatedDesks2,
      "hot-desks": hotdesks2,
      "meetings-and-event-spaces": meetings2,
    };
    return map[slug] || ManagedOffices2;
  };

  const getFeatureIcon = (i) => {
    const icons = [Shield, Wifi, Coffee, Calendar, Users, Star, Clock, MapPin];
    return icons[i % icons.length];
  };

  // DARK MODE classes
  const textPrimary = theme === "dark" ? "text-white" : "text-black";
  const textSecondary = theme === "dark" ? "text-gray-300" : "text-gray-600";
  const bgPrimary = theme === "dark" ? "bg-gray-900" : "bg-white";
  const bgCard =
    theme === "dark"
      ? "bg-gray-800 border-gray-700"
      : "bg-white border-gray-100";

  return (
    <div className={`${bgPrimary} relative pt-18`}>
      {/* HERO */}
      <section className="relative min-h-[80vh] sm:min-h-[80vh] overflow-hidden">
        <div
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat `}
          style={{
            backgroundImage: `url(${getWorkspaceImage(workspace.slug)})`,
          }}
        ></div>

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center mt-4">
          <div className="text-white max-w-4xl">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Star className="w-4 h-4 mr-2 text-yellow-400" />
              Premium Workspace Solution
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl liber mb-6">
              {workspace.title}
            </h1>

            <p className="text-lg text-gray-200 max-w-2xl mb-8">
              {workspace.description}
            </p>

            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center bg-white/10 px-4 py-2 rounded-lg">
                <Users className="w-5 h-5 mr-2" />
                {workspace.capacity}
              </div>

              <div className="flex items-center bg-white/10 px-4 py-2 rounded-lg">
                <MapPin className="w-5 h-5 mr-2" />7 centres across 4 cities
              </div>

              <div className="flex items-center bg-white/10 px-4 py-2 rounded-lg">
                <Clock className="w-5 h-5 mr-2" />
                24/7 Access
              </div>
            </div>

            <button
              onClick={() => setContactFormOpen(true)}
              className="mt-6 px-6 py-3 bg-white text-black rounded-lg font-semibold shadow hover:scale-105 transition"
            >
              Schedule Tour Today
            </button>
          </div>
        </div>
      </section>

      {/* PRICE CARD */}
      <section className="-mt-38 relative z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className={`rounded-2xl shadow-2xl p-8 max-w-md mx-auto border ${bgCard}`}
          >
            <div className="text-center">
              <div className={`text-3xl liber ${textPrimary}`}>
                {formatPrice(workspace.pricing.from)}
                <span className={`text-base ${textSecondary}`}>
                  /{workspace.pricing.period}
                </span>
              </div>

              <p className={`${textSecondary} mt-2`}>
                Starting from • All inclusive
              </p>

              <a
                href="#Form"
                className="w-full mt-6 block bg-gradient-to-r from-black to-gray-700 text-white py-4 rounded-lg hover:scale-105 transition"
              >
                Get Started Now
              </a>

              <div className="flex justify-center gap-4 mt-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  No setup fees
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Flexible terms
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16">
          <div>
            {/* <div className="inline-flex items-center bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-full text-sm mb-6">
              <Camera className="w-4 h-4 mr-2" />
              Real workspace photos
            </div> */}

            <h2 className={`text-4xl liber mb-6 ${textPrimary}`}>
              Experience the Perfect Work Environment
            </h2>

            <p className={`text-xl leading-relaxed mb-8 ${textSecondary}`}>
              Step into a world where productivity meets comfort.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className={`text-center p-4 rounded-xl ${bgCard}`}>
                <div className={`text-3xl liber ${textPrimary}`}>500+</div>
                <div className={textSecondary}>Happy Members</div>
              </div>

              <div className={`text-center p-4 rounded-xl ${bgCard}`}>
                <div className={`text-3xl liber ${textPrimary}`}>98%</div>
                <div className={textSecondary}>Satisfaction Rate</div>
              </div>
            </div>
          </div>

          {/* Workspace Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={getSecondaryImage(workspace.slug)}
                className={`w-full h-96 object-cover transition `}
                alt=""
              />
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl p-4 shadow border dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className={`font-semibold ${theme === "dark" ? "text-black" : "text-black"}`}>
                    Premium Quality
                  </div>
                  <div className={`text-gray-800`}>Certified workspace</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="text-gray-600 max-w-7xl mx-auto" />

      {/* MANAGED OFFICES CITY CARDS */}
      {workspace?.slug === "managed-offices" && (
        <section
          className={`
      py-20 transition-colors
      ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}
    `}
        >
          <div className="max-w-7xl mx-auto px-4">

            <h2
              className={`text-4xl liber mb-12 text-center 
        ${theme === "dark" ? "text-white" : "text-black"}`}
            >
              Our Managed Offices (Sold Out)
            </h2>

            <div className="grid md:grid-cols-2 gap-10">
              <CityCarousel
                city="Delhi"
                totalImages={10}
                basePath="/delhi"
                theme={theme}
              />

              <CityCarousel
                city="Mumbai"
                totalImages={9}
                basePath="/mumbai"
                theme={theme}
              />
            </div>

          </div>
        </section>
      )}



      {/* FEATURES */}
      <section
        className={`py-20 transition-colors 
    ${theme === "dark"
            ? "bg-gradient-to-br from-gray-900 to-gray-800"
            : "bg-gradient-to-br from-gray-50 to-white"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-16">
            <span
              className={`px-4 py-2 rounded-full text-sm transition 
          ${theme === "dark" ? "bg-white text-black" : "bg-black text-white"}`}
            >
              Everything Included
            </span>

            <h2 className={`text-5xl liber mt-6 ${textPrimary}`}>
              Premium Features
            </h2>

            <p className={`text-xl mt-4 ${textSecondary}`}>
              Every detail matters.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workspace.features.map((f, i) => {
              const Icon = getFeatureIcon(i);
              return (
                <div
                  key={i}
                  className={`p-8 rounded-2xl border shadow-sm transition 
              ${theme === "dark"
                      ? "bg-gray-800 border-gray-700 hover:border-gray-400"
                      : "bg-white border-gray-200 hover:border-gray-600"
                    }`}
                >
                  {/* Icon Box */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition
                ${theme === "dark"
                        ? "bg-gradient-to-br from-gray-200 to-gray-400"
                        : "bg-gradient-to-br from-black to-gray-700"
                      }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${theme === "dark" ? "text-black" : "text-white"
                        }`}
                    />
                  </div>

                  <h3 className={`text-xl liber mb-4 ${textPrimary}`}>
                    {f.title}
                  </h3>

                  <p className={textSecondary}>{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-5xl liber ${textPrimary}`}>
              Why Choose {workspace?.name}?
            </h2>
            <p className={`text-xl mt-4 ${textSecondary}`}>
              Benefits that help your business grow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left Image */}
            <div className="relative">
              <img
                src={whyChooseUs}
                className={`rounded-2xl shadow-lg object-cover `}
                alt=""
              />
            </div>

            {/* Accordion */}
            <div className="space-y-3">
              {benefits.map((b, i) => (
                <div
                  key={i}
                  className={`rounded-xl border shadow-sm ${bgCard}`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className={`w-full flex justify-between px-4 py-3 text-lg font-medium ${textPrimary}`}
                  >
                    {b.title}
                    {openIndex === i ? <Minus /> : <Plus />}
                  </button>

                  {openIndex === i && (
                    <p className={`px-4 pb-4 ${textSecondary}`}>
                      {b.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <StartWithUs theme={theme} />

      {/* AMENITIES */}
      <section
        className={`py-20 transition-colors ${theme === "dark"
            ? "bg-gradient-to-br from-gray-900 to-gray-800"
            : "bg-gradient-to-br from-white to-gray-50"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className={`text-5xl liber ${textPrimary}`}>
              World-Class Amenities
            </h2>

            <p className={`text-xl mt-4 ${textSecondary}`}>
              Boost your productivity & well-being.
            </p>
          </div>

          {/* Amenity Items */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {amenities.slice(0, 8).map((a, i) => {
              const Icon = amenityIcons[a.name] || Users;

              return (
                <div
                  key={i}
                  className={`text-center p-6 rounded-xl transition border 
              ${theme === "dark"
                      ? "bg-gray-800 border-gray-700 hover:border-gray-400"
                      : "bg-gray-50 border-gray-200 hover:border-black"
                    }`}
                >
                  <div
                    className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 transition
                ${theme === "dark" ? "bg-white/10" : "bg-black/10"}`}
                  >
                    <Icon
                      className={`w-8 h-8 transition ${theme === "dark" ? "text-white" : "text-black"
                        }`}
                    />
                  </div>

                  <h3 className={`font-semibold ${textPrimary}`}>{a.name}</h3>

                  <p className={`text-sm mt-1 ${textSecondary}`}>
                    {a.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className={`text-5xl liber ${textPrimary}`}>
            Ready to Transform Your Workspace?
          </h2>

          <p className={`text-xl mt-4 mb-12 ${textSecondary}`}>
            Join thousands of thriving professionals.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <button
              onClick={() => setContactFormOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-black to-gray-800 text-white rounded-xl hover:scale-105 transition"
            >
              Schedule Your Free Tour
            </button>

            <a
              href="#Form"
              className={`px-10 py-5 border-2 rounded-xl liber transition ${theme === "dark"
                  ? "border-white text-white hover:bg-white hover:text-black"
                  : "border-black text-black hover:bg-black hover:text-white"
                }`}
            >
              Get Custom Quote
            </a>
          </div>

          <div className={`flex justify-center gap-8 text-sm ${textSecondary}`}>
            <div className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-green-500" /> Free
              consultation
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-green-500" /> No obligation
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-green-500" /> Instant response
            </div>
          </div>
        </div>
      </section>

      <LearnMoreForm />
    </div>
  );
};

export default WorkspacePage;
