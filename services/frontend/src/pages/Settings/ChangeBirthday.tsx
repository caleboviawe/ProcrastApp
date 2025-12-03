import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, Clock, LogOut, ArrowLeft } from 'lucide-react';
import landingBg from '../../assets/landing-bg-3.jpg';

const ChangeBirthday: React.FC = () => {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleBirthdayChange = () => {
        console.log("New Birthday:", birthday);
        setSuccessMessage("Sucessfully Changed.");
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center p-4 font-sans selection:bg-violet-500/30 selection:text-violet-200 relative" style={{
                backgroundImage: `url(${landingBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed'
            }}>

            <div className="w-full relative z-10 flex flex-col gap-8">
                <div className="flex justify-between items-center p-4 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl w-full mb-8">
                    <div className="flex items-center gap-3">
                        <Clock className="w-7 h-7 text-white" />
                        <h2 className="text-xl md:text-2xl font-bold text-white">ProcrastApp</h2>
                    </div>
    
                    <h4 className="text-xl md:text-2xl text-white font-semibold text-center">Settings:</h4>
    
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 border border-slate-700 text-slate-200 px-3 py-1 rounded-lg hover:bg-slate-800 transition-colors" onClick={() => navigate(-1)}>
                            <ArrowLeft className="w-4 h-4"/>
                            Back
                        </button>
                        <button className="flex items-center gap-2 border border-slate-700 text-slate-200 px-3 py-1 rounded-lg hover:bg-slate-800 transition-colors">
                            <LogOut className="w-4 h-4"/>
                            Log Out
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-4xl relative z-10 flex flex-col gap-8">

                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-6 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <Settings className='w-8 h-8 text-white'/>
                        <h4 className="text-lg font-semibold text-white">Change Birthday</h4>
                    </div>
                    
                    {successMessage && <div className="bg-green-600 text-white px-4 py-2 rounded-lg mt-6 w-full max-w-4xl text-center">{successMessage}</div>}
    
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-white font-semibold">NEW BIRTHDAY:</label>
                            <input type="date" placeholder="Selected New Date" value={birthday} onChange={(e) => setBirthday(e.target.value)} className="p-2 rounded-lg border border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 text-center" />
                        </div>

                        <button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-all self-center mt-2" onClick={handleBirthdayChange}>Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangeBirthday;