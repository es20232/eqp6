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
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

const EditProfileImage = ({ myUserData, isLoading }) => {
  const hiddenFileInput = useRef(null);
  const { verifyTokenExpirationTime } = useAuth();
  const theme = useTheme();
  const [profileImage, setProfileImage] = useState();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setProfileImage(myUserData?.profile_image);
  }, [myUserData]);

  const {
    data: queryResponse,
    refetch,
    isLoading: isSending,
  } = useQuery(
    "patchProfileImage",
    async () => {
      try {
        await verifyTokenExpirationTime();
        const response = await api.patch(
          endpoints.users + Cookies.get("myUserName") + "/",
          { profile_image: profileImage }
        );
        console.log(response);
        return response;
      } catch (error) {}
    },
    { enabled: false }
  );

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file)

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setProfileImage(reader.result.split(",")[1]);
        setIsReady(true);
      };

      reader.readAsDataURL(file);
      event.target.value = null;
    }
  };

  const handleInputClick = (event) => {
    hiddenFileInput.current.click(); // ADDED
  };

  const handleImageCancel = () => {
    setProfileImage(myUserData.profile_image);
    setIsReady(false);
  };

  return (
    <>
      <div className={styles.userDataContainer}>
        <div className={styles.userImageContainer}>
          {isLoading && (
            <Skeleton
              variant="circular"
              animation="wave"
              width={"100%"}
              height={"100%"}
            />
          )}
          {!isLoading && (
            <Avatar
              alt={myUserData.first_name}
              src={"data:image/png;base64," + profileImage}
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
          {myUserData ? (
            <>
              <span className={styles.userOtherInfosContainer}>
                {myUserData.username}
              </span>
              <span className={styles.userFullNameContainer}>
                {myUserData.first_name + " " + myUserData.last_name}
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
      {queryResponse?.status == 200 ? <Alert
        severity="success"
        sx={{fontSize: "14px"}}
      >
        Foto de perfil alterada. Por favor, recarregue a página!
      </Alert> : 
      <div className={styles.buttonsContianer}>
        {isSending ? (<CircularProgress color="inherit" size="1.5em" />) :
        (<><Button
          sx={{ width: "100%"}}
          variant="outlined"
          onClick={handleInputClick}
        >
          Carregar
        </Button>
        <input
          ref={hiddenFileInput} // ADDED
          type="file"
          accept="image/jpeg, image/png"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />

        <Button
          disabled={!isReady}
          sx={{ width: "100%" }}
          variant="outlined"
          onClick={refetch}
        >
            Enviar
        </Button>

        <Button
          disabled={!isReady}
          sx={{ width: "100%" }}
          variant="outlined"
          onClick={handleImageCancel}
        >
          Cancelar
        </Button></>)}
      </div>
}
    </>
  );
};

export default EditProfileImage;
