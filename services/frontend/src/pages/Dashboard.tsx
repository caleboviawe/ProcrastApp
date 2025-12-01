import { useAppContext } from "../authServices/helper";

function Dashboard() {
    const { user } = useAppContext();
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to your dashboard! User: { user?.username }</p>
        </div>
    );
}

export default Dashboard;