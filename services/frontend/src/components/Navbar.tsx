import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import {
    ArrowLeft,
    Home,
    ListChecks,
    LogOut,
    Settings,
    Users,
} from "lucide-react";
import { useAppContext } from "../authServices/helper";
import { Button } from "../ui/button";
import { useState } from "react";

export default function Navbar({
    heading,
    subheading,
}: {
    heading?: string;
    subheading?: string;
}) {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, setUser } = useAppContext();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    const isSettingsPage =
        location.pathname.startsWith("/profile") ||
        location.pathname.startsWith("/change-username") ||
        location.pathname.startsWith("/change-password") ||
        location.pathname.startsWith("/change-email");
    const isDashboardPage = location.pathname === "/dashboard";
    const isLandingPage = location.pathname === "/";
    const isAdminPage = location.pathname.startsWith("/admin");
    const isGuestPage = location.pathname.startsWith("/guest");

    return (
        <nav className="sticky top-0 z-50 py-4 backdrop-blur-lg border-b border-white/5 w-full mb-2">
            <div className="container px-4 mx-auto relative lg:text-sm">
                <div className="md:hidden flex justify-between items-center">
                    <Link to="/" className="flex items-center">
                        <Logo className="h-12 w-auto" />
                    </Link>
                    <button
                        className="text-slate-200 p-2"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                            stroke="currentColor"
                            className="w-7 h-7"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </button>
                </div>

                <div className="hidden md:block">
                    {isLandingPage && (
                        <div className="flex justify-between items-center">
                            <div className="flex items-center flex-shrink-0">
                                <Link
                                    to="/"
                                    className="flex items-center drop-shadow-lg"
                                >
                                    <Logo className="h-14 w-auto" />
                                </Link>
                            </div>
                            <div className="flex justify-center space-x-4 items-center">
                                <Link
                                    to="/login"
                                    className="py-2 px-4 text-slate-300 hover:text-white transition-colors text-sm font-medium"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-[#6366F1] hover:bg-[#5558DD] text-white py-2 px-4 rounded-full transition-all text-sm font-medium"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    )}
                    {isSettingsPage && (
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Link
                                    to="/"
                                    className="flex items-center drop-shadow-lg"
                                >
                                    <Logo className="w-24 h-12 sm:w-32 sm:h-16 md:w-40 md:h-20" />
                                </Link>
                            </div>

                            <h4 className="text-xl sm:text-lg md:text-2xl text-white font-semibold text-center">
                                Settings
                            </h4>

                            <div className="flex items-center gap-3">
                                <button
                                    className="flex items-center gap-2 border border-slate-700 text-slate-200 px-3 py-1 rounded-lg hover:bg-slate-800 transition-colors"
                                    onClick={() => navigate(-1)}
                                >
                                    <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 md:wd-4 md:h-4" />
                                    Back
                                </button>
                                <button
                                    className="flex items-center gap-2 border border-slate-700 text-slate-200 px-3 py-1 rounded-lg hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-400 transition-colors"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="w-3 h-3 sm:w-4 sm:h-4 md:wd-4 md:h-4" />
                                    Log Out
                                </button>
                            </div>
                        </div>
                    )}
                    {isDashboardPage && (
                        <div className="flex justify-between items-center">
                            <Link to="/" className="flex items-center gap-3">
                                <Logo className="h-20 w-30 drop-shadow-2xl" />
                            </Link>

                            <div className="hidden md:flex items-center gap-4">
                                {/* Dynamic Header Based on Role */}
                                {user?.role === "admin" ? (
                                    <>
                                        <span className="text-slate-400 text-sm font-medium">
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
                                            <LogOut
                                                size={16}
                                                className="mr-2"
                                            />
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
                                            <Settings
                                                size={16}
                                                className="mr-2"
                                            />
                                            Settings
                                        </Button>

                                        <Button
                                            variant="outline"
                                            onClick={handleLogout}
                                            className="flex items-center gap-2 border border-slate-700 text-slate-200 px-3 py-1 rounded-lg hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-400 transition-colors"
                                        >
                                            <LogOut
                                                size={16}
                                                className="mr-2"
                                            />
                                            Logout
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                    {isGuestPage && (
                        <div className="flex justify-between items-center">
                            <Link to="/" className="flex items-center gap-3">
                                <Logo className="h-20 w-30 drop-shadow-2xl" />
                            </Link>
                            <p className="text-slate-400 text-sm md:text-base italic text-center md:text-left max-w-xs md:max-w-sm">
                                Welcome Guest! This is a temporary page, nothing done here will
                                be saved. Please create an account to save your changes
                            </p>
                            <div className="hidden md:flex items-center gap-4">

                                <Link
                                    to="/login"
                                    className="flex items-center gap-2 border border-slate-700 text-slate-200 px-3 py-1 rounded-lg hover:bg-purple-500/20 hover:border-purple-500/30 hover:text-purple-400 transition-colors"
                                >
                                    Sign In
                                </Link>
                            </div>
                        </div>
                    )}
                    {isAdminPage && (
                        <div className="flex justify-between items-center">
                            <div className="flex items-center flex-shrink-0">
                                <Link
                                    to="/"
                                    className="flex items-center drop-shadow-lg"
                                >
                                    <Logo className="h-14 w-auto" />
                                </Link>
                            </div>
                            <div className="flex flex-col justify-center items-center text-center">
                                <h1 className="text-base md:text-lg font-medium text-white">
                                    {heading}
                                </h1>
                                <p className="text-slate-400 text-[10px] md:text-xs">
                                    {subheading}
                                </p>
                            </div>

                            <div className="flex justify-center space-x-4 items-center">
                                <button
                                    className="flex items-center gap-2 border border-slate-700 text-slate-200 px-3 py-1 rounded-lg hover:bg-slate-800 transition-colors"
                                    onClick={() => navigate(-1)}
                                >
                                    <Home className="w-3 h-3 sm:w-4 sm:h-4 md:wd-4 md:h-4" />
                                    Home
                                </button>
                                <button
                                    className="flex items-center gap-2 border border-slate-700 text-slate-200 px-3 py-1 rounded-lg hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-400 transition-colors"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="w-3 h-3 sm:w-4 sm:h-4 md:wd-4 md:h-4" />
                                    Log Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {mobileOpen && (
                    <div className="md:hidden mt-3 space-y-2 bg-slate-900/90 p-4 rounded-xl border border-slate-700">
                        {isSettingsPage && (
                            <>
                                <button
                                    onClick={() => navigate(-1)}
                                    className="w-full flex items-center gap-2 text-left text-slate-200 px-3 py-2 rounded-lg hover:bg-slate-800 transition"
                                >
                                    <ArrowLeft size={16} /> Back
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2 text-left text-red-400 px-3 py-2 rounded-lg hover:bg-red-500/20 transition"
                                >
                                    <LogOut size={16} /> Log Out
                                </button>
                            </>
                        )}

                        {isDashboardPage && (
                            <>
                                <button
                                    onClick={() => navigate("/profile")}
                                    className="w-full flex items-center gap-2 text-left text-slate-200 px-3 py-2 rounded-lg hover:bg-slate-800 transition"
                                >
                                    <Settings size={16} /> Settings
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2 text-left text-red-400 px-3 py-2 rounded-lg hover:bg-red-500/20 transition"
                                >
                                    <LogOut size={16} /> Logout
                                </button>
                            </>
                        )}

                        {isLandingPage && (
                            <>
                                <button
                                    onClick={() => navigate("/login")}
                                    className="w-full flex items-center gap-2 text-left text-slate-200 px-3 py-2 rounded-lg hover:bg-slate-800 transition"
                                >
                                    Sign In
                                </button>

                                <button
                                    onClick={() => navigate("/signup")}
                                    className="w-full flex items-center gap-2 text-left text-white px-3 py-2 rounded-lg hover:bg-[#5558DD] transition"
                                >
                                    Get Started
                                </button>
                            </>
                        )}

                        {isAdminPage && (
                            <>
                                <button
                                    onClick={() => navigate("-1")}
                                    className="w-full flex items-center gap-2 text-left text-slate-200 px-3 py-2 rounded-lg hover:bg-slate-800 transition"
                                >
                                    Home
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2 text-left text-red-400 px-3 py-2 rounded-lg hover:bg-red-500/20 transition"
                                >
                                    Log Out
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}
