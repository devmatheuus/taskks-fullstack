# TASKK´S

_Bem vindo ao **TASKK'S**!!!_

_O readme esta separado em duas seções principais que vão dar informações necessárias para a execução do projeto, a primeira seção está relacionada a parte backend e a segunda seção fala sobre o frontend._

## Backend - Instalação das dependências

**Caso prefira executar o projeto utilizando Docker, pule essa seção.**

_Após clonar o repositório, execute os seguintes comandos a partir da pasta do projeto para instalar os pacotes necessários:_

```bash

  cd backend

  yarn
```

### Formas de execução do projeto

_Existem três formas para executar a API:_

-   _Utilizando Docker_
-   _Executando o projeto localmente_
-   _Url do deploy_

### Docker

-   _Crie um arquivo **.env** na raíz da pasta backend_
-   _Siga o exemplo abaixo para criar as variávies de ambiente necessárias para a execução do projeto_

---

```
# Não altere a variável DB_HOST


POSTGRES_USER="Nome do seu usuário postreSQL"
POSTGRES_PASSWORD="Senha do seu usuário"
POSTGRES_DB="Nome do banco de dados"
DB_HOST="db"
SECRET_KEY="Uma chave secreta"

```

---

-   _Após configurar o arquivo **.env** rode o seguinte comando em seu terminal para subir os containers:_

```
docker-compose up --build
```

-   _Ao fim do processo, a seguinte mensagem deve ser mostrada no terminal:_

```
Servidor executando em http://localhost:3000
```

-   _A aplicação estará diponível na porta local 3000_

**Informações sobre os endpoints são citadas posteriormente.**

### Executando o projeto localmente

-   _Crie um arquivo **.env** na raíz da pasta backend_
-   _Siga o exemplo abaixo para criar as variávies de ambiente necessárias para a execução do projeto_

---

```
# Não altere a variável DB_HOST


POSTGRES_USER="Nome do seu usuário postreSQL"
POSTGRES_PASSWORD="Senha do seu usuário"
POSTGRES_DB="Nome do banco de dados"
DB_HOST="localhost"
SECRET_KEY="Uma chave secreta"

```

---

-   _Após configurar o arquivo **.env** e ter as dependências do projeto instaladas, execute o seguinte comando em seu terminal para criar as tabelas:_

```
yarn typeorm migration:run -d src/data-source.ts
```

_Após a criação das tabelas, inicie a aplicação com o comando:_

```
yarn dev
```

-   _Ao fim do processo, a seguinte mensagem deve ser mostrada no terminal:_

```
Servidor executando em http://localhost:3000
```

-   _A aplicação estará diponível na porta local 3000_

**Informações sobre os endpoints são citadas posteriormente.**

### Url do deploy

_A forma mais rápida para executar a aplicação, basta usar a seguinte url:_

```
https://api-ubis.herokuapp.com
```

## Testes

O projeto conta com testes unitários e testes de integração, para executá-los digite o seguinte comando em seu terminal:

```
  yarn test
```

## Endpoints - /accounts

### POST - Criação de conta

_Para criar uma nova conta, envie um json com as seguintes Informações:_

```
{
	"email": "seuEmail@email.com",
	"password": "suaSenha"
}
```

Em caso de sucesso, a seguinte resposta será retornada:

```
{
	"message": "Account created successfully",
	"account": {
		"email": "seuEmail@email.com",
		"id": "9938ed53-438c-407f-b57e-dd003c258ff5",
		"is_admin": false
	}
}
```

### Validações da rota

_A aplicação realiza algumas verificações antes de cadastrar um novo usuário no banco de dados, são elas:_

-   Email já existente;
-   Formato válido de email e no máximo 50 caracteres;
-   Senha com no mínimo 5 caracteres e 150 caracteres no máximo;

_Resposta - email já existente:_

```
{
	"status": "error",
	"code": 400,
	"message": "Email already registered."
}
```

_Resposta - formato inválido de email:_

```
{
	"status": "error",
	"code": 400,
	"message": "email must be a valid email"
}
```

_Resposta - email com mais de 50 caracteres:_

```
{
	"status": "error",
	"code": 400,
	"message": "email must be at most 50 characters"
}
```

_Resposta - senha com menos de 5 caracteres:_

```
{
	"status": "error",
	"code": 400,
	"message": "password must be at least 5 characters"
}
```

_Resposta - senha com mais de 150 caracteres:_

```
{
	"status": "error",
	"code": 400,
	"message": "password must be at most 150 characters"
}
```

## Endpoints - /login

### POST - Login na aplicação

_Para o login ser realizado com sucesso, deve ser passsado o seguinte json com dados válidos:_

```
{
	"email": "seuEmail@email.com",
	"password": "suaSenha"
}
```

Em caso de sucesso, a seguinte resposta será retornada:

```
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc19hZG1pbiI6ZmFsc2UsImlhdCI6MTY2NzcwODc1NSwiZXhwIjoxNjY3NzE1OTU1LCJzdWIiOiIzMjVkODZmYS1hOWI0LTRhMDUtYjc3MS0wNTdhYWE5OWYyY2UifQ.63rzAPopU-exbIP2WvJQi-CK2DAgsueDXbI6bu1i4xY"
}

```

**OBS: Cada token é valido apenas por 2h.**

### Validações da rota

_A aplicação realiza algumas verificações antes de retornar um token de autenticação para o usuário, são elas:_

-   Formato válido de email e email existente;
-   Senha correta;

_Resposta - formato inválido de email:_

```
{
	"status": "error",
	"code": 400,
	"message": "email must be a valid email"
}
```

_Resposta - Email ou senha inexistente:_

```
{
	"status": "error",
	"code": 400,
	"message": "Incorrect email or password"
}
```

## Endpoints - /tasks

### POST - Criar uma nova tarefa

_Para criar uma nova tarefa, o usuário deve estar autenticado e o seguinte JSON deve ser enviado:_

```
{
	"description": "Codar",
	"deadline": "06/11/20223"
}
```

_Em caso de sucesso, a seguinte resposta será retornada:_

```
{
	"message": "Task created successfully.",
	"task": {
		"description": "Codar",
		"deadline": "06/11/2023",
		"created_at": "2022-11-06T04:39:24.914Z",
		"updated_at": "2022-11-06T04:39:24.914Z",
		"account": {
			"id": "325d86fa-a9b4-4a05-b771-057aaa99f2ce",
			"email": "seuEmail@email.com",
			"is_admin": false
		},
		"finished_in": null,
		"id": "95cfa88b-eb5b-4482-ae0e-39b76d3e7496",
		"is_late": false,
		"is_finished": false
	}
}

```

### Validações da rota

_A aplicação realiza algumas verificações antes de cadastrar uma nova tarefa:_

-   Descrição(description) deve ser uma string com pelo menos 5 caracteres;
-   Prazo(deadline) deve ser uma string no formato mm/dd/yyyy, a data deve ser válida e a não pode ser menor ou igual ao dia atual;
-   O usuário deve estar autenticado e essa autenticação deve ser válida (token jwt)

_Resposta - Descrição com menos de 5 caracteres:_

```
{
	"status": "error",
	"code": 400,
	"message": "description must be at least 5 characters"
}
```

_Resposta - Tipo de valor inválido para descrição:_

```
{
	"status": "error",
	"code": 400,
	"message": "description must be a `string` type, but the final value was: `[]`."
}
```

_Resposta - Prazo fora do formato mm/dd/yyyy:_

```
{
	"status": "error",
	"code": 400,
	"message": "The date must follow the following format: dd/MM/yyyy"
}
```

_Resposta - Prazo com data menor que o dia atual:_

```
{
	"status": "error",
	"code": 400,
	"message": "Invalide deadline."
}
```

_Resposta - Sem autenticação:_

```
{
	"status": "error",
	"code": 401,
	"message": "Missing authorization!"
}
```

_Resposta - Autenticação inválida:_

```
{
	"status": "error",
	"code": 401,
	"message": "Invalid token"
}
```

## Endpoints - /tasks/:task_id

### PATCH - Editar uma tarefa

_Para editar uma nova tarefa, o usuário deve estar autenticado e o seguinte JSON deve ser enviado:_

```
{
	"description": "Updated",
	"deadline":  "25/10/2023",
	"is_finished": true
}
```

**Todos os campos são opcionais, o usuário pode atualizar qualquer um deles.**

**Ao atualizar uma tarefa, a mesma não poderá ser atualizada novamente.**

_Em caso de sucesso, a seguinte resposta será retornada:_

```
{
	"message": "Task updated successfully."
}
```

### Validações da rota

_A aplicação realiza algumas verificações antes de atualizar uma tarefa:_

-   Caso enviada, a descrição(description) deve ser uma string com pelo menos 5 caracteres;
-   Caso enviado, o prazo(deadline) deve ser uma string no formato mm/dd/yyyy, a data deve ser válida e a não pode ser menor ou igual ao dia atual;
-   Caso enviado, o campo is_finished deve ser um booleano;
-   Uma tarefa marcada como finalizada não pode ser editada;
-   A tarefa que será atualizada deve ser existente, seu id deve ser passado em conjunto com a url;
-   Apenas o dono da tarefa pode editá-la;
-   O usuário deve estar autenticado e essa autenticação deve ser válida (token jwt);

_Resposta - Descrição com menos de 5 caracteres:_

```
{
	"status": "error",
	"code": 400,
	"message": "description must be at least 5 characters"
}
```

_Resposta - Tipo de valor inválido para descrição:_

```
{
	"status": "error",
	"code": 400,
	"message": "description must be a `string` type, but the final value was: `[]`."
}
```

_Resposta - Prazo fora do formato mm/dd/yyyy:_

```
{
	"status": "error",
	"code": 400,
	"message": "The date must follow the following format: dd/MM/yyyy"
}
```

_Resposta - Prazo com data menor que o dia atual:_

```
{
	"status": "error",
	"code": 400,
	"message": "Invalide deadline."
}
```

_Reposta - Tipo inválido para is_finished_

```
{
	"status": "error",
	"code": 400,
	"message": "is_finished must be a `boolean` type, but the final value was: `[]`."
}
```

_Resposta - Tarefa finalizada_

```
{
	"status": "error",
	"code": 400,
	"message": "This task has already been completed."
}
```

_Resposta - Tarefa inexistente_

```
{
	"status": "error",
	"code": 400,
	"message": "Task not found."
}
```

_Resposta - Atualizando tarefa de outro usuario_

```
{
	"status": "error",
	"code": 401,
	"message": "Unauthorized."
}
```

_Resposta - Sem autenticação:_

```
{
	"status": "error",
	"code": 401,
	"message": "Missing authorization!"
}
```

_Resposta - Autenticação inválida:_

```
{
	"status": "error",
	"code": 401,
	"message": "Invalid token"
}
```

## Endpoints - /tasks

### GET - Listar as próprias tarefas

_Para listar suas tarefas, o usuário deve estar autenticado:_

**Um usuário tem acesso somente as suas próprias tarefas**

_Em caso de sucesso, a seguinte resposta será retornada:_

```
{
	"tasks": [
		{
			"id": "eec0993f-a733-44b7-bb79-a0973d24e115",
			"description": "Codar",
			"is_late": false,
			"is_finished": false,
			"finished_in": null,
			"deadline": "31/12/2022",
			"created_at": "2022-11-05T20:14:06.912Z",
			"updated_at": "2022-11-05T20:14:06.912Z",
			"account": {
				"id": "d417437d-e651-4c01-9fcd-1ec03b242cec",
				"email": "seuEmail@email.com",
				"password": "$2a$10$bJWWoNuq3TdY7WAO3ouYBOgVxle43YVxUVzaKKdc7ztpGWHzDI4Hm",
				"is_admin": false
			}
		}
	]
}
```

### Validações da rota

_A aplicação realiza algumas verificações antes de atualizar uma tarefa:_

-   O usuário deve estar autenticado e essa autenticação deve ser válida (token jwt);

_Resposta - Sem autenticação:_

```
{
	"status": "error",
	"code": 401,
	"message": "Missing authorization!"
}
```

_Resposta - Autenticação inválida:_

```
{
	"status": "error",
	"code": 401,
	"message": "Invalid token"
}
```

## Endpoints - /tasks/admin

### GET - Listar e filtrar todas as tarefas

**Para visualizar apenas as tarefas atrasadas, o parâmetro late deve ser passado na url:**

```
https://api-ubis.herokuapp.com/tasks/admin?late=true
```

**Seguem dados de usuário administrador**

```
{
	"email": "superadm@email.com",
	"password": "super"
}
```

_Essa rota esta disponível apenas para usuários administradores, devidamente autenticados:_

_Em caso de sucesso, a seguinte resposta será retornada:_

```
{
	"tasks": {
		"total": 38,
		"page": 1,
		"previous": null,
		"next": "https://api-ubis.herokuapp.com/tasks/admin?page=2",
		"tasks": [
			{
				"email": "jose@email.com",
				"description": "Quinta",
				"deadline": "03/09/2022"
			},
			{
				"email": "jose@email.com",
				"description": "Jogar bola",
				"deadline": "25/06/2022"
			},
			{
				"email": "jose@email.com",
				"description": "criando",
				"deadline": "25/10/2033"
			}
		]
	}
}
```

### Validações da rota

_A aplicação realiza algumas verificações antes de atualizar uma tarefa:_

-   O usuário deve estar autenticado e essa autenticação deve ser válida (token jwt);
-   O usuário deve ser administrador

_Resposta - Sem autenticação:_

```
{
	"status": "error",
	"code": 401,
	"message": "Missing authorization!"
}
```

_Resposta - Autenticação inválida:_

```
{
	"status": "error",
	"code": 401,
	"message": "Invalid token"
}
```

_Resposta - Usuário não administrador:_

```
{
	"status": "error",
	"code": 401,
	"message": "Unauthorized"
}
```
