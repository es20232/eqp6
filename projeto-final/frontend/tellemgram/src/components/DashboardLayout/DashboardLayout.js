import React from 'react';
import './DashboardLayout.css'

const DashboardLayout = ({ children }) => {
    return (
        <div className="contentDashboard">
			
            <div className="auth-wrapper-container">
                { children }
            </div>
        </div>
    );
}
 
export default DashboardLayout;