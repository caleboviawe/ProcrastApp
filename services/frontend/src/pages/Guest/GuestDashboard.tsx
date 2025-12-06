import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import {
    Plus,
    CheckCircle2,
    Clock,
    Circle,
    X,
    Calendar,
    Paperclip,
    AlertCircle,
    AlertTriangle,
} from "lucide-react";
import { useAppContext } from "../../authServices/helper";
import AddTaskForm from "../../components/AddTaskForm";
import type { Task, TaskStatus } from "../../type";
import Notifications from "../../components/Notifications";
import Navbar from "../../components/Navbar";
import ConfirmationPopup from "../Admin/components/ConfirmationPopup";
import landingBg from "../../assets/landing-bg-3.jpg";
import GuestSignInModal from "./GuestPopup";
import { toast } from "react-toastify";

/* GuestDashboard.tsx: the main body of the app that displays tasks, progress summaries, and any notfications for guests */

export default function GuestDashboard() {
    // Logic Variables
    const navigate = useNavigate();
    const { user } = useAppContext();

    // States
    const [activeTab, setActiveTab] = useState<
        "all" | "in-progress" | "completed" | "archived"
    >("all");
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [notifMessage, setNotifMessage] = useState<string | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [showGuestModal, setShowGuestModal] = useState<boolean>(false);

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

                const upcomingDeadline = tasks.filter(
                    (task) =>
                        task.due_date &&
                        task.status !== "completed" &&
                        task.status !== "archived" &&
                        new Date(task.due_date) >= now &&
                        new Date(task.due_date) <= in48Hours
                );

                if (upcomingDeadline.length > 0) {
                    setNotifMessage(
                        `📅 Upcoming Deadline: ${upcomingDeadline.length} task(s) due soon!`
                    );
                    return;
                }
            }

            if (user.notifyDailySummary && tasks.length > 0) {
                const taskNames = tasks.map((t) => t.title).join(", ");
                setNotifMessage(
                    `📝 Daily Summary: You have ${tasks.length} task(s): ${taskNames}`
                );
                return;
            }

            if (user.notifyOverdue) {
                const overdueTasks = tasks.filter(
                    (task) =>
                        task.due_date &&
                        task.status !== "completed" &&
                        task.status !== "archived" &&
                        new Date(task.due_date) < now
                );

                if (overdueTasks.length > 0) {
                    setNotifMessage(
                        `⚠️ Overdue Tasks: ${overdueTasks.length} task(s) are overdue!`
                    );
                    return;
                }
            }
        }, 500);

        return () => clearTimeout(timeout);
    }, [user, tasks]);

    // Handle Task Created
    const handleTaskCreated = async (newTask: Partial<Task>) => {
        const task: Task = {
            id: Date.now(),
            user_id: user?.id || 0,
            category: newTask.category || "other",
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
        setTasks((prev) => [...prev, task]);
        toast.success(`Task created successfully`);
    };

    // Handle Delete Task
    const handleDeleteTask = async (taskId: number) => {
        setTasks((prev) => prev.filter((task) => task.id !== taskId));
        toast.success(`Task deleted successfully`);
    };

    // Update Task Status
    const updateTaskStatus = async (taskId: number, newStatus: TaskStatus) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId
                    ? {
                          ...task,
                          status: newStatus,
                          updated_at: new Date(),
                      }
                    : task
            )
        );
        toast.success(`Task status updated to "${newStatus}"`);
    };

    // Get Status Configuration
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

    // Get Category Color
    const getCategoryColor = (category: string) => {
        const map: Record<string, string> = {
            work: "blue",
            personal: "purple",
            health: "green",
            learning: "yellow",
            other: "orange",
        };
        return map[category.toLowerCase()] || "orange";
    };

    // Filtering Tasks Logic
    const filteredTasks = tasks
        .filter((task) => {
            if (activeTab === "all") return true;
            return task.status === activeTab;
        })
        .sort((a, b) => {
            // 1. Tasks with due dates → closest first
            if (a.due_date && b.due_date) {
                return (
                    new Date(a.due_date).getTime() -
                    new Date(b.due_date).getTime()
                );
            }
            // 2. Tasks with due date come before no due date
            if (a.due_date && !b.due_date) return -1;
            if (!a.due_date && b.due_date) return 1;
            // 3. No due dates → newest first
            return (
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            );
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

    // Format Due Date
    const formatDueDate = (date: Date | null) => {
        if (!date) return null;
        const d = typeof date === "string" ? new Date(date) : date;
        return d.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    // Format Due Date With a Day
    const formatDueDateWithDay = (date: Date | null) => {
        if (!date) return null;
        const d = typeof date === "string" ? new Date(date) : date;
        return d.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div
            className="min-h-screen bg-slate-950 text-white font-sans selection:bg-violet-500/30 selection:text-violet-200"
            style={{
                backgroundImage: `url(${landingBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
            }}
        >
            {/* BACKGROUND */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-grid-white opacity-[0.15]"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/90"></div>
            </div>

            {/* HEADER */}
            <Navbar />

            {/* MAIN CONTENT */}
            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
                    {/* LEFT SIDE – Tasks */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Upcoming Deadlines Display */}
                        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-5 sm:p-6">
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
                            {/* Mobile Tab Bar */}
                            <div className="flex lg:hidden border-b border-slate-800 overflow-x-auto scrollbar-hide">
                                {[
                                    { id: "all", label: "All" },
                                    { id: "in-progress", label: "In Progress" },
                                    { id: "completed", label: "Done" },
                                    { id: "archived", label: "Archived" },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() =>
                                            setActiveTab(
                                                tab.id as typeof activeTab
                                            )
                                        }
                                        className={`px-4 py-3 text-xs font-medium whitespace-nowrap transition-all ${
                                            activeTab === tab.id
                                                ? "text-white border-b-2 border-violet-500"
                                                : "text-slate-500 hover:text-slate-300"
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Desktop Tabs */}
                            <div className="hidden lg:flex border-b border-slate-800">
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

                            <div className="p-5 sm:p-6">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                                        Your Tasks
                                    </h2>
                                    <Button
                                        onClick={() => setIsAddTaskOpen(true)}
                                        className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-600/30 rounded-xl"
                                    >
                                        <Plus size={18} className="sm:mr-2" />
                                        <span>Add Task</span>
                                    </Button>
                                </div>

                                {hasTasks ? (
                                    <div className="space-y-4 max-h-96 sm:max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
                                        {filteredTasks.map((task) => {
                                            const status = getStatusConfig(
                                                task.status
                                            );
                                            const StatusIcon = status.icon;

                                            return (
                                                <div
                                                    key={task.id}
                                                    className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-violet-600/50 transition-all"
                                                >
                                                    {/* Task Info */}
                                                    <div className="flex items-start gap-4 flex-1">
                                                        <StatusIcon
                                                            className={`w-6 h-6 text-${status.color}-400 flex-shrink-0 mt-1`}
                                                        />
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="text-base sm:text-lg font-medium text-white truncate">
                                                                {task.title}
                                                            </h4>
                                                            <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
                                                                <span
                                                                    className={`px-2.5 py-1 bg-${getCategoryColor(
                                                                        task.category
                                                                    )}-500/20 text-${getCategoryColor(
                                                                        task.category
                                                                    )}-300 border border-${getCategoryColor(
                                                                        task.category
                                                                    )}-500/40 rounded-full`}
                                                                >
                                                                    {task.category
                                                                        .charAt(
                                                                            0
                                                                        )
                                                                        .toUpperCase() +
                                                                        task.category.slice(
                                                                            1
                                                                        )}{" "}
                                                                </span>
                                                                <span
                                                                    className={`text-xs px-3 py-1.5 bg-${status.color}-500/20 text-${status.color}-300 border border-${status.color}-500/40 rounded-full flex items-center gap-1`}
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
                                                                    <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full flex items-center gap-1">
                                                                        <Calendar className="w-3 h-3" />
                                                                        {formatDueDate(
                                                                            task.due_date
                                                                        )}
                                                                    </span>
                                                                )}
                                                                {task.has_document && (
                                                                    <button
                                                                        onClick={() =>
                                                                            setShowGuestModal(true)
                                                                        }
                                                                        className="px-2.5 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full flex items-center gap-1 hover:bg-cyan-500/30 hover:border-cyan-400 transition-all"
                                                                    >
                                                                        <Paperclip className="w-3 h-3" />
                                                                        Document
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="flex items-center gap-2 sm:gap-3">
                                                        <select
                                                            value={task.status}
                                                            onChange={(e) =>
                                                                updateTaskStatus(
                                                                    task.id,
                                                                    e.target
                                                                        .value as TaskStatus
                                                                )
                                                            }
                                                            className="bg-slate-800 border border-slate-700 text-slate-300 text-xs sm:text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-violet-500 transition-all cursor-pointer"
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
                                                            onClick={() => {
                                                                setTaskToDelete(
                                                                    task.id
                                                                );
                                                                setDeleteModalOpen(
                                                                    true
                                                                );
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
                                    <div className="flex items-center justify-center h-65 text-slate-500">
                                        <p className="text-center text-lg">
                                            No tasks here yet.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE – Stats (Hidden on Mobile, Shown on Large Screens) */}
                    <div className="hidden lg:block space-y-6">
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

                {/* Mobile Stats – Shown Only on Small Screens */}
                <div className="lg:hidden mt-8 space-y-6">
                    {/* Progress Overview – Mobile */}
                    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-5">
                        <h3 className="text-base font-semibold text-white mb-4">
                            Progress Overview
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs mb-1">
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
                                        className="h-full bg-gradient-to-r from-violet-600 to-indigo-600 transition-all duration-700"
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

                            <div className="grid grid-cols-3 gap-3 text-center">
                                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                                    <p className="text-xs text-emerald-300">
                                        Completed
                                    </p>
                                    <p className="text-xl font-bold text-emerald-300">
                                        {completedCount}
                                    </p>
                                </div>
                                <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-3">
                                    <Clock className="w-5 h-5 text-violet-400 mx-auto mb-1" />
                                    <p className="text-xs text-violet-300">
                                        In Progress
                                    </p>
                                    <p className="text-xl font-bold text-violet-300">
                                        {inProgressCount}
                                    </p>
                                </div>
                                <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-3">
                                    <Circle className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                                    <p className="text-xs text-slate-300">
                                        Not Started
                                    </p>
                                    <p className="text-xl font-bold text-white">
                                        {notStartedCount}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* This Week – Mobile */}
                    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-5 text-center">
                        <Calendar className="w-8 h-8 mx-auto mb-2 text-violet-400" />
                        <h3 className="text-sm font-medium text-slate-300">
                            This Week
                        </h3>
                        <p className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                            {completedThisWeek}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                            tasks completed
                        </p>
                    </div>
                </div>
            </main>

            {/* Notifications */}
            {notifMessage && (
                <Notifications
                    message={notifMessage}
                    onClose={() => setNotifMessage(null)}
                />
            )}

            <AddTaskForm
                isOpen={isAddTaskOpen}
                onClose={() => setIsAddTaskOpen(false)}
                onTaskCreated={handleTaskCreated}
            />

            {/* Delete Confirmation Modal */}
            <ConfirmationPopup
                isOpen={deleteModalOpen}
                onClose={() => {
                    setDeleteModalOpen(false);
                    setTaskToDelete(null);
                }}
                title="Delete Task?"
                message="This action cannot be undone. Are you sure you want to permanently delete this task?"
                actionText="Delete Task"
                confirmText="delete"
                loading={deleting}
                onConfirm={async () => {
                    if (!taskToDelete) return;
                    setDeleting(true);
                    try {
                        await handleDeleteTask(taskToDelete);
                        setDeleteModalOpen(false);
                    } finally {
                        setDeleting(false);
                        setTaskToDelete(null);
                    }
                }}
            />

            <GuestSignInModal
                isOpen={showGuestModal}
                onClose={() => setShowGuestModal(false)}
                onGuestSignIn={() => {
                    navigate("/login");
                }}
            />
        </div>
    );
}
