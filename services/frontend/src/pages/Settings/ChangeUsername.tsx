import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Settings.css'
import { Clock, LogOut, ArrowLeft, Settings } from 'lucide-react';

const ChangeUsername: React.FC = () => {
    const [username, setUsername] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleUsernameChange = () => {
        setSuccessMessage("");
        setErrorMessage("");

        const isValid = /^[A-Za-z_].*/.test(username);

        if (!isValid) {
            setErrorMessage("Invalid Username. Must start with a letter or underscore.");
            return;
        }

        console.log("New UserName:", username);
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
                <h1>Change Username</h1>
            </div>
            <div className="change-box">
                <div className="field-section">
                    <label className="field-label">CURRENT USERNAME:</label>
                    <input type="text" placeholder="Enter Current Username" />
                </div>

                <div className="field-section">
                    <label className="field-label">NEW USERNAME:</label>
                    <input type="text" placeholder="Enter New Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <span className="helper-text">Must start with a letter or underscore</span>
                </div>
                <button className="change-btn" onClick={handleUsernameChange}>Change</button>
            </div>
        </div>
    );
};

export default ChangeUsername;