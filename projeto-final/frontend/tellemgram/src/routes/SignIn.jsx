import React from "react"
import "./AuthPages.css"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom"
import styles from "./CustomComponentsStyles.module.css";
import Button from '@mui/material/Button';


const SignIn = () => {
    return(
        <div className="form-container">
            <div className="form">
                <p>Formulário de login</p>
                
                <TextField required id="outlined-basic" label="E-mail" variant="outlined" className={styles.large_field}/>
                <TextField required id="outlined-basic" label="Senha" variant="outlined" type="password" className={styles.large_field}/>
                <Button variant="contained" className={styles.large_button}>ENTRAR</Button>
                <div className="signin-links">
                    <p><Link to="/auth/recuperar">Esquecia a senha</Link></p>
                    <p><Link to="/auth/cadastrar">Não tenho cadastro</Link></p>
                </div>
               
            </div>
        
        </div>
    )
}

export default SignIn