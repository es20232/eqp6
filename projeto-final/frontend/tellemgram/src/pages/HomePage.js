import React from "react";
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

export default HomePage;
