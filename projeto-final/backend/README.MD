## Autenticação do Django Rest Framework com Dj-Rest-Auth

Algumas tecnologias que usaremos incluem:

- Django: Django é um framework Python de código aberto usado para desenvolvimento web. Segue-se o modelo de controle de visualização (MVC) padrão.

- Estrutura REST django: um kit de ferramentas robusto e personalizável para criar APIs RESTful no Django.

- Dj-Rest-Auth: um pacote gratuito e de código aberto usado para lidar com autenticação em APIs REST do Django

### Criando Ambiente Virtual e Configurando Dependências

Começaremos configurando um ambiente virtual e instalando as dependências para nossa aplicação. Um ambiente virtual isolará o projeto atual de outros projetos em nossa máquina. Assim, podemos ter versões distintas de Python, pip e outros módulos para o projeto atual. 

Na pasta atual rodar os seguintes comandos para ativar o ambiente virtual
~~~bash
python -m venv venv
~~~

Para ativar o ambiente virtual no `Windows`
~~~bash
venv\Scripts\activate
~~~

Para ativar ambiente virtual no `Linux/MacOS`
~~~bash
source venv/bin/activate
~~~

Instalar os módulos do projeto
~~~bash
pip install -r requirements.txt
~~~

Para rodar o servidor, usar os seguintes comandos na pasta `projeto-final/backend`:
~~~bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
~~~

A pasta raiz contém os seguintes arquivos essenciais:

- *manage.py*: este é um script utilitário que nos permite criar novos aplicativos, migrar bancos de dados e outras tarefas administrativas.

- *settings.py*: o arquivo de configuração que contém as configurações do nosso projeto. Podemos editar as configurações, como adicionar aplicativos recém-instalados ao INSTALLED_APPS configurações. 

- *urls.py*: um arquivo onde definiremos nossos padrões de URL e suas visualizações associadas. Os padrões conectam os URLS com suas respectivas funções de exibição. 

- *models.py*: conterá os modelos que definem os campos de banco de dados de nossos aplicativos 

- *views.py* o arquivo conterá visualizações para receber e responder a solicitações da Web.


## Configurar a API do Usuário

Em seguida, usaremos o Django REST Framework para criar a API REST. Criaremos os modelos para campos de banco de dados. Também criaremos funções de visualização de API para gerenciar as solicitações de API. Em seguida, adicionaremos pontos de extremidade da API onde os visitantes do site podem acessar a API. Também criaremos serializadores para transformar instâncias de modelo e QuerySets em formato JSON quando as respostas da API forem atendidas.

uando os visitantes fazem solicitações através dos endpoints, o Django chama a visualização correspondente para lidar com as solicitações e fornecer respostas às solicitações, respectivamente.

Nossos endpoints de API incluirão o seguinte:

- *api/users*: esse ponto de extremidade é usado para criar usuarios e retornar uma lista de usuarios.
- *api/users/<pk:id>*: este endpoint é usado para obter, atualizar e excluir usuarios individuais por id ou chave primária.

## Modelo do Usuário

O modelo User representa a tabela de base de dados que irá conter os dados dos usuarios.  O Django Object Relational Mapper (ORM) lida com o gerenciamento de banco de dados para nós, fornecendo uma interface Python para operações SQL. Ele mapeia as classes e variáveis Python em nossos modelos para tabelas e colunas SQL correspondentes. Portanto, não precisamos usar consultas SQL.

```
class User(AbstractUser):
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
```
## Classe Serializer

Adicionamos uma classe serializadora para o modelo User. A classe serializer converterá instâncias de usuarios e QuerySets de e para JSON. Vamos começar criando um serilizers.py arquivo dentro do users diretório de aplicativos.

```
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'name', 'surname', 'email')
```

## Visualizações da API

Para adicionar as visualizações de API para o aplicativo user. Sempre que um endpoint é visitado, o Django irá buscar a visão correspondente.

```
from rest_framework.permissions import IsAuthenticated

class UserList(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
```

*permission_classes = [IsAuthenticated]* garante que as respostas das visualizações só estarão disponíveis se o usuário que faz a solicitação estiver logado e autenticado

## Adicionar Endpoints de API

endpoints da API para o aplicativo do user. Teremos dois pontos finais: api/students para criar e obter a lista de usuarios e api/students/<pk:id> para obter, atualizar e excluir usuarios individuais por seus pk.

em tellemgram/urls.py

```
urlpatterns = [
    path("admin/", admin.site.urls),

    path('api/users/', views.UserList.as_view(), name='user-list'),
    path('api/users/<int:pk>/', views.UserDetail.as_view(), name='user-detail'),
    ...
    ]
```
int:pk acima nos permite visualizar os detalhes de cada usuario, indo para um ponto de extremidade anexado pelo pk do usuario em particular.

## Criando Endpoints de Autenticação

Criamos padrões URLS para nossos endpoints de autenticação. Os endpoints de autenticação em nosso projeto serão mapeados para as visualizações de autenticação do pacote dj-rest-auth. As exibições contêm código que lida com as várias funções de autenticação, como registrar usuários e fazer login.

j-rest-auth usa o JSON Web Token (JWT) para tokenização.

Juntamente com os detalhes do usuário retornado no login, temos 2 tokens retornados. Estes são os tokens de acesso e atualização:

Token de acesso: este é o token que permite que você tenha acesso à API. Tem uma vida útil curta antes de expirar.
Atualizar token: consiste nas informações que permitirão que você obtenha um novo token de acesso quando o anterior expirar.

## Recurso de redefinição de senha

Permitiremos que nossos usuários redefinam a senha quando esquecerem suas senhas. Estaremos adicionando os endpoints password-reset e password-reset-confirm' no arquivo urls.py global do projeto para que eles fiquem ativos.

O endpoint de redefinição de senha é onde o usuário faz a solicitação para redefinir sua senha. dj-rest-auth chama o endpoint password-reset-confirm para o qual envia um email para o endereço de email do usuário. O corpo da mensagem de e-mail contém a confirmação de redefinição de senha que possui uma chave exclusiva para verificar apenas esse endereço de e-mail. Quando o usuário abrir o URL de redefinição de senha na mensagem de e-mail, ele será redirecionado para uma nova página para fornecer uma nova senha para sua conta.