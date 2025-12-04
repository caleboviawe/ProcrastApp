import React, { use } from 'react';
import { useNavigate } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import { Bell, Database, Palette, User, Clock, LogOut, ArrowLeft } from 'lucide-react';
import landingBg from '../../assets/landing-bg-3.jpg';
import logo from '../../assets/procrastapp-logo.png';
import { useAppContext } from '../../authServices/helper';

const SettingsPage: React.FC = () => {
  const {user} = useAppContext();
  const navigate = useNavigate();
  const googleIdNull = user?.googleId === null ? true : false;

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
                    <button className="flex items-center gap-2 border border-slate-700 text-slate-200 px-3 py-1 rounded-lg hover:bg-slate-800 transition-colors">
                        <LogOut className="w-3 h-3 sm:w-4 sm:h-4 md:wd-4 md:h-4" />
                        Log Out
                    </button>
                </div>
            </div>

            {/*page container stuff*/}
            <div className="w-full max-w-4xl relative z-10 flex flex-col gap-8">
                {/*setting options stuff*/}
                <div className="flex flex-col gap-6">
                    {/*profile box*/}
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-6 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <User className="w-8 h-8 text-white" />
                            <h4 className="text-lg font-semibold text-white">
                                Your Profile
                            </h4>
                        </div>
                        <p className="text-slate-400">
                            Manage your personal preferences and information.
                        </p>

                        <div className="grid grid-cols-[1fr_2fr_2fr] gap-2 sm:gap-4 items-center">
                            {[
                                {
                                    label: "USERNAME",
                                    route: "/change-username",
                                    placeholder: user?.username,
                                },
                                {
                                    label: "PASSWORD",
                                    route: "/change-password",
                                    placeholder: user?.password,
                                    show: googleIdNull,
                                },
                                {
                                    label: "EMAIL",
                                    route: "/change-email",
                                    placeholder: user?.email,
                                },
                            ].map(({ label, route, placeholder }) => (
                                <React.Fragment key={label}>
                                    <label className="text-left md:text-right font-semibold text-slate-300">
                                        {label}:
                                    </label>
                                    <input
                                        type="text"
                                        readOnly
                                        placeholder={placeholder}
                                        className="border border-slate-700 rounded-lg p-2 bg-slate-800 text-white placeholder:text-slate-500"
                                    />

                                    <button
                                        className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-3 py-1 rounded-lg font-medium transition-all"
                                        onClick={() => navigate(route)}
                                    >
                                        Edit
                                    </button>
                                </React.Fragment>
                            ))}
                            <label className="text-right font-semibold text-slate-300">
                                DATE CREATED:
                            </label>
                            <input
                                type="text"
                                readOnly
                                placeholder={
                                    user?.createdAt &&
                                    new Date(user.createdAt).toLocaleString()
                                }
                                className="border border-slate-700 rounded-lg p-2 bg-slate-800 text-white placeholder:text-slate-500 col-span-2"
                            />
                            <label className="text-right font-semibold text-slate-300">
                                ROLE:
                            </label>
                            <input
                                type="text"
                                readOnly
                                placeholder={user?.role}
                                className="border border-slate-700 rounded-lg p-2 bg-slate-800 text-white placeholder:text-slate-500 col-span-2"
                            />
                        </div>
                    </div>

                    {/*appearance box*/}
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-6 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <Palette className="w-8 h-8 text-white" />
                            <h4 className="text-lg font-semibold text-white">
                                Appearance
                            </h4>
                        </div>
                        <p className="text-slate-400">
                            Customize the look and feel of your workspace.
                        </p>

                        <div className="flex justify-center mt-4">
                            <DarkModeToggle />
                        </div>
                    </div>

                    {/*data management box*/}
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-6 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <Database className="w-8 h-8 text-white" />
                            <h4 className="text-lg font-semibold text-white">
                                Data Management
                            </h4>
                        </div>

                        <p className="text-slate-400">
                            Manage your data and privacy settings.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-all">
                                Export Data
                            </button>
                            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all">
                                Delete Account
                            </button>
                        </div>
                    </div>

                    {/*notifications box*/}
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-6 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <Bell className="w-8 h-8 text-white" />
                            <h4 className="text-lg font-semibold text-white">
                                Notifications:
                            </h4>
                        </div>
                        <p className="text-slate-400">
                            Set your notification preferences.
                        </p>

                        {[
                            {
                                title: "Deadline Reminders",
                                subtitle:
                                    "Receive reminders for upcoming deadlines.",
                            },
                            {
                                title: "Daily Summary",
                                subtitle:
                                    "Get a daily summary of your tasks and progress.",
                            },
                            {
                                title: "Overdue Alerts",
                                subtitle:
                                    "Urgent Notifications for overdue tasks",
                            },
                        ].map((notif, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center md:flex-row md:justify-between md:items-center border-b border-slate-700 py-2"
                            >
                                <div className="flex flex-col">
                                    <span className="font-semibold text-white">
                                        {notif.title}
                                    </span>
                                    <span className="text-slate-400 text-sm">
                                        {notif.subtitle}
                                    </span>
                                </div>
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 mt-2 md:mt-0 accent-violet-500"
                                />
                            </div>
                        ))}

                        <div className="flex justify-center mt-4">
                            <button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-all">
                                Save Selections
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
