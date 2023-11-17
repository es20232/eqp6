import './Form.css'
import TextField from "../TextField";

const Form = (props) => {
    return (
        <section className="form-section">
            <form>
                <h2>{props.title}</h2>
                <TextField label="Nome" placeholder="Digite seu nome..." />
                <TextField label="E-mail" placeholder="Digite seu e-mail..." />
                <TextField label="Login" placeholder="Digite seu login..." />
            </form>
        </section>
    )
}

export default Form