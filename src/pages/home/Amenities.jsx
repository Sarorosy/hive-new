import React from 'react';
import { 
  Wifi, Car, Zap, Printer, Clock, Sparkles, 
  Settings, Gamepad2, CheckCircle, Users, 
  DollarSign, MapPin
} from 'lucide-react';

const Amenities = () => {
  const amenities = [
    { icon: Sparkles, label: "Daily Cleaning & Sanitisation" },
    { icon: Settings, label: "Easy customisation" },
    { icon: Gamepad2, label: "Game Zones" },
    { icon: CheckCircle, label: "Hassle Free Setup" },
    { icon: Wifi, label: "High Speed Wi-Fi" },
    { icon: Users, label: "Meeting room" },
    { icon: DollarSign, label: "No Hidden Costs" },
    { icon: MapPin, label: "Pan India Access" },
    { icon: Car, label: "Parking" },
    { icon: Zap, label: "Power backup" },
    { icon: Printer, label: "Printer & Scanner" },
    { icon: Clock, label: "Work 24x7" }
  ];

  const duplicatedAmenities = [...amenities, ...amenities, ...amenities];

  return (
    <div className="w-full overflow-hidden bg-gray-50 py-8 sm:py-12">
      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 w-16 sm:w-32 h-full bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-16 sm:w-32 h-full bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
        
        {/* Marquee */}
        <div className="flex animate-marquee hover:pause-marquee">
          {duplicatedAmenities.map((amenity, index) => {
            const IconComponent = amenity.icon;
            return (
              <div
                key={index}
                className="flex-shrink-0 mx-3 sm:mx-6 flex flex-col items-center justify-center p-2 sm:p-3 transition-all duration-300 hover:scale-105 group min-w-[80px] sm:min-w-[100px]"
              >
                <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-black rounded-full group-hover:bg-orange-500 transition-all duration-300">
                  <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <p className="text-center text-xs sm:text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                  {amenity.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      
      
    </div>
  );
};

export default Amenities;
