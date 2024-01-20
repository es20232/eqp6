import React, { useState } from "react";

import Button from '@mui/material/Button';

import { useAuth } from '../AuthContext';
import axios from 'axios';

const HomePage = () => {
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
            // Aqui você pode enviar a imagem para a API
            const response = await axios.post(
                'http://127.0.0.1:8000/upload_image/upload/',
                { image: selectedImage },
                {
                headers: {
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

    const requestToAPI = async () => {
        try {
            const response = await axios.get(
                'http://127.0.0.1:8000/api/users/',  // Substitua pela URL da sua API
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                        // Adicione outros cabeçalhos conforme necessário
                    }
                }
            );

            console.log('Resposta da requisição:', response.data);
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    }

    return(
        <div>
            <h1>Home</h1>
            {"Acess token:" + accessToken}
            <Button variant="outlined" onClick={logoutHandler}>LOGOUT</Button>
            <Button variant="outlined" onClick={requestToAPI}>GET Users</Button>
            <input type="file" onChange={handleImageChange}></input>
            <Button variant="outlined" onClick={handleUpload}>POST image</Button>
            
        </div>
    )
}

export default HomePage