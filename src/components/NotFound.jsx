import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-6xl w-full flex items-center justify-between">
        {/* Left side - SVG Illustration */}
        <div className="flex-1 max-w-lg">
          <svg
            viewBox="0 0 400 300"
            className="w-full h-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background elements */}
            <circle cx="320" cy="60" r="8" fill="#f3f4f6" />
            <circle cx="350" cy="90" r="4" fill="#f3f4f6" />
            <circle cx="30" cy="40" r="6" fill="#f3f4f6" />
            
            {/* Lost person figure */}
            <g transform="translate(180, 120)">
              {/* Head */}
              <circle cx="0" cy="-30" r="15" stroke="#000" strokeWidth="2" fill="none" />
              
              {/* Body */}
              <line x1="0" y1="-15" x2="0" y2="30" stroke="#000" strokeWidth="2" />
              
              {/* Arms - one scratching head, one hanging */}
              <line x1="0" y1="0" x2="-20" y2="-10" stroke="#000" strokeWidth="2" />
              <line x1="-20" y1="-10" x2="-15" y2="-25" stroke="#000" strokeWidth="2" />
              <line x1="0" y1="5" x2="18" y2="10" stroke="#000" strokeWidth="2" />
              
              {/* Legs */}
              <line x1="0" y1="30" x2="-12" y2="50" stroke="#000" strokeWidth="2" />
              <line x1="0" y1="30" x2="12" y2="50" stroke="#000" strokeWidth="2" />
              
              {/* Question mark above head */}
              <text x="25" y="-35" fontSize="24" fill="#000" fontFamily="serif">?</text>
            </g>
            
            {/* Maze/path elements */}
            <g stroke="#000" strokeWidth="1.5" fill="none">
              <path d="M50 200 L120 200 L120 150 L90 150" />
              <path d="M140 150 L170 150 L170 180 L200 180" />
              <path d="M220 180 L280 180 L280 220 L320 220" />
              <path d="M340 220 L370 220" />
              
              {/* Dead ends */}
              <path d="M90 130 L90 140" />
              <path d="M200 160 L210 160" />
              <path d="M280 200 L290 200" />
            </g>
            
            {/* Signposts */}
            <g>
              <rect x="100" y="80" width="40" height="8" fill="#000" />
              <line x1="120" y1="88" x2="120" y2="110" stroke="#000" strokeWidth="2" />
              <polygon points="140,84 155,84 152,80 152,88" fill="#000" />
              
              <rect x="280" y="120" width="35" height="6" fill="#000" />
              <line x1="297" y1="126" x2="297" y2="145" stroke="#000" strokeWidth="2" />
              <polygon points="315,123 325,123 322,119 322,127" fill="#000" />
            </g>
            
            {/* Floating geometric shapes for visual interest */}
            <rect x="60" y="60" width="12" height="12" stroke="#000" strokeWidth="1" fill="none" transform="rotate(15 66 66)" />
            <polygon points="300,40 310,50 300,60 290,50" stroke="#000" strokeWidth="1" fill="none" />
          </svg>
        </div>

        {/* Right side - Content */}
        <div className="flex-1 max-w-md ml-12">
          <div className="space-y-6">
            {/* 404 Number */}
            <div className="space-y-2">
              <h1 className="text-8xl font-light text-black leading-none">404</h1>
              <div className="w-16 h-px bg-black"></div>
            </div>

            {/* Main message */}
            <div className="space-y-4">
              <h2 className="text-2xl font-light text-black">
                You seem lost
              </h2>
              <p className="text-gray-600 leading-relaxed">
                The page you're looking for has wandered off the beaten path. 
                Don't worry though, even the best explorers sometimes lose their way.
              </p>
            </div>

            {/* Action buttons */}
            <div className="space-y-3 pt-4">
              
              <button 
                onClick={() => navigate('/')}
                className="w-full py-3 px-6 bg-black text-white font-light hover:bg-gray-800 transition-colors duration-300"
              >
                Take Me Home
              </button>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;