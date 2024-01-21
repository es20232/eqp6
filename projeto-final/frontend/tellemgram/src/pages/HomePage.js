import React, { useState } from "react";

import Button from '@mui/material/Button';

import { useAuth } from '../AuthContext';
import axios from 'axios';
import { fetchUsers } from "../api";

import { useNavigate } from "react-router-dom";
import { display } from "@mui/system";

const HomePage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

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
            // Aqui você pode enviar a imagem para a API
            const response = await axios.post(
                'http://127.0.0.1:8000/upload-image/upload/',
                { image: selectedImage },
                {
                    headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    },
                }
            );
    
            console.log('Resposta da API:', response.data);
          } catch (error) {
            console.error('Erro na requisição:', error);
          }
        } else {
          console.warn('Nenhuma imagem selecionada.');
        }
      };



    const { logOut, accessToken } = useAuth();

    const logoutHandler = () =>{
        logOut();
    }

    const handleUploadButton = () =>{
      navigate('/carregar');
    }
    const handleTokenButton = () =>{
      navigate('/token');
    }

    const requestToAPI = async () => {
        try {
            const result = await fetchUsers(accessToken); // Substitua pela sua URL
            console.log(result);
          } catch (error) {
            // Lidar com o erro, se necessário
            console.error('Erro ao obter dados:', error);
          }
    }
    const estiloDaDiv = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "32px",
      // Outros estilos podem ser adicionados aqui
    };
  

    return(
        <div>
            <h1>Home</h1>
            <div style={estiloDaDiv}>
              <Button variant="outlined" onClick={handleUploadButton}>/carregar</Button>
              <Button variant="outlined" onClick={handleTokenButton}>/token</Button>
              <Button variant="outlined" onClick={logoutHandler}>LOGOUT</Button>
            </div>        
        </div>
    )
}

export default HomePage