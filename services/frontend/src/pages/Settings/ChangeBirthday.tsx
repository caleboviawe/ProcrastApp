import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Settings.css'
import settingsIcon from '../../assets/settings-icon.png'


// placeholder for now

const ChangeBirthday: React.FC = () => {
    const navigate = useNavigate();

    const [birthday, setBirthday] = useState("");

    const handleUsernameChange = () => {
        console.log("New Birthday:", birthday);
    };

    return (
        <div className="change-container">
            <div className="change-header">
                <img src={settingsIcon} alt="Settings Icon" className='settings-icon'/>
                <h1>Change Birthday</h1>
            </div>
            <div className="change-box">
                <div className="field-section">
                    <label className="field-label">CHANGE BIRTHDAY:</label>
                    <input type="date" placeholder="Select New Date"/>
                </div>
                <button className="change-btn">Change</button>
            </div>
        </div>
    );
};

export default ChangeBirthday;