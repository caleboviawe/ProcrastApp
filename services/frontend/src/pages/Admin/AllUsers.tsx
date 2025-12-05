import { useState, useEffect } from "react";
import {
    Edit2,
    Trash2,
    Mail,
    Calendar,
    Shield,
    User as UserIcon,
    Users,
    UserCog,
    AlertCircle,
} from "lucide-react";
import LoadingScreen from "../../components/LoadingScreen";
import { useAppContext } from "../../authServices/helper";
import type { User } from "../../type";
import EditUserModal from "./components/EditUser";
import FilterUsers from "./components/FilterUsers";

interface EditingUser {
    id: number;
    username: string;
    email: string;
    role: "student" | "admin";
}

type FilterRole = "all" | "student" | "admin";

export default function AdminUsersPage() {
    const { user: profile } = useAppContext();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filterRole, setFilterRole] = useState<FilterRole>("all");
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [editingUser, setEditingUser] = useState<EditingUser | null>(null);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);

    // Fetch all users on mount
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async (): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(
                "http://localhost:8000/api/admin/allUsers",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            if (!response.ok) throw new Error("Failed to fetch users");

            const data: User[] = await response.json();
            setUsers(data);
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "An error occurred";
            setError(errorMessage);
            console.error("Error fetching users:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (userId: number): Promise<void> => {
        if (
            !window.confirm(
                "Are you sure you want to delete this user? This action cannot be undone."
            )
        ) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8000/api/admin/deleteUser/${userId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            if (!response.ok) throw new Error("Failed to delete user");

            setUsers(users.filter((user) => user.id !== userId));
            alert("User deleted successfully");
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "An error occurred";
            alert("Error deleting user: " + errorMessage);
            console.error("Error deleting user:", err);
        }
    };

    const handleEdit = (user: User): void => {
        setEditingUser({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        });
        setShowEditModal(true);
    };

    const handleUpdateUser = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

        if (!editingUser) return;

        try {
            const response = await fetch(
                `http://localhost:8000/api/admin/updateUser/${editingUser.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                    body: JSON.stringify({
                        username: editingUser.username,
                        email: editingUser.email,
                        role: editingUser.role,
                    }),
                }
            );

            if (!response.ok) throw new Error("Failed to update user");

            const updatedUser: User = await response.json();
            setUsers(
                users.map((user) =>
                    user.id === updatedUser.id ? updatedUser : user
                )
            );
            setShowEditModal(false);
            setEditingUser(null);
            alert("User updated successfully");
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "An error occurred";
            alert("Error updating user: " + errorMessage);
            console.error("Error updating user:", err);
        }
    };

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter =
            filterRole === "all" ||
            user.role.toLowerCase() === filterRole.toLowerCase();
        return matchesSearch && matchesFilter;
    });

    const getRoleBadgeColor = (role: "student" | "admin"): string => {
        return role.toLowerCase() === "admin"
            ? "bg-[#6366F1] text-white"
            : "bg-white/10 text-slate-300";
    };

    const getInitials = (username: string): string => {
        return (
            username
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2) || "U"
        );
    };

    const adminCount = users.filter((u) => u.role === "admin").length;

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
                            Error Loading Users
                        </h3>
                    </div>
                    <p className="text-slate-300">{error}</p>
                    <button
                        onClick={fetchUsers}
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
                            <Shield className="w-6 h-6" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold">
                            User Management
                        </h1>
                    </div>
                    <p className="text-slate-400 ml-16">
                        Manage and monitor all platform users
                    </p>
                </div>

                <FilterUsers
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filterRole={filterRole}
                    setFilterRole={setFilterRole}
                    onRefresh={fetchUsers}
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm mb-1">
                                    Total Users
                                </p>
                                <p className="text-3xl font-bold">
                                    {users.length}
                                </p>
                            </div>
                            <div className="p-3 rounded-lg bg-white/10">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm mb-1">
                                    Students
                                </p>
                                <p className="text-3xl font-bold">
                                    {
                                        users.filter(
                                            (u) => u.role === "student"
                                        ).length
                                    }
                                </p>
                            </div>
                            <div className="p-3 rounded-lg bg-white/10">
                                <UserIcon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm mb-1">
                                    Admins
                                </p>
                                <p className="text-3xl font-bold">
                                    {
                                        users.filter((u) => u.role === "admin")
                                            .length
                                    }
                                </p>
                            </div>
                            <div className="p-3 rounded-lg bg-[#6366F1]/20">
                                <UserCog className="w-6 h-6 text-[#6366F1]" />
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
                                        User
                                    </th>
                                    <th className="text-left p-6 text-sm font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">
                                        Role
                                    </th>
                                    <th className="text-left p-6 text-sm font-semibold text-slate-400 uppercase tracking-wider hidden xl:table-cell">
                                        Auth Method
                                    </th>
                                    <th className="text-left p-6 text-sm font-semibold text-slate-400 uppercase tracking-wider hidden xl:table-cell">
                                        Joined
                                    </th>
                                    <th className="text-right p-6 text-sm font-semibold text-slate-400 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                                    >
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={`w-12 h-12 rounded-full ${
                                                        user.role === "admin"
                                                            ? "bg-[#6366F1]"
                                                            : "border"
                                                    } flex items-center justify-center font-bold text-white shadow-lg`}
                                                >
                                                    {getInitials(user.username)}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-white">
                                                        {user.username}
                                                    </div>
                                                    <div className="text-sm text-slate-400 flex items-center gap-1">
                                                        <Mail className="w-3 h-3" />
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6 hidden lg:table-cell">
                                            <span
                                                className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadgeColor(
                                                    user.role
                                                )} shadow-lg`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="p-6 text-slate-300 hidden xl:table-cell">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                                                    user.googleId
                                                        ? "bg-white/10 text-slate-300 border border-white/20"
                                                        : "bg-white/5 text-slate-400 border border-white/10"
                                                }`}
                                            >
                                                {user.googleId
                                                    ? "Google"
                                                    : "Email"}
                                            </span>
                                        </td>
                                        <td className="p-6 text-slate-300 hidden xl:table-cell">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-slate-500" />
                                                {new Date(
                                                    user.createdAt
                                                ).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            {profile?.role === "admin" &&
                                            profile?.id === user.id ? (
                                                <div className="flex justify-end">
                                                    <button
                                                        onClick={() =>
                                                            (window.location.href =
                                                                "/settings")
                                                        }
                                                        className="px-4 py-2 rounded-lg bg-[#6366F1] hover:bg-[#5558DD] text-white text-sm font-semibold transition-all flex items-center gap-2"
                                                    >
                                                        <UserCog className="w-4 h-4" />
                                                        Settings
                                                    </button>
                                                </div>
                                            ) : user.role !== "admin" ? (
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(user)
                                                        }
                                                        className="p-2 rounded-lg bg-white/5 hover:bg-[#6366F1]/20 border border-white/10 hover:border-[#6366F1]/50 text-slate-400 hover:text-[#6366F1] transition-all group-hover:scale-105"
                                                        title="Edit user"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                user.id
                                                            )
                                                        }
                                                        className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 text-slate-400 hover:text-red-400 transition-all group-hover:scale-105"
                                                        title="Delete user"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ) : adminCount > 1 ? (
                                                <div className="flex justify-end">
                                                    <button
                                                        onClick={() =>
                                                            handleEdit({
                                                                ...user,
                                                                role: "student",
                                                            })
                                                        }
                                                        className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/20 hover:border-white/40 text-white rounded-lg transition-all text-sm"
                                                    >
                                                        Make Student
                                                    </button>
                                                </div>
                                            ) : null}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredUsers.length === 0 && (
                        <div className="p-12 text-center">
                            <div className="text-slate-400 text-lg">
                                No users found
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
                        {filteredUsers.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-white">
                        {users.length}
                    </span>{" "}
                    users
                </div>
            </div>

            {editingUser && (
                <EditUserModal
                    show={showEditModal}
                    editingUser={editingUser}
                    onClose={() => setShowEditModal(false)}
                    onSubmit={handleUpdateUser}
                    onChange={setEditingUser}
                />
            )}
        </div>
    );
}
