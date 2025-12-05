import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings } from 'lucide-react';
import landingBg from '../../assets/landing-bg-3.jpg';
import axios from "axios";
import { useAppContext } from "../../authServices/helper";
import Navbar from "../../components/Navbar";

/* ChangeEmail.tsx: the page for users to change their email address */

const ChangeEmail: React.FC = () => {
    /* variables for changing the email: email is used to set the new email address */
    const [email, setEmail] = useState("");
    /* success and error messages for feedback to user if the email has been changed successfully */
    const [successMessage, setSuccessMessage] = useState("");
    /* error message for feedback to user if the email change failed */
    const [error, setErrorMessage] = useState("");
    /* loading state to indicate when the email change process is ongoing */
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user, setUser } = useAppContext();

    /* function to handle user logout */
    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    /* function to handle the email change when the user clicks the save changes button, the email must be a valid email format */
    const handleEmailChange = async () => {
        setSuccessMessage("");
        setErrorMessage("");

        if (!email.trim()) {
            setErrorMessage("Please enter an email address.");
            return;
        }

        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isValid) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.put(
                "http://localhost:8000/api/user/updateEmail",
                { email },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (user) {
                setUser({ ...user, email: res.data.email || email });
            }
            setSuccessMessage("Email changed successfully.");
            setEmail("");
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response?.data?.message) {
                setErrorMessage(err.response.data.message);
            } else {
                setErrorMessage("Failed to change email. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
            /* page container with background image and styles */
            <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center p-4 sm:p-5 md:p-6 font-sans selection:bg-violet-500/30 selection:text-violet-200 relative" style={{
                backgroundImage: `url(${landingBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed'
            }}>

                {/* Navbar component for navigation across the app so it looks consistent */}
                <Navbar />

                {/* success and error messages that appear when the user changes their email */}
                {successMessage && <div className="bg-green-600 text-white px-4 py-2 rounded-lg mt-6 w-full max-w-4xl text-center">{successMessage}</div>}
                {error && <div className="bg-red-600 text-white px-4 py-2 rounded-lg mt-6 w-full max-w-4xl text-center">{error}</div>}

                {/* title and icon for the change email page */}
                <div className="flex item-center gap-4 mt-8">
                    <Settings className='w-8 h-8 text-white'/>
                    <h1 className="text-2xl font-bold text-white ">Change Email</h1>
                </div>

                {/* box that contains the current email input, new email input and save changes button */}
                <div className="w-full max-w-4xl relative z-10 flex flex-col gap-8">

                    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-6 flex flex-col gap-6 w-full max-w-4xl mt-4">
        
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-white font-semibold text-center">CURRENT EMAIL:</label>
                            <input type="text" readOnly value={user?.email || ""} className="p-2 rounded-lg border border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 text-center cursor-not-allowed opacity-70" />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-white font-semibold text-center">NEW EMAIL:</label>
                            <input type="text" placeholder="Enter New Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 rounded-lg border border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 text-center" />
                        </div>

                        <button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-all self-center mt-2 disabled:opacity-50" onClick={handleEmailChange} disabled={loading}>{loading ? "Saving..." : "Save Changes"}</button>
                    </div>

                    </div>
                </div>
            </div>
        )
};

export default ChangeEmail;