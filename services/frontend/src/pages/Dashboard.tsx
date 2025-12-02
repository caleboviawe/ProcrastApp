import { useState } from "react";
import { Link } from "react-router-dom";
import {
    CheckCircle,
    Plus,
    Calendar,
    TrendingUp,
    User,
    LogOut,
    Clock,
} from "lucide-react";
import { useAppContext } from "../authServices/helper";

const Dashboard = () => {
    const { user, setUser } = useAppContext();
    const [tasks] = useState([
        {
            id: 1,
            title: "Review project proposal",
            completed: false,
            dueDate: "2025-12-02",
        },
        {
            id: 2,
            title: "Update landing page design",
            completed: true,
            dueDate: "2025-11-30",
        },
        {
            id: 3,
            title: "Team meeting preparation",
            completed: false,
            dueDate: "2025-12-01",
        },
        {
            id: 4,
            title: "Code review for PR #234",
            completed: true,
            dueDate: "2025-11-29",
        },
        {
            id: 5,
            title: "Write documentation",
            completed: false,
            dueDate: "2025-12-03",
        },
    ]);

    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;
    const completionRate = Math.round((completedTasks / totalTasks) * 100);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        window.location.href = "/login";
    };
    console.log(user);
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50">
            {/* Navigation */}
            <nav className="bg-slate-900/50 border-b border-slate-800 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/20">
                                <CheckCircle className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                                ProcrastApp
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                to="/profile"
                                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                            >
                                <User className="w-5 h-5" />
                                <span className="hidden sm:inline">
                                    Profile
                                </span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Background effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-20 left-1/4 w-72 h-72 bg-violet-500/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-[100px]"></div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        Welcome back! 👋
                    </h1>
                    <p className="text-slate-400">
                        Here's what you need to focus on today.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard
                        icon={
                            <CheckCircle className="w-6 h-6 text-violet-400" />
                        }
                        title="Completed Tasks"
                        value={`${completedTasks}/${totalTasks}`}
                        subtitle="This week"
                        gradient="from-violet-500/20 to-violet-500/5"
                    />
                    <StatCard
                        icon={
                            <TrendingUp className="w-6 h-6 text-indigo-400" />
                        }
                        title="Completion Rate"
                        value={`${completionRate}%`}
                        subtitle="Overall progress"
                        gradient="from-indigo-500/20 to-indigo-500/5"
                    />
                    <StatCard
                        icon={<Clock className="w-6 h-6 text-fuchsia-400" />}
                        title="Active Streak"
                        value="7 days"
                        subtitle="Keep it going!"
                        gradient="from-fuchsia-500/20 to-fuchsia-500/5"
                    />
                </div>

                {/* Tasks Section */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                        <h2 className="text-2xl font-bold text-white">
                            Your Tasks
                        </h2>
                        <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-lg shadow-violet-500/25">
                            <Plus className="w-5 h-5" />
                            Add Task
                        </button>
                    </div>

                    <div className="space-y-3">
                        {tasks.map((task) => (
                            <TaskItem key={task.id} task={task} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({
    icon,
    title,
    value,
    subtitle,
    gradient,
}: {
    icon: React.ReactNode;
    title: string;
    value: string;
    subtitle: string;
    gradient: string;
}) => (
    <div
        className={`bg-gradient-to-br ${gradient} border border-slate-800 rounded-xl p-6 hover:border-violet-500/30 transition-all`}
    >
        <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-slate-800/50 rounded-lg flex items-center justify-center">
                {icon}
            </div>
        </div>
        <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
        <p className="text-sm text-slate-400 mb-1">{title}</p>
        <p className="text-xs text-slate-500">{subtitle}</p>
    </div>
);

const TaskItem = ({
    task,
}: {
    task: { id: number; title: string; completed: boolean; dueDate: string };
}) => {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    const isOverdue = dueDate < today && !task.completed;
    const isDueToday = dueDate.toDateString() === today.toDateString();

    return (
        <div
            className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                task.completed
                    ? "bg-slate-800/30 border-slate-800"
                    : "bg-slate-800/50 border-slate-700 hover:border-violet-500/30"
            }`}
        >
            <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    task.completed
                        ? "bg-violet-500 border-violet-500"
                        : "border-slate-600 hover:border-violet-500"
                } transition-all cursor-pointer`}
            >
                {task.completed && (
                    <CheckCircle className="w-4 h-4 text-white" />
                )}
            </div>
            <div className="flex-1 min-w-0">
                <p
                    className={`font-medium truncate ${
                        task.completed
                            ? "text-slate-500 line-through"
                            : "text-white"
                    }`}
                >
                    {task.title}
                </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
                <Calendar className="w-4 h-4 text-slate-500" />
                <span
                    className={`text-sm ${
                        isOverdue
                            ? "text-red-400"
                            : isDueToday
                            ? "text-yellow-400"
                            : "text-slate-400"
                    }`}
                >
                    {dueDate.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                    })}
                </span>
            </div>
        </div>
    );
};

export default Dashboard;