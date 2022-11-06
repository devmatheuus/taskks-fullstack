
# TASKK´S

*Bem vindo ao **TASKK'S**!!!*
 
*O readme esta separado em duas seções principais que vão dar informações necessárias para a execução do projeto, a primeira seção está relacionada a parte backend e a segunda seção fala sobre o frontend.*



## Backend - Instalação das dependências

**Caso prefira executar o projeto utilizando Docker, pule essa seção.**

 

*Após clonar o repositório, execute os seguintes comandos a partir da pasta do projeto para instalar os pacotes necessários:*



```bash

  cd backend

  yarn
```


### Formas de execução do projeto

*Existem três formas para executar a API:*

* *Utilizando Docker;*
* *Executando o projeto localmente;*
* *Url do deploy;*


### Docker

* *Crie um arquivo **.env** na raíz da pasta backend;*
* *Siga o exemplo abaixo para criar as variávies de ambiente necessárias para a execução do projeto:*

***

```
# Não altere a variável DB_HOST


POSTGRES_USER="Nome do seu usuário postreSQL"
POSTGRES_PASSWORD="Senha do seu usuário"
POSTGRES_DB="Nome do banco de dados"
DB_HOST="db"
SECRET_KEY="Uma chave secreta"

```
***

* *Após configurar o arquivo **.env** rode o seguinte comando em seu terminal para subir os containers:*

```
docker-compose up --build
```
* *Ao fim do processo, a seguinte mensagem deve ser mostrada no terminal:*

```
Servidor executando em http://localhost:3000
```

* *A aplicação estará diponível na porta local 3000.*


**Informações sobre os endpoints são citadas posteriormente.**

### Executando o projeto localmente

* *Crie um arquivo **.env** na raíz da pasta backend;*
* *Siga o exemplo abaixo para criar as variávies de ambiente necessárias para a execução do projeto:*

***

```
# Não altere a variável DB_HOST


POSTGRES_USER="Nome do seu usuário postreSQL"
POSTGRES_PASSWORD="Senha do seu usuário"
POSTGRES_DB="Nome do banco de dados"
DB_HOST="localhost"
SECRET_KEY="Uma chave secreta"

```
***

* *Após configurar o arquivo **.env** e ter as dependências do projeto instaladas, execute o seguinte comando em seu terminal para criar as tabelas:*

```
yarn typeorm migration:run -d src/data-source.ts
```

*Após a criação das tabelas, inicie a aplicação com o comando:*
```
yarn dev
```
* *Ao fim do processo, a seguinte mensagem deve ser mostrada no terminal:*

```
Servidor executando em http://localhost:3000
```

* *A aplicação estará diponível na porta local 3000.*


**Informações sobre os endpoints são citadas posteriormente.**

### Url do deploy
*A forma mais rápida para executar a aplicação, basta usar a seguinte url:*
```
https://api-ubis.herokuapp.com
```

## Testes
O projeto conta com testes unitários e testes de integração, para executá-los digite o seguinte comando em seu terminal:
```
  yarn test
```
Para visualizar a porcentagem de cobertura do código, execute o comando:
```
  yarn coverage
```

## Endpoints - /accounts

### POST - Criação de conta

*Para criar uma nova conta, envie um JSON com as seguintes Informações:*

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

*A aplicação realiza algumas verificações antes de cadastrar um novo usuário no banco de dados, são elas:*

* Email já existente;
* Formato válido de email e no máximo 50 caracteres;
* Senha com no mínimo 5 caracteres e 150 caracteres no máximo;

*Resposta - email já existente:*

```
{
	"status": "error",
	"code": 400,
	"message": "Email already registered."
}
```

*Resposta - formato inválido de email:*

```
{
	"status": "error",
	"code": 400,
	"message": "email must be a valid email"
}
```

*Resposta - email com mais de 50 caracteres:*

```
{
	"status": "error",
	"code": 400,
	"message": "email must be at most 50 characters"
}
```

*Resposta - senha com menos de 5 caracteres:*

```
{
	"status": "error",
	"code": 400,
	"message": "password must be at least 5 characters"
}
```
*Resposta - senha com mais de 150 caracteres:*

```
{
	"status": "error",
	"code": 400,
	"message": "password must be at most 150 characters"
}
```

## Endpoints - /login

### POST - Login na aplicação

*Para o login ser realizado com sucesso, deve ser passsado o seguinte JSON com dados válidos:*

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

*A aplicação realiza algumas verificações antes de retornar um token de autenticação para o usuário, são elas:*

* Formato válido de email e email existente;
* Senha correta;


*Resposta - formato inválido de email:*

```
{
	"status": "error",
	"code": 400,
	"message": "email must be a valid email"
}
```

*Resposta - Email ou senha inexistente:*

```
{
	"status": "error",
	"code": 400,
	"message": "Incorrect email or password"
}
```

## Endpoints - /tasks

### POST - Criar uma nova tarefa

*Para criar uma nova tarefa, o usuário deve estar autenticado e o seguinte JSON deve ser enviado:*

```
{
	"description": "Codar",
	"deadline": "06/11/20223"
}
```

*Em caso de sucesso, a seguinte resposta será retornada:*

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

*A aplicação realiza algumas verificações antes de cadastrar uma nova tarefa:*

* Descrição(description) deve ser uma string com pelo menos 5 caracteres;
* Prazo(deadline) deve ser uma string no formato mm/dd/yyyy, a data deve ser válida e a não pode ser menor ou igual ao dia atual;
* O usuário deve estar autenticado e essa autenticação deve ser válida (token jwt);

*Resposta - Descrição com menos de 5 caracteres:*

```
{
	"status": "error",
	"code": 400,
	"message": "description must be at least 5 characters"
}
```

*Resposta - Tipo de valor inválido para descrição:*

```
{
	"status": "error",
	"code": 400,
	"message": "description must be a `string` type, but the final value was: `[]`."
}
```

*Resposta - Prazo fora do formato mm/dd/yyyy:*

```
{
	"status": "error",
	"code": 400,
	"message": "The date must follow the following format: dd/MM/yyyy"
}
```

*Resposta - Prazo com data menor que o dia atual:*

```
{
	"status": "error",
	"code": 400,
	"message": "Invalide deadline."
}
```


*Resposta - Sem autenticação:*

```
{
	"status": "error",
	"code": 401,
	"message": "Missing authorization!"
}
```


*Resposta - Autenticação inválida:*

```
{
	"status": "error",
	"code": 401,
	"message": "Invalid token"
}
```


## Endpoints - /tasks/:task_id

### PATCH - Editar uma tarefa

*Para editar uma nova tarefa, o usuário deve estar autenticado e o seguinte JSON deve ser enviado:*

```
{
	"description": "Updated",
	"deadline":  "25/10/2023",
	"is_finished": true
}
```

**Todos os campos são opcionais, o usuário pode atualizar qualquer um deles.**

**Ao atualizar uma tarefa, a mesma não poderá ser atualizada novamente.**

*Em caso de sucesso, a seguinte resposta será retornada:*

```
{
	"message": "Task updated successfully."
}
```

### Validações da rota

*A aplicação realiza algumas verificações antes de atualizar uma tarefa:*

* Caso enviada, a descrição(description) deve ser uma string com pelo menos 5 caracteres;
* Caso enviado, o prazo(deadline) deve ser uma string no formato mm/dd/yyyy, a data deve ser válida e a não pode ser menor ou igual ao dia atual;
* Caso enviado, o campo is_finished deve ser um booleano;
* Uma tarefa marcada como finalizada não pode ser editada;
* A tarefa que será atualizada deve ser existente, seu id deve ser passado em conjunto com a url;
* Apenas o dono da tarefa pode editá-la;
* O usuário deve estar autenticado e essa autenticação deve ser válida (token jwt);

*Resposta - Descrição com menos de 5 caracteres:*

```
{
	"status": "error",
	"code": 400,
	"message": "description must be at least 5 characters"
}
```

*Resposta - Tipo de valor inválido para descrição:*

```
{
	"status": "error",
	"code": 400,
	"message": "description must be a `string` type, but the final value was: `[]`."
}
```

*Resposta - Prazo fora do formato mm/dd/yyyy:*

```
{
	"status": "error",
	"code": 400,
	"message": "The date must follow the following format: dd/MM/yyyy"
}
```

*Resposta - Prazo com data menor que o dia atual:*

```
{
	"status": "error",
	"code": 400,
	"message": "Invalide deadline."
}
```

*Reposta - Tipo inválido para is_finished:*

```
{
	"status": "error",
	"code": 400,
	"message": "is_finished must be a `boolean` type, but the final value was: `[]`."
}
```

*Resposta - Tarefa finalizada:*
```
{
	"status": "error",
	"code": 400,
	"message": "This task has already been completed."
}
```

*Resposta - Tarefa inexistente:*
```
{
	"status": "error",
	"code": 400,
	"message": "Task not found."
}
```

*Resposta -  Atualizando tarefa de outro usuario:*
```
{
	"status": "error",
	"code": 401,
	"message": "Unauthorized."
}
```

*Resposta - Sem autenticação:*

```
{
	"status": "error",
	"code": 401,
	"message": "Missing authorization!"
}
```


*Resposta - Autenticação inválida:*

```
{
	"status": "error",
	"code": 401,
	"message": "Invalid token"
}
```

## Endpoints - /tasks

### GET - Listar as próprias tarefas

*Para listar suas tarefas, o usuário deve estar autenticado.*


**Um usuário tem acesso somente as suas próprias tarefas.**


*Em caso de sucesso, a seguinte resposta será retornada:*

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

*A aplicação realiza algumas verificações antes de atualizar uma tarefa:*

* O usuário deve estar autenticado e essa autenticação deve ser válida (token jwt);

*Resposta - Sem autenticação:*

```
{
	"status": "error",
	"code": 401,
	"message": "Missing authorization!"
}
```


*Resposta - Autenticação inválida:*

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

**Seguem dados de usuário administrador:**
```
{
	"email": "superadm@email.com",
	"password": "super"
}
```

*Essa rota esta disponível apenas para usuários administradores, devidamente autenticados.*


*Em caso de sucesso, a seguinte resposta será retornada:*

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

*A aplicação realiza algumas verificações antes de atualizar uma tarefa:*

* O usuário deve estar autenticado e essa autenticação deve ser válida (token jwt);
* O usuário deve ser administrador;

*Resposta - Sem autenticação:*

```
{
	"status": "error",
	"code": 401,
	"message": "Missing authorization!"
}
```


*Resposta - Autenticação inválida:*

```
{
	"status": "error",
	"code": 401,
	"message": "Invalid token"
}
```

*Resposta - Usuário não administrador:*

```
{
	"status": "error",
	"code": 401,
	"message": "Unauthorized"
}
```

