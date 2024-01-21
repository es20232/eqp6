import React from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styles from "./CustomComponentsStyles.module.css";
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockIcon from '@mui/icons-material/Lock';

const Recover = () => {
    return(
        <div className="form-container">
            <div className="back-arrow">
                <Link to="/entrar">
                    <IconButton aria-label="delete">
                        <ArrowBackIcon style={{color: "#634B7C" }} />
                    </IconButton>
                </Link>
            </div>
            <div className="form">
                <div className="icon-div">
                    <LockIcon sx={{ fontSize: 40, color:"white" }} />
                </div>
                <h2>Recuperar senha</h2>
                <TextField required id="outlined-basic" label="E-mail" variant="outlined" className={styles.large_field}/>
                <Button variant="contained" className={styles.large_button}>RECUPERAR SENHA</Button>
            </div>
            
        </div>
    )
}

export default Recover