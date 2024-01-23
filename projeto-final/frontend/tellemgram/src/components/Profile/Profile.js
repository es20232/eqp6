import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import { useAuth } from "../../AuthContext";
import { api, endpoints } from "../../apiService";
import "./Profile.css";

const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState();
  const { verifyTokenExpirationTime } = useAuth();

  useEffect(() => {
    const getUserImage = async () => {
      try {
        await verifyTokenExpirationTime();
        const response = await api.get(
          endpoints.uploadImageEndpoint + "?user_id=" + Cookies.get("myUserId")
        );
        setProfileImage(response.data[0].image);
      } catch (error) {
        console.log(error);
      }
    };
    getUserImage();
  },[]);

  return (
    <div className="profile-container">
      <div className="user-data-container">
        <div className="profile-image-container">
          {!profileImage && (
            <Avatar
              sx={{
                bgcolor: "#CEA6CE",
                height: "100%",
                width: "100%",
                fontSize: "6rem",
                fontWeight: "bold",
              }}
            >
              {Cookies.get("myFirstName")[0]}
            </Avatar>
          )}
          {profileImage && (
            <Avatar
              alt="Remy Sharp"
              src={`data:image/png;base64,${profileImage}`}
              className="user-image"
              sx={{
                height: "100%",
                width: "100%",
              }}
            />
          )}
        </div>
        <div className="user-strings-container">
          <p className="user-username">{Cookies.get("myUserName")}</p>
          <p className="user-name">
            {Cookies.get("myFirstName") + " " + Cookies.get("myLastName")}
          </p>
        </div>
        
      </div>
      <Button
      sx={{width:"300px"}}
          variant="contained"
          onClick={()=>{navigate("/perfil/editar")}}
        >Editar Perfil</Button>
    </div>
  );
};

export default Profile;
