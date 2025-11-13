import React, { useEffect, useState } from "react";
import {
    Menu,
    Home,
    Users,
    Settings,
    LogOut,
    User,
    Check,
    X,
    LayoutList,
    BriefcaseBusiness,
    MapIcon,
    Layers,
    Store,
    Calendar,
} from "lucide-react";
import { Tooltip } from "react-tooltip";
import { useAuth } from "../../../utils/idb";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();
    const { admin, adminlogout } = useAuth();
    const [clickedLogout, setClickedLogout] = useState(false);

    useEffect(()=>{
        if(!admin){
            navigate("/webmaster/login")
        }
    },[]);
    
    

    const menuItems = [
        { name: "Dashboard", icon: <Home size={20} />, path: "/webmaster/", roles: ["admin", "HR", "blog_admin"] },
        { name: "Users", icon: <Users size={20} />, path: "/webmaster/users", roles: ["admin"] },
        { name: "Blogs", icon: <LayoutList size={20} />, path: "/webmaster/blogs", roles: ["admin", "blog_admin"] },
        { name: "Jobs", icon: <BriefcaseBusiness size={20} />, path: "/webmaster/jobs", roles: ["admin", "HR"] },
        { name: "Job Applications", icon: <Layers size={20} />, path: "/webmaster/job-applications", roles: ["admin", "HR"] },
        { name: "Products", icon: <Store size={20} />, path: "/webmaster/products", roles: ["admin"] },
        { name: "Orders", icon: <Calendar size={20} />, path: "/webmaster/orders", roles: ["admin"] },
        { name: "Others", icon: <Settings size={20} />, path: "/webmaster/others", roles: ["admin", "HR", "blog_admin"] },
      ];
      

    return (
        <div
            className={`h-screen bg-gray-900 text-white transition-all duration-300 flex flex-col ${isOpen ? "w-56" : "w-20"
                }`}
        >
            {/* Header */}
            <div className="p-4 border-b border-gray-700">
                <div className="flex items-center justify-between ">
                    {isOpen && <h1 className="text-lg font-semibold flex items-center">Welcome</h1>}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-md hover:bg-gray-800"
                    >
                        <Menu size={22} />
                    </button>
                </div>
                {isOpen && <h1 className="text-md font-semibold flex items-center bg-white text-gray-900 rounded"><User className="mx-2 " size={15} /> {admin?.name}</h1>}
            </div>

            {/* Menu */}
            <nav className="flex-1 p-2">
                {menuItems.filter(item => item.roles.includes(admin.role)).map((item) => (
                    <div key={item.name} onClick={() => navigate(item.path)} className="relative my-1 transition-all duration-200 hover:bg-gray-800 cursor-pointer">
                        <button
                            type="button"

                            data-tooltip-id={!isOpen ? `tip-${item.name}` : undefined}
                            className={`flex items-center gap-3 p-3 rounded-lg  ${isOpen ? "justify-start" : "justify-center"
                                }`}
                        >
                            {item.icon}
                            {isOpen && <span>{item.name}</span>}
                        </button>

                        {!isOpen && (
                            <Tooltip
                                id={`tip-${item.name}`}
                                content={item.name}
                                place="right"
                                className="z-50"
                            />
                        )}
                    </div>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-3 border-t border-gray-700">
                {!clickedLogout ? (
                    <button
                        className={`flex items-center gap-3 p-3 rounded-lg hover:bg-red-800 w-full ${isOpen ? "justify-start" : "justify-center"
                            }`}
                        data-tooltip-id={!isOpen ? "logout-tip" : undefined}
                        onClick={() => { setClickedLogout(true) }}
                    >
                        <LogOut size={20} />
                        {isOpen && <span>Logout</span>}
                    </button>
                ) : (
                    <>
                    <p className="text-center text-red-500 mb-1">Are you sure logout?</p>
                    <div className="flex items-center space-x-2">
                        <button
                            className={`flex items-center gap-3 p-1 rounded-lg hover:bg-red-800 w-full ${isOpen ? "justify-start" : "justify-center"
                                }`}
                            data-tooltip-id={!isOpen ? "logout-tip" : undefined}
                            onClick={() => { setClickedLogout(false) }}
                        >
                            <X size={20} />
                            {isOpen && <span>Cancel</span>}
                        </button>
                        <button
                        onClick={()=>{
                            adminlogout();
                            navigate("/webmaster/login")
                        }}
                            className={`flex items-center gap-3 p-1 rounded-lg hover:bg-red-800 w-full ${isOpen ? "justify-start" : "justify-center"
                                }`}
                            data-tooltip-id={!isOpen ? "logout-tip" : undefined}
                        >
                            <Check size={20} />
                            {isOpen && <span>Yes</span>}
                        </button>
                    </div>
                    </>
                )}

                {!isOpen && (
                    <Tooltip id="logout-tip" content="Logout" place="right" className="z-50" />
                )}
            </div>
        </div>
    );
}
