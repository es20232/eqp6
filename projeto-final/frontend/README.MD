# Telas
Foram definidas dois tipos de telas. A idea é que cada tipo tenha um padrão estético que será criado como um "componente base", e todas as outras telas serão feitas a partir desses componetes. A baixo a descrição de cada tipo de tela:
- Telas de Autenticaçao: Essas telas compreendem toda as etapas de cadastro, confirmaçao de cadastro, login, requisição/excução de recuperação de senha. Elas seguem o padrão exemplificado a baixo:


- Telas da Aplicação: Incluem todas as demais telas da aplica, como dashboard, configuraçoes, feed... Elas seguem o padrão exemplificado a baixo:


# Rotas
Para que o usuário possa navegar entre essas telas, foi necessário criar algumas rotas usando `react-router-dom`. Essa biblioteca permite que o usuário possa navegar entre diferentes endereços (URLs) da aplicação associados a componentes que serão renderizados dinamicamente. Dessa forma é possível ter uma navegação mais organizada, manter uma pilha de páginas acessadas pelo usuário, gerenciar estados da aplicação e manter o código mais organizado.

~~~bash
/
├── AuthRoutes
│   ├── SignIn
│   ├── SignUp
│   ├── Recover
│   ├── AccountConfirmation
│   └── NewPassword
└── DashboardRoutes #Rotas protegidas
    ├── Feed
    ├── Settings 
    ├── NewPost
    └── Post 
~~~




