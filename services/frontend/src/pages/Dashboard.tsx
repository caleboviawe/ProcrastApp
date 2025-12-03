import { Link } from "react-router-dom";
import { useAppContext } from "../authServices/helper";

function Dashboard() {
    const { user, setUser } = useAppContext();
    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        window.location.href = "/login";
    };
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to your dashboard! User: {user?.username}</p>
            <button onClick={handleLogout}>Logout</button>
            <Link
                to="/profile"
                className="text-violet-400 font-medium hover:text-violet-300 transition-colors"
            >
                Profile
            </Link>
        </div>
    );
}

export default Dashboard;