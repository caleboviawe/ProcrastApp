import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";
import landingBg from "../../assets/landing-bg-3.jpg";
import axios from "axios";
import { useAppContext } from "../../authServices/helper";
import Navbar from "../../components/Navbar";

/* ChangeUsername.tsx: the page for users to change their username */

const ChangeUsername: React.FC = () => {
    /* variables for changing the usernameL the username is used to set the username */
    const [username, setUsername] = useState("");
    /* success and error messages for feedback to user if the username has been changed successfully */
    const [successMessage, setSuccessMessage] = useState("");
    /* error message for feedback to user if the username change failed */
    const [error, setErrorMessage] = useState("");
    /* loading state to indicate when the username change process is ongoing */
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user, setUser } = useAppContext();

    /* function to handle user logout */
    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    /* function to handle the username change when the user clicks the save changes button, the username must start with a letter or underscore */
    const handleUsernameChange = async () => {
        setSuccessMessage("");
        setErrorMessage("");

        if (!username.trim()) {
            setErrorMessage("Please enter a username.");
            return;
        }

        const isValid = /^[A-Za-z_].*/.test(username);
        if (!isValid) {
            setErrorMessage("Invalid Username. Must start with a letter or underscore.");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.put(
                "http://localhost:8000/api/user/updateUsername",
                { username },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (user) {
                setUser({ ...user, username: res.data.username || username });
            }
            setSuccessMessage("Username changed successfully.");
            setUsername("");
        // catch block to handle errors during the username change process
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response?.data?.message) {
                setErrorMessage(err.response.data.message);
            } else {
                setErrorMessage("Failed to change username. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        /* page container with background image and styles */
        <div
            className="min-h-screen w-full bg-slate-950 flex flex-col items-center p-4 sm:p-5 md:p-6 font-sans selection:bg-violet-500/30 selection:text-violet-200 relative"
            style={{
                backgroundImage: `url(${landingBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
            }}
        >
            {/* Navbar component for navigation across the app so it looks consistent */}
            <Navbar />


            {/* success and error messages that appear when the user changes their username */}
            {successMessage && (
                <div className="bg-green-600 text-white px-4 py-2 rounded-lg mt-6 w-full max-w-4xl text-center">
                    {successMessage}
                </div>
            )}
            {error && (
                <div className="bg-red-600 text-white px-4 py-2 rounded-lg mt-6 w-full max-w-4xl text-center">
                    {error}
                </div>
            )}

            <div className="flex item-center gap-4 mt-8">
                <Settings className="w-10 h-10 text-white" />
                <h1 className="text-2xl font-bold text-white">
                    Change Username
                </h1>
            </div>

            {/* box that contains the current username input, new username input and save changes button */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-6 flex flex-col gap-6 w-full max-w-4xl mt-4">
                <div className="flex flex-col gap-4">
                    <label className="text-slate-300 font-semibold">
                        CURRENT USERNAME:
                    </label>
                    <input
                        type="text"
                        readOnly
                        value={user?.username || ""}
                        className="p-2 rounded-lg border border-slate-700 bg-slate-800 text-white w-full text-center cursor-not-allowed opacity-70"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-slate-300 font-semibold">
                        NEW USERNAME:
                    </label>
                    <input
                        type="text"
                        placeholder="Enter New Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="p-2 rounded-lg border border-slate-700 bg-slate-800 text-white w-full text-center"
                    />
                    <span className="text-slate-400 text-sm text-center">
                        Must start with a letter or underscore
                    </span>
                </div>

                {/* save changes button that triggers the handleUsernameChange function */}
                <div className="flex justify-center mt-4">
                    <button
                        className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50"
                        onClick={handleUsernameChange}
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangeUsername;