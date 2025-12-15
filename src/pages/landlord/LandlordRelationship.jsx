"use client";

import React from "react";
import {
  Globe,
  Users,
  Monitor,
  Handshake,
  PlusCircle,
  ClipboardList,
  CalendarCheck,
  LayoutDashboard,
} from "lucide-react";
import landlordImg from "../../assets/hotdesk.jpg";
import AddWorkSpace from "./AddWorkSpace";
import { useOutletContext } from "react-router-dom";

const LandlordRelationship = () => {

  const {theme} = useOutletContext();
  const benefits = [
    {
      icon: <Globe className={`w-8 h-8 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />,
      title: "Reach a Global Audience",
      desc: "Your coworking space will be featured on hiveworkspaces.com, attracting professionals from all over the world.",
    },
    {
      icon: <Users className={`w-8 h-8 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />,
      title: "Enhanced Exposure",
      desc: "Gain visibility among remote workers, freelancers, startups, and established businesses seeking flexible workspaces.",
    },
    {
      icon: <Monitor className={`w-8 h-8 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />,
      title: "User-Friendly Platform",
      desc: "Effortlessly manage your listings, update availability, and respond to inquiries via our intuitive dashboard.",
    },
    {
      icon: <Handshake className={`w-8 h-8 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />,
      title: "Landlord Collaboration Program",
      desc: "Collaborate with landlords in our network, creating mutually beneficial partnerships and expanding your reach.",
    },
  ];

  const steps = [
    {
      icon: <PlusCircle className={`w-8 h-8 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />,
      title: "Add Your Coworking Space",
      desc: "Share business info and space details, whether for a single or multiple locations.",
    },
    {
      icon: <ClipboardList className={`w-8 h-8 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />,
      title: "Share Facilities and Amenities",
      desc: "List all facilities and work amenities to showcase the value of your space.",
    },
    {
      icon: <CalendarCheck className={`w-8 h-8 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />,
      title: "Manage Booking Requests",
      desc: "Handle booking requests directly from your dashboard after your listing goes live.",
    },
    {
      icon: <LayoutDashboard className={`w-8 h-8 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />,
      title: "Centralised Control",
      desc: "Access all tools and features in one platform for streamlined management.",
    },
  ];

  return (
    <section className={`py-16 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} mt-12`}>
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl font-bold liber mb-4">
          Expand Your Network And Grow Your Presence
        </h2>
        <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} max-w-2xl mx-auto`}>
          Transform available spaces into vibrant offices and unlock new opportunities with The Hive’s landlord partnership program.
        </p>
      </div>

      {/* Benefits Section */}
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center mb-16">
        <img
          src={landlordImg}
          alt="Coworking Collaboration"
          className="w-full rounded-2xl border border-gray-200 p-1 object-cover"
        />
        <div>
          <h3 className="text-2xl font-bold liber mb-6">
            Why list your Coworking Business with us?
          </h3>
          <div className="space-y-6">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-start space-x-4">
                {b.icon}
                <div>
                  <h4 className="text-lg font-bold liber">{b.title}</h4>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className={`${theme === 'dark' ? 'bg-black' : 'bg-white'} py-12 border-t ${theme === 'dark' ? 'border-gray-600' : 'border-gray-400'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-2xl font-bold liber text-center mb-10">
            How it Works
          </h3>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div
                key={i}
                className={`${theme === 'dark' ? 'bg-black border-white' : 'bg-white border-black'} border rounded-xl p-6 text-center `}
              >
                <div className="flex justify-center mb-4">{s.icon}</div>
                <h4 className="text-lg font-bold liber">{s.title}</h4>
                <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300 group-hover:text-black' : 'text-gray-700 group-hover:text-white'}`}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AddWorkSpace />
    </section>
  );
};

export default LandlordRelationship;
