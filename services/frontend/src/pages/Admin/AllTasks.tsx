import { useState, useEffect } from "react";
import {
    Search,
    Edit2,
    Trash2,
    Filter,
    Calendar,
    CheckCircle2,
    Clock,
    ListTodo,
    AlertCircle,
    Loader2,
    X,
    Check,
    User,
} from "lucide-react";
import LoadingScreen from "../../components/LoadingScreen";

interface Task {
    id: number;
    userId: number;
    categoryId: number | null;
    statusId: number | null;
    title: string;
    description: string | null;
    dueDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

interface EditingTask {
    id: number;
    title: string;
    description: string | null;
    dueDate: string;
    statusId: number | null;
    categoryId: number | null;
}

type FilterStatus = "all" | "pending" | "completed" | "overdue";

const AdminTasksPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [editingTask, setEditingTask] = useState<EditingTask | null>(null);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async (): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(
                "http://localhost:8000/api/admin/allTasks",
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

    const handleDelete = async (taskId: number): Promise<void> => {
        if (
            !window.confirm(
                "Are you sure you want to delete this task? This action cannot be undone."
            )
        ) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8000/api/admin/deleteTask/${taskId}`,
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

            setTasks(tasks.filter((task) => task.id !== taskId));
            alert("Task deleted successfully");
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "An error occurred";
            alert("Error deleting task: " + errorMessage);
            console.error("Error deleting task:", err);
        }
    };

    const handleEdit = (task: Task): void => {
        setEditingTask({
            id: task.id,
            title: task.title,
            description: task.description,
            dueDate: task.dueDate
                ? new Date(task.dueDate).toISOString().split("T")[0]
                : "",
            statusId: task.statusId,
            categoryId: task.categoryId,
        });
        setShowEditModal(true);
    };

    const handleUpdateTask = async (): Promise<void> => {
        if (!editingTask) return;

        try {
            const response = await fetch(
                `http://localhost:8000/api/admin/updateTask/${editingTask.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                    body: JSON.stringify({
                        title: editingTask.title,
                        description: editingTask.description,
                        dueDate: editingTask.dueDate || null,
                        statusId: editingTask.statusId,
                        categoryId: editingTask.categoryId,
                    }),
                }
            );

            if (!response.ok) throw new Error("Failed to update task");

            const updatedTask: Task = await response.json();
            setTasks(
                tasks.map((task) =>
                    task.id === updatedTask.id ? updatedTask : task
                )
            );
            setShowEditModal(false);
            setEditingTask(null);
            alert("Task updated successfully");
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "An error occurred";
            alert("Error updating task: " + errorMessage);
            console.error("Error updating task:", err);
        }
    };

    const getTaskStatus = (task: Task): string => {
        if (task.statusId === 2) return "completed";
        if (task.dueDate && new Date(task.dueDate) < new Date())
            return "overdue";
        return "pending";
    };

    const filteredTasks = tasks.filter((task) => {
        const matchesSearch =
            task.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const taskStatus = getTaskStatus(task);
        const matchesFilter =
            filterStatus === "all" || taskStatus === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const getStatusBadge = (task: Task) => {
        const status = getTaskStatus(task);
        switch (status) {
            case "completed":
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" />
                        Completed
                    </span>
                );
            case "overdue":
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30">
                        <AlertCircle className="w-3 h-3" />
                        Overdue
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#6366F1]/20 text-[#6366F1] border border-[#6366F1]/30">
                        <Clock className="w-3 h-3" />
                        Pending
                    </span>
                );
        }
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
        <div className="min-h-screen bg-[#0B0E14] text-slate-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 rounded-xl bg-[#6366F1] shadow-lg shadow-indigo-500/20">
                            <ListTodo className="w-6 h-6" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold">
                            Task Management
                        </h1>
                    </div>
                    <p className="text-slate-400 ml-16">
                        Manage and monitor all user tasks
                    </p>
                </div>

                <div className="mb-6 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all"
                        />
                    </div>

                    <div className="flex gap-3">
                        <div className="relative">
                            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <select
                                value={filterStatus}
                                onChange={(e) =>
                                    setFilterStatus(
                                        e.target.value as FilterStatus
                                    )
                                }
                                className="pl-12 pr-8 py-3 bg-white/5 border border-white/10 rounded-xl text-slate-100 focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all appearance-none cursor-pointer"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="overdue">Overdue</option>
                            </select>
                        </div>

                        <button
                            onClick={fetchTasks}
                            className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold transition-all"
                            title="Refresh tasks"
                        >
                            <Loader2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm mb-1">
                                    Total Tasks
                                </p>
                                <p className="text-3xl font-bold">
                                    {tasks.length}
                                </p>
                            </div>
                            <div className="p-3 rounded-lg bg-white/10">
                                <ListTodo className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm mb-1">
                                    Pending
                                </p>
                                <p className="text-3xl font-bold">
                                    {
                                        tasks.filter(
                                            (t) =>
                                                getTaskStatus(t) === "pending"
                                        ).length
                                    }
                                </p>
                            </div>
                            <div className="p-3 rounded-lg bg-[#6366F1]/20">
                                <Clock className="w-6 h-6 text-[#6366F1]" />
                            </div>
                        </div>
                    </div>
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm mb-1">
                                    Completed
                                </p>
                                <p className="text-3xl font-bold">
                                    {
                                        tasks.filter(
                                            (t) =>
                                                getTaskStatus(t) === "completed"
                                        ).length
                                    }
                                </p>
                            </div>
                            <div className="p-3 rounded-lg bg-emerald-500/20">
                                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                            </div>
                        </div>
                    </div>
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm mb-1">
                                    Overdue
                                </p>
                                <p className="text-3xl font-bold">
                                    {
                                        tasks.filter(
                                            (t) =>
                                                getTaskStatus(t) === "overdue"
                                        ).length
                                    }
                                </p>
                            </div>
                            <div className="p-3 rounded-lg bg-red-500/20">
                                <AlertCircle className="w-6 h-6 text-red-400" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left p-6 text-sm font-semibold text-slate-400 uppercase tracking-wider">
                                        Task
                                    </th>
                                    <th className="text-left p-6 text-sm font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">
                                        Status
                                    </th>
                                    <th className="text-left p-6 text-sm font-semibold text-slate-400 uppercase tracking-wider hidden xl:table-cell">
                                        User ID
                                    </th>
                                    <th className="text-left p-6 text-sm font-semibold text-slate-400 uppercase tracking-wider hidden xl:table-cell">
                                        Due Date
                                    </th>
                                    <th className="text-left p-6 text-sm font-semibold text-slate-400 uppercase tracking-wider hidden 2xl:table-cell">
                                        Created
                                    </th>
                                    <th className="text-right p-6 text-sm font-semibold text-slate-400 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTasks.map((task) => (
                                    <tr
                                        key={task.id}
                                        className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                                    >
                                        <td className="p-6">
                                            <div>
                                                <div className="font-semibold text-white mb-1">
                                                    {task.title}
                                                </div>
                                                {task.description && (
                                                    <div className="text-sm text-slate-400 line-clamp-2">
                                                        {task.description}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-6 hidden lg:table-cell">
                                            {getStatusBadge(task)}
                                        </td>
                                        <td className="p-6 text-slate-300 hidden xl:table-cell">
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4 text-slate-500" />
                                                <span className="font-mono text-sm">
                                                    #{task.userId}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-6 text-slate-300 hidden xl:table-cell">
                                            {task.dueDate ? (
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-slate-500" />
                                                    {new Date(
                                                        task.dueDate
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-slate-500">
                                                    No due date
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-6 text-slate-300 hidden 2xl:table-cell">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-slate-500" />
                                                {new Date(
                                                    task.createdAt
                                                ).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() =>
                                                        handleEdit(task)
                                                    }
                                                    className="p-2 rounded-lg bg-white/5 hover:bg-[#6366F1]/20 border border-white/10 hover:border-[#6366F1]/50 text-slate-400 hover:text-[#6366F1] transition-all group-hover:scale-105"
                                                    title="Edit task"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(task.id)
                                                    }
                                                    className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 text-slate-400 hover:text-red-400 transition-all group-hover:scale-105"
                                                    title="Delete task"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredTasks.length === 0 && (
                        <div className="p-12 text-center">
                            <div className="text-slate-400 text-lg">
                                No tasks found
                            </div>
                            <p className="text-slate-500 text-sm mt-2">
                                Try adjusting your search or filter criteria
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-6 text-sm text-slate-400">
                    Showing{" "}
                    <span className="font-semibold text-white">
                        {filteredTasks.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-white">
                        {tasks.length}
                    </span>{" "}
                    tasks
                </div>
            </div>

            {showEditModal && editingTask && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-[#0F1219] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold">Edit Task</h3>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={editingTask.title}
                                    onChange={(e) =>
                                        setEditingTask({
                                            ...editingTask,
                                            title: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-slate-100 focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={editingTask.description || ""}
                                    onChange={(e) =>
                                        setEditingTask({
                                            ...editingTask,
                                            description: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-slate-100 focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all resize-none"
                                    rows={3}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    value={editingTask.dueDate}
                                    onChange={(e) =>
                                        setEditingTask({
                                            ...editingTask,
                                            dueDate: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-slate-100 focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Status ID
                                </label>
                                <input
                                    type="number"
                                    value={editingTask.statusId || ""}
                                    onChange={(e) =>
                                        setEditingTask({
                                            ...editingTask,
                                            statusId: e.target.value
                                                ? parseInt(e.target.value)
                                                : null,
                                        })
                                    }
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-slate-100 focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all"
                                    placeholder="e.g., 1 for pending, 2 for completed"
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={() => setShowEditModal(false)}
                                    className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdateTask}
                                    className="flex-1 px-4 py-3 bg-[#6366F1] hover:bg-[#5558DD] rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                                >
                                    <Check className="w-4 h-4" />
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminTasksPage;
