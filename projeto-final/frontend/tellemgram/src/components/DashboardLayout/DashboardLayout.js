import React, { useState, useEffect } from "react";
import "./DashboardLayout.css";
import HomeIcon from "@mui/icons-material/Home";
import DownloadIcon from "@mui/icons-material/Download"; //upload
import ImageIcon from "@mui/icons-material/Image"; //image
import PostAddIcon from "@mui/icons-material/PostAdd"; //post
import PersonIcon from "@mui/icons-material/Person"; //profile
import LogoutIcon from "@mui/icons-material/Logout"; //Logout

import { useAuth } from "../../AuthContext";
import { api, endpoints } from "../../apiService";

import Cookies from "js-cookie";

import { useNavigate } from "react-router-dom";

/*Tela de dashboard na qual o usuario logado tem acesso as funcoes da aplicacao
tal como editar seu perfil*/
const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const [base64String, setBase64String] = useState();
  const { logout, verifyTokenExpirationTime, myUserId } = useAuth();
  const [currentPage, setCurrentPage] = useState("home");
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
      console.log("USer data: " + JSON.stringify(myUserData));
    };
    getUserData();
  }, []);

  // const openPage = (pageName) => {
  //   setCurrentPage(pageName);
  // };
  // const [userData, setUserData] = useState({
  //   username: "UserName", // Nome padrão, pode ser alterado
  //   userAvatar: "URL_DA_IMAGEM_PADRAO", // URL padrão da imagem, pode ser alterada
  // });

  const logoutButtonHandler = () => {
    logout();
  };

  const profileButtonHandler = async () => {
    navigate("/carregar")
  };

  const imageButtonHandler = async () => {
    navigate("/carregar")
  };

  const imageButton1 = async () => {
    try {
      await verifyTokenExpirationTime();
      const response = await api.get(endpoints.getUsersEndpoint);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const imageButton2 = async () => {
    try {
      await verifyTokenExpirationTime();
      const response = await api.get(
        endpoints.getUsersEndpoint + myUserId + "/"
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const imageButton3 = async () => {
    try {
      await verifyTokenExpirationTime();
      const response = await api.get(
        endpoints.uploadImageEndpoint + "?user_id=" + myUserId
      );
      console.log(response.data[0].image);
      setBase64String(response.data[0].image);
    } catch (error) {
      console.log(error);
    }
  };

  const decodeImage64 = (base64String) => {
    // Verifica se há uma string base64 válida
    if (base64String) {
      // Decodifica a string base64
      const decodedData = atob(base64String);

      // Converte os dados binários para um array de bytes
      const byteArray = new Uint8Array(decodedData.length);
      for (let i = 0; i < decodedData.length; i++) {
        byteArray[i] = decodedData.charCodeAt(i);
      }

      // Cria um blob com os dados binários
      const blob = new Blob([byteArray], { type: "image/*" });

      // Cria uma URL de objeto (blob URL) para a imagem
      return URL.createObjectURL(blob);
    }
  };

  return (
    <section className="container">
      <div className="side-menu">
        <div className="user-profile">
          <div className="user-profile-image-container">
            {!myUserData.userImage && <PersonIcon sx={{ fontSize: 90, color: "white" }} />}
            {myUserData.userImage && (
          <img
            src={`data:image/png;base64,${myUserData.userImage}`}
            alt="Imagem"
            className="user-image"
          />
        )}
          </div>
          <span className="user-name">{myUserData.first_name}</span>
        </div>
        <div className="menu-list">
          <div className="list-item active">
            <HomeIcon sx={{ fontSize: 32 }} />
            <span>Home</span>
          </div>
          <div className="list-item">
            <ImageIcon sx={{ fontSize: 32 }} />
            <span>Imagem</span>
          </div>
          <div className="list-item">
            <PostAddIcon sx={{ fontSize: 32 }} />
            <span>Postagem</span>
          </div>
          <div className="list-item">
            <DownloadIcon sx={{ fontSize: 32 }} />
            <span>Carregar Imagem</span>
          </div>
          <div className="list-item" onClick={profileButtonHandler}>
            <PersonIcon sx={{ fontSize: 32 }} />
            <span>Perfil</span>
          </div>
          <div className="list-item" onClick={imageButton1}>
            <PersonIcon sx={{ fontSize: 32 }} />
            <span>GET api/users</span>
          </div>
          <div className="list-item" onClick={imageButton2}>
            <PersonIcon sx={{ fontSize: 32 }} />
            <span>GET api/users/9/</span>
          </div>
          <div className="list-item" onClick={imageButton3}>
            <PersonIcon sx={{ fontSize: 32 }} />
            <span>PUT api/users/9/ (img string) </span>
          </div>
        </div>
        <div className="logout-button" onClick={logoutButtonHandler}>
          <LogoutIcon sx={{ fontSize: 32 }} />
          <span>Sair</span>
        </div>
      </div>
      <div>
        Teste {myUserData.userId}
        
      </div>
      <div className="contentDashboard">{children}</div>
    </section>
  );
};

export default DashboardLayout;
