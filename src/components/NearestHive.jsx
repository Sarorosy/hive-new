import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { centersData } from "../data/centersData";
import { ArrowUpRightIcon, Minimize2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function NearestHive() {
    const [nearest, setNearest] = useState(null);
    const [error, setError] = useState("");
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation not supported by your browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;

                let closest = null;
                let minDist = Infinity;

                Object.entries(centersData).forEach(([citySlug, city]) => {
                    Object.entries(city.branches).forEach(([branchSlug, branch]) => {
                        if (branch.lat && branch.lng) {
                            const dist = haversineDistance(
                                latitude,
                                longitude,
                                parseFloat(branch.lat),
                                parseFloat(branch.lng)
                            );

                            if (dist < minDist) {
                                minDist = dist;
                                closest = {
                                    ...branch,
                                    city: city.name,   // human-readable city name
                                    citySlug,          // e.g., "chennai"
                                    branchSlug,        // e.g., "anna-nagar"
                                    distance: dist,
                                };
                            }
                        }
                    });
                });

                setNearest(closest);
            },
            () => setError("Location access denied. Please allow location access.")
        );
    }, []);


    if (error) return null;


    return (
        <AnimatePresence>
            {nearest && (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 120, damping: 15 }}
                    className="fixed bottom-4 left-4 z-48"
                >
                    {/* Collapsed card with green ping */}
                    {!expanded && (
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-white shadow-lg rounded-xl p-3 cursor-pointer w-64 flex items-center gap-3"
                            onMouseEnter={() => setExpanded(true)}
                        >
                            {/* Green ping circle */}
                            <div className="relative w-2 h-2 flex-shrink-0">
                                {/* Animated solid green dot */}
                                <motion.div
                                    className="absolute inset-0 bg-green-500 rounded-full "
                                    style={{ transformOrigin: "50% 50%" }} // ensures scaling stays circular
                                    animate={{ scale: [1, 1.5, 1] }}
                                    transition={{ repeat: Infinity, duration: 1.2 }}
                                />
                                {/* Outer ping */}
                                <span className="absolute inset-0 rounded-full bg-green-400 opacity-50 animate-ping"></span>
                            </div>



                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">
                                    1 Nearby Hive Center Found
                                </span>
                                {/* <span className="text-xs text-gray-500">
                                    {nearest.name} ({nearest.distance.toFixed(2)} km)
                                </span> */}
                                <h2 className="text-[10px] font-thin mb-2">{nearest.name}</h2>
                                <span className="text-xs text-gray-500 flex items-center hover:underline">
                                    View <ArrowUpRightIcon className="ml-2" size={13} />
                                </span>
                            </div>
                        </motion.div>
                    )}

                    {/* Expanded card */}
                    {expanded && (
                        <motion.div
                            initial={{ y: 200, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 200, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 120, damping: 20 }}
                            onMouseLeave={() => { setExpanded(false) }}
                            className="bg-white shadow-2xl rounded-2xl p-4 w-[90vw] md:w-[400px] max-h-[80vh] overflow-y-auto relative"
                        >
                            {/* <button
                                className="absolute top-2 right-2 text-gray-600 hover:text-black cursor-pointer"
                                onClick={() => setExpanded(false)}
                            >
                                <Minimize2 size={18} />   
                            </button> */}

                            <h2 className="text-lg font-bold mb-2">{nearest.name}</h2>
                            <p className="mb-2 text-sm">{nearest.details}</p>
                            {/* <p className="text-gray-500 text-sm mb-2">
                                Distance: {nearest.distance.toFixed(2)} km
                            </p> */}
                            {nearest.citySlug && nearest.branchSlug && (
                                <div className="flex items-center justify-end">
                                    <span
                                        onClick={() => { navigate(`${nearest.citySlug}/${nearest.branchSlug}`) }}
                                        className="text-xs text-gray-500 flex items-center border  hover:underline cursor-pointer my-3 px-2 py-1 rounded hover:bg-black hover:text-white">
                                        View <ArrowUpRightIcon className="ml-2" size={13} />
                                    </span>
                                </div>
                            )}
                            <iframe
                                src={nearest.map}
                                width="100%"
                                height="220"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Nearest Hive Map"
                                className="rounded-lg"
                            ></iframe>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Haversine distance utility
function haversineDistance(lat1, lon1, lat2, lon2) {
    function toRad(x) {
        return (x * Math.PI) / 180;
    }
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export default NearestHive;
