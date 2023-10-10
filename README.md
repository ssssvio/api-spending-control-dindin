# API Controle de Gastos - Dindin 💰

A API Dindin é uma aplicação que permite aos usuários gerenciar suas transações financeiras, incluindo a criação de contas, login, cadastro de transações e visualização de informações financeiras.

## Configuração do Ambiente

Antes de utilizar a API Dindin, você deve configurar o ambiente corretamente. Siga estas etapas:

1. **Banco de Dados**: Certifique-se de ter o PostgreSQL instalado e criar um banco de dados chamado "dindin". As tabelas serão criadas automaticamente quando a API for iniciada.

2. **Dependências Necessárias**: Execute o comando `npm install` para instalar todas as dependências necessárias listadas no arquivo `package.json`.

3. **Variáveis de Ambiente**: Crie um arquivo `.env` com as seguintes variáveis de ambiente para se conectar ao banco de dados e configurar o JWT (JSON Web Token):

    ```
    PORT=3000

    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=postgres
    DB_DATABASE=dindin
    JWT_SECRET=seu-segredo-jwt
    ```

4. **Iniciar a API**: Inicie a API executando o arquivo `server.js` usando o comando `npm run dev`.

## Autenticação com JWT

A autenticação na API Dindin é baseada em tokens JWT (JSON Web Token). Para acessar as rotas protegidas, você deve fazer login e obter um token JWT válido. O token deve ser incluído no cabeçalho de autorização de todas as solicitações para as rotas protegidas.

Exemplo de cabeçalho com o token JWT:

```
Authorization: Bearer seu-token-jwt-aqui
```

## Rotas da API
```json
    http://localhost:3000
```
A seguir, descrevemos as principais rotas da API Dindin e como usá-las.

### 1. Rota de Registro de Usuário

- **Método**: POST
- **URL**: `http://localhost:3000/usuario`
- **Descrição**: Registra um novo usuário na plataforma.

#### Requisição:

```json
{
  "nome": "Nome do Usuário",
  "email": "usuario@example.com",
  "senha": "senha123"
}
```

#### Resposta de Sucesso:

- Código de Status: 201 (Criado)
- Corpo da Resposta:

```json
{
  "mensagem": "Usuário criado com sucesso!"
}
```

### 2. Rota de Login de Usuário

- **Método**: POST
- **URL**: `http://localhost:3000/login`
- **Descrição**: Realiza o login de um usuário e gera um token JWT válido.

#### Requisição:

```json
{
  "email": "usuario@example.com",
  "senha": "senha123"
}
```

#### Resposta de Sucesso:

- Código de Status: 200 (OK)
- Corpo da Resposta:

```json
{
  "usuario": {
    "id": 1,
    "nome": "Nome do Usuário",
    "email": "usuario@example.com"
  },
  "token": "seu-token-jwt-aqui"
}
```

### 3. Rota de Listagem de Categorias

- **Método**: GET
- **URL**: `http://localhost:3000/categoria`
- **Descrição**: Retorna a lista de categorias disponíveis.

#### Resposta de Sucesso:

- Código de Status: 200 (OK)
- Corpo da Resposta (exemplo):

```json
[
  {
    "id": 1,
    "descricao": "Alimentação"
  },
  {
    "id": 2,
    "descricao": "Assinaturas e Serviços"
  },
  // ... outras categorias ...
]
```

### 4. Rota de Listagem de Transações

- **Método**: GET
- **URL**: `http://localhost:3000/transacao`
- **Descrição**: Retorna a lista de transações do usuário autenticado, com a opção de filtrar por categoria.

#### Parâmetros de Consulta (Query Params):

- `filtro` (opcional): Filtra as transações por categoria.

```json
  Req: http://localhost:3000/transacao?filtro[]=Salário

  Res:
    {
    "id": 1,
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 3000,
    "data": "2023-10-10T12:00:00.000Z",
    "usuario_id": 1,
    "categoria_id": 15,
    "categoria_nome": "Salário" <- FILTRA CATEGORIA SALÁRIO
  },
```

#### Resposta de Sucesso:

- Código de Status: 200 (OK)
- Corpo da Resposta (exemplo):

```json
[
  {
    "id": 1,
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 3000,
    "data": "2023-10-10T12:00:00.000Z",
    "usuario_id": 1,
    "categoria_id": 15,
    "categoria_nome": "Salário"
  },
  {
    "id": 2,
    "tipo": "saida",
    "descricao": "Restaurante",
    "valor": -50,
    "data": "2023-10-11T19:30:00.000Z",
    "usuario_id": 1,
    "categoria_id": 1,
    "categoria_nome": "Alimentação"
  },
  // ... outras transações ...
]
```

### 5. Rota de Cadastro de Transação

- **Método**: POST
- **URL**: `http://localhost:3000/transacao`
- **Descrição**: Cadastra uma nova transação para o usuário autenticado.

#### Requisição:

```json
{
  "tipo": "entrada",
  "descricao": "Salário",
  "valor": 3000,
  "data": "2023-10-10T12:00:00.000Z",
  "categoria_id": 15
}
```

#### Resposta de Sucesso:

- Código de Status: 201 (Criado)
- Corpo da Resposta:

```json
{
  "id": 1,
  "tipo": "entrada",
  "descricao": "Salário",
  "valor": 3000,
  "data": "2023-10-10T12:00:00.000Z",
  "usuario_id": 1,
  "categoria_id": 15
}
```

### 6. Rota de Detalhes da Transação

- **Método**: GET
- **URL**: `http://localhost:3000/transacao/:id`
- **Descrição**: Retorna os detalhes de uma transação específica.

#### Parâmetros de Rota:

- `id` (obrigatório): ID da transação a ser detalhada.

#### Resposta de Sucesso:

- Código de Status: 200 (OK)
- Corpo da Resposta (exemplo):

```json
{
  "id": 1,
  "tipo": "entrada",
  "descricao": "Salário",
  "valor": 3000,
  "data": "2023-10-10T12:00:00.000Z",
  "usuario_id": 1,
  "categoria_id": 15,
  "categoria_nome": "Salário"
}
```

### 7. Rota de Atualização de Transação

- **M

étodo**: PUT
- **URL**: `http://localhost:3000/transacao/:id`
- **Descrição**: Atualiza uma transação existente do usuário autenticado.

#### Parâmetros de Rota:

- `id` (obrigatório): ID da transação a ser atualizada.

#### Requisição:

```json
{
  "tipo": "saida",
  "descricao": "Restaurante",
  "valor": -50,
  "data": "2023-10-11T19:30:00.000Z",
  "categoria_id": 1
}
```

#### Resposta de Sucesso:

- Código de Status: 201 (Criado)
- Corpo da Resposta:

```json
{
  "mensagem": "Transação atualizada com sucesso!"
}
```

### 8. Rota de Exclusão de Transação

- **Método**: DELETE
- **URL**: `http://localhost:3000/transacao/:id`
- **Descrição**: Exclui uma transação do usuário autenticado.

#### Parâmetros de Rota:

- `id` (obrigatório): ID da transação a ser excluída.

#### Resposta de Sucesso:

- Código de Status: 204 (Sem Conteúdo)
- Corpo da Resposta: Nenhum conteúdo no corpo da resposta.

### 9. Rota de Extrato Financeiro do Usuário

- **Método**: GET
- **URL**: `http://localhost:3000/transacao/extrato`
- **Descrição**: Retorna um resumo do extrato financeiro do usuário autenticado, incluindo o total de entradas e saídas.

#### Resposta de Sucesso:

- Código de Status: 200 (OK)
- Corpo da Resposta (exemplo):

```json
{
  "entrada": 3000,
  "saida": -50
}
```

### 10. Rota de Listagem de Dados do Usuário

- **Método**: GET
- **URL**: `http://localhost:3000/usuario`
- **Descrição**: Retorna informações básicas do usuário autenticado.

#### Resposta de Sucesso:

- Código de Status: 200 (OK)
- Corpo da Resposta (exemplo):

```json
{
  "id": 1,
  "nome": "Nome do Usuário",
  "email": "usuario@example.com"
}
```
## Contribuindo

Sinta-se à vontade para contribuir para o desenvolvimento desta API. Se você encontrar problemas ou tiver sugestões, abra uma "branch" e envie um "pull request" para colaborar.

###### tags:  `Back-end` - `nodeJS` - `API REST`