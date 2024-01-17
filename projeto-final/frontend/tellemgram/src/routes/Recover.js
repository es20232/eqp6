import React from "react";
import "./AuthPages.css"
import { Link } from "react-router-dom";

const Recover = () => {
    return(
        <div className="recover-page-container">
            <div className="back-arrow">
                <Link to="/auth/entrar">Voltar</Link>
            </div>
            <div className="recover-form">
                <p>Formulário para recuperar senha</p>
            </div>
            
        </div>
    )
}

export default Recover