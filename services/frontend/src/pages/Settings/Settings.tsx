import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, User, LogOut, ArrowLeft } from 'lucide-react';
import landingBg from '../../assets/landing-bg-3.jpg';
import logo from '../../assets/procrastapp-logo.png';
import { useAppContext } from '../../authServices/helper';
import axios from 'axios';

const SettingsPage: React.FC = () => {
  const { user, setUser } = useAppContext();
  const navigate = useNavigate();
  const isGoogleUser = user?.googleId !== null;

  const [notifyDeadlines, setNotifyDeadlines] = useState(user?.notifyDeadlines ?? true);
  const [notifyDailySummary, setNotifyDailySummary] = useState(user?.notifyDailySummary ?? false);
  const [notifyOverdue, setNotifyOverdue] = useState(user?.notifyOverdue ?? true);
  const [notifLoading, setNotifLoading] = useState(false);
  const [notifSuccess, setNotifSuccess] = useState("");
  const [notifError, setNotifError] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const handleSaveNotifications = async () => {
    setNotifSuccess("");
    setNotifError("");
    setNotifLoading(true);
    try {
      const res = await axios.put(
        "http://localhost:8000/api/user/updateNotifications",
        { notifyDeadlines, notifyDailySummary, notifyOverdue },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (user) {
        setUser({
          ...user,
          notifyDeadlines: res.data.notifications.notifyDeadlines,
          notifyDailySummary: res.data.notifications.notifyDailySummary,
          notifyOverdue: res.data.notifications.notifyOverdue,
        });
      }
      setNotifSuccess("Notification preferences saved!");
    } catch {
      setNotifError("Failed to save notification preferences.");
    } finally {
      setNotifLoading(false);
    }
  };

  const profileFields = [
    {
      label: "USERNAME",
      route: "/change-username",
      value: user?.username || "",
      show: true,
    },
    {
      label: "PASSWORD",
      route: "/change-password",
      value: "••••••••",
      show: !isGoogleUser,
    },
    {
      label: "EMAIL",
      route: "/change-email",
      value: user?.email || "",
      show: true,
    },
  ].filter(field => field.show);

    return (
        <div
            className="min-h-screen w-full flex flex-col items-center p-4 sm:p-5 md:p-6 font-sans selection:bg-violet-500/30 selection:text-violet-200 overflow-x-hidden relative"
            style={{
                backgroundImage: `url(${landingBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
            }}
        >
            
            {/* the top bar that appears on the page */}
            <div className="flex justify-between items-center p-4 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl w-full mb-6">
                <div className="flex items-center gap-3">
                    <img
                        src={logo}
                        alt="ProcrastApp Logo"
                        className="w-24 h-12 sm:w-32 sm:h-16 md:w-40 md:h-20"
                    />
                </div>

                <h4 className="text-xl sm:text-lg md:text-2xl text-white font-semibold text-center">
                    Settings:
                </h4>

                <div className="flex items-center gap-3">
                    <button
                        className="flex items-center gap-2 border border-slate-700 text-slate-200 px-3 py-1 rounded-lg hover:bg-slate-800 transition-colors"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 md:wd-4 md:h-4" />
                        Back
                    </button>
                    <button 
                        className="flex items-center gap-2 border border-slate-700 text-slate-200 px-3 py-1 rounded-lg hover:bg-slate-800 transition-colors"
                        onClick={handleLogout}
                    >
                        <LogOut className="w-3 h-3 sm:w-4 sm:h-4 md:wd-4 md:h-4" />
                        Log Out
                    </button>
                </div>
            </div>

            {/*page container stuff*/}
            <div className="w-full max-w-4xl relative z-10 flex flex-col gap-8">
                {/*setting options stuff in the box that appears on screen*/}
                <div className="flex flex-col gap-6">
                    {/*profile box (user can make changes like username, password, email and can see their role) */}
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-6 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <User className="w-8 h-8 text-slate-900 dark:text-white" />
                            <h4 className="text-lg font-semibold text-white">
                                Your Profile
                            </h4>
                        </div>
                        <p className="text-slate-400">
                            Manage your personal preferences and information.
                        </p>

                        {/* for changes, a user can change the values below, and they are grabbed from the backend. if an user makes an account with google, changing the password is not shown up as an option. a user can also see the date they created their account */}
                        <div className="grid grid-cols-[1fr_2fr_2fr] gap-2 sm:gap-4 items-center">
                            {profileFields.map(({ label, route, value }) => (
                                <React.Fragment key={label}>
                                    <label className="text-left md:text-right font-semibold text-slate-300">
                                        {label}:
                                    </label>
                                    <input
                                        type={label === "PASSWORD" ? "password" : "text"}
                                        readOnly
                                        value={value}
                                        className="border border-slate-700 rounded-lg p-2 bg-slate-800 text-white placeholder:text-slate-500 cursor-not-allowed opacity-70"
                                    />
                                    <button
                                        className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-3 py-1 rounded-lg font-medium transition-all"
                                        onClick={() => navigate(route)}
                                    >
                                        Change
                                    </button>
                                </React.Fragment>
                            ))}
                            <label className="text-left md:text-right font-semibold text-slate-300">
                                DATE CREATED:
                            </label>
                            <span className="text-white col-span-2">
                                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                            </span>
                            <label className="text-left md:text-right font-semibold text-slate-300">
                                ROLE:
                            </label>
                            <span className="text-white col-span-2 capitalize">
                                {user?.role || "N/A"}
                            </span>
                        </div>
                    </div>

                    {/* Notifications section */}
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-6 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <Bell className="w-8 h-8 text-white" />
                            <h4 className="text-lg font-semibold text-white">
                                Notifications
                            </h4>
                        </div>
                        <p className="text-slate-400">
                            Set your notification preferences.
                        </p>

                        {notifSuccess && (
                            <div className="bg-green-600 text-white px-4 py-2 rounded-lg text-center">
                                {notifSuccess}
                            </div>
                        )}
                        {notifError && (
                            <div className="bg-red-600 text-white px-4 py-2 rounded-lg text-center">
                                {notifError}
                            </div>
                        )}

                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center border-b border-slate-700 py-2">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-white">Deadline Reminders</span>
                                    <span className="text-slate-400 text-sm">Receive reminders for upcoming deadlines.</span>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={notifyDeadlines}
                                    onChange={(e) => setNotifyDeadlines(e.target.checked)}
                                    className="w-5 h-5 mt-2 sm:mt-0 accent-violet-500"
                                />
                            </div>
                            <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center border-b border-slate-700 py-2">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-white">Daily Summary</span>
                                    <span className="text-slate-400 text-sm">Get a daily summary of your tasks and progress.</span>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={notifyDailySummary}
                                    onChange={(e) => setNotifyDailySummary(e.target.checked)}
                                    className="w-5 h-5 mt-2 sm:mt-0 accent-violet-500"
                                />
                            </div>
                            <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center border-b border-slate-700 py-2">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-white">Overdue Alerts</span>
                                    <span className="text-slate-400 text-sm">Urgent notifications for overdue tasks.</span>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={notifyOverdue}
                                    onChange={(e) => setNotifyOverdue(e.target.checked)}
                                    className="w-5 h-5 mt-2 sm:mt-0 accent-violet-500"
                                />
                            </div>
                        </div>

                        <div className="flex justify-center mt-4">
                            <button
                                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50"
                                onClick={handleSaveNotifications}
                                disabled={notifLoading}
                            >
                                {notifLoading ? "Saving..." : "Save Selections"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
