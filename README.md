### API REST - padrão Repositories

## Sobre:

- Projeto desenvolvido em Node.js, com Express, MySQL, biblioteca MomentJS para validação de datas
- API REST com CRUD, implementa upload de imagens com Stream, busca dados em uma outra API interna com axios
- Implementado com o padrão Repositories, que separa a camada de dados do model, passando informações com promises:

1. "infraestrutura\database\queries.js" > faz a conexão com o banco de dados
2. "repositories" > chama a camada anterior e contém os códigos de SQL de cada operação CRUD
3. "models" >  chama o repositório e seus métodos, possui as regras de negócio da aplicação
4. "controller" > chama o model e recebe o erro ou resultado para responder ao client

## Como executar:

1. No terminal, clonar o projeto: `git clone https://github.com/malufell/api-rest-repositories.git`
2. Entrar na pasta do projeto: `cd api-rest-repositories`
3. Instalar as dependências: `npm install`
4. Configurar o banco de dados MySQL, arquivo "infraestrutura\database\conexao.js"



