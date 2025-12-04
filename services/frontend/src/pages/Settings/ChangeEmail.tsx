import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, Clock, LogOut, ArrowLeft } from 'lucide-react';
import landingBg from '../../assets/landing-bg-3.jpg';
import logo from '../../assets/procrastapp-logo.png';
import axios from "axios";

const ChangeEmail: React.FC = () => {
    const [email, setEmail] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = async () => {
        setSuccessMessage("");
        setErrorMessage("");

        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!isValid) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        const res = await axios.put(
            "http://localhost:8000/api/user/updateEmail",
            { email },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        if (res.status !== 200) {
            setErrorMessage("Failed to change username. Please try again.");
            return;
        }

        console.log("New email:", email);
        setSuccessMessage("Sucessfully Changed.");
    };

    return (
            <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center p-4 sm:p-5 md:p-6 font-sans selection:bg-violet-500/30 selection:text-violet-200 relative" style={{
                backgroundImage: `url(${landingBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed'
            }}>

                <div className="flex justify-between items-center p-4 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl w-full mb-6">
                <div className="flex items-center gap-3">
                    <img src={logo} alt="ProcrastApp Logo" className="w-24 h-12 sm:w-32 sm:h-16 md:w-40 md:h-20"/>
                </div>

                <h4 className="text-xl sm:text-lg md:text-2xl text-white font-semibold text-center">Settings:</h4>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 border border-slate-700 text-slate-200 px-3 py-1 rounded-lg hover:bg-slate-800 transition-colors" onClick={() => navigate(-1)}>
                        <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 md:wd-4 md:h-4"/>
                        Back
                    </button>
                    <button className="flex items-center gap-2 border border-slate-700 text-slate-200 px-3 py-1 rounded-lg hover:bg-slate-800 transition-colors">
                        <LogOut className="w-3 h-3 sm:w-4 sm:h-4 md:wd-4 md:h-4"/>
                        Log Out
                    </button>
                </div>
            </div>
                {successMessage && <div className="bg-green-600 text-white px-4 py-2 rounded-lg mt-6 w-full max-w-4xl text-center">{successMessage}</div>}
                {error && <div className="bg-red-600 text-white px-4 py-2 rounded-lg mt-6 w-full max-w-4xl text-center">{error}</div>}

                <div className="flex item-center gap-4 mt-8">
                    <Settings className='w-8 h-8 text-white'/>
                    <h1 className="text-2xl font-bold text-white ">Change Email</h1>
                </div>

                <div className="w-full max-w-4xl relative z-10 flex flex-col gap-8">

                    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-6 flex flex-col gap-6 w-full max-w-4xl mt-4">
        
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-white font-semibold text-center">NEW EMAIL:</label>
                                <input type="text" placeholder="Enter New Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 rounded-lg border border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 text-center" />
                            </div>

                            <button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-all self-center mt-2" onClick={handleEmailChange}>Save Changes</button>
                        </div>

                    </div>
                </div>
            </div>
        )
};

export default ChangeEmail;