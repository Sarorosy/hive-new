import React, { useState } from "react";
import {
  MapPin,
  Users,
  Building2,
  Wifi,
  FileText,
  BarChart3,
  Headphones,
  Check,
  ChevronRight,
  Briefcase,
  Shield,
  Zap,
  TrendingUp,
} from "lucide-react";
import LearnMoreForm from "../components/LearnMoreForm";
import { useOutletContext } from "react-router-dom";

const VirtualOffice = () => {
  
  const { theme, setContactFormOpen } = useOutletContext();

  const phoneNumber = "+917022274000";
  const handleContactSales = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const features = [
    {
      id: 1,
      icon: <MapPin className="w-8 h-8" />,
      title: "Prestigious Address",
      description:
        "Use The Hive location for business cards, websites, and legal documents",
    },
    {
      id: 2,
      icon: <Building2 className="w-8 h-8" />,
      title: "Meeting Rooms",
      description:
        "On-demand access to equipped rooms, day offices, and boardrooms at The Hive centres",
    },
  ];

  const benefits = [
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Enterprise Professionalism",
      subtitle: "Project enterprise-level credibility instantly",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "70% Cost Savings",
      subtitle: "Cut overheads compared to traditional offices",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Flexible Scaling",
      subtitle: "Scale effortlessly as your business grows",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Remote Freedom",
      subtitle: "Work from anywhere with complete flexibility",
    },
  ];

  const premiumFeatures = [
    {
      icon: <Wifi className="w-8 h-8" />,
      title: "Priority Meeting Bookings",
      description:
        "Exclusive access to premium boardrooms and video-equipped huddles with 24-hour reservations.",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Digital Compliance Toolkit",
      description:
        "Pre-formatted templates for GST filings, company docs, and e-signatures, plus dedicated admin support.",
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "Branded Reception Services",
      description:
        "Personalized video greetings, client check-ins, and virtual assistant hours for high-touch client interactions.",
    },
  ];

  return (
    <div className={`min-h-screen overflow-hidden ${
      theme === 'dark' ? 'bg-slate-950' : 'bg-white'
    }`}>
      {/* Hero: two-column */}
      <section className={`pt-20 pb-16 px-4 sm:px-6 lg:px-8 ${
        theme === 'dark' ? 'bg-slate-900' : 'bg-white'
      }`}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <span className={`inline-block mb-4 text-sm px-3 py-1 rounded-full border ${
              theme === 'dark' ? 'bg-orange-950 text-orange-400 border-orange-800' : 'bg-orange-50 text-orange-600 border-orange-100'
            }`}>
              Virtual Office
            </span>

            <h1 className={`text-4xl sm:text-5xl liber mb-6 leading-tight ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              The Hive Virtual Offices
            </h1>

            <p className={`text-lg mb-6 ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Use The Hive address for company registration, legal documents and professional credibility — without the cost of a physical office.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {benefits.slice(0,4).map((b, i) => (
                <div key={i} className={`flex items-start gap-3 border rounded-lg p-4 shadow-sm ${
                  theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                }`}>
                  <div className={`mt-1 ${
                    theme === 'dark' ? 'text-orange-500' : 'text-orange-600'
                  }`}>{b.icon}</div>
                  <div>
                    <div className={`${
                      theme === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}>{b.title}</div>
                    <div className={`text-sm ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                    }`}>{b.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button 
              onClick={handleContactSales}
              className="bg-gradient-to-br from-goldt via-gold to-goldt text-black py-3 px-6 rounded-lg inline-flex items-center gap-2 hover:shadow-lg transition-shadow">
                Get Virtual Office
                <ChevronRight className="w-4 h-4" />
              </button>
              <button onClick={() => setContactFormOpen && setContactFormOpen(true)} className={`bg-transparent border font-medium py-3 px-6 rounded-lg ${
                theme === 'dark' ? 'border-slate-600 text-white hover:bg-slate-800' : 'border-slate-200 text-slate-800 hover:bg-slate-50'
              }`}>
                Schedule a Tour
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className={`rounded-2xl overflow-hidden border shadow-lg ${
              theme === 'dark' ? 'border-slate-700' : 'border-gray-100'
            }`}>
              <div className={`bg-gradient-to-br p-2 ${
                theme === 'dark' ? 'from-slate-900 to-slate-800' : 'from-orange-50 to-white'
              }`}>
                <div className={`h-64 rounded-xl bg-[url('/virtual-offices2.jpg')] bg-center bg-cover flex items-center justify-center text-white ${
                  theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'
                }`}>
                  
                </div>
              </div>
              <p className={`px-3 text-2xl liber ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}> Prestigious business address</p>
              <div className={`p-6 ${
                theme === 'dark' ? 'bg-slate-800' : 'bg-white'
              }`}>
                <div className={`text-sm ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>Included</div>
                <ul className="mt-3 space-y-2">
                  <li className={`flex items-start gap-3 text-sm ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}><Check className="w-4 h-4 text-green-500 mt-1"/> Prestigious business address</li>
                  <li className={`flex items-start gap-3 text-sm ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}><Check className="w-4 h-4 text-green-500 mt-1"/> Meeting room credits</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Office Includes: single unified section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${
        theme === 'dark' ? 'bg-slate-800' : 'bg-gray-50'
      }`}>
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className={`text-3xl sm:text-4xl liber ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>Virtual Office Includes</h2>
          <p className={`mt-3 ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>Establish a professional presence with The Hive — everything you need without the cost of a physical office.</p>
        </div>

        <div className={`max-w-4xl mx-auto border rounded-2xl shadow-sm p-8 ${
          theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Prestigious Address</h4>
              <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Use The Hive location for GST registration, company filings, and official use.</p>
            </div>

            <div>
              <h4 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Branded Reception Services</h4>
              <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Personalized video greetings, client check-ins, and virtual assistant hours for professional client interactions.</p>
            </div>

            <div>
              <h4 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Meeting Rooms</h4>
              <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>On-demand access to equipped rooms, day offices, and boardrooms across The Hive centres.</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button type="button" onClick={handleContactSales} className="inline-flex items-center gap-2 bg-gradient-to-br from-goldt via-gold to-goldt text-black py-3 px-6 rounded-lg hover:shadow-lg transition-shadow">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Services + Learn More */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${
        theme === 'dark' ? 'bg-slate-900' : 'bg-white'
      }`}>
        <div className="max-w-6xl mx-auto items-start">
          <div className="my-2">
            <h2 className={`text-3xl liber mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>Premium Virtual Office Features at The Hive</h2>
            <p className={`mb-6 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>Elevate your virtual setup with these exclusive add-ons designed for seamless professional operations.</p>

            <div className="grid sm:grid-cols-3 gap-4">
              {premiumFeatures.map((p, i) => (
                <div key={i} className={`flex gap-3 items-start p-4 rounded-lg border ${
                  theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-300'
                }`}>
                  <div className={`${
                    theme === 'dark' ? 'text-orange-500' : 'text-orange-600'
                  }`}>{p.icon}</div>
                  <div>
                    <div className={`${
                      theme === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}>{p.title}</div>
                    <div className={`text-sm ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                    }`}>{p.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className={`p-6 rounded-2xl border ${
              theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-300'
            }`}>
              <h3 className={`text-xl mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>Get in touch</h3>
              <p className={`text-sm mb-4 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>Tell us about your requirements and we'll recommend the best plan.</p>
              <LearnMoreForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VirtualOffice;
