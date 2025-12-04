import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { Button } from '../ui/button';
import { LogOut, Settings, Plus, CheckCircle2, Clock, Circle} from 'lucide-react';
import { useAppContext } from '../authServices/helper';
import AddTaskForm from '../components/AddTaskForm';

type TaskStatus = 'not-started' | 'in-progress' | 'completed' | 'archived';

interface Task {
  id: string;
  title: string;
  category: string;
  dueDate?: string;
  hasDocument: boolean;
  status: TaskStatus;
  createdAt: string;
}


export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const [activeTab, setActiveTab] = useState<'all' | 'in-progress' | 'completed' | 'archived'>('all');
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    // I'm just using this placeholder for now
    {
      id: '1',
      title: 'Complete 513 Mockups',
      category: 'other',
      dueDate: undefined,
      hasDocument: false,
      status: 'not-started',
      createdAt: new Date().toISOString(),
    },
  ]);


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleTaskCreated = (newTask: Partial<Task>) => {
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title || 'Untitled Task',
      category: newTask.category || 'other',
      dueDate: newTask.dueDate,
      hasDocument: newTask.hasDocument || false,
      status: 'not-started',
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, task]);
  };

  const updateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const getStatusConfig = (status: TaskStatus) => {
    switch (status) {
      case 'not-started':
        return { label: 'Not Started', color: 'red', icon: Circle };
      case 'in-progress':
        return { label: 'In Progress', color: 'violet', icon: Clock };
      case 'completed':
        return { label: 'Completed', color: 'emerald', icon: CheckCircle2 };
      case 'archived':
        return { label: 'Archived', color: 'slate', icon: Circle };
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      work: 'blue',
      personal: 'purple',
      health: 'green',
      learning: 'yellow',
      other: 'orange',
    };
    return colors[category] || 'orange';
  };

  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'all') return true;
    if (activeTab === 'in-progress') return task.status === 'in-progress';
    if (activeTab === 'completed') return task.status === 'completed';
    if (activeTab === 'archived') return task.status === 'archived';
    return false;
  });

  const hasTasks = filteredTasks.length > 0;

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
                    onClick={() => setActiveTab(tab.id as any)}
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
              {/* Task List */}
                {hasTasks ? (
                  <div className="space-y-4">
                    {filteredTasks.map(task => {
                      const status = getStatusConfig(task.status);
                      const StatusIcon = status.icon;
                      const categoryColor = getCategoryColor(task.category);

                      return (
                        <div key={task.id} className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 flex items-center justify-between hover:border-violet-600/50 transition-all">
                          <div className="flex items-center gap-5">
                            <StatusIcon className={`w-6 h-6 text-${status.color}-400`} />
                            <div>
                              <h4 className="text-lg font-medium text-white">{task.title}</h4>
                              <div className="flex items-center gap-3 mt-3">
                                <span className={`text-xs px-3 py-1.5 bg-${categoryColor}-500/20 text-${categoryColor}-300 border border-${categoryColor}-500/40 rounded-full`}>
                                  {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                                </span>
                                <span className={`text-xs px-3 py-1.5 bg-${status.color}-500/20 text-${status.color}-300 border border-${status.color}-500/40 rounded-full flex items-center gap-1.5`}>
                                  <StatusIcon className={`w-3 h-3 ${status.color === 'red' || status.color === 'slate' ? 'fill-current' : ''}`} />
                                  {status.label}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Status Dropdown */}
                          <select
                            value={task.status}
                            onChange={(e) => updateTaskStatus(task.id, e.target.value as TaskStatus)}
                            className="bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-violet-500"
                          >
                            <option value="not-started">Not Started</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="archived">Archived</option>
                          </select>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-center text-slate-500 py-16 text-lg">No tasks here yet.</p>
                )}
            </div>
          </div>
        </div>
      </main>
      {/* Add Task Modal */}
      <AddTaskForm
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        onTaskCreated={handleTaskCreated}
      />
    </div>
  );
}