import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Settings.css'
import { Settings, Clock, LogOut, ArrowLeft } from 'lucide-react';

const ChangeBirthday: React.FC = () => {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleBirthdayChange = () => {
        console.log("New Birthday:", birthday);
        setSuccessMessage("Sucessfully Changed.");
    };

    return (
        <div className="change-container">
            {successMessage && <div className="success-message">{successMessage}</div>}
            <div className='top-bar'>
                <div className='left-side'>on
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
                <h1>Change Birthday</h1>
            </div>
            <div className="change-box">
                <div className="field-section">
                    <label className="field-label">CHANGE BIRTHDAY:</label>
                    <input type="date" placeholder="Select New Date" value={birthday} onChange={(e) => setBirthday(e.target.value)}/>
                </div>
                <button className="change-btn" onClick={handleBirthdayChange}>Save Changes</button>
            </div>
        </div>
    );
};

export default ChangeBirthday;