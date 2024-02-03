import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";
import { useAuth } from "../../AuthContext";
import { api, endpoints } from "../../apiService";
import styles from "./EditProfile.module.css";
import { useTheme } from "@mui/system";
import { useQuery } from "react-query";
import EditProfileImage from "./EditProfileImage";

const EditProfile = () => {
  const { verifyTokenExpirationTime } = useAuth();
  const theme = useTheme();
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState(null);
  //const [myUserData, setMyUserData] = useState();

  const {
    data: myUserData,
    isLoading: isUserDataLoading,
    error: queryError,
  } = useQuery(
    ["getUserData", location],
    async () => {
      try {
        await verifyTokenExpirationTime();

        const response = await api.get(
          endpoints.users + Cookies.get("myUserName") + "/"
        );
        return response.data;
      } catch (error) {
        console.error("Erro durante a busca de dados:", error);
        throw error; // Lançar o erro novamente para que o useQuery o detecte
      }
    },
    { refetchOnWindowFocus: false }
  );

  return (
    <div className={styles.pageContent}>
      <div className={styles.profileContainer}>
        <EditProfileImage
          isLoading={isUserDataLoading}
          myUserData={myUserData}
        />
        <hr className={styles.horizontalLine} />
        <div className={styles.personalInfoContainer}>
          <span>Informaçoes Pessoais</span>
        </div>
        <hr className={styles.horizontalLine} />
        <div className={styles.secrityInfoContainer}>
          <span>Segurança</span>
        </div>
      </div>
    </div>
  );
  // const { verifyTokenExpirationTime } = useAuth();
  // const [processing, setProcessing] = useState(false);
  // const [processing2, setProcessing2] = useState(false);
  // const [profileImage, setProfileImage] = useState();
  // const [selectedImage, setSelectedImage] = useState(null);

  // const [formData, setFormData] = useState({
  //   username: "",
  //   email: "",
  //   // password1: "",
  //   // password2: "",
  //   // password3: "",
  //   first_name: "",
  //   last_name: "",
  // });

  // const [passwordData, setPasswordData] = useState({
  //   old_password: "",
  //   new_password1: "",
  //   new_password2: "",
  // });

  // useEffect(() => {
  //   const newFormData = {
  //     username: Cookies.get("myUserName"),
  //     email: Cookies.get("myEmail"),
  //     first_name: Cookies.get("myFirstName"),
  //     last_name: Cookies.get("myLastName"),
  //   };
  //   setFormData(newFormData);

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
  // }, []);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const handlePasswordChange = (e) => {
  //   const { name, value } = e.target;
  //   setPasswordData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     setProcessing(true);
  //     await verifyTokenExpirationTime();
  //     const response = await api.put(
  //       endpoints.getUsersEndpoint + Cookies.get("myUserId") + "/",
  //       formData
  //     );
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setProcessing(false);
  // };

  // const handleSubmit2 = async (e) => {
  //   e.preventDefault();
  //   try {
  //     setProcessing2(true);
  //     await verifyTokenExpirationTime();
  //     const response = await api.post(
  //       endpoints.changePasswordEndpoint,
  //       passwordData
  //     );
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setProcessing2(false);
  // };

  // const changeImageHandler = async () => {
  //   if (profileImage) {
  //     try {
  //       // const base64String = selectedImage.split(",")[1];
  //       await verifyTokenExpirationTime(); // Verifica se o AccessToken ainda estão válidos e o atualiza caso ano esteja
  //       const response = await api.post(endpoints.uploadImageEndpoint, {
  //         imagem: null// image: profileImage,
  //       });
  //       console.log(response);
  //     } catch (error) {
  //       console.error("Erro na requisição:", error);
  //     }
  //   } else {
  //     console.warn("Nenhuma imagem selecionada.");
  //   }
  // };

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];

  //   if (file) {
  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //       setProfileImage(reader.result.split(",")[1]);
  //     };

  //     reader.readAsDataURL(file);
  //   }
  // };

  // const VisuallyHiddenInput = styled("input")({
  //   clip: "rect(0 0 0 0)",
  //   clipPath: "inset(50%)",
  //   height: 1,
  //   overflow: "hidden",
  //   position: "absolute",
  //   bottom: 0,
  //   left: 0,
  //   whiteSpace: "nowrap",
  //   width: 1,
  // });

  // return (
  //   <div className="edit-profile-container">
  //     <div className="back-icon-container">
  //       <Link to={"/perfil/" + Cookies.get("myUserId")}>
  //         <IconButton>
  //           <ArrowBackIcon style={{ color: "#634B7C" }} />
  //         </IconButton>
  //       </Link>
  //     </div>
  //     <h2>Editar Meu Perfil</h2>

  //     <div className="user-data-container">
  //       <div className="profile-image-container">
  //         {!profileImage && (
  //           <Avatar
  //             sx={{
  //               bgcolor: "#CEA6CE",
  //               height: "100%",
  //               width: "100%",
  //               fontSize: "6rem",
  //               fontWeight: "bold",
  //             }}
  //           >
  //             {Cookies.get("myFirstName")[0]}
  //           </Avatar>
  //         )}
  //         {profileImage && (
  //           <Avatar
  //             alt="Remy Sharp"
  //             src={`data:image/png;base64,${profileImage}`}
  //             className="user-image"
  //             sx={{
  //               height: "100%",
  //               width: "100%",
  //             }}
  //           />
  //         )}
  //       </div>
  //       <div className="user-strings-container">
  //         <p className="user-username">{Cookies.get("myUserName")}</p>
  //         <p className="user-name">
  //           {Cookies.get("myFirstName") + " " + Cookies.get("myLastName")}
  //         </p>
  //       </div>
  //     </div>

  //     <div className="image-buttons-container">
  //       <Button component="label" variant="outlined">
  //         Carregar Imagem
  //         <VisuallyHiddenInput type="file" onChange={handleImageChange} />
  //       </Button>
  //       <Button variant="outlined" onClick={changeImageHandler}>
  //         Enviar
  //       </Button>
  //     </div>

  //     <div className="forms-container">
  //       <div className="user-data-form-container">
  //         <h3>Dados pessoais</h3>
  //         <form onSubmit={handleSubmit}>
  //           <TextField
  //             id="first_name"
  //             label="Nome"
  //             variant="outlined"
  //             name="first_name"
  //             disabled={processing}
  //             sx={{ width: "300px" }}
  //             value={formData.first_name}
  //             inputProps={{
  //               autoComplete: "new-password",
  //               form: {
  //                 autoComplete: "off",
  //               },
  //             }}
  //             onChange={handleChange}
  //           />

  //           <TextField
  //             id="last_name"
  //             label="Sobrenome"
  //             variant="outlined"
  //             name="last_name"
  //             disabled={processing}
  //             sx={{ width: "300px" }}
  //             value={formData.last_name}
  //             inputProps={{
  //               autoComplete: "new-password",
  //               form: {
  //                 autoComplete: "off",
  //               },
  //             }}
  //             onChange={handleChange}
  //           />

  //           <TextField
  //             id="username"
  //             label="Usuário"
  //             variant="outlined"
  //             name="username"
  //             disabled={processing}
  //             sx={{ width: "300px" }}
  //             value={formData.username}
  //             inputProps={{
  //               autoComplete: "new-password",
  //               form: {
  //                 autoComplete: "off",
  //               },
  //             }}
  //             onChange={handleChange}
  //           />

  //           <TextField
  //             id="email"
  //             label="E-mail"
  //             variant="outlined"
  //             name="email"
  //             type="email"
  //             disabled={processing}
  //             sx={{ width: "300px" }}
  //             value={formData.email}
  //             inputProps={{
  //               autoComplete: "new-password",
  //               form: {
  //                 autoComplete: "off",
  //               },
  //             }}
  //             onChange={handleChange}
  //           />
  //           <Button
  //             variant="contained"
  //             type="submit"
  //             disabled={processing}
  //             sx={{ width: "300px", height: "3rem" }}
  //             // sx={{ width: "24%" }}
  //             // disabled={processing}
  //           >
  //             {processing && <CircularProgress color="inherit" size="2rem" />}
  //             {!processing && <>SALVAR ALTERAÇÕES</>}
  //           </Button>
  //         </form>
  //       </div>
  //       <div className="forms-vertical-divider"></div>
  //       <div className="password-form-container">
  //         <h3>Segurança</h3>
  //         <form onSubmit={handleSubmit2}>
  //           <TextField
  //             id="old_password"
  //             label="Senha Antiga"
  //             variant="outlined"
  //             name="old_password"
  //             required
  //             disabled={processing2}
  //             sx={{ width: "300px" }}
  //             value={passwordData.old_password}
  //             inputProps={{
  //               autoComplete: "new-password",
  //               form: {
  //                 autoComplete: "off",
  //               },
  //             }}
  //             onChange={handlePasswordChange}
  //           />

  //           <TextField
  //             id="new_password1"
  //             label="Nova senha"
  //             variant="outlined"
  //             name="new_password1"
  //             disabled={processing2}
  //             required
  //             sx={{ width: "300px" }}
  //             value={passwordData.new_password1}
  //             inputProps={{
  //               autoComplete: "new-password",
  //               form: {
  //                 autoComplete: "off",
  //               },
  //             }}
  //             onChange={handlePasswordChange}
  //           />

  //           <TextField
  //             id="new_password2"
  //             label="Confirmar nova senha"
  //             variant="outlined"
  //             name="new_password2"
  //             disabled={processing2}
  //             required
  //             // type="password"
  //             sx={{ width: "300px" }}
  //             value={passwordData.new_password2}
  //             inputProps={{
  //               autoComplete: "new-password",
  //               form: {
  //                 autoComplete: "off",
  //               },
  //             }}
  //             onChange={handlePasswordChange}
  //           />

  //           <Button
  //             variant="contained"
  //             type="submit"
  //             disabled={processing}
  //             sx={{ width: "300px", height: "3rem" }}
  //           >
  //             {processing2 && <CircularProgress color="inherit" size="2rem" />}
  //             {!processing2 && <>ALTERAR SENHA</>}
  //           </Button>
  //         </form>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default EditProfile;
