import React, { useEffect, useState } from "react";
import Orders from "./components/Orders";
import Address from "./components/Address";
import AccountDetails from "./components/AccountDetails";
import Logout from "./components/Logout";
import { useAuth } from "../../utils/idb";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("orders");

  const {user} = useAuth();
  const navigate = useNavigate();
  useEffect(()=>{
    if(!user || !user?.id || !user?.email){
      navigate('/account/login')
    }
  },[user])

  const renderContent = () => {
    if (activeTab === "orders") return <Orders />;
    if (activeTab === "address") return <Address />;
    if (activeTab === "details") return <AccountDetails />;
    if (activeTab === "logout") return <Logout />;
    return null;
  };

  const getItemClasses = (tab) =>
    `w-full text-left h-10 px-4 py-2 rounded border border-gray-500 cursor-pointer ${
      activeTab === tab ? "bg-black text-white" : "hover:bg-gray-100"
    }`;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 mt-20">
      <h1 className="text-2xl font-semibold mb-4">My Account</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <aside className="w-full md:w-42 shrink-0 px-2 border-r-1 border-gray-500">
          <nav className="space-y-2 grid grid-cols-2 md:block md:grid-cols-1 md:space-y-2 gap-2">
            <button className={getItemClasses("orders")} onClick={() => setActiveTab("orders")}>
              Orders
            </button>
            <button className={getItemClasses("address")} onClick={() => setActiveTab("address")}>
              Address
            </button>
            <button className={getItemClasses("details")} onClick={() => setActiveTab("details")}>
              Account details
            </button>
            <button className={getItemClasses("logout")} onClick={() => setActiveTab("logout")}>
              Logout
            </button>
          </nav>
        </aside>
        <section className="flex-1">
          {renderContent()}
        </section>
      </div>
    </div>
  );
}


