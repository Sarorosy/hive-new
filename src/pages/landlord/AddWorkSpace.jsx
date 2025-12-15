"use client";

import React, { useState } from "react";
import {
    Building2,
    Briefcase,
    Settings,
    Image,
    ShieldCheck,
    ArrowLeft,
    ArrowRight,
    Send
} from "lucide-react";

import {
    Wifi,      // Technology
    Wrench,    // Utilities
    Users,     // Community
    Headset,   // Support
    Heart,     // Health & Wellness
} from "lucide-react";
import { useOutletContext } from "react-router-dom";


const AddWorkSpace = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({});

    
const {theme} = useOutletContext();

const steps = [
    { label: "Add Your Coworking Space", icon: Building2 },
    { label: "Business Details", icon: Briefcase },
    { label: "Amenities & Facilities", icon: Settings },
    { label: "Gallery & Social Media", icon: Image },
    { label: "OTP Verification", icon: ShieldCheck },
];

const amenityCategories = [
    {
        title: "Facilities",
        icon: <Building2 className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />,
        items: [
            "Meeting Room", "Conference Room", "Event Space", "Studio Space",
            "Retail Space", "Co-living Space", "Outdoor area", "Parking", "Cafe"
        ]
    },
    {
        title: "Workspace Amenities",
        icon: <Briefcase className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />,
        items: [
            "Dedicated Desks", "Hot Desks", "Virtual Office", "Private Office",
            "Collaboration areas", "Lounge areas", "Quiet zones", "Phone booths",
            "Standing desks", "Ergonomic chairs", "Natural lighting", "Soundproofing"
        ]
    },
    {
        title: "Technology and Connectivity",
        icon: <Wifi className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />,
        items: [
            "Wi-Fi", "Ethernet", "Video conferencing"
        ]
    },
    {
        title: "Utilities and Services",
        icon: <Wrench className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />,
        items: [
            "Printing", "Scanning", "Mail handling", "Receptionist",
            "Security access controls", "CCTV", "Cleaning services",
            "Power Backup", "Locker storage"
        ]
    },
    {
        title: "Community and Networking",
        icon: <Users className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />,
        items: [
            "Collaboration areas", "Event Space"
        ]
    },
    {
        title: "Support and Resources",
        icon: <Headset className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />,
        items: [
            "Mail handling", "Receptionist"
        ]
    },
    {
        title: "Health and Wellness",
        icon: <Heart className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />,
        items: [
            "Ergonomic chairs", "Natural lighting"
        ]
    }
];


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const nextStep = () => {
        if (step < steps.length - 1) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 0) setStep(step - 1);
    };

    const commonInputStyle = `border ${theme === 'dark' ? 'border-white' : 'border-black'} bg-transparent px-4 py-2 w-full ${theme === 'dark' ? 'placeholder-gray-400' : 'placeholder-gray-500'} focus:outline-none focus:ring-1 ${theme === 'dark' ? 'focus:ring-white' : 'focus:ring-black'} transition`;

    const renderStep = () => {
        switch (step) {
            case 0:
                return (
                    <div>
                        <h2 className="text-2xl liber font-bold mb-4">
                            Add Your Coworking Space
                        </h2>
                        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
                            Ready to showcase your coworking space to a global audience? Join our
                            community and gain exposure to thousands of professionals.
                        </p>
                        <div className="grid gap-4">
                            <input
                                name="name"
                                placeholder="Your Name"
                                className={commonInputStyle}
                                onChange={handleChange}
                            />
                            <input
                                name="email"
                                placeholder="Your Email"
                                className={commonInputStyle}
                                onChange={handleChange}
                            />
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                className={commonInputStyle}
                                onChange={handleChange}
                            />
                            <input
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                className={commonInputStyle}
                                onChange={handleChange}
                            />
                            <input
                                name="businessName"
                                placeholder="Business Name"
                                className={commonInputStyle}
                                onChange={handleChange}
                            />
                            <div>
                                <label className="block liber mb-2">Locations</label>
                                <div className="flex gap-6 text-sm">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="locationType"
                                            value="single"
                                            onChange={handleChange}
                                        />
                                        Single
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="locationType"
                                            value="multiple"
                                            onChange={handleChange}
                                        />
                                        Multiple
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 1:
                return (
                    <div>
                        <h2 className="text-2xl liber font-bold mb-4">
                            Business Details
                        </h2>
                        <div className="grid gap-4">
                            <div>
                                <label className="block liber">Opening Days</label>
                                <input
                                    name="openingDays"
                                    placeholder="e.g. Mon - Fri"
                                    className={commonInputStyle}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex gap-4">
                                <input
                                    name="startTime"
                                    type="time"
                                    className={commonInputStyle}
                                    onChange={handleChange}
                                />
                                <input
                                    name="endTime"
                                    type="time"
                                    className={commonInputStyle}
                                    onChange={handleChange}
                                />
                            </div>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="open24h"
                                    onChange={handleChange}
                                />
                                24 Hours
                            </label>

                            <div>
                                <label className="block liber">Book Tour Days</label>
                                <input
                                    name="tourDays"
                                    placeholder="e.g. Mon - Sat"
                                    className={commonInputStyle}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex gap-4">
                                <input
                                    name="tourStartTime"
                                    type="time"
                                    className={commonInputStyle}
                                    onChange={handleChange}
                                />
                                <input
                                    name="tourEndTime"
                                    type="time"
                                    className={commonInputStyle}
                                    onChange={handleChange}
                                />
                            </div>
                            <textarea
                                name="overview"
                                placeholder="Overview"
                                className={`${commonInputStyle} min-h-[120px]`}
                                onChange={handleChange}
                            />
                            {["address", "country", "postcode", "contactPerson", "website", "email", "phone", "whatsapp"].map((field) => (
                                <input
                                    key={field}
                                    name={field}
                                    placeholder={field
                                        .replace(/([A-Z])/g, " $1")
                                        .replace(/^./, (str) => str.toUpperCase())}
                                    className={commonInputStyle}
                                    onChange={handleChange}
                                />
                            ))}
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div>
                        <h2 className="text-2xl liber font-bold mb-4">
                            Amenities & Facilities
                        </h2>

                        {amenityCategories.map((category, idx) => (
                            <div key={idx} className="mb-6">
                                <h3 className={`flex items-center gap-2 text-lg font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'} mb-2`}>
                                    {category.icon}
                                    {category.title}
                                </h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {category.items.map((item, i) => (
                                        <label key={i} className="flex items-center gap-2 text-sm">
                                            <input
                                                type="checkbox"
                                                name={item}
                                                onChange={handleChange}
                                            />
                                            {item}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                );

            case 3:
                return (
                    <div>
                        <h2 className="text-2xl liber font-bold mb-4">
                            Gallery & Social Media
                        </h2>
                        <div className="grid gap-4">
                            {["Facebook", "Twitter", "Linkedin", "Instagram", "Youtube", "Tiktok"].map(
                                (platform) => (
                                    <input
                                        key={platform}
                                        name={platform.toLowerCase()}
                                        placeholder={platform}
                                        className={commonInputStyle}
                                        onChange={handleChange}
                                    />
                                )
                            )}
                            <label className="block liber">Photos & Videos</label>
                            <input
                                type="file"
                                multiple
                                className={`${commonInputStyle} file:border-0 ${theme === 'dark' ? 'file:bg-white file:text-black' : 'file:bg-black file:text-white'}`}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div>
                        <h2 className="text-2xl liber font-bold mb-4">
                            OTP Verification
                        </h2>
                        <input
                            name="otp"
                            placeholder="Enter OTP"
                            className={commonInputStyle}
                            onChange={handleChange}
                        />
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <section className={`max-w-4xl mx-auto py-10 px-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            {/* Stepper */}
            <div className="flex justify-between items-center mb-10">
                {steps.map((stepData, index) => {
                    const Icon = stepData.icon;
                    return (
                        <div key={index} className="flex-1 flex flex-col items-center">
                            <div
                                className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${index === step
                                        ? `${theme === 'dark' ? 'bg-white text-black border-white' : 'bg-black text-white border-black'}`
                                        : `${theme === 'dark' ? 'bg-black border-gray-600 text-gray-600' : 'bg-white border-gray-400 text-gray-400'}`
                                    } transition`}
                            >
                                <Icon size={20} />
                            </div>
                            <p
                                className={`mt-2 text-xs text-center liber ${index === step ? `${theme === 'dark' ? 'text-white' : 'text-black'} font-bold` : `${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}`}
                            >
                                {stepData.label}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Step Form */}
            <div className={`${theme === 'dark' ? 'bg-black border-white' : 'bg-white border-black'} border rounded-lg p-6 shadow-sm`}>
                {renderStep()}

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                    {step > 0 && (
                        <button
                            onClick={prevStep}
                            className={`flex items-center gap-2 border ${theme === 'dark' ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'} px-6 py-2 transition`}
                        >
                            <ArrowLeft size={18} /> Back
                        </button>
                    )}
                    {step < steps.length - 1 ? (
                        <button
                            onClick={nextStep}
                            className={`ml-auto flex items-center gap-2 border ${theme === 'dark' ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'} px-6 py-2 transition`}
                        >
                            Next <ArrowRight size={18} />
                        </button>
                    ) : (
                        <button
                            onClick={() => console.log("Submit form", formData)}
                            className={`ml-auto flex items-center gap-2 border ${theme === 'dark' ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'} px-6 py-2 transition`}
                        >
                            Submit <Send size={18} />
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AddWorkSpace;
