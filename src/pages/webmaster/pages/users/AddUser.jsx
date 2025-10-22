import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { API_URL } from "../../../../utils/constants";
import { useAuth } from "../../../../utils/idb";
import { Eye, EyeClosed, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddUser = ({ onClose, onSuccess }) => {
  const { admin, adminlogout } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "customer",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error("Name, Email, and Password are required.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/admin/users/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${admin.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.status) {
        toast.success("User added successfully");
        onSuccess(); // refresh list
        onClose(); // close modal
      } else {
        if (["Token expired", "Invalid token"].includes(data.message)) {
            toast.error("Session expired. Please login again.");
            adminlogout();
            navigate("/webmaster/login");
        } else {
        toast.error(data.message || "Failed to add user");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
      {/* Modal content sliding in */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="bg-white w-full max-w-md h-full shadow-xl p-6 overflow-y-auto"
      >
        <h2 className="text-xl font-semibold mb-4 border-b pb-2 flex justify-between items-center">
          Add New User
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 text-lg font-bold"
          >
            ✕
          </button>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="border w-full rounded px-3 py-2"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="border w-full rounded px-3 py-2"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="border w-full rounded px-3 py-2"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password *</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="border w-full rounded px-3 py-2 pr-10"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18}/>
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="border w-full rounded px-3 py-2"
            >
              <option value="customer">Customer</option>
              <option value="blog_admin">Blog Admin</option>
              <option value="HR">HR</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add User"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddUser;
