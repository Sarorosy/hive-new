// src/pages/Account.jsx
import React, { useState } from "react";
import logo from '../assets/logo-transparent.png'

function Account() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200">

        <div className="flex justify-center bg-gray-50 border-b border-gray-200 py-6">
          <img
            src={logo}
            alt="Company Logo"
            className="h-14 object-contain"
          />
        </div>
        
        {/* Tabs */}
        <div className="flex">
          <button
            onClick={() => setActiveTab("login")}
            className={`w-1/2 py-4 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === "login"
                ? "border-orange-500 text-black"
                : "border-transparent text-gray-500 hover:text-black"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`w-1/2 py-4 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === "register"
                ? "border-orange-500 text-black"
                : "border-transparent text-gray-500 hover:text-black"
            }`}
          >
            Register
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
}

/* ---------------- LOGIN FORM ---------------- */
function LoginForm() {
  return (
    <form className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm"
          placeholder="you@example.com"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm"
          placeholder="••••••••"
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <label className="flex items-center text-sm text-gray-600">
          <input type="checkbox" className="mr-2 rounded border-gray-300" />
          Remember me
        </label>
        <button type="button" className="text-sm text-orange-500 hover:underline">
          Forgot password?
        </button>
      </div>
      <button
        type="button"
        className="w-full rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
      >
        Login
      </button>
    </form>
  );
}

/* ---------------- REGISTER FORM ---------------- */
function RegisterForm() {
  return (
    <form className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm"
          placeholder="John Doe"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm"
          placeholder="you@example.com"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm"
          placeholder="••••••••"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          type="password"
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm"
          placeholder="••••••••"
          required
        />
      </div>
      <button
        type="button"
        className="w-full rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
      >
        Register
      </button>
    </form>
  );
}

export default Account;
