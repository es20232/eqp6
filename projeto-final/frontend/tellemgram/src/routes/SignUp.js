import React from "react";
import { Link } from "react-router-dom";
const SignUp = () => {
    return(
        <div className="signup-page-container">
        <div className="back-arrow">
            <Link to="/auth/entrar">Voltar</Link>
        </div>
        <div className="signup-form">
            <p>Formulário de cadastro</p>
        </div>
        
        </div>
    )
}

export default SignUp