import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Database, User, LogOut, ArrowLeft, X } from 'lucide-react';
import landingBg from '../../assets/landing-bg-3.jpg';
import logo from '../../assets/procrastapp-logo.png';
import { useAppContext } from '../../authServices/helper';
import axios from 'axios';

/* Settings.tsx: settings page for users to change private information */

const SettingsPage: React.FC = () => {
  /* variables for logic */
  const {user, setUser} = useAppContext();
  const navigate = useNavigate();
  const googleIdNull = user?.googleId === null ? true : false;

  // Notification state
  const [notifyDeadlines, setNotifyDeadlines] = useState(user?.notifyDeadlines ?? true);
  const [notifyDailySummary, setNotifyDailySummary] = useState(user?.notifyDailySummary ?? false);
  const [notifyOverdue, setNotifyOverdue] = useState(user?.notifyOverdue ?? true);
  const [notificationLoading, setNotificationLoading] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationError, setNotificationError] = useState('');

  // Delete account modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  // Export data state
  const [exportLoading, setExportLoading] = useState(false);

  // Sync notification state when user data loads
  useEffect(() => {
    if (user) {
      setNotifyDeadlines(user.notifyDeadlines ?? true);
      setNotifyDailySummary(user.notifyDailySummary ?? false);
      setNotifyOverdue(user.notifyOverdue ?? true);
    }
  }, [user]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  // Handle save notification preferences
  const handleSaveNotifications = async () => {
    setNotificationLoading(true);
    setNotificationMessage('');
    setNotificationError('');

    try {
      const res = await axios.put(
        'http://localhost:8000/api/user/updateNotifications',
        { notifyDeadlines, notifyDailySummary, notifyOverdue },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
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
      setNotificationMessage('Notification preferences saved successfully!');
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setNotificationError(err.response.data.message);
      } else {
        setNotificationError('Failed to save notification preferences.');
      }
    } finally {
      setNotificationLoading(false);
    }
  };

  // Handle export data
  const handleExportData = async () => {
    setExportLoading(true);
    try {
      const userData = {
        profile: {
          username: user?.username,
          email: user?.email,
          role: user?.role,
          createdAt: user?.createdAt,
        },
        notifications: {
          deadlineReminders: user?.notifyDeadlines,
          dailySummary: user?.notifyDailySummary,
          overdueAlerts: user?.notifyOverdue,
        },
        exportedAt: new Date().toISOString(),
      };

      const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `procrastapp-data-${user?.username || 'user'}-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setExportLoading(false);
    }
  };

  // Handle delete account
  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      setDeleteError('Please type DELETE to confirm.');
      return;
    }

    setDeleteLoading(true);
    setDeleteError('');

    try {
      await axios.delete('http://localhost:8000/api/user/deleteAccount', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      localStorage.removeItem('token');
      setUser(null);
      navigate('/login');
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setDeleteError(err.response.data.message);
      } else {
        setDeleteError('Failed to delete account. Please try again.');
      }
    } finally {
      setDeleteLoading(false);
    }
  };

    return (
        /* main container for the settings page with background image and styling so it looks clean and matches the rest of the application! */
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
                    Settings
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
                            <User className="w-8 h-8 text-white" />
                            <h4 className="text-lg font-semibold text-white">
                                Your Profile
                            </h4>
                        </div>
                        <p className="text-slate-400">
                            Manage your personal preferences and information.
                        </p>

                        {/* for changes, a user can change the values below, and they are grabbed from the backend. if an user makes an account with google, changing the password is not shown up as an option. a user can also see the date they created their account */}
                        <div className="grid grid-cols-[1fr_2fr_2fr] gap-2 sm:gap-4 items-center">
                            {[
                                {
                                    label: "USERNAME",
                                    route: "/change-username",
                                    value: user?.username || '',
                                    show: true,
                                },
                                {
                                    label: "PASSWORD",
                                    route: "/change-password",
                                    value: "••••••••",
                                    show: googleIdNull,
                                },
                                {
                                    label: "EMAIL",
                                    route: "/change-email",
                                    value: user?.email || '',
                                    show: true,
                                },
                            ]
                            .filter(({ show }) => show)
                            .map(({ label, route, value }) => (
                                <React.Fragment key={label}>
                                    <label className="text-left md:text-right font-semibold text-slate-300">
                                        {label}:
                                    </label>
                                    <input
                                        type="text"
                                        readOnly
                                        disabled
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
                            <label className="text-right font-semibold text-slate-300">
                                DATE CREATED:
                            </label>
                            <input
                                type="text"
                                readOnly
                                disabled
                                value={
                                    user?.createdAt
                                        ? new Date(user.createdAt).toLocaleString()
                                        : ''
                                }
                                className="border border-slate-700 rounded-lg p-2 bg-slate-800 text-white placeholder:text-slate-500 col-span-2 cursor-not-allowed opacity-70"
                            />
                            <label className="text-right font-semibold text-slate-300">
                                ROLE:
                            </label>
                            <input
                                type="text"
                                readOnly
                                disabled
                                value={user?.role || ''}
                                className="border border-slate-700 rounded-lg p-2 bg-slate-800 text-white placeholder:text-slate-500 col-span-2 cursor-not-allowed opacity-70"
                            />
                        </div>
                    </div>

                    {/*data management box: users can download their data or delete their account*/}
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
                            <button 
                                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50"
                                onClick={handleExportData}
                                disabled={exportLoading}
                            >
                                {exportLoading ? 'Exporting...' : 'Export Data'}
                            </button>
                            <button 
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all"
                                onClick={() => setShowDeleteModal(true)}
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>

                    {/*notifications box: users can set the type of notifications they want*/}
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

                        {/* Success/Error messages for notifications */}
                        {notificationMessage && (
                            <div className="bg-green-600 text-white px-4 py-2 rounded-lg text-center">
                                {notificationMessage}
                            </div>
                        )}
                        {notificationError && (
                            <div className="bg-red-600 text-white px-4 py-2 rounded-lg text-center">
                                {notificationError}
                            </div>
                        )}

                        {/* Deadline Reminders */}
                        <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center md:flex-row md:justify-between md:items-center border-b border-slate-700 py-2">
                            <div className="flex flex-col">
                                <span className="font-semibold text-white">Deadline Reminders</span>
                                <span className="text-slate-400 text-sm">Receive reminders for upcoming deadlines.</span>
                            </div>
                            <input
                                type="checkbox"
                                checked={notifyDeadlines}
                                onChange={(e) => setNotifyDeadlines(e.target.checked)}
                                className="w-5 h-5 mt-2 md:mt-0 accent-violet-500 cursor-pointer"
                            />
                        </div>

                        {/* Daily Summary */}
                        <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center md:flex-row md:justify-between md:items-center border-b border-slate-700 py-2">
                            <div className="flex flex-col">
                                <span className="font-semibold text-white">Daily Summary</span>
                                <span className="text-slate-400 text-sm">Get a daily summary of your tasks and progress.</span>
                            </div>
                            <input
                                type="checkbox"
                                checked={notifyDailySummary}
                                onChange={(e) => setNotifyDailySummary(e.target.checked)}
                                className="w-5 h-5 mt-2 md:mt-0 accent-violet-500 cursor-pointer"
                            />
                        </div>

                        {/* Overdue Alerts */}
                        <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center md:flex-row md:justify-between md:items-center border-b border-slate-700 py-2">
                            <div className="flex flex-col">
                                <span className="font-semibold text-white">Overdue Alerts</span>
                                <span className="text-slate-400 text-sm">Urgent Notifications for overdue tasks</span>
                            </div>
                            <input
                                type="checkbox"
                                checked={notifyOverdue}
                                onChange={(e) => setNotifyOverdue(e.target.checked)}
                                className="w-5 h-5 mt-2 md:mt-0 accent-violet-500 cursor-pointer"
                            />
                        </div>

                        <div className="flex justify-center mt-4">
                            <button 
                                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50"
                                onClick={handleSaveNotifications}
                                disabled={notificationLoading}
                            >
                                {notificationLoading ? 'Saving...' : 'Save Selections'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Account Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 w-full max-w-md relative">
                        <button
                            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                            onClick={() => {
                                setShowDeleteModal(false);
                                setDeleteConfirmText('');
                                setDeleteError('');
                            }}
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <h3 className="text-xl font-bold text-red-500 mb-4">Delete Account</h3>
                        
                        <p className="text-slate-300 mb-4">
                            This action is <span className="text-red-500 font-semibold">permanent</span> and cannot be undone. 
                            All your data, including tasks and documents, will be permanently deleted.
                        </p>

                        <p className="text-slate-400 mb-2">
                            Type <span className="font-mono text-red-400">DELETE</span> to confirm:
                        </p>

                        <input
                            type="text"
                            value={deleteConfirmText}
                            onChange={(e) => setDeleteConfirmText(e.target.value)}
                            placeholder="Type DELETE to confirm"
                            className="w-full p-2 rounded-lg border border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 mb-4"
                        />

                        {deleteError && (
                            <div className="bg-red-600 text-white px-4 py-2 rounded-lg text-center mb-4">
                                {deleteError}
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button
                                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-all"
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setDeleteConfirmText('');
                                    setDeleteError('');
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50"
                                onClick={handleDeleteAccount}
                                disabled={deleteLoading || deleteConfirmText !== 'DELETE'}
                            >
                                {deleteLoading ? 'Deleting...' : 'Delete Account'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SettingsPage;
