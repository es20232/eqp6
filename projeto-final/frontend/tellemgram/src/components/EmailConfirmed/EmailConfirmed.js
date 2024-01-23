import React from "react";
import Button from "@mui/material/Button";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import "./EmailConfirmed.css";

import { useNavigate, useLocation } from "react-router-dom";
/*Tela de confirmacao de cadastro do usuário após ele confirmar pelo e-mail seu cadastro.
Esta tela deve estar ligada pelo com o email, sendo configurada no back-end.*/
const EmailConfirmed = () => {
  const navigate = useNavigate();
  return (
    <div className="email-confirmed-container">
      <div className="email-confirmed-title">
        <div className="email-confirmed-icon-container">
          <TaskAltIcon sx={{ fontSize: 56, color: "white" }} />
        </div>
        <h1>E-mail confirmado com sucesso!</h1>
      </div>

      <div>
        <Button variant="contained" onClick={()=>{navigate("/entrar")}}>Entrar</Button>
      </div>
    </div>
  );
};

export default EmailConfirmed;
