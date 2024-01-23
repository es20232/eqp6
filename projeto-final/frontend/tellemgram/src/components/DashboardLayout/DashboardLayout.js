import React, { useState, useEffect } from "react";
import "./DashboardLayout.css";
import HomeIcon from "@mui/icons-material/Home";
import ImageIcon from "@mui/icons-material/Image"; //image
import PostAddIcon from "@mui/icons-material/PostAdd"; //post
import PersonIcon from "@mui/icons-material/Person"; //profile
import LogoutIcon from "@mui/icons-material/Logout"; //Logout
import BordaLonga from "./BordaLonga";
import Avatar from '@mui/material/Avatar';

import { useAuth } from "../../AuthContext";
import { api, endpoints } from "../../apiService";

import Cookies from "js-cookie";

import { useNavigate, useLocation } from "react-router-dom";

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
      <div className="side-menu">
        <div className="user-profile">
          <div className="user-profile-image-container">
            {!myUserData.userImage && (
              // <PersonIcon sx={{ fontSize: 30, color: "white" }} />
              <Avatar sx={{ bgcolor: "#CEA6CE"}}>{Cookies.get("myFirstName")[0]}</Avatar>
            )}
            {myUserData.userImage && (
              <Avatar alt="Remy Sharp" src={`data:image/png;base64,${myUserData.userImage}`} className="user-image"/>
            )}
          </div>
          <span className="user-name">{Cookies.get("myFirstName")}</span>
        </div>
        <div className="menu-list">
          <div
            className={`list-item ${currentPage === "" ? "active" : ""}`}
            onClick={feedButtonHandler}
          >
            <HomeIcon sx={{ fontSize: 32 }} />
            <span>Feed</span>
          </div>
          <div className="list-item">
            <ImageIcon sx={{ fontSize: 32 }} />
            <span>Minhas imagens</span>
          </div>
          <div className="list-item">
            <PostAddIcon sx={{ fontSize: 32 }} />
            <span>Minhas postagens</span>
          </div>
          <div
            className={`list-item ${currentPage === "perfil" ? "active" : ""}`}
            onClick={profileButtonHandler}
          >
            <PersonIcon sx={{ fontSize: 32 }} />
            <span>Meu perfil</span>
          </div>
        </div>
        <div className="logout-button" onClick={logoutButtonHandler}>
          <LogoutIcon sx={{ fontSize: 32 }} />
          <span>Sair</span>
        </div>
      </div>
      <div></div>
      <div className="content">
        <div className="content-title">
          <h1>Tellemgram</h1>
          <hr />
        </div>
        {children}
      </div>
    </section>
  );
};

export default DashboardLayout;
