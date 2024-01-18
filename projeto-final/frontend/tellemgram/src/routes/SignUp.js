import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockIcon from '@mui/icons-material/Lock';
import styles from "./CustomComponentsStyles.module.css";
import { motion } from "framer-motion";

const SignUp = () => {

    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const handleNomeChange = (event) => setNome(event.target.value);
    const handleSobrenomeChange = (event) => setSobrenome(event.target.value);
    const handleUsuarioChange = (event) => setUsuario(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handleSenhaChange = (event) => setSenha(event.target.value);
    const handleConfirmarSenhaChange = (event) => setConfirmarSenha(event.target.value);

    const handleSubmit = () => {
        // Aqui você pode fazer a solicitação HTTP, por exemplo, usando fetch
        fetch('http://127.0.0.1:8000/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": usuario,
                "email": email,
                "password1": senha,
                "password2": confirmarSenha,
                "name": nome,
                "surname": sobrenome
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
    };


    return(
        <motion.div initial={{ opacity: 0}} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="form-container">
            <div className="back-arrow">
                <Link to="/auth/entrar">
                    <IconButton aria-label="delete">
                        <ArrowBackIcon style={{color: "#634B7C" }} />
                    </IconButton>
                </Link>
            </div>
            <div className="form">
                <div className="icon-div">
                    <LockIcon sx={{ fontSize: 40, color:"white" }} />
                </div>
                <h2>Cadastro</h2>
                <div className="name-fields">
                    <TextField required id="outlined-basic" label="Nome" variant="outlined" className={styles.large_field} onChange={handleNomeChange}/>
                    <TextField required id="outlined-basic" label="Sobrenome" variant="outlined" onChange={handleSobrenomeChange} className={styles.large_field}/>
                </div>
                <TextField required id="outlined-basic" label="Usuário" variant="outlined" onChange={handleUsuarioChange} className={styles.large_field}/>
                <TextField required id="outlined-basic" label="E-mail" variant="outlined" onChange={handleEmailChange} className={styles.large_field}/>
                <TextField required id="outlined-password-basic" label="Senha" variant="outlined" onChange={handleSenhaChange} className={styles.large_field}/>
                <TextField required id="outlined-password-basic" label="Confirmar senha" variant="outlined" onChange={handleConfirmarSenhaChange} className={styles.large_field}/>

                <Button variant="contained" className={styles.large_button} onClick={handleSubmit}>ENVIAR</Button>
            </div>
        
        </motion.div>
    )
}

export default SignUp