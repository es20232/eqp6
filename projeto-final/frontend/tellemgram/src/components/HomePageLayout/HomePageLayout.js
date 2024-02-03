import React, { useState, useEffect } from "react";
// import "./DashboardLayout.css";
import HomeIcon from "@mui/icons-material/Home";
import ImageIcon from "@mui/icons-material/Image"; //image
import PostAddIcon from "@mui/icons-material/PostAdd"; //post
import PersonIcon from "@mui/icons-material/Person"; //profile
import LogoutIcon from "@mui/icons-material/Logout"; //Logout
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import styles from "./HomePageLayout.module.css";
import { useAuth } from "../../AuthContext";
import { api, endpoints } from "../../apiService";

import Cookies from "js-cookie";

import { useNavigate, useLocation } from "react-router-dom";
import SideMenu from "../SideMenu/SideMenu";

/*Tela de dashboard na qual o usuario logado tem acesso as funcoes da aplicacao
tal como editar seu perfil*/
const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const { logout, verifyTokenExpirationTime } = useAuth();
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    setCurrentPage(location.pathname.split("/")[1]);
  }, [location.pathname]);




  return (
    <section className={styles.container}>
      <SideMenu userName={Cookies.get("myFirstName")}/>
      {children}
    </section>
  );
};

export default DashboardLayout;
