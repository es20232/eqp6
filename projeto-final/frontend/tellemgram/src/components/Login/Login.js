import React, { useState }  from "react"

import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion";

import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';
import styles from "./CustomComponentsStyles.module.css";

// Protected Routes
import { useAuth } from '../../AuthContext';

// Cookie Settings
import Cookies from 'js-cookie';

const Login = () => {
    const { logIn, loggedIn } = useAuth();
    const navigate = useNavigate();

    const[formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [processing, setProcessing] = useState(false)
    const [serverError, setServerError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        setServerError('')
        console.log('Login submetido:', formData);

        setProcessing(true)

        fetch('http://127.0.0.1:8000/login/?format=json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": formData.username,
                "password": formData.password,
            }),
        })
        .then(response => {
            setProcessing(false)
            setFormData({ username: '', password: '' });
            if (!response.ok) {
              throw new Error(response.status);
              
            }
            return response.json();
          })
        .then(data => {
            console.log('Resposta do servidor:', data);
            Cookies.set('accessToken', data.access, { expires: 7 });
            Cookies.set('refreshToken', data.refresh, { expires: 7 });
            logIn();
            navigate("/");
        })
        .catch(error => {
            setProcessing(false)
            if(error.message === '400'){
                setServerError('Credenciais inválidas. Por favor, tente novamente.')
            } else{
                setServerError('Sem conexão com o servidor. Por favor, tente novamente.')
            }
            console.error('Erro na solicitação:', error);
  
            
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };



    return(
            <motion.div initial={{ opacity: 0}} animate={{ opacity: 1}} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="form-container">
                <div className="form-title">
                    <div className="page-icon-container">
                        <LockIcon sx={{ fontSize: 40, color:"white" }} />
                    </div>
                    <h2>Entrar</h2>
                </div>

                <div className="form-alert">
                    {serverError && <motion.div initial={{ opacity: 0}} animate={{ opacity: 1}} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                        <Alert severity="error">{serverError}</Alert>
                    </motion.div>}
                </div>

                <form onSubmit={handleSubmit}>
                    <TextField 
                        required 
                        label="Usuário"
                        id="username"
                        name="username" 
                        variant="outlined"
                        value={formData.username}
                        onChange={handleChange} 
                        className={styles.large_field}
                    />
                    
                    <TextField
                        required
                        label="Senha"
                        variant="outlined"
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={styles.large_field}
                    />
                    
                    <Button 
                        variant="contained"
                        type="submit"
                        disabled={processing}
                        className={styles.large_button}
                    >
                        {processing && <CircularProgress color="inherit" size="2rem"  />}
                        {!processing && <>ENTRAR</>}
                    </Button>
                </form>
                <div className="login-links-container">
                    <p><Link to="/recuperar">Esquecia a senha</Link></p>
                    <p><Link to="/cadastrar">Não tenho cadastro</Link></p>
                </div>
        
        </motion.div>
    )
}

export default Login;