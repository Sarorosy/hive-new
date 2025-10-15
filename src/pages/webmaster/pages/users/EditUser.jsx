import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { API_URL } from "../../../../utils/constants";
import { useAuth } from "../../../../utils/idb";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EditUser = ({ onClose, onSuccess, userId }) => {
  const { admin, adminlogout } = useAuth();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "customer",
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Fetch user data when component mounts
  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const fetchUserData = async () => {
    try {
      setFetchLoading(true);
      const res = await fetch(`${API_URL}/api/admin/users/get/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${admin.token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      
      if (data.status) {
        const user = data.data;
        setForm({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          password: "", // Don't pre-fill password for security
          role: user.role || "customer",
        });
      } else {
        if (["Token expired", "Invalid token"].includes(data.message)) {
          toast.error("Session expired. Please login again.");
          adminlogout();
          navigate("/webmaster/login");
        } else {
          toast.error(data.message || "Failed to fetch user data");
          onClose();
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching user data");
      onClose();
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validation based on field type
    if (name === 'phone') {
      // Only allow numeric characters for phone
      const numericValue = value.replace(/[^0-9]/g, '');
      setForm({ ...form, [name]: numericValue });
    } else if (name === 'name') {
      // Only allow alphabetic characters and spaces for name
      const alphaSpaceValue = value.replace(/[^a-zA-Z\s]/g, '');
      setForm({ ...form, [name]: alphaSpaceValue });
    } else if (name === 'email') {
      // Allow alphabetic characters, spaces, @, ., numbers, and common email characters
      const emailValue = value.replace(/[^a-zA-Z0-9\s@._-]/g, '');
      setForm({ ...form, [name]: emailValue });
    } else {
      // For other fields (role), allow all characters
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Name and Email are required.");
      return;
    }

    try {
      setLoading(true);
      
      // Prepare update data - only include password if it's provided
      const updateData = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        role: form.role,
      };
      
      // Only include password if it's not empty
      if (form.password.trim()) {
        updateData.password = form.password;
      }

      const res = await fetch(`${API_URL}/api/admin/users/update/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${admin.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      const data = await res.json();
      
      if (data.status) {
        toast.success("User updated successfully");
        onSuccess(); // refresh list
        onClose(); // close modal
      } else {
        if (["Token expired", "Invalid token"].includes(data.message)) {
          toast.error("Session expired. Please login again.");
          adminlogout();
          navigate("/webmaster/login");
        } else {
          toast.error(data.message || "Failed to update user");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="bg-white w-full max-w-md h-full shadow-xl p-6 overflow-y-auto flex items-center justify-center"
        >
          <div className="text-center">
            <div className="h-10 w-10 rounded-full border-4 border-blue-600 border-t-transparent animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading user data...</p>
          </div>
        </motion.div>
      </div>
    );
  }

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
          Edit User
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
            <label className="block text-sm font-medium mb-1">
              Password 
              <span className="text-gray-500 text-xs ml-1">(leave blank to keep current)</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="border w-full rounded px-3 py-2 pr-10"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
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
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update User"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditUser;
