# TypeScript-API

## Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- MongoDB

## Conceitos utilizados

- SOLID
- Injeção de Dependência (Dependency Injection)
- Repository Pattern

## Como rodar

Tenha Node.js e npm instalados. Para usar o MongoDB local, também é necessário ter Docker com Docker Compose.

### 1. Instale as dependências

```bash
npm i
```

### 2. Configure o banco de dados

Crie um arquivo `.env` na raiz do projeto e escolha uma das opções abaixo.

**MongoDB local com Docker**

Inicie o banco de dados:

```bash
docker compose up -d
```

Adicione ao `.env` os valores correspondentes ao `docker-compose.yml`:

```env
PORT=8000
MONGODB_URL=mongodb://root:password@localhost:27017/?authSource=admin
```

**MongoDB Atlas**

Copie a URL de conexão do seu cluster e configure o `.env`:

```env
PORT=8000
MONGODB_URL=mongodb+srv://SEU_USUARIO:SUA_SENHA@SEU_CLUSTER.mongodb.net/?retryWrites=true&w=majority
```

Substitua os valores pelos dados de conexão do Atlas e permita o acesso do seu IP nas configurações de rede do cluster. Nessa opção, não é necessário iniciar o Docker.

### 3. Inicie a API

Com o banco configurado e disponível, execute:

```bash
npm start
```

A API estará disponível em `http://localhost:8000`, com as rotas de usuários em `/users`.

## Entidades

<pre>
User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}</pre>

## Rotas

- GET /users - retorna os usuários salvos no banco
- POST /users - cria um usuário
- PATCH /users/:id - atualiza um usuário
- DELETE /users/:id - deleta um usuário
