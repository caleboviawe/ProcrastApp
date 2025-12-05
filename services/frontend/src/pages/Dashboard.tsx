import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { Button } from "../ui/button";
import {
    LogOut,
    Settings,
    Plus,
    CheckCircle2,
    Clock,
    Circle,
    X,
    Calendar,
    Paperclip,
    AlertCircle,
    AlertTriangle,
    Users,
    ListChecks,
} from "lucide-react";
import { useAppContext } from "../authServices/helper";
import AddTaskForm from "../components/AddTaskForm";
import type { Task, TaskStatus } from "../type"; // Adjust path if needed
import LoadingScreen from "../components/LoadingScreen";
import Notifications from "../components/Notifications";

export default function Dashboard() {
    const navigate = useNavigate();
    const { user, setUser } = useAppContext();
    const [activeTab, setActiveTab] = useState<
        "all" | "in-progress" | "completed" | "archived"
    >("all");
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [notifMessage, setNotifMessage] = useState<string | null>(null);

    /* Effect to check for notifications based on user preferences and task statuses */
  useEffect(() => {
    if (!user) {
      return;
    }

    const timeout = setTimeout(() => {
      const now = new Date();

      if (user.notifyDeadlines) {
        const in48Hours = new Date();
        in48Hours.setHours(now.getHours() + 48);

        const upcomingDeadline = tasks.filter(task =>
          task.due_date &&
          task.status !== 'completed' &&
          task.status !== 'archived' &&
          new Date(task.due_date) >= now &&
          new Date(task.due_date) <= in48Hours
        ); 

        if (upcomingDeadline.length > 0) {
          setNotifMessage(`📅 Upcoming Deadline: ${upcomingDeadline.length} task(s) due soon!`);
          return;
        }
      }

      if (user.notifyDailySummary && tasks.length > 0) {
        const taskNames = tasks.map(t => t.title).join(', ');
        setNotifMessage(`📝 Daily Summary: You have ${tasks.length} task(s): ${taskNames}`);
        return;
      }

      if (user.notifyOverdue) {
        const overdueTasks = tasks.filter(task => 
          task.due_date &&
          task.status !== 'completed' &&
          task.status !== 'archived' &&
          new Date(task.due_date) < now
        );

        if (overdueTasks.length > 0) {
          setNotifMessage(`⚠️ Overdue Tasks: ${overdueTasks.length} task(s) are overdue!`);
          return;
        }
      }

    }, 500);

    return () => clearTimeout(timeout);
  }, [user, tasks]);


    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async (): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(
                "http://localhost:8000/api/task/allUserTasks",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            if (!response.ok) throw new Error("Failed to fetch tasks");

            const data: Task[] = await response.json();
            setTasks(data);
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "An error occurred";
            setError(errorMessage);
            console.error("Error fetching tasks:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleTaskCreated = async (newTask: Partial<Task>) => {
        const task: Task = {
            id: Date.now(),
            user_id: user?.id || 0,
            category_id: 1,
            status_id: 1,
            status: "not-started",
            title: newTask.title || "Untitled Task",
            description: newTask.description || null,
            due_date: newTask.due_date || null,
            created_at: new Date(),
            updated_at: new Date(),
            has_document: newTask.has_document || false,
            document_id: newTask.document_id || null,
        };
        try {
            const response = await fetch(
                "http://localhost:8000/api/task/addUserTask",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                    body: JSON.stringify(task),
                }
            );

            if (!response.ok) throw new Error("Failed to create task");

            await fetchTasks();
        } catch (err) {
            console.error("Error creating task:", err);
        }
    };

    const handleDeleteTask = async (taskId: number) => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/task/deleteUserTask/${taskId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            if (!response.ok) throw new Error("Failed to delete task");
            await fetchTasks();
        } catch (err) {
            console.error("Error deleting task:", err);
        }
    };

    const updateTaskStatus = async (taskId: number, newStatus: TaskStatus) => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/task/updateUserTask/${taskId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                    body: JSON.stringify({ status: newStatus }),
                }
            );
            if (!response.ok) throw new Error("Failed to update task");
            await fetchTasks();
        } catch (err) {
            console.error("Error updating task status:", err);
        }
    };

    const openTaskDocument = async (taskId: number) => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/task/${taskId}/document`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            if (!response.ok) throw new Error("Failed to get document");
            const data = await response.json();
            navigate(`/editor/${data.document_id}`);
        } catch (err) {
            console.error("Error opening document:", err);
        }
    };

    const getStatusConfig = (status: TaskStatus) => {
        switch (status) {
            case "not-started":
                return { label: "Not Started", color: "red", icon: Circle };
            case "in-progress":
                return { label: "In Progress", color: "violet", icon: Clock };
            case "completed":
                return {
                    label: "Completed",
                    color: "emerald",
                    icon: CheckCircle2,
                };
            case "archived":
                return { label: "Archived", color: "slate", icon: Circle };
        }
    };

    const getCategoryColor = (categoryId: number) => {
        const map: Record<number, string> = {
            1: "blue", // work
            2: "purple", // personal
            3: "green", // health
            4: "yellow", // learning
            5: "orange", // other
        };
        return map[categoryId] || "orange";
    };

    const filteredTasks = tasks.filter((task) => {
        if (activeTab === "all") return true;
        return task.status === activeTab;
    });

    const hasTasks = filteredTasks.length > 0;

    const completedCount = tasks.filter((t) => t.status === "completed").length;
    const inProgressCount = tasks.filter(
        (t) => t.status === "in-progress"
    ).length;
    const notStartedCount = tasks.filter(
        (t) => t.status === "not-started"
    ).length;

    const completedThisWeek = tasks.filter((task) => {
        if (task.status !== "completed") return false;
        const taskDate = new Date(task.created_at);
        const now = new Date();
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        startOfWeek.setHours(0, 0, 0, 0);
        return taskDate >= startOfWeek;
    }).length;

    const formatDueDate = (date: Date | null) => {
        if (!date) return null;
        const d = typeof date === "string" ? new Date(date) : date;
        return d.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    const formatDueDateWithDay = (date: Date | null) => {
      if (!date) return null;
      const d = typeof date === "string" ? new Date(date) : date;
        return d.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        });
    };

    if (loading) {
        return <LoadingScreen />;
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#0B0E14] text-slate-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full p-6 rounded-xl bg-red-500/10 border border-red-500/30">
                    <div className="flex items-center gap-3 mb-2">
                        <AlertCircle className="w-6 h-6 text-red-400" />
                        <h3 className="text-lg font-semibold text-red-400">
                            Error Loading Tasks
                        </h3>
                    </div>
                    <p className="text-slate-300">{error}</p>
                    <button
                        onClick={fetchTasks}
                        className="mt-4 px-4 py-2 bg-[#6366F1] hover:bg-[#5558DD] rounded-lg font-semibold transition-all"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-violet-500/30 selection:text-violet-200">
            {/* BACKGROUND */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-grid-white opacity-[0.15]"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/90"></div>
            </div>

            {/* HEADER */}
            <header className="bg-slate-900/60ándose backdrop-blur-xl border-b border-slate-800 shadow-2xl relative z-10">
                <div className="max-w-7xl mx-auto px-6 py-5">
                    <div className="flex justify-between items-center">
                        <Link to="/" className="flex items-center gap-3">
                            <Logo className="h-20 w-30 drop-shadow-2xl" />
                        </Link>

                        <div className="hidden md:flex items-center gap-4">
                            {user?.role === "admin" ? (
                                <>
                                    <span className="text-slate-300 text-sm font-medium">
                                        Hey admin: {user.email}
                                    </span>

                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            navigate("/admin/allUsers")
                                        }
                                        className="bg-slate-950/50 border-slate-700 text-slate-300 hover:border-violet-500 hover:text-violet-300 transition-all"
                                    >
                                        <Users size={16} className="mr-2" />
                                        View Users
                                    </Button>

                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            navigate("/admin/allTasks")
                                        }
                                        className="bg-slate-950/50 border-slate-700 text-slate-300 hover:border-violet-500 hover:text-violet-300 transition-all"
                                    >
                                        <ListChecks
                                            size={16}
                                            className="mr-2"
                                        />
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
                                    <span className="text-slate-400 text-sm">
                                        Hey {user?.email}
                                    </span>

                                    <Button
                                        variant="outline"
                                        onClick={() => navigate("/profile")}
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
                    <div className="lg:col-span-3 space-y-6">
                        {/* Upcoming Deadlines Card */}
                        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-6">
                            {(() => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                const in3Days = new Date(today);
                                in3Days.setDate(today.getDate() + 3);

                                const upcomingSoon = tasks.filter(
                                    (t) =>
                                        t.due_date &&
                                        t.status !== "completed" &&
                                        t.status !== "archived" &&
                                        new Date(t.due_date) >= today &&
                                        new Date(t.due_date) <= in3Days
                                );

                                const dueOrOverdue = tasks.filter(
                                    (t) =>
                                        t.due_date &&
                                        t.status !== "completed" &&
                                        t.status !== "archived" &&
                                        new Date(t.due_date) <= today
                                );

                                const hasUrgent = dueOrOverdue.length > 0;
                                const hasSoon =
                                    upcomingSoon.length > 0 && !hasUrgent;

                                if (hasUrgent) {
                                    return (
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-red-500/20 rounded-full flex-shrink-0">
                                                <AlertCircle className="w-9 h-9 text-red-400" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-red-300 mb-2">
                                                    {dueOrOverdue.length === 1
                                                        ? "Task Due Now!"
                                                        : `${dueOrOverdue.length} Tasks Due/Overdue!`}
                                                </h3>
                                                <div className="space-y-2">
                                                    {dueOrOverdue.map(
                                                        (task) => (
                                                            <div
                                                                key={task.id}
                                                                className="flex items-center gap-3 text-red-200"
                                                            >
                                                                <span className="font-medium truncate max-w-md">
                                                                    {task.title}
                                                                </span>
                                                                {task.due_date && (
                                                                    <span className="text-xs bg-red-500/20 px-2 py-0.5 rounded">
                                                                        {task.due_date <
                                                                        today
                                                                            ? "Overdue"
                                                                            : "Due Today"}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        )
                                                    )}
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
                                                    Heads Up —{" "}
                                                    {upcomingSoon.length}{" "}
                                                    Deadline
                                                    {upcomingSoon.length > 1
                                                        ? "s"
                                                        : ""}{" "}
                                                    Approaching
                                                </h3>
                                                <div className="space-y-2">
                                                    {upcomingSoon.map(
                                                        (task) => (
                                                            <div
                                                                key={task.id}
                                                                className="flex items-center gap-3 text-amber-200"
                                                            >
                                                                <span className="font-medium truncate max-w-md">
                                                                    {task.title}
                                                                </span>
                                                                <span className="text-xs bg-amber-500/20 px-2 py-0.5 rounded">
                                                                    Due{" "}
                                                                    {formatDueDateWithDay(
                                                                        task.due_date
                                                                    )}
                                                                </span>
                                                            </div>
                                                        )
                                                    )}
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
                                            <h3 className="text-xl font-bold text-emerald-300">
                                                No upcoming deadlines!
                                            </h3>
                                            <p className="text-emerald-200/80 text-sm mt-1">
                                                You're all caught up. Amazing
                                                work!
                                            </p>
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
                                    { id: "all", label: "All Tasks" },
                                    { id: "in-progress", label: "In Progress" },
                                    { id: "completed", label: "Completed" },
                                    { id: "archived", label: "Archived" },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() =>
                                            setActiveTab(
                                                tab.id as typeof activeTab
                                            )
                                        }
                                        className={`px-6 py-4 text-sm font-medium transition-all relative ${
                                            activeTab === tab.id
                                                ? "text-white"
                                                : "text-slate-500 hover:text-slate-300"
                                        }`}
                                    >
                                        {tab.label}
                                        {activeTab === tab.id && (
                                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500"></div>
                                        )}
                                    </button>
                                ))}
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-2xl font-bold text-white">
                                        Your Tasks
                                    </h2>
                                    <Button
                                        onClick={() => setIsAddTaskOpen(true)}
                                        className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-600/30 rounded-xl"
                                    >
                                        <Plus size={18} />
                                        <span className="ml-2">Add Task</span>
                                    </Button>
                                </div>

                                {hasTasks ? (
                                    <div className="space-y-4 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
                                        {filteredTasks.map((task) => {
                                            const status = getStatusConfig(
                                                task.status
                                            );
                                            const StatusIcon = status.icon;

                                            return (
                                                <div
                                                    key={task.id}
                                                    className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 flex items-center justify-between hover:border-violet-600/50 transition-all"
                                                >
                                                    <div className="flex items-center gap-5">
                                                        <StatusIcon
                                                            className={`w-6 h-6 text-${status.color}-400`}
                                                        />
                                                        <div>
                                                            <h4 className="text-lg font-medium text-white">
                                                                {task.title}
                                                            </h4>
                                                            <div className="flex items-center gap-3 mt-3 flex-wrap">
                                                                <span
                                                                    className={`text-xs px-3 py-1.5 bg-${getCategoryColor(
                                                                        task.category_id
                                                                    )}-500/20 text-${getCategoryColor(
                                                                        task.category_id
                                                                    )}-300 border border-${getCategoryColor(
                                                                        task.category_id
                                                                    )}-500/40 rounded-full`}
                                                                >
                                                                    Category
                                                                </span>
                                                                <span
                                                                    className={`text-xs px-3 py-1.5 bg-${status.color}-500/20 text-${status.color}-300 border border-${status.color}-500/40 rounded-full flex items-center gap-1.5`}
                                                                >
                                                                    <StatusIcon
                                                                        className={`w-3 h-3 ${
                                                                            status.color ===
                                                                                "red" ||
                                                                            status.color ===
                                                                                "slate"
                                                                                ? "fill-current"
                                                                                : ""
                                                                        }`}
                                                                    />
                                                                    {
                                                                        status.label
                                                                    }
                                                                </span>
                                                                {task.due_date && (
                                                                    <span className="text-xs px-3 py-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full flex items-center gap-1.5">
                                                                        <Calendar className="w-3 h-3" />
                                                                        {formatDueDate(
                                                                            task.due_date
                                                                        )}
                                                                    </span>
                                                                )}
                                                                {task.has_document && (
                                                                    <button
                                                                        onClick={() => openTaskDocument(task.id)}
                                                                        className="text-xs px-3 py-1.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full flex items-center gap-1.5 cursor-pointer hover:bg-cyan-500/30 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-200"
                                                                    >
                                                                        <Paperclip className="w-3 h-3" />
                                                                        View Document
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-3">
                                                        <select
                                                            value={task.status}
                                                            onChange={(e) =>
                                                                updateTaskStatus(
                                                                    task.id,
                                                                    e.target
                                                                        .value as TaskStatus
                                                                )
                                                            }
                                                            className="bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-violet-500 hover:bg-slate-800/80 hover:border-slate-600 hover:text-white transition-all duration-200 cursor-pointer"
                                                        >
                                                            <option value="not-started">
                                                                Not Started
                                                            </option>
                                                            <option value="in-progress">
                                                                In Progress
                                                            </option>
                                                            <option value="completed">
                                                                Completed
                                                            </option>
                                                            <option value="archived">
                                                                Archived
                                                            </option>
                                                        </select>

                                                        <button
                                                            onClick={() =>
                                                                confirm(
                                                                    "Delete this task?"
                                                                ) &&
                                                                handleDeleteTask(
                                                                    task.id
                                                                )
                                                            }
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
                                    <div className="flex items-center justify-center h-65 text-slate-500">
                                        <p className="text-center text-lg">
                                            No tasks here yet.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="space-y-6">
                        {/* Progress Overview */}
                        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-3">
                                <div className="p-2 bg-violet-600/20 rounded-lg">
                                    <svg
                                        className="w-6 h-6 text-violet-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                        />
                                    </svg>
                                </div>
                                Progress Overview
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-slate-400">
                                            Completion Rate
                                        </span>
                                        <span className="text-white font-medium">
                                            {tasks.length === 0
                                                ? 0
                                                : Math.round(
                                                      (completedCount /
                                                          tasks.length) *
                                                          100
                                                  )}
                                            %
                                        </span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-violet-600 to-indigo-600 transition-all duration-700 ease-out"
                                            style={{
                                                width: `${
                                                    tasks.length === 0
                                                        ? 0
                                                        : (completedCount /
                                                              tasks.length) *
                                                          100
                                                }%`,
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3.5 flex items-center justify-between hover:bg-emerald-500/15 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                                            <span className="text-sm font-medium text-emerald-300">
                                                Completed
                                            </span>
                                        </div>
                                        <span className="text-2xl font-bold text-emerald-300 tabular-nums tracking-tight">
                                            {completedCount}
                                        </span>
                                    </div>

                                    <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-3.5 flex items-center justify-between hover:bg-violet-500/15 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <Clock className="w-6 h-6 text-violet-400" />
                                            <span className="text-sm font-medium text-violet-300">
                                                In Progress
                                            </span>
                                        </div>
                                        <span className="text-2xl font-bold text-violet-300 tabular-nums tracking-tight">
                                            {inProgressCount}
                                        </span>
                                    </div>

                                    <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-3.5 flex items-center justify-between hover:bg-slate-700/60 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <Circle className="w-6 h-6 text-slate-400" />
                                            <span className="text-sm font-medium text-slate-300">
                                                Not Started
                                            </span>
                                        </div>
                                        <span className="text-2xl font-bold text-white tabular-nums tracking-tight">
                                            {notStartedCount}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* This Week */}
                        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-6 text-center">
                            <div className="w-8 h-8 mx-auto mb-2.5 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                                <Calendar className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-sm font-medium text-slate-300 mb-2">
                                This Week
                            </h3>
                            <p className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent tabular-nums tracking-tight">
                                {completedThisWeek}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                                tasks completed
                            </p>
                        </div>
                    </div>
                </div>
                {notifMessage && (
                <Notifications
                    message={notifMessage}
                    onClose={() => setNotifMessage(null)}
                />
            )}
            </main>

            <AddTaskForm
                isOpen={isAddTaskOpen}
                onClose={() => setIsAddTaskOpen(false)}
                onTaskCreated={handleTaskCreated}
            />
        </div>
    );
}
