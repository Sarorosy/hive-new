import React from 'react';
import virtual from '../../assets/virtual-preview.png';

const StartWithUs = () => {
  return (
    <div className="bg-gray-50  py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold font-serif text-gray-900 mb-16 text-left">
          Start your journey with us
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Take a tour card */}
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
            <div className="mb-6">
              <img
                src={virtual}
                alt="Benefits workspace"
                className="w-20 h-20 object-cover"
              />
            </div>
            
            <h3 className="text-xl font-medium text-gray-900 mb-4">Take a tour</h3>
            <p className="text-gray-600 leading-relaxed">
              Schedule a tour and speak with our representative at one of the Hive centres in your city
            </p>
          </div>

          {/* Choose an office card */}
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
            <div className="mb-6">
              <svg width="100" height="100" viewBox="0 0 80 80" className="mb-4">
                {/* Isometric office illustration */}
                <g>
                  {/* Main office structure - isometric cube */}
                  <path d="M15 45 L40 30 L65 45 L65 60 L40 75 L15 60 Z" 
                        fill="none" stroke="#333" strokeWidth="1.5" />
                  
                  {/* Top face */}
                  <path d="M15 45 L40 30 L65 45 L40 60 Z" fill="#f3f4f6" stroke="#333" strokeWidth="1.5" />
                  
                  {/* Left face */}
                  <path d="M15 45 L15 60 L40 75 L40 60 Z" fill="#e5e7eb" stroke="#333" strokeWidth="1.5" />
                  
                  {/* Right face */}
                  <path d="M40 60 L40 75 L65 60 L65 45 Z" fill="#d1d5db" stroke="#333" strokeWidth="1.5" />
                  
                  {/* Yellow accent hexagon in center */}
                  <path d="M35 50 L40 47 L45 50 L45 56 L40 59 L35 56 Z" fill="#D4AF37" />
                  
                  {/* Interior details */}
                  <g stroke="#333" strokeWidth="0.8" fill="none">
                    {/* Desk/furniture lines */}
                    <line x1="25" y1="42" x2="30" y2="39" />
                    <line x1="25" y1="44" x2="30" y2="41" />
                    <line x1="50" y1="39" x2="55" y2="42" />
                    <line x1="50" y1="41" x2="55" y2="44" />
                    
                    {/* Grid lines for floor */}
                    <line x1="20" y1="48" x2="35" y2="40" opacity="0.3" />
                    <line x1="45" y1="40" x2="60" y2="48" opacity="0.3" />
                    <line x1="25" y1="52" x2="40" y2="44" opacity="0.3" />
                    <line x1="40" y1="44" x2="55" y2="52" opacity="0.3" />
                  </g>
                  
                  {/* Small furniture elements */}
                  <rect x="22" y="40" width="4" height="2" fill="#9ca3af" />
                  <rect x="52" y="40" width="4" height="2" fill="#9ca3af" />
                </g>
              </svg>
            </div>
            
            <h3 className="text-xl font-medium text-gray-900 mb-4">Choose an office</h3>
            <p className="text-gray-600 leading-relaxed">
              No matter the size of your team, choose an office that suits your needs
            </p>
          </div>

          {/* Move-in card */}
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
            <div className="mb-6">
              <svg width="100" height="100" viewBox="0 0 80 80" className="mb-4">
                {/* Key tag illustration */}
                <g>
                  {/* Key tag shape */}
                  <path d="M20 25 L55 25 C60 25 60 30 60 35 L60 50 C60 55 55 55 50 55 L25 55 C20 55 15 50 15 45 L15 35 C15 30 20 25 20 25 Z" 
                        fill="#D4AF37" stroke="#333" strokeWidth="1.5" />
                  
                  {/* Hole for key ring */}
                  <circle cx="52" cy="40" r="4" fill="white" stroke="#333" strokeWidth="1.5" />
                  <circle cx="52" cy="40" r="2" fill="white" stroke="#333" strokeWidth="1" />
                  
                  {/* Text on tag */}
                  <g fill="#333" fontSize="8" fontFamily="Arial, sans-serif">
                    <text x="25" y="35" fontSize="6" fontWeight="bold">THE</text>
                    <text x="25" y="45" fontSize="6" fontWeight="bold">HIVE</text>
                  </g>
                  
                  {/* Key ring */}
                  <circle cx="52" cy="40" r="6" fill="none" stroke="#666" strokeWidth="1.2" />
                  
                  {/* Motion lines suggesting movement */}
                  <g stroke="#666" strokeWidth="1" opacity="0.6">
                    <path d="M62 35 Q68 35 70 30" fill="none" strokeDasharray="2,2" />
                    <path d="M62 40 Q70 40 72 35" fill="none" strokeDasharray="2,2" />
                    <path d="M62 45 Q68 45 70 50" fill="none" strokeDasharray="2,2" />
                  </g>
                  
                  {/* Small arrow indicating direction */}
                  <path d="M65 38 L68 40 L65 42" fill="none" stroke="#666" strokeWidth="1.5" strokeLinecap="round" />
                </g>
              </svg>
            </div>
            
            <h3 className="text-xl font-medium text-gray-900 mb-4">Move-in</h3>
            <p className="text-gray-600 leading-relaxed">
              Make yourself at home. We'll make sure your office is fully operational so you can get straight to work from day one
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartWithUs;