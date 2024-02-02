import React from "react";
import HomePageLayout from "../components/HomePageLayout/HomePageLayout";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <HomePageLayout>
      <Outlet />
    </HomePageLayout>
  );
};

export default HomePage;
