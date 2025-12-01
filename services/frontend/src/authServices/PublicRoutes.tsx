import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PublicRoutes: React.FC = () => {
    const isAuthenticated = localStorage.getItem("token");

    return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default PublicRoutes;