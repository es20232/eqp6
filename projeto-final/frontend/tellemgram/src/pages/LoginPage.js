import React from 'react';
import AuthLayout from '../components/AuthLayout/AuthLayout';
import Login from '../components/Login/Login';
import { Navigate } from "react-router-dom"
import { useAuth } from '../AuthContext';


const LoginPage = () =>{
    const { loggedIn } = useAuth();
    
    // Verifica se o usuário já está logado
    if (loggedIn) {
        console.log(loggedIn)
        return <Navigate to="/" />;
    } else {
        return (
            <AuthLayout>
                <Login />
            </AuthLayout>
        )
    }
}

export default LoginPage;