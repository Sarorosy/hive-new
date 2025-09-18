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
    { icon: Shield, title: "Secure Access & 24/7 Surveillance" },
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
        <div className="bg-black text-white p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-12">
              <p className="text-gray-400 text-sm mb-4 tracking-widest">PREMIUM</p>
              <h2 className="text-3xl lg:text-4xl font-light mb-4 leading-tight">
                Unrivaled
                <span className="block font-bold">Experience</span>
              </h2>
              <div className="w-16 h-px bg-white mb-6"></div>
              <p className="text-gray-300 text-sm">Elevated workspace amenities</p>
            </div>
            
            <div className="space-y-6">
              {premiumAmenities.slice(0, 6).map((amenity, index) => {
                const IconComponent = amenity.icon;
                return (
                  <div key={index} className="flex items-center space-x-4 group">
                    <div className="w-12 h-12 bg-white bg-opacity-10 rounded-full flex items-center justify-center group-hover:bg-opacity-20 transition-all duration-300">
                      <IconComponent className="w-6 h-6 text-white" strokeWidth={1.5} />
                    </div>
                    <span className="text-white group-hover:text-gray-200 transition-colors duration-300 text-sm">
                      {amenity.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Essential Amenities - Right Side */}
        <div className="bg-gray-50 p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-12">
              <p className="text-gray-500 text-sm mb-4 tracking-widest">ESSENTIALS</p>
              <h2 className="text-3xl lg:text-4xl font-light text-black mb-4 leading-tight">
                Core
                <span className="block font-bold">Amenities</span>
              </h2>
              <div className="w-16 h-px bg-black mb-6"></div>
              <p className="text-gray-600 text-sm">Everything you need to work</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {essentialAmenities.map((amenity, index) => {
                const IconComponent = amenity.icon;
                return (
                  <div key={index} className="text-center group">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-gray-700 transition-colors duration-300">
                      <IconComponent className="w-6 h-6 text-white" strokeWidth={1.5} />
                    </div>
                    <span className="text-gray-700 text-xs leading-tight block">
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