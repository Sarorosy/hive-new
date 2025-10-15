import React, { useState } from "react";
import { useAuth } from "../../../utils/idb";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../utils/constants";

export default function AccountDetails() {
  const { user, logout } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { oldPassword, newPassword, confirmPassword } = formData;

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      setSubmitting(true);
      const token = user?.token;

      const response = await axios.post(
        `${API_URL}/api/user/update_password`,
        {
          old_password: oldPassword,
          new_password: newPassword
        },
        {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      const data = response.data;
      if (data?.status) {

        setShowForm(false);
        // TODO: Add API call to update password
        toast.success("Password updated successfully!");
        setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        if (data?.message === "Token expired") {
          toast.error("Please login to update password");
          logout();
          navigate("/account/login?SESSION_EXPIRED=true");
        } else {
          toast.error(data?.message || "Failed to update password");
        }
      }
    } catch (error) {
      toast.error("Failed to update password");
      console.log(error);
    } finally {
      setSubmitting(false);


    }

  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md border border-gray-200 rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">Account Details</h2>

      {user ? (
        <div className="text-sm text-gray-700 space-y-2 mb-6">
          <div>
            <span className="font-medium">Name:</span> {user?.name || "-"}
          </div>
          <div>
            <span className="font-medium">Email:</span> {user?.email || "-"}
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-600 mb-6">Not logged in.</p>
      )}


      <button
        onClick={() => setShowForm(!showForm)}
        className="w-48 bg-black text-white py-1 rounded-lg hover:bg-gray-800 transition"
      >
        {showForm ? "Cancel" : "Update Password"}
      </button>


      {showForm && (
        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Old Password
            </label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="Enter old password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="Enter new password"
              minLength={8}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="Confirm new password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Save Password
          </button>
        </form>
      )}
    </div>
  );
}
