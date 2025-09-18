import React from 'react';
import { 
  Sofa, Users, Wifi, Phone, Gamepad2, Smartphone, Coffee, Gift, Shield,
  Sparkles, Settings, CheckCircle, DollarSign, MapPin, Car, Zap, Printer, Clock
} from 'lucide-react';

const AmenitiesSection = () => {
  const premiumAmenities = [
    { icon: Sofa, title: "Designer Furniture & Architectural Lighting" },
    { icon: Users, title: "Concierge & Personal Assistance" },
    { icon: Wifi, title: "High-Speed Internet & Secure IT Infrastructure" },
    { icon: Phone, title: "Private Phone Booths & Quiet Zones" },
    { icon: Coffee, title: "Premium Food & Beverage Services" },
    { icon: Gift, title: "Member-Exclusive Partnerships & Discounts" },
  ];

  const essentialAmenities = [
    { icon: Sparkles, title: "Daily Cleaning & Sanitisation" },
    { icon: Settings, title: "Easy Customisation" },
    { icon: Gamepad2, title: "Game Zones" },
    { icon: CheckCircle, title: "Hassle Free Setup" },
    { icon: DollarSign, title: "No Hidden Costs" },
    { icon: MapPin, title: "Pan India Access" },
    { icon: Car, title: "Parking" },
    { icon: Zap, title: "Power Backup" },
    { icon: Printer, title: "Printer & Scanner" },
    { icon: Clock, title: "Work 24x7" }
  ];

  return (
    <section className="min-h-screen bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        
        {/* Premium Amenities - Left Side */}
        <div className="bg-white p-8 lg:p-12 flex flex-col justify-center border-r border-gray-100">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-12">
              <div className="mb-6">
                <p className="text-black tracking-widest font-semibold text-xs bg-gray-100 px-4 py-2 inline-block">PREMIUM</p>
              </div>
              <h2 className="text-black font-extralight text-4xl mb-4">
                Unrivaled
                <span className="block font-bold text-black">Experience</span>
              </h2>
              <div className="bg-black h-1 w-8 mb-6"></div>
              <p className="text-gray-600 text-sm">Elevated workspace amenities</p>
            </div>
            
            <div className="space-y-6">
              {premiumAmenities.map((amenity, index) => {
                const IconComponent = amenity.icon;
                return (
                  <div key={index} className="flex items-center space-x-4 group">
                    <div className="w-12 h-12 bg-black rounded-none flex items-center justify-center group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                      <IconComponent className="w-6 h-6 text-white" strokeWidth={1.5} />
                    </div>
                    <span className="text-gray-800 group-hover:text-black group-hover:font-medium transition-all duration-300 text-sm">
                      {amenity.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Essential Amenities - Right Side */}
        <div className="bg-white p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-12">
              <p className="text-gray-500 tracking-wide font-normal text-xs mb-4">ESSENTIALS</p>
              <h2 className="text-black font-medium text-3xl mb-4 leading-tight">
                Core
                <span className="block font-normal text-gray-700">Amenities</span>
              </h2>
              <div className="bg-gray-400 h-px w-12 mb-6"></div>
              <p className="text-gray-500 text-sm">Everything you need to work</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {essentialAmenities.map((amenity, index) => {
                const IconComponent = amenity.icon;
                return (
                  <div key={index} className="text-center group">
                    <div className="w-12 h-12 border border-gray-300 bg-white rounded-none flex items-center justify-center mx-auto mb-3 group-hover:border-gray-400 transition-all duration-300">
                      <IconComponent className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
                    </div>
                    <span className="text-gray-600 text-xs leading-tight block">
                      {amenity.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;