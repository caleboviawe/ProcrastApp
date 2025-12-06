import { Search, Filter, Loader2 } from "lucide-react";

type FilterRole = "all" | "student" | "admin";

interface UserControlsBarProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    filterRole: FilterRole;
    setFilterRole: (value: FilterRole) => void;
    onRefresh: () => void;
}

export default function FilterUsers({
    searchTerm,
    setSearchTerm,
    filterRole,
    setFilterRole,
    onRefresh,
}: UserControlsBarProps) {
    return (
        <div className="mb-6 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search function for filtering users */}
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all"
                />
            </div>

            <div className="flex gap-3">
                {/* Filer Users by roles */}
                <div className="relative">
                    <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <select
                        value={filterRole}
                        onChange={(e) =>
                            setFilterRole(e.target.value as FilterRole)
                        }
                        className="pl-12 pr-8 py-3 bg-white/5 border border-white/10 rounded-xl text-slate-100 focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all appearance-none cursor-pointer"
                    >
                        <option value="all">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="student">Student</option>
                    </select>
                </div>
                {/* Resync user table from backend */}
                <button
                    onClick={onRefresh}
                    className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold transition-all"
                    title="Refresh users"
                >
                    <Loader2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
