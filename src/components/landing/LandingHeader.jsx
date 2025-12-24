import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";
import {
    Calendar,
    Phone,
    Menu,
    X,
    ChevronDown,
    ChevronRight,
    ArrowRight,
    Moon,
    Sun,
} from "lucide-react";
import logoTransparent from "../../assets/logo-transparent.png";
import { citiesData } from "../../data/centersData";
import { solutionOfferings } from "../../data/workspacesData";
import { useAuth } from "../../utils/idb";
import { API_URL } from "../../utils/constants";

const LandingHeader = ({ onBookTourClick, theme = "dark", onToggleTheme }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const lastScrollY = useRef(0);
    const { user, cart, logout } = useAuth();


    useEffect(() => {
        if (location.pathname !== "/") {
            setIsHeaderVisible(false);
            return;
        }

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const threshold = 50;

            // Show only when user is within top 50px
            if (scrollY <= threshold) {
                setIsHeaderVisible(true);
            } else {
                setIsHeaderVisible(false);
            }

            lastScrollY.current = scrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);



    return (
        <>


            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isHeaderVisible
                    ? ""
                    : `${theme === "dark" ? " bg-black" : " bg-white border-white/50"
                    }`
                    }`}
                style={{ fontSize: "1.1rem" }} // Increased font size globally for the header
            >
                <div
                    className={`
          w-full px-15 mx-auto  transition-all duration-300 ease-in-out 
          ${theme === "dark"
                            ? " hover:bg-black/70"
                            : " hover:bg-white hover:border-white/50"
                        }
        `}
                >
                    {/* Main Navigation */}
                    <div className="mx-auto flex items-center justify-between px-4 py-3">
                        <div className="flex items-center justify-center space-x-2">
                            {/* Logo */}
                            <button
                                onClick={() => navigate("/")}
                                className="text-2xl font-bold flex items-center cursor-pointer"
                            >
                                <img
                                    src={logoTransparent}
                                    alt="Logo"
                                    className="h-10 w-auto transition-all duration-300"
                                    style={{
                                        filter:
                                            theme === "dark" ? "invert(1) brightness(1.3)" : "none",
                                    }}
                                />
                            </button>


                        </div>

                        {/* Mobile Menu Icon */}
                        <button
                            className={`
                md:hidden transition-colors duration-300
                ${theme === "dark" ? "text-white" : "text-black"}
              `}
                            onClick={() => setMobileOpen(!mobileOpen)}
                            style={{ fontSize: "1.1rem" }} // Increased font size for mobile menu icon
                        >
                            {mobileOpen ? <X /> : <Menu />}
                        </button>

                        {/* Right actions */}
                        <div
                            className={`hidden md:flex items-center space-x-6 text-sm transition-colors duration-300
                ${theme === "dark" ? "text-white" : "text-black"}
              `}
                            style={{ fontSize: "1.1rem" }} // Increased font size for right actions
                        >



                            <a
                                href="tel:+917022274000"
                                className=" items-center gap-1 hover:underline"
                            >
                                <span className="f-11">
                                    Looking for a workspace? <br/>
                                </span>
                                <span className="f-12 flex items-center gap-1">
                                    <Phone className="w-4 h-4" /> +91 7022274000  
                                </span>

                            </a>


                        </div>
                    </div>

                    {/* Mobile Panel */}
                    {mobileOpen && (
                        <div
                            className={`
              md:hidden border-t px-4 py-4 space-y-4 rounded-b-2xl transition-all
              ${theme === "dark"
                                    ? "bg-black/70 text-white border-white/20"
                                    : "bg-white/70 text-black border-black/20"
                                }
            `}
                            style={{ fontSize: "1.1rem" }} // Increased font size for mobile panel
                        >


                            {/* ---- CALL ---- */}
                            <a
                                href="tel:+917022274000"
                                className="flex items-center gap-2 py-2 text-lg"
                            >
                                <Phone className="w-5 h-5" /> Call Us
                            </a>
                        </div>
                    )}
                </div>
            </header>
        </>
    );
};

export default LandingHeader;
