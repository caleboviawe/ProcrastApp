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
        <div>
            <h1>Change Username</h1>
            <input 
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="Enter new username"
            />
            <button onClick={handleUsernameChange}>Save</button>
            <button onClick={() => navigate("/")}>Cancel</button>
        </div>
    );
};

export default ChangeEmail;