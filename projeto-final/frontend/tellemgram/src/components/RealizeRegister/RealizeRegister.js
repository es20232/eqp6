import React from "react";
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import './RealizeRegister.css'
/*Tela de confirmacao de cadastro do usuário após ele confirmar pelo e-mail seu cadastro.
Esta tela deve estar ligada pelo com o email, sendo configurada no back-end.*/
const RealizeRegister = () => {
	return (
	  <div className="form-confirmedConterner">
		<div className="form-title">
		  <div className="page-icon-container">
			{/* Adicionei um div extra ao redor do ícone para manter a consistência */}
			<div style={{ textAlign: "center" }}>
			  <CheckIcon sx={{ fontSize: 60, color: "white" }} />
			</div>
		  </div>
		</div>
  
		<h3>Cadastro realizado com sucesso!</h3>
		<h5>Por favor, verifique seu e-mail para confirmar.</h5>

	  </div>
	);
  };
  

export default RealizeRegister