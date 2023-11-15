import './Form.css'
import TextField from "../TextField";

const Form = (props) => {
    return (
        <section className="form-section">
            <form>
                <h2>{props.title}</h2>
                <TextField label="Usuário" placeholder="Digite seu usuário..." type="text" />
                <TextField label="Nome Completo" placeholder="Digite seu nome completo..." type="text" />
                <TextField label="E-mail" placeholder="Digite seu e-mail..." type="email" />
                <TextField label="Senha" placeholder="Digite sua senha..." type="password"/>
                <button className="cad-button">Cadastrar</button>
            </form>
        </section>
    )
}

export default Form