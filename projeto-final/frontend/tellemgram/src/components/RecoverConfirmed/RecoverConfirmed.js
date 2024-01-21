import React from "react";
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import './RecoverConfirmed.css'
/*Tela de confirmacao de cadastro do usuário após ele confirmar pelo e-mail seu cadastro.
Esta tela deve estar ligada pelo com o email, sendo configurada no back-end.*/
const RecoverConfirmed = () => {
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
  
		<h3>Senha recuperada com sucesso!</h3>
		
		<div style={{ textAlign: "center" }}>
		  {/* Adicionei um div extra ao redor do botão para centralizá-lo */}
		  <Button variant="contained">Entrar</Button>
		</div>
	  </div>
	);
  };
  

export default RecoverConfirmed