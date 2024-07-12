import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function NoAuthRoute() {
    const { isAuth } = useSelector((state) => state.authRed);

    return !isAuth ? <Outlet /> : <Navigate to="/profile" />;
}

export default NoAuthRoute
