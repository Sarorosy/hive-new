import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../utils/idb.jsx";
import logoTransparent from "../assets/logo-transparent.png";

export default function AdminPrivateRoute() {
    const { admin, adminLoading } = useAuth();

    // While loading, show spinner or loader
    if (adminLoading) {
        return (
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
                {/* Logo */}
                <img
                    src={logoTransparent}
                    alt="Brand Logo"
                    className="w-auto h-12 object-contain mb-12 animate-fadeIn"
                />

                <div className="relative w-20 h-20 mb-6">
                    <div className="absolute inset-0 border-4 border-gray-300 rounded-full animate-spin"></div>
                    <div className="absolute inset-2 border-4 border-black rounded-full animate-ping"></div>
                </div>

                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Crafting Your Experience
                </h2>
                <p className="text-gray-500 text-sm animate-pulse">
                    Please hold on, we’re setting things up...
                </p>
            </div>
        );
    }



    // Regular auth check
    return admin ? <Outlet /> : <Navigate to="/webmaster/login" />;
}
