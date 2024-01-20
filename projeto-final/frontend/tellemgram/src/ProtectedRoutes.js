
import{ Outlet, Navigate  } from 'react-router-dom';
import React from "react"
import { useAuth } from './AuthContext';

const ProtectedRoutes = () => {
    const { loggedIn } = useAuth();
    if (!loggedIn) {
        console.log("Não está logado")
        console.log(loggedIn)
        return <Navigate to="/entrar" />;
    }
    return(
        <div>
            ROTA PROTEGIDA {loggedIn && "true"} {!loggedIn && "false"}
            <Outlet />
        </div>

    )
}


export default ProtectedRoutes;