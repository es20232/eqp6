import React from "react"
import "./AuthPages.css"
import { Link } from "react-router-dom"

const SignIn = () => {
    return(
        <div className="recover-page-container">
            <div className="signin-form">
            <p>Formulário de login</p>
                <p><Link to="/auth/recuperar">Esquecia a senha</Link></p>
                <p><Link to="/auth/cadastrar">Não tenho cadastro</Link></p>
            </div>
        
        </div>
    )
}

export default SignIn