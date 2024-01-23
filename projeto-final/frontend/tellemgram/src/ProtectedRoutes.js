
import{ Outlet, Navigate  } from 'react-router-dom';
import React from "react"
import { useAuth } from './AuthContext';

const ProtectedRoutes = () => {
    const { loggedIn } = useAuth();
    if (!loggedIn) {
        return <Navigate to="/entrar" />;
    }
    return(
        <>
            <Outlet />
        </>

    )
}


export default ProtectedRoutes;