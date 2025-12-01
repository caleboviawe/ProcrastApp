import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes: React.FC = () => {
    const isAuthenticated = Boolean(localStorage.getItem("token"));
    
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoutes;