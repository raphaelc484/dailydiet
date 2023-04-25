# Daily Diet Style app

Construção de modelo de estudo seguindo ideia do aplicativo para controle de alimentação.

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

### 📋 Pré-requisitos

De que coisas você precisa para instalar o software e como instalá-lo?

```
NodeJS
Docker 
Docker-compose
```

### 🔧 Instalação

Para começar será necessário instalar o banco de dados.

Use o comando abaixo para instalação do banco:

```
docker-compose up
```

para checar se o banco foi criado use o comando:

```
docker ps
```

com o banco instalado vamos criar nossas tabelas através do prisma, o comando abaixo só necessita ser usado na primeira vez que for usar o projeto:

```
npx prisma generate
```
agora use o comando abaixo para rodar as migrations criando as tabelas necessárias:

```
npx prisma migrate dev
```

caso queira ver as tabelas criadas bastar utilizar o comando:

```
npx prisma studio
```

## ⚙️ Executando os testes

Aplicação conta com testes unitários e testes E2E.

### 🔩 Teste unitários

Aqui são testadas nossos casos de uso que são a base de nossa aplicação, existem algumas rodar esses testes mas a primeira que pode ser usada é:

```
npm run test
```

Caso queira mantes os testes sempre em operação use:

```
npm run test:watch
```

Para gerar os arquivos de coverage utilize do comando:

```
test:coverage
```

### ⌨️ Testes E2E

Para rodar os testes E2E utilize do comando:

```
npm run test:e2e
```

## RFs (Requisitos funcionais)

- [x] Deve ser possível criar um usuário
- [x] Deve ser possível identificar o usuário entre as requisições
- [x] Deve ser possível registrar uma refeição feita, com as seguintes informações:
- [x] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- [x] Deve ser possível apagar uma refeição
- [x] Deve ser possível listar todas as refeições de um usuário
- [x] Deve ser possível visualizar uma única refeição
- [x] Deve ser possível recuperar as métricas de um usuário

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token)

## 🛠️ Construído com

Ferramentas utilizadas

* [Fastify](https://www.fastify.io/) 
* [Prisma](https://www.prisma.io/) 
* [NodeJS](https://nodejs.org/) 
* [Typescript](https://www.typescriptlang.org/)
* [Vitest](https://vitest.dev/)
* [Docker](https://www.docker.com/)
* [Postgres](https://www.postgresql.org/)

## ✒️ Autores

* [Raphael Clemente Miranda](https://www.linkedin.com/in/raphaec484/)
* [rocketseat](https://www.rocketseat.com.br/)
