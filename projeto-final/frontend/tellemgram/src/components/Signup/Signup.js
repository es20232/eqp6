import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockIcon from "@mui/icons-material/Lock";
import { motion } from "framer-motion";
import { api, endpoints } from "../../apiService";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import SignupComplete from "../SignupComplete/SignupComplete";
import './Signup.css'


const Signup = () => {
  const [processing, setProcessing] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isSignupComplete, setIsSignupComplete] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
    name: "",
    surname: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setProcessing(true);

    if (formData.password1 !== formData.password2) {
      console.warn("As senhas nao coincidem!");
      setServerError("As senhas não coincidem");
      setProcessing(false);
      return;
    }

    if (formData.password1.length < 8) {
      console.warn("As senhas devem ter ao menos 8 caracteres!");
      setServerError("A senha deve ter ao menos 8 caracteres");
      setProcessing(false);
      return;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(formData.email)) {
      console.warn("E-mail inválido");
      setServerError("E-mail inválido");
      setProcessing(false);
      return;
    }
    console.log("Enviando dados:", formData);
    try {
      const response = await api.post(endpoints.signupEndpoint, formData);
      console.log(response);
      setIsSignupComplete(true);
    } catch (error) {
      if (
        "response" in error &&
        "data" in error.response &&
        "username" in error.response.data
      ) {
        console.warn(error.response.data.username);
        setServerError(error.response.data.username);
        setProcessing(false);
        return;
      } else if (
        "response" in error &&
        "data" in error.response &&
        "email" in error.response.data
      ){
        console.warn(error.response.data.email);
        setServerError(error.response.data.email);
        setProcessing(false);
      } else{
        console.warn("Falha na comunicação com o servidor");
        setServerError("Falha na comunicação com o servidor");
        setProcessing(false);
      }
    }
    
    setProcessing(false);
  };

  const iconClickHandler = () => {
    setIsSignupComplete(false);
    navigate("/entrar");
  };

  return (
    <>
      {isSignupComplete ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="signupComplete-container"
        >
          <div className="back-icon-container" onClick={iconClickHandler}>
            <Link to="/entrar">
              <IconButton >
                <ArrowBackIcon style={{ color: "#634B7C" }} />
              </IconButton>
            </Link>
          </div>
          <SignupComplete />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="signup-container"
        >
          <div className="back-icon-container">
            <Link to="/entrar">
              <IconButton aria-label="delete">
                <ArrowBackIcon style={{ color: "#634B7C" }} />
              </IconButton>
            </Link>
          </div>

          <div className="signup-title">
            <div className="icon-container">
              <LockIcon sx={{ fontSize: 40, color: "white" }} />
            </div>
            <h1>Cadastrar</h1>
          </div>

          <div className="form-alert">
            {serverError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Alert severity="error">{serverError}</Alert>
              </motion.div>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="name-fields-container">
              <TextField
                required
                id="name"
                label="Nome"
                variant="outlined"
                name="name"
                onChange={handleChange}
                disabled={processing}
                sx={{width: '100%'}}
              />
              <TextField
                required
                id="surname"
                label="Sobrenome"
                variant="outlined"
                name="surname"
                disabled={processing}
                onChange={handleChange}
                sx={{width: '100%'}}
              />
            </div>
            <TextField
              required
              id="username"
              label="Usuário"
              variant="outlined"
              name="username"
              disabled={processing}
              onChange={handleChange}
              sx={{width: '100%'}}
            />
            <TextField
              required
              id="email"
              label="E-mail"
              variant="outlined"
              name="email"
              type="email"
              disabled={processing}
              onChange={handleChange}
              sx={{width: '100%'}}
            />
            <TextField
              required
              id="password1"
              label="Senha"
              variant="outlined"
              name="password1"
              type="password"
              disabled={processing}
              onChange={handleChange}
              sx={{width: '100%'}}
            />
            <TextField
              required
              id="password2"
              label="Confirmar senha"
              variant="outlined"
              name="password2"
              type="password"
              disabled={processing}
              onChange={handleChange}
              sx={{width: '100%'}}
            />

            <Button
              variant="contained"
              type="submit"
              sx={{width: '100%', height: '3rem'}}
              disabled={processing}
            >
              {processing && <CircularProgress color="inherit" size="2rem" />}
              {!processing && <>ENVIAR</>}
            </Button>
          </form>
        </motion.div>
      )}
    </>
  );
};

export default Signup;
