import React from 'react';
import './SmallLayout.css'

const SmallLayout = ({ children }) => {
    return (
        <div className="content">
            <div className="auth-wrapper-container">
                { children }
            </div>
        </div>
    );
}
 
export default SmallLayout;