import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { useAppContext } from "./helper";

const PublicRoutes: React.FC = () => {
    const { user, loading } = useAppContext();

    if (loading) {
        return <LoadingScreen />;
    }
    return !user ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default PublicRoutes;
