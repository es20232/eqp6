import React from "react";
import Button from '@mui/material/Button';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import './EmailConfirmed.css'
/*Tela de confirmacao de cadastro do usuário após ele confirmar pelo e-mail seu cadastro.
Esta tela deve estar ligada pelo com o email, sendo configurada no back-end.*/
const EmailConfirmed = () => {
	return (
	  <div className="form-confirmedConterner">
		<div className="form-title">
		  <div className="page-icon-container">
			{/* Adicionei um div extra ao redor do ícone para manter a consistência */}
			<div style={{ textAlign: "center" }}>
			  <TaskAltIcon sx={{ fontSize: 56, color: "white" }} />
			</div>
		  </div>
		</div>
  
		<h3>Cadastro confirmado com sucesso!</h3>
		
		<div style={{ textAlign: "center" }}>
		  {/* Adicionei um div extra ao redor do botão para centralizá-lo */}
		  <Button variant="contained">Entrar</Button>
		</div>
	  </div>
	);
  };
  

export default EmailConfirmed