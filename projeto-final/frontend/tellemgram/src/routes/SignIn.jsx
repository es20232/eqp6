import React, { useState }  from "react"
import "./AuthPages.css"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom"
import styles from "./CustomComponentsStyles.module.css";
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';

import { motion } from "framer-motion";


const SignIn = () => {
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleEmailChange = (event) => {setEmail(event.target.value)}
    const handlePasswordChange = (event) => {setPassword(event.target.value)}

    const validatePassword = () => {
        if(password === ""){
            setPasswordError("Digite sua senha")
            return false
        } else{
            setPasswordError("")
            return true
        }
    }

    const validateEmail = () => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let flag = true
        if(email === ""){
            setEmailError("Digite seu email")
            return false
        }
        if(!regexEmail.test(email)){
            setEmailError("E-mail inválido")
            return false
        }
        if(flag){
            setEmailError("")
            return true
        }
    }


    const handleSubmit = () => {
        const isEmailValid = validatePassword()
        const isPasswordValid = validateEmail()
        if(!isEmailValid || !isPasswordValid){
            console.log("deu erro")
            return;
        }
        fetch('http://127.0.0.1:8000/users/login/?format=json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Resposta do servidor:', data);
            // Lógica adicional após a resposta do servidor
        })
        .catch(error => {
            console.error('Erro na solicitação:', error);
        });
    }

    return(
            <motion.div initial={{ opacity: 0}} animate={{ opacity: 1}} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="form-container">
            <div className="form">
                <div className="icon-div">
                    <LockIcon sx={{ fontSize: 40, color:"white" }} />
                </div>
                <h2>Entrar</h2>
                
                <TextField 
                    required 
                    label="E-mail" 
                    variant="outlined"
                    helperText={emailError || '\u00a0'}
                    error={emailError}
                    onChange={handleEmailChange} 
                    onBlur={validateEmail}
                    className={styles.large_field}
                />
                
                <TextField
                    required
                    label="Senha"
                    variant="outlined"
                    type="password"
                    helperText={passwordError || '\u00a0'}
                    error={passwordError}
                    onChange={handlePasswordChange}
                    onBlur={validatePassword}
                    className={styles.large_field}
                />
                
                <Button 
                    variant="contained"
                    onClick={handleSubmit}
                    className={styles.large_button}
                >
                    ENTRAR
                </Button>
                <div className="signin-links">
                    <p><Link to="/auth/recuperar">Esquecia a senha</Link></p>
                    <p><Link to="/auth/cadastrar">Não tenho cadastro</Link></p>
                </div>
               
            </div>
        
        </motion.div>      
    )
}

export default SignIn