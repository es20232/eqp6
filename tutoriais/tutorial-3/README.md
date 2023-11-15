# Passo a passo de como foi feito esse tutorial

## Frontend

1. Primeiro foi necessário navegar até o diretório de instalação do projeto do tutorial 3 através do comando:
    ~~~bash
    cd tutoriais\tutorial-3
    ~~~

2. Posteriormente, foi usado o comando para criar a aplicação React do frontend:
    ~~~bash
    npx create-react-app frontend
    ~~~

3. Para inicializar a aplicação foi utilizado o comando:
    ~~~bash
    cd frontend
    npm start
    ~~~
    
    A seguinte mensagem foi exibida no terminal:
    ~~~bash
    Compiled successfully!

    You can now view frontend in the browser.

    Local:            http://localhost:3000
    On Your Network:  http://192.168.18.50:3000

    Note that the development build is not optimized.
    To create a production build, use npm run build.

    webpack compiled successfully
    ~~~

    Para acessar a aplicação no navegador, foi usado o URL http://localhost:3000

4. Para verificar se tudo estava funcionando corretamente, a aplicação local foi aberta no navegador e  o arquivo `tutoriais\tutorial-3\frontend\src\App.js` foi modificado para que seja possível o efeito dessas modificações no navegador.

    Para isso, foi mudado o seguinte código na linha 10, de:

    ~~~html
    <p>
        Edit <code>src/App.js</code> and save to reload.
    </p>
    ~~~

    Para:

    ~~~html
    <p>
        Teste com react.
    </p>
    ~~~

    A mudança foi observada instaneamente no navegador, se a necessidade de recarregar a página.

5. Para iniciar a programação da aplicação React, algumas partes do template foram apagadas, já que não serão utilizadas no projeto. São elas:

    - Os imports do Arquivo `App.js`, eram eles: `import logo from './logo.svg';` e `import './App.css';`
    - O conteúdo da div `<div className="App">` do arquivo `App.js`
    - No arquivo `index.js`, foram apagados as linhas 5 e 14-17, referentes ao `reportWebVitals` que não foram utilizados por enquanto.
    - Os arquivos `App.css`, `App.test.js`, `logo.svg`, `reportWebVitals.js` e `setupTests.js`

6. Para criar o primeiro componente da aplicação, um campo de texto para o formulário, foi criada a pasta `components` e dentro dela a pasta `TextField` e dentro dela, dois arquivos importantes para o componente: `index.js` e `TextField.css`.

    No arquivo `indexjs` foi adicionado o código a seguir que cria uma div com um label e um input dentro
    ~~~js
    import './TextField.css'
    const TextField = () => {
        return(
            <div>
                <label>Nome</label>
                <input />
            </div>
        )
    }

    export default TextField;
    ~~~

    Para importar esse componente na aplicação, o seguinte código foi inserido no arquivo `App.js`
    ~~~js
    import TextField from "./components/TextField";

    function App() {
        return (
            <div className="App">
                <TextField />
            </div>
        );
    }

    export default App;
    ~~~

7. Para estilizar o campo de texto foi necessário mudar o `ClassName` do campo de texto, dessa forma é possível usar seletores na folha de estilo do componente (arquivo `TextField.css`) para fazer a formatação.

    No arquivo `index.js` o `ClassName` da `div` foi adicionado como `text-field`

    No arquivo `TextField.css` foi adicionado o seguinte código:

    ~~~css
    .text-field{
        margin: 24px 0;
    }

    .text-field label{
        display: block;
        margin-bottom: 8px;
        font-size: 24px
    }

    .text-field input{
        background-color: white;
        box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.06);
        width: 100%;
        border: none;
        font-size: 24px;
        padding: 24px;
        box-sizing: border-box;
    }
    ~~~

    E no `input` que está no `index.js` do `TextField` foi adicionado um placeholder, resultado em `<input placeholder="Digite aqui o seu nome" />`

8. Para que esses campos de textos sejam "genéricos", ou seja, possam ser reutilizados dentro da aplicação, é importante que eles recebam parametros como o nome do label e o placeholder, assim é possível utilizar o mesmo componente em vários campos do formulário.

    No `App.js` o componente vai receber esses parametros: `<TextField label="Nome" placeholder="Digite seu nome"/>`

    No `index.js` ao invés de receber texto, o componente vai receber algumas propriedades que vão trazer os parâmetros que foream passados no `App.js`:
    ~~~js
    const TextField = (props) => {
        return(
            <div className="text-field">
                <label>{props.label}</label>
                <input placeholder={props.placeholder} />
            </div>
        )
    }
    ~~~

    Dessa forma é possível reutilizar o componente várias vezes mudando somente os parâmetros:
    ~~~html
    <TextField label="Nome" placeholder="Digite seu nome..."/>
    <TextField label="E-mail" placeholder="Digite seu e-mail..."/>
    <TextField label="Login" placeholder="Digite seu login..."/>
    ~~~

9. Para organizar melhor o projeto, foi criado um novo componente chamado Form, que vai conter os campos de texto que antes estavam colocados diretamente dentro de `App.js`. O novo componente vai seguir a mesma lógica do anterior:
    Arquivo `App.js`:
    ~~~js
    import Form from "./components/Form";
    
    function App() {
        return (
            <div className="App">
                <Form title="Formulário de cadastro"/>
            </div>
        );
    }

    export default App;
    ~~~

    E dentro do `index.js` do componente Form:
    ~~~js
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
    ~~~

10. Para estilizar o componente Form, foi utlizado o arquivo `Form.css`:
    ~~~css
    .form-section {
        display: flex;
        justify-content: center;
        margin: 80px 0;
    }

    .form-section form{
        width: 70%;
        background-color: #F2F2F2;
        border-radius: 20px;
        padding: 36px 64px;
        box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.08);
    }
    ~~~

## Backend