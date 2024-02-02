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

const Profile = () => {
  const theme = useTheme();
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: userData, isLoading: isUserDataLoading } = useQuery(
    "getUserData",
    () => {
      console.log(location.pathname.split("/")[1])

      if (location.pathname.split("/")[1] !== "meu-perfil" && isNaN(userId)) {
        navigate("/error");
      }
      return api.get(endpoints.getUsersEndpoint + userId).then((response) => {
        console.log("User data:", response);
        if (response.data.length == 0) {
          return null;
        }
        return response.data;
      });
    }
  );

  const { data: profileImage, isLoading: isProfileImageLoading } = useQuery(
    "getUserProfileImage",
    () => {
      if (location.pathname.split("/")[1] !== "meu-perfil" && isNaN(userId)) {
        navigate("/error");
      }
      return api
        .get(endpoints.uploadImageEndpoint + "?user_id=" + userId)
        .then((response) => {
          console.log("Profile image:", response);
          if (response.data.length == 0) {
            return null;
          }
          return response.data[0].image;
        });
    }
  );

  // const [profileImage, setProfileImage] = useState();
  const { verifyTokenExpirationTime } = useAuth();

  // useEffect(() => {
  //   const getUserImage = async () => {
  //     try {
  //       await verifyTokenExpirationTime();
  //       const response = await api.get(
  //         endpoints.uploadImageEndpoint + "?user_id=" + Cookies.get("myUserId")
  //       );
  //       setProfileImage(response.data[0].image);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getUserImage();
  // },[]);

  return (
    <div className="profile-container">
      <div className="user-data-container">
        <div className={`${styles.userImageContainer}`}>
          {isProfileImageLoading && (
            <Skeleton
              variant="circular"
              animation="wave"
              width={"100%"}
              height={"100%"}
            />
          )}
          {!isProfileImageLoading && (
            <Avatar
              alt={isUserDataLoading ? "" : userData.first_name.toUpperCase()}
              src={`data:image/png;base64,${profileImage}`}
              className="user-image"
              sx={{
                height: "100%",
                width: "100%",
                fontSize: "6em",
                fontWeight: "bold",
                backgroundColor: theme.palette.secondary.main,
              }}
            />
          )}
        </div>
        <div className="user-strings-container">
          {userData ? (
            <>
              <p className="user-username">{userData.username}</p>
              <p className="user-name">
                {" "}
                {userData.first_name + " " + userData.last_name}
              </p>
            </>
          ) : (
            <>
              <Skeleton variant="text" width={100} height={23} />
              <Skeleton variant="text" width={200} height={45} />
            </>
          )}
        </div>
      </div>
      {(userId == Cookies.get("myUserId")) && <Button
        sx={{ width: "300px" }}
        variant="contained"
        onClick={() => {
          navigate("/perfil/editar");
        }}
      >
        Editar Perfil
      </Button>
    }
    </div>
  );
};

export default Profile;
