# Plano de testes 

## Testes Unitários (TU)

### Protótipo 1
#### TU-01 Teste de unidade relativo ao cadastro de usuário e autenticação:
* TU-01-c1 Verifica se o usuário é cadastrado corretamente no banco de dados.
* TU-01-c2 Verifica se a autenticidade do usuário no banco de dados.

#### TU-02 Teste de unidade relativo ao login do usuário:
* TU-02-c1 Analisa se as credenciais do usuário são válidas.
* TU-02-c2 Verifica se as credenciais do usuário são inválidas.

### Protótipo 2
#### TU-03 Teste de unidade relativo as postagens de imagens:
* TU-03-c1 Verifica se uma postagem do usuario foi feita corretamente.
* TU-03-c2 Testa se uma postagem do usuario foi invalida.

#### TU-04 Teste de unidade relativo a listar postagem:
* TU-04-c1 Verifica se as postagem estão sendo listadas corretamente.

#### TU-05 Teste de unidade relativo a listagem de usuários:
* TU-05-c1 Testa se os usuarios cadastrados no banco estão sendo listados corretamentes.

#### TU-06 Teste de unidade relativo a comentários:
* TU-06-c1 Verifica se os comentários do usuário foram feitos corretamente.
* TU-06-c2 Testa se a listagem de comentarios foi feita corretamente.

## Teste de Integração (TI)

### Protótipo 1
* TI-01-c1 Verifica se um usuário consegue logar com suas credenciais e visualizar as postagens do feed.
* TI-06-c1 Verifica se os comentarios de uma postagem estão corretas e válidadas no banco de dados.

### Protótipo 2
* TI-06-c1 Verifica se os comentarios de uma postagem estão corretas e válidadas no banco de dados.


## Teste de Sistema (TS)

### Protótipo 1
#### TS-01 Login de usuário
**TS-01-c1 Fluxo principal - Fluxo para logar com um usuário válido**

**Entradas:**
- Nome de usuário válido.
- Senha válida.

**Passos:**
- Acesse a página de login do usuário.
- Insira um nome de usuário válido.
- Insira uma senha válida.
- Pressione o botão de login.

**Resultado esperado:**
- O sistema deve autenticar com sucesso o usuário.
- O sistema deve redirecionar o usuário para a página de dashboard.

**TS-01-c2 Fluxo de exceção - Fluxo para logar com um usuário inválido**

**Entradas:**
- Nome de usuário inválido.
- Senha inválida.

**Passos:**
- Acesse a página de login do usuário.
- Insira um nome de usuário inválido.
- Insira uma senha inválida.
- Pressione o botão de login.

**Resultado esperado:**
- O sistema deve exibir uma mensagem de erro informando que as credenciais são inválidas.

#### TS-02 Casos de Testes para o logout

**TS-02-c1 Fluxo principal - Fluxo para sair da aplicação**

**Pré-condições:**
- Estar Logado.

**Passos:**
- Acessar a página de logout.


**Resultado esperado:**
- O sistema irá redirencionar o usuário para a tela de login.

#### TS-03 Casos de Testes para o Registro de novo usuário

**TS-03-c1 Fluxo principal - Fluxo para registrar um novo usuário**

**Pré-condições:**

**Passos:**
- Inserir Username válido.
- Inserir First Name e Last Name do usuário.
- Inserir Email válido.
- Inserir Senha válida.

**Resultado esperado:**
- O sistema deve exibir as credenciais do usuário.

#### TS-04 Casos de Testes para o dashboard

**TS-04-c1 Fluxo principal - Fluxo para publicar uma imagem no Dashboard do usuário**

**Pré-condições:**
- Ter feito login na plataforma.

**Passos:**
- Acesse a página de nova postagem .
- Selecione uma imagem para publicação.
- Insira uma legenda.
- Pressione o botão de publica.

**Resultado esperado:**
- O sistema deve exibir uma mensagem de confirmação de publicação.


### Protótipo 2

#### TS-05 - Casos de teste para upload de imagem

**TS-05-c1 Fluxo principal - Fluxo para postar uma imagem no Feed do usuário**

**Pré-condições:**
- Ter feito login na plataforma.

**Passos:**
- Acesse a página de nova postagem .
- Selecione uma imagem para publicação.
- Insira uma legenda.
- Pressione o botão de publica.

**Resultado esperado:**
- O sistema deve exibir uma mensagem de confirmação de publicação.

#### TS-06 - Casos de teste para excluir de imagem

**TS-06-c1 Fluxo principal - Fluxo para excluir uma imagem no Feed do usuário**

**Pré-condições:**
- Ter feito login na plataforma
- Ter publicado uma imagem 

**Passos:**
- Acessar a imagem publicada
- Pressionar o botão excluir

**Resultado esperado:**
- O sistema irá deletar a imagem do banco de dados.