import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tag, MapPin, Briefcase, Layers, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../../utils/idb";

const Others = () => {
  const navigate = useNavigate();
  const  {admin} = useAuth();

  useEffect(() => {
    if (!admin) {
        navigate("/webmaster/login");
    }
}, []);

const cards = [
  (admin?.role === "admin" || admin?.role === "blog_admin") && {
    title: "Manage Tags",
    description: "Create and edit tags for blogs.",
    icon: <Tag className="w-6 h-6 mr-2 text-blue-900" />,
    path: "/webmaster/tags",
  },
  (admin?.role === "admin" || admin?.role === "blog_admin") && {
    title: "Manage Blog Categories",
    description: "Organize your blog content easily.",
    icon: <Layers className="w-6 h-6 mr-2 text-blue-900" />,
    path: "/webmaster/blog-categories",
  },
  (admin?.role === "admin" || admin?.role === "HR") && {
    title: "Manage Locations",
    description: "Add or edit available locations.",
    icon: <MapPin className="w-6 h-6 mr-2 text-blue-900" />,
    path: "/webmaster/locations",
  },
  (admin?.role === "admin" || admin?.role === "HR") && {
    title: "Manage Job Categories",
    description: "Setup categories for job postings.",
    icon: <Briefcase className="w-6 h-6 mr-2 text-blue-900" />,
    path: "/webmaster/job-categories",
  },
  (admin?.role === "admin") && {
    title: "Product Categories",
    description: "Setup categories for products.",
    icon: <ShoppingBag className="w-6 h-6 mr-2 text-blue-900" />,
    path: "/webmaster/product-categories",
  },
  (admin?.role === "admin") && {
    title: "Product tags",
    description: "Setup categories for products.",
    icon: <ShoppingBag className="w-6 h-6 mr-2 text-blue-900" />,
    path: "/webmaster/product-tags",
  },
].filter(Boolean); // <-- remove all false values


  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Others</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            onClick={() => navigate(card.path)}
            className="cursor-pointer bg-white shadow-sm rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all"
          >
            
            <h2 className="text-lg font-semibold text-gray-700 text-center mb-1 flex items-center ">
            {card.icon} {card.title}
            </h2>
            <p className="text-sm text-gray-500 text-center">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Others;
