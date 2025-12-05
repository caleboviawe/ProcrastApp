import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { useAppContext } from "./helper";

const AdminRoutes: React.FC = () => {
    const { user, loading } = useAppContext();
    const isAdmin = user?.role === "admin";
    if (loading) {
        return <LoadingScreen />;
    }
    return isAdmin ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default AdminRoutes;
