import { Check, X } from "lucide-react";
import type { EditingUserType } from "../../../type";

interface EditUserModalProps {
    editingUser: EditingUserType;
    show: boolean;
    onClose: () => void;
    onChange: (user: EditingUserType) => void;
    onRequestSubmit: () => void; // renamed
}

export default function EditUserModal({
    editingUser,
    show,
    onClose,
    onChange,
    onRequestSubmit,
}: EditUserModalProps) {
    if (!show || !editingUser) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-[#0F1219] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">Edit User</h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm mb-2 text-slate-300">
                            Username
                        </label>
                        <input
                            type="text"
                            value={editingUser.username}
                            onChange={(e) =>
                                onChange({
                                    ...editingUser,
                                    username: e.target.value,
                                })
                            }
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-2 text-slate-300">
                            Email
                        </label>
                        <input
                            type="email"
                            value={editingUser.email}
                            onChange={(e) =>
                                onChange({
                                    ...editingUser,
                                    email: e.target.value,
                                })
                            }
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-2 text-slate-300">
                            Role
                        </label>
                        <select
                            value={editingUser.role}
                            onChange={(e) =>
                                onChange({
                                    ...editingUser,
                                    role: e.target.value as "student" | "admin",
                                })
                            }
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl"
                        >
                            <option value="student">Student</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={onRequestSubmit}
                            className="flex-1 px-4 py-3 bg-[#6366F1] rounded-xl flex items-center justify-center gap-2"
                        >
                            <Check className="w-4 h-4" />
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
