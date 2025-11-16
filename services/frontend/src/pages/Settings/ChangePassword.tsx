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
        <div>
            <h1>Change Password</h1>
            <input 
            type="password"
            value={newPassword}
            onChange={(e) =>  setNewPassword(e.target.value)}
            placeholder="Enter new password"
            />
            <button onClick={handlePasswordChange}>Save</button>
            <button onClick={() => navigate("/")}>Cancel</button>
        </div>
    );
};

export default ChangePassword;