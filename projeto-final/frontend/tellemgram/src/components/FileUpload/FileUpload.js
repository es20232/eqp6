import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useAuth } from "../../AuthContext";
import "./FileUpload.css";
import { api, endpoints } from "../../apiService";

const FileUpload = () => {
  const { verifyTokenExpirationTime } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (selectedImage) {
      try {
        const base64String = selectedImage.split(",")[1];
        await verifyTokenExpirationTime(); // Verifica se o AccessToken ainda estão válidos e o atualiza caso ano esteja
        const response = await api.post(endpoints.uploadImageEndpoint, {
          user: 13,
          image: base64String,
          description: "teste",
          is_published: false,
        });
        console.log(response);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    } else {
      console.warn("Nenhuma imagem selecionada.");
    }
  };

  return (
    <div className="file-upload-container">
      <input type="file" onChange={handleImageChange}></input>
      <Button variant="outlined" onClick={handleUpload}>
        POST image
      </Button>
    </div>
  );
};

export default FileUpload;
