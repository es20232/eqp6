import './form.css'
import TextField from "../TextField";
// import Button from '../Button';
import {useState, useEffect} from 'react';

const Form_Search = (props) => {

    const [search, setSearch] = useState('');

    useEffect(() => {
        if(search.length > 2){
        	console.log(`Realizando busca para '${search}'`)
            // 
        }
    }, [search])

    // fetches the api for a list of users
    const response = fetch('http://localhost:8000/api/users/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    
    // now we add all users into the page
    // the api returns json with username and email
    // so we display it in the page

    return (
        <section className="form-section">
            <form>
                <h2>{props.title}</h2>
                <TextField 
                    label="Pesquisar" 
                    placeholder="Digite o nome do usuário..." 
                    type="text"
                    value={search} 
                    onChange={value => setSearch(value)}
                />
            </form>
        </section>
    )
}

export default Form_Search