import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { useAppContext } from "./helper";

const ProtectedRoutes: React.FC = () => {
    const { user, loading } = useAppContext();

    if (loading) {
        return <LoadingScreen />;
    }

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;