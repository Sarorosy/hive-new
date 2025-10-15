// src/pages/Account.jsx
import React, { useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import logo from '../../assets/logo-transparent.png'
import { SITE_KEY, API_URL } from "../../utils/constants";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../utils/idb";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function AccountForm() {
    const [activeTab, setActiveTab] = useState("login");

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200">

                <div className="flex justify-center bg-gray-50 border-b border-gray-200 py-3">
                    <img
                        src={logo}
                        alt="Company Logo"
                        className="h-10 object-contain"
                    />
                </div>

                {/* Tabs */}
                <div className="flex">
                    <button
                        onClick={() => setActiveTab("login")}
                        className={`cursor-pointer w-1/2 py-2 text-sm font-semibold border-b-2 transition-colors ${activeTab === "login"
                            ? "border-orange-500 text-black"
                            : "border-transparent text-gray-500 hover:text-black"
                            }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setActiveTab("register")}
                        className={`cursor-pointer w-1/2 py-2 text-sm font-semibold border-b-2 transition-colors ${activeTab === "register"
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
    const [captchaValue, setCaptchaValue] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const recaptchaRef = useRef(null);
    const [loggingIn, setLoggingIn] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const SESSION_EXPIRED = queryParams.get('SESSION_EXPIRED');

    useEffect(() => {
        if (user) {
            navigate("/account/profile");
        }
    }, [user, navigate]);

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!captchaValue) {
            toast.error("Please complete the CAPTCHA verification");
            return;
        }
        try {
            setLoggingIn(true);
            const response = await axios.post(`${API_URL}/api/auth/login`, {
                email: email,
                password: password,
                captcha: captchaValue
            });
            const data = await response.data;
            if (data.status) {
                login({ ...data.user, token: data.token });
                toast.success("Login successful");
                navigate("/");
            } else {
                toast.error(data.message || "Login failed");
                recaptchaRef.current.reset();
                setCaptchaValue(null); 
            }
        } catch (error) {
            console.log(error);
            toast.error("Login failed");
        } finally {
            setLoggingIn(false);
        }
    };

    return (
        <>
            {SESSION_EXPIRED && SESSION_EXPIRED === "true" && <div className="text-red-500 text-center mb-2 font-medium bg-red-50 rounded py-2">Session expired. Please login again.</div>}
            <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm"
                        placeholder="you@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 pr-12 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm"
                            placeholder="••••••••"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute inset-y-0 right-3 mt-1 flex items-center text-gray-500 hover:text-gray-700 text-xs"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-end">

                    <button type="button" className=" cursor-pointer text-sm text-orange-500 hover:underline">
                        Forgot password?
                    </button>
                </div>

                {/* reCAPTCHA */}
                <div className="flex justify-center">
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={SITE_KEY}
                        onChange={handleCaptchaChange}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loggingIn}
                    className="w-full cursor-pointer rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                    {loggingIn ? "Please wait..." : "Login"}
                </button>
            </form>
        </>
    );
}

/* ---------------- REGISTER FORM ---------------- */
function RegisterForm() {
    const [captchaValue, setCaptchaValue] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const recaptchaRef = useRef(null);
    const [registering, setRegistering] = useState(false);

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!captchaValue) {
            toast.error("Please complete the CAPTCHA verification");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            setRegistering(true);
            const response = await axios.post(`${API_URL}/api/auth/register`, {
                name: fullName,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                captcha: captchaValue
            });

            const data = await response.data;


            if (data.status) {
                toast.success("Registration successful");
            } else {
                toast.error(data.message || "Registration failed");
                recaptchaRef.current.reset();
                setCaptchaValue(null); 
            }
        } catch (error) {
            toast.error("Registration failed");
        } finally {
            setRegistering(false);
        }
    };

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                    type="text"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 pr-12 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-3 mt-1 flex items-center text-gray-500 hover:text-gray-700 text-xs"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <div className="relative">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 pr-12 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-3 mt-1 flex items-center text-gray-500 hover:text-gray-700 text-xs"
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                        {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                </div>
            </div>

            {/* reCAPTCHA */}
            <div className="flex justify-center">
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={SITE_KEY}
                    onChange={handleCaptchaChange}
                />
            </div>

            <button
                type="submit"
                className="w-full cursor-pointer rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
                disabled={registering}
            >
                {registering ? "Please wait..." : "Register"}
                Register
            </button>
        </form>
    );
}

export default AccountForm;
