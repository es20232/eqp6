import React, { useState, useEffect } from "react";
import "./DashboardLayout.css";
import HomeIcon from "@mui/icons-material/Home";
import ImageIcon from "@mui/icons-material/Image"; //image
import PostAddIcon from "@mui/icons-material/PostAdd"; //post
import PersonIcon from "@mui/icons-material/Person"; //profile
import LogoutIcon from "@mui/icons-material/Logout"; //Logout
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';

import { useAuth } from "../../AuthContext";
import { api, endpoints } from "../../apiService";

import Cookies from "js-cookie";

import { useNavigate, useLocation } from "react-router-dom";
import SideMenu from "../SideMenu/SideMenu";

/*Tela de dashboard na qual o usuario logado tem acesso as funcoes da aplicacao
tal como editar seu perfil*/
const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, verifyTokenExpirationTime } = useAuth();
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    setCurrentPage(location.pathname.split("/")[1]);
  }, [location.pathname]);

  const [myUserData, setMyUserData] = useState({
    userId: "",
    first_name: "",
    userImage: "",
  });

  useEffect(() => {
    const getUserData = async () => {
      const newUserData = { userId: Cookies.get("myUserId") };
      newUserData.first_name = Cookies.get("myFirstName");

      try {
        await verifyTokenExpirationTime();
        const response = await api.get(
          endpoints.uploadImageEndpoint + "?user_id=" + Cookies.get("myUserId")
        );
        newUserData.userImage = response.data[0].image;
      } catch (error) {
        console.log(error);
      }

      setMyUserData(newUserData);
    };
    getUserData();
  }, []);

  const feedButtonHandler = () => {
    navigate("/");
  };

  const profileButtonHandler = async () => {
    navigate("/perfil/" + myUserData.userId);
  };

  const logoutButtonHandler = () => {
    logout();
  };

  return (
    <section className="container">
      <SideMenu userName={Cookies.get("myFirstName")} userProfileImage={myUserData.userImage}/>
      <div className="content">
        {children}
      </div>
    </section>
  );
};

export default DashboardLayout;
