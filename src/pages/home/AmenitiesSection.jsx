import React from "react";
import {
  Sofa, Users, Wifi, Phone, Gamepad2, Smartphone, Coffee, Gift, Shield,
  Sparkles, Settings, CheckCircle, DollarSign, MapPin, Car, Zap, Printer, Clock
} from "lucide-react";

const AmenitiesSection = () => {
  const premiumAmenities = [
    { icon: Sofa, title: "Designer Furniture & Architectural Lighting" },
    { icon: Users, title: "Concierge & Personal Assistance" },
    { icon: Wifi, title: "High-Speed Internet & Secure IT Infrastructure" },
    { icon: Phone, title: "Private Phone Booths & Quiet Zones" },
    { icon: Coffee, title: "Premium Food & Beverage Services" },
    { icon: Gift, title: "Member-Exclusive Partnerships & Discounts" },
    { icon: Sparkles, title: "Daily Cleaning & Sanitisation" },
    { icon: Settings, title: "Easy Customisation" },
    { icon: Gamepad2, title: "Game Zones" },
    { icon: CheckCircle, title: "Hassle Free Setup" },
    { icon: DollarSign, title: "No Hidden Costs" },
    { icon: MapPin, title: "Pan India Access" },
    { icon: Car, title: "Parking" },
    { icon: Zap, title: "Power Backup" },
    { icon: Printer, title: "Printer & Scanner" },
    { icon: Clock, title: "Work 24x7" },
  ];

  return (
    <section className="bg-white py-16 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">

        {/* Title Section */}
        <div className="mb-12 text-center">
          <h2 className="text-black font-medium text-3xl mb-4 leading-tight">
            Premium Workspace <span className="font-normal text-gray-700">Amenities</span>
          </h2>
          <p className="text-gray-600 text-sm">Designed for comfort, productivity, and style</p>

        </div>

        {/* Continuous Marquee */}
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-marquee">
            {[...Array(2)].map((_, repeatIndex) => (
              <div key={repeatIndex} className="flex whitespace-nowrap">
                {premiumAmenities.map((amenity, index) => {
                  const IconComponent = amenity.icon;
                  const isBlack = (index + repeatIndex) % 2 === 0;

                  return (
                    <div
                      key={index + "-" + repeatIndex}
                      className="mx-4 group relative flex items-center justify-center"
                    >
                      {/* Small Box */}
                      <div
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={amenity.title}
                        className={`w-12 h-12 flex items-center justify-center transition-all duration-300 rounded-md
                        ${isBlack ? "bg-black text-white" : "bg-white text-black border"}`}
                      >
                        <IconComponent
                          className={`w-6 h-6 ${isBlack ? "text-white" : "text-black"}`}
                          strokeWidth={1.5}
                        />
                      </div>

                      {/* Tooltip */}
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 rounded-md text-xs bg-gray-900 text-white shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:flex z-10 transition-opacity duration-200">
                        {amenity.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee Animation */}
      <style jsx>{`
        .animate-marquee {
          width: max-content;
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default AmenitiesSection;
