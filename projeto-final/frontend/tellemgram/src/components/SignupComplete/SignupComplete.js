import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import "./SignupComplete.css";
/*Tela de confirmacao de cadastro do usuário após ele confirmar pelo e-mail seu cadastro.
Esta tela deve estar ligada pelo com o email, sendo configurada no back-end.*/
const SignupComplete = () => {
  return (
    <>
        <div style={{ textAlign: "center" }} className="icon-container">
          <CheckIcon sx={{ fontSize: 60, color: "white" }} />
        </div>
      <h1>Cadastro realizado com sucesso!</h1>
      <p>Por favor, verifique seu e-mail para confirmar o cadastro.</p>
    </>
  );
};

export default SignupComplete;
