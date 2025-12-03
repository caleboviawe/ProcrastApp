import React from 'react';
import { useNavigate } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import { Bell, Database, Palette, User, Clock, LogOut, ArrowLeft } from 'lucide-react';
import landingBg from '../../assets/landing-bg-3.jpg';
import logo from '../../assets/procrastapp-logo.png';

const SettingsPage: React.FC = () => {
    const navigate = useNavigate();

    return (
      <div className="min-h-screen w-full flex flex-col items-center p-4 sm:p-5 md:p-6 font-sans selection:bg-violet-500/30 selection:text-violet-200 overflow-x-hidden relative" style={{
                backgroundImage: `url(${landingBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed'
            }} >
        
        <div className="w-full relative z-10 flex flex-col gap-8">

          <div className="flex flex-col md:flex-row justify-between items-center p-4 sm:p-5 md:p-4 gap-2 md:gap-3 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl mb-6">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <img src={logo} alt="ProcrastApp Logo" className="w-40 h-20"/>
            </div>

            <h4 className="text-xl md:text-2xl text-white font-semibold text-center">Settings</h4>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button className="flex items-center gap-2 border border-slate-700 text-slate-200 px-3 py-1 rounded-lg hover:bg-slate-800 transition-colors" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-4 h-4"/>
                Back
              </button>
              <button className="flex items-center gap-2 border border-slate-700 text-slate-200 px-3 py-1 rounded-lg hover:bg-slate-800 transition-colors">
                <LogOut className="w-4 h-4"/>
                Log Out
              </button>
            </div>
          </div>

        </div>

        {/*page container stuff*/}
        <div className="w-full max-w-4xl relative z-10 flex flex-col gap-8">

          {/*setting options stuff*/}
          <div className="flex flex-col gap-6">

            {/*profile box*/}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <User className="w-8 h-8 text-white"/>
                <h4 className="text-lg font-semibold text-white">Your Profile</h4>
              </div>
              <p className="text-slate-400">Manage your personal preferences and information.</p>

              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_2fr] gap-2 sm:gap-4 items-center">
                {[
                  {label: 'USERNAME', route: '/change-username' },
                  {label: 'PASSWORD', route: '/change-password' },
                  {label: 'EMAIL', route: '/change-email' },
                  {label: 'BIRTHDAY', route: '/change-birthday' },
                ].map(({ label, route }) => (
                  <React.Fragment key={label}>
                    <label className="text-left md:text-right font-semibold text-slate-300">{label}:</label>
                    <input type="text" readOnly className="border border-slate-700 rounded-lg p-2 bg-slate-800 text-white placeholder:text-slate-500" />

                    <button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-3 py-1 rounded-lg font-medium transition-all" onClick={() => navigate(route)}>Edit</button>

                  </React.Fragment>
                ))}

                <label className="text-right font-semibold text-slate-300">DATE CREATED:</label>
                <input type="text" readOnly className="border border-slate-700 rounded-lg p-2 bg-slate-800 text-white placeholder:text-slate-500 col-span-2" />
              </div>
            </div>

            {/*appearance box*/}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-6 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Palette className="w-8 h-8 text-white"/>
                  <h4 className="text-lg font-semibold text-white">Appearance</h4>
                </div>
                <p className="text-slate-400">Customize the look and feel of your workspace.</p>

                <div className="flex justify-center mt-4">
                  <DarkModeToggle />
                </div>
            </div>

            {/*data management box*/}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-6 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Database className="w-8 h-8 text-white"/>
                  <h4 className="text-lg font-semibold text-white">Data Management</h4>
                </div>

                <p className="text-slate-400">Manage your data and privacy settings.</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-all">Export Data</button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all">Delete Account</button>
                </div>
            </div>

            {/*notifications box*/}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-6 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Bell className="w-8 h-8 text-white"/>
                  <h4 className="text-lg font-semibold text-white">Notifications:</h4>
                </div>
                <p className="text-slate-400">Set your notification preferences.</p>

                {[
                  {title: 'Deadline Reminders', subtitle: 'Receive reminders for upcoming deadlines.'},
                  {title: 'Daily Summary', subtitle: 'Get a daily summary of your tasks and progress.'},
                  {title: 'Overdue Alerts', subtitle: 'Urgent Notifications for overdue tasks'},
                ].map((notif, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row md:justify-between md:items-center border-b border-slate-700 py-2">
                    <div className="flex flex-col">
                      <span className="font-semibold text-white">{notif.title}</span>
                      <span className="text-slate-400 text-sm">{notif.subtitle}</span>
                    </div>
                    <input type="checkbox" className="w-5 h-5 mt-2 md:mt-0 accent-violet-500" />
                  </div>
                ))}

                <div className="flex justify-center mt-4">
                  <button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-all">Save Selections</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
};

export default SettingsPage;

