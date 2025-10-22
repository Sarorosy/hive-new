import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, X } from "lucide-react";
import logo from '../../assets/logo-transparent.png'
import { API_URL, SITE_KEY } from "../../utils/constants";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import { useAuth } from "../../utils/idb";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [captchaValue, setCaptchaValue] = useState(null);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const recaptchaRef = useRef(null);
    const [token, setToken] = useState(null);
    const { admin, adminlogin } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // useEffect(()=>{
    //     if(admin && admin?.token){
    //         navigate("/webmaster/")
    //     }
    // },[]);

   

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error("Fields should not be empty");
            return;
        }
        try {
            setToken(null);
            setSubmitting(true);
            const response = await fetch(`${API_URL}/api/admin/auth/login`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    captcha: captchaValue
                })
            });

            const data = await response.json();
            if (data?.status && data?.token) {
                setToken(data.token);
                setShowOtpModal(true);
            } else {
                recaptchaRef.current.reset();
                setCaptchaValue(null); 
                toast.error(data.message || "Error while login")
            }
        } catch (err) {
            console.log(err);
            toast.error("Error")
        } finally {
            setSubmitting(false);
        }
    };

    const handleOtpChange = (value, index) => {
        if (!/^[0-9]?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // auto-focus next box
        if (value && index < 5) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    const handleVerifyOtp = async () => {
        const enteredOtp = otp.join("");
        if (enteredOtp.length !== 6) {
            toast.error("Please enter 6 digits OTP");
        }
        try {
            const response = await fetch(`${API_URL}/api/admin/auth/verify`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    otp: enteredOtp
                })
            });

            const data = await response.json();
            if (data?.status && data?.user) {
                adminlogin({ ...data.user, token: data.token });
                setShowOtpModal(false);
                toast.success("Login Successfull");
                setTimeout(()=>{
                    navigate("/webmaster/")
                },800)
            } else {
                toast.error(data.message || "Error while login")
            }

        } catch (err) {
            console.log(err);
            toast.error("Error")
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <motion.div
                className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className="flex mb-3 justify-center bg-gray-50 border-b border-gray-200 py-2">
                    <img
                        src={logo}
                        alt="Company Logo"
                        className="h-10 object-contain"
                    />
                </div>
                <h2 className="text-2xl font-bold text-center mb-3 text-gray-800">
                    Webmaster Admin Login
                </h2>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block mb-1 text-gray-600">Email</label>
                        <div className="flex items-center border rounded-lg px-3">
                            <Mail size={18} className="text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full p-2 outline-none"
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-600">Password</label>
                        <div className="flex items-center border rounded-lg px-3">
                            <Lock size={18} className="text-gray-400" />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full p-2 outline-none"
                                placeholder="Enter your password"
                            />
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
                        disabled={submitting}
                        className="w-full bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-700 transition"
                    >
                        {submitting ? "Please wait.." : "Login"}
                    </button>
                </form>
            </motion.div>

            {/* OTP Modal */}
            <AnimatePresence>
                {showOtpModal && (
                    <motion.div
                        className="fixed inset-0 bg-[#0000009e] bg-opacity-40 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm text-center relative"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="text-xl font-semibold mb-3 text-gray-800">
                                Enter OTP
                            </h3>
                            <p className="absolute top-2 right-2 bg-red-500 text-white rounded cursor-pointer"
                                onClick={() => { setShowOtpModal(false) }}
                            >
                                <X />
                            </p>
                            <p className="text-gray-500 mb-5">We’ve sent a 6-digit code to your email.</p>

                            <div className="flex justify-center gap-2 mb-5">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`otp-${index}`}
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleOtpChange(e.target.value, index)}
                                        className="w-10 h-10 border rounded-lg text-center text-lg font-semibold focus:border-orange-500 outline-none"
                                    />
                                ))}
                            </div>

                            <button
                                onClick={handleVerifyOtp}
                                disabled={submitting}
                                className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition"
                            >
                                {submitting ? "Please wait.." : "Verify OTP"}
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
