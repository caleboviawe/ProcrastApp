import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { Button } from '../ui/button';
import { LogOut, Settings, Plus} from 'lucide-react';
import { useAppContext } from '../authServices/helper';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const [activeTab, setActiveTab] = useState('all');
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-violet-500/30 selection:text-violet-200">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-white opacity-[0.15]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/90"></div>
      </div>

      {/* HEADER */}
      <header className="bg-slate-900/60 backdrop-blur-xl border-b border-slate-800 shadow-2xl relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3">
              <Logo className="h-20 w-30 drop-shadow-2xl" />
            </Link>

            <div className="hidden md:flex items-center gap-4">
              <span className="text-slate-400 text-sm">Hey {user?.email}</span>
              
              <Button
                variant="outline"
                onClick={() => navigate("/settings")}
                className="bg-slate-950/50 border-slate-700 text-slate-300 hover:border-violet-500 hover:text-violet-300 transition-all"
              >
                <Settings size={16} />
                <span className="ml-2">Settings</span>
              </Button>

              <Button
                variant="outline"
                onClick={handleLogout}
                className="bg-slate-950/50 border-slate-700 text-slate-300 hover:border-red-500 hover:text-red-400 transition-all"
              >
                <LogOut size={16} />
                <span className="ml-2">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* LEFT SIDE */}
          <div className="lg:col-span-3 space-y-8">

            {/* Task Tabs & List */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-slate-800">
                {[
                  { id: 'all', label: 'All Tasks' },
                  { id: 'in-progress', label: 'In Progress' },
                  { id: 'completed', label: 'Completed' },
                  { id: 'archived', label: 'Archived' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-4 text-sm font-medium transition-all relative ${
                      activeTab === tab.id
                        ? 'text-white'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500"></div>
                    )}
                  </button>
                ))}
              </div>

              {/* Task Panel */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-white">Your Tasks</h2>
                  <Button 
                    onClick={() => setIsAddTaskOpen(true)}
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-600/30 rounded-xl"
                  >
                    <Plus size={18} />
                    <span className="ml-2">Add Task</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}