import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../../utils/constants.jsx";

export default function VerifyToken() {
    const location = useLocation();
    const navigate = useNavigate();
    const [status, setStatus] = useState("loading");
    const [message, setMessage] = useState("Verifying your email, please wait...");
    const [verifying, setVerifying] = useState(false);
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");

        if (!token) {
            setStatus("error");
            setMessage("Missing verification token.");
            return;
        }
        

        const verify = async () => {
            if(verifying){
                return;
            }
            try {
                setVerifying(true)
                const response = await axios.post(`${API_URL}/api/auth/verify-email`, { token });
                const data = await response.data;
                if (data.status) {
                    setStatus("success");
                    setMessage(data.message || "Email verified successfully.");
                    toast.success("Email verified successfully");
                    setTimeout(() => navigate("/account/login"), 1500);
                } else {
                    setStatus("error");
                    setMessage(data.message || "Verification failed. Invalid or expired token.");
                    toast.error(data.message || "Verification failed");
                }
            } catch (error) {
                setStatus("error");
                console.log(error)
                setMessage("Verification failed. Please try again later.");
            }finally{
                setVerifying(false)
            }
        };

        verify();
    }, [location.search, navigate]);

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
                <div className="mb-4">
                    {status === "loading" && (
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin mb-4"></div>
                            <p className="text-gray-700 text-sm">{message}</p>
                        </div>
                    )}
                    {status === "success" && (
                        <div>
                            <h2 className="text-lg font-semibold text-green-600 mb-2">Verification Successful</h2>
                            <p className="text-gray-700 text-sm">{message}</p>
                        </div>
                    )}
                    {status === "error" && (
                        <div>
                            <h2 className="text-lg font-semibold text-red-600 mb-2">Verification Failed</h2>
                            <p className="text-gray-700 text-sm">{message}</p>
                        </div>
                    )}
                </div>
                <div className="mt-6">
                    <button
                        onClick={() => navigate("/")}
                        className="cursor-pointer px-4 py-2 rounded-full bg-black text-white text-sm font-semibold hover:bg-gray-900"
                    >
                        Go Home
                    </button>
                    <button
                        onClick={() => navigate("/account/login")}
                        className="cursor-pointer ml-2 px-4 py-2 rounded-full bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        </div>
    );
}


