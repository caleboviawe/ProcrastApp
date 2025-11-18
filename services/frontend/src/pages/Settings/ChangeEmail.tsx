import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Settings.css'
import settingsIcon from '../../assets/settings-icon.png'


// placeholder for now

const ChangeEmail: React.FC = () => {
    const [newUsername, setNewUsername] = useState("");
    const navigate = useNavigate();

    const handleUsernameChange = () => {
        console.log("New UserName:", newUsername);
        navigate("/");
    };

    return (
        <div className="change-container">
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