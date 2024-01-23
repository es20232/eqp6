import React, { useState } from 'react';
import TextField from "@mui/material/TextField";
import { api, endpoints } from "../../apiService";
import Button from "@mui/material/Button";
import FileUploadIcon from '@mui/icons-material/FileUpload';

import "./EditProfile.css"


const EditProfile = () => {
    const [processing, setProcessing] = useState(false);
    const [serverError, setServerError] = useState("");
    const [isSignupComplete, setIsSignupComplete] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password1: "",
        password2: "",
        password3: "",
        first_name: "",
        last_name: "",
      });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError("");
        setProcessing(true);
    
        if (formData.password2 !== formData.password3) {
          console.warn("As senhas nao coincidem!");
          setServerError("As senhas não coincidem");
          setProcessing(false);
          return;
        }
    
        if (formData.password1.length < 8) {
          console.warn("As senhas devem ter ao menos 8 caracteres!");
          setServerError("A senha deve ter ao menos 8 caracteres");
          setProcessing(false);
          return;
        }
    
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(formData.email)) {
          console.warn("E-mail inválido");
          setServerError("E-mail inválido");
          setProcessing(false);
          return;
        }
        console.log("Enviando dados:", formData);
        try {
          const response = await api.post(endpoints.signupEndpoint, formData);
          console.log(response);
          setIsSignupComplete(true);
        } catch (error) {
          if (
            "response" in error &&
            "data" in error.response &&
            "username" in error.response.data
          ) {
            console.warn(error.response.data.username);
            setServerError(error.response.data.username);
            setProcessing(false);
            return;
          } else if (
            "response" in error &&
            "data" in error.response &&
            "email" in error.response.data
          ){
            console.warn(error.response.data.email);
            setServerError(error.response.data.email);
            setProcessing(false);
          } else{
            console.warn("Falha na comunicação com o servidor");
            setServerError("Falha na comunicação com o servidor");
            setProcessing(false);
          }
        }
        
        setProcessing(false);
      };


    return (
        <div className="edit-profile">
            <h1>Editar Meu Perfil</h1>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button
                variant="contained"
                type="submit"
                sx={{ width: '16%', marginRight: '4px' }}
                disabled={processing}
              >
                {!processing && <>Editar Perfil</>}
              </Button>
              
            </div>
          <div  style={{ display: 'flex', marginTop: '20px' }}>
            <form className="edit-profile-dados" style={{ marginBottom: '10px', flex: '1' }}> 
                <TextField
                id="first_name"
                label="Nome"
                variant="outlined"
                name="first_name"
                onChange={handleChange}
                />

                <TextField
                id="last_name"
                label="Sobrenome"
                variant="outlined"
                name="last_name"
                onChange={handleChange}
                />

                <TextField
                id="username"
                label="Usuário"
                variant="outlined"
                name="username"
                onChange={handleChange}
                />

                <TextField
                    id="email"
                    label="E-mail"
                    variant="outlined"
                    name="email"
                    type="email"
                    onChange={handleChange}
                />
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ width: '24%' }}
                  disabled={processing}
                >
                  {!processing && <><FileUploadIcon sx={{ fontSize: 24 }} />Editar foto</>}
                </Button>

            </form>
            <form  className ="edit-profile-seguranca" style={{ flex: '1' }} >
                <label htmlFor="input2">Segurança</label>
                <TextField
                    required
                    id="password1"
                    label="Senha antiga"
                    variant="outlined"
                    name="password1"
                    type="password"
                    disabled={processing}
                    onChange={handleChange}
                />
                <TextField
                    required
                    id="password2"
                    label="Nova senha"
                    variant="outlined"
                    name="password2"
                    type="password"
                    disabled={processing}
                    onChange={handleChange}
                />
                <TextField
                    required
                    id="password3"
                    label="Confirmar senha"
                    variant="outlined"
                    name="password2"
                    type="password"
                    disabled={processing}
                    onChange={handleChange}
                />
                
               <Button
                variant="contained"
                type="submit"
                sx={{ width: '50%'}}
                disabled={processing}
              >
                {!processing && <>Alterar senha</>}
              </Button>
              
            </form>
            </div>
            <Button
                variant="contained"
                type="submit"
                sx={{ width: '16%'}}
                disabled={processing}
              >
                {!processing && <>Salvar alterações</>}
              </Button>
        </div>

    );
}


export default EditProfile;