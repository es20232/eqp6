import React from "react";
import "./AuthPages.css";
import { Outlet, Routes, Route, Navigate, useLocation } from "react-router-dom";
import SignIn from "./SignIn"
import SignUp from './SignUp';
import Recover from './Recover';

import { AnimatePresence } from "framer-motion";

const AuthPages = () => {
    const location = useLocation();
    return(
        <div className="content">
            <div className="auth-form-background">
                <AnimatePresence mode='wait'>
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<Navigate to="entrar" />} />
                        <Route key="teste1" path="entrar" element={<SignIn  key="teste1"/>} />
                        <Route key="teste2" path="cadastrar" element={<SignUp key="teste2"/>} />
                        <Route path="recuperar" element={<Recover />} />
                    </Routes>
                </AnimatePresence>
            </div>
            
        </div>
    )
}

export default AuthPages