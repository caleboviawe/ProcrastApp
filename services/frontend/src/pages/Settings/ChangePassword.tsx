import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Settings.css'
import settingsIcon from '../../assets/settings-icon.png'


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