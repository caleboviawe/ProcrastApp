import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DocumentEditor from "./pages/DocumentEditor";
import ProtectedRoutes from "./authServices/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import PublicRoutes from "./authServices/PublicRoutes";
import Settings from "./pages/Settings/Settings";
import ChangeUsername from "./pages/Settings/ChangeUsername";
import ChangePassword from "./pages/Settings/ChangePassword";
import ChangeEmail from "./pages/Settings/ChangeEmail";
import AdminUsersPage from "./pages/Admin/AllUsers";
import AdminTasksPage from "./pages/Admin/AllTasks";
import AdminRoutes from "./authServices/AdminRoutes";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/*" element={<LandingPage />} />
                <Route element={<PublicRoutes />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Route>
                <Route element={<ProtectedRoutes />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/editor/:id" element={<DocumentEditor />} />
                    <Route path="/profile" element={<Settings />} />
                    <Route
                        path="/change-username"
                        element={<ChangeUsername />}
                    />
                    <Route
                        path="/change-password"
                        element={<ChangePassword />}
                    />
                    <Route path="/change-email" element={<ChangeEmail />} />
                    <Route element={<AdminRoutes />}>
                        <Route
                            path="/admin/allUsers"
                            element={<AdminUsersPage />}
                        />
                        <Route
                            path="/admin/allTasks"
                            element={<AdminTasksPage />}
                        />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
