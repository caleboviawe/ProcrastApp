import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Settings.css'
import { Settings, Clock, LogOut, ArrowLeft } from 'lucide-react';

const ChangeEmail: React.FC = () => {
    const [Email, setEmail] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = () => {
        setSuccessMessage("");
        setErrorMessage("");

        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email);

        if (!isValid) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        console.log("New Email:", Email);
        setSuccessMessage("Sucessfully Changed.");
    };

    return (
        <div className="change-container">
            {successMessage && <div className="success-message">{successMessage}</div>}
            {error && <div className="error-message">{error}</div>}
            <div className='top-bar'>
                <div className='left-side'>
                    <Clock className='clock-icon' />
                    <h2 className='app-name'>ProcrastApp</h2>
                </div>

                <div className='main-page-title'>Settings</div>

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
                <h1>Change Email</h1>
            </div>
            <div className="change-box">
                <div className="field-section">
                    <label className="field-label">CHANGE EMAIL:</label>
                    <input type="text" placeholder="Enter New Email Address" value={Email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <button className="change-btn" onClick={handleEmailChange}>Save Changes</button>
            </div>
        </div>
    );
};

export default ChangeEmail;