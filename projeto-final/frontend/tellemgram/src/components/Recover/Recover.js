import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styles from "./CustomComponentsStyles.module.css";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockIcon from "@mui/icons-material/Lock";
import { motion } from "framer-motion";
import { Alert } from "@mui/material";
import "./Recover.css";

const Recover = () => {
  const [processing, setProcessing] = useState(false);
  const [serverError, setServerError] = useState("");
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="recover-container"
    >
      <div className="back-icon-container">
        <Link to="/entrar">
          <IconButton>
            <ArrowBackIcon style={{ color: "#634B7C" }} />
          </IconButton>
        </Link>
      </div>

      <div className="recover-title">
        <div className="icon-conteiner">
          <LockIcon sx={{ fontSize: 40, color: "white" }} />
        </div>
        <h1>Recuperar Senha</h1>
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

      <form>
        <TextField
          required
          id="outlined-basic"
          label="E-mail"
          variant="outlined"
          sx={{ width: "100%" }}
        />
        <Button
          variant="contained"
          sx={{ width: "100%", height: "3rem" }}
          type="submit"
        >
          RECUPERAR SENHA
        </Button>
      </form>
    </motion.div>
  );
};

export default Recover;
