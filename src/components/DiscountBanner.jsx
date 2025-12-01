import React from 'react';
import { ArrowRight, Quote } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

import picture from "../assets/raw/all/RAJA8221-min.JPG";

export default function DiscountBanner() {

    const { setContactFormOpen } = useOutletContext();

    return (
        <div className="max-w-7xl mx-auto p-3">
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-900">
                <div className="flex items-stretch min-h-[350px]">
                    {/* Image Section */}
                    <div className="flex-1 relative group">
                        <div className="h-full overflow-hidden relative">
                            <img
                                src={picture}
                                loading='lazy'
                                alt="Elegant coworking space with private meeting rooms"
                                className="w-full h-full object-cover filter brightness-95 contrast-110 transition-transform duration-700"
                            />
                           
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 px-16 py-10 relative bg-white flex flex-col justify-center">
                        <div className="relative z-10">
                            {/* Quote Icon */}
                            <Quote className="w-8 h-8 text-gray-300 mb-4" fill="currentColor" />

                            {/* Main Headline */}
                            <h1 className="text-5xl liber font-bold text-black mb-4 leading-tight tracking-tight">
                                Exclusive Offer
                            </h1>

                            {/* Discount Text */}
                            <div className="flex items-baseline gap-4 mb-6">
                                <span className="text-8xl liber font-black text-black leading-none">25</span>
                                <div className="flex flex-col">
                                    <span className="text-2xl liber font-bold text-black">% OFF</span>
                                    <div className="h-1 w-16 bg-black mt-1"></div>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-xl liber text-gray-700 mb-2 leading-relaxed">
                                on our premium private space solutions
                            </p>

                            {/* Terms */}
                            <p className="text-gray-400 text-sm mb-12 liber uppercase tracking-wide">
                                Terms & Conditions Apply*
                            </p>

                            {/* CTA Section */}
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => { setContactFormOpen(true) }}
                                    className="group bg-black text-white px-8 py-3 cursor-pointer liber font-semibold text-base tracking-wide uppercase transition-all duration-300 hover:bg-gray-800 hover:tracking-widest relative overflow-hidden">
                                    <span className="relative z-10 flex items-center gap-2">
                                        Get in Touch
                                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                                </button>

                                {/* Additional accent */}
                                <div className="flex items-center gap-2 text-gray-400">
                                    <div className="w-8 h-px bg-gray-300"></div>
                                    <span className="text-xs liber italic">Limited time</span>
                                </div>
                            </div>
                        </div>

                        {/* Large background number */}
                        <div className="absolute -top-4 -right-8 text-gray-50 text-[200px] liber font-black select-none leading-none -z-10">
                            25
                        </div>

                        {/* Corner decoration */}
                        
                    </div>
                </div>
            </div>
        </div>
    );
}