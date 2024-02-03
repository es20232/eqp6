import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";
import { useAuth } from "../../AuthContext";
import { api, endpoints } from "../../apiService";

import "./Profile.css";
import styles from "./Profile.module.css";
import { useTheme } from "@mui/system";
import { useQuery } from "react-query";
import Error from "../Error/Error";

const Profile = () => {
  const { verifyTokenExpirationTime } = useAuth();
  const theme = useTheme();
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    data: userData,
    isLoading: isUserDataLoading,
    error: queryError,
  } = useQuery(["getUserData", location], async () => {
    try {
      await verifyTokenExpirationTime();
  
      if (location.pathname.split("/")[1] === "meu-perfil") {
        const response = await api.get(
          endpoints.users + Cookies.get("myUserId") + "/"
        );
        console.log(response.data);
        return response.data;
      } else if (isNaN(userId)) {
        throw new Error("Erro: userId inválido");
      } else {
        const response = await api.get(endpoints.users + userId + "/");
        console.log(response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Erro durante a busca de dados:", error);
      throw error; // Lançar o erro novamente para que o useQuery o detecte
    }
  });

  if (queryError) {
    return <Error />;
  } else {
    return (
      <div className={styles.pageContent}>
        <div className={styles.profileContainer}>
          <div className={styles.userDataContainer}>
            <div className={styles.userImageContainer}>
              {isUserDataLoading && (
                <Skeleton
                  variant="circular"
                  animation="wave"
                  width={"100%"}
                  height={"100%"}
                />
              )}
              {!isUserDataLoading && userData && (
                <Avatar
                  alt={userData.first_name}
                  src={`data:image/png;base64,${userData.profile_image}`}
                  className="user-image"
                  sx={{
                    height: "100%",
                    width: "100%",
                    fontSize: "66px",
                    fontWeight: "bold",
                    backgroundColor: theme.palette.secondary.main,
                  }}
                />
              )}
            </div>
            <div className={styles.userTextInfos}>
              {userData ? (
                <>
                  <span className={styles.userOtherInfosContainer}>
                    {userData.username}
                  </span>
                  <span className={styles.userFullNameContainer}>
                    {userData.first_name + " " + userData.last_name}
                  </span>
                  <span className={styles.userOtherInfosContainer}>
                    10 postagens
                  </span>
                </>
              ) : (
                <>
                  <Skeleton variant="text" width={100} height={15} />
                  <Skeleton variant="text" width={200} height={20} />
                  <Skeleton variant="text" width={100} height={15} />
                </>
              )}
            </div>
          </div>
          <div className={styles.buttonsContianer}>
            {!isUserDataLoading && userData.id == Cookies.get("myUserId") && (
              <Button
                sx={{ width: "100%" }}
                variant="outlined"
                onClick={() => {
                  navigate("/meu-perfil/editar");
                }}
              >
                Editar Perfil
              </Button>
            )}

            <Button
              sx={{ width: "100%" }}
              variant="outlined"
              // onClick={() => {
              //   navigate("/meu-perfil/editar");
              // }}
            >
              Compartilhar
            </Button>
          </div>

          <hr className={styles.horizontalLine} />
          <div className={styles.postsContainer}>
            <div className={styles.postPlaceholder}></div>
            <div className={styles.postPlaceholder}></div>
            <div className={styles.postPlaceholder}></div>
            <div className={styles.postPlaceholder}></div>
            <div className={styles.postPlaceholder}></div>
            <div className={styles.postPlaceholder}></div>
            <div className={styles.postPlaceholder}></div>
            <div className={styles.postPlaceholder}></div>
            <div className={styles.postPlaceholder}></div>
            <div className={styles.postPlaceholder}></div>
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;
