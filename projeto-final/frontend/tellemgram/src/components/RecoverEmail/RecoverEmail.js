import React from "react";
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import './RecoverEmail.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
/*Tela de recuperacao de senha. Ao recuperar a senha com o emial o usuario sera redirecionado
para esta tela.*/
const RecoverEmail = () => {
	return (
	  <div className="form-confirmedConterner">
		<div className="back-arrow">
            <Link to="/entrar">
                <IconButton aria-label="delete">
                    <ArrowBackIcon style={{color: "#634B7C" }} />
                </IconButton>
            </Link>
        </div>
		<div className="form-title">
			<div className="icon-div">
                    <LockIcon sx={{ fontSize: 40, color:"white" }} />
            </div>
		  	<div className="page-icon-container">
			{/* Adicionei um div extra ao redor do ícone para manter a consistência */}
			<div style={{ textAlign: "center" }}>
			  <MarkEmailReadIcon sx={{ fontSize: 56, color: "white" }} />
			</div>
		  </div>
		</div>
  
		<h3>E-mail de recuperação enviado!</h3>
		
	  </div>
	);
  };
  

export default RecoverEmail