import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { useAppContext } from "./helper";

const GuestRoutes: React.FC = () => {
    const { user, loading } = useAppContext();

    if (loading) {
        return <LoadingScreen />;
    }
    if (!user || user.role !== "guest") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default GuestRoutes;
