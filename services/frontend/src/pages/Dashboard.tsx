import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { Button } from '../ui/button';
import { LogOut, Settings, Plus, CheckCircle2, Clock, Circle, X, 
  Calendar, Paperclip, AlertCircle, AlertTriangle, Users, ListChecks} from 'lucide-react';
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
  const { user, setUser } = useAppContext();
  const [activeTab, setActiveTab] = useState<'all' | 'in-progress' | 'completed' | 'archived'>('all');
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);


  const handleLogout = () => {
      localStorage.removeItem("token");
      setUser(null);
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

  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const inProgressCount = tasks.filter(t => t.status === 'in-progress').length;
  const notStartedCount = tasks.filter(t => t.status === 'not-started').length;

  const completedThisWeek = tasks.filter(task => {
    if (task.status !== 'completed') return false;
    const taskDate = new Date(task.createdAt);
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    startOfWeek.setHours(0, 0, 0, 0);
    return taskDate >= startOfWeek;
  }).length;

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
              {/* Dynamic Header Based on Role */}
              {user?.role === 'admin' ? (
                <>
                  <span className="text-slate-400 text-sm font-medium">Hey admin: {user.email}</span>

                  <Button
                    variant="outline"
                    onClick={() => navigate("/admin/users")}
                    className="bg-slate-950/50 border-slate-700 text-slate-300 hover:border-violet-500 hover:text-violet-300 transition-all"
                  >
                    <Users size={16} className="mr-2" />
                    View Users
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => navigate("/admin/tasks")}
                    className="bg-slate-950/50 border-slate-700 text-slate-300 hover:border-violet-500 hover:text-violet-300 transition-all"
                  >
                    <ListChecks size={16} className="mr-2" />
                    View Tasks
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="bg-slate-950/50 border-slate-700 text-slate-300 hover:border-red-500 hover:text-red-400 transition-all"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <span className="text-slate-400 text-sm">Hey {user?.email}</span>

                  <Button
                    variant="outline"
                    onClick={() => navigate("/settings")}
                    className="bg-slate-950/50 border-slate-700 text-slate-300 hover:border-violet-500 hover:text-violet-300 transition-all"
                  >
                    <Settings size={16} className="mr-2" />
                    Settings
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="bg-slate-950/50 border-slate-700 text-slate-300 hover:border-red-500 hover:text-red-400 transition-all"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* LEFT SIDE */}
          <div className="lg:col-span-3 space-y-8">

            {/* Upcoming Deadlines Card */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-6">
              {(() => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const in3Days = new Date(today);
                in3Days.setDate(today.getDate() + 3);

                const upcomingSoon = tasks.filter(t => 
                  t.dueDate && 
                  t.status !== 'completed' && 
                  t.status !== 'archived' &&
                  new Date(t.dueDate) >= today && 
                  new Date(t.dueDate) <= in3Days
                );

                const dueOrOverdue = tasks.filter(t => 
                  t.dueDate && 
                  t.status !== 'completed' && 
                  t.status !== 'archived' &&
                  new Date(t.dueDate) <= today
                );

                const hasUrgent = dueOrOverdue.length > 0;
                const hasSoon = upcomingSoon.length > 0 && !hasUrgent;

                if (hasUrgent) {
                  return (
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-red-500/20 rounded-full flex-shrink-0">
                        <AlertCircle className="w-9 h-9 text-red-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-red-300 mb-2">
                          {dueOrOverdue.length === 1 ? 'Task Due Now!' : `${dueOrOverdue.length} Tasks Due/Overdue!`}
                        </h3>
                        <div className="space-y-2">
                          {dueOrOverdue.map(task => (
                            <div key={task.id} className="flex items-center gap-3 text-red-200">
                              <span className="font-medium truncate max-w-md">{task.title}</span>
                              {task.dueDate && (
                                <span className="text-xs bg-red-500/20 px-2 py-0.5 rounded">
                                  {new Date(task.dueDate) < today ? 'Overdue' : 'Due Today'}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                if (hasSoon) {
                  return (
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-amber-500/20 rounded-full flex-shrink-0">
                        <AlertTriangle className="w-9 h-9 text-amber-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-amber-300 mb-2">
                          Heads Up — {upcomingSoon.length} Deadline{upcomingSoon.length > 1 ? 's' : ''} Approaching
                        </h3>
                        <div className="space-y-2">
                          {upcomingSoon.map(task => (
                            <div key={task.id} className="flex items-center gap-3 text-amber-200">
                              <span className="font-medium truncate max-w-md">{task.title}</span>
                              <span className="text-xs bg-amber-500/20 px-2 py-0.5 rounded">
                                Due {new Date(task.dueDate!).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-500/20 rounded-full">
                      <CheckCircle2 className="w-9 h-9 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-emerald-300">No upcoming deadlines!</h3>
                      <p className="text-emerald-200/80 text-sm mt-1">You're all caught up. Amazing work!</p>
                    </div>
                  </div>
                );
              })()}
            </div>

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
                    onClick={() => setActiveTab(tab.id as string as typeof activeTab)}
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
                  <div className="space-y-4 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
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
                                {task.dueDate && (
                                    <span className="text-xs px-3 py-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full flex items-center gap-1.5">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(task.dueDate).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </span>
                                )}
                                {task.hasDocument && (
                                    <Link to="/editor" className="flex items-center gap-3" title="Click to view the document">
                                        <span className="text-xs px-3 py-1.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full flex items-center gap-1.5 cursor-pointer hover:bg-cyan-500/30 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-200">                                            <Paperclip className="w-3 h-3" />
                                                View Attached Document
                                        </span>                                   
                                    </Link>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <select
                                value={task.status}
                                onChange={(e) => updateTaskStatus(task.id, e.target.value as TaskStatus)}
                                className="bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-violet-500 hover:bg-slate-800/80 hover:border-slate-600 hover:text-white transition-all duration-200 cursor-pointer"
                                title='Select task status'
                            >
                                <option value="not-started">Not Started</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="archived">Archived</option>
                            </select>
                            <button
                                onClick={() => {
                                    if (confirm('Are you sure you want to delete this task?')) {
                                        setTasks(prev => prev.filter(t => t.id !== task.id));
                                    }
                                }}
                                className="text-white hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition-all"                                
                                title="Delete task"
                            >
                                <X className="w-5 h-5" />
                            </button>
            
                            </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-center text-slate-500 py-16 text-lg">No tasks here yet.</p>
                )}
            </div>
          </div>
          {/* RIGHT SIDE */}
            <div className="space-y-6">

            {/* Progress Overview */}
                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-3">
                    <div className="p-2 bg-violet-600/20 rounded-lg">
                        <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>
                    Progress Overview
                    </h3>

                    <div className="space-y-6">
                        {/* Completion Rate */}
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-400">Completion Rate</span>
                                <span className="text-white font-medium">
                                    {tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100)}%
                                </span>
                            </div>
                            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-violet-600 to-indigo-600 transition-all duration-700 ease-out"
                                    style={{ width: `${tasks.length === 0 ? 0 : (completedCount / tasks.length) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="space-y-3"> 
                            {/* Completed */}
                            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3.5 flex items-center justify-between hover:bg-emerald-500/15 transition-colors">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                                    <span className="text-sm font-medium text-emerald-300">Completed</span> 
                                </div>
                                    <span className="text-l font-bold text-emerald-300 tabular-nums tracking-tight">
                                    {completedCount}
                                    </span>
                            </div>

                            {/* In Progress */}
                            <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-3.5 flex items-center justify-between hover:bg-violet-500/15 transition-colors">
                                <div className="flex items-center gap-3">
                                    <Clock className="w-6 h-6 text-violet-400" />
                                    <span className="text-sm font-medium text-violet-300">In Progress</span>
                                </div>
                                    <span className="text-l font-bold text-violet-300 tabular-nums tracking-tight">
                                    {inProgressCount}
                                    </span>
                            </div>

                            {/* Not Started */}
                            <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-3.5 flex items-center justify-between hover:bg-slate-700/60 transition-colors">
                                <div className="flex items-center gap-3">
                                    <Circle className="w-6 h-6 text-slate-400" />
                                    <span className="text-sm font-medium text-slate-300">Not Started</span>
                                </div>
                                    <span className="text-l font-bold text-white tabular-nums tracking-tight">
                                    {notStartedCount}
                                    </span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Current Week */}
                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-6 text-center">
                    <div className="w-8 h-8 mx-auto mb-2.5 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">    
                        <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-sm font-medium text-slate-300 mb-2">This Week</h3>
                        <p className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent tabular-nums tracking-tight">
                            {completedThisWeek}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">tasks completed</p>
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