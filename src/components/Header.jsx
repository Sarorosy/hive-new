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
import logoTransparent from "../assets/logo-transparent.png";
import { citiesData } from "../data/centersData";
import { solutionOfferings } from "../data/workspacesData";
import { useAuth } from "../utils/idb";
import { API_URL } from "../utils/constants";

const Header = ({ onBookTourClick, theme = "dark", onToggleTheme }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [centresOpen, setCentresOpen] = useState(false);
  const [workspacesOpen, setWorkspacesOpen] = useState(false);
  const [hoveredCity, setHoveredCity] = useState("");
  const [hoveredOffering, setHoveredOffering] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const infoRef = useRef(null);
  const centresRef = useRef(null);
  const workspacesRef = useRef(null);
  const workspacesTimeoutRef = useRef(null);
  const centresTimeoutRef = useRef(null);
  const { user, cart, logout } = useAuth();

  const offerings = solutionOfferings;

  // mobile dropdown states
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [mobileCentresOpen, setMobileCentresOpen] = useState(false);
  const [mobileSelectedOffering, setMobileSelectedOffering] = useState("");
  const [mobileSelectedCity, setMobileSelectedCity] = useState("");

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

  const fetchCartItems = async () => {
    try {
      if (user) {
        const response = await fetch(`${API_URL}/user/getcartitems`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token || ""}`,
          },
        });

        const data = await response.json();
        if (data.status) {
          setCartCount((data.cart_items || []).length);
        } else {
          if (
            data.message === "Token expired" ||
            data.message === "Invalid token"
          ) {
            logout();
            navigate("/account/login");
          }
          setCartCount(0);
        }
      } else {
        setCartCount(cart.length);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <>
      {/* ⭐ THEME APPLIED HERE */}
      <div
        className={`z-50 ${
          theme === "dark"
            ? "bg-black text-white border-white"
            : "bg-white text-black border-black"
        } hover:bg-black hover:text-white border rounded hidden md:block fixed -right-10 top-1/2  -translate-y-1/2 -rotate-90 origin-center`}
      >
        <button
          onClick={onBookTourClick}
          className="cursor-pointer rounded-l-2xl rounded-r-none px-6 py-2 shadow-lg"
        >
          Book Tour
        </button>
      </div>

      <header
        className={`fixed top-0 left-0 right-0  z-50 transition-all duration-500 ease-in-out ${
          isHeaderVisible
            ? ""
            : `${
                theme === "dark" ? " bg-black" : " bg-white border-white/50"
              }`
        }`}
      >
        <div
          className={`
          w-full mx-0  transition-all duration-300 ease-in-out 
          ${
            theme === "dark"
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

              <nav
                className={`
                  hidden md:flex items-center space-x-8 text-sm font-medium ml-8 transition-colors duration-300
                  ${theme === "dark" ? "text-white" : "text-black"}
                `}
              >
                <RouterLink className="hover:underline" to="/about-us">
                  About Us
                </RouterLink>

                {/* <RouterLink className="hover:underline" to="/ecosystem">
                  Ecosystem
                </RouterLink> */}

                {/* Solutions Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => {
                    if (workspacesTimeoutRef.current) {
                      clearTimeout(workspacesTimeoutRef.current);
                    }
                    setWorkspacesOpen(true);
                  }}
                  onMouseLeave={() => {
                    if (workspacesTimeoutRef.current) {
                      clearTimeout(workspacesTimeoutRef.current);
                    }
                    workspacesTimeoutRef.current = setTimeout(() => {
                      setWorkspacesOpen(false);
                      setHoveredOffering("");
                    }, 150);
                  }}
                  ref={workspacesRef}
                >
                  <span
                    onClick={() => {
                      navigate("/solutions");
                    }}
                    className="hover:underline cursor-pointer"
                  >
                    Workspaces
                  </span>

                  {workspacesOpen && (
                    <div
                      className={`absolute left-0 top-7 mt-2 w-3xl z-20 shadow-xl rounded-sm
                        ${
                          theme === "dark"
                            ? "bg-gray-900 text-white"
                            : "bg-white text-black"
                        }`}
                    >
                      {/* arrow */}
                      <div
                        className={`absolute top-0 left-1 -translate-y-full w-0 h-0 
                        border-l-[10px] border-r-[10px] border-b-[20px]
                        border-l-transparent border-r-transparent
                        ${
                          theme === "dark" ? "border-b-black" : "border-b-white"
                        }
                      `}
                      />

                      {/* Content */}
                      <div className="flex">
                        <div
                          className={`w-1/2 p-4 border-r ${
                            theme === "dark"
                              ? "border-gray-800"
                              : "border-gray-300"
                          }`}
                        >
                          <h3 className="text-xs uppercase tracking-wide mb-3 opacity-70">
                            Workspace Types
                          </h3>

                          {offerings.map((offering) => (
                            <div
                              key={offering.title}
                              className={`py-3 px-2 cursor-pointer rounded transition-colors ${
                                hoveredOffering === offering.title
                                  ? theme === "dark"
                                    ? "bg-gray-800"
                                    : "bg-gray-200"
                                  : ""
                              }`}
                              onMouseEnter={() =>
                                setHoveredOffering(offering.title)
                              }
                            >
                              <div className="font-medium">
                                {offering.title}
                              </div>
                              <div className="text-xs opacity-70 mt-1">
                                {offering.subtitle}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="w-1/2 p-4">
                          <h3 className="text-xs uppercase tracking-wide mb-3 opacity-70">
                            Options
                          </h3>

                          {hoveredOffering ? (
                            offerings
                              .find((o) => o.title === hoveredOffering)
                              ?.items.map((item, index) => (
                                <button
                                  key={index}
                                  onClick={() => {
                                    if(item.slug === "virtual-office") {
                                    navigate("/virtual-office");
                                    setWorkspacesOpen(false);
                                    return;
                                  }
                                    navigate(`/workspaces/${item.slug}`);
                                    setWorkspacesOpen(false);
                                  }}
                                  className={`block w-full text-left py-3 px-2 rounded text-sm transition-colors
                                    ${
                                      theme === "dark"
                                        ? "hover:bg-gray-800"
                                        : "hover:bg-gray-200"
                                    }
                                  `}
                                >
                                  <div className="flex flex-col">
                                    {item.name}
                                    <span className="text-gray-500 f-10">{item.description}</span>
                                  </div>
                                </button>
                              ))
                          ) : (
                            <div className="opacity-70 text-sm">
                              Hover over a workspace type to see options
                            </div>
                          )}
                        </div>
                      </div>

                      <div
                        className={`border-t px-4 py-3 text-sm ${
                          theme === "dark"
                            ? "border-gray-800"
                            : "border-gray-300"
                        }`}
                      >
                        <RouterLink
                          to="/solutions"
                          className="inline-flex items-center gap-2 hover:underline"
                        >
                          View all workspaces <ArrowRight className="w-4 h-4" />
                        </RouterLink>
                      </div>
                    </div>
                  )}
                </div>

                {/* Centres */}
                <div
                  className="relative"
                  onMouseEnter={() => {
                    if (centresTimeoutRef.current) {
                      clearTimeout(centresTimeoutRef.current);
                    }
                    setCentresOpen(true);
                  }}
                  onMouseLeave={() => {
                    if (centresTimeoutRef.current) {
                      clearTimeout(centresTimeoutRef.current);
                    }
                    centresTimeoutRef.current = setTimeout(() => {
                      setCentresOpen(false);
                      setHoveredCity("");
                    }, 150);
                  }}
                  ref={centresRef}
                >
                  <span
                    onClick={() => {
                      navigate("/locations");
                    }}
                    className="hover:underline cursor-pointer"
                  >
                    Centres
                  </span>

                  {centresOpen && (
                    <div
                      className={`absolute left-0 top-7 mt-2 w-xl rounded-sm z-20 shadow-xl
                      ${
                        theme === "dark"
                          ? "bg-gray-900 text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      {/* arrow */}
                      <div
                        className={`absolute top-0 left-1 -translate-y-full w-0 h-0 
                        border-l-[10px] border-r-[10px] border-b-[20px]
                        border-l-transparent border-r-transparent
                        ${
                          theme === "dark" ? "border-b-black" : "border-b-white"
                        }
                      `}
                      />

                      <div className="flex">
                        <div
                          className={`w-1/3 p-4 border-r ${
                            theme === "dark"
                              ? "border-gray-800"
                              : "border-gray-300"
                          }`}
                        >
                          <h3 className="text-xs uppercase tracking-wide mb-3 opacity-70">
                            Cities
                          </h3>

                          {Object.keys(citiesData).map((city) => (
                            <div
                              key={city}
                              className={`py-2 px-2 cursor-pointer rounded transition-colors flex items-center justify-between 
                              ${
                                hoveredCity === city
                                  ? theme === "dark"
                                    ? "bg-gray-800"
                                    : "bg-gray-200"
                                  : ""
                              }`}
                              onMouseEnter={() => setHoveredCity(city)}
                            >
                              {city}
                              <img
                                src={citiesData[city].image}
                                alt={city}
                                className="w-8 h-8 ml-1"
                              />
                            </div>
                          ))}
                        </div>

                        <div className="w-2/3 p-4">
                          <h3 className="text-xs uppercase tracking-wide mb-3 opacity-70">
                            Branches
                          </h3>

                          {hoveredCity ? (
                            citiesData[hoveredCity].branches.map(
                              (branch, index) => (
                                <button
                                  key={index}
                                  onClick={() => navigate(branch.route)}
                                  className={`block w-full text-left py-4 px-2 rounded text-sm transition-colors
                                  ${
                                    theme === "dark"
                                      ? "hover:bg-gray-800"
                                      : "hover:bg-gray-200"
                                  }
                                  `}
                                >
                                  {branch.name}
                                </button>
                              )
                            )
                          ) : (
                            <div className="opacity-70 text-sm">
                              Hover over a city to see branches
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <RouterLink className="hover:underline" to="/contact">
                  Contact Us
                </RouterLink>
              </nav>
            </div>

            {/* Mobile Menu Icon */}
            <button
              className={`
                md:hidden transition-colors duration-300
                ${theme === "dark" ? "text-white" : "text-black"}
              `}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>

            {/* Right actions */}
            <div
              className={`hidden md:flex items-center space-x-6 text-sm transition-colors duration-300
                ${theme === "dark" ? "text-white" : "text-black"}
              `}
            >
              <button
                onClick={onBookTourClick}
                className="flex items-center gap-1 hover:underline"
              >
                <Calendar className="w-4 h-4" />
                Book a Tour
              </button>

              {/* <button
                onClick={() =>
                  user
                    ? navigate("/account/profile")
                    : navigate("/account/login")
                }
                className="flex items-center gap-1 hover:underline"
              >
                <User className="w-4 h-4" />
                {user ? user.name : "My Account"}
              </button>

              {(cartCount > 0 || (user && cartCount > 0)) && (
                <button
                  onClick={() => navigate("/cart")}
                  className="flex items-center gap-1 hover:underline"
                >
                  <ShoppingCart className="w-4 h-4" /> Cart ({cartCount})
                </button>
              )} */}

              <a
                href="tel:+917022274000"
                className="flex items-center gap-1 hover:underline"
              >
                <Phone className="w-4 h-4" /> Call Us
              </a>

              {/* ⭐ Theme toggle */}
              <button
                type="button"
                onClick={onToggleTheme}
                className={`flex items-center justify-center w-9 h-9 rounded-full border transition-colors bg-transparent
                  ${
                    theme === "dark"
                      ? "border-white text-white bg-black"
                      : "border-black text-black bg-white"
                  }
                `}
              >
                {theme === "dark" ? <Sun /> : <Moon />}
              </button>
            </div>
          </div>

          {/* Mobile Panel */}
          {mobileOpen && (
            <div
              className={`
              md:hidden border-t px-4 py-4 space-y-4 rounded-b-2xl transition-all
              ${
                theme === "dark"
                  ? "bg-black/70 text-white border-white/20"
                  : "bg-white/70 text-black border-black/20"
              }
            `}
            >
              {/* ---- ABOUT US ---- */}
              <RouterLink
                to="/about-us"
                className="block py-2 text-lg"
                onClick={() => setMobileOpen(false)}
              >
                About Us
              </RouterLink>

              {/* ---- ECOSYSTEM ---- */}
              {/* <RouterLink
                to="/ecosystem"
                className="block py-2 text-lg"
                onClick={() => setMobileOpen(false)}
              >
                Ecosystem
              </RouterLink> */}

              {/* ---- SOLUTIONS (COLLAPSIBLE) ---- */}
              <div>
                <button
                  onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                  className="w-full flex justify-between items-center py-2 text-lg"
                >
                  Workspaces
                  <ChevronDown
                    className={`transition-transform ${
                      mobileSolutionsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileSolutionsOpen && (
                  <div className="pl-4 space-y-2">
                    {offerings.map((off) => (
                      <div key={off.title}>
                        <button
                          onClick={() =>
                            setMobileSelectedOffering(
                              mobileSelectedOffering === off.title
                                ? ""
                                : off.title
                            )
                          }
                          className="w-full flex justify-between py-2"
                        >
                          {off.title}
                          <ChevronRight
                            className={`transition-transform ${
                              mobileSelectedOffering === off.title
                                ? "rotate-90"
                                : ""
                            }`}
                          />
                        </button>

                        {/* offering options */}
                        {mobileSelectedOffering === off.title && (
                          <div className="pl-4 space-y-1 text-sm">
                            {off.items.map((item) => (
                              <button
                                key={item.slug}
                                className="block py-1"
                                onClick={() => {
                                  if(item.slug === "virtual-office") {
                                    navigate("/virtual-office");
                                    setMobileOpen(false);
                                    return;
                                  }
                                  navigate(`/workspaces/${item.slug}`);
                                  setMobileOpen(false);
                                }}
                              >
                                {item.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                    {/* view all */}
                    <RouterLink
                      to="/solutions"
                      className="block py-2 underline text-sm"
                      onClick={() => setMobileOpen(false)}
                    >
                      View All Workspaces
                    </RouterLink>
                  </div>
                )}
              </div>

              {/* ---- CENTRES (COLLAPSIBLE) ---- */}
              <div>
                <button
                  onClick={() => setMobileCentresOpen(!mobileCentresOpen)}
                  className="w-full flex justify-between items-center py-2 text-lg"
                >
                  Centres
                  <ChevronDown
                    className={`transition-transform ${
                      mobileCentresOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileCentresOpen && (
                  <div className="pl-4 space-y-2">
                    {Object.keys(citiesData).map((city) => (
                      <div key={city}>
                        <button
                          onClick={() =>
                            setMobileSelectedCity(
                              mobileSelectedCity === city ? "" : city
                            )
                          }
                          className="flex justify-between w-full py-2"
                        >
                          {city}
                          <ChevronRight
                            className={`transition-transform ${
                              mobileSelectedCity === city ? "rotate-90" : ""
                            }`}
                          />
                        </button>

                        {mobileSelectedCity === city && (
                          <div className="pl-4 space-y-1 text-sm">
                            {citiesData[city].branches.map((branch) => (
                              <button
                                key={branch.name}
                                className="block py-1"
                                onClick={() => {
                                  navigate(branch.route);
                                  setMobileOpen(false);
                                }}
                              >
                                {branch.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                    <RouterLink
                      to="/locations"
                      className="block py-2 underline text-sm"
                      onClick={() => setMobileOpen(false)}
                    >
                      View All Centres
                    </RouterLink>
                  </div>
                )}
              </div>

              {/* ---- CONTACT ---- */}
              <RouterLink
                to="/contact"
                className="block py-2 text-lg"
                onClick={() => setMobileOpen(false)}
              >
                Contact Us
              </RouterLink>

              {/* ---- CART ---- */}
              {/* {cartCount > 0 && (
                <button
                  className="flex items-center gap-2 py-2 text-lg"
                  onClick={() => {
                    navigate("/cart");
                    setMobileOpen(false);
                  }}
                >
                  <ShoppingCart className="w-5 h-5" /> Cart ({cartCount})
                </button>
              )} */}

              {/* ---- ACCOUNT ---- */}
              {/* <button
                className="flex items-center gap-2 py-2 text-lg"
                onClick={() => {
                  user
                    ? navigate("/account/profile")
                    : navigate("/account/login");
                  setMobileOpen(false);
                }}
              >
                <User className="w-5 h-5" />
                {user ? user.name : "My Account"}
              </button> */}

              {/* ---- CALL ---- */}
              <a
                href="tel:+917022274000"
                className="flex items-center gap-2 py-2 text-lg"
              >
                <Phone className="w-5 h-5" /> Call Us
              </a>

              {/* ---- THEME TOGGLE ---- */}
              <button
                onClick={onToggleTheme}
                className={`flex items-center justify-center w-10 h-10 rounded-full border ${
                  theme === "dark"
                    ? "border-white text-white bg-black"
                    : "border-black text-black bg-white"
                }`}
              >
                {theme === "dark" ? <Sun /> : <Moon />}
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
