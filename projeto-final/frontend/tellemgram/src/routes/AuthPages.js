import React from "react";
import "./AuthPages.css";
import { Outlet } from "react-router-dom";

const AuthPages = () => {
    return(
        <div className="content">
            <div className="auth-form-background">
                <Outlet />
            </div>
            
        </div>
    )
}

export default AuthPages