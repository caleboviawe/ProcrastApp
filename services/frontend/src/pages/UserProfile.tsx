import { useState } from "react";
import {
    User,
    Mail,
    Lock,
    Calendar,
    Shield,
    Edit2,
    Check,
    X,
} from "lucide-react";

const ProfilePage = () => {
    const [profile, setProfile] = useState({
        username: "john_doe",
        email: "john.doe@example.com",
        password: "••••••••",
        role: "Student",
        dateCreated: "2025-11-24",
    });

    const [editing, setEditing] = useState({
        username: false,
        email: false,
        password: false,
        dateCreated: false,
    });

    const [tempValues, setTempValues] = useState({
        username: "",
        email: "",
        password: "",
        dateCreated: "",
    });

    const handleEdit = (field: string) => {
        setEditing({ ...editing, [field]: true });
        setTempValues({
            ...tempValues,
            [field]: profile[field as keyof typeof profile],
        });
    };

    const handleSave = (field: string) => {
        setProfile({
            ...profile,
            [field]: tempValues[field as keyof typeof tempValues],
        });
        setEditing({ ...editing, [field]: false });
    };

    const handleCancel = (field: string) => {
        setEditing({ ...editing, [field]: false });
        setTempValues({
            ...tempValues,
            [field]: profile[field as keyof typeof profile],
        });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 p-4 sm:p-6 lg:p-8">
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-20 left-1/4 w-72 h-72 bg-violet-500/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        Profile Settings
                    </h1>
                    <p className="text-slate-400">
                        Manage your account information
                    </p>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-xl">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 pb-8 border-b border-slate-800">
                        <div className="w-24 h-24 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-violet-500/20">
                            <User className="w-12 h-12 text-white" />
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                            <h2 className="text-2xl font-bold text-white mb-1">
                                {profile.username}
                            </h2>
                            <p className="text-slate-400 mb-3">
                                {profile.email}
                            </p>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
                                <Shield className="w-4 h-4 text-violet-400" />
                                <span className="text-sm font-medium text-violet-300">
                                    {profile.role}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <ProfileField
                            icon={<User className="w-5 h-5 text-violet-400" />}
                            label="Username"
                            value={profile.username}
                            tempValue={tempValues.username}
                            isEditing={editing.username}
                            onEdit={() => handleEdit("username")}
                            onSave={() => handleSave("username")}
                            onCancel={() => handleCancel("username")}
                            onChange={(value) =>
                                setTempValues({
                                    ...tempValues,
                                    username: value,
                                })
                            }
                        />

                        <ProfileField
                            icon={<Mail className="w-5 h-5 text-indigo-400" />}
                            label="Email"
                            value={profile.email}
                            tempValue={tempValues.email}
                            isEditing={editing.email}
                            onEdit={() => handleEdit("email")}
                            onSave={() => handleSave("email")}
                            onCancel={() => handleCancel("email")}
                            onChange={(value) =>
                                setTempValues({ ...tempValues, email: value })
                            }
                            type="email"
                        />

                        <ProfileField
                            icon={<Lock className="w-5 h-5 text-fuchsia-400" />}
                            label="Password"
                            value={profile.password}
                            tempValue={tempValues.password}
                            isEditing={editing.password}
                            onEdit={() => handleEdit("password")}
                            onSave={() => handleSave("password")}
                            onCancel={() => handleCancel("password")}
                            onChange={(value) =>
                                setTempValues({
                                    ...tempValues,
                                    password: value,
                                })
                            }
                            type="password"
                        />

                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-slate-800/30 border border-slate-800">
                            <div className="flex items-center gap-3 flex-1">
                                <div className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Shield className="w-5 h-5 text-slate-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-slate-400 mb-1">
                                        Role
                                    </p>
                                    <p className="text-white font-medium truncate">
                                        {profile.role}
                                    </p>
                                </div>
                            </div>
                            <div className="text-xs text-slate-500 sm:text-right">
                                Non-editable
                            </div>
                        </div>

                        <ProfileField
                            icon={
                                <Calendar className="w-5 h-5 text-emerald-400" />
                            }
                            label="Date Created"
                            value={new Date(
                                profile.dateCreated
                            ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                            tempValue={tempValues.dateCreated}
                            isEditing={editing.dateCreated}
                            onEdit={() => handleEdit("dateCreated")}
                            onSave={() => handleSave("dateCreated")}
                            onCancel={() => handleCancel("dateCreated")}
                            onChange={(value) =>
                                setTempValues({
                                    ...tempValues,
                                    dateCreated: value,
                                })
                            }
                            type="date"
                        />
                    </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-violet-500/25 transition-all">
                        Save All Changes
                    </button>
                    <button className="flex-1 sm:flex-initial bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-full font-semibold transition-all">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

const ProfileField = ({
    icon,
    label,
    value,
    tempValue,
    isEditing,
    onEdit,
    onSave,
    onCancel,
    onChange,
    type = "text",
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    tempValue: string;
    isEditing: boolean;
    onEdit: () => void;
    onSave: () => void;
    onCancel: () => void;
    onChange: (value: string) => void;
    type?: string;
}) => (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-slate-800/30 border border-slate-800 hover:border-violet-500/30 transition-all group">
        <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-400 mb-1">{label}</p>
                {isEditing ? (
                    <input
                        type={type}
                        value={tempValue}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full bg-slate-900 border border-violet-500/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                        autoFocus
                    />
                ) : (
                    <p className="text-white font-medium truncate">{value}</p>
                )}
            </div>
        </div>

        <div className="flex gap-2 sm:ml-4">
            {isEditing ? (
                <>
                    <button
                        onClick={onSave}
                        className="p-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 rounded-lg transition-all"
                    >
                        <Check className="w-4 h-4 text-green-400" />
                    </button>
                    <button
                        onClick={onCancel}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg transition-all"
                    >
                        <X className="w-4 h-4 text-red-400" />
                    </button>
                </>
            ) : (
                <button
                    onClick={onEdit}
                    className="p-2 bg-slate-800 hover:bg-violet-500/20 border border-slate-700 hover:border-violet-500/50 rounded-lg transition-all"
                >
                    <Edit2 className="w-4 h-4 text-slate-400 group-hover:text-violet-400" />
                </button>
            )}
        </div>
    </div>
);

export default ProfilePage;
