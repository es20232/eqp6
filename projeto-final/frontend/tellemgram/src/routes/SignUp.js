import React from "react";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockIcon from '@mui/icons-material/Lock';
import styles from "./CustomComponentsStyles.module.css";

const SignUp = () => {
    return(
        <div className="form-container">
            <div className="back-arrow">
                <Link to="/auth/entrar">
                    <IconButton aria-label="delete">
                        <ArrowBackIcon style={{color: "#634B7C" }} />
                    </IconButton>
                </Link>
            </div>
            <div className="form">
                <div className="icon-div">
                    <LockIcon sx={{ fontSize: 40, color:"success" }} />
                </div>
                <p>Cadastro</p>
                <div className="name-fields">
                    <TextField required id="outlined-basic" label="Nome" variant="outlined" className={styles.large_field}/>
                    <TextField required id="outlined-basic" label="Sobrenome" variant="outlined" className={styles.large_field}/>
                </div>
                <TextField required id="outlined-basic" label="Usuário" variant="outlined" className={styles.large_field}/>
                <TextField required id="outlined-basic" label="E-mail" variant="outlined" className={styles.large_field}/>
                <TextField required id="outlined-password-basic" label="Senha" variant="outlined" className={styles.large_field}/>
                <TextField required id="outlined-password-basic" label="Confirmar senha" variant="outlined" className={styles.large_field}/>

                <Button variant="contained" className={styles.large_button}>ENVIAR</Button>
            </div>
        
        </div>
    )
}

export default SignUp