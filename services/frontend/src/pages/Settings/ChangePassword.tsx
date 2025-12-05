import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings } from 'lucide-react';
import landingBg from '../../assets/landing-bg-3.jpg';
import axios from 'axios';
import { useAppContext } from '../../authServices/helper';
import Navbar from '../../components/Navbar';

/* ChangePassword.tsx: the page for users to change their password */

const ChangePassword: React.FC = () => {
    /* variables for changing the password: password is the new password, newPassword is the re-entered password */
    const [password, setPassword] = useState("");
    /* confirmPassword is used to confirm the new password entered by the user */
    const [confirmPassword, setConfirmPassword] = useState("");
     /* success and error messages for feedback to user if the password has been changed successfully */
    const [successMessage, setSuccessMessage] = useState("");
     /* error message for feedback to user if the password change failed */
    const [error, setErrorMessage] = useState("");
    /* loading state to indicate when the password change process is ongoing */
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useAppContext();

    /* function to handle user logout */
    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    /* function to handle the password change when the user clicks the save changes button, the password must meet certain criteria */
    const handlePasswordChange = async () => {
        setSuccessMessage("");
        setErrorMessage("");

        if (!password || !confirmPassword) {
            setErrorMessage("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match. Please try again.");
            return;
        }

        const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
        if (!isValid) {
            setErrorMessage("Invalid Password. Must have at least 8 characters with one uppercase, one lowercase, a number and a special character.");
            return;
        }

        setLoading(true);
        try {
            await axios.put(
                "http://localhost:8000/api/user/updatePassword",
                { password },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setSuccessMessage("Password changed successfully.");
            setPassword("");
            setConfirmPassword("");
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response?.data?.message) {
                setErrorMessage(err.response.data.message);
            } else {
                setErrorMessage("Failed to change password. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        /* page container with background image and styles */
        <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center p-4 sm:p-5 md:p-6 font-sans selection:bg-violet-500/30 selection:text-violet-200 relative" style={{
                backgroundImage: `url(${landingBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed'
            }}>
            
            {/* Navbar component for navigation across the app so it looks consistent */}
            <Navbar />

            {/* success and error messages that appear when the user changes their password */}
            {successMessage && <div className="bg-green-600 text-white px-4 py-2 rounded-lg mt-6 w-full max-w-4xl text-center">{successMessage}</div>}
            {error && <div className="bg-red-600 text-white px-4 py-2 rounded-lg mt-6 w-full max-w-4xl text-center">{error}</div>}


            {/* title and icon for the change password page */}
            <div className="flex item-center gap-4 mt-8">
                <Settings className='w-8 h-8 text-white'/>
                <h1 className="text-2xl font-bold text-white">Change Password</h1>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-6 flex flex-col gap-6 w-full max-w-4xl mt-4">
                {/* input fields for the new password and re-entered password */}
                <div className="flex flex-col gap-2">
                    <label className="text-slate-300 font-semibold">NEW PASSWORD:</label>
                    <input type="password" placeholder='Enter New Password' value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 rounded-lg border border-slate-700 bg-slate-800 text-white w-full text-center" />
                    <span className="text-slate-400 text-sm text-center">Must have at least 8 characters with one uppercase, one lowercase, a number and a special character.</span>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-slate-300 font-semibold">CONFIRM NEW PASSWORD:</label>
                    <input type="password" placeholder='Re-Enter New Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="p-2 rounded-lg border border-slate-700 bg-slate-800 text-white w-full text-center" />
                </div>

                <div className="flex justify-center mt-4">
                    <button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50" onClick={handlePasswordChange} disabled={loading}>{loading ? "Saving..." : "Save Changes"}</button>
                </div>
            </div>

        </div>
    )
};

export default ChangePassword;