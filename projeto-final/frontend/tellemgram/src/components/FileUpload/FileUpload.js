import React, { useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import "./FileUpload.css";
import { uploadImage } from "../../api.js";
import { api2, endpoints } from "../../api2";

const FileUpload = () => {
  const { accessToken } = useAuth();
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
        
        //const response = await api2.post(endpoints.uploadImageEndpoint, {"username": username, "password": password});
        uploadImage(base64String);
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
