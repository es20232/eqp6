import React from 'react';
import './SmallLayout.css'

const SmallLayout = ({ children }) => {
    return (
        <div className="small-layout-background">
            <div className="small-layout-container">
                { children }
            </div>
        </div>
    );
}
 
export default SmallLayout;