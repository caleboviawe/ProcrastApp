import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { Button } from '../ui/button';
import { LogOut, Settings, Plus } from 'lucide-react';
import { useAppContext } from '../authServices/helper';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAppContext();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-violet-500/30 selection:text-violet-200">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-white opacity-[0.2]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80"></div>
      </div>

      {/* HEADER */}
      <header className="bg-slate-900/60 backdrop-blur-xl border-b border-slate-800 shadow-lg relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center">
              <Logo className="h-14 w-auto drop-shadow-xl" />
            </Link>

            <div className="hidden md:flex items-center space-x-4">

              <span className="text-slate-300 flex items-center gap-1">
                <span>👋</span>
                <span>Welcome, {user?.email}</span>
              </span>

              <Button
                variant="outline"
                onClick={() => navigate("/settings")}
                className="flex items-center space-x-2 bg-slate-950 border-slate-800 text-slate-300 hover:border-violet-500 hover:text-white transition-colors"
              >
                <Settings size={16} />
                <span>Settings</span>
              </Button>

              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-slate-950 border-slate-800 text-slate-300 hover:border-red-500 hover:text-red-300 transition-colors"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </Button>

            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-6">
                {/* TASK PANEL */}
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-xl p-6">
                    <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-white drop-shadow">
                        Your Tasks
                    </h2>
                    <Button
                        className="flex items-center space-x-2 bg-gradient-to-r from-violet-600 to-indigo-600 
                                hover:from-violet-500 hover:to-indigo-500 text-white 
                                shadow-lg shadow-violet-500/25 transition-all"
                    >
                        <Plus size={16} />
                        <span>Add Task</span>
                    </Button>
                    </div>
                </div>
            </div>
        </div>
    </main>

    </div>
  );
}
