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

/*Tela de dashboard na qual o usuario logado tem acesso as funcoes da aplicacao
tal como editar seu perfil*/
const DashboardLayout = ({ children }) => {
  const { logout, verifyTokenExpirationTime } = useAuth();
  const [currentPage, setCurrentPage] = useState("home");
  const [userData, setUserData] = useState({
    username: "", // Nome padrão, pode ser alterado
    first_name: "",
    userAvatar: "", // URL padrão da imagem, pode ser alterada
  });

  useEffect(() => {
    const getUserData = async () => {
      if (sessionStorage.getItem("first_name") !== null) {
        console.log("Usuário salvo em local storage");
        setUserData({ first_name: sessionStorage.getItem("first_name") });
        return;
      }
      try {
        await verifyTokenExpirationTime();
        const response = await api.get(endpoints.getUsersEndpoint + "9");
        console.log(response);
        if ("data" in response) {
          setUserData({ first_name: response.data.first_name });
          sessionStorage.setItem("first_name", response.data.first_name);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);

  const openPage = (pageName) => {
    setCurrentPage(pageName);
  };
  // const [userData, setUserData] = useState({
  //   username: "UserName", // Nome padrão, pode ser alterado
  //   userAvatar: "URL_DA_IMAGEM_PADRAO", // URL padrão da imagem, pode ser alterada
  // });

  const logoutButtonHandler = () => {
    logout();
  };

  const profileButtonHandler = async () => {
    try {
      await verifyTokenExpirationTime();
      const response = await api.get(endpoints.getUsersEndpoint);
      console.log(response);
      if ("data" in response) {
        setUserData({ first_name: response.data.first_name });
        sessionStorage.setItem("first_name", response.data.first_name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const imageButtonHandler = async () => {
    try {
      await verifyTokenExpirationTime();
      const response = await api.get(endpoints.getUsersEndpoint + "9");
      console.log(response);
      if ("data" in response) {
        setUserData({ first_name: response.data.first_name });
        sessionStorage.setItem("first_name", response.data.first_name);
      }
    } catch (error) {
      console.log(error);
    }
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
      const response = await api.get(endpoints.getUsersEndpoint + "9/");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const imageButton3 = async () => {
    try {
      await verifyTokenExpirationTime();
      const response = await api.put(endpoints.getUsersEndpoint + "9/", {
        username: "detetivejake",
        profile_image: "TestString",
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="container">
      <div className="side-menu">
        <div className="user-profile">
          <div className="user-profile-image">
            <PersonIcon sx={{ fontSize: 56, color: "white" }} />
          </div>
          <span className="user-name">{userData.first_name}</span>
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

        {/* <ul>
          <li className={currentPage === "home" ? "active" : ""}>
            <a
              href="http://localhost:3000/recuperar#"
              onClick={() => openPage("home")}
            >
              <span className="icon" style={{ verticalAlign: "middle" }}>
                <HomeIcon sx={{ fontSize: 32 }} />
              </span>{" "}
              Home
            </a>
          </li>
          <li className={currentPage === "images" ? "active" : ""}>
            <a
              href="http://localhost:3000/recuperar#"
              onClick={() => openPage("images")}
            >
              <span className="icon" style={{ verticalAlign: "middle" }}>
                <ImageIcon sx={{ fontSize: 32 }} />
              </span>{" "}
              Imagem
            </a>
          </li>
          <li className={currentPage === "posts" ? "active" : ""}>
            <a
              href="http://localhost:3000/recuperar#"
              onClick={() => openPage("posts")}
            >
              <span className="icon" style={{ verticalAlign: "middle" }}>
                <PostAddIcon sx={{ fontSize: 32 }} />
              </span>{" "}
              Posts
            </a>
          </li>
          <li className={currentPage === "upload" ? "active" : ""}>
            <a
              href="http://localhost:3000/recuperar#"
              onClick={() => openPage("upload")}
            >
              <span className="icon" style={{ verticalAlign: "middle" }}>
                <DownloadIcon sx={{ fontSize: 32 }} />
              </span>{" "}
              Upload
            </a>
          </li>
          <li className={currentPage === "profile" ? "active" : ""}>
            <a
              href="http://localhost:3000/recuperar#"
              onClick={() => openPage("profile")}
            >
              <span className="icon" style={{ verticalAlign: "middle" }}>
                <PersonIcon sx={{ fontSize: 32 }} />
              </span>{" "}
              Perfil
            </a>
          </li>
          <li className={currentPage === "Logout" ? "active" : ""}>
            <a
              href="http://localhost:3000/entrar#"
              onClick={() => openPage("Logout")}
            >
              <span className="icon" style={{ verticalAlign: "middle" }}>
                <LogoutIcon sx={{ fontSize: 32 }} />
              </span>{" "}
              Logout
            </a>
          </li>
        </ul> */}
      </div>
      <div className="contentDashboard">{children}</div>
    </section>
  );
};

export default DashboardLayout;
