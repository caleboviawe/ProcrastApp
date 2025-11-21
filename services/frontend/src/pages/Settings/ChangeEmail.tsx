import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Settings.css'
import settingsIcon from '../../assets/settings-icon.png'
import clockIcon from '../../assets/clock-icon.png'
import logoutIcon from '../../assets/log-out.png'
import backIcon from '../../assets/back-arrow.png'

const ChangeEmail: React.FC = () => {
    const [newEmail, setEmail] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = () => {
        console.log("New Email:", newEmail);
        navigate("/");
    };

    return (
        <div className="change-container">
            <div className='top-bar'>
                <div className='left-side'>
                    <img src={clockIcon} alt="Clock Icon" className='clock-icon' />
                    <h2 className='app-name'>ProcrastApp</h2>
                </div>

                <div className='right-side'>
                    <button className='back-btn' onClick={() => navigate(-1)}>
                        <img src={backIcon} alt="Back" />
                        Back
                    </button>
                
                    <button className='logout-btn'>
                        <img src={logoutIcon} alt="Log Out" />
                        Log Out
                    </button>
                </div>
            </div>
            <div className="change-header">
                <img src={settingsIcon} alt="Settings Icon" className='settings-icon'/>
                <h1>Change Email</h1>
            </div>
            <div className="change-box">
                <div className="field-section">
                    <label className="field-label">CHANGE EMAIL:</label>
                    <input type="text" placeholder="Enter New Email Address" />
                </div>
                <button className="change-btn">Change</button>
            </div>
        </div>
    );
};

export default ChangeEmail;