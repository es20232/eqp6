import React from 'react';
import './AuthLayout.css'

const AuthLayout = ({ children }) => {
    return (
        <div className="content">
            <div className="auth-wrapper-container">
                { children }
            </div>
        </div>
    );
}
 
export default AuthLayout;