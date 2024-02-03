import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";
import { useAuth } from "../../AuthContext";
import { api, endpoints } from "../../apiService";
import styles from "./EditProfile.module.css";
import { useTheme } from "@mui/system";
import { useQuery } from "react-query";
import { styled } from "@mui/material/styles";

const EditProfileImage = () => {
  const hiddenFileInput = useRef(null);
  const { verifyTokenExpirationTime } = useAuth();
  const theme = useTheme();
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [profileImage, setProfileImage] = useState();

  const {
    data: userData,
    isLoading: isUserDataLoading,
    error: queryError,
  } = useQuery(
    ["getUserData", location],
    async () => {
      try {
        await verifyTokenExpirationTime();

        const response = await api.get(
          endpoints.users + Cookies.get("myUserId") + "/"
        );
        setProfileImage(response.data.profile_image);
        return response.data;
      } catch (error) {
        console.error("Erro durante a busca de dados:", error);
        throw error; // Lançar o erro novamente para que o useQuery o detecte
      }
    },
    { refetchOnWindowFocus: false }
  );

  const handleImageChange = (event) => {
    console.log("teste");
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setProfileImage(reader.result.split(",")[1]);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click(); // ADDED
  };

  const handleImageCancel = () => {
    setProfileImage(userData.profile_image);
  };

  const handleImagePatch = async () => {
    console.log(profileImage);
    try {
      await verifyTokenExpirationTime();
      const response = await api.patch(
        endpoints.users + Cookies.get("myUserId") + "/", {profile_image: profileImage}
      );
      console.log(response)
      return
    } catch (error) {}
  };

  return (
    <>
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
          {!isUserDataLoading && (
            <Avatar
              alt={userData.first_name}
              src={`data:image/png;base64,${profileImage}`}
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
        <Button
          sx={{ width: "100%", fontSize: "14px" }}
          variant="outlined"
          onClick={handleClick}
        >
          Carregar Imagem
        </Button>
        <input
          ref={hiddenFileInput} // ADDED
          type="file"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />

        <Button
          sx={{ width: "100%" }}
          variant="outlined"
          onClick={handleImagePatch}
        >
          Enviar
        </Button>

        <Button
          sx={{ width: "100%" }}
          variant="outlined"
          onClick={handleImageCancel}
          // onClick={() => {
          //   navigate("/meu-perfil/editar");
          // }}
        >
          Cancelar
        </Button>
      </div>
    </>
  );
};

export default EditProfileImage;
