import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Settings.css'
import { Settings, Clock, LogOut, ArrowLeft } from 'lucide-react';

const ChangePassword: React.FC = () => {
    const [password, setPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handlePasswordChange = () => {
        console.log("New Password:", password);
        setSuccessMessage("Sucessfully Changed.");
    };

    return (
        <div className="change-container">
            {successMessage && <div className="success-message">{successMessage}</div>}
            <div className='top-bar'>
                <div className='left-side'>
                    <Clock className='clock-icon' />
                    <h2 className='app-name'>ProcrastApp</h2>
                </div>

                <div className='right-side'>
                    <button className='back-btn' onClick={() => navigate(-1)}>
                        <ArrowLeft className='back-icon'/>
                        Back
                    </button>
                
                    <button className='logout-btn'>
                        <LogOut className='logout-icon'/>
                        Log Out
                    </button>
                </div>
            </div>
            <div className="change-header">
                <Settings className='settings-icon'/>
                <h1>Change Password</h1>
            </div>
            <div className="change-box">
                <div className="field-section">
                    <label className="field-label">CURRENT PASSWORD:</label>
                    <input type="password" placeholder="Enter Current Password" />
                </div>

                <div className="field-section">
                    <label className="field-label">NEW PASSWORD:</label>
                    <input type="password" placeholder="Enter New Password:" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <span className="helper-text">Must have at least one uppercase and lowercase letter, a number and a special character.</span>
                </div>
                <button className="change-btn" onClick={handlePasswordChange}>Change</button>
            </div>
        </div>
    );
};

export default ChangePassword;