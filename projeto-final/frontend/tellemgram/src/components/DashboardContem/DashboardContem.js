// Arquivo Dashboard.js

import React from 'react';
import './DashboardContem.css';

const DashboardContem = ({ children }) =>{
  return (
    <div className="dashboard-container-title">
      <div className="page-title">
        <h1>Nome da Página</h1>
        <div className="title-divider"></div>
      </div>
      <div className="page-content">
        {children}
      </div>
    </div>
  );
};

export default DashboardContem;
