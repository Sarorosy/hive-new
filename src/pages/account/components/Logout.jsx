import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../utils/idb";

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/account/login");
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md border rounded-xl shadow-lg px-6 py-3 bg-white">
        <h2 className="text-xl font-semibold mb-4 text-center">Confirm Logout</h2>
        <p className="text-center text-gray-700 mb-6">
          Are you sure you want to logout?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleLogout}
            className="px-5 py-2 cursor-pointer bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Yes, Log out
          </button>
        </div>
      </div>
    </div>
  );
}
