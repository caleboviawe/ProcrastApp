import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Settings.css'
import settingsIcon from '../../assets/settings-icon.png'
import clockIcon from '../../assets/clock-icon.png'
import logoutIcon from '../../assets/log-out.png'
import backIcon from '../../assets/back-arrow.png'


// placeholder for now

const ChangePassword: React.FC = () => {
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();

    const handlePasswordChange = () => {
        console.log("New Password:", newPassword);
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
            <div className="change=header">
                <img src={settingsIcon} alt="Settings Icon" className='settings-icon'/>
                <h1>Change Password</h1>
            </div>
            <div className="change-box">
                <div className="field-section">
                    <label className="field-label">CURRENT PASSWORD:</label>
                    <input type="text" placeholder="Enter Current Password" />
                </div>

                <div className="field-section">
                    <label className="field-label">NEW PASSWORD:</label>
                    <input type="text" placeholder="Enter New Password:" />
                    <span className="helper-text">Must have at least one uppercase and lowercase letter, a number and a special character.</span>
                </div>
                <button className="change-btn">Change</button>
            </div>
        </div>
    );
};

export default ChangePassword;