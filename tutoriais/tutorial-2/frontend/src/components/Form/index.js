import './Form.css'
import TextField from "../TextField";
import Button from '../Button';
import {useState} from 'react';

const Form = (props) => {

    const [username, setUser] = useState('');
    const [full_name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setPassword] = useState('');

    const sendForm = (event) => {
        event.preventDefault();
        console.log("Formulário enviado com sucesso")
        console.log({username, full_name, email, senha})

        // now we can fetch the api 
        const response = fetch('http://localhost:8000/api/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, full_name, email, senha})
        })

        // now we print the response status code

        response.then((res) => {
            console.log(res.status)
            if(res.status === 201){
                alert("Usuário cadastrado com sucesso!")
            }
        });

        // setUser('');
        // setName('');
        // setEmail('');
        // setPassword('');
    }
    return (
        <section className="form-section">
            <form onSubmit={sendForm}>
                <h2>{props.title}</h2>
                <TextField 
                    label="Usuário" 
                    placeholder="Digite seu usuário..." 
                    type="text"
                    value={username} 
                    onChange={value => setUser(value)}
                />
                <TextField 
                    label="Nome Completo" 
                    placeholder="Digite seu nome completo..." 
                    type="text"
                    value={full_name} 
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
                    value={senha} 
                    onChange={value => setPassword(value)}
                />
                <Button>Cadastrar</Button>
            </form>
        </section>
    )
}

export default Form