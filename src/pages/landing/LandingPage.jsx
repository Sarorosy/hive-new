import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { centersData } from "../../data/centersData";
import {
    MapPin,
    Mail,
    Phone,
    Clock,
    Wifi,
    Users,
    Coffee,
    Printer,
    PhoneCall,
    Gamepad2,
    Building,
    TrainFront,
    Wallet,
    Presentation,
} from "lucide-react";
import ContactForm from "../../components/ContactForm";
import LandingHeroForm from "../../components/landing/LandingHeroForm";
import HowItWorks from "../../components/landing/HowItWorks";
import Faq from '../home/Faq';
import Members from "../home/Members";
import WhyChooseHive from "./WhyChooseHive";
import { motion } from "framer-motion";
import LearnMoreForm from "../../components/LearnMoreForm";

// Address and size data mapping (reused from Center.jsx to ensure consistency)
const branchAddresses = {
    "chennai-anna-nagar": {
        address: "Level 3, VR Chennai, Jawaharlal Nehru Road, Anna Nagar, Chennai, Tamil Nadu, India",
        email: "chennai@thehive.com",
        phone: "+91 44 6633 7777",
        metro: "Anna Nagar Metro Station (5 mins walk away)",
        hours: "Open 24/7"
    },
    "chennai-omr": {
        address: "SRP Stratford, Old Mahabalipuram Road (OMR), Perungudi, Chennai, Tamil Nadu, India",
        email: "omr@thehive.com",
        phone: "+91 44 6633 7778",
        metro: "Perungudi Metro Station (3 mins walk away)",
        hours: "Open 24/7"
    },
    "chennai-skcl-guindy": {
        address: "SKCL Guindy, Chennai, Tamil Nadu, India",
        email: "guindy@thehive.com",
        phone: "+91 44 6633 7779",
        metro: "Guindy Metro Station (2 mins walk away)",
        hours: "Open 24/7"
    },
    "chennai-porur": {
        address: "Level 3, Keppal One Paramount, Mount Poonamallee Road, Porur, Chennai, Tamil Nadu 600116, India",
        email: "porur@thehive.com",
        phone: "+91 44 6633 7780",
        metro: "Porur Metro Station (4 mins walk away)",
        hours: "Open 24/7"
    },
    "bangalore-whitefield": {
        address: "ITPL Main Road, Whitefield, Bangalore, Karnataka, India",
        email: "whitefield@thehive.com",
        phone: "+91 80 6633 7777",
        metro: "Whitefield Metro Station (5 mins walk away)",
        hours: "Open 24/7"
    },
    "bangalore-ptp": {
        address: "Prestige Tech Platina, Bangalore, Karnataka, India",
        email: "ptp@thehive.com",
        phone: "+91 80 6633 7778",
        metro: "Kadubeesanahalli Metro Station (3 mins walk away)",
        hours: "Open 24/7"
    },
    "hyderabad-gachibowli": {
        address: "Corporate Capital, Financial District, next to Sheraton Hyderabad Hotel, Gachibowli, Hyderabad, Telangana, India",
        email: "gachibowli@thehive.com",
        phone: "+91 40 6633 7777",
        metro: "Gachibowli Metro Station (3 mins walk away)",
        hours: "Open 24/7"
    },
    "pune-mills": {
        address: "The Mills at RBCC, Raja Bahadur Mill Road, behind Sheraton Grand Hotel, Sangamwadi, Pune, Maharashtra, India",
        email: "mills@thehive.com",
        phone: "+91 20 6633 7777",
        metro: "Sangamwadi Metro Station (2 mins walk away)",
        hours: "Open 24/7"
    },
};

const amenities = [
    { icon: Wifi, name: "High-Speed Internet" },
    { icon: Users, name: "Meeting Rooms" },
    { icon: Coffee, name: "Premium Pantry" },
    { icon: Printer, name: "Printing & Scanning" },
    { icon: PhoneCall, name: "Phone Booths" },
    { icon: Gamepad2, name: "Game Lounge" },
    { icon: Building, name: "24/7 Access" },
    { icon: Users, name: "Concierge Services" },
];

function LandingPage() {
    const { branch } = useParams();
    const navigate = useNavigate();
    const [branchData, setBranchData] = useState(null);
    const [cityData, setCityData] = useState(null);
    const [loading, setLoading] = useState(true);

    const { theme } = useOutletContext();
    const isDark = theme === "dark";

    // Find branch data across all cities
    useEffect(() => {
        if (!branch) return;

        let foundBranch = null;
        let foundCity = null;
        let foundCityKey = null;

        Object.entries(centersData).forEach(([cityKey, city]) => {
            if (city.branches && city.branches[branch]) {
                foundBranch = city.branches[branch];
                foundCity = city;
                foundCityKey = cityKey;
            }
        });

        if (foundBranch) {
            setBranchData({ ...foundBranch, id: branch, cityKey: foundCityKey });
            setCityData(foundCity);
        } else {
            console.error("Branch not found:", branch);
            // navigate("/404");
        }
        setLoading(false);
    }, [branch, navigate]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!branchData) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold mb-4">Branch Not Found</h1>
                <p className="mb-4">The requested branch "{branch}" could not be found.</p>
                <button
                    onClick={() => navigate('/')}
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                    Go Home
                </button>
            </div>
        );
    }

    // Construct ID for address lookup
    const addressKey = `${branchData.cityKey}-${branchData.slug}`;
    const addressInfo = branchAddresses[addressKey];
    const cityDisplayName = branchData.cityKey.charAt(0).toUpperCase() + branchData.cityKey.slice(1);

    return (
        <div className="min-h-screen bg-white pt-15 text-gray-900">
            {/* New Hero Section */}
            <div className="relative w-full h-auto  flex items-center py-12 lg:py-0">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={branchData.images?.[0]}
                        alt={branchData.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                <div className="relative z-10 container mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        {/* Left Content */}
                        <div className="text-white space-y-6">
                            <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold leading-tight">
                                Ready to move-in Coworking <br />
                                <span className="text-white">Spaces in {cityDisplayName}</span>
                            </h1>
                            <p className="text-lg md:text-xl text-white/90 max-w-lg">
                                Choose between fixed seats, private cabins or serviced offices at prime locations in {cityDisplayName}
                            </p>

                            {/* Features Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                                <div className="flex items-center gap-3">
                                    <Wallet className="w-6 h-6 text-white" />
                                    <span className="text-white/90">Zero Brokerage</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock className="w-6 h-6 text-white" />
                                    <span className="text-white/90">&lt; 2 hour response time</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <TrainFront className="w-6 h-6 text-white" />
                                    <span className="text-white/90">Metro Connectivity</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Users className="w-6 h-6 text-white" />
                                    <span className="text-white/90">For all team sizes: 1 to 500</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Content - Form */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="w-full max-w-xl py-6">
                                <LandingHeroForm city={cityDisplayName} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

                <div className="space-y-8">

                    {/* ABOUT + AMENITIES */}
                    <div className="grid md:grid-cols-2 gap-8 items-start">

                        {/* About Section */}
                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900">
                                About the Space
                            </h2>

                            <p className="text-sm text-gray-700 leading-relaxed">
                                {branchData.details}
                            </p>

                            {addressInfo && (
                                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                        <MapPin className="w-4 h-4 text-[#1a3a5c] mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs font-semibold text-gray-900">Address</p>
                                            <p className="text-xs text-gray-600 leading-snug">
                                                {addressInfo.address}
                                            </p>
                                        </div>
                                    </div>

                                    {addressInfo.metro && (
                                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                            <MapPin className="w-4 h-4 text-[#1a3a5c] mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-xs font-semibold text-gray-900">
                                                    Nearby Metro
                                                </p>
                                                <p className="text-xs text-gray-600">
                                                    {addressInfo.metro}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </section>

                        {/* Amenities */}
                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Premium Amenities
                            </h2>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {amenities.map((item, idx) => {
                                    const Icon = item.icon;
                                    return (
                                        <div
                                            key={idx}
                                            className="flex flex-col items-center text-center p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition"
                                        >
                                            <div className="w-9 h-9 rounded-full bg-[#1a3a5c]/5 flex items-center justify-center mb-2">
                                                <Icon className="w-4 h-4 text-[#1a3a5c]" />
                                            </div>
                                            <span className="text-xs font-medium text-gray-800">
                                                {item.name}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                    </div>

                    {/* MAP */}
                    {branchData.map && (
                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Location
                            </h2>

                            <div className="h-[320px] rounded-xl overflow-hidden border border-gray-200">
                                <iframe
                                    src={branchData.map}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Location Map"
                                />
                            </div>
                        </section>
                    )}

                </div>
            </div>
            <div className="bg-white">
                <HowItWorks />
            </div>
            <Members />
            <WhyChooseHive cityDisplayName={cityDisplayName} />

            <div className="text-center max-w-4xl mx-auto px-4 pt-12 pb-4">
                <h2 className={`text-2xl md:text-4xl liber mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                    Flexible workspace solutions for fast-growing businesses
                </h2>
                <p className={`text-sm md:text-base leading-relaxed max-w-2xl mx-auto ${isDark ? "text-slate-300" : "text-gray-600"}`}>
                 <span className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>The Hive Workspaces</span> delivers private offices, managed floors, and custom build-to-suit programs backed by experienced operations and dedicated account management.
                </p>
            </div>

            <div className="py-10 grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl mx-auto">
                {[
                    { value: "6+", label: "Cities", icon: MapPin },
                    { value: "14 +", label: "Centers", icon: MapPin },
                    { value: "10000 +", label: "Seats", icon: Building },
                    { value: "700000", label: "Sq.ft Area", icon: Presentation }
                ].map((stat, index) => {
                    const Icon = stat.icon;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + index * 0.05 }}
                            className="text-center"
                        >
                            <div className={`text-2xl font-light mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                                {stat.value}
                            </div>
                            <div className={`text-xs flex items-center justify-center ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                                <Icon
                                    className={`w-5 mr-1 h-5 ${isDark ? "text-white" : "text-black"
                                        }`}
                                /> {stat.label}
                            </div>
                        </motion.div>
                    )
                })}
            </div>


            <div className="">
                <Faq />
            </div>
            <div className="pb-4">

            <LearnMoreForm />
            </div>

        </div>
    );
}

export default LandingPage;
