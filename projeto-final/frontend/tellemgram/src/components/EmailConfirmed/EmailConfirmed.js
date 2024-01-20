import React from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
//import styles from "./CustomComponentsStyles.module.css";
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockIcon from '@mui/icons-material/Lock';
import CheckIcon from '@mui/icons-material/Check';
import './EmailConfirmed.css'

const EmailConfirmed = () => {
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
		
		<div style={{ textAlign: "center" }}>
		  {/* Adicionei um div extra ao redor do botão para centralizá-lo */}
		  <Button variant="contained">Entrar</Button>
		</div>
	  </div>
	);
  };
  

export default EmailConfirmed