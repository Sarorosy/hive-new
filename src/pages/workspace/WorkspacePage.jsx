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

import {
  workspaces,
  amenities,
  benefits,
} from "../../data/workspaceData";
import StartWithUs from "./StartWithUs";
import LearnMoreForm from "../../components/LearnMoreForm";

import ManagedOffices from "../../assets/raw/all/DSC07782-min.JPG";
import ManagedOffices2 from "../../assets/raw/chn/PUR08687-min.jpg";

import EnterPriseSol from "../../assets/raw/chn/YAV00102-min.JPG";
import EnterPriseSol2 from "../../assets/raw/chn/PUR08687-min.jpg";

import privateCabins from "../../assets/raw/chn/skcl/privatecabins.jpg";
import privateCabins2 from "../../assets/offerings/privatecabins/2.jpg";

import dedicatedDesks from "../../assets/raw/chn/skcl/dedicated.jpg";
import dedicatedDesks2 from "../../assets/offerings/dedicateddesks/5.jpg";

import hotdesks from "../../assets/offerings/hotdesks/2.jpg";
import hotdesks2 from "../../assets/offerings/hotdesks/1.jpg";

import meetings from "../../assets/raw/chn/HVE04223-min.jpg";
import meetings2 from "../../assets/raw/blr/_SPL9744-min.JPG";


import whyChooseUs from "../../assets/raw/chn/skcl/IMG_7932.JPG";



const WorkspacePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);
  const { setContactFormOpen } = useOutletContext();

  // Find the workspace by slug
  const workspace = workspaces.find((w) => w.slug === slug);

  if (!workspace) {
    navigate("/404");
  }

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

  // Get appropriate image based on workspace type
  const getWorkspaceImage = (slug) => {
    const imageMapOld = {
      "managed-offices":
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop",
      "enterprise-solutions":
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=600&fit=crop",
      "private-cabins":
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&h=600&fit=crop",
      "dedicated-desks":
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=600&fit=crop",
      "hot-desks":
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=600&fit=crop",
      "meetings-and-event-spaces":
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=600&fit=crop",
    };

    const imageMap = {
      "managed-offices":
        ManagedOffices,
      "enterprise-solutions":
        EnterPriseSol,
      "private-cabins":
        privateCabins,
      "dedicated-desks":
        dedicatedDesks,
      "hot-desks":
        hotdesks,
      "meetings-and-event-spaces":
        meetings,
    };
    return imageMap[slug] || imageMap["managed-offices"];
  };

  const getSecondaryImage = (slug) => {
    const imageMapOld = {
      "managed-offices":
        "https://images.unsplash.com/photo-1497366672149-e5e4b4d34eb3?w=800&h=500&fit=crop",
      "enterprise-solutions":
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=500&fit=crop",
      "private-cabins":
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=500&fit=crop",
      "dedicated-desks":
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=500&fit=crop",
      "hot-desks":
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=500&fit=crop",
      "meetings-and-event-spaces":
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=500&fit=crop",
    };

    const imageMap = {
      "managed-offices":
        ManagedOffices2,
      "enterprise-solutions":
        EnterPriseSol2,
      "private-cabins":
        privateCabins2,
      "dedicated-desks":
        dedicatedDesks2,
      "hot-desks":
        hotdesks2,
      "meetings-and-event-spaces":
        meetings2,
    };
    return imageMap[slug] || imageMap["managed-offices"];
  };

  const getFeatureIcon = (index) => {
    const icons = [Shield, Wifi, Coffee, Calendar, Users, Star, Clock, MapPin];
    const IconComponent = icons[index % icons.length];
    return IconComponent;
  };

  return (
    <div className=" bg-white relative mt-10 ">
      {/* Hero Section with Image */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] overflow-hidden ">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${getWorkspaceImage(workspace.slug)})`,
          }}
        ></div>
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center mt-4">
          <div className="text-white max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4">
              <Star className="w-4 h-4 mr-2 text-yellow-400" />
              Premium Workspace Solution
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              {workspace.title}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed max-w-2xl">
              {workspace.description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 text-sm mb-6 sm:mb-8">
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-2 rounded-lg">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="font-medium">{workspace.capacity}</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-2 rounded-lg">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="font-medium">7 centres across 4 cities</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-2 rounded-lg">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="font-medium">24/7 Access</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button 
              onClick={()=>{setContactFormOpen(true)}}
              className="cursor-pointer  px-4 sm:px-6 py-2 sm:py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl text-sm sm:text-base">
                Schedule Tour Today
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Pricing Card */}
      <section className="-mt-16 sm:-mt-20 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-sm sm:max-w-md mx-auto border border-gray-100">
            <div className="text-center">
              {/* Price */}
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-1 sm:mb-2">
                {formatPrice(workspace.pricing.from)}
                <span className="text-sm sm:text-base md:text-lg font-normal text-gray-600">
                  /{workspace.pricing.period}
                </span>
              </div>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                Starting from • All inclusive
              </p>

              {/* CTA */}
              <a href="#Form" className="w-full bg-gradient-to-r from-black to-gray-800 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg hover:from-gray-800 hover:to-black transition-all duration-300 font-semibold transform hover:scale-105 shadow-lg text-sm sm:text-base">
                Get Started Now
              </a>

              {/* Benefits */}
              <div className="flex flex-col sm:flex-row items-center justify-center mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 gap-2 sm:gap-4">
                <div className="flex items-center">
                  <Check className="w-4 h-4 mr-1 text-green-500" />
                  No setup fees
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 mr-1 text-green-500" />
                  Flexible terms
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section with Image */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-700 mb-6">
                <Camera className="w-4 h-4 mr-2" />
                Real workspace photos
              </div>
              <h2 className="text-4xl font-bold text-black mb-6 leading-tight">
                Experience the Perfect Work Environment
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Step into a world where productivity meets comfort. Our
                thoughtfully designed spaces are crafted to inspire creativity
                and foster meaningful connections within our vibrant
                professional community.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-black mb-1">500+</div>
                  <div className="text-gray-600">Happy Members</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-black mb-1">98%</div>
                  <div className="text-gray-600">Satisfaction Rate</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src={getSecondaryImage(workspace.slug)}
                  alt={`${workspace.name} interior`}
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-black">
                      Premium Quality
                    </div>
                    <div className="text-sm text-gray-600">
                      Certified workspace
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-black text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              Everything Included
            </div>
            <h2 className="text-5xl font-bold text-black mb-6 font-serif">
              Premium Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every detail matters. From ergonomic furniture to cutting-edge
              technology, we've thought of everything to make your work
              experience exceptional.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workspace.features.map((feature, index) => {
              const IconComponent = getFeatureIcon(index);
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-gray-600  transition-all duration-500 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-700 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-bold text-black mb-6">
              Why Choose {workspace?.name || "Our Workspaces"}?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the advantages that set us apart and drive your business
              forward every single day.
            </p>
          </div>

          {/* Layout */}
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left Image */}
            <div className="relative">
              <img
                src={whyChooseUs}
                alt="Workspace Benefits"
                className="rounded-2xl shadow-lg object-cover"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-black/10" />
            </div>

            {/* Right Accordion */}
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                    className="w-full flex items-center justify-between px-4 py-3 text-left text-lg font-medium text-gray-900 hover:bg-gray-50 transition"
                  >
                    <span>{benefit.title}</span>
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-gray-500" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-500" />
                    )}
                  </button>

                  {openIndex === index && (
                    <div className="px-4 pb-4 text-gray-600 text-base leading-relaxed animate-fadeIn">
                      {benefit.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <StartWithUs />

      {/* Amenities Showcase */}
      <section className="py-20 bg-white text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-bold mb-6">
              World-Class Amenities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access premium facilities designed to enhance your productivity
              and well-being throughout your workday.
            </p>
          </div>

          {/* Amenities Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {amenities.slice(0, 8).map((amenity, index) => {
              const Icon = amenityIcons[amenity.name] || Users; // fallback icon
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 border border-transparent hover:border-black transition-colors duration-300"
                >
                  <div className="w-16 h-16 bg-black/10 rounded-xl mx-auto mb-4 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="font-semibold mb-2">{amenity.name}</h3>
                  <p className="text-sm text-gray-600">{amenity.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      
      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-black mb-6">
            Ready to Transform Your Workspace?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Join thousands of successful professionals and companies who have
            made The Hive their productive home. Your journey to exceptional
            workspace experiences starts here.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <button 
            onClick={()=>{setContactFormOpen(true)}}
            
            className=" cursor-pointer px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-black to-gray-800 text-white font-bold rounded-xl hover:from-gray-800 hover:to-black hover:scale-105 transition-all duration-300 shadow-2xl text-lg">
              Schedule Your Free Tour
            </button>
            <a href="#Form" className="px-10 py-5 border-2 border-black text-black font-bold rounded-xl hover:bg-black hover:text-white transition-all duration-300 text-lg">
              Get Custom Quote
            </a>
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-green-500" />
              Free consultation
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-green-500" />
              No obligation
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-green-500" />
              Instant response
            </div>
          </div>
        </div>
      </section>

      
      <LearnMoreForm />
    </div>
  );
};

export default WorkspacePage;
