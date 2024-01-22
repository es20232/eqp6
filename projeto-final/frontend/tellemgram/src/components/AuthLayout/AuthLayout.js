import React from 'react';
import './AuthLayout.css'

const AuthLayout = ({ children }) => {
    return (
        <div className="auth-background">
            <div className="auth-container">
                { children }
            </div>
        </div>
    );
}
 
export default AuthLayout;