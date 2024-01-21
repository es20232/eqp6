
import{ Outlet, Navigate  } from 'react-router-dom';
import React from "react"
import { useAuth } from './AuthContext';

const ProtectedRoutes = () => {
    const { loggedIn } = useAuth();
    if (!loggedIn) {
        console.log(loggedIn)
        return <Navigate to="/entrar" />;
    }
    return(
        <div>
            <Outlet />
        </div>

    )
}


export default ProtectedRoutes;