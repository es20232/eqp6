import './Form.css'
import TextField from "../TextField";
import Button from '../Button';
import {useState} from 'react';

const Form = (props) => {

    const [user, setUser] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const sendForm = (event) => {
        event.preventDefault();
        console.log("Formulário enviado com sucesso")
        console.log({user, name, email, password})
        setUser('');
        setName('');
        setEmail('');
        setPassword('');
    }
    return (
        <section className="form-section">
            <form onSubmit={sendForm}>
                <h2>{props.title}</h2>
                <TextField 
                    label="Usuário" 
                    placeholder="Digite seu usuário..." 
                    type="text"
                    value={user} 
                    onChange={value => setUser(value)}
                />
                <TextField 
                    label="Nome Completo" 
                    placeholder="Digite seu nome completo..." 
                    type="text"
                    value={name} 
                    onChange={value => setName(value)}
                />
                <TextField
                    label="E-mail" 
                    placeholder="Digite seu e-mail..." 
                    type="email"
                    value={email} 
                    onChange={value => setEmail(value)}
                />
                <TextField
                    label="Senha"
                    placeholder="Digite sua senha..."
                    type="password"
                    value={password} 
                    onChange={value => setPassword(value)}
                />
                <Button>Cadastrar</Button>
            </form>
        </section>
    )
}

export default Form