import React from 'react';
//import AuthLayout from '../components/AuthLayout/AuthLayout';
import Recover from '../components/Recover/Recover';
import DashboardLayout from '../components/DashboardLayout/DashboardLayout';
import DashboardContem from '../components/DashboardContem/DashboardContem';
const RecoverPage = () =>{
    return (
        <DashboardLayout>
            <DashboardContem>
                <Recover />
            </DashboardContem>
        </DashboardLayout>
    )
}

export default RecoverPage;